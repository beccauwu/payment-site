# Generated by Django 4.1 on 2022-09-15 15:10

from django.db import migrations, models
import jsonfield.fields


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0003_cookieconsent'),
    ]

    operations = [
        migrations.CreateModel(
            name='TempSession',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('username', models.CharField(max_length=100)),
                ('session_data', jsonfield.fields.JSONField()),
            ],
        ),
    ]
