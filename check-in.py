import os

import requests
from dotenv import load_dotenv

load_dotenv()

apiUrl = os.getenv('SERVER_URL')
r = requests.post(url=apiUrl, data={'name': 'Bob'})

data = r.json()

print(data)
