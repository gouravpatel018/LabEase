from django.db import models
from home.models import CustomUser

# Create your models here.
class lab_user(models.Model):
    user = models.OneToOneField(CustomUser , on_delete=models.CASCADE , related_name='lab_profile')
    password = models.CharField(max_length=20 , default='1234')
    lab_name = models.CharField(max_length=20)
    lab_id = models.CharField(max_length=15)
    lab_location = models.CharField(max_length=100)
    lab_pincode = models.CharField(max_length=6,null=True , blank=True)
    lab_open = models.TimeField()
    lab_close = models.TimeField()

    def __str__(self):
        return f"{self.lab_name} -{self.lab_id} -  {self.lab_pincode}"


class lab_regtd(models.Model):
    lab_id = models.CharField(max_length=50, unique=True)
    lab_name = models.CharField(max_length=100)  
    is_used = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.lab_id} - {self.lab_name} - {self.is_used}"  
