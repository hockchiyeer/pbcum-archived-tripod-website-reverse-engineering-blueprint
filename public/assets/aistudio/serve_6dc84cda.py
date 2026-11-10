"""Serve this folder at http://localhost:8000/ (site root, so /image/... links resolve)."""
import http.server, socketserver, os, sys
os.chdir(os.path.dirname(os.path.abspath(__file__)))
class H(http.server.SimpleHTTPRequestHandler):
    def guess_type(self,p):
        t=super().guess_type(p)
        return t+'; charset=utf-8' if t.startswith('text/') or t.endswith('javascript') else t
class ThreadedServer(socketserver.ThreadingMixIn, http.server.HTTPServer):
    daemon_threads = True
    allow_reuse_address = True

port=int(sys.argv[1]) if len(sys.argv)>1 else 8000
with ThreadedServer(('',port),H) as s:
    print(f'PBCUM site: http://localhost:{port}/'); s.serve_forever()
