// 🎮 JUEGO DE PREGUNTAS DIVERTIDO - TE EXTRAÑO
// Variables del juego
let juegoActivo = false;
let preguntaActual = 0;
let puntuacion = 0;
let preguntas = [];

// Preguntas del juego
const PREGUNTAS_JUEGO = [
  {
    pregunta: "¿Cuál dirías que es mi mayor miedo personal o preocupación subyacente?",
    opciones: ["El miedo al fracaso o a no cumplir mis propias expectativas", "El miedo a las serpientes o insectos grandes", "El miedo a la vejez o a la enfermedad", "El miedo a las alturas o a los lugares cerrados"],
    correcta: 0,
    mensajeCorrecto: "¡Exacto! Siempre tengo miedo de no estar a la altura de lo que espero de mí 💙",
    mensajeIncorrecto: "No es correcto, mi mayor miedo es no cumplir mis propias expectativas 💙"
  },
  {
    pregunta: "¿Qué pequeño detalle o gesto de las personas o del ambiente me molesta o me fascina más de lo normal (es algo en lo que siempre me fijo)?",
    opciones: ["Si la gente mastica con la boca abierta", "Si la decoración de un lugar está desequilibrada", "La forma en que la gente usa su tono de voz, no lo que dice", "Cuando alguien llega tarde a un compromiso"],
    correcta: 2,
    mensajeCorrecto: "¡Sí! Siempre me fijo en el TONO de voz, me encanta 💕",
    mensajeIncorrecto: "Me fijo en el tono de voz de las personas, no tanto en lo que dicen 💕"
  },
  {
    pregunta: "¿Cuál de estos es un objetivo de vida a largo plazo que he mencionado con más emoción?",
    opciones: ["Abrir mi propio negocio o proyecto personal innovador", "Escribir un libro sobre mis experiencias", "Viajar por todo el país en una casa rodante", "Hablar inglés fluidamente y conocer las diferentes culturas de los países europeos"],
    correcta: 3,
    mensajeCorrecto: "¡Correcto! Quiero hablar inglés perfecto y viajar por Europa 🎬",
    mensajeIncorrecto: "Mi sueño es hablar inglés fluidamente y conocer culturas europeas 🎬"
  },
  {
    pregunta: "¿De qué color era el suéter que tenía puesto el día que nos dimos nuestro primer beso?",
    opciones: ["Azul marino", "Verde oscuro", "Gris", "Negro"],
    correcta: 2,
    mensajeCorrecto: "¡Exacto! Era gris, lo recuerdo perfecto 💕",
    mensajeIncorrecto: "Era gris, ese día inolvidable 💕"
  },
  {
    pregunta: "¿Qué es lo que hago antes de irme a dormir, casi sin falta?",
    opciones: ["Reviso todas mis redes sociales por última vez", "Escucho música relajante o un podcast", "Leo durante al menos 10 minutos", "Hablar con Dios / Rezar"],
    correcta: 3,
    mensajeCorrecto: "¡Correcto! Siempre rezo antes de dormir, es mi momento sagrado 🙏",
    mensajeIncorrecto: "Siempre rezo antes de dormir, es parte esencial de mi rutina 🙏"
  },
  {
    pregunta: "Si tuvieras que definir mi mayor motivación personal o propósito de vida, ¿cuál de estas opciones crees que encaja mejor?",
    opciones: ["Lograr la independencia financiera y construir una vida sin preocupaciones materiales", "Convertirme en una referencia en mi campo profesional o en un experto reconocido", "Viajar por todos los continentes para coleccionar experiencias y culturas", "Hacer reír a las personas y estar para ellas cuando sienten que su mundo se derrumba, porque sé lo difícil que es la vida para algunos"],
    correcta: 3,
    mensajeCorrecto: "¡Exacto! Mi propósito es hacer feliz a la gente, ayudar cuando más lo necesitan 💖",
    mensajeIncorrecto: "Mi mayor propósito es estar para los demás y hacerlos felices 💖"
  }
];

// Inicializar el juego
function iniciarJuego() {
  juegoActivo = true;
  preguntaActual = 0;
  puntuacion = 0;
  preguntas = [...PREGUNTAS_JUEGO]; // Copia del array
  
  // Ocultar pantalla de inicio y mostrar pantalla de preguntas
  document.getElementById('juego-inicio').classList.add('hidden');
  document.getElementById('juego-preguntas').classList.remove('hidden');
  
  // Actualizar puntuación inicial
  actualizarPuntuacion();
  actualizarProgreso();
  
  // Mostrar primera pregunta
  mostrarPregunta();
  
  // Reproducir sonido de inicio
  playButtonSound();
}

// Mostrar pregunta actual
function mostrarPregunta() {
  const pregunta = preguntas[preguntaActual];
  
  // Actualizar texto de la pregunta
  document.getElementById('pregunta-texto').textContent = pregunta.pregunta;
  
  // Crear opciones
  const opcionesContainer = document.getElementById('opciones-container');
  opcionesContainer.innerHTML = '';
  
  pregunta.opciones.forEach((opcion, index) => {
    const boton = document.createElement('button');
    boton.className = 'opcion-btn';
    boton.textContent = opcion;
    boton.onclick = () => seleccionarOpcion(index);
    opcionesContainer.appendChild(boton);
  });
  
  // Actualizar progreso
  actualizarProgreso();
}

// Seleccionar opción
function seleccionarOpcion(indiceSeleccionado) {
  const pregunta = preguntas[preguntaActual];
  const opciones = document.querySelectorAll('.opcion-btn');
  
  // Deshabilitar todos los botones
  opciones.forEach(btn => {
    btn.disabled = true;
    btn.style.pointerEvents = 'none';
  });
  
  // Marcar respuesta correcta e incorrecta
  opciones[pregunta.correcta].classList.add('correcta');
  if (indiceSeleccionado !== pregunta.correcta) {
    opciones[indiceSeleccionado].classList.add('incorrecta');
  }
  
  // Verificar si es correcta
  const esCorrecta = indiceSeleccionado === pregunta.correcta;
  
  if (esCorrecta) {
    puntuacion++;
    actualizarPuntuacion();
  }
  
  // Mostrar feedback después de un breve delay
  setTimeout(() => {
    mostrarFeedback(esCorrecta, pregunta);
  }, 1000);
  
  // Reproducir sonido
  playButtonSound();
}

// Mostrar feedback
function mostrarFeedback(esCorrecta, pregunta) {
  const feedback = document.getElementById('juego-feedback');
  const icono = document.getElementById('feedback-icono');
  const mensaje = document.getElementById('feedback-mensaje');
  
  if (esCorrecta) {
    icono.textContent = '🎉';
    mensaje.textContent = pregunta.mensajeCorrecto;
  } else {
    icono.textContent = '💕';
    mensaje.textContent = pregunta.mensajeIncorrecto;
  }
  
  feedback.classList.remove('hidden');
}

// Siguiente pregunta
function siguientePregunta() {
  // Ocultar feedback
  document.getElementById('juego-feedback').classList.add('hidden');
  
  preguntaActual++;
  
  if (preguntaActual < preguntas.length) {
    // Mostrar siguiente pregunta
    mostrarPregunta();
  } else {
    // Mostrar pantalla de mensaje especial
    mostrarMensajeEspecial();
  }
  
  playButtonSound();
}

// Mostrar pantalla de mensaje especial
function mostrarMensajeEspecial() {
  // Ocultar pantalla de preguntas y mostrar mensaje especial
  document.getElementById('juego-preguntas').classList.add('hidden');
  document.getElementById('juego-mensaje-especial').classList.remove('hidden');
  
  // Configurar contador de caracteres
  const textarea = document.getElementById('mensaje-textarea');
  const contador = document.getElementById('contador-caracteres');
  
  textarea.addEventListener('input', function() {
    const longitud = this.value.length;
    contador.textContent = `${longitud}/500`;
    
    // Cambiar color del contador según la longitud
    if (longitud > 450) {
      contador.style.color = '#ef4444';
    } else if (longitud > 400) {
      contador.style.color = '#f59e0b';
    } else {
      contador.style.color = 'var(--text-muted)';
    }
  });
  
  // Enfocar el textarea
  setTimeout(() => {
    textarea.focus();
  }, 300);
}

// Enviar mensaje a WhatsApp
function enviarMensajeWhatsApp() {
  console.log('🔍 Función enviarMensajeWhatsApp llamada');
  
  const textarea = document.getElementById('mensaje-textarea');
  const mensaje = textarea.value.trim();
  
  console.log('📝 Mensaje obtenido:', mensaje);
  
  if (!mensaje) {
    alert('Por favor escribe un mensaje antes de enviar 💕');
    return;
  }
  
  // Tu número de WhatsApp
  const numeroWhatsApp = '3146684264';
  
  // Crear el mensaje con formato especial
  const mensajeCompleto = `💕 Mensaje especial de Camila 💕\n\n${mensaje}\n\n💖 Enviado desde nuestro universo de amor 💖`;
  
  // Codificar el mensaje para URL
  const mensajeCodificado = encodeURIComponent(mensajeCompleto);
  
  // Crear URL de WhatsApp
  const urlWhatsApp = `https://wa.me/573146684264?text=${mensajeCodificado}`;
  
  console.log('🔗 URL generada:', urlWhatsApp);
  
  // Intentar abrir WhatsApp con método más robusto
  try {
    console.log('🚀 Intentando abrir WhatsApp...');
    // Crear un enlace temporal
    const link = document.createElement('a');
    link.href = urlWhatsApp;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    console.log('✅ WhatsApp abierto exitosamente');
  } catch (error) {
    console.error('❌ Error al abrir WhatsApp:', error);
    // Fallback: usar window.open
    window.open(urlWhatsApp, '_blank');
    console.log('🔄 Usando método alternativo');
  }
  
  // Mostrar mensaje de confirmación
  mostrarConfirmacionEnvio();
  
  playButtonSound();
}

// Mostrar confirmación de envío
function mostrarConfirmacionEnvio() {
  const botonEnviar = document.querySelector('.btn-enviar-whatsapp');
  const textoOriginal = botonEnviar.innerHTML;
  
  // Cambiar el botón temporalmente
  botonEnviar.innerHTML = '✅ ¡Enviado!';
  botonEnviar.disabled = true;
  botonEnviar.style.background = 'linear-gradient(135deg, #10b981, #059669)';
  
  // Mostrar mensaje de confirmación
  const confirmacion = document.createElement('div');
  confirmacion.style.cssText = `
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: var(--bg-secondary);
    border-radius: var(--border-radius-lg);
    padding: 30px;
    text-align: center;
    box-shadow: var(--shadow-large);
    border: 1px solid rgba(255, 255, 255, 0.1);
    z-index: 10001;
    max-width: 400px;
  `;
  
  confirmacion.innerHTML = `
    <div style="font-size: 3rem; margin-bottom: 15px;">📱</div>
    <h3 style="color: var(--text-primary); margin-bottom: 15px; font-family: var(--font-elegant);">¡Mensaje Enviado!</h3>
    <p style="color: var(--text-secondary); margin-bottom: 20px;">Tu mensaje especial se ha enviado a mi WhatsApp 💙</p>
    <p style="color: var(--text-muted); font-size: 0.9rem;">¡Gracias por este hermoso mensaje, mi amor! 💕</p>
  `;
  
  document.body.appendChild(confirmacion);
  
  // Remover confirmación después de 3 segundos
  setTimeout(() => {
    document.body.removeChild(confirmacion);
    
    // Restaurar botón
    botonEnviar.innerHTML = textoOriginal;
    botonEnviar.disabled = false;
    botonEnviar.style.background = 'linear-gradient(135deg, #25D366, #128C7E)';
    
    // Continuar a resultados
    mostrarResultados();
  }, 3000);
}

// Saltar mensaje
function saltarMensaje() {
  // Ocultar pantalla de mensaje especial y mostrar resultados
  document.getElementById('juego-mensaje-especial').classList.add('hidden');
  mostrarResultados();
  
  playButtonSound();
}

// Mostrar resultados
function mostrarResultados() {
  // Ocultar pantalla de mensaje especial y mostrar resultados
  document.getElementById('juego-mensaje-especial').classList.add('hidden');
  document.getElementById('juego-resultados').classList.remove('hidden');
  
  // Actualizar resultados
  const porcentaje = Math.round((puntuacion / preguntas.length) * 100);
  
  // Título según puntuación
  let titulo, subtitulo, mensaje;
  
  if (puntuacion === preguntas.length) {
    titulo = "¡Perfecto! 🎉";
    subtitulo = "¡Sabes todo sobre mí!";
    mensaje = "¡Eres la persona más especial del mundo! Cada respuesta correcta me recuerda por qué te amo tanto. 💕 Te extraño mucho, mi amor. Este juego es solo una pequeña forma de decirte que siempre estás en mi corazón. ❤️";
  } else if (puntuacion >= preguntas.length * 0.8) {
    titulo = "¡Excelente! 🌟";
    subtitulo = "¡Me conoces muy bien!";
    mensaje = "¡Qué bien me conoces! Eso me hace sentir muy amada. 💕 Te extraño mucho y cada día que pasa sin verte me recuerda lo especial que eres para mí. ❤️";
  } else if (puntuacion >= preguntas.length * 0.6) {
    titulo = "¡Muy bien! 💖";
    subtitulo = "¡Me conoces bastante!";
    mensaje = "¡Buen trabajo! Me conoces bastante bien. 💕 Te extraño mucho, mi amor. Cada momento que paso sin ti me hace valorar más los momentos que compartimos. ❤️";
  } else {
    titulo = "¡Sigue intentando! 💕";
    subtitulo = "¡Podemos conocernos mejor!";
    mensaje = "¡No te preocupes! Cada día aprendemos más el uno del otro. 💕 Te extraño mucho, mi amor. Este juego es solo una excusa para decirte que siempre estás en mis pensamientos. ❤️";
  }
  
  document.getElementById('resultados-titulo').textContent = titulo;
  document.getElementById('resultados-subtitulo').textContent = subtitulo;
  document.getElementById('resultados-mensaje').innerHTML = `<p>${mensaje}</p>`;
  document.getElementById('puntuacion-final').textContent = `${puntuacion}/${preguntas.length}`;
  
  // Mostrar corazones según puntuación
  const corazones = '💖'.repeat(puntuacion) + '🤍'.repeat(preguntas.length - puntuacion);
  document.getElementById('corazones-finales').textContent = corazones;
  
  juegoActivo = false;
}

// Reiniciar juego
function reiniciarJuego() {
  // Ocultar resultados y mostrar pantalla de inicio
  document.getElementById('juego-resultados').classList.add('hidden');
  document.getElementById('juego-inicio').classList.remove('hidden');
  
  playButtonSound();
}

// Actualizar puntuación
function actualizarPuntuacion() {
  const corazonesElement = document.getElementById('corazones-puntuacion');
  const puntuacionElement = document.getElementById('puntuacion-texto');
  
  // Mostrar corazones según puntuación actual
  const corazones = '💖'.repeat(puntuacion) + '🤍'.repeat(preguntas.length - puntuacion);
  corazonesElement.textContent = corazones;
  
  puntuacionElement.textContent = `Puntuación: ${puntuacion}`;
}

// Actualizar progreso
function actualizarProgreso() {
  const progresoBar = document.querySelector('.progreso-bar::before');
  const progresoTexto = document.getElementById('progreso-texto');
  
  const porcentaje = ((preguntaActual + 1) / preguntas.length) * 100;
  
  // Actualizar barra de progreso
  const barra = document.querySelector('.progreso-bar');
  barra.style.setProperty('--progreso', `${porcentaje}%`);
  
  // Actualizar texto
  progresoTexto.textContent = `Pregunta ${preguntaActual + 1} de ${preguntas.length}`;
}

// Función para reproducir sonido (usar la existente)
function playButtonSound() {
  // Usar la función existente del script principal
  if (typeof window.playButtonChime === 'function') {
    window.playButtonChime();
  }
}

// Función alternativa para envío a WhatsApp
function enviarWhatsAppAlternativo(mensaje) {
  // Crear modal con opciones
  const modal = document.createElement('div');
  modal.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    backdrop-filter: blur(10px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10002;
  `;
  
  modal.innerHTML = `
    <div style="
      background: var(--bg-secondary);
      border-radius: var(--border-radius-xl);
      padding: 40px;
      text-align: center;
      max-width: 500px;
      box-shadow: var(--shadow-large);
      border: 1px solid rgba(255, 255, 255, 0.1);
    ">
      <div style="font-size: 3rem; margin-bottom: 20px;">📱</div>
      <h3 style="color: var(--text-primary); margin-bottom: 20px; font-family: var(--font-elegant);">Enviar a WhatsApp</h3>
      <p style="color: var(--text-secondary); margin-bottom: 25px;">Elige cómo quieres enviar el mensaje:</p>
      
      <div style="background: var(--bg-glass); padding: 20px; border-radius: var(--border-radius-md); margin-bottom: 25px; border: 1px solid rgba(255, 255, 255, 0.1);">
        <p style="color: var(--text-primary); font-style: italic; margin: 0;">"${mensaje}"</p>
      </div>
      
      <div style="display: flex; gap: 15px; justify-content: center; flex-wrap: wrap;">
        <button onclick="abrirWhatsAppWeb('${mensaje}')" style="
          background: linear-gradient(135deg, #25D366, #128C7E);
          color: white;
          border: none;
          padding: 15px 25px;
          border-radius: var(--border-radius-md);
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: var(--transition-medium);
        ">📱 WhatsApp Web</button>
        
        <button onclick="copiarMensaje('${mensaje}')" style="
          background: var(--bg-glass);
          color: var(--text-primary);
          border: 1px solid rgba(255, 255, 255, 0.2);
          padding: 15px 25px;
          border-radius: var(--border-radius-md);
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: var(--transition-medium);
        ">📋 Copiar Mensaje</button>
      </div>
      
      <button onclick="cerrarModalWhatsApp()" style="
        background: transparent;
        color: var(--text-muted);
        border: none;
        padding: 10px 20px;
        margin-top: 20px;
        cursor: pointer;
        font-size: 0.9rem;
      ">Cerrar</button>
    </div>
  `;
  
  document.body.appendChild(modal);
}

// Abrir WhatsApp Web
function abrirWhatsAppWeb(mensaje) {
  const numeroWhatsApp = '3146684264';
  const mensajeCompleto = `💕 Mensaje especial de Camila 💕\n\n${mensaje}\n\n💖 Enviado desde nuestro universo de amor 💖`;
  const mensajeCodificado = encodeURIComponent(mensajeCompleto);
  const urlWhatsApp = `https://web.whatsapp.com/send?phone=57${numeroWhatsApp}&text=${mensajeCodificado}`;
  
  window.open(urlWhatsApp, '_blank');
  cerrarModalWhatsApp();
  mostrarConfirmacionEnvio();
}

// Copiar mensaje al portapapeles
function copiarMensaje(mensaje) {
  const mensajeCompleto = `💕 Mensaje especial de Camila 💕\n\n${mensaje}\n\n💖 Enviado desde nuestro universo de amor 💖`;
  
  navigator.clipboard.writeText(mensajeCompleto).then(() => {
    alert('¡Mensaje copiado! Ahora puedes pegarlo en WhatsApp 💕');
    cerrarModalWhatsApp();
    mostrarConfirmacionEnvio();
  }).catch(() => {
    // Fallback para navegadores que no soportan clipboard API
    const textArea = document.createElement('textarea');
    textArea.value = mensajeCompleto;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
    alert('¡Mensaje copiado! Ahora puedes pegarlo en WhatsApp 💕');
    cerrarModalWhatsApp();
    mostrarConfirmacionEnvio();
  });
}

// Cerrar modal de WhatsApp
function cerrarModalWhatsApp() {
  const modal = document.querySelector('[style*="z-index: 10002"]');
  if (modal) {
    document.body.removeChild(modal);
  }
}
