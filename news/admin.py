from django.contrib import admin
from .models import Item


class ItemAdmin(admin.ModelAdmin):

    model = Item
    list_per_page = 50

    def get_queryset(self, request):

        queryset = super().get_queryset(request)
        queryset = Item.objects.exclude(title__isnull=True)
        return queryset


admin.site.register(Item, ItemAdmin)
