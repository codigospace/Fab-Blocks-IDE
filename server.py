import socketserver
from http.server import SimpleHTTPRequestHandler, HTTPServer
import threading
import functools

# Lightweight internal HTTP server to serve the `html/` directory on localhost.
class ThreadedHTTPServer(socketserver.ThreadingMixIn, HTTPServer):
    daemon_threads = True
    allow_reuse_address = True

class LocalHTTPServer:
    def __init__(self, directory, host='127.0.0.1', port=0):
        self.directory = directory
        self.host = host
        self.port = port
        self.server = None
        self.thread = None
        self.running = False

    def start(self):
        if self.running:
            return
        handler = functools.partial(SimpleHTTPRequestHandler, directory=self.directory)
        try:
            self.server = ThreadedHTTPServer((self.host, self.port), handler)
            # update port in case port 0 was used
            self.port = self.server.server_address[1]
            self.thread = threading.Thread(target=self.server.serve_forever, daemon=True)
            self.thread.start()
            self.running = True
        except Exception as e:
            print(f"Failed to start local HTTP server: {e}")
            self.running = False

    def stop(self):
        if self.server and self.running:
            try:
                self.server.shutdown()
                self.server.server_close()
                if self.thread:
                    self.thread.join(timeout=1)
            finally:
                self.running = False
