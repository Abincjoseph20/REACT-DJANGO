from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .serializer import BookSeriailizer
from .models import Book


@api_view(['GET'])
def get_book(request):
    book = Book.objects.all()
    serializer = BookSeriailizer(book,many=True)
    return Response(serializer.data)


@api_view(['POST'])
def create_book(request):
    data = request.data
    seralizer = BookSeriailizer(data=data)
    if seralizer.is_valid():
        seralizer.save()
        return Response(seralizer.data,status=status.HTTP_201_CREATED)
    return Response(seralizer.errors,status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT','DELETE'])
def book_details(request,pk):
    try:
        book = Book.objects.get(pk=pk)  #this is for detail a single book
    except Book.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    
    if request.method == 'DELETE':
        book.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    elif request.method == 'PUT':
        data = request.data 
        seralizer = BookSeriailizer(book,data=data)
        if seralizer.is_valid():
            seralizer.save()
            return Response(seralizer.data,status=status.HTTP_201_CREATED)
        return Response(seralizer.errors,status=status.HTTP_400_BAD_REQUEST)
    
    
