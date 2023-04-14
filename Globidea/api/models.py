from django.db import models
import string
import random


# SAVE UNIQUE ID'S FROM DATA WE CHOOSE TO SAVE AND MAKE SURE
# TO AVOID USING THOSE ID'S SO THERE'S NO DUPLICATE ID'S IN THE 
# SAVED DATA TABLE
def generate_unique_id():
    length = 40
    while True:
        id = ''.join(random.choices(string.ascii_uppercase, k=length))
        if scraped_data.objects.filter(id=id).count() == 0:
            break
    return id

class scraped_data(models.Model):
    id = models.CharField(unique=True, default=generate_unique_id, max_length=40, primary_key=True)
    info = models.TextField()
    curator_url = models.URLField()
    gen_url = models.URLField()

    class Meta:
        # Django APi prefixes table names with api_"....""
        # therefore this is to set a custom table name
        # to match with the class name
        db_table = 'scraped_data'


        
class saved_data(models.Model):
    id = models.CharField(unique=True, max_length=40, primary_key=True)
    main_header = models.CharField(max_length=30)
    sub_header = models.CharField(max_length=30)
    info = models.TextField()
    gen_url = models.URLField()

    class Meta:
        db_table = 'saved_data' 

class headers(models.Model):
    main_header = models.IntegerField()
    sub_header = models.CharField(max_length=100)

    class Meta:
        db_table = 'headers'

class adminInfo(models.Model):
    username = models.CharField(max_length=30, primary_key=True)
    password = models.CharField(max_length=30)

    class Meta:
        db_table = 'adminInfo'
