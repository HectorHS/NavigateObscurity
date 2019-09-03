from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.


def index(request):
    return render(request, 'worlddata/index.html')


def death(request):
    return render(request, 'worlddata/death.html')
