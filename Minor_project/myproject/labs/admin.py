from django.contrib import admin
from .models import lab_regtd , lab_user

# Register your models here.
admin.site.register(lab_user)
admin.site.register(lab_regtd)
