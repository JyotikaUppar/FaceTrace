import os
import requests
from dateandwhatsapp import sendmessage
from getlocationinfo2 import getlocation

mylocation = getlocation()

GATEWAY_URL = os.getenv("GATEWAY_URL", "http://localhost:5000")

def add_in_base(a):
    idx = 0
    actual_name = ""
    adhaar = ""
    for i in range(len(a) - 1, -1, -1):
        if a[i] == '_':
            idx = i
            break

    for i in range(0, idx):
        actual_name += a[i]

    for i in range(idx + 1, len(a)):
        adhaar += a[i]

    dataval = {
        "name": actual_name,
        "adhaar": adhaar,
        "locationval": mylocation
    }

    # Post location to Location Microservice via Gateway/API
    try:
        r = requests.post(url=f"{GATEWAY_URL}/api/foundlocation/addlocation", json=dataval)
        print("Location post response:", r.text)
    except Exception as e:
        print("Error posting location:", e)

    # Fetch person details from Person Microservice via Gateway/API
    try:
        newr = requests.get(url=f"{GATEWAY_URL}/api/missingpeople/getallpersons/{adhaar}")
        newrdata = newr.json()
        if newrdata and len(newrdata) > 0 and 'phonenumber' in newrdata[0]:
            phone = newrdata[0]['phonenumber']
            
            # Dispatch WhatsApp via Notification Microservice or direct fallback
            try:
                notif_payload = {
                    "number": phone,
                    "name": actual_name,
                    "adhaar": adhaar,
                    "location": mylocation
                }
                requests.post(url=f"{GATEWAY_URL}/api/notifications/send-whatsapp", json=notif_payload)
            except Exception:
                sendmessage(phone, actual_name, adhaar, mylocation)
    except Exception as e:
        print("Error fetching missing person metadata:", e)


