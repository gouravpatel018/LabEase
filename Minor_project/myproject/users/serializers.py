from rest_framework import serializers
from .models import customer_user , CustomUser
from test_request.models import test_request   # type: ignore

class user_registration_serializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', write_only=True)
    email = serializers.CharField(source = 'user.email' , write_only = True)
    password = serializers.CharField(source = 'user.password' , write_only = True)

    class Meta:
        model = customer_user
        fields = ['full_name' ,'email' , 'username', 'password' , 'address', 'pincode' , 'date_of_birth'  ]

    def validate(self, data):
      username = data['user']['username']
      email = data['user']['email']
    
      if CustomUser.objects.filter(username=username).exists():
        raise serializers.ValidationError({"username": "This username is already taken."})
    
      if CustomUser.objects.filter(email=email).exists():
        raise serializers.ValidationError({"email": "This email is already registered."})
    
      return data
    def create(self, validated_data):
       user_data = validated_data.pop('user')
       username = user_data['username']
       password = user_data['password']
       email = user_data['email']
       user = CustomUser.objects.create_user(username=username, email=email, password=password, user_type='cust')
       customer = customer_user.objects.create(user = user , **validated_data)
       return customer
    
class user_info_serializer(serializers.ModelSerializer):
   full_name = serializers.CharField(source='user_profile.full_name',read_only=True)
   address = serializers.CharField(source = 'user_profile.address',read_only = True)
   pincode = serializers.CharField(source = 'user_profile.pincode' , read_only = True)
   date_of_birth = serializers.DateField(source='user_profile.date_of_birth' , read_only = True)

   class Meta:
      model = CustomUser
      fields = ['username' , 'full_name' , 'address' , 'pincode' , 'date_of_birth']

class TestRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = test_request
        exclude = ['user','lab']  # user will be filled automatically in view


    
       