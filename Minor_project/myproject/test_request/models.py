from django.db import models
from home.models import CustomUser
from labs.models import lab_user
import uuid

# Create your models here.
class test_request(models.Model):
    request_id = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='test_requests')
    lab = models.ForeignKey(lab_user, on_delete=models.CASCADE, related_name='lab_requests')

    p_name = models.CharField(max_length=20)
    p_age = models.CharField(max_length=2)
    p_add = models.CharField(max_length=50)
    p_pincode = models.CharField(max_length=6)
    p_gender = models.CharField(max_length=10)
    p_date = models.DateField(auto_now=True)
    p_contact = models.CharField(max_length=10)
    test_type = models.CharField(max_length=200)
    status = models.CharField(max_length=20 , default='pending')
    payment = models.CharField(max_length = 100 , default='pending')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.p_name}--{self.user.username}--{self.lab.lab_name}--{self.status}--{self.payment}--{self.created_at}"




