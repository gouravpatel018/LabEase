from django.shortcuts import render , redirect
from django.contrib.auth.models import User , auth
from rest_framework.response import Response
from home.models import CustomUser
from rest_framework import generics
from rest_framework.views import APIView 
from rest_framework.permissions import AllowAny  ,IsAuthenticated
from .serializers import lab_registration_serializer , login_serializer , lab_info_serializer , TestRequestSerializer , UpdateRequestStatusSerializer
from rest_framework_simplejwt.tokens import RefreshToken , OutstandingToken ,BlacklistedToken  # type: ignore
from test_request.models import test_request #type:ignore
from .models import lab_user

# Create your views here.
class RegisterView(generics.CreateAPIView):
    queryset = CustomUser.objects.all()
    permission_classes = [AllowAny]
    serializer_class = lab_registration_serializer



class dashboardView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self , request):
        user = request.user
        if user.user_type == 'lab':
         user_serializer = lab_info_serializer(user) 
         return Response({
            'message' : 'welcome to the dashboard',
            'user' : user_serializer.data
          } , status=200)   
        else :
           return Response({
              'message' : 'only lab users are allowed'
           } ,status=403) 

class lab_logout_view(APIView):
   permission_classes = [IsAuthenticated]
   def post(self, request):
        try:
            # Blacklist all tokens for this user
            tokens = OutstandingToken.objects.filter(user=request.user)
            for token in tokens:
                _, _ = BlacklistedToken.objects.get_or_create(token=token)
            return Response({"message": "Logout successful"})
        except Exception as e:
            return Response({"error": "Logout failed"}, status=400)

class update_get_requests(APIView):
    
    permission_classes = [IsAuthenticated,]  # Ensure that the user is authenticated and is a lab user

    def get(self, request):
        # Get all requests associated with the logged-in lab user's username
        username = request.user.username  # Get the username of the logged-in lab user
        
        # Retrieve the lab_user instance associated with the logged-in user
        try:
            lab_user_obj = lab_user.objects.get(user__username=username)
        except lab_user_obj.DoesNotExist:
            return Response({"error": "Lab user not found."}, status=404)
        
        # Now filter by the lab_user instance
        requests = test_request.objects.filter(lab=lab_user_obj).order_by('-created_at')
        
        # Serialize the request data to display in the dashboard
        serializer = TestRequestSerializer(requests, many=True)
        return Response(serializer.data, status=200)

    def post(self, request):
        serializer = UpdateRequestStatusSerializer(data=request.data)
        if serializer.is_valid():
            try:
                lab_instance = lab_user.objects.get(user = request.user)
                # Filter by lab user and request_id to ensure secure match
                request_obj = test_request.objects.get(
                    lab = lab_instance , 
                    request_id=request.data.get('request_id')
                )
                # Update the fields
                request_obj.status = serializer.validated_data['status']
                request_obj.payment = serializer.validated_data['payment']
                request_obj.save()
                return Response({"message": "Request updated successfully."}, status=200)

            except test_request.DoesNotExist:
                return Response({"error": "Request not found or not assigned to you."}, status=404)

        return Response(serializer.errors, status=400)