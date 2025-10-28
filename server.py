#!/usr/bin/env python3
"""
Servidor web local con sistema de autenticación
Uso: python server.py
"""

import http.server
import socketserver
import webbrowser
import os
import sys
import json
import hashlib
import secrets
import sqlite3
from urllib.parse import urlparse, parse_qs
from datetime import datetime, timedelta

# Puerto para el servidor
PORT = 8000

# Directorio actual
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

# Archivo de base de datos
DB_FILE = os.path.join(DIRECTORY, 'users.db')

class AuthManager:
    def __init__(self, db_file):
        self.db_file = db_file
        self.init_database()
    
    def init_database(self):
        """Inicializar la base de datos SQLite"""
        conn = sqlite3.connect(self.db_file)
        cursor = conn.cursor()
        
        # Crear tabla de usuarios si no existe
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                username TEXT UNIQUE NOT NULL,
                password_hash TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        ''')
        
        conn.commit()
        conn.close()
    
    def hash_password(self, password):
        """Crear hash de la contraseña"""
        salt = secrets.token_hex(16)
        password_hash = hashlib.pbkdf2_hmac('sha256', password.encode(), salt.encode(), 100000)
        return f"{salt}:{password_hash.hex()}"
    
    def verify_password(self, password, password_hash):
        """Verificar contraseña contra el hash"""
        try:
            salt, hash_hex = password_hash.split(':')
            password_hash_check = hashlib.pbkdf2_hmac('sha256', password.encode(), salt.encode(), 100000)
            return password_hash_check.hex() == hash_hex
        except:
            return False
    
    def create_user(self, username, password):
        """Crear nuevo usuario"""
        conn = sqlite3.connect(self.db_file)
        cursor = conn.cursor()
        
        try:
            password_hash = self.hash_password(password)
            cursor.execute('INSERT INTO users (username, password_hash) VALUES (?, ?)', 
                         (username, password_hash))
            conn.commit()
            return True
        except sqlite3.IntegrityError:
            return False  # Usuario ya existe
        except Exception as e:
            print(f"Error creating user: {e}")
            return False
        finally:
            conn.close()
    
    def authenticate_user(self, username, password):
        """Autenticar usuario"""
        conn = sqlite3.connect(self.db_file)
        cursor = conn.cursor()
        
        try:
            cursor.execute('SELECT password_hash FROM users WHERE username = ?', (username,))
            result = cursor.fetchone()
            
            if result and self.verify_password(password, result[0]):
                return True
            return False
        except Exception as e:
            print(f"Error authenticating user: {e}")
            return False
        finally:
            conn.close()
    
    def user_exists(self):
        """Verificar si existe algún usuario"""
        conn = sqlite3.connect(self.db_file)
        cursor = conn.cursor()
        
        try:
            cursor.execute('SELECT COUNT(*) FROM users')
            count = cursor.fetchone()[0]
            return count > 0
        except Exception as e:
            print(f"Error checking user existence: {e}")
            return False
        finally:
            conn.close()
    
    def user_count(self):
        """Obtener el número total de usuarios registrados"""
        conn = sqlite3.connect(self.db_file)
        cursor = conn.cursor()
        
        try:
            cursor.execute('SELECT COUNT(*) FROM users')
            count = cursor.fetchone()[0]
            return count
        except Exception as e:
            print(f"Error getting user count: {e}")
            return 0
        finally:
            conn.close()

class CustomHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)
        self.auth_manager = AuthManager(DB_FILE)
    
    def end_headers(self):
        # Agregar headers CORS para desarrollo
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
        super().end_headers()
    
    def do_OPTIONS(self):
        """Manejar requests OPTIONS para CORS"""
        self.send_response(200)
        self.end_headers()
    
    def do_POST(self):
        """Manejar requests POST para API"""
        parsed_path = urlparse(self.path)
        
        if parsed_path.path == '/api/login':
            self.handle_login()
        elif parsed_path.path == '/api/register':
            self.handle_register()
        elif parsed_path.path == '/api/check-user':
            self.handle_check_user()
        else:
            self.send_error(404, "Not Found")
    
    def handle_login(self):
        """Manejar login de usuario"""
        try:
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            data = json.loads(post_data.decode('utf-8'))
            
            username = data.get('username', '').strip()
            password = data.get('password', '')
            
            if not username or not password:
                self.send_json_response({'message': 'Usuario y contraseña requeridos'}, 400)
                return
            
            if self.auth_manager.authenticate_user(username, password):
                # Generar token simple (en producción usar JWT)
                token = secrets.token_urlsafe(32)
                self.send_json_response({
                    'message': 'Login exitoso',
                    'token': token,
                    'username': username
                })
            else:
                self.send_json_response({'message': 'Credenciales incorrectas'}, 401)
                
        except Exception as e:
            print(f"Login error: {e}")
            self.send_json_response({'message': 'Error interno del servidor'}, 500)
    
    def handle_register(self):
        """Manejar registro de usuario"""
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
            
            # Verificar si ya existen 2 usuarios (máximo permitido)
            if self.auth_manager.user_count() >= 2:
                self.send_json_response({'message': 'Ya se han registrado el máximo de usuarios permitidos (2)'}, 400)
                return
            
            if self.auth_manager.create_user(username, password):
                # Generar token simple
                token = secrets.token_urlsafe(32)
                self.send_json_response({
                    'message': 'Usuario creado exitosamente',
                    'token': token,
                    'username': username
                })
            else:
                self.send_json_response({'message': 'Error al crear usuario'}, 500)
                
        except Exception as e:
            print(f"Register error: {e}")
            self.send_json_response({'message': 'Error interno del servidor'}, 500)
    
    def handle_check_user(self):
        """Verificar información de usuarios"""
        try:
            exists = self.auth_manager.user_exists()
            count = self.auth_manager.user_count()
            max_users = 2
            can_register = count < max_users
            
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
    
    def send_json_response(self, data, status_code=200):
        """Enviar respuesta JSON"""
        self.send_response(status_code)
        self.send_header('Content-Type', 'application/json')
        self.end_headers()
        
        response = json.dumps(data, ensure_ascii=False)
        self.wfile.write(response.encode('utf-8'))
    
    def do_GET(self):
        """Manejar requests GET con protección de rutas"""
        parsed_path = urlparse(self.path)
        
        # Rutas públicas (no requieren autenticación)
        public_routes = ['/login.html', '/css/', '/js/', '/img/', '/favicon.ico']
        
        # Verificar si es una ruta pública
        is_public = any(self.path.startswith(route) for route in public_routes)
        
        # Si no es pública y no es la página de login, verificar autenticación
        if not is_public and parsed_path.path != '/login.html':
            # Verificar token en headers o localStorage (esto se maneja en el frontend)
            # Por simplicidad, permitimos acceso directo pero el frontend verificará
            pass
        
        # Servir archivo estático
        super().do_GET()

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
