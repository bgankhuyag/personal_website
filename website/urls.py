from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='home'),
    path('sorting/', views.sorting, name='sorting'),
    path('sudoku/', views.sudoku, name='sudoku'),
]
