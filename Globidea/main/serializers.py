from rest_framework import serializers
from .models import info, subheading, Phase

class infoSerializer(serializers.ModelSerializer):
    class Meta:
        model = info
        fields = '__all__' #serialize all fields

class subHeadingSerializer(serializers.ModelSerializer):
    class Meta:
        model = subheading
        fields = '__all__' #serialize all fields

class phaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Phase
        fields = '__all__' #serialize all fields