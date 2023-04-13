from bs4 import BeautifulSoup
from . models import models
from django.shortcuts import render
from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import scraped_data_serializer, saved_data_serializer, header_serializer, admin_serializer, get_curator_url_serializer
from .models import scraped_data, saved_data, headers, adminInfo


class scraped_data_view(generics.CreateAPIView): # returns to us all the scraped data
    # Changing CreateAPIView to ListAPIView simply lists the information
    # http://127.0.0.1:8000/api/scrape
    queryset = scraped_data.objects.all()
    serializer_class = scraped_data_serializer

class curator_url_view(generics.APIView): # retrieve URL --> POST request
    serializer_class = get_curator_url_serializer

    def post(self, request, format=None):
        serializer = self.serializer_class(data = request.data)
        if serializer.is_valid():
             curator_url = serializer.data.curator_url

class saved_data_view(generics.CreateAPIView):
    queryset = saved_data.objects.all()
    serializer_class = saved_data_serializer

class header_view(generics.CreateAPIView):
    queryset = headers
    serializer_class = header_serializer

class admin_view(generics.CreateAPIView):
    queryset = adminInfo
    serializer_class = admin_serializer



'''

def link_gen():
    # will be used to custom make the link for long strings or short strings
    updated_info <-- regex (/\s+/g, "%20")


@api_view(['POST'])
def scrape(requests, user-url):
    # delete all data in scraped_data table
    scraped_data.objects.all().delete()
    url = user-url #link
    response = requests.get(url) # response to url
    soup = BeautifulSoup(response.content, "html.parser") #parse
    
    for i in soup.find_all("p"): # for every <p> scraped we assign a unique anchor ID
        info = p.get_text()
        # if info is > 6 words, create special link, (first 3 words, last 3 words)
        # pass string to link_gen() func
        # store entry
        # return
        gen_url --> call link_gen() func
        # store entry - p.get_text() --> info, gen_url --> gen-url

def store(requests):
    # store all attributes associated with saved_data model


'''