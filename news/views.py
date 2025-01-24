from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.pagination import PageNumberPagination
from news.models import Item
from news.serializers import ItemSerializers, ItemDetailSerializer

from logging import getLogger


logging = getLogger(__name__)


class StandardHackerPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 100


class ItemList(APIView):
    '''Represents API item list view where the view
        instance data object from our  is displayed for our users.'''

    pagination_class = StandardHackerPagination

    def get(self, request):
        items = Item.objects.all()
        try:
            serializer = ItemSerializers(items, many=True)
            return Response(serializer.data)
        except Exception as e:
            logging.error(f'Unknown Error: {e}')

    def post(self, request):
        serializer = ItemSerializers(data=request.data)
        try:
            if serializer.is_valid():
                serializer.save()
                return Response(
                    serializer.data, status=status.HTTP_201_CREATED
                )
            return Response(
                serializer.data, status=status.HTTP_400_BAD_REQUEST
            )
        except Exception as e:
            logging.error(f'Server error: {e}')
            return Response(
                   {'Error msg': str(e)},
                   status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


class ItemDetail(APIView):
    '''Retrieve a single new items from the top level item of the hacker news
    '''

    def get(self, request, pk):
        item = Item.objects.get(pk=pk)
        serializer = ItemDetailSerializer(item)
        try:
            return Response(serializer.data)
        except Exception as e:
            logging.error(f'Server error: {e}')
            Response(
                {'Error msg': str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR)
