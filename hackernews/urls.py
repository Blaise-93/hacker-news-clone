
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('news.urls', namespace='news')),
    path('api/auth/', include('profiles.urls', namespace='profiles')),
]
