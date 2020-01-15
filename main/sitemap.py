from django.contrib.sitemaps import Sitemap
from django.shortcuts import reverse

class MainSitemap(Sitemap):
    changefreq = "yearly"

    def items(self):
        return [
            'home',
            'worlddata:index',
            'worlddata:death',
            'worlddata:sustainability',
            'worlddata:biodiversity',
            'worlddata:migration',
            'nodes:index',
            'nodes:head-strong'
        ]

    def location(self, item):
        return reverse(item)
