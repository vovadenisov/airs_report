from django.conf.urls import url
from air_schedule.views import PlaneList, AirportList, show_report


urlpatterns = [
    url(r'^api/v1/plane/list/$', PlaneList.as_view(), name='planes'),
    url(r'^api/v1/airport/list/$', AirportList.as_view(), name='airports'),
    url(r'^api/v1/generate_report/(?P<airport_pk>\d+)/$', show_report, name='report'),
]
