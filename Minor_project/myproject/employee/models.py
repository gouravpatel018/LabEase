from django.db import models
from home.models import CustomUser

# Create your models here.
class employee(models.Model):
    employ = models.OneToOneField(CustomUser , on_delete=models.CASCADE , related_name='employee_profile')
    emp_id = models.CharField(max_length=20)
    full_name = models.CharField(max_length= 50)
    lab_name = models.CharField(max_length=50)

    def __str__(self):
        return f"{self.full_name}--{self.emp_id}--{self.lab_name}"
    

class employee_rgtd(models.Model):
    emp_id = models.CharField(max_length=20)
    employee_name = models.CharField(max_length=50)
    lab_name = models.CharField(max_length=50)
    is_booked = models.BooleanField(default=False)
    
    def __str__(self):
        return f"{self.employee_name}--{self.lab_name}--{self.is_booked}"
    
