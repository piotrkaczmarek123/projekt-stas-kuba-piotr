from rest_framework import serializers
from .models import Note, User ,Token 


class NoteSerializer(serializers.ModelSerializer):

    class Meta:
        model = Note
        fields = ("pk", "note_text", "pub_date", "owner")

class UserSerializer(serializers.ModelSerializer):

        class Meta:
            model = User
            fields = ("pk", "username", "password")

class TokenSerializer(serializers.ModelSerializer):
     
     class Meta:
          model = Token
          fields = ("pk","token","user")