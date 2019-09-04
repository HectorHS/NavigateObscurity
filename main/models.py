from django.db import models

# Create your models here.


class Page(models.Model):
    title = models.CharField(max_length=200)
    abstract = models.TextField()
    parent = models.CharField(max_length=200)
    icon = models.FileField()

    def __str__(self):
        return self.title
