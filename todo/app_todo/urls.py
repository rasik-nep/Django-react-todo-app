# from django.urls import URLPattern
# from rest_framework import routers
# from .views import TodoViewSet

# router = routers.DefaultRouter()
# router.register(r'api/todos', TodoViewSet, 'todos')

# urlpatterns = router.urls

from django.urls import path, include
from .api import api_views
urlpatterns = [
    path('api/listtodos/', api_views.ListTodosAPI.as_view(), name='listtodos'),
    path('api/login/', api_views.LoginView.as_view(), name='login'),

    path('api/setcsrf/', api_views.setCSRFCookie.as_view(), name='setcsrf'),
]