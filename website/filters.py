from django import template
from datetime import date, timedelta

register = template.Library()

register.filter('incre', incre)

def incre(num):
    return num+=1
