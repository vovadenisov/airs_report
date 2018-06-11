from django.shortcuts import render


def render_base(request):
    return render(request, 'base.html')
