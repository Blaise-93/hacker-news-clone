# Generated by Django 4.2 on 2025-01-23 12:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('news', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='item',
            name='descendants',
            field=models.IntegerField(blank=True, null=True),
        ),
    ]
