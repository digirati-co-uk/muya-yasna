"""
Serialize data to/from AVRO Lines
"""

import json, pprint, copy, pathlib
from datetime import datetime as dt

from django.core.serializers.base import DeserializationError, DeserializedObject
from django.core.serializers.json import DjangoJSONEncoder, Serializer as JSONSerializer
from django.core.serializers.python import Deserializer as PythonDeserializer

import fastavro
from fastavro import reader as fastreader, parse_schema
from fastavro import writer as fastwriter
from fastavro.validation import validate, validate_many

# Avro does not have complex datatypes, so use these 'logical type' conversions
def encode_date_as_string(data, *args):
    if data:
        # Create a datetime object with a zero time portion in order to isoformat it,
        # then remove the time portion from the string.
        return dt.isoformat(dt.combine(data, dt.min.time())).split("T")[0]
    return None

def encode_datetime_as_string(data, *args):
    if data:
        return dt.isoformat(data)
    return None

def encode_datetimerange_as_string(data, *args):
    if data:
        return "|".join([encode_datetime_as_string(end) for end in [data.lower, data.upper]])
    return None

def encode_filefield_as_string(data, *args):
    if data:
        return str(data)
    # For some reason it won't serialize None in a filefield. Don't know why.
    return ""

def encode_integerrange_as_string(data, *args):
    if data:
        return f"{data.lower}|{data.upper}"
    return None

def decode_string_as_tuple(data, *args):
    # No need to parse the strings to datetimes as Python Deserializer does this if they are in the right string format
    return tuple(end for end in data.split("|"))

def decode_string_as_tuple_of_ints(data, *args):
    # Range field to_python method accepts a 2 tuple
    return tuple(int(end) for end in data.split("|"))

compression_codec = "snappy"

# Using Fastavro support for custom 'logical type' conversions
fastavro.write.LOGICAL_WRITERS["string-django_date_field"] = encode_date_as_string
fastavro.write.LOGICAL_WRITERS["string-django_datetime_field"] = encode_datetime_as_string
fastavro.write.LOGICAL_WRITERS["string-postgres_datetimerange_field"] = encode_datetimerange_as_string
fastavro.write.LOGICAL_WRITERS["string-django_file_field"] = encode_filefield_as_string
fastavro.write.LOGICAL_WRITERS["string-postgres_integerrange_field"] = encode_integerrange_as_string

# These are not needed as PythonDeserializer knows to cast them from a correctly formatted string
# fastavro.read.LOGICAL_READERS["string-django_date_field"] = do_nothing
# fastavro.read.LOGICAL_READERS["string-django_datetime_field"] = do_nothing
# fastavro.read.LOGICAL_READERS["string-postgres_file_field"] = do_nothing
fastavro.read.LOGICAL_READERS["string-postgres_datetimerange_field"] = decode_string_as_tuple
fastavro.read.LOGICAL_READERS["string-postgres_integerrange_field"] = decode_string_as_tuple_of_ints


# When building schema, get the required schema element for each model field.
fld_lookup = {
    "BooleanField": {
        "type": ["boolean"]
    },
    "CharField": {
        "type": ["string"]
    },
    "DateField": {
        "type": [{
            "type": "string",
            "logicalType": "django_date_field"
        }]
    },
    "DateTimeField": {
        "type": [{
            "type": "string",
            "logicalType": "django_datetime_field"
        }]
    },
    "DateTimeRangeField": {
        "type": [{
            "type": "string",
            "logicalType": "postgres_datetimerange_field"
        }]
    },
    "FileField": {
        "type": [{
            "type": "string",
            "logicalType": "django_file_field"
        }]
    },
    "FloatField": {
        "type": ["float"],
    },
    "IntegerField": {
        "type": ["int"]
    },
    "IntegerRangeField": {
        "type": [{
            "type": "string",
            "logicalType": "postgres_integerrange_field",
        }]
    },
    "TextField": {
        "type": ["string"]
    },
    "ForeignKey": {
        "type": ["int"]
    },
    "ManyToManyField": {
        "type": {
            "type": "array",
            "items": "int"
        }
    },
    "OneToOneField": {
        "type": ["int"]
    },
}


def build_schema_fld(fld, pk=False):
    # Return a schema field definition for the provided model field
    fld_class_name = str(fld.__class__.__name__)

    # FK and 121 fields - get type of related model pk
    if fld_class_name in ["ForeignKey", "OneToOneField"]:
        fld_class_name = fld.foreign_related_fields[0].__class__.__name__

    # Get the appropriate field type def
    #schema_fld = copy.deepcopy(fld_lookup.get(fld_class_name, None))
    schema_fld = {}
    schema_fld = {**fld_lookup.get(fld_class_name, {})}
    if schema_lookup := fld_lookup.get(fld_class_name, None):
        schema_fld["type"] = schema_lookup.get("type")

        print(f" ✅ building schema fld {fld_class_name}")

        # Add field name
        if getattr(fld, "primary_key", False):
            schema_fld["name"] = "pk"
        else:
            schema_fld["name"] = fld.name
        # Allow null if allowed on the model field
        if fld.null:
            if type(schema_fld["type"]) is list:
                schema_fld["type"].append("null")

        # M2M field - get type of related model pk
        if fld_class_name == "ManyToManyField":
            related_model = fld.related_model
            for rel_fld in related_model._meta.get_fields():
                if getattr(fld, "primary_key", False):
                    schema_fld["type"]["items"] = {**fld_lookup.get(rel_fld.__class__.__name__, {})}.get("type")[0]
    else:
        print(f" ❎ unsupported field type! {fld_class_name}")
    print("")
    return schema_fld


class Serializer(JSONSerializer):
    """Convert a queryset to JSON Lines then decode to avro."""

    internal_use_only = False
    parsed_schema = None
    records = []
    schema = {
        "name": "objectbox",
        "type": "record",
        "namespace": "discovery.yasna",
        "fields": [],
    }
    model_flds = {
        "name": "fields",
        "type": {"name": "fields", "type": "record", "fields": []},
    }
    model_name = None

    # Dynamically build the schema
    def build_schema(self, obj):
        print("build schema:")

        # Model key needs to be in each record
        self.schema["fields"].append({"name": "model", "type": "string"})

        # Get the schema definition for each model field
        for fld in obj._meta.get_fields():
            fld_class_name = fld.__class__.__name__
            # There is no need to output any schema or data for reverse 'related_name' fields defined on other models
            if fld_class_name in ["ManyToManyRel"]:
                print(f"{fld.name}|{fld_class_name} - omitting")
                continue
            print(f"{fld.name}|{fld_class_name}")
            # Find the PK
            if getattr(fld, "primary_key", False):
                print('pk: true')
                node = self.schema["fields"]
            else:
                print('pk: false')
                node = self.model_flds["type"]["fields"]
            print(f"null: {fld.null}")
            schema_fld = build_schema_fld(fld=fld)
            if schema_fld:
                node.append(schema_fld)
        self.schema["fields"].append(self.model_flds)
        print("schema:")
        pp = pprint.PrettyPrinter(width=41, compact=True)
        pp.pprint(self.schema)
        print('\nparsing schema')
        self.parsed_schema = parse_schema(self.schema)
        print('parsed schema')

    def start_object(self, obj):
        #print("start object")
        # Build schema from first object only
        if not self.parsed_schema:
            self.build_schema(obj)
        super().start_object(obj)

    def end_object(self, obj):
        #print("end object")
        do = self.get_dump_object(obj)
        # store the model to use in the filename
        if not self.model_name:
            self.model_name = do.get("model", "unknown")
        # pp = pprint.PrettyPrinter(width=41, compact=True)
        # pp.pprint(do)
        self.records.append(do)
        self._current = None

    def _value_from_field(self, obj, field):
        # This overrides _value_from_field in PythonSerializer as we have some of our own tranformations todo (logical writers conversions)
        # rather than the default 'to_string' treatment done in the super method
        value = field.value_from_object(obj)
        return value

    def end_serialization(self):
        if not len(self.records):
            print("No records found!")
            return
        is_valid = validate_many(self.records, self.parsed_schema, raise_errors=True)
        print(f"Validating that encoded avro is valid...:{is_valid}")
        print("Writing file...")
        ts = dt.now().strftime("%Y-%m-%d-%H-%M-%S")
        #file_path = pathlib.Path(f"./yasna/data/serialized_avro/{ts}_{self.model_name}.avro")
        file_path = f"{self.model_name}.avro"
        with open(file_path, "wb") as outfile:
            fastwriter(
                fo=outfile,
                schema=self.parsed_schema,
                codec=compression_codec,
                records=self.records,
            )


def Deserializer(stream_or_string, **options):
    """Deserialize a stream or string of JSON data."""
    avro_reader = fastreader(stream_or_string)
    # Consider if this needs to be modified to avoid loading entire recordset in memory?
    objects = [line for line in avro_reader]
    # print("--OBJECTS")
    # print(objects)
    try:
        yield from PythonDeserializer(objects, **options)
    except (GeneratorExit, DeserializationError):
        raise
    except Exception as exc:
        raise DeserializationError() from exc
