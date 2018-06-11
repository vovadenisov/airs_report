from django.db import models

# Create your models here.


class Airport(models.Model):
    name = models.CharField(verbose_name='Аэропорт', max_length=255)

    def __str__(self):
        return self.name


class Plane(models.Model):
    name = models.CharField(verbose_name='Название самолета', max_length=255)

    def __str__(self):
        return '{} #{}'.format(self.name, self.id)


class Flight(models.Model):
    MONDAY = 0
    TUESDAY = 1
    WEDNESDAY = 2
    THURSDAY = 3
    FRIDAY = 4
    SATURDAY = 5
    SUNDAY = 6
    
    choices = (
        (MONDAY, 'mondey'),
        (TUESDAY, 'tuesday'),
        (WEDNESDAY, 'wednesday'),
        (THURSDAY, 'thursday'),
        (FRIDAY, 'friday'),
        (SATURDAY, 'saturday'),
        (SUNDAY, 'sunday')
    )
    
    start_airport = models.ForeignKey(
        Airport,
        verbose_name='Стартовый аэропорт',
        related_name='start_flight',
        on_delete=models.CASCADE,
    )
    target_airport = models.ForeignKey(
        Airport,
        verbose_name='Конечный аэропорт',
        related_name='target_flight',
        on_delete=models.CASCADE,
    )
    plane = models.ForeignKey(
        Plane,
        verbose_name=u'Самолет',
        related_name=u'flight',
        on_delete=models.CASCADE
    )
    day_of_the_week = models.PositiveSmallIntegerField(verbose_name=u'День недели', choices=choices)

    def __str__(self):
        return '{} {}'.format(str(self.start_airport), str(self.target_airport), str(self.plane))
