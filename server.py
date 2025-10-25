#!/usr/bin/env python3
import http.server
import socketserver
import os

# Puerto en el que correrá el servidor
PORT = 5000

# Directorio a servir (directorio actual)
DIRECTORY = "."

class MyHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def end_headers(self):
        # Agregar headers CORS para evitar problemas
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate')
        super().end_headers()

    def do_OPTIONS(self):
        self.send_response(200)
        self.end_headers()

# Cambiar al directorio del proyecto
os.chdir(DIRECTORY)

# Crear y arrancar el servidor
with socketserver.TCPServer(("", PORT), MyHTTPRequestHandler) as httpd:
    print(f"🚀 Servidor corriendo en http://localhost:{PORT}")
    print(f"📁 Sirviendo archivos desde: {os.getcwd()}")
    print("✋ Presiona Ctrl+C para detener el servidor")

    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\n🛑 Servidor detenido")