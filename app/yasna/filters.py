from rest_framework.filters import BaseFilterBackend
import logging
import datetime

from .frame_utils import (
        datetime_to_milliseconds, 
        milliseconds_to_frame, 
        get_frame_from_query_params, 
        )

logger = logging.getLogger(__name__)


class FrameListFilter(BaseFilterBackend):
    def filter_queryset(self, request, queryset, view):
        """
        Return a filtered queryset.
        """
        frame = get_frame_from_query_params(request)
        if frame is not None:  
            queryset = queryset.filter(frames__contains=frame)
        return queryset

