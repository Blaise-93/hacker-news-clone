import pytest
from django.urls import reverse
from rest_framework.test import APIClient
from news.models import Item


@pytest.mark.django_db
def test_fetch_items():
    client = APIClient()
    url = reverse('news:item-list')
    response = client.get(url)
    assert response.status_code == 200


@pytest.mark.django_db
def test_create_item():
    client = APIClient()
    url = reverse('news:item-list')
    data = {
        'type': 'story',
        'title': 'Test Item',
        'text': 'This is a test item.',
        'score': 100,
        'time': 1737843313,
        'url': 'https://onlytimes.com',
        'descendants': 0,
        'kids': [],
    }
    response = client.post(url, data, format='json')
    assert response.status_code == 201
    assert Item.objects.count() == 1


@pytest.mark.django_db
def test_update_item():
    item = Item.objects.create(
        type='story',
        title='Test Item',
        text='This is a test item.',
        score=100,
        time=1737843313,
        url='https://onlytimes.com',
        descendants=0,
    )
    client = APIClient()
    url = reverse('news:item-update', args=[item.id])
    data = {
        'type': 'story',
        'title': 'Updated Test Item',
        'text': 'This is an updated test item.',
        'score': 150,
        'time': 1737843313,
        'url': 'https://onlytimes.com',
        'descendants': 0,
        'kids': [],
    }
    response = client.put(url, data, format='json')
    assert response.status_code == 200
    item.refresh_from_db()
    assert item.title == 'Updated Test Item'
    assert item.score == 150


@pytest.mark.django_db
def test_delete_item():
    item = Item.objects.create(
        type='story',
        title='Test Item',
        text='This is a test item.',
        score=100,
        time=1737843313,
        url='https://onlytimes.com',
        descendants=0,
    )
    client = APIClient()
    url = reverse('news:item-delete', args=[item.id])
    response = client.delete(url)
    assert response.status_code == 204
    assert Item.objects.count() == 0
