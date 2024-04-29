from django.utils import timezone
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from .serializers import NoteSerializer, UserSerializer
from .models import Note, User ,Token
from rest_framework.generics import RetrieveAPIView  # Dodany import


class NoteView(generics.ListAPIView):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer

class UserView(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class CreateNoteView(APIView):
    def post(self, request):
        note_text = request.data.get('note_text')
        owner_username = request.data.get('owner')  # Owner is username
        print(note_text, owner_username)
        try:
            owner = User.objects.get(username=owner_username)
        except User.DoesNotExist:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

        try:
            Note.objects.create(
                note_text=note_text,
                pub_date=timezone.now(),
                owner=owner
            )
            return Response({'message': 'Note created successfully'}, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class LoginUserView(RetrieveAPIView):
    def post(self, request):
        login = request.data.get('username')
        password = request.data.get('password')
        print(login, password)
        try:
            user = User.objects.get(username=login)
            if user.password == password:
                token, created = Token.objects.get_or_create(user=user)
                print(token)
                print(created)
                return Response({'token': str(token)}, status=status.HTTP_200_OK)
                
            else:
                return Response({'error': 'Wrong username or password'}, status=status.HTTP_404_NOT_FOUND)
        except User.DoesNotExist:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)