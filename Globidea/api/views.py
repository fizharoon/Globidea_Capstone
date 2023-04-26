from bs4 import BeautifulSoup
import requests

from django.shortcuts import render, redirect
from django.shortcuts import render
from django.http import JsonResponse
import json


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
        'scraped_data_create':'/scraped_data_create/',
        'saved_data_view':'/saved_data_view/', #GET
        'saved_data_create':'/saved_data_create/', #POST
        'admin':'/admin/',
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
        if text == '':
            continue
        scraped_data.objects.create(
            # id is auto generated in models
            info=text,
            curator_url=url,
            gen_url= genSourceURL(url, text)
        )
    scrape = scraped_data.objects.all()
    serializer = scraped_data_serializer(scrape, many=True)
    return JsonResponse(serializer.data, safe=False)

def genSourceURL(url,text):
    count = len(text.split())
    if count>6:
        first, last = text.split()[:3], text.split()[-3:]
        newFirst, newLast = ' '.join(first), ' '.join(last)
        modFirst, modLast = newFirst.replace(' ','%20'), newLast.replace(' ','%20')
        link = url + '#:~:text=' + modFirst + ',' + modLast
        return link
    newText = text.replace(' ','%20')
    link = url + '#:~:text=' + newText
    return link

@api_view(['POST'])
def saved_data_create(request):

    # idea:
    # Saved ID's from scraped_data table in a list "selected_checkboxes"
    # and filter the scraped_data table to have only those ID entries
    # store every left over entry in saved_data

    # Warning: Due to cross referencing, this method is not efficient and requires more memory
    # Future Plans: Save data to saved_data table directly instead of cross referencing

    data = request.body
    data_dict = json.load(data.decode("utf-8"))

    print('body: ', data_dict)

    # retrieve selected checkboxes, main header and subheader from request.POST
    # assuming we are storing selected information in a list
    selected_checkboxes = request.body.get('ids')
    main_header = request.body.get('main_header')
    sub_header = request.body.get('sub_header')
    
    # https://docs.djangoproject.com/en/4.2/topics/db/queries/
    # filter id's
    scraped_data_objs = scraped_data.objects.filter(id__in=selected_checkboxes)

    # create a new saved_data object for each selected checkbox
    for obj in scraped_data_objs:
        saved_data.objects.create(
            info=obj.info,
            curator_url=obj.curator_url,
            gen_url=obj.gen_url,
            main_header=main_header,
            sub_header=sub_header
        )

    # serialize data
    data = saved_data.objects.all()
    serializer = saved_data_serializer(data, many=True)
    print(scraped_data_objs, selected_checkboxes)
    print("Post request" , request.body)
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