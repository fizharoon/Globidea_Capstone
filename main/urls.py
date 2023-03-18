from django.urls import path
from .views import scrape

urlpatterns = [
    path('', scrape,name="scrape"),
    #path('phase/', views.getPhases, name="phases"),
    #path('phase/<str:pk>/', views.getPhase, name="phase")
]