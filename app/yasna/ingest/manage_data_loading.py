import logging
import pathlib
from fastavro import reader as fastreader
from ..models import (
    YasnaObject,
    YasnaObjectImage,
    FrameRangeId,
    TrackedId,
)

logger = logging.getLogger(__name__)


def delete_all_yasna_data():

    print("Deleting ManytoMany relations")
    TrackedId.framez.through.objects.all().delete()  # Delete ManytoMany relations
    print("Deleting TrackedId data")
    TrackedId.objects.all().delete()  # Delete the boxes
    print("Deleting FrameRangeId data")
    FrameRangeId.objects.all().delete()  # Delete the time / frame ranges
    print("Deleting YasnaObjectImage data")
    YasnaObjectImage.objects.all().delete()  # Delete Yasna Objects
    print("Deleting YasnaObject data")
    YasnaObject.objects.all().delete()  # Delete Yasna Object Images


def load_normalised(batch=10000, delete_existing=True, framef="", normf=""):

    framef_file = pathlib.Path(framef)
    with open(framef_file, "rb") as framef:
        framereader = fastreader(framef)
        frames = [
            FrameRangeId(id=frame["id"], frames=(frame["start"], frame["end"]))
            for frame in framereader
        ]
        FrameRangeId.objects.bulk_create(frames, batch_size=batch)

    normf_file = pathlib.Path(normf)
    with open(normf_file, "rb") as normf:
        normreader = fastreader(normf)
        through_objects = []
        boxes = []
        for tracked in normreader:
            for frame_id in tracked["framez_id"]:
                through_objects.append(
                    TrackedId.framez.through(
                        trackedid_id=tracked.get("id"), framerangeid_id=frame_id
                    )
                )
            boxes.append(
                TrackedId(**{k: v for k, v in tracked.items() if k != "framez_id"})
            )
        TrackedId.objects.bulk_create(boxes, batch_size=batch)
        TrackedId.framez.through.objects.bulk_create(
            through_objects, batch_size=batch, ignore_conflicts=True
        )
