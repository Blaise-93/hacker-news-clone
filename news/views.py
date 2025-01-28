from rest_framework import generics
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.pagination import PageNumberPagination
from news.models import Item
from news.serializers import ItemSerializer
from logging import getLogger
from django.db.models import Q

logging = getLogger(__name__)


class NewsItemPagination(PageNumberPagination):
    page_size = 15


class ItemListView(generics.ListCreateAPIView):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer
    pagination_class = NewsItemPagination

    def get_queryset(self):
        queryset = super().get_queryset()
        # exclude title that comes with empty field
        # from hackernews
        queryset = queryset.exclude(title__isnull=True)
        item_type = self.request.query_params.get('type')
        if item_type:
            queryset = queryset.filter(type=item_type)
        search_text = self.request.query_params.get('search')
        if search_text:
            # filter items based on id and title
            queryset = queryset.filter(
                Q(title__icontains=search_text) |
                Q(id__icontains=search_text)
            )
        return queryset


class ItemDetailView(APIView):
    '''Retrieve a single new items from the top
       level item of the hacker news. (based on
       BONUS question.)
    '''

    def get(self, request, pk):
        item = Item.objects.get(pk=pk)
        serializer = ItemSerializer(item)
        try:
            return Response(serializer.data)
        except Exception as e:
            logging.error(f'Server error: {e}')
            Response(
                {'Error msg': str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class ItemUpdateView(generics.UpdateAPIView):
    '''Update the item view endpoint a user created.'''
    queryset = Item
    serializer_class = ItemSerializer


class ItemDeleteView(generics.DestroyAPIView):
    '''Delete the item view'''
    queryset = Item
    serializer_class = ItemSerializer
