from django.contrib import admin
from .models import scraped_data, saved_data, headers, adminInfo

admin.site.register(scraped_data)
admin.site.register(saved_data)
admin.site.register(headers)
admin.site.register(adminInfo)


# Register your models here.
