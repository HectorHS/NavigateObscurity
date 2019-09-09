# Create your views here.

from django.http import HttpResponseRedirect
from django.shortcuts import get_object_or_404
from django.views.generic import TemplateView

from main.models import Page
from main.forms import CommentForm

# Create your views here.


class IndexView(TemplateView):
    template_name = 'nodes/index.html'


class HeadStrongView(TemplateView):
    template_name = 'nodes/head-strong.html'
    page = get_object_or_404(Page, slug="head-strong")

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        comments = self.page.comments.all()
        comment_form = CommentForm()
        context = {
            'comments': comments,
            'comment_form': comment_form
        }
        return context

    def post(self, request, *args, **kwargs):
        form = CommentForm(request.POST)
        if form.is_valid():
            comment = form.save(commit=False)
            comment.page = self.page
            comment.save()
        return HttpResponseRedirect(self.request.path_info)
