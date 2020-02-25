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

data = {
    'name': sys.argv[1],
    'time': datetime.datetime.now(),
    'key': os.getenv('API_KEY')
}

requests.post(os.getenv('SERVER_URL'), data)