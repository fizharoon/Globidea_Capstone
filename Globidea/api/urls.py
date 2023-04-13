from django.urls import path
from . import views

urlpatterns = [
    path('', views.apiOverview, name='api-overview'),
    path('scraped_data', views.scraped_data_view, name='scraped_data'),
    path('saved_data', views.saved_data_view, name='saved_data'),
    path('headers', views.header_view, name='headers'),
    path('admin', views.adminInfo_view, name='admin'),
]


