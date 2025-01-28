from django.urls import path
from .views import (
    ItemListView,
    ItemDetailView,
    ItemDeleteView,
    ItemUpdateView

)


app_name = 'news'

urlpatterns = [
    path('items/', ItemListView.as_view(), name='item-list'),
    path('items/<int:pk>/', ItemDetailView.as_view(), name='item-detail'),
    path('items/<int:pk>/update/',
         ItemUpdateView.as_view(), name='item-update'),
    path('items/<int:pk>/delete/',
         ItemDeleteView.as_view(), name='item-delete'),
]


