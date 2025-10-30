/**
 * 🔐 CONFIGURACIÓN DE USUARIOS PERMITIDOS
 * Solo estos 2 usuarios pueden acceder a la página
 * Para cambiar usuarios, modifica este archivo
 */

const USUARIOS_PERMITIDOS = [
  {
    username: "Tich",
    password: "tich2024",  // Cambia esta contraseña
    nombre: "Tich"
  },
  {
    username: "Camila", 
    password: "camila2024",  // Cambia esta contraseña
    nombre: "Camila"
  }
];

// Función simple para verificar credenciales
function verificarCredenciales(username, password) {
  const usuario = USUARIOS_PERMITIDOS.find(
    u => u.username.toLowerCase() === username.toLowerCase() && 
         u.password === password
  );
  return usuario ? { success: true, nombre: usuario.nombre } : { success: false };
}

// Verificar si el usuario está autenticado
function estaAutenticado() {
  const token = localStorage.getItem('authToken');
  const username = localStorage.getItem('username');
  
  if (!token || !username) return false;
  
  // Verificar que el usuario existe en la lista
  return USUARIOS_PERMITIDOS.some(u => u.username === username);
}

// Iniciar sesión
function iniciarSesion(username, password) {
  const resultado = verificarCredenciales(username, password);
  
  if (resultado.success) {
    // Generar token simple
    const token = btoa(username + ':' + Date.now());
    localStorage.setItem('authToken', token);
    localStorage.setItem('username', username);
    return { success: true, mensaje: '¡Bienvenido/a al universo! 💕' };
  }
  
  return { success: false, mensaje: 'Credenciales incorrectas' };
}

// Cerrar sesión
function cerrarSesion() {
  localStorage.removeItem('authToken');
  localStorage.removeItem('username');
  window.location.reload();
}

