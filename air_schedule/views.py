import json

from django.http import JsonResponse
from django.views.decorators.http import require_POST
from rest_framework.generics import ListAPIView
from air_schedule.models import Airport, Plane
from air_schedule.serializers import PlaneSerializer, AirportSerializer
from django.db import connection
from datetime import datetime, timedelta
from collections import defaultdict, Counter


def calculate(start_date_str, end_date_str, airport):
    cursor = connection.cursor()
    start_date = datetime.strptime(start_date_str, '%d.%m.%Y')
    end_date = datetime.strptime(end_date_str, '%d.%m.%Y')
    request = '''
        select day_of_the_week, plane_id from air_schedule_flight as asf
        where start_airport_id={0} or target_airport_id={0};
    '''.format(airport)
    cursor.execute(request)
    flight_in_day = defaultdict(list)
    for item in cursor:
        flight_in_day[item[0]].append(item[1])

    for key in flight_in_day:
        flight_in_day[key] = Counter(flight_in_day[key])
    delta = end_date - start_date
    full_week = delta.days // 7
    airs = defaultdict(int)
    if full_week:
        for key in flight_in_day:
            for air_name in flight_in_day[key]:
                airs[air_name] += flight_in_day[key][air_name]
        for key in airs:
            airs[key] *= full_week
    if delta.days + 1 % 7:
        for day in [end_date - timedelta(days=x) for x in range(0, delta.days % 7 + 1)]:
            week_day = day.weekday()
            for air in flight_in_day[week_day]:
                airs[air] += flight_in_day[week_day][air]
    return [(air, airs[air])for air in airs]


@require_POST
def show_report(request, airport_pk):
    data = json.loads(request.body)
    start_date = data.get('start_date')
    end_date = data.get('end_date')
    result = calculate(start_date, end_date, airport_pk)
    return JsonResponse([{'plane': item[0], 'flight_count': item[1]} for item in result])


class PlaneList(ListAPIView):
    queryset = Plane.objects.all()
    serializer_class = PlaneSerializer


class AirportList(ListAPIView):
    queryset = Airport.objects.all()
    serializer_class = AirportSerializer
