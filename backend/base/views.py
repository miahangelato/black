from django.shortcuts import render
from django.http import JsonResponse
from base.products import products
from base.models import Product
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import *
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from django.utils import timezone
from rest_framework.renderers import JSONRenderer  
from rest_framework.parsers import JSONParser
import json



class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)

        serializer = UserSerializerWithToken(self.user).data

        for k, v in serializer.items():
            data[k] = v

        return data

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


@api_view(['GET'])
def getUserProfile(request):
    user = request.user
    serializer = UserSerializer(user, many=False)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAdminUser])
def getUsers(request):
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def registerUser(request):
    data = request.data

    user = User.objects.create(
        first_name=data['name'],
        username=data['email'],
        email=data['email'],
        password=make_password(data['password'])
    )
    serializer = UserSerializerWithToken(user, many=False)
    return Response(serializer.data)

@api_view(['POST'])
def registerUser(request):
    data = request.data
    try:
        user = User.objects.create(
            first_name=data['name'],
            username=data['email'],
            email=data['email'],
            password=make_password(data['password'])
        )
        serializer = UserSerializerWithToken(user, many=False)
        return Response(serializer.data)
    except:
        message = {'detail': 'User with this email already exists'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['GET'])
def getProducts(request):
    products = Product.objects.all()
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getProduct(request, pk):
    try:
        product = Product.objects.get(_id=pk)
        serializer = ProductSerializer(product, many=False)
        return Response(serializer.data)
    except Product.DoesNotExist:
        return Response({'detail': 'Product not found'}, status=status.HTTP_404_NOT_FOUND)

@api_view(['GET'])
def getRoutes(request):
    routes = [
        
        '/api/products',
        '/api/products/create',

        '/api/upload',

        '/api/products/<id>/reviews/',

        '/api/products/top/',
        '/api/products/<id>',

        '/api/products/delete/<id>',
        '/api/products/update/<id>',
    ]
    return Response(routes)

@api_view(['POST'])
def ShippingAddress(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body.decode('utf-8'))
            user_id = data.get('user')
            address = data.get('address', '')
            city = data.get('city', '')
            postalCode = data.get('postalCode', '')
            country = data.get('country', '')

            user_id = data.get('user')
            if user_id is None:
                return JsonResponse({'error': 'User ID is required'}, status=400)

            user = User.objects.get(id=user_id)
            
            shipping_address, created = ShippingAddress.objects.update_or_create(
                user=user,
                defaults={
                    'address': address,
                    'city': city,
                    'postalCode': postalCode,
                    'country': country,
                },
            )

            return JsonResponse({'status': 'Address saved successfully'})
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON data'}, status=400)
        except User.DoesNotExist:
            return JsonResponse({'error': 'User not found'}, status=404)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)
    else:
        return JsonResponse({'error': 'Invalid request'}, status=400)