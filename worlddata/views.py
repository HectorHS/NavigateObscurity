from django.shortcuts import render
from django.http import HttpResponse

from main.models import Page

# Create your views here.


def index(request):
    pages = Page.objects.all()
    context = {
        'pages': pages
    }
    return render(request, 'worlddata/index.html', context)


def death(request):
    return render(request, 'worlddata/death.html')
