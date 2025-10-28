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
        """Manejar registro"""
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
            
            if len(username) < 3:
                self.send_json_response({'message': 'El usuario debe tener al menos 3 caracteres'}, 400)
                return
            
            if len(password) < 6:
                self.send_json_response({'message': 'La contraseña debe tener al menos 6 caracteres'}, 400)
                return
            
            # Verificar si ya existen 2 usuarios (máximo permitido)
            if auth_manager.user_count() >= 2:
                self.send_json_response({'message': 'Ya se han registrado el máximo de usuarios permitidos (2)'}, 400)
                return
            
            if auth_manager.create_user(username, password):
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
