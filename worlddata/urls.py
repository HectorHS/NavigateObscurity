from django.urls import path
from .views import BiodiversityView, DeathView, IndexView, MigrationView, SustainabilityView, Covid19View, CooperationConflictLabView

app_name = 'worlddata'
urlpatterns = [
    path('', IndexView.as_view(), name='index'),
    path('death', DeathView.as_view(), name='death'),
    path('sustainability', SustainabilityView.as_view(), name='sustainability'),
    path('biodiversity', BiodiversityView.as_view(), name='biodiversity'),
    path('migration', MigrationView.as_view(), name='migration'),
    path('covid-19', Covid19View.as_view(), name='covid-19'),
    path('cooperation-conflict-lab', CooperationConflictLabView.as_view(),
         name='cooperation-conflict-lab')
]
