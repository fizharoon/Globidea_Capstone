from django.urls import path
from .views import scraped_data_view, saved_data_view, curator_url_view, header_view, admin_view

urlpatterns = [
    path('scrape_data', scraped_data_view.as_view()),
    path('url_data', curator_url_view.as_view()),
    path('saved_data', saved_data_view.as_view()),
    path('header_view', header_view.as_view()),
    path('admin_view', admin_view.as_view()),
]