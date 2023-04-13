from django.db import models
import string
import random

def generate_unique_id():
    length = 40
    while True:
        id = ''.join(random.choices(string.ascii_uppercase, k=length))
        if scraped_data.objects.filter(id=id).count() == 0:
            break
    return id

class scraped_data(models.Model):
    id = models.CharField(unique=True, default=generate_unique_id, max_length=30, primary_key=True)
    info = models.TextField()
    curator_url = models.URLField()
    gen_url = models.URLField()
    
class saved_data(models.Model):
    id = models.CharField(unique=True, max_length=30, primary_key=True)
    main_header = models.CharField(max_length=30)
    sub_header = models.CharField(max_length=30)
    info = models.TextField()
    gen_url = models.URLField()

class headers(models.Model):
    main_header = models.CharField(max_length=30)
    sub_header = models.CharField(max_length=30)

class adminInfo(models.Model):
    username = models.CharField(max_length=30, primary_key=True)
    password = models.CharField(max_length=30)



'''

from django.db import models

class Phase(models.Model): #Main Headers
    phase_id = models.CharField(max_length=50, primary_key=True)
    phase_name = models.CharField(max_length=50)
    def __str__(self) -> str:
        return self.phase_id + ": " + self.phase_name #displays phase id & name in database

class subheading(models.Model):
    subheading_id = models.CharField(max_length=50, primary_key=True)
    subheading_name = models.CharField(max_length=50)
    phase_id = models.ForeignKey(Phase,on_delete=models.DO_NOTHING)
    def __str__(self) -> str:
        return self.subheading_id + ": " + self.subheading_name

class info(models.Model):
    info_id = models.CharField(max_length=50, primary_key=True)
    info_link = models.URLField()
    info_text = models.CharField(max_length=5000)
    updated = models.DateTimeField(auto_now=True) # timestamp of last time info was changed
    subheading_id = models.ForeignKey(subheading,on_delete=models.CASCADE)
    def __str__(self) -> str:
        return self.subheading_id + ": " + self.info_id


'''