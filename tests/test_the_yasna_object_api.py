import pytest
import requests
import urllib.parse


def test_api_objects_get(http_service):
    response = requests.get(f"{http_service}/api/yasna/object/")
    assert response.status_code == 200
    j = response.json()
    assert len(j.get("results")) > 0


# Single object, single fwd cross ref, and images
def test_get_single_object_0(http_service):
    response = requests.get(f"{http_service}/api/yasna/object/0")
    assert response.status_code == 200
    j = response.json()
    assert j["id"] == 0
    assert j["label"] == "Assistant priest"
    assert j["url"] == http_service + "/api/yasna/object/0"
    assert j["cross_references"] == [
        {"id": 4, "label": "Chief priest"},
        {"id": 69, "label": "List of entries"},
    ]
    assert j["object_images"] == [
        {
            "image": "http://127.0.0.1:8000/media/yasna_object_images/1_1_AssistantPriest_640x503_144.png"
        },
        {
            "image": "http://127.0.0.1:8000/media/yasna_object_images/1_2_AssistantPriest_640x668_144.png"
        },
    ]


# Single object, multiple fwd cross ref, and images
def test_get_single_object_4(http_service):
    response = requests.get(f"{http_service}/api/yasna/object/4")
    assert response.status_code == 200
    j = response.json()
    assert j["id"] == 4
    assert j["label"] == "Chief priest"
    assert j["url"] == http_service + "/api/yasna/object/4"
    assert j["cross_references"] == [
        {"id": 0, "label": "Assistant priest"},
        {"id": 1, "label": "Bread"},
        {"id": 3, "label": "Bundle"},
        {"id": 16, "label": "Haoma"},
        {"id": 52, "label": "Libation"},
        {"id": 69, "label": "List of entries"},
    ]
    assert j["object_images"] == [
        {
            "image": "http://127.0.0.1:8000/media/yasna_object_images/5_1_ChiefPriest_640x814_144.png"
        },
        {
            "image": "http://127.0.0.1:8000/media/yasna_object_images/5_2_ChiefPriest_640x814_144.png"
        },
    ]


def test_get_single_object_1(http_service):
    response = requests.get(f"{http_service}/api/yasna/object/1")
    assert response.status_code == 200
    j = response.json()
    assert j["id"] == 1
    assert j["label"] == "Bread"
    assert j["url"] == f"{http_service}/api/yasna/object/1"
    assert j["cross_references"] == [
        {"id": 5, "label": "Clarified butter"},
        {"id": 44, "label": "Tray"},
        {"id": 45, "label": "Tray for bread"},
        {"id": 69, "label": "List of entries"},
    ]
    assert j["object_images"] == [
        {"image": f"{http_service}/media/yasna_object_images/2_1_Bread_640x532_72.jpg"},
    ]


# Reverse cross ref and image
def test_get_single_object_5(http_service):
    response = requests.get(f"{http_service}/api/yasna/object/5")
    assert response.status_code == 200
    j = response.json()
    assert j["id"] == 5
    assert j["label"] == "Clarified butter"
    assert j["url"] == f"{http_service}/api/yasna/object/5"
    assert j["cross_references"] == [
        {"id": 1, "label": "Bread"},
        {"id": 69, "label": "List of entries"},
    ]
    assert j["object_images"] == [
        {
            "image": "http://127.0.0.1:8000/media/yasna_object_images/6_1_Butter_640x532_72.jpg"
        }
    ]


# Another reverse cross ref to first object.
def test_get_single_object_44(http_service):
    response = requests.get(f"{http_service}/api/yasna/object/44")
    assert response.status_code == 200
    j = response.json()
    assert j["id"] == 44
    assert j["label"] == "Tray"
    assert j["url"] == f"{http_service}/api/yasna/object/44"
    assert j["cross_references"] == [
        {"id": 16, "label": "Haoma"},
        {"id": 34, "label": "Pomegranate twig"},
        {"id": 69, "label": "List of entries"},
    ]


# Object with multiple images
def test_get_single_object_27(http_service):
    response = requests.get(f"{http_service}/api/yasna/object/27")
    assert response.status_code == 200
    j = response.json()
    assert j["id"] == 27
    assert j["label"] == "Moon-shaped stands"
    assert j["url"] == f"{http_service}/api/yasna/object/27"
    assert j["cross_references"] == [
        {"id": 3, "label": "Bundle"},
        {"id": 4, "label": "Chief priest"},
        {"id": 8, "label": "Date-palm leaf"},
        {"id": 14, "label": "Frāgām wire"},
        {"id": 38, "label": "Ritual table"},
        {"id": 69, "label": "List of entries"},
    ]
    assert j["object_images"] == [
        {
            "image": "http://127.0.0.1:8000/media/yasna_object_images/28_1_MoonSS_640x427_72_WOF.jpg"
        },
        {
            "image": "http://127.0.0.1:8000/media/yasna_object_images/28_2_MoonSS_640x1383_72_WOF.jpg"
        },
        {
            "image": "http://127.0.0.1:8000/media/yasna_object_images/28_3_MoonSS_640x336_144.png"
        },
    ]


def test_get_tracked_objects(http_service):
    """Tests that the tracked endpoint returns the fulle tracked object data."""
    response = requests.get(f"{http_service}/api/yasna/tracked")
    assert response.status_code == 200
    j = response.json()
    assert len(j.get("results")) > 0
    first_result = j.get("results")[0]
    assert first_result.get("x_centre") != None
    assert first_result.get("y_centre") != None
    assert first_result.get("width") != None
    assert first_result.get("height") != None
    assert len(first_result.get("framez")) > 0
    assert first_result.get("yasnaobject") != None
