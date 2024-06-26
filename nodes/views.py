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


class GotmView(TemplateView):
    template_name = 'nodes/gotm.html'
    page = get_object_or_404(Page, slug="gardens-of-the-moon")

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


class ElasticView(TemplateView):
    template_name = 'nodes/elastic.html'
    page = get_object_or_404(Page, slug="elastic-thinking")

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

class GgsView(TemplateView):
    template_name = 'nodes/ggs.html'
    page = get_object_or_404(Page, slug="guns-germs-and-steel")

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
    
class HLEmotionsView(TemplateView):
    template_name = 'nodes/hl-emotions.html'
    page = get_object_or_404(Page, slug="huberman-lab-emotions")

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
    
class DGView(TemplateView):
    template_name = 'nodes/dg.html'
    page = get_object_or_404(Page, slug="deadhouse-gates")

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
