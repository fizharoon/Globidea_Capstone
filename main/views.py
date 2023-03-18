from django.shortcuts import render, redirect
from bs4 import BeautifulSoup
from django.http import JsonResponse
import requests
from . models import models
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import info, subheading,Phase
from .serializers import infoSerializer, phaseSerializer, subHeadingSerializer



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


@api_view(['GET'])
def getInfo(request):
    info = info.objects.all() # all objects
    serializer = infoSerializer(info, many=True) # serialize all objects
    return Response(serializer.data)