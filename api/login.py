from http.server import BaseHTTPRequestHandler
import json
import hashlib
import secrets
import sqlite3
import os
from datetime import datetime

class AuthManager:
    def __init__(self):
        # En Vercel, usamos una base de datos en memoria o archivo temporal
        self.db_file = '/tmp/users.db'
        self.init_database()
    
    def init_database(self):
        """Inicializar la base de datos SQLite"""
        conn = sqlite3.connect(self.db_file)
        cursor = conn.cursor()
        
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

class handler(BaseHTTPRequestHandler):
    def do_POST(self):
        """Manejar login"""
        auth_manager = AuthManager()
        
        try:
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            data = json.loads(post_data.decode('utf-8'))
            
            username = data.get('username', '').strip()
            password = data.get('password', '')
            
            if not username or not password:
                self.send_json_response({'message': 'Usuario y contraseña requeridos'}, 400)
                return
            
            if auth_manager.authenticate_user(username, password):
                # Generar token simple
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
