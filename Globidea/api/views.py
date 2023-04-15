from bs4 import BeautifulSoup
import requests

from django.shortcuts import render, redirect
from django.shortcuts import render
from django.http import JsonResponse


from .serializers import scraped_data_serializer, saved_data_serializer, header_serializer, admin_serializer
from .models import scraped_data, saved_data, headers, adminInfo

from rest_framework import generics, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import authentication, permissions


@api_view(['GET'])
def apiOverview(request):
    api_urls = {
        'scraped_data_view':'/scraped_data_view/', #GET
        'saved_data':'/saved_data/', #GET
        'scraped_data_create':'/scraped_data_create/'
    }
    return JsonResponse(api_urls)

@api_view(['GET'])
def scraped_data_view(request):
    scrape = scraped_data.objects.all()

    #many=True since we want to view all data
    # set many=False and provide primary key/id to view individual data
    serializer = scraped_data_serializer(scrape, many=True)

    #set safe=False so we can pass non-dict objects
    return JsonResponse(serializer.data, safe=False)

@api_view(['POST'])
def scraped_data_create(request):
    # drop all data
    scraped_data.objects.all().delete()
    
    # retrieve url
    url = request.POST.get('url')

    # validate url
    try:
        response = requests.get(url)
        response.raise_for_status()
    except (requests.exceptions.RequestException, ValueError):
        return JsonResponse({'error': 'Invalid URL or unable to connect'}, status=400)

    #scrape - find all <p> tags
    soup = BeautifulSoup(response.content, 'html.parser')
    p_tags = soup.find_all('p')
    p_tags_text = [p.text for p in p_tags]

    for text in p_tags_text:
        newString = text.replace(" ","%20")
        scraped_data.objects.create(
            # id is auto generated in models
            info=text,
            curator_url=url,
            gen_url= url + "#:~:text=" + newString
        )
        

    scrape = scraped_data.objects.all()
    serializer = scraped_data_serializer(scrape, many=True)
    return JsonResponse(serializer.data, safe=False)
    

@api_view(['GET'])
def saved_data_view(request):
    data = saved_data.objects.all()
    serializer = saved_data_serializer(data, many=True)
    return JsonResponse(serializer.data, safe=False)

@api_view(['GET'])
def header_view(request):
    header = headers.objects.all()
    serializer = header_serializer(header, many=True)
    return JsonResponse(serializer.data, safe=False)

api_view(['GET'])
def adminInfo_view(request):
    admin = adminInfo.objects.all()
    serializer = admin_serializer(admin, many=True)
    return JsonResponse(serializer.data, safe=False)


    
# class scraped_data_view(generics.CreateAPIView): # returns to us all the scraped data
#     # Changing CreateAPIView to ListAPIView simply lists the information
#     # http://127.0.0.1:8000/api/scrape
#     queryset = scraped_data.objects.all()
#     serializer_class = scraped_data_serializer

# class curator_url_view(generics.CreateAPIView): # retrieve URL --> POST request
#     serializer_class = get_curator_url_serializer

#     def post(self, request, format=None):
#         serializer = self.serializer_class(data = request.data)
#         if serializer.is_valid():
#              curator_url = serializer.data.curator_url

# class saved_data_view(generics.CreateAPIView):
#     queryset = saved_data.objects.all()
#     serializer_class = saved_data_serializer

# class header_view(generics.CreateAPIView):
#     queryset = headers
#     serializer_class = header_serializer

# class admin_view(generics.CreateAPIView):
#     queryset = adminInfo
#     serializer_class = admin_serializer






# @api_view(['POST'])
# def scrape_data_func(request):
#     if request.method == 'POST':
#         url = request.POST.get('url')
#         response = requests.get(url)
#         soup = BeautifulSoup(response.text, 'html.parser')
#         p_tags = [p.text for p in soup.find_all('p')]
#         return JsonResponse({'p_tags': p_tags})




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