from django.urls import path
from .views import scraped_data_view, saved_data_view

urlpatterns = [
    path('scrape_data', scraped_data_view.as_view()),
    path('saved_data', saved_data_view.as_view()),
]