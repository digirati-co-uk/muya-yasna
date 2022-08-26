from django.core.serializers.json import DjangoJSONEncoder
import lxml.etree
import collections
import datetime
import pytz
import re
import json
import pathlib
import sys

json_encoder = DjangoJSONEncoder()

"""
example_data_dump = [
        {"model": "yasna.framerangeid", 
            "pk": 1, 
            "fields": {
                "frames": "{\"bounds\": \"[)\", \"lower\": \"0\", \"upper\": \"100\"}", 
                "temporal": "{\"bounds\": \"[)\", \"lower\": \"1970-01-01T00:00:00+00:00\", \"upper\": \"1970-01-01T00:00:00.400000+00:00\"}"
                }
            },
        {"model": "yasna.yasnaannotation", 
            "pk": 1, 
            "fields": {
                "text_type": "Stanza_SubDiv", 
                "label": "Y.1.1.1", 
                "lang": "Ave", 
                "html": "A test string", 
                "framez": [1]
                }
            }
        ]
"""

def xml_path_to_etree(xml_file_path): 
    xml_data = pathlib.Path(xml_file_path).open('rb').read()
    return lxml.etree.fromstring(xml_data)


def milliseconds_to_datetime(ms):
    """ Create a datetime as ms (milliseconds) after the unix epoch. 
        """
    return datetime.datetime.fromtimestamp(0, pytz.UTC) + datetime.timedelta(milliseconds=ms)

def milliseconds_to_frame(ms, frame_rate=40): 
    """ Convert ms to the frame number at the provided framerate. 
        """
    return str(int(ms / frame_rate) + 1)

def format_range_object(lower, upper): 
    range_object = {
                    "bounds": "[)", 
                    "lower": lower, 
                    "upper": upper
                    }
    return str(json_encoder.encode(range_object))


def format_framerange(range_id, start_ms, end_ms): 
    return {
                    "model": "yasna.framerangeid", 
                    "pk": range_id, 
                    "fields": {
                            "frames": format_range_object(
                                    milliseconds_to_frame(start_ms), 
                                    milliseconds_to_frame(end_ms)
                                    ), 
                            "temporal": format_range_object(
                                    milliseconds_to_datetime(start_ms), 
                                    milliseconds_to_datetime(end_ms)
                                    ) 
                            }
                }

def format_annotation(annotation_id, annotation_type, label, html="", framez=[]): 
    return {
                    "model": "yasna.yasnaannotation", 
            "pk": annotation_id, 
            "fields": {
                "type": annotation_type, 
                "label": label, 
                "html": html, 
                "framez": framez
                }
            }

def format_yasna_identifier(yasna_eaf_id): 
    if (m:=re.match(r'(?P<div_number>\d+)D(?P<stanza_number>\d+)S(?P<chapter_number>\d+)(?P<section>Y|Par)', yasna_eaf_id)):
        stanza_number = int(m.groupdict().get('stanza_number'))
        chapter_number = int(m.groupdict().get('chapter_number'))
        div_number = int(m.groupdict().get('div_number'))
        section = m.groupdict().get('section')
        return f'{section}.{chapter_number}.{stanza_number}.{div_number}'
    elif (m:=re.match(r'(?P<stanza_number>\d+)S(?P<chapter_number>\d+)(?P<section>Y|Par)', yasna_eaf_id)):
        stanza_number = int(m.groupdict().get('stanza_number'))
        chapter_number = int(m.groupdict().get('chapter_number'))
        section = m.groupdict().get('section')
        return f'{section}.{chapter_number}.{stanza_number}'
    elif (m:=re.match(r'(?P<chapter_number>\d+)(?P<section>Y|Par)', yasna_eaf_id)):
        chapter_number = int(m.groupdict().get('chapter_number'))
        section = m.groupdict().get('section')
        return f'{section}.{chapter_number}'
    elif (m:=re.search(r'(?P<section>Par) (?P<chapter_number>\d+)', yasna_eaf_id)):
        chapter_number = int(m.groupdict().get('chapter_number'))
        section = m.groupdict().get('section')
        return f'{section}.{chapter_number}'
    else: 
        return yasna_eaf_id

def get_time_slots(eaf_root_element: lxml.etree.Element) -> dict:
    #return {time_slot.get('TIME_SLOT_ID'): _ms_to_min_sec(int(time_slot.get('TIME_VALUE'))) for time_slot in eaf_root_element.xpath('//TIME_ORDER/TIME_SLOT')}
    return {time_slot.get('TIME_SLOT_ID'): int(time_slot.get('TIME_VALUE')) for time_slot in eaf_root_element.xpath('//TIME_ORDER/TIME_SLOT')}

def get_linguistic_types(eaf_root_element: lxml.etree.Element) -> dict:
    return {l_t.get('LINGUISTIC_TYPE_ID'): dict(l_t.attrib) for l_t in eaf_root_element.xpath('//LINGUISTIC_TYPE')}

def get_annotations_by_type(eaf_root_element: lxml.etree.Element, annotation_type: str) -> dict:
    return eaf_root_element.xpath(f'TIER[@TIER_ID="{annotation_type}"]/ANNOTATION') 

#<ALIGNABLE_ANNOTATION ANNOTATION_ID="a2" TIME_SLOT_REF1="ts3" TIME_SLOT_REF2="ts4">
#<REF_ANNOTATION ANNOTATION_ID="a163" ANNOTATION_REF="a64">

def get_all_child_annotations(eaf_root_element: lxml.etree.Element, tier_id, annotation_id): 
    annotation_data = dict()
    for child_tier in eaf_root_element.xpath(f'/ANNOTATION_DOCUMENT/TIER[@PARENT_REF="{tier_id}"]'):
        child_tier_id = child_tier.get('TIER_ID')
        for child_annotation in child_tier.xpath(f'./ANNOTATION/*[@ANNOTATION_REF="{annotation_id}"]'):
            child_annotation_id = child_annotation.get('ANNOTATION_ID') 
            if (value:=child_annotation.xpath('./ANNOTATION_VALUE/text()')):
                child_annotation_value = value[0]
            else: 
                child_annotation_value = ''

            annotation= { 
                    'annotation_id': child_annotation_id, 
                    'value': child_annotation_value, 
                    'ref_annotations': get_all_child_annotations(eaf_root_element, child_tier.get('TIER_ID'), child_annotation_id)
                    }
            annotation_data[child_tier_id] = annotation
    return annotation_data

def get_alignable_tiers(eaf_root_element: lxml.etree.Element, time_slots: dict, linguistic_types: dict) -> dict: 
    tiers= dict()
    for tier_id, tier_data in linguistic_types.items(): 
        if tier_data.get('TIME_ALIGNABLE') == 'true': 
            tier_annotations = eaf_root_element.xpath(f'/ANNOTATION_DOCUMENT/TIER[@TIER_ID="{tier_id}"]/ANNOTATION/ALIGNABLE_ANNOTATION')
            annotations = {}
            for annotation in tier_annotations:
                annotation_id = annotation.get('ANNOTATION_ID')
                annotation_data = {
                        'annotation_id': annotation_id, 
                        'value': annotation.xpath('./ANNOTATION_VALUE/text()')[0], 
                        'ref_annotations': get_all_child_annotations(eaf_root_element, tier_id, annotation_id), 
                        }
                # I don't expect a single timestamp, but being defensive
                if (timestamp_one:= annotation.get('TIME_SLOT_REF1')): 
                    annotation_data['start'] = time_slots.get(timestamp_one)
                if (timestamp_two:= annotation.get('TIME_SLOT_REF2')):
                    annotation_data['end'] = time_slots.get(timestamp_two)
                annotations[annotation_id] = annotation_data
            tier_data['annotations'] = annotations
            tiers[tier_id] = tier_data
    return tiers

def create_frame_range_lookup(alignable_tiers): 
    frame_ranges = []
    for tier in alignable_tiers.values(): 
        for annotation in tier.get('annotations').values(): 
            frame_ranges.append((annotation.get('start'), annotation.get('end')))
    frame_ranges = set(frame_ranges)
    return {frame_range: frame_range_id 
                    for frame_range_id, frame_range in enumerate(
                            sorted(frame_ranges, key=lambda x: x[0]), 
                            start=1000000
            )}

def create_yasna_annotations(alignable_tiers, frame_range_id_map): 
    annotation_data = []
    for tier in alignable_tiers.values(): 
        annotation_type = tier.get('LINGUISTIC_TYPE_ID')
        for annotation in tier.get('annotations').values(): 
            annotation_label = format_yasna_identifier(annotation.get('value'))
            framez = [frame_range_id_map.get((annotation.get('start'), annotation.get('end')))]
            annotation_data.append({
                    'annotation_type': annotation_type, 
                    'label': annotation_label, 
                    'html': annotation.get('value'), 
                    'framez': framez
                    })
            for r_a_type, r_a in annotation.get('ref_annotations', {}).items():
                annotation_data.append({
                        'annotation_type': r_a_type, 
                        'label': annotation_label, 
                        'html': r_a.get('value'), 
                        'framez': framez
                        })
    return [format_annotation(annotation_id, **annotation) for annotation_id, annotation in enumerate(annotation_data, start=1)]

def main(): 
    eaf_file_path = sys.argv[1]
    output_fixture_path = sys.argv[2]
    eaf_root_element = xml_path_to_etree(sys.argv[1])
    time_slots = get_time_slots(eaf_root_element)
    linguistic_types = get_linguistic_types(eaf_root_element)
    alignable_tiers = get_alignable_tiers(eaf_root_element, time_slots, linguistic_types)
    frame_range_id_map = create_frame_range_lookup(alignable_tiers)
    range_objects = [format_framerange(range_id, range_ms[0], range_ms[1]) for range_ms, range_id in frame_range_id_map.items()]
    print(f'Created fixtures for {len(range_objects)} FrameRangeId objects.') 
    annotation_objects = create_yasna_annotations(alignable_tiers, frame_range_id_map) 
    print(f'Created fixtures for {len(annotation_objects)} YasnaAnnotation objects.') 
    pathlib.Path(output_fixture_path).open('w').write(json_encoder.encode(range_objects + annotation_objects))
    print(f'Wrote fixtures to file: {output_fixture_path}')


if __name__ == '__main__': 
    main() 
