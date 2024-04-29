from django.contrib import admin
from .models import Note,User,Token

admin.site.register(Note)
admin.site.register(User)
admin.site.register(Token)
