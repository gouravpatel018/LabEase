from django.urls import path
from . import views
from .views import RegisterView , dashboardView , lab_logout_view ,update_get_requests
urlpatterns = [
path('register/' , RegisterView.as_view() , name='lab_register'),
path('dashboard/',dashboardView.as_view() , name='dashboard'),
path('logout/' , lab_logout_view.as_view() , name='lab_logout'),
path('requests/' ,update_get_requests.as_view() , name='update_get' )
]