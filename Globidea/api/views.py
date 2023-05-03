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

    data = json.loads(request.body)
    selected_checkboxes = data.get('ids')
    main_header = data.get('main_header')
    sub_header = data.get('sub_header')

    for i in selected_checkboxes:
        count=0
        scraped_data_objs = scraped_data.objects.filter(id=i).values()
        saved_data.objects.create(
            id=i,
            info=scraped_data_objs[count]['info'],
            curator_url=scraped_data_objs[count]['curator_url'],
            gen_url=scraped_data_objs[count]['gen_url'],
            main_header=main_header,
            sub_header=sub_header

        )
        count+=1
        
    # serialize data
    data = saved_data.objects.all()
    serializer = saved_data_serializer(data, many=True)

    return JsonResponse(serializer.data, safe=False)

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