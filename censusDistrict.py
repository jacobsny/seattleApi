import urllib.request
import json
import csv
from multiprocessing.dummy import Pool as ThreadPool
import time


def get_ticket_data():
    url = "https://data.seattle.gov/resource/fire-911.json"
    response = urllib.request.urlopen(url)
    content_string = response.read().decode()
    param = json.loads(content_string)
    helpfulShit = []
    for i in param:
        lat = i.get('latitude', 'None')
        lon = i.get('longitude', 'None')
        if lat != 'None' and lon != 'None':
                y = float(lat)
                x = float(lon)
                url = ("https://geocoding.geo.census.gov/geocoder/geographies/coordinates?x=" + str(x) + "&y=" + str(y) + "&benchmark=4&vintage=4&format=json")
                helpfulShit.append(url)
    return (helpfulShit)


def standardize(a):
    a = str(a)
    a = a.split(".")
    if len(a) == 1:
        b = a[0]
        a = ''
        if len(b) < 4:
            a = '0' * (4 - len(b))
        return a + b
    else:
        c = a[1]
        b = a[0]
        a = ''
        if len(b) < 4:
            a = '0' * (4 - len(b))
        return a + b + "." + c


def calcAverage(l):
    sum1 = 0
    leng = len(l)
    for i in l:
        if i.isdigit():
            sum1 += int(i)
    return sum1 / leng


def get_income_data():
    data = []
    with open('income.csv') as f:
        reader = csv.reader(f)
        for lines in reader:
            data.append([lines[1], lines[3]])
    data.pop(0)
    final = {}
    for i in data:
        splitStr = (i[0]).split()
        number = splitStr[(len(splitStr) - 1)]
        number = standardize(number)
        tract = str("Census Tract " + number)
        final[tract] = i[1]
    return (final)


def multiThreadTract(url):
        response = urllib.request.urlopen(url)
        content_string = response.read().decode()
        param = json.loads(content_string)
        param = param["result"]
        param = param["geographies"]
        param = param["Census Tracts"]
        param = param[0]
        tract = param.get("NAME", "Null")
        if tract != "Null":
            splitStr = tract.split()
            number = splitStr[(len(splitStr) - 1)]
            number = standardize(number)
            tract = str("Census Tract " + number)
            return tract


def get_tract_data():
    start_time = time.time()
    ticketData = get_ticket_data()
    incomeStats = get_income_data()
    ans = {}
    print(time.time() - start_time)
    pool = ThreadPool(50)
    results = pool.map(multiThreadTract, ticketData)
    for tract in results:
            if tract not in ans:
                ans[str(tract)] = 1
            else:
                ans[str(tract)] += 1
    print(time.time() - start_time)
    keys = []
    count = []
    for j in ans:
        keys.append(j)
        count.append(ans[j])
    keys, count = (list(t) for t in zip(*sorted(zip(keys, count))))
    money = []
    for i in keys:
        money.append(incomeStats.get(i))
    return json.dumps([keys, count, money])