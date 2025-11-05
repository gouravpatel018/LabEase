from rest_framework import serializers
from .models import employee , employee_rgtd
from home.models import CustomUser

class emp_rgtn_serializer(serializers.ModelSerializer):
    username = serializers.CharField(source = 'employ.username')
    email = serializers.CharField(source = 'employ.email')
    password = serializers.CharField(source='employ.password' , write_only = True)

    class meta:
        model = employee
        fields = ['full_name' , 'username' , 'password' , 'email' ,'emp_id' , 'lab_name' ]

    def validate(self , data):
        username = data['employ']['username']
        email  = data['employ']['email']

        if CustomUser.objects.filter(username=username).exists():
            raise serializers.ValidationError({"username": "This username is already taken."})
    
        if CustomUser.objects.filter(email=email).exists():
            raise serializers.ValidationError({"email": "This email is already registered."})
        
        
        return data   
    
    def create(self, validated_data):

        return 

   