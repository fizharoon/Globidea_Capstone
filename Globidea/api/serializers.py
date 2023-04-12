from rest_framework import serializers
from .models import scraped_data, saved_data, headers, adminInfo

class scraped_data_serializer(serializers.ModelSerializer):
    class Meta:
        model = scraped_data
        fields = '__all__'

class saved_data_serializer(serializers.ModelSerializer):
    class Meta:
        model = saved_data
        fields = '__all__'

class header_serializer(serializers.ModelSerializer):
    class Meta:
        model = headers
        fields = '__all__'

class admin_serializer(serializers.ModelSerializer):
    class Meta:
        model = adminInfo
        fields = '__all__'