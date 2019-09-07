from django.template import RequestContext
from django.views.generic import TemplateView

from main.models import Page
from .context import Context

# Create your views here.


class HomeView(TemplateView):

    template_name = 'main/home.html'

    # def get_context_data(self, **kwargs):
    #     return Context().context
