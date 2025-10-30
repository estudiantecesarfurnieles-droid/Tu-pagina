"""
Sistema de almacenamiento para autenticación con SQLite
Diseñado para funcionar en Vercel con persistencia limitada
"""
import json
import os
import hashlib
import secrets
import sqlite3
from pathlib import Path

class AuthStorage:
    def __init__(self):
        self.max_users = 2
        # Usar directorio /tmp en Vercel (efímero) o local en desarrollo
        self.db_path = '/tmp/users.db' if os.path.exists('/tmp') else 'users.db'
        self.init_database()
    
    def init_database(self):
        """Inicializar la base de datos SQLite"""
        try:
            conn = sqlite3.connect(self.db_path)
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
        except Exception as e:
            print(f"Error initializing database: {e}")
    
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
    
    def user_count(self):
        """Obtener el número total de usuarios registrados"""
        try:
            conn = sqlite3.connect(self.db_path)
            cursor = conn.cursor()
            cursor.execute('SELECT COUNT(*) FROM users')
            count = cursor.fetchone()[0]
            conn.close()
            return count
        except Exception as e:
            print(f"Error getting user count: {e}")
            return 0
    
    def can_register(self):
        """Verificar si se puede registrar un nuevo usuario"""
        return self.user_count() < self.max_users
    
    def user_exists(self, username):
        """Verificar si un usuario existe"""
        try:
            conn = sqlite3.connect(self.db_path)
            cursor = conn.cursor()
            cursor.execute('SELECT COUNT(*) FROM users WHERE username = ?', (username,))
            count = cursor.fetchone()[0]
            conn.close()
            return count > 0
        except Exception as e:
            print(f"Error checking user existence: {e}")
            return False
    
    def authenticate(self, username, password):
        """Autenticar usuario"""
        try:
            conn = sqlite3.connect(self.db_path)
            cursor = conn.cursor()
            cursor.execute('SELECT password_hash FROM users WHERE username = ?', (username,))
            result = cursor.fetchone()
            conn.close()
            
            if result and self.verify_password(password, result[0]):
                return True
            return False
        except Exception as e:
            print(f"Error authenticating user: {e}")
            return False
    
    def create_user(self, username, password):
        """Crear nuevo usuario"""
        if not self.can_register():
            return {
                'success': False,
                'message': f'Ya se han registrado el máximo de usuarios permitidos ({self.max_users})'
            }
        
        if self.user_exists(username):
            return {
                'success': False,
                'message': 'El usuario ya existe'
            }
        
        try:
            password_hash = self.hash_password(password)
            conn = sqlite3.connect(self.db_path)
            cursor = conn.cursor()
            cursor.execute('INSERT INTO users (username, password_hash) VALUES (?, ?)', 
                         (username, password_hash))
            conn.commit()
            conn.close()
            
            return {
                'success': True,
                'message': 'Usuario creado exitosamente'
            }
        except Exception as e:
            print(f"Error creating user: {e}")
            return {
                'success': False,
                'message': 'Error al crear usuario'
            }

