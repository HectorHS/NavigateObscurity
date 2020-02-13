from django.views.generic import TemplateView

# Create your views here.


class HomeView(TemplateView):
    template_name = 'main/home.html'

class AboutView(TemplateView):
    template_name = 'main/about.html'

class ErrView(TemplateView):
    template_name = 'main/404.html'
