# Generated by Django 4.1 on 2022-09-17 12:43

from django.db import migrations, models
import general.models


class Migration(migrations.Migration):

    dependencies = [
        ('general', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='reviewimage',
            name='image',
            field=models.ImageField(upload_to=general.models.nameFile),
        ),
    ]
