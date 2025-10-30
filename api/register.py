from http.server import BaseHTTPRequestHandler
import json
import secrets
import sys
import os

# Agregar el directorio api al path para importar módulos locales
sys.path.insert(0, os.path.dirname(__file__))
from _auth_storage import AuthStorage

class handler(BaseHTTPRequestHandler):
    def do_POST(self):
        """Manejar registro"""
        auth_storage = AuthStorage()
        
        try:
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            data = json.loads(post_data.decode('utf-8'))
            
            username = data.get('username', '').strip()
            password = data.get('password', '')
            
            if not username or not password:
                self.send_json_response({'message': 'Usuario y contraseña requeridos'}, 400)
                return
            
            if len(username) < 3:
                self.send_json_response({'message': 'El usuario debe tener al menos 3 caracteres'}, 400)
                return
            
            if len(password) < 6:
                self.send_json_response({'message': 'La contraseña debe tener al menos 6 caracteres'}, 400)
                return
            
            # Intentar crear el usuario
            result = auth_storage.create_user(username, password)
            
            if result['success']:
                # Generar token simple
                token = secrets.token_urlsafe(32)
                self.send_json_response({
                    'message': result['message'],
                    'token': token,
                    'username': username
                })
            else:
                self.send_json_response({'message': result['message']}, 400)
                
        except Exception as e:
            print(f"Register error: {e}")
            self.send_json_response({'message': 'Error interno del servidor'}, 500)
    
    def do_OPTIONS(self):
        """Manejar CORS"""
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'POST, OPTIONS')
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






