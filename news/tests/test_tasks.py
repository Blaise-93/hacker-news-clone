import pytest
from news.models import Item
from news.tasks import fetch_and_sync_hacker_news
from unittest.mock import patch


@pytest.mark.django_db
def test_item_creation():
    item = Item.objects.create(
        type='story',
        title='Test Item',
        text='This is a test item.',
        score=100,
        time=1737843313,
        url='https://onlytimes.com',
        descendants=0,
    )
    assert item.type == 'story'
    assert item.title == 'Test Item'
    assert item.text == 'This is a test item.'
    assert item.score == 100
    assert item.time == 1737843313
    assert item.url == 'https://onlytimes.com'
    assert item.descendants == 0


@pytest.mark.django_db
@patch('requests.get')
def test_fetch_and_sync_hacker_news(mock_get):
    mock_response = mock_get.return_value
    mock_response.status_code = 200
    mock_response.json.side_effect = [
        [1, 2, 3],
        {
            'id': 1,
            'type': 'story',
            'title': 'Test Item',
            'text': 'This is a test item.',
            'score': 100,
            'time': 1737843313,
            'url': 'https://example.com',
            'descendants': 0,
            'kids': [2, 3],
        },
        {
            'id': 2,
            'type': 'comment',
            'text': 'This is a comment.',
            'time': 1737843314,
        },
        {
            'id': 3,
            'type': 'comment',
            'text': 'This is another comment.',
            'time': 1737843315,
        },
    ]

    fetch_and_sync_hacker_news()

    item = Item.objects.last()
    assert item.type == 'story'
    assert item.title == 'Test Item'
    assert item.text != 'This is a test item.'
    assert item.score == 100
    assert item.time == 1737843313
    assert item.url == 'https://example.com'
    assert item.descendants == 0
    assert item.kids.count() == 2


@pytest.mark.django_db
def test_item_update():
    item = Item.objects.create(
        type='story',
        title='Test Item',
        text='This is a test item.',
        score=100,
        time=1737843313,
        url='https://onlytimes.com',
        descendants=0,
    )
    item.title = 'Updated Test Item'
    item.score = 150
    item.save()

    updated_item = Item.objects.get(id=item.id)
    assert updated_item.title == 'Updated Test Item'
    assert updated_item.score == 150


@pytest.mark.django_db
def test_item_delete():
    item = Item.objects.create(
        type='story',
        title='Test Item',
        text='This is a test item.',
        score=100,
        time=1737843313,
        url='https://onlytimes.com',
        descendants=0,
    )
    item_id = item.id
    item.delete()

    with pytest.raises(Item.DoesNotExist):
        Item.objects.get(id=item_id)
