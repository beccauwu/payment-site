# Generated by Django 4.1 on 2022-09-18 13:06

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('general', '0004_image_delete_reviewimage'),
    ]

    operations = [
        migrations.DeleteModel(
            name='Image',
        ),
    ]