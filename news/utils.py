import random
from datetime import datetime


def timestamp_default():
    '''get the timestamp in int format'''
    timestamp = datetime.now().timestamp()
    return int(timestamp)


def get_timestamp(timestamp):
    return datetime.fromtimestamp(timestamp)


def score_default():
    '''Add a randomnized default number incase there is a null
      value of score from the hackernews.'''

    nums = [i for i in range(10000)]
    return random.choice(nums)
