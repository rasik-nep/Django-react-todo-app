from rest_framework import generics
from app_todo.models import Todo
from .serializers import TodoSerializer
from rest_framework.decorators import permission_classes\
                                      ,authentication_classes
from rest_framework.authentication import SessionAuthentication
from rest_framework.permissions import IsAuthenticated
class ListTodosAPI(generics.ListAPIView):
    authentication_classes=[ SessionAuthentication ]
    permission_classes = [IsAuthenticated]
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer
from rest_framework.views import APIView



from django.utils.decorators import method_decorator
from rest_framework.response import Response
from django.views.decorators.csrf import ensure_csrf_cookie
ensure_csrf = method_decorator(ensure_csrf_cookie)
class setCSRFCookie(APIView):
    permission_classes = []
    authentication_classes = []
    @ensure_csrf
    def get(self, request):
        return Response("CSRF Cookie set.")


from django.contrib.auth import authenticate, login
from .serializers import LoginSerializer
from rest_framework.permissions import AllowAny
from django.views.decorators.csrf import csrf_protect
csrf_protect_method = method_decorator(csrf_protect)
class LoginView(APIView):
    permission_classes = (AllowAny,)
    authentication_classes = ()
    @csrf_protect_method
    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        login(request, user)
        return Response("Logged in")







