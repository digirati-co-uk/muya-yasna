import logging

from rest_framework import serializers

from .models import YasnaObject, YasnaObjectImage, YasnaAnnotation, FrameRangeId, TrackedId

from .frame_utils import datetime_to_seconds

logger = logging.getLogger(__name__)


class FramesRangeIdTimestamp(serializers.Serializer):
    def __init__(self, *args, **kwargs):
        self.range_timestamp = kwargs.pop("range_timestamp", "lower")
        super().__init__(*args, **kwargs)

    def to_representation(self, instance):
        if self.range_timestamp == "upper":
            dt = instance.temporal.upper
        elif self.range_timestamp == "lower":
            dt = instance.temporal.lower
        return datetime_to_seconds(dt)


class YasnaNavigationSerializer(serializers.ModelSerializer):
    seconds = FramesRangeIdTimestamp(
        many=True, read_only=True, source="framez", range_timestamp="lower"
    )
    display_label = serializers.SerializerMethodField()

    def get_display_label(self, annotation):
        label = annotation.label
        if annotation.type == 'Chapter' and annotation.label.startswith('Par'):
            frame = annotation.framez.first()
            chapter_title = frame.annotations.filter(type="Chapter_Title").first()
            label = chapter_title.html
        return label

    class Meta:
        model = YasnaAnnotation
        fields = ["id", "label", "display_label", "html", "seconds"]


class AnnotationSet(serializers.Serializer):

    annotation_langs = {
        "Av": "Avestan",
        "Pz": "Pazand",
    }

    def get_annotation_key_value(self, annotation):
        if annotation.type in ("Chapter", "Stanza_Ref", "Stanza_SubDiv"):
            value = annotation.label
        elif annotation.type in ("Stanza_Lang"):
            value = self.annotation_langs.get(annotation.html, annotation.html)
        else:
            value = annotation.html
        return annotation.type, value

    def to_representation(self, instance):
        queryset = (
            FrameRangeId.objects.exclude(pk=instance.pk)
            .filter(frames__overlap=instance.frames, annotations__isnull=False)
            .order_by("frames")
            .prefetch_related("annotations")
        )
        output = {}
        for f_r in queryset:
            for parent_annotation in f_r.annotations.all():
                annotation_key, annotation_value = self.get_annotation_key_value(
                    parent_annotation
                )
                output[annotation_key] = annotation_value
        for annotation in instance.annotations.all():
            annotation_key, annotation_value = self.get_annotation_key_value(annotation)
            output[annotation_key] = annotation_value
        return output


class YasnaAnnotationRangeSerializer(serializers.ModelSerializer):
    start_seconds = FramesRangeIdTimestamp(
        read_only=True, source="*", range_timestamp="lower"
    )
    end_seconds = FramesRangeIdTimestamp(read_only=True, source="*", range_timestamp="upper")
    annotations = AnnotationSet(read_only=True, source="*")

    class Meta:
        model = FrameRangeId
        fields = [
            "start_seconds",
            "end_seconds",
            "annotations",
        ]


class YasnaObjectImageOrderedSerializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = YasnaObjectImage
        fields = [
            "image"
        ]


class YasnaObjectSummarySerializer(serializers.ModelSerializer):
    """ """

    class Meta:
        model = YasnaObject
        fields = [
            "id",
            "label",
        ]


class YasnaObjectSerializer(serializers.HyperlinkedModelSerializer):
    """ """

    object_images = YasnaObjectImageOrderedSerializer(source="ordered_images", many=True)
    cross_references = YasnaObjectSummarySerializer(many=True)

    class Meta:
        model = YasnaObject
        fields = [
            "url",
            "id",
            "cross_references",
            "label",
            "name_in_avestan",
            "name_in_middle_persian",
            "name_in_gujarati",
            "definition",
            "description_of_action",
            "function",
            "where_during_ritual",
            "interpretation",
            "references",
            "collaborator",
            "object_images"
        ]
        extra_kwargs = {
            "url": {"view_name": "yasnaobject-detail", "lookup_field": "pk"}
        }


class YasnaAnnotationSerializer(serializers.HyperlinkedModelSerializer):
    """ """

    class Meta:
        model = YasnaAnnotation
        fields = ["url", "id", "type", "label", "html"]
        extra_kwargs = {
            "url": {"view_name": "yasnaannotation-detail", "lookup_field": "pk"}
        }


class TrackedSerializerSummary(serializers.HyperlinkedModelSerializer):
    yasnaobject = YasnaObjectSummarySerializer()

    class Meta:
        model = TrackedId
        fields = [
            "x_centre",
            "y_centre",
            "width",
            "height",
            "yasnaobject",
        ]


class FrameRangeSerializer(serializers.ModelSerializer):
    boxes = TrackedSerializerSummary(many=True)
    annotations = YasnaAnnotationSerializer(many=True)

    class Meta:
        model = FrameRangeId
        fields = ["boxes", "annotations"]
        # extra_kwargs = {"url": {"view_name": "framerange-detail", "lookup_field": "pk"}}


class FrameRangeSummarySerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = FrameRangeId
        fields = [
            "frames",
            "url",
        ]
        extra_kwargs = {"url": {"view_name": "framerange-detail", "lookup_field": "pk"}}


class TrackedSerializer(serializers.HyperlinkedModelSerializer):
    framez = FrameRangeSummarySerializer(many=True)
    yasnaobject = YasnaObjectSerializer()

    class Meta:
        model = TrackedId
        fields = ["x_centre", "y_centre", "width", "height", "framez", "yasnaobject"]
