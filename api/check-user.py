from http.server import BaseHTTPRequestHandler
import json
import sqlite3
import os

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

class handler(BaseHTTPRequestHandler):
    def do_GET(self):
        """Verificar información de usuarios"""
        auth_manager = AuthManager()
        
        try:
            exists = auth_manager.user_exists()
            count = auth_manager.user_count()
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
