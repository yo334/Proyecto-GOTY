// ═══════════════════════════════════════════════════════════════════
//  PÁGINA DE GANADORES DE UN AÑO (años.html?y=2015)
//  Lee datos/AAAA.json y dibuja una sección por categoría
//  con una tarjeta por nominado. El ganador lleva la clase card--winner.
//  Usa PRIMER_ANIO, ULTIMO_ANIO e INFO_CATEGORIAS de search.js.
//  Esas tres son constantes globales definidas en js/search.js. Como años.html
//  carga search.js ANTES que este archivo, acá las podemos usar directo,
//  sin importarlas ni declararlas de nuevo.
//
//  RESUMEN DE CÓMO FUNCIONA TODO:
//   1. La página años.html viene casi vacía (solo el menú, el título y el pie).
//   2. Este archivo mira en la URL qué año se pidió (?y=2015).
//   3. Descarga datos/2015.json, que tiene todos los nominados de ese año.
//   4. Con esos datos crea las tarjetas con JavaScript y las mete en la página.
// ═══════════════════════════════════════════════════════════════════

// leerAnioDeLaUrl: busca en la URL qué año quiere ver la persona.
// No recibe nada. Devuelve un número (por ej. 2015).
// Se llama una sola vez, al principio de cargarPaginaDelAnio.
/**
 * Lee el año de la URL (años.html?y=2015).
 * Si falta o no es válido, usa el último año.
 */
function leerAnioDeLaUrl() {
    // URLSearchParams es una herramienta del navegador que sabe leer los parámetros de la URL.
    // window.location.search es la parte de la URL desde el "?" (por ej. "?y=2015").
    const parametros = new URLSearchParams(window.location.search);
    // parametros.get('y') devuelve el valor como TEXTO ("2015"), o null si no existe.
    // Number(...) lo convierte en número; si no se puede (null o "hola") da NaN o 0, que no pasan el if de abajo.
    const anio = Number(parametros.get('y'));
    // Si el año está entre el primero y el último que tenemos (2014 a 2025)...
    if (anio >= PRIMER_ANIO && anio <= ULTIMO_ANIO) {
        return anio; // ...es válido: devolvemos ese año
    }
    return ULTIMO_ANIO; // si no es válido (o no vino), mostramos el último año (2025)
}

// crearTarjeta: arma el cuadradito de UN juego (la portada y el nombre).
// Recibe un nominado, o sea un objeto del JSON con name, image e isWinner.
// Devuelve el div ya armado (todavía no está en la página: lo agrega quien la llama).
/**
 * Crea la tarjeta de un nominado.
 */
function crearTarjeta(nominado) {
    const tarjeta = document.createElement('div'); // creo un div vacío (una caja) en memoria
    tarjeta.className = 'candidate-card'; // le pongo la clase CSS que le da el diseño de tarjeta
    // si en el JSON este nominado figura como ganador (isWinner vale true)...
    if (nominado.isWinner) {
        // ...le sumo otra clase: es la que le pone el borde brillante y la etiqueta WINNER
        tarjeta.classList.add('card--winner');
    }

    const imagen = document.createElement('img'); // creo la etiqueta <img> de la portada
    imagen.className = 'candidate-card__image'; // clase CSS que le da el tamaño y el recorte a la imagen
    // En el JSON las portadas están como "../imagenes/...": acá queda "imagenes/..."
    // (el "../" sobra porque esta página está en la carpeta raíz, no adentro de otra carpeta)
    imagen.src = nominado.image.replace('../', ''); // .replace cambia el "../" por nada (texto vacío)
    imagen.alt = nominado.name; // texto alternativo: se lee si la imagen no carga y lo usan los lectores de pantalla

    const titulo = document.createElement('h3'); // creo el título (h3) con el nombre del juego
    titulo.className = 'candidate-card__title'; // clase CSS del título de la tarjeta
    // textContent pone el texto tal cual, como TEXTO PLANO (nunca lo interpreta como HTML, así es más seguro que innerHTML)
    titulo.textContent = nominado.name;

    tarjeta.appendChild(imagen); // meto la imagen adentro de la tarjeta (appendChild = "agregá esto al final")
    tarjeta.appendChild(titulo); // meto el título abajo de la imagen
    return tarjeta; // devuelvo la tarjeta terminada
}

// crearCategoria: arma el bloque de UNA categoría (el título más todas las tarjetas de sus nominados).
// Recibe el nombre de la categoría (ej. "Best Narrative") y la lista de sus nominados.
// Devuelve el bloque ya armado. Adentro usa crearTarjeta una vez por cada nominado.
/**
 * Crea el bloque de una categoría con su título y sus nominados.
 */
function crearCategoria(nombreCategoria, nominados) {
    const bloque = document.createElement('div'); // div grande que va a contener toda la categoría
    bloque.className = 'category-block'; // clase CSS del bloque
    // el id sirve de "ancla": permite que un link como años.html?y=2015#cat-narrative baje hasta acá.
    // INFO_CATEGORIAS viene de search.js: es un objeto que por cada categoría guarda su ancla, su nombre en español y su ícono.
    bloque.id = INFO_CATEGORIAS[nombreCategoria].ancla;  // ej. "cat-goty" (lo usa el buscador)

    const titulo = document.createElement('h2'); // título de la categoría
    titulo.className = 'category-title'; // clase CSS del título
    titulo.textContent = nombreCategoria; // le pongo el nombre (ej. "Best Narrative")
    bloque.appendChild(titulo); // lo meto en el bloque

    const grilla = document.createElement('div'); // div que acomoda las tarjetas en filas y columnas
    grilla.className = 'candidate-grid'; // clase CSS que la hace una grilla
    // "for...of" recorre la lista de nominados de a uno; en cada vuelta "nominado" es uno distinto
    for (const nominado of nominados) {
        grilla.appendChild(crearTarjeta(nominado)); // armo la tarjeta de ese juego y la agrego a la grilla
    }
    bloque.appendChild(grilla); // cuando terminó el for, meto la grilla (ya con todas las tarjetas) en el bloque
    return bloque; // devuelvo la categoría terminada
}

// cargarPaginaDelAnio: es la función principal de este archivo, la que hace todo el trabajo.
// No recibe nada ni devuelve nada. Se llama sola al final del archivo, apenas carga la página.
// Es "async" porque descarga un archivo (fetch) y tiene que esperar a que llegue sin congelar la página.
// FUNCIÓN COMPLEJA, paso a paso:
//   1. Averigua el año de la URL.
//   2. Pone ese año en el título de la pestaña, en el h1 y en los textos del banner y del pie.
//   3. Descarga datos/AAAA.json. Si falla, muestra un aviso y termina.
//   4. Crea una categoría por cada una del JSON y las agrega a la página.
//   5. Si la URL traía un ancla (#cat-...), baja hasta esa categoría.
/**
 * Carga el año de la URL y arma la página.
 */
async function cargarPaginaDelAnio() {
    const anio = leerAnioDeLaUrl(); // paso 1: averiguo qué año hay que mostrar

    // Textos que muestran el año
    document.title = 'GOTY ' + anio + ' – The Game Awards'; // cambio el título de la pestaña del navegador
    document.getElementById('anio-titulo').textContent = anio; // pongo el año grande en el título de la página (el <span id="anio-titulo">)
    // querySelectorAll busca TODOS los elementos con la clase "anio-actual" (están en el banner y en el pie)
    document.querySelectorAll('.anio-actual').forEach(function (elemento) {
        // forEach ejecuta esta funcioncita una vez por cada elemento encontrado
        elemento.textContent = anio; // en cada uno escribo el año
    });
    // el banner "Votá por tus ganadores" tiene que llevar a la encuesta de ESTE año
    document.getElementById('link-encuesta').href = 'encuesta.html?y=' + anio;

    const contenedor = document.getElementById('ganadores'); // la sección vacía donde vamos a meter las categorías
    let datos; // acá va a quedar guardado el contenido del JSON (uso let porque se le da valor adentro del try)
    // try/catch = "intentá esto, y si algo sale mal, no se rompa todo: andá al catch"
    try {
        // fetch pide el archivo al servidor; "await" espera a que llegue antes de seguir con la línea siguiente
        const respuesta = await fetch('datos/' + anio + '.json');
        // .json() convierte el texto del archivo en objetos de JavaScript que podemos recorrer (también hay que esperarlo)
        datos = await respuesta.json();
    } catch (error) {
        // si estamos acá, el archivo no se pudo descargar (por ejemplo, la página se abrió con doble clic sin servidor)
        const aviso = document.createElement('p'); // creo un párrafo para avisar
        aviso.className = 'category-title'; // reutilizo la clase del título de categoría para que se vea bien
        aviso.textContent = 'No se pudieron cargar los ganadores de ' + anio + '. Abrí el sitio con un servidor (Live Server o python backend/app.py).';
        contenedor.appendChild(aviso); // muestro el aviso en la página
        return; // "return" corta la función acá: no hay datos, así que no seguimos
    }

    // Una sección por categoría, en el orden del JSON
    // "for...in" recorre las CLAVES de un objeto: acá son los nombres de las categorías ("Game of the Year", etc.)
    for (const nombreCategoria in datos) {
        // datos[nombreCategoria] es la lista de nominados de esa categoría
        // armo el bloque de la categoría y lo agrego a la página
        contenedor.appendChild(crearCategoria(nombreCategoria, datos[nombreCategoria]));
    }

    // Si la URL trae un ancla (ej. #cat-narrative, desde el buscador),
    // ahora que la categoría existe bajamos hasta ella
    // (esto va DESPUÉS del for porque antes de armar las categorías no habría adónde bajar)
    // window.location.hash es la parte de la URL desde el "#" (vale "" si no hay)
    if (window.location.hash) {
        const destino = document.querySelector(window.location.hash); // busco en la página el elemento con ese id (ej. "#cat-narrative")
        if (destino) { // si lo encontré (puede no existir si el ancla está mal escrita)...
            destino.scrollIntoView(); // ...hago scroll hasta dejarlo a la vista
        }
    }
}

// Esta es la única línea que "arranca" todo: llama a la función principal apenas se carga el archivo.
// (El <script> está al final del HTML, así que los elementos de la página ya existen en este momento.)
cargarPaginaDelAnio();
