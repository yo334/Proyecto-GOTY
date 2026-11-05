// ═══════════════════════════════════════════════════════════════════
//  SISTEMA DE ENCUESTAS (VOTACIÓN INDIVIDUAL POR AÑO)
//  Proyecto GOTY — The Game Awards
//
//  Este archivo maneja la interacción en las páginas de encuesta:
//    1. Elegir un juego nominado con un clic en su tarjeta.
//    2. Deseleccionar si se vuelve a hacer clic.
//    3. Reiniciar los votos elegidos.
//    4. Enviar los votos al servidor Flask (POST a /api/vote).
// ═══════════════════════════════════════════════════════════════════

// Función que muestra un cartel de aviso abajo de los botones
function mostrarAviso(mensaje, tipo) {
    const feedback = document.getElementById('surveyFeedback');
    if (!feedback) return;
    feedback.textContent = mensaje;
    feedback.className = 'survey-feedback show ' + tipo;
}

// Función que oculta el cartel de aviso
function ocultarAviso() {
    const feedback = document.getElementById('surveyFeedback');
    if (!feedback) return;
    feedback.textContent = '';
    feedback.className = 'survey-feedback';
}

// Conectar el clic a todas las tarjetas de nominados
function inicializarTarjetas() {
    const tarjetas = document.querySelectorAll('.candidate-card');

    tarjetas.forEach(function (tarjeta) {
        tarjeta.addEventListener('click', function () {
            // Si la tarjeta ya estaba elegida, la desmarcamos
            if (tarjeta.classList.contains('card--selected')) {
                tarjeta.classList.remove('card--selected');
                return;
            }

            // Buscamos el bloque de la categoría al que pertenece esta tarjeta
            const bloque = tarjeta.closest('.category-block');
            if (bloque) {
                // Desmarcamos cualquier otra tarjeta que haya estado elegida en esta misma categoría
                const otrasTarjetas = bloque.querySelectorAll('.card--selected');
                otrasTarjetas.forEach(function (otra) {
                    otra.classList.remove('card--selected');
                });
            }

            // Marcamos esta tarjeta como la elegida
            tarjeta.classList.add('card--selected');
        });
    });
}

// Reiniciar todos los votos seleccionados de la página
function reiniciarVotos() {
    const tarjetasElegidas = document.querySelectorAll('.candidate-card.card--selected');
    tarjetasElegidas.forEach(function (tarjeta) {
        tarjeta.classList.remove('card--selected');
    });

    // Quitamos la marca de enviado si la tenía
    const panel = document.querySelector('.enc-year-panel');
    if (panel) {
        panel.classList.remove('submitted');
    }

    const tabActiva = document.querySelector('.enc-tab.active');
    if (tabActiva) {
        tabActiva.classList.remove('submitted');
    }

    mostrarAviso('Se han reiniciado los votos de esta encuesta.', 'info');
}

// Enviar la votación al servidor Flask (POST a /api/vote)
async function enviarVotacion() {
    const panel = document.querySelector('.enc-year-panel');
    if (!panel) return;

    // Obtenemos el año de la encuesta desde el atributo data-year del panel
    const anio = Number(panel.dataset.year);

    // Armamos el diccionario de votos con cada categoría oficial
    const votos = {};
    const bloquesCategorias = panel.querySelectorAll('.category-block');

    bloquesCategorias.forEach(function (bloque) {
        const titulo = bloque.querySelector('.category-title');
        if (!titulo) return;
        const nombreCategoria = titulo.textContent.trim();

        const tarjetaElegida = bloque.querySelector('.candidate-card.card--selected');
        if (tarjetaElegida) {
            const nombreJuego = tarjetaElegida.dataset.name || tarjetaElegida.querySelector('.candidate-card__title').textContent.trim();
            votos[nombreCategoria] = nombreJuego;
        } else {
            // Si no se eligió ningún juego en esta categoría, mandamos null
            votos[nombreCategoria] = null;
        }
    });

    const botonEnviar = document.getElementById('submit-survey');
    if (botonEnviar) {
        botonEnviar.disabled = true;
        botonEnviar.textContent = 'Enviando votación...';
    }
    mostrarAviso('Enviando tus votos para el año ' + anio + ' al servidor...', 'info');

    // Determinamos la ruta de la API según si estamos dentro de una subcarpeta (Encuestas/ o Años/)
    const pathNorm = decodeURIComponent(window.location.pathname || '').replace(/\\/g, '/').toLowerCase();
    const enSubcarpetaEnc = pathNorm.includes('/encuestas/') || pathNorm.includes('/años/') || pathNorm.includes('/a\u00f1os/');
    const rutaApi = enSubcarpetaEnc ? '../api/vote' : 'api/vote';

    try {
        const respuesta = await fetch(rutaApi, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                year: anio,
                votes: votos
            })
        });

        if (respuesta.ok) {
            mostrarAviso('¡Votación para ' + anio + ' guardada con éxito! Muchas gracias por participar.', 'success');
            panel.classList.add('submitted');
            const tabActiva = document.querySelector('.enc-tab.active');
            if (tabActiva) {
                tabActiva.classList.add('submitted');
            }
        } else {
            let mensajeError = 'Error del servidor (' + respuesta.status + ')';
            try {
                const errorData = await respuesta.json();
                if (errorData.message) {
                    mensajeError = errorData.message;
                }
            } catch (e) {
                // Si no vino en formato JSON, dejamos el mensaje genérico
            }
            mostrarAviso('⚠️ No se pudo registrar la votación: ' + mensajeError, 'error');
        }
    } catch (error) {
        console.error('Error al enviar el voto:', error);
        mostrarAviso('⚠️ No se pudo conectar con el servidor. Revisá que esté funcionando (python backend/app.py).', 'error');
    } finally {
        if (botonEnviar) {
            botonEnviar.disabled = false;
            botonEnviar.textContent = 'Enviar mi votación';
        }
    }
}

// Conectar botones cuando cargue la página
document.addEventListener('DOMContentLoaded', function () {
    inicializarTarjetas();

    const botonReiniciar = document.getElementById('reset-survey');
    if (botonReiniciar) {
        botonReiniciar.addEventListener('click', reiniciarVotos);
    }

    const botonEnviar = document.getElementById('submit-survey');
    if (botonEnviar) {
        botonEnviar.addEventListener('click', enviarVotacion);
    }
});

// Por si el script carga después de DOMContentLoaded
if (document.readyState === 'interactive' || document.readyState === 'complete') {
    inicializarTarjetas();

    const botonReiniciar = document.getElementById('reset-survey');
    if (botonReiniciar) {
        botonReiniciar.addEventListener('click', reiniciarVotos);
    }

    const botonEnviar = document.getElementById('submit-survey');
    if (botonEnviar) {
        botonEnviar.addEventListener('click', enviarVotacion);
    }
}
