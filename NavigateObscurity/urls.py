from django.contrib import admin
from django.conf import settings
from django.urls import include, path
from django.conf.urls.static import static
from main.views import HomeView


urlpatterns = [
    path('', HomeView.as_view(), name='home'),
    path('admin/', admin.site.urls),
    path('data/', include('worlddata.urls'), name='data'),
    path('notes/', include('nodes.urls'), name='notes'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL,
                          document_root=settings.MEDIA_ROOT)
