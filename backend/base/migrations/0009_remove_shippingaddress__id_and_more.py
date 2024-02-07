# Generated by Django 5.0.2 on 2024-02-07 15:19

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0008_shippingaddress_order_shippingaddress_user'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.RemoveField(
            model_name='shippingaddress',
            name='_id',
        ),
        migrations.RemoveField(
            model_name='shippingaddress',
            name='order',
        ),
        migrations.RemoveField(
            model_name='shippingaddress',
            name='shippingPrice',
        ),
        migrations.AddField(
            model_name='shippingaddress',
            name='id',
            field=models.BigAutoField(auto_created=True, default=1, primary_key=True, serialize=False, verbose_name='ID'),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='shippingaddress',
            name='user',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
    ]
