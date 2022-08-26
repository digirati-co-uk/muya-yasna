import logging 
import datetime
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.response import Response
from rest_framework.utils.urls import remove_query_param, replace_query_param

from .frame_utils import (
        seconds_to_datetime, 
        datetime_to_seconds,
        )

logger = logging.getLogger(__name__)


class YasnaAnnotationRangePagination(LimitOffsetPagination):
    page_size = 10
    max_page_size = 100
    from_query_param = 'from_seconds' 

    def get_from_datetime(self, request): 
        from_seconds = request.query_params.get(self.from_query_param)
        if from_seconds: 
            return seconds_to_datetime(float(from_seconds))
        else:
            return None

    def get_next(self): 
        url = self.request.build_absolute_uri()
        next_seconds = datetime_to_seconds(self.page_objects[-1].temporal.lower)
        return next_seconds, replace_query_param(url, self.from_query_param, next_seconds)

    def get_start(self): 
        return datetime_to_seconds(self.page_objects[0].temporal.lower)

    def paginate_queryset(self, queryset, request, view=None): 
        self.request = request
        if from_datetime:= self.get_from_datetime(request): 
            queryset = queryset.filter(temporal__endswith__gt=from_datetime) 

        if self.get_count(queryset) == 0: 
            return []
        self.page_objects = list(queryset[:self.page_size])
        return self.page_objects

    def get_paginated_response(self, data):
        next_seconds, next_url = self.get_next()
        start_seconds = self.get_start() 
        response_dict = {
            'next': next_url, 
            'next_seconds': next_seconds, 
            'start_seconds': start_seconds, 
            'annotation_sets': data
        }
        return Response(response_dict)
