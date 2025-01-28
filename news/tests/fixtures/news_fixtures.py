import pytest
from news.models import Item


@pytest.fixture
def single_item(db):
    """Tell Django that pytest needs access to the db
         to access data for test suites."""
    # Create the related items first
    kid1 = Item.objects.create(
        type='story',
        title='Kid Item 1',
        text='This is a kid item.',
        score=50,
        time=1737843314,
        url='https://onlytimes.com/kid1',
        descendants=0,
    )
    kid2 = Item.objects.create(
        type='story',
        title='Kid Item 2',
        text='This is another kid item.',
        score=60,
        time=1737843315,
        url='https://onlytimes.com/kid2',
        descendants=0,
    )
    kid3 = Item.objects.create(
        type='story',
        title='Kid Item 3',
        text='This is yet another kid item.',
        score=70,
        time=1737843316,
        url='https://onlytimes.com/kid3',
        descendants=0,
    )

    # Create the main item and set the kids field
    item = Item.objects.create(
        type='story',
        title='Kid Item 1',
        text='This is a test item.',
        score=100,
        time=1737843314,
        url='https://onlytimes.com',
        descendants=0,
    )
    item.kids.set([kid1, kid2, kid3])
    return item
