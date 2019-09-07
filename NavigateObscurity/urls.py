from django.contrib import admin
from django.conf import settings
from django.urls import include, path
from django.conf.urls.static import static
from main import views as main_views


urlpatterns = [
    path('', main_views.home, name='home'),
    path('admin/', admin.site.urls),
    path('data/', include('worlddata.urls'), name='data'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL,
                          document_root=settings.MEDIA_ROOT)
