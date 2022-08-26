from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
#from yasna.admin import admin as yasna_admin

from .views import (
    api_root,
    YasnaNavigation,
    YasnaAnnotationRange,
    YasnaObjectViewSet,
    YasnaAnnotationViewSet,
    TrackedViewSet,
    FrameRangeViewSet,
)

urlpatterns = [
    path("", api_root),
    path("navigation/", YasnaNavigation.as_view(), name="navigation"),

    path("annotation/", YasnaAnnotationViewSet.as_view({'get': 'list'}), name="yasnaannotation-list"),
    path("annotation/<int:pk>", YasnaAnnotationViewSet.as_view({'get': 'retrieve'}), name="yasnaannotation-detail"),
    path("annotation/range/", YasnaAnnotationRange.as_view(), name="yasnaannotation-range"),

    path("tracked/", TrackedViewSet.as_view({'get': 'list'}), name="tracked-list"),
    path("tracked/<int:pk>", TrackedViewSet.as_view({'get': 'retrieve'}), name="tracked-detail"),

    path("object/", YasnaObjectViewSet.as_view({'get':'list'}), name="yasnaobject-list"),
    path("object/<int:pk>", YasnaObjectViewSet.as_view({'get': 'retrieve'}), name="yasnaobject-detail"),

    path("framerange/", FrameRangeViewSet.as_view({'get': 'list'}), name="framerange-list"),
    path("framerange/<int:pk>", FrameRangeViewSet.as_view({'get': 'retrieve'}), name="framerange-detail"),

    #path('admin/', yasna_admin.site.urls),
]


urlpatterns = format_suffix_patterns(urlpatterns)
