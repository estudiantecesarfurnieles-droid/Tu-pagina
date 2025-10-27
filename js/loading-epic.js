// Función para la pantalla de carga épica cósmica
function iniciarAnimacionCohete() {
  // Ocultar el botón "Iniciar Aventura"
  if (btnIniciarAventura) {
    btnIniciarAventura.classList.add('hidden');
    btnIniciarAventura.classList.remove('visible');
  }

  // Pausar la música de fondo y guardar su posición antes de la animación
  if (musicaFondo && !musicaFondo.paused) {
    musicaFondoBaseTime = musicaFondo.currentTime;
    musicaFondo.pause();
  }

  // Activar la pantalla de carga épica cósmica
  if (screenShatterContainer) {
    screenShatterContainer.classList.remove('hidden');
    
    // Iniciar la animación de progreso cósmica
    let progress = 0;
    const progressFill = document.getElementById('cosmicProgressFill');
    const percentage = document.getElementById('loadingPercentage');
    const status = document.getElementById('loadingStatus');
    const substatus = document.getElementById('loadingSubstatus');
    
    const progressInterval = setInterval(() => {
      progress += Math.random() * 12 + 3; // Progreso más suave
      if (progress > 100) progress = 100;
      
      if (progressFill) {
        progressFill.style.width = progress + '%';
      }
      
      if (percentage) {
        percentage.textContent = Math.round(progress) + '%';
      }
      
      // Cambiar mensajes según el progreso con mensajes más épicos
      if (status && substatus) {
        if (progress < 20) {
          status.textContent = 'Preparando el universo...';
          substatus.textContent = 'Cargando estrellas de amor...';
        } else if (progress < 40) {
          status.textContent = 'Iniciando galaxia de recuerdos...';
          substatus.textContent = 'Despertando constelaciones...';
        } else if (progress < 60) {
          status.textContent = 'Cargando momentos mágicos...';
          substatus.textContent = 'Preparando nebulosas de cariño...';
        } else if (progress < 80) {
          status.textContent = 'Preparando sorpresas cósmicas...';
          substatus.textContent = 'Cargando planetas de amor...';
        } else if (progress < 95) {
          status.textContent = 'Finalizando configuración...';
          substatus.textContent = 'Preparando el viaje espacial...';
        } else {
          status.textContent = '¡Universo listo!';
          substatus.textContent = '¡Preparado para explorar!';
        }
      }
      
      if (progress >= 100) {
        clearInterval(progressInterval);
        setTimeout(() => {
          screenShatterContainer.classList.add('hidden');
          mostrarSeccion('menu');
          
          // Reanudar música de fondo si estaba sonando antes
          if (musicaFondo && musicaFondoBaseTime > 0) {
            musicaFondo.currentTime = musicaFondoBaseTime;
            musicaFondo.play().catch(e => console.log("Error al reanudar musicaFondo automáticamente:", e));
            musicaFondoBaseTime = 0; // Resetear
          }
        }, 800); // Un poco más de tiempo para disfrutar la animación
      }
    }, 250);
  }
}
