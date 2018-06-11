from django.contrib import admin
from .models import Airport, Plane, Flight


@admin.register(Airport)
class AirportAdmin(admin.ModelAdmin):
    pass


@admin.register(Plane)
class PlaneAdmin(admin.ModelAdmin):
    pass


@admin.register(Flight)
class FlightAdmin(admin.ModelAdmin):
    list_display = ('id', 'start_airport', 'target_airport', 'plane')
