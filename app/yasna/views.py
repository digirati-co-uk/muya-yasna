import logging
import datetime
from django.db.models import Q
from rest_framework import generics
from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.reverse import reverse
from django_filters.rest_framework import DjangoFilterBackend

from .models import (
    YasnaObject,
    YasnaAnnotation,
    TrackedId,
    FrameRangeId,
)
from .serializers import (
    YasnaNavigationSerializer,
    YasnaAnnotationRangeSerializer,
    YasnaObjectSerializer,
    YasnaAnnotationSerializer,
    TrackedSerializer,
    FrameRangeSerializer,
)
from .paginators import YasnaAnnotationRangePagination
from .filters import (
    FrameListFilter,
)

from .frame_utils import get_frame_from_query_params


logger = logging.getLogger(__name__)


@api_view(["GET"])
def api_root(request, format=None):
    return Response(
        {
            "yasna_navigation": reverse("navigation", request=request, format=format),
            "yasna_object": reverse("yasnaobject-list", request=request, format=format),
            "yasna_annotation": reverse("yasnaannotation-list", request=request, format=format),
            "yasna_annotation_range": reverse("yasnaannotation-range", request=request, format=format),
            "tracked": reverse("tracked-list", request=request, format=format),
            "framerange": reverse("framerange-list", request=request, format=format),
        }
    )


class YasnaNavigation(generics.ListAPIView):
    queryset = YasnaAnnotation.objects.filter(
        Q(type__exact="Chapter") | Q(type__exact="Stanza_Ref") | Q(type__exact="Stanza_SubDiv") | Q(type__exact="Ritual_Part")
    ).prefetch_related("framez")
    serializer_class = YasnaNavigationSerializer

    def format_navigation_output_list(self, output_dict):
        """The structure of the EAF transcription data is such that
        there isn't a direct link between the `Ritual_Part`s and
        the `Chapter`s. This modifies the output such that the
        Ritual_Parts are set as the parent node of the "Par" and
        "Yas" navigation trees.
        """
        output_list = []
        ritual_part_mappings = (("Par", "Paragnā"), ("Y", "Yasna"))

        for s_key, r_p_key in ritual_part_mappings:
            section_data = output_dict.get(s_key)
            ritual_part_data = output_dict.get(r_p_key)
            section = self.format_navigation_tree(s_key, section_data)
            ritual_part = self.format_navigation_tree(r_p_key, ritual_part_data)
            output_list.append(
                {
                    "label": ritual_part.get("label"),
                    "section_label": section.get("section_label"),
                    "seconds": ritual_part.get("seconds"),
                    "contains": section.get("contains"),
                }
            )
        return output_list

    def format_navigation_tree(self, section_id, label_dict):
        label = label_dict.pop("label", None)
        display_label = label_dict.pop("display_label", section_id)

        if label == display_label: 
            display_label = None
        _ = label_dict.pop("original_label", section_id)
        output = {
            "label": label, 
            "section_label": label_dict.pop("section_label", section_id),
            "seconds": label_dict.pop("seconds", 0),
        }
        if display_label: 
            output["display_label"] = display_label
        output["contains"] = sorted(
            (self.format_navigation_tree(k, v) for k, v in label_dict.items()),
            key=lambda x: x.get("seconds"),
        )
        return output

    def build_navigation_tree(self, data):
        output_dict = {}
        for annotation in data:
            node = output_dict
            for label_part in annotation.get("label").split("."):
                new_node = node.get(label_part, {})
                node[label_part] = new_node
                node = new_node
            new_node["label"] = annotation.get("label")
            new_node["display_label"] = annotation.get("display_label")
            new_node["original_label"] = annotation.get("html")
            new_node["section_label"] = label_part
            # These annotations should be associated with only a single FrameRangeId
            new_node["seconds"] = annotation.get("seconds")[0]
        return self.format_navigation_output_list(output_dict)

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        serializer = self.get_serializer(queryset, many=True)
        navigation_tree = self.build_navigation_tree(serializer.data)
        return Response(navigation_tree)


class YasnaObjectViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = YasnaObject.objects.all()
    serializer_class = YasnaObjectSerializer


class YasnaAnnotationViewSet(viewsets.ModelViewSet):
    queryset = YasnaAnnotation.objects.all()
    serializer_class = YasnaAnnotationSerializer


class TrackedViewSet(viewsets.ModelViewSet):
    queryset = TrackedId.objects.all()
    serializer_class = TrackedSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ["yasnaobject"]


class FrameRangeViewSet(viewsets.ModelViewSet):
    queryset = FrameRangeId.objects.all()
    serializer_class = FrameRangeSerializer
    filter_backends = [FrameListFilter]

    def list(self, request, *args, **kwargs):
        resp = super().list(request, *args, **kwargs)
        resp.data.update({"frame": get_frame_from_query_params(request)})
        return resp


class YasnaAnnotationRange(generics.ListAPIView):
    queryset = (
        FrameRangeId.objects.filter(annotations__type="Stanza_SubDiv")
        .order_by("frames")
        .prefetch_related("annotations")
    )
    pagination_class = YasnaAnnotationRangePagination
    serializer_class = YasnaAnnotationRangeSerializer
