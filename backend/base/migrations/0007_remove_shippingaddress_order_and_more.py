# Generated by Django 5.0.2 on 2024-02-07 13:39

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0006_remove_cartitem_cart_remove_cartitem_product_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='shippingaddress',
            name='order',
        ),
        migrations.RemoveField(
            model_name='shippingaddress',
            name='user',
        ),
    ]