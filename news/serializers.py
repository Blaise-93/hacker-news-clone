from .models import Item
from rest_framework import serializers


class ItemSerializer(serializers.ModelSerializer):
    '''Serializer class to help in displaying the top level items
      in the list for the user as stated in the bonus question'''

    class Meta:
        model = Item
        fields = '__all__'

    def get_children_item(self, obj):
        '''retrieve the kids data from the item serializer and focus
         on displaying it via our API which will be consumed by ReactTS'''

        return ItemSerializer(obj.kids.all(), many=True)
