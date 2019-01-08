import urllib.request
import json


def get_ticket_data(url):
    response = urllib.request.urlopen(url)
    content_string = response.read().decode()
    param = json.loads(content_string)
    helpfulShit = []
    for i in param:
        lat = i.get('latitude', 'None')
        lon = i.get('longitude', 'None')
        des = i.get('type', False)
        if lat != 'None' and lon != 'None':
                l1 = float(lat)
                l2 = float(lon)
                helpfulShit.append([l1, l2, des])
    return json.dumps(helpfulShit)