import bottle
from bottle import route, run
import tickets
import censusDistrict


@route("/data")
def site():
    return bottle.static_file("index.html", root="")


@route("/")
def site2():
    return bottle.static_file("index.html", root="")


@route("/resume.png")
def resume():
    return bottle.static_file("resume.png", root="")


@route("/headshot.png")
def pic():
    return bottle.static_file("headshot.png", root="")


@route("/map.js")
def map():
    return bottle.static_file("map.js", root="")


@route("/graph.js")
def graph():
    return bottle.static_file("graph.js", root="")


@route("/tickets")
def get_tickets():
    url = "https://data.seattle.gov/resource/fire-911.json"
    tick = tickets.get_ticket_data(url)
    return (tick)


@route("/tract")
def get_tract():
    tractData = censusDistrict.get_tract_data()
    return tractData

run(host='0.0.0.0', port=8080, debug=True)
