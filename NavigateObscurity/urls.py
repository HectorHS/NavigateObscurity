from django.contrib import admin
from django.conf import settings
from django.urls import include, path
from django.conf.urls.static import static
from django.contrib.sitemaps.views import sitemap
from main.sitemap import MainSitemap
from main.views import HomeView, ErrView

sitemaps = {
    'main': MainSitemap
}

urlpatterns = [
    path('', HomeView.as_view(), name='home'),
    path('admin/', admin.site.urls),
    path('data/', include('worlddata.urls'), name='data'),
    path('notes/', include('nodes.urls'), name='notes'),
    path('sitemap.xml', sitemap, {'sitemaps': sitemaps}),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL,
                          document_root=settings.MEDIA_ROOT)

handler404 = ErrView.as_view()
