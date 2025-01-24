from .models import Item
from rest_framework import serializers


class ItemSerializers(serializers.ModelSerializer):
    '''Items serializer to be used by anyone to create and lists item object
       instance.'''

    class Meta:
        model = Item
        fields = '__all__'


class ItemListSerializer(serializers.ModelSerializer):
    '''Item serializer to be used by anyone to create and lists item object
       instance for the top-level items in the list and display their children
       (comments, for example ) in the detail page.'''

    class Meta:
        model = Item
        fields = [
            'id',
            'title',
            'type',

        ]


class ItemDetailSerializer(serializers.ModelSerializer):
    '''Serializer class to help in displaying the top level items in the list
        for the user as stated in the bonus question'''

    kids = ItemListSerializer(
        many=True, read_only=True
    )

    class Meta:
        model = Item
        fields = [
            'id',
            'title',
            'type',
            'kids',
        ]
