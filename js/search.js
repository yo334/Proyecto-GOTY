// ═══════════════════════════════════════════════════════════════════
//  BUSCADOR DEL SITIO + BARRA DE NAVEGACIÓN  (js/search.js)
//
//  Este archivo hace dos cosas:
//    1) El buscador: esa cajita donde escribís "zelda" y te tira links.
//    2) La barra de arriba: se achica cuando bajás y abre/cierra el buscador.
//
//  Se carga en TODAS las páginas (index, encuesta, seleccionar encuesta y años).
//  El índice de búsqueda (la "lista de cosas buscables") se arma cuando carga la
//  página, leyendo los archivos datos/AAAA.json (uno por año).
//
//  OJO CON EL ORDEN DE CARGA: este archivo se carga ANTES que js/encuesta.js
//  (y también antes que js/anio.js). Como acá arriba definimos las constantes
//  globales PRIMER_ANIO, ULTIMO_ANIO e INFO_CATEGORIAS, esos otros archivos las
//  pueden usar directamente sin volver a declararlas. Si cambiás el orden de los
//  <script> en el HTML, esos archivos se rompen porque las constantes no existirían.
//  (Si las declararan de nuevo con const, también daría error: no se puede repetir.)
// ═══════════════════════════════════════════════════════════════════

// ───────────────── DATOS COMPARTIDOS DEL SITIO ─────────────────

// PRIMER_ANIO: el primer año que tiene datos el sitio (existe datos/2014.json).
// Es una constante GLOBAL: la usan también js/encuesta.js (para armar las pestañas
// de años y validar el año de la URL) y js/anio.js (para validar ?y=AAAA).
// "const" significa que el valor no se puede reasignar después.
const PRIMER_ANIO = 2014;
// ULTIMO_ANIO: el último año con datos. Cada año nuevo hay que subir este número
// (y agregar su datos/AAAA.json). Global: también la usan js/encuesta.js (año por
// defecto si la URL trae uno inválido) y js/anio.js.
const ULTIMO_ANIO = 2025;

// INFO_CATEGORIAS: un "objeto" (algo así como un diccionario): cada clave es el nombre
// de una categoría en inglés (tal cual aparece en datos/AAAA.json) y el valor es otro
// objeto con datos extra de esa categoría:
//   - ancla:    el id del bloque HTML de esa categoría (para saltar directo con #ancla)
//   - nombreEs: el nombre en español (sirve para que se encuentre buscando en castellano)
//   - icono:    el emoji que se muestra al lado del resultado
// Es GLOBAL: js/encuesta.js lo usa para ponerle id a cada bloque de categoría, y
// js/anio.js hace lo mismo en la página del año. Así el buscador sabe a qué id saltar.
const INFO_CATEGORIAS = {
    // Categoría principal: el juego del año
    'Game of the Year': { ancla: 'cat-goty', nombreEs: 'juego del año', icono: '🏆' },
    // Categoría de juegos independientes (los hechos por estudios chicos)
    'Best Independent Game': { ancla: 'cat-indie', nombreEs: 'mejor juego independiente', icono: '🌱' },
    // Categoría de historia / guion
    'Best Narrative': { ancla: 'cat-narrative', nombreEs: 'mejor narrativa', icono: '📖' },
    // Categoría de apartado visual
    'Best Art Direction': { ancla: 'cat-art', nombreEs: 'mejor dirección de arte', icono: '🎨' },
    // Categoría de música
    'Best Soundtrack': { ancla: 'cat-soundtrack', nombreEs: 'mejor banda sonora', icono: '🎵' },
    // Categoría de juego online / con amigos
    'Best Multiplayer': { ancla: 'cat-multiplayer', nombreEs: 'mejor multijugador', icono: '👥' },
    // Última categoría (sin coma al final, porque es la última del objeto)
    'Best Game Direction': { ancla: 'cat-direction', nombreEs: 'mejor dirección de juego', icono: '🎬' }
};

// MAX_RESULTADOS: tope de resultados que muestra el buscador, para que la lista
// no sea eterna. Se usa en buscar().
const MAX_RESULTADOS = 10;

// ───────────────── ÍNDICE DE BÚSQUEDA ─────────────────

// indiceBusqueda: la "lista maestra" de todo lo que se puede buscar. Arranca vacía
// ([] = array/lista vacía) y se va llenando con agregarEntrada(). Cada entrada es un
// objeto con: label (texto visible), url (a dónde lleva), icono, texto (versión
// normalizada donde realmente se busca) y, a veces, anio y ancla (para la encuesta).
// Es const pero igual se le pueden agregar cosas con push: lo que no se puede es
// reemplazar la lista entera por otra.
const indiceBusqueda = [];

// estamosEnEncuesta: true si la página actual es la de la encuesta.
// window.location.pathname es la parte de la dirección después del dominio
// (ej. "/encuesta.html"). .includes('algo') dice si el texto contiene eso.
// "&&" significa "y además": tiene que contener encuesta.html Y NO contener
// seleccionar_encuesta.html (porque ese nombre también contiene la palabra "encuesta.html").
const estamosEnEncuesta = window.location.pathname.includes('encuesta.html')
    && !window.location.pathname.includes('seleccionar_encuesta.html');

/**
 * normalizarTexto
 * Qué hace: deja un texto "parejo" para poder comparar: todo en minúsculas, sin
 *   acentos, sin signos raros y con un solo espacio entre palabras. Así
 *   "Narrativa", "narrativa" y "narratíva" se buscan igual.
 * Qué recibe: texto (un string; puede venir vacío o undefined).
 * Qué devuelve: el string ya limpio ('' si no había nada).
 * Cuándo se llama: al guardar cada entrada en el índice (agregarEntrada) y cada
 *   vez que el usuario escribe algo (buscar y mostrarResultados). Se usa en los dos
 *   lados a propósito: si el índice y lo que escribís pasaron por la misma limpieza,
 *   sí o sí van a coincidir.
 *
 * Paso a paso:
 *   1. Si no hay texto, devolvemos '' y listo (evita errores con undefined).
 *   2. toLowerCase() pasa todo a minúsculas ("Zelda" -> "zelda").
 *   3. Sacamos los acentos en dos movimientos:
 *        normalize('NFD') descompone cada letra con acento en dos piezas: la letra
 *          base + el acento suelto. Ej: "é" pasa a ser "e" + "´" (dos caracteres).
 *        .replace(/[\u0300-\u036f]/g, '') borra justamente esos acentos sueltos.
 *          La regex es lo que va entre las barras / /:
 *            [ ... ]        = "cualquier caracter de este grupo"
 *            \u0300-\u036f  = el rango Unicode de los "acentos combinables"
 *            g              = global, o sea reemplazar TODOS, no solo el primero
 *        Resultado: "canción" -> "cancion", "ñ" -> "n".
 *   4. Sacamos los apóstrofes ("baldur's" -> "baldurs").
 *   5. Cambiamos la puntuación por espacios (para que "zelda:" y "zelda" sean iguales).
 *   6. \s+ (uno o más espacios/tabs seguidos) se reemplaza por un único espacio.
 *   7. trim() borra los espacios del principio y del final.
 */
function normalizarTexto(texto) {
    // Si texto es vacío, null o undefined (!texto es true), no hay nada que limpiar
    if (!texto) {
        // Devolvemos string vacío así el resto del código no se rompe
        return '';
    }
    // Paso 2: arrancamos pasando todo a minúsculas
    let resultado = texto.toLowerCase();
    // Paso 3: NFD separa la letra del acento y la regex borra los acentos sueltos ('é' -> 'e')
    resultado = resultado.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    // Paso 4: borra los apóstrofes (/'/g = todos los ' del texto)
    resultado = resultado.replace(/'/g, '');
    // Paso 5: cada signo de puntuación de la lista pasa a ser un espacio (el \- es un guion literal)
    resultado = resultado.replace(/[:,.!?¿¡\-_<>«»]/g, ' ');
    // Paso 6: varios espacios seguidos quedan como uno solo
    resultado = resultado.replace(/\s+/g, ' ');
    // Paso 7: sacamos espacios de las puntas y devolvemos el resultado
    return resultado.trim();
}

/**
 * agregarEntrada
 * Qué hace: crea una entrada de búsqueda y la mete en la lista indiceBusqueda.
 * Qué recibe: label (texto que ve el usuario), url (a dónde lleva), icono (emoji),
 *   palabrasExtra (palabras que no se muestran pero sirven para encontrarla),
 *   anio y ancla (opcionales: solo se usan para la encuesta).
 * Qué devuelve: nada (solo modifica indiceBusqueda).
 * Cuándo se llama: desde cargarIndiceBusqueda y agregarEntradasDelAnio.
 */
function agregarEntrada(label, url, icono, palabrasExtra, anio, ancla) {
    // push agrega un elemento al final de la lista. Ej: [1,2].push(3) -> [1,2,3].
    // Acá agregamos un objeto nuevo (lo que va entre llaves { }).
    indiceBusqueda.push({
        // Texto que se muestra en el resultado
        label: label,
        // Link al que va el resultado
        url: url,
        // Emoji de adorno
        icono: icono,
        // Texto donde se busca: el label + las palabras extra, ya limpios con normalizarTexto
        texto: normalizarTexto(label + ' ' + palabrasExtra),
        // Año al que pertenece (o null si es una entrada general)
        anio: anio,
        // id del bloque al que hay que saltar (o '' si no hay)
        ancla: ancla
    });
}

/**
 * agregarEntradasDelAnio
 * Qué hace: carga en el índice todo lo de un año: la página del año, los ganadores
 *   de cada categoría, la encuesta de ese año y el resto de los nominados.
 * Qué recibe: anio (número, ej. 2020) y datos (el objeto que salió del JSON de ese
 *   año: las claves son categorías y cada valor es la lista de juegos con
 *   { name, isWinner, ... }).
 * Qué devuelve: nada (agrega cosas con agregarEntrada).
 * Cuándo se llama: desde cargarIndiceBusqueda, una vez por cada año que se cargó bien.
 *
 * Paso a paso:
 *   0. Preparamos el link de la página del año y una lista vacía de nominados.
 *   1. Buscamos el ganador del Game of the Year para ponerlo en el título.
 *   2. Recorremos las categorías: los ganadores se agregan ya mismo.
 *   3. Los nominados se juntan aparte y se agregan al final (paso 4), así en el
 *      buscador siempre salen primero los ganadores y después los nominados.
 *   4. Entremedio agregamos la entrada de la encuesta de ese año.
 */
function agregarEntradasDelAnio(anio, datos) {
    // Link a la página del año. Ej: años.html?y=2020 (el ?y= es un dato que viaja en la URL)
    const paginaAnio = 'años.html?y=' + anio;
    // Lista vacía donde vamos a juntar los nominados que no ganaron
    const nominados = [];

    // Arrancamos sin ganador conocido
    let ganadorGoty = '';
    // Lista de juegos del GOTY. El || usa [] si esa categoría no existe en el año (así el for de abajo no explota)
    const nominadosGoty = datos['Game of the Year'] || [];
    // Recorremos la lista de a uno: i es la posición (0 = primero)
    for (let i = 0; i < nominadosGoty.length; i++) {
        // Si este juego tiene isWinner en true, es el ganador
        if (nominadosGoty[i].isWinner) {
            // Nos guardamos el nombre del ganador
            ganadorGoty = nominadosGoty[i].name;
        }
    }

    // Entrada de la página del año. Ej: "2020 — Hades". El texto del medio son palabras ocultas para encontrarla
    agregarEntrada(anio + ' — ' + ganadorGoty, paginaAnio, '🏆',
        'goty año ganadores premios', anio, '');

    // for...in recorre las CLAVES del objeto: acá, cada nombre de categoría en inglés
    for (const categoria in datos) {
        // Buscamos los datos extra de esa categoría (ancla, nombre en español, icono)
        const info = INFO_CATEGORIAS[categoria];
        // Si no está en INFO_CATEGORIAS, info es undefined, y !info da true
        if (!info) {
            continue; // categoría desconocida: la salteamos
        // continue corta esta vuelta del for y pasa a la categoría siguiente
        }
        // Link directo al bloque de la categoría. Ej: años.html?y=2020#cat-goty (el # salta a ese id)
        const url = paginaAnio + '#' + info.ancla;

        // forEach: ejecuta la función que le pasamos una vez por cada juego de la lista.
        // "juego" es el juego de esa vuelta. (function (juego) { ... } es una función sin nombre.)
        datos[categoria].forEach(function (juego) {
            // Si ganó esta categoría, va directo al índice
            if (juego.isWinner) {
                // Label tipo "2020 — Best Narrative: Hades"; las palabras ocultas permiten buscar "mejor narrativa ganador"
                agregarEntrada(anio + ' — ' + categoria + ': ' + juego.name, url, info.icono,
                    info.nombreEs + ' ganador', anio, info.ancla);
            // Si no ganó, es un nominado
            } else {
                // Lo guardamos aparte (con todo lo que hace falta) para agregarlo después de los ganadores
                nominados.push({ juego: juego, categoria: categoria, info: info, url: url });
            }
        });
    }

    // Entrada para votar en la encuesta de este año. Las palabras ocultas permiten buscar "votar", "voto", etc.
    agregarEntrada('Encuesta GOTY ' + anio + ' — Votar nominados', 'encuesta.html?y=' + anio, '🗳️',
        'encuesta votar voto votacion survey', anio, '');

    // Ahora sí, recorremos los nominados que juntamos antes
    nominados.forEach(function (nominado) {
        // Label tipo "Hades (2020 · Best Narrative)"
        const label = nominado.juego.name + ' (' + anio + ' · ' + nominado.categoria + ')';
        // Agregamos el nominado con el emoji de joystick
        agregarEntrada(label, nominado.url, '🎮',
            nominado.info.nombreEs + ' nominado', anio, nominado.info.ancla);
    });
}

/**
 * cargarIndiceBusqueda
 * Qué hace: arma TODO el índice de búsqueda: primero las entradas fijas y después
 *   los datos de cada año, que baja de los archivos datos/AAAA.json.
 * Qué recibe: nada.
 * Qué devuelve: una Promise (una "promesa": un resultado que todavía no está
 *   listo pero va a llegar). No usamos ese valor; solo la dejamos correr de fondo.
 * Cuándo se llama: una vez, al final del archivo, si existe el input del buscador.
 *
 * Explicación de lo "async" (para no perderse):
 *   - "async" delante de function marca que adentro vamos a esperar cosas lentas.
 *   - fetch('ruta') le pide un archivo al servidor. Tarda, así que devuelve una
 *     Promise (la promesa de la respuesta).
 *   - "await" significa "esperá acá a que la promesa se cumpla y recién ahí seguí".
 *     Mientras espera, la página sigue andando normal (no se congela).
 *   - respuesta.json() convierte el texto del archivo JSON (un formato de texto
 *     para guardar datos, tipo {"a": 1}) en un objeto que JavaScript puede usar.
 *     También hay que esperarlo con await.
 *   - try/catch: si algo falla (archivo inexistente, JSON roto), en vez de romper
 *     todo saltamos al catch, avisamos por consola y seguimos con el año siguiente.
 *
 * Paso a paso:
 *   1. Agregamos las 2 entradas fijas (ir a la encuesta / elegir año).
 *   2. Para cada año entre PRIMER_ANIO y ULTIMO_ANIO: pedimos su JSON, lo
 *      convertimos y llamamos a agregarEntradasDelAnio.
 *   3. Si mientras cargaba el usuario ya escribió algo, volvemos a buscar para que
 *      vea los resultados completos.
 */
async function cargarIndiceBusqueda() {
    // Entrada fija: va a la encuesta del año actual (sin año ni ancla, por eso null y '')
    agregarEntrada('Ir a la Encuesta GOTY', 'encuesta.html', '🗳️',
        'encuesta votar voto votacion survey poll', null, '');
    // Otra entrada fija: el portal para elegir qué encuesta votar
    agregarEntrada('Seleccionar Año de Encuesta', 'seleccionar_encuesta.html', '🗳️',
        'seleccionar elegir todas las encuestas portal votar', null, '');

    // Un for clásico: arranca en el primer año y sube de a 1 hasta el último (inclusive)
    for (let anio = PRIMER_ANIO; anio <= ULTIMO_ANIO; anio++) {
        // Probamos esto; si algo falla, saltamos al catch
        try {
            // Pedimos el archivo de ese año y esperamos la respuesta (ej: datos/2020.json)
            const respuesta = await fetch('datos/' + anio + '.json');
            // Convertimos el texto JSON en un objeto de JavaScript (también hay que esperar)
            const datos = await respuesta.json();
            // Con los datos del año, llenamos el índice
            agregarEntradasDelAnio(anio, datos);
        // 'error' trae lo que salió mal
        } catch (error) {
            // console.warn escribe un aviso en la consola del navegador (F12); el sitio sigue funcionando
            console.warn('[Buscador] No se pudo cargar /datos/' + anio + '.json', error);
        }
    }

    // Si ya existe el input y tiene algo escrito (.value es lo que hay escrito), redibujamos los resultados
    if (inputBusqueda && inputBusqueda.value) {
        // Vuelve a buscar con lo que el usuario ya escribió
        mostrarResultados();
    }
}

// ───────────────── BÚSQUEDA Y RESULTADOS ─────────────────

// El cuadro de texto donde se escribe (document.getElementById busca un elemento por su id; da null si no existe en esta página)
const inputBusqueda = document.getElementById('search-input');
// El div donde se dibuja la lista de resultados
const contenedorResultados = document.getElementById('search-results');

// resultadoMarcado: posición del resultado resaltado con las flechas (-1 = ninguno). Es let porque cambia
let resultadoMarcado = -1;

/**
 * buscar
 * Qué hace: busca en el índice y devuelve las entradas que contienen TODAS las
 *   palabras que escribió el usuario (en cualquier orden).
 * Qué recibe: consulta (string con lo que se escribió).
 * Qué devuelve: una lista con hasta MAX_RESULTADOS entradas del índice.
 * Cuándo se llama: desde mostrarResultados, cada vez que se escribe una tecla.
 *
 * Paso a paso (es el "ranking" del buscador):
 *   1. Limpiamos la consulta con normalizarTexto y la partimos en palabras con
 *      split(' ') ("hades 2020" -> ["hades", "2020"]).
 *   2. Recorremos el índice entrada por entrada.
 *   3. Para cada entrada asumimos que sirve (tieneTodas = true) y chequeamos cada
 *      palabra: si el texto de la entrada NO la incluye, la descartamos.
 *   4. Las que pasan se agregan a la lista de encontrados.
 *   5. Cuando juntamos MAX_RESULTADOS, cortamos el recorrido (break).
 *   No hay puntaje: el orden de los resultados es el orden en que se cargó el
 *   índice (por eso se agregan primero los ganadores y al final los nominados).
 */
function buscar(consulta) {
    // Limpiamos y partimos en palabras: split(' ') corta el texto en cada espacio y devuelve una lista
    const palabras = normalizarTexto(consulta).split(' ');
    // Acá juntamos las entradas que cumplen
    const encontrados = [];

    // Recorremos todo el índice de a una entrada
    for (let i = 0; i < indiceBusqueda.length; i++) {
        // La entrada de esta vuelta
        const entrada = indiceBusqueda[i];

        // Partimos suponiendo que la entrada sirve; si falta alguna palabra la bajamos a false
        let tieneTodas = true;
        // Revisamos cada palabra buscada (forEach = una vez por palabra)
        palabras.forEach(function (palabra) {
            // includes dice si un texto contiene a otro. Ej: 'hades 2020'.includes('hades') -> true
            if (!entrada.texto.includes(palabra)) {
                // Falta esta palabra: la entrada no sirve
                tieneTodas = false;
            }
        });

        // Si estaban todas las palabras, la guardamos
        if (tieneTodas) {
            // push: la agrega al final de la lista de encontrados
            encontrados.push(entrada);
        }
        // Si ya llegamos al máximo de resultados, no hace falta seguir mirando
        if (encontrados.length === MAX_RESULTADOS) {
            // break corta el for entero
            break;
        }
    }
    // Devolvemos lo encontrado
    return encontrados;
}

/**
 * urlDelResultado
 * Qué hace: decide a qué link lleva un resultado.
 * Qué recibe: entrada (una entrada del índice).
 * Qué devuelve: un string con la URL.
 * Cuándo se llama: al dibujar cada resultado (mostrarResultados).
 * Por qué: si ya estás en la encuesta, un resultado de un año tiene que abrir la
 *   encuesta de ESE año (y no la página de resultados del año).
 */
function urlDelResultado(entrada) {
    // Si estamos en la encuesta y la entrada tiene año, armamos el link a la encuesta de ese año
    if (estamosEnEncuesta && entrada.anio) {
        // Link base. Ej: encuesta.html?y=2020
        let url = 'encuesta.html?y=' + entrada.anio;
        // Si además tiene ancla (id de una categoría)...
        if (entrada.ancla) {
            // ...se la pegamos con # para que baje directo a esa categoría
            url = url + '#' + entrada.ancla;
        }
        // Devolvemos el link armado
        return url;
    }
    // En cualquier otro caso usamos el link normal de la entrada
    return entrada.url;
}

/**
 * ocultarResultados
 * Qué hace: esconde la lista de resultados y borra la selección con flechas.
 * Qué recibe / devuelve: nada / nada.
 * Cuándo se llama: al escribir menos de 2 letras, con Escape, al hacer clic fuera
 *   o al elegir un resultado.
 */
function ocultarResultados() {
    // classList maneja las clases CSS del elemento; remove('active') le saca la clase 'active', que es la que lo mostraba
    contenedorResultados.classList.remove('active');
    // Volvemos a 'ningún resultado marcado'
    resultadoMarcado = -1;
}

/**
 * mostrarResultados
 * Qué hace: toma lo que está escrito en el input, busca y dibuja los resultados
 *   (un link por cada uno) dentro del contenedor.
 * Qué recibe / devuelve: nada / nada (trabaja con el input y el contenedor globales).
 * Cuándo se llama: en cada tecla escrita (evento 'input') y al terminar de cargar
 *   el índice si ya había texto.
 *
 * Paso a paso:
 *   1. Limpiamos lo escrito y vaciamos la lista anterior.
 *   2. Si hay menos de 2 letras, ocultamos todo y salimos.
 *   3. Buscamos. Si no hay nada, mostramos un cartelito "Sin resultados".
 *   4. Por cada resultado creamos un <a> (link) con su icono y su texto, usando
 *      createElement: así creamos elementos HTML desde JavaScript sin escribir HTML.
 *   5. Mostramos la lista agregando la clase 'active'.
 */
function mostrarResultados() {
    // Lo escrito (.value) ya limpio
    const consulta = normalizarTexto(inputBusqueda.value);
    // innerHTML = '' vacía el contenedor (borra los resultados viejos)
    contenedorResultados.innerHTML = '';

    // length es la cantidad de letras
    if (consulta.length < 2) {
        // Escondemos la lista
        ocultarResultados();
        // return corta la función acá; no seguimos
        return;
    }

    // Pedimos las entradas que coinciden
    const encontrados = buscar(consulta);

    // Si la lista está vacía (0 elementos)...
    if (encontrados.length === 0) {
        // ...creamos un div nuevo (todavía no está en la página)
        const vacio = document.createElement('div');
        // className le pone las clases CSS (para que se vea con el estilo de un resultado vacío)
        vacio.className = 'search-result search-result--empty';
        // textContent pone el texto del elemento (como texto plano, sin interpretar HTML)
        vacio.textContent = 'Sin resultados';
        // appendChild mete el div adentro del contenedor, y recién ahí aparece en pantalla
        contenedorResultados.appendChild(vacio);
    }

    // Por cada resultado armamos un link
    encontrados.forEach(function (entrada) {
        // Creamos el <a>
        const link = document.createElement('a');
        // Clase para darle estilo
        link.className = 'search-result';
        // href es a dónde lleva el link
        link.href = urlDelResultado(entrada);
        // Si la entrada tiene año, lo guardamos en el link
        if (entrada.anio) {
            // dataset permite guardar datos propios en el elemento (queda como data-anio en el HTML); después los lee manejarClicResultado
            link.dataset.anio = entrada.anio;
            // Lo mismo con el ancla
            link.dataset.ancla = entrada.ancla;
        }

        // Un span chiquito para el emoji
        const icono = document.createElement('span');
        // Clase de estilo del icono
        icono.className = 'search-result__icon';
        // Le ponemos el emoji como texto
        icono.textContent = entrada.icono;
        // Lo metemos dentro del link
        link.appendChild(icono);

        // Otro span, para el texto del resultado
        const texto = document.createElement('span');
        // Clase de estilo del texto
        texto.className = 'search-result__label';
        // Le ponemos el label
        texto.textContent = entrada.label;
        // Lo metemos dentro del link
        link.appendChild(texto);

        // Y el link completo, adentro del contenedor
        contenedorResultados.appendChild(link);
    });

    // classList.add('active') le agrega la clase que muestra la lista
    contenedorResultados.classList.add('active');
    // Cada vez que se redibuja, se borra la selección de flechas
    resultadoMarcado = -1;
}

/**
 * resaltarResultado
 * Qué hace: marca en la lista el resultado que está seleccionado con las flechas
 *   (le pone la clase 'highlight') y le saca la marca a los demás.
 * Qué recibe: links (la lista de links de resultados).
 * Qué devuelve: nada.
 * Cuándo se llama: desde manejarTeclasBusqueda cuando se aprieta flecha arriba o abajo.
 */
function resaltarResultado(links) {
    // forEach da cada link y su posición (0, 1, 2...)
    links.forEach(function (link, posicion) {
        // ¿Es el que está marcado ahora?
        if (posicion === resultadoMarcado) {
            // Sí: le ponemos la clase que lo resalta
            link.classList.add('highlight');
            // scrollIntoView mueve el scroll de la lista para que el link se vea; 'nearest' mueve lo mínimo necesario
            link.scrollIntoView({ block: 'nearest' });
        } else {
            // No: nos aseguramos de que no quede resaltado
            link.classList.remove('highlight');
        }
    });
}

/**
 * manejarTeclasBusqueda
 * Qué hace: maneja las teclas dentro del buscador: flecha abajo/arriba para
 *   moverse por los resultados, Enter para abrir el marcado y Escape para cerrar.
 * Qué recibe: evento (info de la tecla apretada; el navegador lo pasa solo).
 * Qué devuelve: nada.
 * Cuándo se llama: en cada 'keydown' (tecla apretada) dentro del input.
 *
 * Paso a paso:
 *   1. Agarramos todos los links de resultados que hay ahora en pantalla.
 *   2. Flecha abajo: sumamos 1 a la posición marcada, sin pasarnos del último
 *      (Math.min elige el menor de dos números).
 *   3. Flecha arriba: restamos 1, sin bajar de 0 (Math.max elige el mayor).
 *   4. Enter con algo marcado: hacemos clic en ese link.
 *   5. Escape: cerramos la lista.
 *   preventDefault() frena lo que haría el navegador solo (por ejemplo, las
 *   flechas moverían el cursor dentro del input, o Enter intentaría enviar un formulario).
 */
function manejarTeclasBusqueda(evento) {
    // querySelectorAll busca todos los elementos que cumplan el selector CSS: acá, los <a> con clase search-result
    const links = contenedorResultados.querySelectorAll('a.search-result');

    // evento.key es el nombre de la tecla. Solo si hay resultados para recorrer
    if (evento.key === 'ArrowDown' && links.length > 0) {
        // Frenamos el comportamiento normal de la flecha
        evento.preventDefault();
        // Bajamos uno, pero sin pasar del último (links.length - 1)
        resultadoMarcado = Math.min(resultadoMarcado + 1, links.length - 1);
        // Actualizamos cuál se ve resaltado
        resaltarResultado(links);
    // Flecha arriba
    } else if (evento.key === 'ArrowUp' && links.length > 0) {
        // Frenamos el comportamiento normal
        evento.preventDefault();
        // Subimos uno, pero sin pasar del primero (0)
        resultadoMarcado = Math.max(resultadoMarcado - 1, 0);
        // Actualizamos el resaltado
        resaltarResultado(links);
    // Enter, y siempre que haya uno marcado (>= 0)
    } else if (evento.key === 'Enter' && resultadoMarcado >= 0) {
        // Evitamos que Enter haga otra cosa
        evento.preventDefault();
        // click() simula que el usuario hizo clic en el link marcado
        links[resultadoMarcado].click();
    // Escape
    } else if (evento.key === 'Escape') {
        // Cerramos la lista
        ocultarResultados();
    }
}

/**
 * manejarClicResultado
 * Qué hace: reacciona cuando el usuario hace clic en un resultado. Si estamos en
 *   la encuesta, cambia de año sin recargar la página y baja a la categoría; si no,
 *   deja que el link funcione normal.
 * Qué recibe: evento (el clic).
 * Qué devuelve: nada.
 * Cuándo se llama: en cada clic dentro del contenedor de resultados.
 * Nota: switchYear está en js/encuesta.js y devuelve una Promise (por eso el .then).
 *
 * Paso a paso:
 *   1. Buscamos el link clickeado (el clic puede caer en el icono o el texto
 *      de adentro; closest sube hasta encontrar el <a>).
 *   2. Si no clickeó un resultado, salimos.
 *   3. Escondemos la lista.
 *   4. Si estamos en la encuesta, el link tiene año y switchYear existe: frenamos
 *      el link normal, cambiamos de año y cuando termina (.then) hacemos scroll
 *      suave al bloque de la categoría.
 */
function manejarClicResultado(evento) {
    // evento.target es lo que se clickeó; closest busca hacia arriba el <a.search-result> más cercano (o null)
    const link = evento.target.closest('a.search-result');
    // Si no hay link (clic en un lugar vacío)...
    if (!link) {
        // ...no hacemos nada
        return;
    }
    // Cerramos la lista de resultados
    ocultarResultados();

    // typeof ... === 'function' chequea que switchYear exista (viene de encuesta.js) para no romper en otras páginas
    if (estamosEnEncuesta && link.dataset.anio && typeof switchYear === 'function') {
        // Frenamos la navegación normal del link (que recargaría la página)
        evento.preventDefault();
        // dataset devuelve texto; Number lo convierte a número
        const anio = Number(link.dataset.anio);
        // El id del bloque al que hay que bajar
        const ancla = link.dataset.ancla;

        // .then ejecuta la función cuando la Promise de switchYear termina (o sea, cuando ya cambió el año)
        switchYear(anio).then(function () {
            // Si hay ancla, intentamos bajar a ese bloque
            if (ancla) {
                // querySelector devuelve el primer elemento que cumple el selector CSS: el id dentro del panel de ese año (# = id)
                const bloque = document.querySelector('#panel-' + anio + ' #' + ancla);
                // Si lo encontró...
                if (bloque) {
                    // ...hacemos scroll hasta él; 'smooth' lo hace con animación suave
                    bloque.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    }
}

// ───────────────── ABRIR / CERRAR EL BUSCADOR Y NAV ─────────────────

// Botón de la lupa que abre el buscador (puede ser null si la página no lo tiene)
const botonAbrirBuscador = document.getElementById('nav-search-toggle');
// Botón de cerrar el buscador
const botonCerrarBuscador = document.getElementById('search-close');
// Caja que contiene todo el buscador
const contenedorBuscador = document.getElementById('nav-search-container');
// Barra de navegación de arriba (querySelector con '.' busca por clase)
const barraNavegacion = document.querySelector('.top-nav');

/**
 * abrirBuscador
 * Qué hace: muestra el panel del buscador y pone el cursor en el input.
 * Qué recibe: evento (el clic en la lupa). Qué devuelve: nada.
 * Cuándo se llama: al hacer clic en el botón de abrir.
 */
function abrirBuscador(evento) {
    // No seguir el link (si el botón es un <a>)
    evento.preventDefault();
    // stopPropagation evita que el clic "suba" a otros elementos (por ejemplo al document, que cerraría los resultados)
    evento.stopPropagation();
    // Agregamos la clase 'active' y el panel aparece
    contenedorBuscador.classList.add('active');
    // setTimeout ejecuta la función después de N milisegundos (acá 120)
    setTimeout(function () {
        // focus() deja el cursor listo para escribir en el input
        inputBusqueda.focus();
    // 120 ms de espera
    }, 120);
}

/**
 * cerrarBuscador
 * Qué hace: esconde el panel del buscador. Qué recibe / devuelve: nada / nada.
 * Cuándo se llama: con el botón de cerrar o la tecla Escape.
 */
function cerrarBuscador() {
    // Le sacamos la clase 'active' y desaparece
    contenedorBuscador.classList.remove('active');
}

/**
 * actualizarBarraNavegacion
 * Qué hace: achica la barra de arriba cuando se baja más de 60px y la agranda
 *   cuando se vuelve arriba (cambiando la clase 'top-nav--scrolled').
 * Qué recibe / devuelve: nada / nada.
 * Cuándo se llama: cada vez que se hace scroll.
 */
function actualizarBarraNavegacion() {
    // window.scrollY = cuántos píxeles se bajó desde arriba de la página
    if (window.scrollY > 60) {
        // Bajó bastante: ponemos la clase de barra chica
        barraNavegacion.classList.add('top-nav--scrolled');
    } else {
        // Está cerca del tope: sacamos la clase
        barraNavegacion.classList.remove('top-nav--scrolled');
    }
}

// ───────────────── CONEXIÓN DE EVENTOS ─────────────────

// Solo conectamos todo esto si existen el input y el contenedor (no todas las páginas tienen buscador)
if (inputBusqueda && contenedorResultados) {
    // addEventListener("evento", función) = "cuando pase tal cosa, ejecutá esta función". 'input' pasa cada vez que cambia el texto
    inputBusqueda.addEventListener('input', mostrarResultados);
    // 'keydown' pasa al apretar una tecla
    inputBusqueda.addEventListener('keydown', manejarTeclasBusqueda);
    // Clic dentro de la lista de resultados
    contenedorResultados.addEventListener('click', manejarClicResultado);

    // Escuchamos clics en toda la página
    document.addEventListener('click', function (evento) {
        // Si el clic NO fue dentro del panel del buscador...
        if (!evento.target.closest('.search-panel')) {
            // ...escondemos los resultados
            ocultarResultados();
        }
    });

    // Arrancamos la carga del índice (async: sigue de fondo mientras la página anda)
    cargarIndiceBusqueda();
}

// Si existen el botón de abrir y el contenedor, conectamos el clic
if (botonAbrirBuscador && contenedorBuscador) {
    // Clic en la lupa -> abrirBuscador
    botonAbrirBuscador.addEventListener('click', abrirBuscador);
}

// Lo mismo para el botón de cerrar
if (botonCerrarBuscador && contenedorBuscador) {
    // Esta función se escribe ahí mismo porque solo se usa acá
    botonCerrarBuscador.addEventListener('click', function (evento) {
        // Evitamos la acción normal del botón
        evento.preventDefault();
        // Y que el clic suba a otros elementos
        evento.stopPropagation();
        // Cerramos el buscador
        cerrarBuscador();
    });
}

// Si existe el buscador, escuchamos el teclado en toda la página
if (contenedorBuscador) {
    // Cada tecla apretada en cualquier lado
    document.addEventListener('keydown', function (evento) {
        // Si fue Escape...
        if (evento.key === 'Escape') {
            // ...cerramos el buscador
            cerrarBuscador();
        }
    });
}

// Si existe la barra de navegación, la conectamos al scroll
if (barraNavegacion) {
    // 'scroll' pasa cada vez que se mueve la página; ejecuta actualizarBarraNavegacion
    window.addEventListener('scroll', actualizarBarraNavegacion);
}
