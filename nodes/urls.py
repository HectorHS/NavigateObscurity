from django.urls import path
from .views import HeadStrongView, IndexView, GotmView, ElasticView, GgsView, HLEmotionsView

app_name = 'nodes'
urlpatterns = [
    path('', IndexView.as_view(), name='index'),
    path('head-strong', HeadStrongView.as_view(), name='head-strong'),
    path('gardens-of-the-moon', GotmView.as_view(), name='gardens-of-the-moon'),
    path('elastic-thinking', ElasticView.as_view(), name='elastic-thinking'),
    path('guns-germs-and-steel', GgsView.as_view(), name='guns-germs-and-steel'),
    path('huberman-lab-emotions', HLEmotionsView.as_view(), name='huberman-lab-emotions'),
]
