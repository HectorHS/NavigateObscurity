from django.urls import include, path
from .views import DeathView, IndexView

urlpatterns = [
    path('', IndexView.as_view(), name='index'),
    path('death', DeathView.as_view(), name='death')
]
