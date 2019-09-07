from django.views.generic import TemplateView

from main.models import Page

# Create your views here.


class HomeView(TemplateView):

    template_name = 'main/home.html'

    def get_context_data(self, **kwargs):
        data_pages = Page.objects.filter(parent='worlddata')
        context = {
            'data_pages': data_pages
        }
        return context
