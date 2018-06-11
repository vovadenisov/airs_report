from rest_framework import serializers

from air_schedule.models import Plane, Airport


class PlaneSerializer(serializers.ModelSerializer):
    class Meta:
        model = Plane
        fields = ('id', 'name')


class AirportSerializer(serializers.ModelSerializer):
    class Meta:
        model = Airport
        fields = ('id', 'name')
