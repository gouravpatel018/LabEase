from rest_framework import serializers
from .models import CustomUser
from django.contrib.auth import authenticate

class userSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['username' , 'user_type']


class login_serializer(serializers.Serializer):
    username = serializers.CharField(required = True)
    password = serializers.CharField(required= True , write_only = True)



      