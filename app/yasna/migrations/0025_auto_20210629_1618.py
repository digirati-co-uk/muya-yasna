# Generated by Django 3.1.6 on 2021-06-29 16:18

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('yasna', '0024_avrotest4'),
    ]

    operations = [
        migrations.AlterField(
            model_name='avrotest3',
            name='fk_avrotest',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='avrotest3', to='yasna.avrotest'),
        ),
    ]
