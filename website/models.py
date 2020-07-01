from django.db import models

class Project(models.Model):
    image = models.CharField(max_length=255)
    url = models.CharField(max_length=255, blank=True)
    title = models.CharField(max_length=255)
    github_url = models.URLField(blank=True)
    full_url = models.URLField(blank=True)
    description = models.TextField()
    pass

class Tools(models.Model):
    tool = models.CharField(max_length=255, blank=True)
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
