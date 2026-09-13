import os
# pyrefly: ignore [missing-import]
from PIL import Image
from io import BytesIO
import io
# pyrefly: ignore [missing-import]
from numpy import byte
import requests
import json
from images_update import makenew

GATEWAY_URL = os.getenv("GATEWAY_URL", "http://localhost:5000")

# Using Api to add all photos fron database to folder to use for encoding to match 

def getimages():
    try:
        url = f"{GATEWAY_URL}/api/missingpeople/getallpersons"
        mydata = requests.get(url)
        finaldata = mydata.json()
        # delete all previous photos using make new
        makenew()
        for i in range(0, len(finaldata)):
            if 'image' in finaldata[i] and 'data' in finaldata[i]['image'] and 'data' in finaldata[i]['image']['data']:
                fdata = finaldata[i]['image']['data']['data']
                newobj = byte(fdata)

                # the name of image is followed by (name_adhaarnumber) as there may be multiple people with same name
                newname = finaldata[i]['name'] + '_' + finaldata[i]['adhaar_number']
                img = Image.open(io.BytesIO(newobj))
                img.save("./images/" + newname + ".png")
    except Exception as e:
        print("Error fetching missing person images for AI model encoding:", e)

