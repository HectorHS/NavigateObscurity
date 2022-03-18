from django.urls import path
from .views import IndexView, GlobalLookupView, USSummaryView, USComparisonView, GlobalComparisonView

app_name = 'cclab'
urlpatterns = [
    path('', IndexView.as_view(), name='index'),
    path('global-variable-lookup', GlobalLookupView.as_view(), name='global_lookup'),
    path('us-summary', USSummaryView.as_view(), name='us_summary'),
    path('us-variable-comparison', USComparisonView.as_view(), name='us_comparison'),
    path('global-variable-comparison', GlobalComparisonView.as_view(), name='global_comparison'),
]
