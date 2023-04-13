from rest_framework import serializers
from .models import scraped_data, saved_data, headers, adminInfo


# Sending info to curator page
class scraped_data_serializer(serializers.ModelSerializer):
    class Meta:
        model = scraped_data
        fields = '__all__'
    
# Retrieving from curator page
class get_curator_url_serializer(serializers.ModelSerializer):
    class Meta:
        model = scraped_data
        fields = 'url'

# store selected info from curator page
class saved_data_serializer(serializers.ModelSerializer):
    class Meta:
        model = saved_data
        fields = '__all__'

# Selecting headers in curator
class header_serializer(serializers.ModelSerializer):
    class Meta:
        model = headers
        fields = '__all__'

# user authentication
class admin_serializer(serializers.ModelSerializer):
    class Meta:
        model = adminInfo
        fields = '__all__'

# Might need to create another serializer to GET info for user drop down tables
