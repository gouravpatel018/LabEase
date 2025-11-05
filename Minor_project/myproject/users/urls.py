from django.urls import path
from . import views
from .views import CustomerRegisterView , user_dashboardView , user_logout_view , CreateAndListRequestView

urlpatterns = [
   path('register/' ,CustomerRegisterView.as_view() , name='customer_registration' ),
   path('dashboard/' ,user_dashboardView.as_view() , name='user_dashboard') ,
   path('logout/' , user_logout_view.as_view() , name='user_logout' ),
   path('requests/',CreateAndListRequestView.as_view() , name = 'create_list_request'),
]
