from rest_framework import generics
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.pagination import PageNumberPagination
from news.models import Item
from news.serializers import ItemSerializer
from logging import getLogger


logging = getLogger(__name__)


class NewsItemPagination(PageNumberPagination):
    page_size = 20


class ItemListView(generics.ListCreateAPIView):
    '''API item list and create view. This view is
       responsible to handle all the items listed from
       the endpoint including the top level item (with the
       children) and graciously handle the creation of the
       list item too.'''

    queryset = Item.objects.all()
    serializer_class = ItemSerializer
    pagination_class = NewsItemPagination

    def get_queryset(self, request):
        queryset = super(self, ItemListView).get_queryset()
        # exclude items with no title if any.
        queryset = self.queryset.exclude(title__isnull=True)
        # get the item type the user input in the param from
        # frontend
        item_type = self.request.query_params.get('type')
        print('item-type:', item_type)

        if item_type:
            queryset = queryset.filter(type=item_type)
        # searched item param by the user
        search_text = request.query_params.get('search')
        if search_text:
            # the user can only search by the title of the news
            queryset = queryset.filter(title__icontains=search_text)
            print(queryset)
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
