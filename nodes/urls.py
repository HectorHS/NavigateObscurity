from django.urls import path
from .views import HeadStrongView, IndexView, GotmView

app_name = 'nodes'
urlpatterns = [
    path('', IndexView.as_view(), name='index'),
    path('head-strong', HeadStrongView.as_view(), name='head-strong'),
    path('gardens-of-the-moon', GotmView.as_view(), name='gardens-of-the-moon'),
]
