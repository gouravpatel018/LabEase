from django.db import models
from home.models import CustomUser
from labs.models import lab_user
from test_request.models import test_request #type: ignore

# Create your models here.
class customer_user(models.Model):
    user = models.OneToOneField(CustomUser , on_delete=models.CASCADE , related_name='user_profile')
    full_name = models.CharField(max_length=50)
    address = models.CharField(max_length=200)
    pincode = models.CharField(max_length=6)
    date_of_birth = models.DateField(blank=True , null= True)
    
    def __str__(self):
        return f"{self.full_name}-{self.address}"

class test_request(models.Model):
    lab = models.ForeignKey(lab_user , on_delete=models.CASCADE , related_name='labTorequest')
    user = models.ForeignKey(CustomUser , on_delete=models.CASCADE , related_name='userTorequest')
    p_name = models.CharField(max_length=20)
    p_age = models.PositiveIntegerField()
    

