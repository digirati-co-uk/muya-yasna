# Generated by Django 3.1.6 on 2021-06-30 16:13

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('django_avroserializer', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='avrotest4',
            name='avrotest3',
            field=models.OneToOneField(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='avrotest4_obj', to='django_avroserializer.avrotest'),
        ),
    ]
