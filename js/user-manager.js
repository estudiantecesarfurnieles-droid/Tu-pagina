/**
 * 💖 MANEJO DE USUARIO EN PÁGINA PRINCIPAL 💖
 * Actualiza la información del usuario y maneja la sesión
 */

class UserManager {
    constructor() {
        this.init();
    }

    init() {
        this.updateUserInfo();
        this.setupUserEvents();
    }

    updateUserInfo() {
        const username = LoginSystem.getUsername();
        const welcomeText = document.getElementById('welcomeText');
        
        if (welcomeText && username) {
            welcomeText.textContent = `Bienvenido/a, ${username}`;
        }
    }

    setupUserEvents() {
        // Verificar sesión periódicamente
        setInterval(() => {
            if (!LoginSystem.isAuthenticated()) {
                this.handleSessionExpired();
            }
        }, 60000); // Verificar cada minuto

        // Manejar eventos de visibilidad de página
        document.addEventListener('visibilitychange', () => {
            if (!document.hidden && !LoginSystem.isAuthenticated()) {
                this.handleSessionExpired();
            }
        });
    }

    handleSessionExpired() {
        // Mostrar mensaje de sesión expirada
        this.showSessionMessage('Tu sesión ha expirado. Serás redirigido al login.', 'warning');
        
        // Redirigir después de 2 segundos
        setTimeout(() => {
            LoginSystem.logout();
        }, 2000);
    }

    showSessionMessage(message, type = 'info') {
        // Crear elemento de mensaje temporal
        const messageDiv = document.createElement('div');
        messageDiv.className = `session-message ${type}`;
        messageDiv.textContent = message;
        messageDiv.style.cssText = `
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: var(--bg-glass);
            backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: var(--border-radius-md);
            padding: 15px 25px;
            color: var(--text-primary);
            font-family: var(--font-primary);
            font-size: 0.9rem;
            font-weight: 500;
            z-index: 10000;
            box-shadow: var(--shadow-large);
            animation: messageSlideDown 0.5s ease-out;
        `;

        // Agregar estilos específicos por tipo
        if (type === 'warning') {
            messageDiv.style.borderColor = 'rgba(245, 158, 11, 0.4)';
            messageDiv.style.background = 'rgba(245, 158, 11, 0.1)';
        }

        document.body.appendChild(messageDiv);

        // Remover después de 3 segundos
        setTimeout(() => {
            messageDiv.style.animation = 'messageSlideUp 0.5s ease-out';
            setTimeout(() => {
                if (messageDiv.parentNode) {
                    messageDiv.parentNode.removeChild(messageDiv);
                }
            }, 500);
        }, 3000);
    }
}

// Inicializar cuando se carga la página
document.addEventListener('DOMContentLoaded', () => {
    // Solo inicializar si estamos en la página principal y el usuario está autenticado
    if (!window.location.pathname.includes('login.html') && LoginSystem.isAuthenticated()) {
        new UserManager();
    }
});

// Agregar estilos CSS para los mensajes
const style = document.createElement('style');
style.textContent = `
    @keyframes messageSlideDown {
        0% {
            opacity: 0;
            transform: translateX(-50%) translateY(-20px);
        }
        100% {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
        }
    }

    @keyframes messageSlideUp {
        0% {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
        }
        100% {
            opacity: 0;
            transform: translateX(-50%) translateY(-20px);
        }
    }
`;
document.head.appendChild(style);

// Exportar para uso global
window.UserManager = UserManager;
