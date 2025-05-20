from django.urls import path
from .import views
urlpatterns = [
    path('get_book/',views.get_book,name='get_book'),
    path('create_book/',views.create_book,name='get_book'),
    path('get_book/<int:pk>/', views.book_details, name='book_details')
]