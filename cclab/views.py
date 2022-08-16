from django.views.generic import TemplateView

# Create your views here.
class IndexView(TemplateView):
    template_name = 'cclab/index.html'

class GlobalLookupView(TemplateView):
    template_name = 'cclab/global_lookup.html'

class USSummaryView(TemplateView):
    template_name = 'cclab/us_summary.html'

class USLookupView(TemplateView):
    template_name = 'cclab/us_lookup.html'

class USComparisonView(TemplateView):
    template_name = 'cclab/us_comparison.html'

class GlobalComparisonView(TemplateView):
    template_name = 'cclab/global_comparison.html'

class GlobalSummaryView(TemplateView):
    template_name = 'cclab/global_summary.html'

    

