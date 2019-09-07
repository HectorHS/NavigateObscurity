from django.http import HttpResponseRedirect
from django.shortcuts import get_object_or_404
from django.views.generic import TemplateView

from main.models import Comment, Page
from main.forms import CommentForm

# Create your views here.


class IndexView(TemplateView):
    template_name = 'worlddata/index.html'

    def get_context_data(self, **kwargs):
        pages = Page.objects.filter(parent='worlddata')
        context = {
            'pages': pages
        }
        return context


class DeathView(TemplateView):
    template_name = 'worlddata/death.html'
    page = get_object_or_404(Page, title="death")

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


class SustainabilityView(TemplateView):
    template_name = 'worlddata/sustainability.html'
    page = get_object_or_404(Page, title="sustainability")

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


class BiodiversityView(TemplateView):
    template_name = 'worlddata/biodiversity.html'
    page = get_object_or_404(Page, title="biodiversity")

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

class MigrationView(TemplateView):
    template_name = 'worlddata/migration.html'
    page = get_object_or_404(Page, title="migration")

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
