import datetime
import pytz
import logging

EPOCH = datetime.datetime.fromtimestamp(0, tz=pytz.UTC)
FRAMERATE = 40

logger = logging.getLogger(__name__)

def milliseconds_to_datetime(ms):
    """ Create a datetime as ms (milliseconds) since the unix epoch. 
        """
    return EPOCH + datetime.timedelta(milliseconds=ms)

def datetime_to_milliseconds(dt):
    """ Return a datetime as milliseconds since the unix epoch 
        """
    epoch = EPOCH
    return int((dt - epoch).total_seconds() * 1000.0)

def datetime_to_seconds(dt):
    """ Return a datetime as a float of seconds since the unix epoch 
        """
    epoch = EPOCH
    return (dt - epoch).total_seconds()

def seconds_to_datetime(seconds):
    """ Create a datetime as seconds since the unix epoch. 
        """
    return EPOCH + datetime.timedelta(seconds=seconds)

def milliseconds_to_frame(ms): 
    """ Convert ms to the frame number at FRAMERATE. 
        """
    return int(ms / FRAMERATE) + 1

def get_frame_from_query_params(request): 
    frame = None
    if request.query_params.get("frame", None):
        frame = int(request.query_params.get("frame"))
    elif request.query_params.get("milliseconds", None):
        frame = milliseconds_to_frame(int(request.query_params.get("milliseconds")))
    elif request.query_params.get("time", None):
        time_obj = datetime.datetime.strptime(
            "01/01/1970 " + request.query_params.get("time"), "%d/%m/%Y %H:%M:%S:%f")
        frame = milliseconds_to_frame(datetime_to_milliseconds(time_obj))
    elif request.query_params.get("seconds", None):
        frame = int(round(float(request.query_params.get("seconds")) * 1000 / 40 + 1, 0))

    return frame
