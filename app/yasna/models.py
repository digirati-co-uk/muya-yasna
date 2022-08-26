from django.utils import timezone
from django.db import models
from model_utils.models import TimeStampedModel
from django.contrib.postgres.fields import IntegerRangeField, DateTimeRangeField


class YasnaObject(TimeStampedModel):
    """
    Quick place holder for Yasna objects
    """

    id = models.IntegerField(primary_key=True, unique=True)
    cross_references = models.ManyToManyField("self", symmetrical=False)
    label = models.CharField(max_length=255, default="")
    name_in_avestan = models.TextField(default="")
    name_in_middle_persian = models.TextField(default="")
    name_in_gujarati = models.TextField(default="")
    definition = models.TextField(default="")
    description_of_action = models.TextField(default="")
    function = models.TextField(default="")
    where_during_ritual = models.TextField(default="")
    interpretation = models.TextField(default="")
    references = models.TextField(default="")
    collaborator = models.CharField(max_length=255, default="")

    def ordered_images(self):
        return self.images.all().order_by("seq_num")

    class Meta:
        # Add a postgres index for the search_vector
        indexes = [
            models.Index(fields=["id"]),
            models.Index(fields=["label"]),
        ]
        ordering = ['id']

class YasnaObjectImage(models.Model):
    id = models.CharField(primary_key=True, unique=True, max_length=255, default="")
    yasna_object = models.ForeignKey(YasnaObject, related_name="images", null=True, on_delete=models.CASCADE)
    image = models.FileField(upload_to="yasna_object_images/", max_length=255)
    seq_num = models.IntegerField(default=0)

class FrameRangeId(models.Model):
    id = models.IntegerField(unique=True, primary_key=True, auto_created=False)
    frames = IntegerRangeField()
    temporal = DateTimeRangeField(blank=True, null=True)

class YasnaAnnotation(models.Model):
    """ Storage for all text objects related to the videos,
        as derived from the EAF source.
        """
    id = models.IntegerField(unique=True, primary_key=True)
    type = models.CharField(max_length=100)
    label = models.CharField(max_length=100)
    html = models.TextField()
    framez = models.ManyToManyField(FrameRangeId, related_name='annotations')

    class Meta:
        indexes = [
                models.Index(fields=['type']),
                models.Index(fields=['label'])
                ]


class TrackedId(models.Model):
    """
    Quick placeholder for Yasna object tracking data
    """
    id = models.IntegerField(unique=True, primary_key=True, auto_created=False)
    x_centre = models.FloatField()
    y_centre = models.FloatField()
    width = models.FloatField()
    height = models.FloatField()
    framez = models.ManyToManyField(
        FrameRangeId,
        related_name="boxes",
    )
    yasnaobject = models.ForeignKey(
        YasnaObject,
        related_name="objectboundingbox",
        on_delete=models.CASCADE,
        blank=True,
        null=True,
    )
