# 💖 Sistema de Login para Nuestro Universo de Amor 💖

## Descripción
Sistema de autenticación simple que permite crear **hasta 2 usuarios** para acceder a la página romántica. Una vez creados los 2 usuarios, solo se puede hacer login con esas credenciales.

## Características
- ✅ **Máximo 2 usuarios**: Se pueden crear hasta 2 usuarios en el sistema
- ✅ **Autenticación segura**: Contraseñas encriptadas con hash PBKDF2
- ✅ **Base de datos SQLite**: Almacenamiento local y seguro
- ✅ **Interfaz romántica**: Diseño que combina con el tema de amor
- ✅ **Protección de rutas**: La página principal requiere login
- ✅ **Sesión persistente**: Mantiene la sesión activa
- ✅ **Logout seguro**: Botón para cerrar sesión

## Archivos Creados/Modificados

### Nuevos Archivos:
- `login.html` - Página de login con diseño romántico
- `css/login.css` - Estilos específicos para el login
- `js/login.js` - Lógica de autenticación del frontend
- `js/user-manager.js` - Manejo de usuario en página principal
- `users.db` - Base de datos SQLite (se crea automáticamente)

### Archivos Modificados:
- `server.py` - Servidor con sistema de autenticación
- `index.html` - Página principal protegida con logout
- `css/style.css` - Estilos para información de usuario

## Cómo Usar

### 1. Iniciar el Servidor
```bash
python server.py
```

### 2. Acceder al Sistema
- Abre tu navegador en `http://localhost:8000`
- Serás redirigido automáticamente a `http://localhost:8000/login.html`

### 3. Crear Usuario (Primera y Segunda Vez)
- Si hay menos de 2 usuarios registrados, verás el formulario de registro
- Completa:
  - **Usuario**: Mínimo 3 caracteres
  - **Contraseña**: Mínimo 6 caracteres
  - **Confirmar Contraseña**: Debe coincidir
- Haz clic en "Crear Usuario"
- Serás redirigido automáticamente a la página principal
- Puedes crear hasta 2 usuarios en total

### 4. Iniciar Sesión (Después de Crear Usuarios)
- Si ya existen usuarios registrados, verás el formulario de login
- Ingresa las credenciales de cualquiera de los usuarios creados
- Haz clic en "Ingresar al Universo"

### 5. Cerrar Sesión
- En la página principal, haz clic en "Cerrar Sesión"
- Serás redirigido al login

## API Endpoints

### `POST /api/register`
Crea un nuevo usuario (solo funciona si hay menos de 2 usuarios registrados)
```json
{
  "username": "mi_usuario",
  "password": "mi_contraseña"
}
```

### `POST /api/login`
Autentica un usuario existente
```json
{
  "username": "mi_usuario", 
  "password": "mi_contraseña"
}
```

### `GET /api/check-user`
Verifica información de usuarios registrados
```json
{
  "exists": true/false,
  "count": 2,
  "max_users": 2,
  "can_register": false
}
```

## Seguridad

- **Contraseñas encriptadas**: Usando PBKDF2 con salt aleatorio
- **Tokens de sesión**: Generados de forma segura
- **Validación del frontend**: Verificación de campos antes de enviar
- **Protección de rutas**: Verificación de autenticación en cada carga

## Estructura de la Base de Datos

```sql
CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Personalización

### Cambiar el Diseño
- Modifica `css/login.css` para cambiar colores, fuentes, etc.
- Los colores principales están definidos en las variables CSS

### Cambiar Validaciones
- En `js/login.js` puedes modificar las reglas de validación
- En `server.py` puedes cambiar las validaciones del backend

### Cambiar Mensajes
- Los mensajes están en español, puedes cambiarlos en los archivos JS y Python

## Solución de Problemas

### Error: "Puerto ya está en uso"
- El servidor automáticamente probará el puerto siguiente
- O puedes cambiar el puerto en `server.py`

### Error: "Ya se han registrado el máximo de usuarios permitidos (2)"
- Solo se pueden crear 2 usuarios por instalación
- Para crear más usuarios, elimina el archivo `users.db`

### Error de Conexión
- Verifica que el servidor esté ejecutándose
- Revisa la consola del navegador para errores

## Notas Técnicas

- **Base de datos**: SQLite local, no requiere instalación adicional
- **Encriptación**: PBKDF2 con 100,000 iteraciones
- **Sesión**: Almacenada en localStorage del navegador
- **CORS**: Habilitado para desarrollo local
- **Responsive**: Funciona en móviles y tablets

## Licencia
Sistema creado con amor para uso personal 💕
