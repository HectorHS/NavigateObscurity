from django.http import HttpResponseRedirect
from django.shortcuts import get_object_or_404
from django.views.generic import TemplateView

from main.models import Page
from main.forms import CommentForm

# Create your views here.


class IndexView(TemplateView):
    template_name = 'worlddata/index.html'


class DeathView(TemplateView):
    template_name = 'worlddata/death.html'
    page = get_object_or_404(Page, title="Death")

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        comments = self.page.comments.all()
        comment_form = CommentForm()
        context = {
            'comments': comments,
            'comment_form': comment_form,
            'title': self.page.title,
            'abstract': self.page.abstract
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
    page = get_object_or_404(Page, title="Sustainability")

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        comments = self.page.comments.all()
        comment_form = CommentForm()
        context = {
            'comments': comments,
            'comment_form': comment_form,
            'title': self.page.title,
            'abstract': self.page.abstract
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
    page = get_object_or_404(Page, title="Biodiversity")

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        comments = self.page.comments.all()
        comment_form = CommentForm()
        context = {
            'comments': comments,
            'comment_form': comment_form,
            'title': self.page.title,
            'abstract': self.page.abstract
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
    page = get_object_or_404(Page, title="Migration")

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        comments = self.page.comments.all()
        comment_form = CommentForm()
        context = {
            'comments': comments,
            'comment_form': comment_form,
            'title': self.page.title,
            'abstract': self.page.abstract
        }
        return context

    def post(self, request, *args, **kwargs):
        form = CommentForm(request.POST)
        if form.is_valid():
            comment = form.save(commit=False)
            comment.page = self.page
            comment.save()
        return HttpResponseRedirect(self.request.path_info)


class Covid19View(TemplateView):
    template_name = 'worlddata/covid19.html'
    page = get_object_or_404(Page, title="Covid-19")

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        comments = self.page.comments.all()
        comment_form = CommentForm()
        context = {
            'comments': comments,
            'comment_form': comment_form,
            'title': self.page.title,
            'abstract': self.page.abstract
        }
        return context

    def post(self, request, *args, **kwargs):
        form = CommentForm(request.POST)
        if form.is_valid():
            comment = form.save(commit=False)
            comment.page = self.page
            comment.save()
        return HttpResponseRedirect(self.request.path_info)
