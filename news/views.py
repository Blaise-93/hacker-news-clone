from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from news.models import Item
from news.serializers import ItemSerializers
from logging import getLogger

logging = getLogger(__name__)


class ItemList(APIView):
    '''Represents API item list view where the view
        instance data object from our  is displayed for our users.'''

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
                serializer.data, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
