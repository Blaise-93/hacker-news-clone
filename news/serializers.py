from .models import Item
from rest_framework import serializers


class ItemSerializers(serializers.ModelSerializer):
    '''Item serializer to be used by anyone to create item object
       instance.'''

    class Meta:
        model = Item
        fields = '__all__'
