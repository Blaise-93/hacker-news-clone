import requests
from celery import shared_task
from news.models import Item
from logging import getLogger

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
                response =\
                    requests.get(
                     f'''https://hacker-news.firebaseio.com/v0/item/{story_id}.json'''
                    )
                response.raise_for_status()
                data = response.json()
                print(data)
                logging.info(f'Logging data response of item stories:{data}')
                # Create and store the item data to our db
                item, created = Item.objects.get_or_create(
                    id=data['id']
                )
                try:
                    item.type = data.get('type')
                    item.title = data.get('title')
                    item.url = data.get('url')
                    item.time = data.get('time')
                    item.score = int(data.get('score', 0))
                    item.descendants = int(data.get('descendants', 0))
                    item.kids = data.get('kids')
                    item.save()
                except KeyError as e:
                    logging.error(f'Data key error from hackernews:{e}')
                # if object, item has been created return nothing
                if not created:
                    return
        return response.raise_for_status()
    except Exception as e:
        logging.error(f'Error occured:{e}')


# Delay the execution of the process
# to make it non-blocking when the django celery beat
# schedular thread runs
fetch_and_sync_hacker_news.delay()
