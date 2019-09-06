from django.contrib import admin
from .models import Comment, Page

# Register your models here.
admin.site.register(Page)
admin.site.register(Comment)
