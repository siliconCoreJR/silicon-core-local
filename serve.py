#!/usr/bin/env python3
"""Simple local server for silicon-core-local.
Run: python3 serve.py  (then open http://localhost:8080)
"""
import http.server, socketserver, os

PORT = 8080
os.chdir(os.path.dirname(os.path.abspath(__file__)))

class Handler(http.server.SimpleHTTPRequestHandler):
    def log_message(self, fmt, *args):
        pass  # suppress request logs

print(f"SiliconCore Local  →  http://localhost:{PORT}")
print("Press Ctrl+C to stop.\n")
with socketserver.TCPServer(("", PORT), Handler) as httpd:
    httpd.serve_forever()
