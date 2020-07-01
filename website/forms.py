from django import forms

class sudokuBoardForm(forms.Form):
    value = forms.CharField(max_length=1)
