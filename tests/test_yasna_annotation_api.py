import pytest
import requests
import urllib.parse


def test_api_root_get(http_service):
    """
    Test that the endpoint serving the api Yasna urls
    is configured.
    :param http_service:
    :return:
    """
    status = 200
    response = requests.get(http_service + "/api/yasna/")
    assert response.status_code == status


def test_api_annotations_get(http_service):
    response = requests.get(http_service + "/api/yasna/annotation/")
    assert response.status_code == 200
    j = response.json()
    assert len(j.get("results")) > 0


def test_api_annotation_range_get(http_service):
    """Gets the annotation range endpoint without a `from_seconds`
    querystring parameter. This should return
    """
    endpoint = http_service + "/api/yasna/annotation/range/"
    response = requests.get(endpoint)
    assert response.status_code == 200
    j = response.json()
    assert j.get("next") != None
    assert len(j.get("annotation_sets")) > 0
    last_start_seconds = j.get("annotation_sets")[-1].get("start_seconds")
    next_qs = urllib.parse.urlencode({"from_seconds": last_start_seconds})
    assert j.get("next") == f"{endpoint}?{next_qs}"
    first_start_seconds = j.get("annotation_sets")[0].get("start_seconds")
    # The sample eaf data has subdivs from 0 seconds - should be in data, but may change
    assert first_start_seconds == 0


def test_api_annotation_range_get_with_seconds_known_query(http_service):
    """Queries the range api with a known second value (i.e. a
    ms timestamp present in the source EAF document.)
    """
    from_seconds = 602.8
    from_seconds_qs = urllib.parse.urlencode({"from_seconds": from_seconds})
    endpoint = http_service + "/api/yasna/annotation/range/"
    response = requests.get(f"{endpoint}?{from_seconds_qs}")
    assert response.status_code == 200
    j = response.json()
    assert j.get("next") != None
    assert len(j.get("annotation_sets")) > 0
    first_start_seconds = j.get("annotation_sets")[0].get("start_seconds")
    assert first_start_seconds == from_seconds
    last_start_seconds = j.get("annotation_sets")[-1].get("start_seconds")
    next_qs = urllib.parse.urlencode({"from_seconds": last_start_seconds})
    assert j.get("next") == f"{endpoint}?{next_qs}"
    second_annotation = j.get("annotation_sets")[1]
    assert second_annotation.get("start_seconds") != second_annotation.get(
        "end_seconds"
    )
    assert second_annotation.get("annotations") != None
    assert second_annotation.get("annotations").get("Ritual_Part") != None
    assert second_annotation.get("annotations").get("Chapter") != None
    assert second_annotation.get("annotations").get("Stanza_Ref") != None
    assert second_annotation.get("annotations").get("Stanza_SubDiv") != None
    assert second_annotation.get("annotations").get("RA_Description") != None


def test_api_annotation_range_get_with_seconds_mid_range_query(http_service):
    """Queries the range api with a second value that's between the `start_seconds`
    and `end_seconds` values of an annotation set.
    This should be the annotation_set for Stanza_SubDiv Y.0.3.1
    """
    start_seconds = 3762.248
    from_seconds = start_seconds + 1.0
    end_seconds = 3765.151
    from_seconds_qs = urllib.parse.urlencode({"from_seconds": from_seconds})
    endpoint = http_service + "/api/yasna/annotation/range/"
    response = requests.get(f"{endpoint}?{from_seconds_qs}")
    assert response.status_code == 200
    j = response.json()
    assert j.get("next") != None
    assert len(j.get("annotation_sets")) > 0
    last_start_seconds = j.get("annotation_sets")[-1].get("start_seconds")
    next_qs = urllib.parse.urlencode({"from_seconds": last_start_seconds})
    assert j.get("next") == f"{endpoint}?{next_qs}"
    first_annotation = j.get("annotation_sets")[0]
    assert first_annotation.get("end_seconds") == end_seconds
    assert first_annotation.get("start_seconds") == start_seconds
    assert first_annotation.get("start_seconds") == j.get("start_seconds")
    assert first_annotation.get("annotations") != None
    assert first_annotation.get("annotations").get("Ritual_Part") == "Yasna"
    assert first_annotation.get("annotations").get("Stanza_Ref") == "Y.0.3"
    assert first_annotation.get("annotations").get("Stanza_SubDiv") == "Y.0.3.1"
    # Value "Av" from the EAF mapped to "Avestan" in the serializer
    assert first_annotation.get("annotations").get("Stanza_Lang") == "Avestan"
    # Allowing for these to change in future data sets
    assert first_annotation.get("annotations").get("Stanza_OTxt") != None
    assert first_annotation.get("annotations").get("RA_Guj") != None


def test_api_navigation_get(http_service):
    """Tests that the navigation endpoint provides the expected
    navigation trees for the Paragna and Yasna sections of the video.
    """
    endpoint = http_service + "/api/yasna/navigation/"
    response = requests.get(endpoint)
    assert response.status_code == 200
    j = response.json()
    assert len(j) == 2
    par_nav_obj = j[0]
    yas_nav_obj = j[1]
    assert yas_nav_obj.get("seconds") > par_nav_obj.get("seconds")
    assert yas_nav_obj.get("section_label") == "Y"
    assert yas_nav_obj.get("label") == "Yasna"
    assert len(yas_nav_obj.get("contains")) > 0
    assert yas_nav_obj.get("contains")[0].get("seconds") < yas_nav_obj.get("contains")[
        -1
    ].get("seconds")
    assert par_nav_obj.get("section_label") == "Par"
    assert par_nav_obj.get("label") == "Paragnā"
    assert len(par_nav_obj.get("contains")) > 0
    assert par_nav_obj.get("contains")[0].get("seconds") < par_nav_obj.get("contains")[
        -1
    ].get("seconds")
