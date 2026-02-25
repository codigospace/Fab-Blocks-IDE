from server import LocalHTTPServer
from utils import resource_path
import requests
import time

html_dir = resource_path('html')
print('html_dir=', html_dir)
server = LocalHTTPServer(directory=html_dir, host='127.0.0.1', port=0)
server.start()
print('running=', server.running, 'port=', server.port)
if server.running:
    time.sleep(0.5)
    url = f'http://127.0.0.1:{server.port}/index.html'
    try:
        r = requests.get(url)
        print('status', r.status_code)
    except Exception as e:
        print('request failed', e)
    server.stop()
else:
    print('server failed to start')
