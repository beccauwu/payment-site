# Generated by Django 4.1 on 2022-09-22 15:31

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('payments', '0016_delete_sumofnumbers'),
    ]

    operations = [
        migrations.RenameField(
            model_name='order',
            old_name='stripe_session_id',
            new_name='order_id',
        ),
        migrations.RemoveField(
            model_name='order',
            name='completed',
        ),
        migrations.RemoveField(
            model_name='order',
            name='paid_on',
        ),
    ]
