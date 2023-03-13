from django.urls import path
from django.contrib import admin
from . import views #import views from current directory
# urlpatterns = [
#     path("",views.index, name="index"),
# ]
urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.index, name='index')
]
