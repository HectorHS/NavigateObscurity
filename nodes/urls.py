from django.urls import path
from .views import HeadStrongView, IndexView

app_name = 'nodes'
urlpatterns = [
    path('', IndexView.as_view(), name='index'),
    path('head-strong', HeadStrongView.as_view(), name='head-strong'),
]
