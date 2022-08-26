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
    response = requests.get(http_service + "/yasna/")
    assert response.status_code == status
