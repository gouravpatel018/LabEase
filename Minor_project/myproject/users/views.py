from django.shortcuts import render , redirect
from rest_framework.views import APIView , Response
from django.contrib.auth.models import User , auth 
from django.contrib.auth.decorators import login_required 
from django.utils.decorators import method_decorator
from django.contrib import auth
from rest_framework import generics
from rest_framework.permissions import AllowAny , IsAuthenticated
from .serializers import user_registration_serializer , user_info_serializer , TestRequestSerializer
from .models import customer_user
from rest_framework_simplejwt.tokens import RefreshToken , OutstandingToken ,BlacklistedToken  # type: ignore
from test_request.models import test_request #type: ignore 
from labs.models import lab_user


# Create your views here.
class CustomerRegisterView(generics.CreateAPIView):
    queryset = customer_user.objects.all()
    permission_classes = [AllowAny]
    serializer_class = user_registration_serializer
    def create(self, request, *args, **kwargs):
        # Use serializer to validate and save data
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)

        # Customize your response
        return Response({
            "message": "Customer registered successfully!",
            "data": serializer.data
        }, status=201)
   
class  user_logout_view(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            refresh_token = request.data.get("refresh")
            token = RefreshToken(refresh_token)
            token.blacklist()

            return Response({"detail": "Logout successful"}, status=205)
        except Exception as e:
            return Response({"error": str(e)}, status=400)  

class user_dashboardView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self , request):
        user = request.user
        if not user.user_type == 'lab':
         user_serializer = user_info_serializer(user) 
         return Response({
            'message' : 'welcome to the dashboard',
            'user' : user_serializer.data
          } , status=200)   
        else :
           return Response({
              'message' : 'access denied'
           } ,status=403) 
        
class CreateAndListRequestView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        data = request.data.copy()
        lab_name = data.pop('lab_name', None)

        if not lab_name:
            return Response({"error": "lab_name is required."}, status=400)

        try:
         lab = lab_user.objects.get(lab_name=lab_name)  # Get the lab object from lab_user
        except lab_user.DoesNotExist:
            return Response({"error": "No lab found with this lab_name."}, status=400)

        serializer = TestRequestSerializer(data=data)
        if serializer.is_valid():
            serializer.save(user=request.user, lab=lab)  # Set both user and lab here
            return Response({"message": "Test request created successfully.", "data": serializer.data}, status=201)
    
        return Response(serializer.errors, status=400)

    def get(self, request):
        requests = test_request.objects.filter(user=request.user).order_by('-created_at')
        serializer = TestRequestSerializer(requests, many=True)
        return Response(serializer.data, status=200)        