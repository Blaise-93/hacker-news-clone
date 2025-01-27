import requests
from celery import shared_task
from news.models import Item
from logging import getLogger
from requests.exceptions import ConnectionError

logging = getLogger(__name__)


@shared_task
def fetch_and_sync_hacker_news():
    '''Fetches and sync hackernews top 100 stories item and store
       the retrieved items in our database. The fetched data is made
       possible with the help of Python requests libray and celery
       asynchorously perform the action to be non-blocking for large
       dataset of 100 to be a breeze.
    '''
    try:
        top_stories_url =\
            'https://hacker-news.firebaseio.com/v0/topstories.json'
        response = requests.get(top_stories_url)
        if response.status_code == 200:
            top_stories = response.json()
            for story_id in top_stories[:100]:
                url =\
                    f'https://hacker-news.firebaseio.com/v0/item/{story_id}.json'
                response = requests.get(url)
                response.raise_for_status()
                data = response.json()
                logging.info(f'Logging data response of item stories: {data}')
                if 'time' in data and isinstance(data['time'], int):
                    # We are not making use of created so,
                    # we are using underscore
                    item, _ = Item.objects.get_or_create(id=data['id'])
                    try:
                        item.type = data.get('type')
                        item.title = data.get('title')
                        item.url = data.get('url')
                        item.time = data['time']
                        item.score = int(data.get('score', 0))
                        item.descendants = int(data.get('descendants', 0))
                        item.save()
                        if 'kids' in data:
                            kids_items = []
                            for kid_id in data['kids']:
                                kid_item, _ =\
                                      Item.objects.get_or_create(id=kid_id)
                                kids_items.append(kid_item)
                            item.kids.set(kids_items)
                        logging.info(f'Saving item with time: {item.time}')

                    except KeyError as e:
                        logging.error(f'Data key error from hackernews: {e}')
                    except Exception as e:
                        logging.error(f'Error saving item: {e}')
                else:
                    logging.warning(
                        f'Missing or invalid time field in data: {data}')
        return response.raise_for_status()
    except ConnectionError as e:
        logging.error(
            f'Connection error. Turn on your internet connection: {e}')


# Delay the execution of the process
# to make it non-blocking when the django celery beat
# scheduler thread runs
fetch_and_sync_hacker_news.delay()

