from django.db import models
from .utils import score_default, timestamp_default


class Item(models.Model):
    '''Represents a model/schema of news item for our hackernews website clone.

    Fields:
    - type: The news type
    - text: The text explaining the content of the news
    - title: The title of the news
    - url: The url of the news item
    - time: The time the news was created by the hackernews website mgt.
    - score: The news item score
    - kids: The kids item of the news
    - descendants: The news descendant
    - date_created: The date this item model was created for record/audit
    purpose
    - date_updated: The date this item model was updated for audit purpose
    '''

    type = models.CharField(max_length=255)
    title = models.CharField(max_length=255, blank=True, null=True)
    text = models.TextField(blank=True, null=True)
    score = models.IntegerField(default=score_default())
    time = models.IntegerField(default=timestamp_default())
    url = models.URLField(blank=True, null=True)
    descendants = models.IntegerField(blank=True, null=True)
    kids = models.ManyToManyField('self', blank=True)
    date_created = models.DateTimeField(auto_now_add=True)
    date_updated = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name_plural = 'News Items'

    def __str__(self):
        return str(self.title)
