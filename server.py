#!/usr/bin/env python3
"""
Servidor web local simple para desarrollo
Uso: python server.py
"""

import http.server
import socketserver
import webbrowser
import os
import sys

# Puerto para el servidor
PORT = 8000

# Directorio actual
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class CustomHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)
    
    def end_headers(self):
        # Agregar headers CORS para desarrollo
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        super().end_headers()

def start_server():
    try:
        with socketserver.TCPServer(("", PORT), CustomHTTPRequestHandler) as httpd:
            print(f"🚀 Servidor iniciado en http://localhost:{PORT}")
            print(f"📁 Sirviendo archivos desde: {DIRECTORY}")
            print(f"🌐 Abriendo navegador...")
            print(f"⏹️  Presiona Ctrl+C para detener el servidor")
            
            # Abrir navegador automáticamente
            webbrowser.open(f'http://localhost:{PORT}')
            
            # Iniciar servidor
            httpd.serve_forever()
            
    except KeyboardInterrupt:
        print(f"\n🛑 Servidor detenido")
        sys.exit(0)
    except OSError as e:
        if e.errno == 98:  # Puerto en uso
            print(f"❌ Puerto {PORT} ya está en uso. Probando puerto {PORT + 1}...")
            PORT += 1
            start_server()
        else:
            print(f"❌ Error al iniciar servidor: {e}")
            sys.exit(1)

if __name__ == "__main__":
    start_server()
