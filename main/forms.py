from django.forms import ModelForm, Textarea, TextInput
from .models import Comment


class CommentForm(ModelForm):

    class Meta:
        model = Comment
        fields = ('author', 'message',)
        widgets = {
            'author': TextInput(attrs={'placeholder': 'Name'}),
            'message': Textarea(attrs={'placeholder': 'Your comment'})
        }
