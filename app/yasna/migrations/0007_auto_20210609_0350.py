# Generated by Django 3.1.6 on 2021-06-09 03:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('yasna', '0006_auto_20210609_0238'),
    ]

    operations = [
        migrations.AlterField(
            model_name='yasnaobjectimage',
            name='id',
            field=models.CharField(default='', max_length=255, primary_key=True, serialize=False, unique=True),
        ),
    ]
