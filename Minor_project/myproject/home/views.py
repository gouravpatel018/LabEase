from django.shortcuts import render , redirect
from .models import CustomUser 
from django.contrib.auth.models import User , auth
from django.contrib.auth import authenticate ,login 
from django.contrib import messages
from rest_framework.response import Response 
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from rest_framework.views import APIView 
from rest_framework.permissions import AllowAny
from .serializers import login_serializer , userSerializer
from rest_framework_simplejwt.tokens import RefreshToken  # type: ignore
from rest_framework import generics
from rest_framework.response import Response

# Create your views here.


class loginView(generics.GenericAPIView):
    serializer_class = login_serializer

    def post(self , request , *args , **kwargs):
        username = request.data.get('username')
        password = request.data.get('password')
        user = auth.authenticate(username=username , password= password)

        if user is not None:
            refresh = RefreshToken.for_user(user)
            user_serializer = userSerializer(user).data 
            return Response({
                "refresh" : str(refresh) ,
               "access" : str(refresh.access_token),
               'user' : user_serializer
            })
        else :
            return Response({'detail':'Invalid credentials'} , status=401)
  



