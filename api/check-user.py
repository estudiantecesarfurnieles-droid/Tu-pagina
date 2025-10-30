from http.server import BaseHTTPRequestHandler
import json
import sys
import os

# Agregar el directorio api al path para importar módulos locales
sys.path.insert(0, os.path.dirname(__file__))
from _auth_storage import AuthStorage

class handler(BaseHTTPRequestHandler):
    def do_GET(self):
        """Verificar información de usuarios"""
        auth_storage = AuthStorage()
        
        try:
            count = auth_storage.user_count()
            exists = count > 0
            max_users = auth_storage.max_users
            can_register = auth_storage.can_register()
            
            self.send_json_response({
                'exists': exists,
                'count': count,
                'max_users': max_users,
                'can_register': can_register
            })
        except Exception as e:
            print(f"Check user error: {e}")
            self.send_json_response({
                'exists': False,
                'count': 0,
                'max_users': 2,
                'can_register': True
            })
    
    def do_OPTIONS(self):
        """Manejar CORS"""
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()
    
    def send_json_response(self, data, status_code=200):
        """Enviar respuesta JSON"""
        self.send_response(status_code)
        self.send_header('Content-Type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.end_headers()
        
        response = json.dumps(data, ensure_ascii=False)
        self.wfile.write(response.encode('utf-8'))






