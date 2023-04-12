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

