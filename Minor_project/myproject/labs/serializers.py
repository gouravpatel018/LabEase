from rest_framework import serializers
from home.models import CustomUser
from .models import lab_user , lab_regtd
from test_request.models import test_request #type: ignore

class lab_registration_serializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', write_only=True)
    user_type = serializers.CharField(source='user.user_type', write_only=True)
    email = serializers.CharField(source = 'user.email' , write_only = True)

    class Meta:
        model = lab_user
        fields = ['username', 'password' ,'email' , 'user_type', 'lab_name', 'lab_id', 'lab_location', 'lab_pincode' ,'lab_open', 'lab_close' ]

    def validate(self, data):
      username = data['user']['username']
      email = data['user']['email']
    
      if CustomUser.objects.filter(username=username).exists():
        raise serializers.ValidationError({"username": "This username is already taken."})
    
      if CustomUser.objects.filter(email=email).exists():
        raise serializers.ValidationError({"email": "This email is already registered."})
    
      return data
 

    def validate_lab_id(self, value):
      try:
         lab_entry = lab_regtd.objects.get(lab_id=value)
         if lab_entry.is_used:
            raise serializers.ValidationError("Lab ID already used.")
      except lab_regtd.DoesNotExist:
               raise serializers.ValidationError("Invalid Lab ID.")
      return value

    def create(self, validated_data):
        user_data = validated_data.pop('user')
        username = user_data['username']
        password = validated_data['password']
        email = user_data['email']
        user_type = user_data['user_type']
        lab_id = validated_data['lab_id']

        # Create CustomUser
        user = CustomUser.objects.create_user(username=username, email=email, password=password, user_type='lab')

        # Create lab_user linked to CustomUser
        lab = lab_user.objects.create(user=user, **validated_data)
        lab_entry = lab_regtd.objects.get(lab_id = lab_id)
        lab_entry.is_used = True
        lab_entry.save()
        return lab
        

class lab_info_serializer(serializers.ModelSerializer):
    lab_name = serializers.CharField(source='lab_profile.lab_name', read_only=True)
    lab_id = serializers.CharField(source='lab_profile.lab_id', read_only=True)
    lab_location = serializers.CharField(source='lab_profile.lab_location', read_only=True)
    lab_pincode = serializers.CharField(source='lab_profile.lab_pincode', read_only=True)
    lab_open = serializers.TimeField(source='lab_profile.lab_open', read_only=True)
    lab_close = serializers.TimeField(source='lab_profile.lab_close', read_only=True)

    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'email', 'lab_name', 'lab_id', 'lab_location', 'lab_pincode', 'lab_open', 'lab_close']     

#login serializer    

class login_serializer(serializers.ModelSerializer):
    username = serializers.CharField(required = True)
    password = serializers.CharField(required= True , write_only = True)
           

class UpdateRequestStatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = test_request
        fields = ['request_id' ,'status','payment'] 

class TestRequestSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField(read_only=True)  # returns username
    lab = serializers.StringRelatedField(read_only=True)   # returns lab name or lab’s username based on __str__ in lab model
    created_at = serializers.DateTimeField(read_only=True)  # auto-generated

    class Meta:
        model = test_request
        fields = [
            'request_id','user', 'lab', 'p_name', 'p_age', 'p_add', 'p_pincode',
            'p_gender', 'p_date', 'p_contact', 'test_type',
            'status', 'payment', 'created_at'
        ]
        read_only_fields = ['user', 'lab', 'created_at',]        

