from news.models import Item


def test_item_model(single_item):
    '''test item models and assert its functions'''
    # arrange

    created_item = single_item
    get_item = Item.objects.last()

    assert created_item.title == get_item.title
    assert created_item.time == get_item.time
    assert created_item.__str__() == get_item.__str__()
