# Generated by Django 3.1.6 on 2021-06-29 14:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('yasna', '0021_avrotest2'),
    ]

    operations = [
        migrations.AddField(
            model_name='avrotest',
            name='m2m_yasna_objects',
            field=models.ManyToManyField(related_name='m2m_avrotests', to='yasna.YasnaObject'),
        ),
    ]
