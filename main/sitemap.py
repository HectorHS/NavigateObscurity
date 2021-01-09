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
            'worlddata:covid-19',
            'nodes:index',
            'nodes:head-strong',
            'nodes:gardens-of-the-moon'
        ]

    def location(self, item):
        return reverse(item)
