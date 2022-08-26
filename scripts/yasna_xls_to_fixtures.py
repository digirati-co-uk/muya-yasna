"""
Syntax for calling this script:
yasna_xls_to_fixtures <input_file_path> <images_dir_path> <output_dir_path> <symmetrical_refs:bool(default=False)>
e.g.
yasna_xls_to_fixtures C:\test\input\210416_Ritual_Objects_test.xlsx C:\test\images\yasna_object_images\ C:\test\output\ False
Notes:
- symmetrical_refs=True enforces that objects referenced by object X must also reference X.
It leads to more xrefs per object than may be in the sheet.
We believe symmetrical_refs should be False, but the flexibility is there.
- Re-loading fixture file will update/override the items data by pk,
but will not delete any items that are in the DB but not in the fixture file anymore.
"""

import re
import os
import sys
import pathlib
import pyexcel
from collections import OrderedDict, defaultdict
from django.core.serializers.json import DjangoJSONEncoder

# Default to NOT create symmetrical refs
symmetrical_refs = False

# Initialise vars
id_column = "Class ID"
images_column = "Images"
xref_column = "Cross-reference"
xref_property = "cross_references"
obj_model = "yasna.YasnaObject"
img_obj_model = "yasna.YasnaObjectImage"
objs_all = []
img_objs_all = []
fwd_xrefs = defaultdict(list)
combined_xrefs = defaultdict(list)
reverse_xrefs = defaultdict(list)

# Paths etc
output_filename = "yasna_objects_fixtures.json"
current_dir = pathlib.Path(__file__).resolve().parent
json_encoder = DjangoJSONEncoder()
# Currently unused - does not copy images to media dir - must be done manually
# media_dir = current_dir / "../muya_discovery/media/"
media_object_images_subdir = "yasna_object_images/"

# Parse params
data_file_path = sys.argv[1]
data_file = pathlib.Path(sys.argv[1])
image_dir = pathlib.Path(sys.argv[2])
fixture_file = pathlib.Path(sys.argv[3]) / output_filename
print(len(sys.argv))
if len(sys.argv) > 4 and sys.argv[4]:
    symmetrical_refs = True
print("Enforce Symmetrical refs:", symmetrical_refs)

print(f"Data file path: {data_file_path}")
print(f"Images dir path: {image_dir}")
print(f"Output file path: {fixture_file}")
print(f"Data file is file: {str(data_file.is_file())}")
print("Ingesting Yasna data:")

# Read sheet
records = pyexcel.get_records(file_name=data_file_path)
print(f"records: {str(len(records))}")


def column_property_mapping():
    return (
        ("label", "Object"),
        ("name_in_avestan", "Name in Avestan"),
        ("name_in_middle_persian", "Name in Middle Persian"),
        ("name_in_gujarati", "Name in Gujarati"),
        ("definition", "Definition"),
        ("description_of_action", "Description of action (form)"),
        ("function", "Function"),
        ("where_during_ritual", "Where during the ritual does this happen?"),
        ("interpretation", "Interpretation"),
        ("references", "References"),
        ("collaborator", "Collaborator"),
    )


def transform_all_ids(r):
    r[id_column] = transform_id(r[id_column])
    r[xref_column] = get_xref_data(r)
    if symmetrical_refs:
        fwd_xrefs[r[id_column]] = r[xref_column]
    return r


# Object PK starts from 0, data on sheet starts from 1
def transform_id(numeric_pk: int) -> int:
    return numeric_pk - 1


def get_xref_data(r: OrderedDict):
    # Get cross reference data, return it to populate the cross_reference relationship of the current obj
    # if symmetrical_refs, then store it for later so the objects on the other sides of the relationships can be populated later
    # as relationship data may only supplied for one side.
    # Return empty list if no xrefs
    xref_ids = []
    parsed_xref_ids = r[xref_column]
    if parsed_xref_ids:
        # If there are muliple comma separated values
        if type(parsed_xref_ids) == str:
            xref_ids = [
                transform_id(int(id))
                for id in parsed_xref_ids.strip().replace(" ", "").split(",")
            ]
            if symmetrical_refs:
                store_reverse_xrefs(r, xref_ids)

        # If there is a single value
        elif type(parsed_xref_ids) == int:
            xref_ids = [transform_id(parsed_xref_ids)]
            if symmetrical_refs:
                store_reverse_xrefs(r, xref_ids)
    print("parsed", parsed_xref_ids)
    print(f"OBJ: {str(r[id_column])} | XREFS: {str(xref_ids)}")
    return xref_ids


# To populate the 'reverse' xrefs, reverse the data
def store_reverse_xrefs(r: OrderedDict, xref_ids: list):
    for xref_id in xref_ids:
        reverse_xrefs[xref_id].append(r[id_column])


# After populating the objects, populate the reverse xrefs
def update_reverse_xrefs():
    print(f"REVERSE XREFS: {str(reverse_xrefs)}")
    for obj in objs_all:
        rev_xref = reverse_xrefs.get(obj["pk"], None)
        obj_id = obj["pk"]
        if rev_xref:
            # Add the reverse refs to the forward refs
            print("fwd", fwd_xrefs[obj_id], "rev", rev_xref)
            combined_xrefs[obj_id] = list(fwd_xrefs[obj_id])
            combined_xrefs[obj_id].extend(rev_xref)
            obj["fields"][xref_property] = combined_xrefs[obj_id]
            print(f"OBJ: {obj['pk']} | XREFS: {obj['fields'][xref_property]}")
            print("-")


def read_object_images_from_fs():
    filenames = []
    image_files = image_dir.glob("*")
    for image_file in image_files:
        print(f"found file {image_file.name}")
        filenames.append(image_file)
    return filenames


# Delete the file
def delete_fixture_file():
    if fixture_file.is_file():
        os.remove(fixture_file)
    print("Deleted fixture file", str(fixture_file))


# Create a fixture file with an entry for each obj to be created
def write_fixture_file():
    with fixture_file.open(mode="a") as f:
        objs_all.extend(img_objs_all)
        f.write(json_encoder.encode(objs_all))
    print("Written fixture file", str(fixture_file))


# Convert the spreadsheet data to fixtures
def yasna_objects_xls_to_fixtures():

    # Code here to parse the excel file
    col_prop_mapping = column_property_mapping()

    for r in records:

        # Use the class ID 'Pre Transformation' to match the supplied image files
        classID = r[id_column]
        print("row", classID)
        r = transform_all_ids(r)

        # Create the Python object
        obj = {}
        obj["model"] = obj_model
        obj["pk"] = r[id_column]
        obj["fields"] = {}

        # Populate the cross_references data
        obj["fields"][xref_property] = r[xref_column]

        # Populate object from the 'text' cols
        for mapping in col_prop_mapping:
            obj["fields"][mapping[0]] = r[mapping[1]].strip()

        # Append obj to list
        objs_all.append(obj)

        print("-")


def images_to_fixtures():

    # NOTE: find the images for the object ID "PRE TRANSFORMATION"!!
    # NOTE: image fk(obj id) where obj ID = first part of image path - 1
    # Because, the image paths are correct for the data in the spreadsheet (object id starts from 1 in the sheet)
    # And supplied images must be <object_id>_<seq_num>_something.png
    # And the images are not being renamed so in the db, object id=0 has images 1_0.png, 1_1.png
    image_files = read_object_images_from_fs()

    found_image_stems = set()

    for image_file in image_files:
        filename = image_file.name
        stem = pathlib.PurePath(image_file).stem
        if not re.match("^[0-9]+_[0-9]+_", stem):
            print(f"ERROR: misnamed image file {filename}.")
            continue
        if stem in found_image_stems:
            print(f"ERROR: {stem} found more than once: {filename} ignored.")
            continue
        stem_parts = str(stem).split("_")
        obj_pk = int(stem_parts[0]) - 1
        img_path = pathlib.Path(media_object_images_subdir) / filename
        print(f"OK: object pk:{obj_pk} {img_path}")
        found_image_stems.add(stem)
        img_obj = {}
        img_obj["model"] = img_obj_model
        img_obj["pk"] = stem
        img_obj["fields"] = {}
        img_obj["fields"]["yasna_object"] = obj_pk
        img_obj["fields"]["seq_num"] = stem_parts[1]
        img_obj["fields"]["image"] = str(img_path)
        img_objs_all.append(img_obj)


def main():
    delete_fixture_file()
    yasna_objects_xls_to_fixtures()
    if symmetrical_refs:
        update_reverse_xrefs()
    images_to_fixtures()
    write_fixture_file()


if __name__ == "__main__":
    main()
