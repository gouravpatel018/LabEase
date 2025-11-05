# home/urls.py

from django.urls import path
from . import views
from .views import loginView

urlpatterns = [
    path('login/',loginView.as_view(), name='login'),
]