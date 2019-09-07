from django.urls import include, path
from .views import BiodiversityView, DeathView, IndexView, MigrationView, SustainabilityView

app_name = 'worlddata'
urlpatterns = [
    path('', IndexView.as_view(), name='index'),
    path('death', DeathView.as_view(), name='death'),
    path('sustainability', SustainabilityView.as_view(), name='sustainability'),
    path('biodiversity', BiodiversityView.as_view(), name='biodiversity'),
    path('migration', MigrationView.as_view(), name='migration')
]
