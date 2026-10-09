// ═══════════════════════════════════════════════════════════════════
//  SISTEMA DE ENCUESTAS INTERACTIVAS (2014–2025)
//  The Game Awards Archive
//
//  Los nominados se leen de /datos/AAAA.json y los votos se envían
//  al servidor con un POST a /api/vote.
//  Usa PRIMER_ANIO, ULTIMO_ANIO e INFO_CATEGORIAS de search.js
//  (por eso search.js se carga antes que este archivo).
//  Esas tres son constantes globales: en search.js están definidas
//  con const (PRIMER_ANIO = 2014, ULTIMO_ANIO = 2025 e INFO_CATEGORIAS,
//  un objeto con datos de cada categoría, entre ellos el "ancla" que
//  usamos como id). Como los dos scripts comparten la misma página,
//  acá las podemos usar sin importarlas ni declararlas de nuevo.
// ═══════════════════════════════════════════════════════════════════

// ───────────────── ESTADO DE LA PÁGINA ─────────────────

// Año que se está mostrando. Se lee de la URL (?y=AAAA); si no es válido, se usa el último.
// URLSearchParams es una clase del navegador que sabe leer los parámetros de la URL.
// window.location.search es la parte de la URL que va desde el "?" (ej: "?y=2020").
// Acá armo el lector y después le pido el parámetro "y".
const parametrosUrl = new URLSearchParams(window.location.search);
// parametrosUrl.get('y') devuelve el valor como texto ("2020") o null si no existe.
// parseInt lo convierte a número entero; si no se puede (por ej. null o "hola") da NaN
// (NaN = "Not a Number", un valor raro que no es mayor ni menor que nada).
// Uso let (y no const) porque abajo este valor se puede reemplazar.
let activeYear = parseInt(parametrosUrl.get('y'));
// Si el año NO está entre el primero y el último, lo corrijo.
// Con NaN las dos comparaciones dan false, así que también cae en este if.
if (!(activeYear >= PRIMER_ANIO && activeYear <= ULTIMO_ANIO)) {
    activeYear = ULTIMO_ANIO; // año inválido: uso el último año disponible
} // fin del if

// Votos elegidos en cada año.
// Ejemplo: { 2025: { 'Game of the Year': 'Nombre del juego', 'Best Narrative': null, ... } }
const currentVotes = {}; // objeto vacío; acá se van guardando los votos de cada año a medida que se cargan

// Datos de cada año ya descargados, para no pedirlos dos veces
const yearDataCache = {}; // objeto vacío que hace de "memoria": clave = año, valor = los datos de ese año

// ───────────────── CARGA DE DATOS ─────────────────

/**
 * Descarga los nominados de un año desde /datos/AAAA.json.
 * Devuelve null si no se pudieron cargar.
 *
 * Recibe: year (número, por ej. 2025).
 * Devuelve: una Promise (una "promesa": un resultado que todavía no está
 * listo y llega más tarde) que al final entrega el objeto con los nominados,
 * o null si falló. Por eso la función es async: así puede usar await adentro,
 * que significa "frená acá hasta que llegue la respuesta, pero sin trabar
 * el resto de la página".
 * Se llama desde renderYearPanel, cuando hay que armar el panel de un año.
 */
async function loadYearData(year) {
    // si ya bajé este año antes, el cache tiene datos y me los ahorro de pedir otra vez
    if (yearDataCache[year]) {
        return yearDataCache[year]; // devuelvo lo guardado y la función termina acá
    }

    try { // try/catch: intento hacer algo que puede fallar (red caída, archivo faltante); si falla salta al catch en vez de romper todo
        // fetch pide un archivo por internet (o al servidor local). Devuelve una Promise,
        // por eso uso await. Ej: fetch('datos/2025.json') trae la respuesta con los nominados de 2025.
        const response = await fetch('datos/' + year + '.json');
        // response.ok es true si el servidor contestó bien (códigos 200-299); false si dio error, por ej. 404 = no existe
        if (!response.ok) {
            return null; // no se pudo: devuelvo null para avisar que no hay datos
        }
        // JSON es un formato de texto para guardar datos (parecido a los objetos de JS).
        // response.json() lee el texto y lo convierte en un objeto de verdad; también es una Promise.
        const data = await response.json();
        yearDataCache[year] = data; // lo guardo en el cache para la próxima vez
        return data; // devuelvo los datos ya listos
    } catch (error) { // si algo de arriba tiró un error, entra acá (error trae el detalle)
        // console.error escribe un error en la consola del navegador (F12); sirve para que el programador lo vea
        console.error('[Encuesta] Error al cargar datos/' + year + '.json', error);
        return null; // devuelvo null para avisar que falló
    }
}

// ───────────────── INTERFAZ ─────────────────

/**
 * Arranca la página: crea las pestañas de años, conecta los botones
 * y muestra el año inicial.
 *
 * No recibe nada ni devuelve nada.
 * Se llama una sola vez, al final del archivo (ver sección INICIO).
 *
 * Paso a paso:
 * 1. Busca en el HTML el contenedor donde van las pestañas.
 * 2. Con un for, crea una pestaña (un div) por cada año, de PRIMER_ANIO
 *    a ULTIMO_ANIO (ambos vienen de search.js), y la mete en el contenedor.
 * 3. Cada pestaña queda escuchando el clic para cambiar de año.
 * 4. Conecta los botones de enviar y de reiniciar.
 * 5. Llama a switchYear con el año inicial para que se vea algo.
 */
function init() {
    // getElementById busca en el HTML el elemento que tenga ese id (acá el contenedor de las pestañas)
    const tabsContainer = document.getElementById('yearTabs');

    // Una pestaña por cada año
    // arranco en el primer año y subo de a uno (year++ suma 1) hasta llegar al último inclusive
    for (let year = PRIMER_ANIO; year <= ULTIMO_ANIO; year++) {
        const tab = document.createElement('div'); // creo un div nuevo, todavía suelto (no está en la página)
        tab.className = 'enc-tab'; // le pongo la clase CSS 'enc-tab' para que tome el estilo de pestaña
        // textContent es el texto que se ve dentro del elemento; acá el número del año (ej: 2018)
        tab.textContent = year;
        // dataset permite guardar datos propios en el elemento: esto crea el atributo data-year="2018" en el HTML.
        // Después lo leo para saber a qué año corresponde cada pestaña.
        tab.dataset.year = year;
        tab.setAttribute('role', 'tab'); // atributo role='tab' para que los lectores de pantalla sepan que es una pestaña
        // addEventListener le dice al elemento "cuando pase tal evento, ejecutá esta función".
        // Acá el evento es 'click'. La función de adentro es un callback (una función que se
        // pasa para que se ejecute más tarde, no ahora).
        tab.addEventListener('click', function () {
            switchYear(year); // al hacer clic, voy a este año (year queda recordado porque el let del for es nuevo en cada vuelta)
        }); // fin del callback del clic
        tabsContainer.appendChild(tab); // meto la pestaña dentro del contenedor, así aparece en la página
    } // fin del for

    // al botón de enviar le asigno submitSurvey: cuando lo clickean, se corre esa función (sin paréntesis: paso la función, no la ejecuto)
    document.getElementById('submit-survey').addEventListener('click', submitSurvey);
    // al botón de reiniciar le asigno una función que borra los votos del año que esté activo en ese momento
    document.getElementById('reset-survey').addEventListener('click', function () {
        resetYear(activeYear); // uso activeYear dentro del callback para tomar el año vigente al momento del clic, no el de cuando se armó la página
    }); // fin del callback

    // muestro el año inicial (el de la URL o el último)
    switchYear(activeYear);
}

/**
 * Cambia el año visible: actualiza la URL, la pestaña activa y el panel.
 * (También la usa search.js para saltar de año sin recargar.)
 *
 * Recibe: year (número del año al que se quiere ir).
 * No devuelve nada útil (por ser async devuelve una Promise vacía).
 * Se llama al hacer clic en una pestaña, desde init y desde search.js.
 *
 * Paso a paso:
 * 1. Guarda el año nuevo como año activo y esconde mensajes viejos.
 * 2. Cambia la URL sin recargar la página.
 * 3. Marca como activa solo la pestaña de ese año.
 * 4. Esconde todos los paneles.
 * 5. Busca el panel del año; si no existe, lo crea (esto tarda porque descarga datos).
 * 6. Si mientras tanto el usuario cambió a otro año, no muestra este.
 * 7. Si no, le pone la clase 'active' al panel para que se vea.
 */
async function switchYear(year) {
    activeYear = year; // guardo el año nuevo en la variable global
    hideFeedback(); // borro cualquier mensaje de aviso que hubiera quedado

    // Actualizar la URL sin recargar la página
    // history.replaceState cambia la URL de la barra del navegador sin recargar la página
    // y sin agregar una entrada nueva al historial (no se llena el botón "atrás").
    // Sus 3 parámetros: datos de estado (acá null = nada), título (no se usa, queda vacío) y la URL nueva.
    window.history.replaceState(null, '', 'encuesta.html?y=' + year);

    // Marcar la pestaña del año elegido
    // querySelectorAll devuelve la lista de todos los elementos que coinciden con el selector CSS; forEach recorre uno por uno
    document.querySelectorAll('.enc-tab').forEach(function (tab) {
        // Number() convierte el texto de dataset.year a número, así puedo compararlo con year.
        // esActual vale true solo en la pestaña del año elegido.
        const esActual = Number(tab.dataset.year) === year;
        // classList.toggle('active', condición) agrega la clase si la condición es true y la saca si es false.
        // Así solo la pestaña actual queda con 'active' (que en el CSS la pinta distinta).
        tab.classList.toggle('active', esActual);
        // aria-selected es un atributo de accesibilidad: le avisa a lectores de pantalla cuál pestaña está elegida. Pide el texto 'true'/'false'; el ? : es un if corto
        tab.setAttribute('aria-selected', esActual ? 'true' : 'false');
    }); // fin del forEach de pestañas

    // Ocultar todos los paneles
    // recorro todos los paneles de años que ya existen
    document.querySelectorAll('.enc-year-panel').forEach(function (panel) {
        panel.classList.remove('active'); // classList.remove saca la clase 'active' (el CSS lo oculta)
    }); // fin del forEach de paneles

    // Mostrar el panel del año (si todavía no existe, se crea)
    let panel = document.getElementById('panel-' + year); // busco el panel de este año; si no existe, getElementById devuelve null
    // !panel es true cuando panel es null (o sea no existe todavía)
    if (!panel) {
        // await espera a que renderYearPanel termine de bajar los datos y armar el panel.
        // Mientras tanto la página sigue andando; después la función continúa desde acá.
        panel = await renderYearPanel(year);
    } // fin del if (panel inexistente)
    // Si mientras cargaba el usuario eligió otro año, no mostrar este panel.
    // Mientras esperábamos, activeYear pudo cambiar (el usuario clickeó otra pestaña).
    // En ese caso este año ya no corresponde y salgo sin mostrarlo.
    if (activeYear !== year) {
        return; // return corta la función acá
    }
    // panel puede ser null si falló la descarga; solo si existe le pongo 'active' para mostrarlo
    if (panel) {
        panel.classList.add('active'); // classList.add agrega la clase 'active' (el CSS lo hace visible)
    }
}

/**
 * Crea el panel de un año con una sección por categoría y una tarjeta por nominado.
 *
 * Recibe: year (número del año).
 * Devuelve (como Promise): el div del panel ya insertado en la página,
 * o null si no se pudieron cargar los datos.
 * Se llama desde switchYear, solo la primera vez que se entra a un año.
 *
 * Paso a paso:
 * 1. Muestra "Cargando..." y espera los datos del año (loadYearData).
 * 2. Si no hay datos, muestra un error y devuelve null.
 * 3. Prepara el lugar para los votos de ese año.
 * 4. Crea el div del panel.
 * 5. Por cada categoría del JSON: anota que su voto es null (nada elegido todavía),
 *    crea el bloque con su título y una grilla, y mete una tarjeta por cada nominado.
 * 6. Antes de insertar revisa que otro clic no haya creado ya el mismo panel
 *    (si hubo dos cargas en paralelo); si es así, devuelve el que ya estaba.
 * 7. Inserta el panel en la página y lo devuelve.
 */
async function renderYearPanel(year) {
    // aviso al usuario que se están cargando los datos ('info' es el tipo de mensaje)
    showFeedback('Cargando nominados del año ' + year + '...', 'info');
    // espero los nominados del año; data es un objeto donde cada clave es una categoría y su valor la lista de nominados
    const data = await loadYearData(year);

    // !data es true si data es null, o sea si falló la descarga
    if (!data) {
        // mensaje de error para el usuario (largo, por eso va en una sola línea aparte)
        showFeedback('No se pudieron cargar los nominados del año ' + year + '. Revisá que el servidor esté funcionando y recargá la página.', 'error');
        return null; // devuelvo null: no hay panel para mostrar
    } // fin del if (sin datos)
    hideFeedback(); // los datos llegaron bien, saco el cartel de 'Cargando'

    // Al principio no hay ningún voto en este año:
    // creo un objeto vacío para los votos de este año; las claves se agregan abajo, una por categoría
    currentVotes[year] = {};

    // creo el div del panel (todavía no está en la página)
    const panel = document.createElement('div');
    panel.className = 'enc-year-panel'; // clase CSS para darle estilo al panel
    panel.id = 'panel-' + year; // id único, por ej. 'panel-2025'; así después lo encuentro con getElementById

    // Las categorías salen del propio JSON, en el mismo orden
    // for...in recorre las CLAVES de un objeto; acá categoryName va tomando cada nombre
    // de categoría ('Game of the Year', etc.), en el orden en que están en el JSON.
    for (const categoryName in data) {
        currentVotes[year][categoryName] = null; // al principio no hay voto en esa categoría: null significa 'ningún valor / nada elegido'

        const block = document.createElement('div'); // div que agrupa título y tarjetas de la categoría
        block.className = 'category-block'; // clase CSS del bloque
        // INFO_CATEGORIAS viene de search.js; si esta categoría figura ahí, uso su dato 'ancla'
        if (INFO_CATEGORIAS[categoryName]) {
            // le pongo ese id al bloque para que el buscador pueda saltar directo a esta categoría
            block.id = INFO_CATEGORIAS[categoryName].ancla; // para que el buscador pueda saltar acá
        } // fin del if

        const title = document.createElement('h2'); // h2 = título de la sección
        title.className = 'category-title'; // clase CSS del título
        title.textContent = categoryName; // el texto del título es el nombre de la categoría
        block.appendChild(title); // meto el título dentro del bloque (appendChild agrega un elemento hijo al final)

        const grid = document.createElement('div'); // div que va a contener las tarjetas en forma de grilla
        grid.className = 'candidate-grid'; // clase CSS de la grilla

        // data[categoryName] es la lista (array) de nominados de esta categoría; forEach pasa uno por uno como 'nominee'
        data[categoryName].forEach(function (nominee) {
            // createCard arma la tarjeta de ese nominado y la meto en la grilla
            grid.appendChild(createCard(nominee, categoryName, year));
        }); // fin del forEach de nominados

        block.appendChild(grid); // pongo la grilla dentro del bloque
        panel.appendChild(block); // pongo el bloque terminado dentro del panel
    } // fin del for de categorías

    // Si dos clics cargaron el mismo año a la vez, usar el panel que ya se creó (así no queda un panel duplicado)
    const panelExistente = document.getElementById('panel-' + year); // busco si ya hay un panel con ese id en la página
    if (panelExistente) { // si ya existe...
        return panelExistente; // ...devuelvo ese y tiro el que acabo de armar
    } // fin del if
    // busco el contenedor general de paneles y le agrego este
    document.getElementById('yearPanels').appendChild(panel);
    return panel; // devuelvo el panel nuevo
}

/**
 * Crea la tarjeta de un nominado (imagen + nombre) que se puede elegir con un clic.
 *
 * Recibe: nominee (objeto con al menos 'name' e 'image'), categoryName (texto
 * con el nombre de la categoría) y year (número del año).
 * Devuelve: el div de la tarjeta, listo para meter en la grilla.
 * Se llama desde renderYearPanel, una vez por cada nominado.
 */
function createCard(nominee, categoryName, year) {
    const card = document.createElement('div'); // div de la tarjeta
    card.className = 'candidate-card'; // clase CSS de la tarjeta

    // En el JSON la imagen viene como "../imagenes/...", la pasamos a "imagenes/..." (todas las páginas están en la raíz)
    const img = document.createElement('img'); // elemento <img> para la foto
    img.className = 'candidate-card__image'; // clase CSS de la imagen
    // .replace('../', '') reemplaza el primer '../' del texto por nada, o sea lo borra; src es la dirección de la imagen
    img.src = nominee.image.replace('../', '');
    // alt es el texto alternativo: se lee si la imagen no carga o con lector de pantalla
    img.alt = nominee.name;
    // loading = 'lazy': el navegador baja la imagen recién cuando está por verse (ahorra datos)
    img.loading = 'lazy';
    card.appendChild(img); // pongo la imagen dentro de la tarjeta

    const title = document.createElement('h3'); // h3 = nombre del juego
    title.className = 'candidate-card__title'; // clase CSS del título de la tarjeta
    title.textContent = nominee.name; // el texto es el nombre del nominado
    card.appendChild(title); // título adentro de la tarjeta

    // al hacer clic en la tarjeta se ejecuta el callback, que llama a handleCardClick con los datos de esta tarjeta
    card.addEventListener('click', function () {
        handleCardClick(card, categoryName, nominee.name, year); // paso la tarjeta, la categoría, el nombre y el año
    }); // fin del callback

    return card; // devuelvo la tarjeta terminada
}

/**
 * Selección de una tarjeta:
 * - Si ya estaba elegida, se desmarca y el voto de esa categoría vuelve a null.
 * - Si no, se desmarca la otra elegida de la misma categoría y se marca esta.
 *
 * Recibe: card (el div clickeado), categoryName (categoría), nomineeName (nombre
 * del nominado) y year (año).
 * No devuelve nada (solo cambia clases del HTML y el objeto currentVotes).
 * Se llama desde el clic de cada tarjeta (ver createCard).
 * Como en cada categoría se puede elegir un solo nominado, es como un "radio button".
 *
 * Paso a paso:
 * 1. Mira si la tarjeta ya tiene la clase 'card--selected'.
 * 2. Si la tiene: se la saca, anota null en el voto y termina (return).
 * 3. Si no: sube hasta el bloque de la categoría con closest.
 * 4. Le saca 'card--selected' a todas las tarjetas de ese bloque.
 * 5. Se la pone a esta y guarda el nombre como voto.
 */
function handleCardClick(card, categoryName, nomineeName, year) {
    // classList.contains devuelve true si el elemento tiene esa clase; acá, si esta tarjeta ya estaba elegida
    if (card.classList.contains('card--selected')) {
        card.classList.remove('card--selected'); // la desmarco (saco la clase)
        currentVotes[year][categoryName] = null; // el voto de esta categoría vuelve a 'nada elegido'
        return; // salgo: no hay nada más que hacer
    } // fin del if

    // closest sube por los elementos padre hasta encontrar el primero que coincida con el selector; acá, el bloque de la categoría
    const block = card.closest('.category-block');
    // busco dentro del bloque las tarjetas que estén elegidas (debería haber una sola o ninguna) y las recorro
    block.querySelectorAll('.card--selected').forEach(function (otherCard) {
        otherCard.classList.remove('card--selected'); // desmarco la otra tarjeta
    }); // fin del forEach

    card.classList.add('card--selected'); // marco esta tarjeta como elegida
    currentVotes[year][categoryName] = nomineeName; // guardo el nombre del nominado como voto de esta categoría y año
}

// ───────────────── ENVÍO DE VOTOS (POST /api/vote) ─────────────────

/**
 * Envía los votos del año activo al servidor.
 * Formato: { "year": 2025, "votes": { "Game of the Year": "Nombre" o null, ... } }
 * Siempre van las 7 categorías; las que no se eligieron van como null.
 *
 * No recibe nada. No devuelve nada útil (es async, devuelve una Promise vacía).
 * Se llama al hacer clic en el botón "Enviar mi votación" (conectado en init).
 *
 * Paso a paso:
 * 1. Toma el año activo y sus votos; si todavía no se cargaron, avisa y corta.
 * 2. Arma el payload (paquete de datos) con el año y los votos.
 * 3. Deshabilita el botón y cambia su texto para que no lo aprieten dos veces.
 * 4. Hace un POST a 'api/vote' con el paquete convertido a texto JSON.
 *    (POST = mandar datos al servidor; GET, que es lo normal de fetch, es pedirlos.)
 * 5. Si el servidor contesta bien: mensaje de éxito y marca el año como enviado.
 * 6. Si contesta con error: intenta leer su mensaje; si no puede, usa uno genérico.
 * 7. Si no hubo conexión (el fetch tira error): avisa que no se pudo conectar.
 * 8. Pase lo que pase, vuelve a habilitar el botón y le restaura el texto.
 */
async function submitSurvey() {
    const year = activeYear; // el año que está activo ahora
    const votes = currentVotes[year]; // los votos de ese año (puede ser undefined si todavía no se creó el panel)

    // !votes es true si no hay votos cargados: es que el panel de ese año aún no se armó
    if (!votes) {
        // aviso al usuario con tipo 'error' (se pinta distinto)
        showFeedback('Todavía no se cargaron los nominados del año ' + year + '.', 'error');
        return; // salgo sin enviar nada
    } // fin del if

    // payload = el paquete de datos que viaja al servidor; es un objeto con 2 propiedades
    const payload = {
        year: year, // year: year es lo mismo que year, la clave se llama igual que la variable
        votes: votes // los votos del año
    }; // fin del objeto payload

    // Bloqueamos el botón mientras se envía (así no lo aprietan dos veces seguidas)
    const submitBtn = document.getElementById('submit-survey'); // busco el botón en el HTML
    submitBtn.disabled = true; // disabled = true hace que el botón no se pueda clickear
    submitBtn.textContent = 'Enviando votación...'; // cambio el texto del botón para que se vea que está trabajando
    showFeedback('Enviando tus votos para el año ' + year + ' al servidor...', 'info'); // mensaje de aviso tipo 'info'

    try {
        // fetch, esta vez para ENVIAR: await espera la respuesta del servidor; el segundo parámetro es un objeto con las opciones del pedido
        const response = await fetch('api/vote', {
            method: 'POST', // method: 'POST' = quiero mandar datos, no pedirlos
            // headers son datos extra del pedido; Content-Type avisa al servidor que lo que mando está en formato JSON
            headers: { 'Content-Type': 'application/json' },
            // JSON.stringify convierte el objeto payload en texto JSON (ej: '{"year":2025,"votes":{...}}') porque por internet viajan textos, no objetos; body es el contenido del pedido
            body: JSON.stringify(payload)
        }); // fin de las opciones de fetch

        if (response.ok) { // ok = el servidor aceptó el voto
            showFeedback('¡Votación para ' + year + ' guardada con éxito! Muchas gracias por participar.', 'success'); // mensaje de éxito (tipo 'success')
            markSubmitted(year, true); // marco el panel y la pestaña del año como 'enviado'
        } else { // si no fue ok...
            // Si el servidor manda un mensaje de error, lo mostramos
            let message = 'Error del servidor (' + response.status + ')'; // armo un mensaje genérico con el código del error (ej: 500 = falló el servidor); response.status es ese número
            // el servidor a veces manda un JSON con un 'message'; lo intento leer, pero puede no ser JSON y por eso va otro try
            try {
                const errorData = await response.json(); // leo la respuesta como JSON (si no es JSON, tira error y salta al catch)
                // si existe errorData.message (no es vacío ni undefined)...
                if (errorData.message) {
                    message = errorData.message; // ...uso el mensaje que mandó el servidor
                } // fin del if
            } catch (error) { // no era JSON; no hago nada
                // La respuesta no era JSON: dejamos el mensaje genérico
            }
            showFeedback('⚠️ No se pudo registrar la votación: ' + message, 'error'); // aviso el error al usuario, con el motivo
        } // fin del if/else de response.ok
    } catch (error) { // este catch agarra errores de red (sin internet, servidor apagado)
        console.error('[Encuesta] Error al enviar a /api/vote', error); // dejo el detalle técnico en la consola
        showFeedback('⚠️ No se pudo conectar con el servidor. Revisá que esté funcionando.', 'error'); // aviso al usuario que no hubo conexión
    } // fin del try/catch

    submitBtn.disabled = false; // vuelvo a habilitar el botón (corre siempre, haya salido bien o mal)
    submitBtn.textContent = 'Enviar mi votación'; // le devuelvo su texto original
}

/**
 * Marca (o desmarca) el panel y la pestaña de un año como "enviado".
 *
 * Recibe: year (número del año) y submitted (true para marcar, false para desmarcar).
 * No devuelve nada; solo cambia clases CSS (el CSS usa 'submitted' para mostrar el estado).
 * Se llama desde submitSurvey (con true) y resetYear (con false).
 */
function markSubmitted(year, submitted) {
    const panel = document.getElementById('panel-' + year); // busco el panel del año por su id (null si todavía no existe)
    // busco la pestaña con un selector de atributo: .enc-tab[data-year="2025"] es el elemento con clase enc-tab y data-year igual a 2025
    const tab = document.querySelector('.enc-tab[data-year="' + year + '"]');
    // reviso que existan antes de usarlos, para que no explote con null
    if (panel) {
        // toggle con segundo parámetro: pone la clase si submitted es true y la saca si es false
        panel.classList.toggle('submitted', submitted);
    }
    if (tab) {
        // lo mismo para la pestaña
        tab.classList.toggle('submitted', submitted);
    }
}

/**
 * Borra todas las selecciones del año indicado.
 *
 * Recibe: year (número del año).
 * No devuelve nada. Se llama desde el botón de reiniciar (ver init).
 * Saca las marcas de la pantalla y también pone los votos en null en currentVotes.
 */
function resetYear(year) {
    const panel = document.getElementById('panel-' + year); // busco el panel de ese año
    // si el panel existe, desmarco todas sus tarjetas elegidas
    if (panel) {
        panel.querySelectorAll('.card--selected').forEach(function (card) { // recorro las tarjetas elegidas
            card.classList.remove('card--selected'); // le saco la marca visual
        }); // fin del forEach
    } // fin del if
    markSubmitted(year, false); // le saco también la marca de 'enviado'

    // Todos los votos del año vuelven a null
    const votes = currentVotes[year]; // el objeto con los votos de ese año
    // recorro cada categoría del objeto de votos (for...in da las claves)
    for (const categoryName in votes) {
        votes[categoryName] = null; // vuelvo cada voto a null
    } // fin del for

    showFeedback('Se han reiniciado los votos para el año ' + year + '.', 'info'); // aviso al usuario que se reinició
}

// ───────────────── MENSAJES DE AVISO ─────────────────

/**
 * Muestra un mensaje debajo de los botones. "type" puede ser info, success o error.
 *
 * Recibe: message (el texto a mostrar) y type (cuál estilo usar).
 * No devuelve nada. Se llama desde casi todas las funciones de arriba.
 */
function showFeedback(message, type) {
    const feedback = document.getElementById('surveyFeedback'); // busco el div donde se muestran los avisos
    feedback.textContent = message; // pongo el texto del mensaje
    // className reemplaza todas las clases del elemento; 'show' lo hace visible y type (info/success/error) le da el color
    feedback.className = 'survey-feedback show ' + type;
}

/**
 * Esconde el mensaje de aviso: vacía el texto y deja solo la clase base.
 * No recibe ni devuelve nada. Se llama al cambiar de año y cuando terminan de cargar los datos.
 */
function hideFeedback() {
    const feedback = document.getElementById('surveyFeedback'); // busco el div de avisos
    feedback.textContent = ''; // borro el texto (string vacío)
    feedback.className = 'survey-feedback'; // sin 'show' no se ve
}

// ───────────────── INICIO ─────────────────
// El script se carga al final del <body>, así que el HTML ya existe.
// llamo a init para que arranque todo: esta es la línea que pone en marcha el archivo
init();
