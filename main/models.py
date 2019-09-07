from django.db import models
from django.utils import timezone

# Create your models here.


class Page(models.Model):
    title = models.CharField(max_length=200)
    abstract = models.TextField()
    parent = models.CharField(max_length=200)
    icon = models.FileField()
    slug = models.CharField(max_length=200)

    def __str__(self):
        return self.title


class Comment(models.Model):
    page = models.ForeignKey(
        'main.Page', on_delete=models.CASCADE, related_name='comments')
    author = models.CharField(max_length=200)
    message = models.TextField()
    created_date = models.DateTimeField(default=timezone.now)
    approved_comment = models.BooleanField(default=False)

    def __str__(self):
        return self.message
