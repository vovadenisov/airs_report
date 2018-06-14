"""airs URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.11/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
import re

from django.conf import settings
from django.conf.urls import url
from django.contrib import admin
from django.urls import include, re_path
from django.views.static import serve

from airs.views import render_base

urlpatterns = [
    re_path(
        r'^%s(?P<path>.*)$' % re.escape(settings.STATIC_URL.lstrip('/')),
        serve,
        {'document_root': settings.STATIC_ROOT}
    ),
    url(r'^admin/', admin.site.urls),
    url(r'^air-schedule/', include(('air_schedule.urls', 'air_schedule'), namespace='air_schedule')),
    url(r'^', render_base, name='base_template'),
]
