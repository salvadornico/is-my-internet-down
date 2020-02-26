#! python3
# is-my-internet-down client script

import datetime
import os
import sys
from os.path import dirname, join

import requests
from dotenv import load_dotenv

load_dotenv(join(dirname(__file__), '../.env'))

if len(sys.argv) < 2:
    print('Please provide a client name -- $ check-in.py [name]')
    sys.exit()

time = datetime.datetime.utcnow()
data = {'name': sys.argv[1], 'time': time, 'key': os.getenv('API_KEY')}

try:
    requests.post(os.getenv('SERVER_URL'), data)
except:
    message = f"Ping failed at {time}"
    print(message)
    f = open("errors.log", "a")
    f.write(message)
    f.close()
