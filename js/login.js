/**
 * 💖 SISTEMA DE LOGIN ROMÁNTICO 💖
 * Maneja la autenticación y registro de usuario único
 */

class LoginSystem {
    constructor() {
        this.apiUrl = '/api';
        this.isLoading = false;
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.checkUserExists();
        this.setupFormValidation();
    }

    setupEventListeners() {
        // Formulario de login
        const loginForm = document.getElementById('loginForm');
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => this.handleLogin(e));
        }

        // Formulario de registro
        const registerForm = document.getElementById('registerForm');
        if (registerForm) {
            registerForm.addEventListener('submit', (e) => this.handleRegister(e));
        }

        // Validación en tiempo real
        const inputs = document.querySelectorAll('.form-input');
        inputs.forEach(input => {
            input.addEventListener('input', () => this.validateInput(input));
            input.addEventListener('blur', () => this.validateInput(input));
        });

        // Confirmación de contraseña
        const confirmPassword = document.getElementById('confirmPassword');
        if (confirmPassword) {
            confirmPassword.addEventListener('input', () => this.validatePasswordMatch());
        }
    }

    setupFormValidation() {
        // Validación de usuario
        const usernameInput = document.getElementById('username');
        if (usernameInput) {
            usernameInput.addEventListener('input', (e) => {
                const value = e.target.value;
                if (value.length < 3) {
                    this.showFieldError(usernameInput, 'El usuario debe tener al menos 3 caracteres');
                } else {
                    this.clearFieldError(usernameInput);
                }
            });
        }

        // Validación de contraseña
        const passwordInputs = document.querySelectorAll('input[type="password"]');
        passwordInputs.forEach(input => {
            input.addEventListener('input', (e) => {
                const value = e.target.value;
                if (value.length < 6) {
                    this.showFieldError(input, 'La contraseña debe tener al menos 6 caracteres');
                } else {
                    this.clearFieldError(input);
                }
            });
        });
    }

    async checkUserExists() {
        try {
            const response = await fetch(`${this.apiUrl}/check-user`);
            const data = await response.json();
            
            if (data.can_register) {
                // Se pueden registrar más usuarios, mostrar sección de registro
                this.showRegisterSection();
                this.updateRegisterMessage(data);
            } else {
                // Ya se alcanzó el máximo de usuarios, ocultar sección de registro
                this.hideRegisterSection();
                this.showMaxUsersMessage(data);
            }
        } catch (error) {
            console.error('Error checking user:', error);
            // En caso de error, mostrar sección de registro por defecto
            this.showRegisterSection();
        }
    }

    showRegisterSection() {
        const registerSection = document.getElementById('registerSection');
        if (registerSection) {
            registerSection.classList.remove('hidden');
        }
    }

    hideRegisterSection() {
        const registerSection = document.getElementById('registerSection');
        if (registerSection) {
            registerSection.classList.add('hidden');
        }
    }

    updateRegisterMessage(data) {
        const dividerText = document.querySelector('.divider-text');
        if (dividerText && data.count > 0) {
            dividerText.textContent = `✨ Registro disponible (${data.count}/${data.max_users} usuarios) ✨`;
        }
    }

    showMaxUsersMessage(data) {
        // Mostrar mensaje informativo cuando se alcance el máximo
        const messageContainer = document.getElementById('messageContainer');
        const messageContent = document.getElementById('messageContent');
        
        if (messageContainer && messageContent) {
            messageContent.textContent = `Se han registrado ${data.count} usuarios (máximo ${data.max_users}). Solo puedes hacer login.`;
            messageContent.className = 'message-content info';
            messageContainer.classList.remove('hidden');
        }
    }

    async handleLogin(e) {
        e.preventDefault();
        
        if (this.isLoading) return;
        
        const formData = new FormData(e.target);
        const username = formData.get('username').trim();
        const password = formData.get('password');

        // Validación básica
        if (!username || !password) {
            this.showMessage('Por favor completa todos los campos', 'error');
            return;
        }

        this.setLoading(true, 'loginBtn');

        try {
            const response = await fetch(`${this.apiUrl}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password })
            });

            const data = await response.json();

            if (response.ok) {
                this.showMessage('¡Bienvenido al universo! 💕', 'success');
                
                // Guardar token de sesión
                localStorage.setItem('authToken', data.token);
                localStorage.setItem('username', username);
                
                // Redirigir después de un breve delay
                setTimeout(() => {
                    window.location.href = '/';
                }, 1500);
            } else {
                this.showMessage(data.message || 'Credenciales incorrectas', 'error');
            }
        } catch (error) {
            console.error('Login error:', error);
            this.showMessage('Error de conexión. Intenta nuevamente.', 'error');
        } finally {
            this.setLoading(false, 'loginBtn');
        }
    }

    async handleRegister(e) {
        e.preventDefault();
        
        if (this.isLoading) return;
        
        const formData = new FormData(e.target);
        const username = formData.get('newUsername').trim();
        const password = formData.get('newPassword');
        const confirmPassword = formData.get('confirmPassword');

        // Validaciones
        if (!username || !password || !confirmPassword) {
            this.showMessage('Por favor completa todos los campos', 'error');
            return;
        }

        if (username.length < 3) {
            this.showMessage('El usuario debe tener al menos 3 caracteres', 'error');
            return;
        }

        if (password.length < 6) {
            this.showMessage('La contraseña debe tener al menos 6 caracteres', 'error');
            return;
        }

        if (password !== confirmPassword) {
            this.showMessage('Las contraseñas no coinciden', 'error');
            return;
        }

        this.setLoading(true, 'registerBtn');

        try {
            const response = await fetch(`${this.apiUrl}/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password })
            });

            const data = await response.json();

            if (response.ok) {
                this.showMessage('¡Usuario creado exitosamente! 💖', 'success');
                
                // Guardar token de sesión
                localStorage.setItem('authToken', data.token);
                localStorage.setItem('username', username);
                
                // Ocultar sección de registro
                this.hideRegisterSection();
                
                // Redirigir después de un breve delay
                setTimeout(() => {
                    window.location.href = '/';
                }, 1500);
            } else {
                this.showMessage(data.message || 'Error al crear usuario', 'error');
            }
        } catch (error) {
            console.error('Register error:', error);
            this.showMessage('Error de conexión. Intenta nuevamente.', 'error');
        } finally {
            this.setLoading(false, 'registerBtn');
        }
    }

    validateInput(input) {
        const value = input.value.trim();
        const fieldName = input.name;
        
        // Limpiar errores previos
        this.clearFieldError(input);
        
        if (fieldName === 'username' || fieldName === 'newUsername') {
            if (value.length > 0 && value.length < 3) {
                this.showFieldError(input, 'Mínimo 3 caracteres');
            }
        } else if (fieldName === 'password' || fieldName === 'newPassword') {
            if (value.length > 0 && value.length < 6) {
                this.showFieldError(input, 'Mínimo 6 caracteres');
            }
        }
    }

    validatePasswordMatch() {
        const password = document.getElementById('newPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        
        if (confirmPassword && password !== confirmPassword) {
            this.showFieldError(document.getElementById('confirmPassword'), 'Las contraseñas no coinciden');
        } else {
            this.clearFieldError(document.getElementById('confirmPassword'));
        }
    }

    showFieldError(input, message) {
        const formGroup = input.closest('.form-group');
        if (formGroup) {
            formGroup.classList.add('error');
            
            // Remover mensaje de error previo
            const existingError = formGroup.querySelector('.field-error');
            if (existingError) {
                existingError.remove();
            }
            
            // Agregar nuevo mensaje de error
            const errorDiv = document.createElement('div');
            errorDiv.className = 'field-error';
            errorDiv.textContent = message;
            errorDiv.style.cssText = `
                color: var(--login-error);
                font-size: 0.8rem;
                margin-top: 5px;
                font-family: 'Poppins', sans-serif;
            `;
            formGroup.appendChild(errorDiv);
        }
    }

    clearFieldError(input) {
        const formGroup = input.closest('.form-group');
        if (formGroup) {
            formGroup.classList.remove('error');
            const existingError = formGroup.querySelector('.field-error');
            if (existingError) {
                existingError.remove();
            }
        }
    }

    setLoading(loading, buttonId) {
        this.isLoading = loading;
        const button = document.getElementById(buttonId);
        
        if (button) {
            const btnText = button.querySelector('.btn-text');
            const btnLoading = button.querySelector('.btn-loading');
            
            if (loading) {
                button.disabled = true;
                button.classList.add('loading');
                if (btnText) btnText.style.opacity = '0.7';
                if (btnLoading) btnLoading.classList.remove('hidden');
            } else {
                button.disabled = false;
                button.classList.remove('loading');
                if (btnText) btnText.style.opacity = '1';
                if (btnLoading) btnLoading.classList.add('hidden');
            }
        }
    }

    showMessage(message, type = 'info') {
        const messageContainer = document.getElementById('messageContainer');
        const messageContent = document.getElementById('messageContent');
        
        if (messageContainer && messageContent) {
            messageContent.textContent = message;
            messageContent.className = `message-content ${type}`;
            messageContainer.classList.remove('hidden');
            
            // Auto-ocultar después de 5 segundos
            setTimeout(() => {
                messageContainer.classList.add('hidden');
            }, 5000);
        }
    }

    // Método para verificar si el usuario está autenticado
    static isAuthenticated() {
        return localStorage.getItem('authToken') !== null;
    }

    // Método para obtener el token de autenticación
    static getAuthToken() {
        return localStorage.getItem('authToken');
    }

    // Método para obtener el nombre de usuario
    static getUsername() {
        return localStorage.getItem('username');
    }

    // Método para cerrar sesión
    static logout() {
        localStorage.removeItem('authToken');
        localStorage.removeItem('username');
        window.location.href = '/login.html';
    }
}

// Inicializar el sistema de login cuando se carga la página
document.addEventListener('DOMContentLoaded', () => {
    new LoginSystem();
});

// Verificar autenticación al cargar cualquier página
document.addEventListener('DOMContentLoaded', () => {
    // Solo verificar si no estamos en la página de login
    if (!window.location.pathname.includes('login.html')) {
        if (!LoginSystem.isAuthenticated()) {
            window.location.href = '/login.html';
        }
    }
});

// Exportar para uso global
window.LoginSystem = LoginSystem;
