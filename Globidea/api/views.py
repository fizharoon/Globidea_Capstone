from django.shortcuts import render, redirect
from bs4 import BeautifulSoup
from django.http import JsonResponse
import requests
from . models import models
from django.shortcuts import render
from rest_framework import generics
from .serializers import scraped_data_serializer, saved_data_serializer, header_serializer, admin_serializer
from .models import scraped_data, saved_data, headers, adminInfo


class scraped_data_view(generics.CreateAPIView): # returns to us all the scraped data
    # Changing CreateAPIView to ListAPIView simply lists the information
    # http://127.0.0.1:8000/api/scrape
    queryset = scraped_data.objects.all()
    serializer_class = scraped_data_serializer

class saved_data_view(generics.CreateAPIView):
    queryset = saved_data.objects.all()
    serializer_class = saved_data_serializer

class header_vew(generics.CreateAPIView):
    queryset = headers
    serializer_class = header_serializer

class admin_view(generics.CreateAPIView):
    queryset = adminInfo
    serializer_class = admin_serializer

'''
@api_view(['POST'])
def scrape(requests):
    url = "https://www.utah.edu/" #link
    response = requests.get(url) # response to url
    soup = BeautifulSoup(response.content, "html.parser") #parse
    
    paragraphs = {} #dict
    for i, p in enumerate(soup.find_all("p")): # for every <p> scraped we assign a unique anchor ID
        paragraphs.append({"id": f"p-{i}", "text": p.get_text()})

    for i in range(len(paragraphs)):
        instance = info(info_id=paragraphs["id":i], link=url, text=paragraphs["text":i])


    return JsonResponse(paragraphs, safe=False) #return as json response, fetch in react
'''
