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
//  Este archivo provee las constantes compartidas y el buscador global.
// ═══════════════════════════════════════════════════════════════════

// ───────────────── DATOS COMPARTIDOS DEL SITIO ─────────────────

// PRIMER_ANIO: el primer año que tiene datos el sitio (2014).
const PRIMER_ANIO = 2014;
// ULTIMO_ANIO: el último año con datos (2025).
const ULTIMO_ANIO = 2025;

// INFO_CATEGORIAS: información y anclas de las 7 categorías oficiales.
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

// Determinamos si estamos adentro de una subcarpeta (Años/ o Encuestas/) para adaptar los enlaces
const pathNormalizado = decodeURIComponent(window.location.pathname || '').replace(/\\/g, '/').toLowerCase();
const enAnios = pathNormalizado.includes('/años/') || pathNormalizado.includes('/a\u00f1os/');
const enEncuestas = pathNormalizado.includes('/encuestas/');
const enSubcarpeta = enAnios || enEncuestas;

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
    // Link a la página del año. Ej: Años/2020.html
    const paginaAnio = 'Años/' + anio + '.html';
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
        // Link directo al bloque de la categoría. Ej: Años/2020.html#cat-goty (el # salta a ese id)
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
    agregarEntrada('Encuesta GOTY ' + anio + ' — Votar nominados', 'Encuestas/' + anio + '.html', '🗳️',
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
const FALLBACK_DATOS = {"2014": {"Game of the Year": [{"name": "Dragon Age: Inquisition", "isWinner": true}, {"name": "Bayonetta 2", "isWinner": false}, {"name": "Dark Souls II", "isWinner": false}, {"name": "Hearthstone", "isWinner": false}, {"name": "Middle-earth: Shadow of Mordor", "isWinner": false}], "Best Independent Game": [{"name": "Shovel Knight", "isWinner": true}, {"name": "Broken Age Part 1", "isWinner": false}, {"name": "Monument Valley", "isWinner": false}, {"name": "Transistor", "isWinner": false}, {"name": "The Vanishing of Ethan Carter", "isWinner": false}], "Best Narrative": [{"name": "Valiant Hearts: The Great War", "isWinner": true}, {"name": "South Park: The Stick of Truth", "isWinner": false}, {"name": "The Walking Dead: Season Two", "isWinner": false}, {"name": "The Wolf Among Us", "isWinner": false}, {"name": "Wolfenstein: The New Order", "isWinner": false}], "Best Art Direction": [{"name": "Monument Valley", "isWinner": true}, {"name": "Assassin's Creed Unity", "isWinner": false}, {"name": "Child of Light", "isWinner": false}, {"name": "Destiny", "isWinner": false}, {"name": "Sunset Overdrive", "isWinner": false}], "Best Soundtrack": [{"name": "Destiny", "isWinner": true}, {"name": "Alien: Isolation", "isWinner": false}, {"name": "Child of Light", "isWinner": false}, {"name": "Sunset Overdrive", "isWinner": false}, {"name": "Transistor", "isWinner": false}], "Best Multiplayer": [{"name": "Destiny", "isWinner": true}, {"name": "Call of Duty: Advanced Warfare", "isWinner": false}, {"name": "Dark Souls II", "isWinner": false}, {"name": "Hearthstone", "isWinner": false}, {"name": "Titanfall", "isWinner": false}], "Best Game Direction": [{"name": "Nintendo", "isWinner": true}, {"name": "Blizzard Entertainment", "isWinner": false}, {"name": "Monolith Productions", "isWinner": false}, {"name": "Telltale Games", "isWinner": false}, {"name": "Ubisoft Montreal", "isWinner": false}]}, "2015": {"Game of the Year": [{"name": "The Witcher 3: Wild Hunt", "isWinner": true}, {"name": "Bloodborne", "isWinner": false}, {"name": "Fallout 4", "isWinner": false}, {"name": "Metal Gear Solid V: The Phantom Pain", "isWinner": false}, {"name": "Super Mario Maker", "isWinner": false}], "Best Independent Game": [{"name": "Rocket League", "isWinner": true}, {"name": "Axiom Verge", "isWinner": false}, {"name": "Her Story", "isWinner": false}, {"name": "Ori and the Blind Forest", "isWinner": false}, {"name": "Undertale", "isWinner": false}], "Best Narrative": [{"name": "Her Story", "isWinner": true}, {"name": "Life Is Strange", "isWinner": false}, {"name": "Tales from the Borderlands", "isWinner": false}, {"name": "The Witcher 3: Wild Hunt", "isWinner": false}, {"name": "Until Dawn", "isWinner": false}], "Best Art Direction": [{"name": "Ori and the Blind Forest", "isWinner": true}, {"name": "Batman: Arkham Knight", "isWinner": false}, {"name": "Bloodborne", "isWinner": false}, {"name": "Metal Gear Solid V: The Phantom Pain", "isWinner": false}, {"name": "The Witcher 3: Wild Hunt", "isWinner": false}], "Best Soundtrack": [{"name": "Metal Gear Solid V: The Phantom Pain", "isWinner": true}, {"name": "Fallout 4", "isWinner": false}, {"name": "Halo 5: Guardians", "isWinner": false}, {"name": "Ori and the Blind Forest", "isWinner": false}, {"name": "The Witcher 3: Wild Hunt", "isWinner": false}], "Best Multiplayer": [{"name": "Splatoon", "isWinner": true}, {"name": "Call of Duty: Black Ops III", "isWinner": false}, {"name": "Destiny: The Taken King", "isWinner": false}, {"name": "Halo 5: Guardians", "isWinner": false}, {"name": "Rocket League", "isWinner": false}], "Best Game Direction": [{"name": "CD Projekt Red", "isWinner": true}, {"name": "Bethesda Game Studios", "isWinner": false}, {"name": "FromSoftware", "isWinner": false}, {"name": "Kojima Productions", "isWinner": false}, {"name": "Nintendo", "isWinner": false}]}, "2016": {"Game of the Year": [{"name": "Overwatch", "isWinner": true}, {"name": "Doom", "isWinner": false}, {"name": "Inside", "isWinner": false}, {"name": "Titanfall 2", "isWinner": false}, {"name": "Uncharted 4: A Thief's End", "isWinner": false}], "Best Independent Game": [{"name": "Inside", "isWinner": true}, {"name": "Firewatch", "isWinner": false}, {"name": "Hyper Light Drifter", "isWinner": false}, {"name": "Stardew Valley", "isWinner": false}, {"name": "The Witness", "isWinner": false}], "Best Narrative": [{"name": "Uncharted 4: A Thief's End", "isWinner": true}, {"name": "Firewatch", "isWinner": false}, {"name": "Inside", "isWinner": false}, {"name": "Mafia III", "isWinner": false}, {"name": "Oxenfree", "isWinner": false}], "Best Art Direction": [{"name": "Inside", "isWinner": true}, {"name": "Abzû", "isWinner": false}, {"name": "Firewatch", "isWinner": false}, {"name": "Overwatch", "isWinner": false}, {"name": "Uncharted 4: A Thief's End", "isWinner": false}], "Best Soundtrack": [{"name": "Doom", "isWinner": true}, {"name": "Battlefield 1", "isWinner": false}, {"name": "Inside", "isWinner": false}, {"name": "Rez Infinite", "isWinner": false}, {"name": "Thumper", "isWinner": false}], "Best Multiplayer": [{"name": "Overwatch", "isWinner": true}, {"name": "Battlefield 1", "isWinner": false}, {"name": "Gears of War 4", "isWinner": false}, {"name": "Titanfall 2", "isWinner": false}, {"name": "Tom Clancy's Rainbow Six Siege", "isWinner": false}], "Best Game Direction": [{"name": "Blizzard Entertainment", "isWinner": true}, {"name": "DICE", "isWinner": false}, {"name": "id Software", "isWinner": false}, {"name": "Naughty Dog", "isWinner": false}, {"name": "Respawn Entertainment", "isWinner": false}]}, "2017": {"Game of the Year": [{"name": "The Legend of Zelda: Breath of the Wild", "isWinner": true}, {"name": "Horizon Zero Dawn", "isWinner": false}, {"name": "Persona 5", "isWinner": false}, {"name": "PlayerUnknown's Battlegrounds", "isWinner": false}, {"name": "Super Mario Odyssey", "isWinner": false}], "Best Independent Game": [{"name": "Cuphead", "isWinner": true}, {"name": "Hellblade: Senua's Sacrifice", "isWinner": false}, {"name": "Night in the Woods", "isWinner": false}, {"name": "Pyre", "isWinner": false}, {"name": "What Remains of Edith Finch", "isWinner": false}], "Best Narrative": [{"name": "What Remains of Edith Finch", "isWinner": true}, {"name": "Hellblade: Senua's Sacrifice", "isWinner": false}, {"name": "Horizon Zero Dawn", "isWinner": false}, {"name": "NieR: Automata", "isWinner": false}, {"name": "Wolfenstein II: The New Colossus", "isWinner": false}], "Best Art Direction": [{"name": "Cuphead", "isWinner": true}, {"name": "Destiny 2", "isWinner": false}, {"name": "Horizon Zero Dawn", "isWinner": false}, {"name": "Persona 5", "isWinner": false}, {"name": "The Legend of Zelda: Breath of the Wild", "isWinner": false}], "Best Soundtrack": [{"name": "NieR: Automata", "isWinner": true}, {"name": "Cuphead", "isWinner": false}, {"name": "Destiny 2", "isWinner": false}, {"name": "Persona 5", "isWinner": false}, {"name": "Super Mario Odyssey", "isWinner": false}, {"name": "The Legend of Zelda: Breath of the Wild", "isWinner": false}], "Best Multiplayer": [{"name": "PlayerUnknown's Battlegrounds", "isWinner": true}, {"name": "Call of Duty: WWII", "isWinner": false}, {"name": "Destiny 2", "isWinner": false}, {"name": "Fortnite", "isWinner": false}, {"name": "Mario Kart 8 Deluxe", "isWinner": false}, {"name": "Splatoon 2", "isWinner": false}], "Best Game Direction": [{"name": "The Legend of Zelda: Breath of the Wild", "isWinner": true}, {"name": "Horizon Zero Dawn", "isWinner": false}, {"name": "Resident Evil 7: Biohazard", "isWinner": false}, {"name": "Super Mario Odyssey", "isWinner": false}, {"name": "Wolfenstein II: The New Colossus", "isWinner": false}]}, "2018": {"Game of the Year": [{"name": "God of War", "isWinner": true}, {"name": "Assassin's Creed Odyssey", "isWinner": false}, {"name": "Celeste", "isWinner": false}, {"name": "Marvel's Spider-Man", "isWinner": false}, {"name": "Monster Hunter: World", "isWinner": false}, {"name": "Red Dead Redemption 2", "isWinner": false}], "Best Independent Game": [{"name": "Celeste", "isWinner": true}, {"name": "Dead Cells", "isWinner": false}, {"name": "Into the Breach", "isWinner": false}, {"name": "Return of the Obra Dinn", "isWinner": false}, {"name": "The Messenger", "isWinner": false}], "Best Narrative": [{"name": "Red Dead Redemption 2", "isWinner": true}, {"name": "Detroit: Become Human", "isWinner": false}, {"name": "God of War", "isWinner": false}, {"name": "Life Is Strange 2: Episode 1", "isWinner": false}, {"name": "Marvel's Spider-Man", "isWinner": false}], "Best Art Direction": [{"name": "Return of the Obra Dinn", "isWinner": true}, {"name": "Assassin's Creed Odyssey", "isWinner": false}, {"name": "God of War", "isWinner": false}, {"name": "Octopath Traveler", "isWinner": false}, {"name": "Red Dead Redemption 2", "isWinner": false}], "Best Soundtrack": [{"name": "Red Dead Redemption 2", "isWinner": true}, {"name": "Celeste", "isWinner": false}, {"name": "God of War", "isWinner": false}, {"name": "Marvel's Spider-Man", "isWinner": false}, {"name": "Ni no Kuni II: Revenant Kingdom", "isWinner": false}, {"name": "Octopath Traveler", "isWinner": false}], "Best Multiplayer": [{"name": "Fortnite", "isWinner": true}, {"name": "Call of Duty: Black Ops 4", "isWinner": false}, {"name": "Destiny 2: Forsaken", "isWinner": false}, {"name": "Monster Hunter: World", "isWinner": false}, {"name": "Sea of Thieves", "isWinner": false}], "Best Game Direction": [{"name": "God of War", "isWinner": true}, {"name": "A Way Out", "isWinner": false}, {"name": "Detroit: Become Human", "isWinner": false}, {"name": "Marvel's Spider-Man", "isWinner": false}, {"name": "Red Dead Redemption 2", "isWinner": false}]}, "2019": {"Game of the Year": [{"name": "Sekiro: Shadows Die Twice", "isWinner": true}, {"name": "Control", "isWinner": false}, {"name": "Death Stranding", "isWinner": false}, {"name": "Resident Evil 2", "isWinner": false}, {"name": "Super Smash Bros. Ultimate", "isWinner": false}, {"name": "The Outer Worlds", "isWinner": false}], "Best Independent Game": [{"name": "Disco Elysium", "isWinner": true}, {"name": "Baba Is You", "isWinner": false}, {"name": "Katana Zero", "isWinner": false}, {"name": "Outer Wilds", "isWinner": false}, {"name": "Untitled Goose Game", "isWinner": false}], "Best Narrative": [{"name": "Disco Elysium", "isWinner": true}, {"name": "A Plague Tale: Innocence", "isWinner": false}, {"name": "Control", "isWinner": false}, {"name": "Death Stranding", "isWinner": false}, {"name": "The Outer Worlds", "isWinner": false}], "Best Art Direction": [{"name": "Control", "isWinner": true}, {"name": "Death Stranding", "isWinner": false}, {"name": "Gris", "isWinner": false}, {"name": "Sayonara Wild Hearts", "isWinner": false}, {"name": "Sekiro: Shadows Die Twice", "isWinner": false}, {"name": "The Legend of Zelda: Link's Awakening", "isWinner": false}], "Best Soundtrack": [{"name": "Death Stranding", "isWinner": true}, {"name": "Cadence of Hyrule", "isWinner": false}, {"name": "Devil May Cry 5", "isWinner": false}, {"name": "Kingdom Hearts III", "isWinner": false}, {"name": "Sayonara Wild Hearts", "isWinner": false}], "Best Multiplayer": [{"name": "Apex Legends", "isWinner": true}, {"name": "Borderlands 3", "isWinner": false}, {"name": "Call of Duty: Modern Warfare", "isWinner": false}, {"name": "Tetris 99", "isWinner": false}, {"name": "Tom Clancy's The Division 2", "isWinner": false}], "Best Game Direction": [{"name": "Death Stranding", "isWinner": true}, {"name": "Control", "isWinner": false}, {"name": "Resident Evil 2", "isWinner": false}, {"name": "Sekiro: Shadows Die Twice", "isWinner": false}, {"name": "Outer Wilds", "isWinner": false}]}, "2020": {"Game of the Year": [{"name": "The Last of Us Part II", "isWinner": true}, {"name": "Animal Crossing: New Horizons", "isWinner": false}, {"name": "Doom Eternal", "isWinner": false}, {"name": "Final Fantasy VII Remake", "isWinner": false}, {"name": "Ghost of Tsushima", "isWinner": false}, {"name": "Hades", "isWinner": false}], "Best Independent Game": [{"name": "Hades", "isWinner": true}, {"name": "Carrion", "isWinner": false}, {"name": "Fall Guys: Ultimate Knockout", "isWinner": false}, {"name": "Spelunky 2", "isWinner": false}, {"name": "Spiritfarer", "isWinner": false}], "Best Narrative": [{"name": "The Last of Us Part II", "isWinner": true}, {"name": "13 Sentinels: Aegis Rim", "isWinner": false}, {"name": "Final Fantasy VII Remake", "isWinner": false}, {"name": "Ghost of Tsushima", "isWinner": false}, {"name": "Hades", "isWinner": false}], "Best Art Direction": [{"name": "Ghost of Tsushima", "isWinner": true}, {"name": "Final Fantasy VII Remake", "isWinner": false}, {"name": "Hades", "isWinner": false}, {"name": "Ori and the Will of the Wisps", "isWinner": false}, {"name": "The Last of Us Part II", "isWinner": false}], "Best Soundtrack": [{"name": "Final Fantasy VII Remake", "isWinner": true}, {"name": "Doom Eternal", "isWinner": false}, {"name": "Hades", "isWinner": false}, {"name": "Ori and the Will of the Wisps", "isWinner": false}, {"name": "The Last of Us Part II", "isWinner": false}], "Best Multiplayer": [{"name": "Among Us", "isWinner": true}, {"name": "Animal Crossing: New Horizons", "isWinner": false}, {"name": "Call of Duty: Warzone", "isWinner": false}, {"name": "Fall Guys: Ultimate Knockout", "isWinner": false}, {"name": "Valorant", "isWinner": false}], "Best Game Direction": [{"name": "The Last of Us Part II", "isWinner": true}, {"name": "Final Fantasy VII Remake", "isWinner": false}, {"name": "Ghost of Tsushima", "isWinner": false}, {"name": "Hades", "isWinner": false}, {"name": "Half-Life: Alyx", "isWinner": false}]}, "2021": {"Game of the Year": [{"name": "It Takes Two", "isWinner": true}, {"name": "Deathloop", "isWinner": false}, {"name": "Metroid Dread", "isWinner": false}, {"name": "Psychonauts 2", "isWinner": false}, {"name": "Ratchet & Clank: Rift Apart", "isWinner": false}, {"name": "Resident Evil Village", "isWinner": false}], "Best Independent Game": [{"name": "Kena: Bridge of Spirits", "isWinner": true}, {"name": "12 Minutes", "isWinner": false}, {"name": "Death's Door", "isWinner": false}, {"name": "Inscryption", "isWinner": false}, {"name": "Loop Hero", "isWinner": false}], "Best Narrative": [{"name": "Marvel's Guardians of the Galaxy", "isWinner": true}, {"name": "Deathloop", "isWinner": false}, {"name": "It Takes Two", "isWinner": false}, {"name": "Life is Strange: True Colors", "isWinner": false}, {"name": "Psychonauts 2", "isWinner": false}], "Best Art Direction": [{"name": "Deathloop", "isWinner": true}, {"name": "Kena: Bridge of Spirits", "isWinner": false}, {"name": "Psychonauts 2", "isWinner": false}, {"name": "Ratchet & Clank: Rift Apart", "isWinner": false}, {"name": "The Artful Escape", "isWinner": false}], "Best Soundtrack": [{"name": "NieR Replicant ver.1.22474487139...", "isWinner": true}, {"name": "Cyberpunk 2077", "isWinner": false}, {"name": "Deathloop", "isWinner": false}, {"name": "Marvel's Guardians of the Galaxy", "isWinner": false}, {"name": "The Artful Escape", "isWinner": false}], "Best Multiplayer": [{"name": "It Takes Two", "isWinner": true}, {"name": "Back 4 Blood", "isWinner": false}, {"name": "Knockout City", "isWinner": false}, {"name": "Monster Hunter Rise", "isWinner": false}, {"name": "New World", "isWinner": false}, {"name": "Valheim", "isWinner": false}], "Best Game Direction": [{"name": "Deathloop", "isWinner": true}, {"name": "It Takes Two", "isWinner": false}, {"name": "Returnal", "isWinner": false}, {"name": "Psychonauts 2", "isWinner": false}, {"name": "Ratchet & Clank: Rift Apart", "isWinner": false}]}, "2022": {"Game of the Year": [{"name": "Elden Ring", "isWinner": true}, {"name": "A Plague Tale: Requiem", "isWinner": false}, {"name": "God of War Ragnarök", "isWinner": false}, {"name": "Horizon Forbidden West", "isWinner": false}, {"name": "Stray", "isWinner": false}, {"name": "Xenoblade Chronicles 3", "isWinner": false}], "Best Independent Game": [{"name": "Stray", "isWinner": true}, {"name": "Cult of the Lamb", "isWinner": false}, {"name": "Neon White", "isWinner": false}, {"name": "Sifu", "isWinner": false}, {"name": "Tunic", "isWinner": false}], "Best Narrative": [{"name": "God of War Ragnarök", "isWinner": true}, {"name": "A Plague Tale: Requiem", "isWinner": false}, {"name": "Elden Ring", "isWinner": false}, {"name": "Horizon Forbidden West", "isWinner": false}, {"name": "Immortality", "isWinner": false}], "Best Art Direction": [{"name": "Elden Ring", "isWinner": true}, {"name": "God of War Ragnarök", "isWinner": false}, {"name": "Horizon Forbidden West", "isWinner": false}, {"name": "Scorn", "isWinner": false}, {"name": "Stray", "isWinner": false}], "Best Soundtrack": [{"name": "God of War Ragnarök", "isWinner": true}, {"name": "A Plague Tale: Requiem", "isWinner": false}, {"name": "Elden Ring", "isWinner": false}, {"name": "Metal: Hellsinger", "isWinner": false}, {"name": "Xenoblade Chronicles 3", "isWinner": false}], "Best Multiplayer": [{"name": "Splatoon 3", "isWinner": true}, {"name": "Call of Duty: Modern Warfare II", "isWinner": false}, {"name": "MultiVersus", "isWinner": false}, {"name": "Overwatch 2", "isWinner": false}, {"name": "Teenage Mutant Ninja Turtles: Shredder's Revenge", "isWinner": false}], "Best Game Direction": [{"name": "Elden Ring", "isWinner": true}, {"name": "God of War Ragnarök", "isWinner": false}, {"name": "Horizon Forbidden West", "isWinner": false}, {"name": "Immortality", "isWinner": false}, {"name": "Stray", "isWinner": false}]}, "2023": {"Game of the Year": [{"name": "Baldur's Gate 3", "isWinner": true}, {"name": "Alan Wake 2", "isWinner": false}, {"name": "Marvel's Spider-Man 2", "isWinner": false}, {"name": "Resident Evil 4", "isWinner": false}, {"name": "Super Mario Bros. Wonder", "isWinner": false}, {"name": "The Legend of Zelda: Tears of the Kingdom", "isWinner": false}], "Best Independent Game": [{"name": "Sea of Stars", "isWinner": true}, {"name": "Cocoon", "isWinner": false}, {"name": "Dave the Diver", "isWinner": false}, {"name": "Dredge", "isWinner": false}, {"name": "Viewfinder", "isWinner": false}], "Best Narrative": [{"name": "Alan Wake 2", "isWinner": true}, {"name": "Baldur's Gate 3", "isWinner": false}, {"name": "Cyberpunk 2077: Phantom Liberty", "isWinner": false}, {"name": "Final Fantasy XVI", "isWinner": false}, {"name": "Marvel's Spider-Man 2", "isWinner": false}], "Best Art Direction": [{"name": "Alan Wake 2", "isWinner": true}, {"name": "Hi-Fi Rush", "isWinner": false}, {"name": "Lies of P", "isWinner": false}, {"name": "Super Mario Bros. Wonder", "isWinner": false}, {"name": "The Legend of Zelda: Tears of the Kingdom", "isWinner": false}], "Best Soundtrack": [{"name": "Final Fantasy XVI", "isWinner": true}, {"name": "Alan Wake 2", "isWinner": false}, {"name": "Baldur's Gate 3", "isWinner": false}, {"name": "Hi-Fi Rush", "isWinner": false}, {"name": "The Legend of Zelda: Tears of the Kingdom", "isWinner": false}], "Best Multiplayer": [{"name": "Baldur's Gate 3", "isWinner": true}, {"name": "Diablo IV", "isWinner": false}, {"name": "Party Animals", "isWinner": false}, {"name": "Street Fighter 6", "isWinner": false}, {"name": "Super Mario Bros. Wonder", "isWinner": false}], "Best Game Direction": [{"name": "Alan Wake 2", "isWinner": true}, {"name": "Baldur's Gate 3", "isWinner": false}, {"name": "Marvel's Spider-Man 2", "isWinner": false}, {"name": "Super Mario Bros. Wonder", "isWinner": false}, {"name": "The Legend of Zelda: Tears of the Kingdom", "isWinner": false}]}, "2024": {"Game of the Year": [{"name": "Astro Bot", "isWinner": true}, {"name": "Balatro", "isWinner": false}, {"name": "Black Myth: Wukong", "isWinner": false}, {"name": "Elden Ring Shadow of the Erdtree", "isWinner": false}, {"name": "Final Fantasy VII Rebirth", "isWinner": false}, {"name": "Metaphor: ReFantazio", "isWinner": false}], "Best Independent Game": [{"name": "Balatro", "isWinner": true}, {"name": "Animal Well", "isWinner": false}, {"name": "Lorelei and the Laser Eyes", "isWinner": false}, {"name": "Neva", "isWinner": false}, {"name": "UFO 50", "isWinner": false}], "Best Narrative": [{"name": "Metaphor: ReFantazio", "isWinner": true}, {"name": "Final Fantasy VII Rebirth", "isWinner": false}, {"name": "Like a Dragon: Infinite Wealth", "isWinner": false}, {"name": "Senua's Saga: Hellblade II", "isWinner": false}, {"name": "Silent Hill 2", "isWinner": false}], "Best Art Direction": [{"name": "Metaphor: ReFantazio", "isWinner": true}, {"name": "Astro Bot", "isWinner": false}, {"name": "Black Myth: Wukong", "isWinner": false}, {"name": "Neva", "isWinner": false}, {"name": "Senua's Saga: Hellblade II", "isWinner": false}], "Best Soundtrack": [{"name": "Final Fantasy VII Rebirth", "isWinner": true}, {"name": "Astro Bot", "isWinner": false}, {"name": "Metaphor: ReFantazio", "isWinner": false}, {"name": "Silent Hill 2", "isWinner": false}, {"name": "Stellar Blade", "isWinner": false}], "Best Multiplayer": [{"name": "Helldivers 2", "isWinner": true}, {"name": "Call of Duty: Black Ops 6", "isWinner": false}, {"name": "Super Mario Party Jamboree", "isWinner": false}, {"name": "Tekken 8", "isWinner": false}, {"name": "Warhammer 40,000: Space Marine 2", "isWinner": false}], "Best Game Direction": [{"name": "Astro Bot", "isWinner": true}, {"name": "Balatro", "isWinner": false}, {"name": "Black Myth: Wukong", "isWinner": false}, {"name": "Elden Ring Shadow of the Erdtree", "isWinner": false}, {"name": "Final Fantasy VII Rebirth", "isWinner": false}, {"name": "Metaphor: ReFantazio", "isWinner": false}]}, "2025": {"Game of the Year": [{"name": "Clair Obscur: Expedition 33", "isWinner": true}, {"name": "Death Stranding 2: On the Beach", "isWinner": false}, {"name": "Donkey Kong Bananza", "isWinner": false}, {"name": "Hades II", "isWinner": false}, {"name": "Hollow Knight: Silksong", "isWinner": false}, {"name": "Kingdom Come: Deliverance II", "isWinner": false}], "Best Independent Game": [{"name": "Clair Obscur: Expedition 33", "isWinner": true}, {"name": "Absolum", "isWinner": false}, {"name": "Ball x Pit", "isWinner": false}, {"name": "Blue Prince", "isWinner": false}, {"name": "Hades II", "isWinner": false}, {"name": "Hollow Knight: Silksong", "isWinner": false}], "Best Narrative": [{"name": "Clair Obscur: Expedition 33", "isWinner": true}, {"name": "Death Stranding 2: On the Beach", "isWinner": false}, {"name": "Ghost of Yōtei", "isWinner": false}, {"name": "Kingdom Come: Deliverance II", "isWinner": false}, {"name": "Silent Hill f", "isWinner": false}], "Best Art Direction": [{"name": "Clair Obscur: Expedition 33", "isWinner": true}, {"name": "Death Stranding 2: On the Beach", "isWinner": false}, {"name": "Ghost of Yōtei", "isWinner": false}, {"name": "Hades II", "isWinner": false}, {"name": "Hollow Knight: Silksong", "isWinner": false}], "Best Soundtrack": [{"name": "Clair Obscur: Expedition 33", "isWinner": true}, {"name": "Death Stranding 2: On the Beach", "isWinner": false}, {"name": "Ghost of Yōtei", "isWinner": false}, {"name": "Hades II", "isWinner": false}, {"name": "Hollow Knight: Silksong", "isWinner": false}], "Best Multiplayer": [{"name": "Arc Raiders", "isWinner": true}, {"name": "Battlefield 6", "isWinner": false}, {"name": "Elden Ring: Nightreign", "isWinner": false}, {"name": "Peak", "isWinner": false}, {"name": "Split Fiction", "isWinner": false}], "Best Game Direction": [{"name": "Clair Obscur: Expedition 33", "isWinner": true}, {"name": "Death Stranding 2: On the Beach", "isWinner": false}, {"name": "Ghost of Yōtei", "isWinner": false}, {"name": "Hades II", "isWinner": false}, {"name": "Split Fiction", "isWinner": false}]}};

async function cargarIndiceBusqueda() {
    // Entrada fija: el portal para elegir qué encuesta votar
    agregarEntrada('Seleccionar Año de Encuesta', 'seleccionar_encuesta.html', '🗳️',
        'seleccionar elegir todas las encuestas portal votar', null, '');

    const prefijo = enSubcarpeta ? '../' : '';

    // Si estamos abriendo directamente por file:// (sin servidor), usamos los datos de respaldo directamente para evitar bloqueos CORS
    if (window.location.protocol === 'file:') {
        for (let anio = PRIMER_ANIO; anio <= ULTIMO_ANIO; anio++) {
            if (typeof FALLBACK_DATOS !== 'undefined' && FALLBACK_DATOS[anio]) {
                agregarEntradasDelAnio(anio, FALLBACK_DATOS[anio]);
            }
        }
    } else {
        // Carga en paralelo de todos los años para máxima velocidad
        const promesas = [];
        for (let anio = PRIMER_ANIO; anio <= ULTIMO_ANIO; anio++) {
            const p = fetch(prefijo + 'datos/' + anio + '.json')
                .then(function (res) {
                    if (!res.ok) throw new Error('HTTP ' + res.status);
                    return res.json();
                })
                .then(function (datos) {
                    agregarEntradasDelAnio(anio, datos);
                })
                .catch(function (error) {
                    if (typeof FALLBACK_DATOS !== 'undefined' && FALLBACK_DATOS[anio]) {
                        agregarEntradasDelAnio(anio, FALLBACK_DATOS[anio]);
                    } else {
                        console.warn('[Buscador] No se pudo cargar /datos/' + anio + '.json', error);
                    }
                });
            promesas.push(p);
        }
        await Promise.all(promesas);
    }

    // Si ya existe el input y tiene algo escrito, redibujamos los resultados
    if (inputBusqueda && inputBusqueda.value) {
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
    let url = entrada.url;
    // Si no estamos en una subcarpeta (estamos en index o seleccionar_encuesta), la URL va tal cual
    if (!enSubcarpeta) {
        return url;
    }
    // Si estamos en una subcarpeta (Años/ o Encuestas/), adaptamos según corresponda
    if (url.startsWith('Años/')) {
        return enAnios ? url.replace('Años/', '') : '../' + url;
    }
    if (url.startsWith('Encuestas/')) {
        return enEncuestas ? url.replace('Encuestas/', '') : '../' + url;
    }
    return '../' + url;
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
    // Cerramos la lista de resultados y el panel del buscador
    ocultarResultados();
    cerrarBuscador();

    // Si el link apunta a un ancla dentro de la misma página, hacemos scroll suave
    const href = link.getAttribute('href');
    if (href && href.includes('#')) {
        const hash = href.substring(href.indexOf('#'));
        const rutaSinHash = href.substring(0, href.indexOf('#'));
        const archivoActual = (pathNormalizado.split('/').pop() || '').toLowerCase();
        const archivoDestino = (rutaSinHash.split('/').pop() || '').toLowerCase();

        // Si el link apunta a esta misma página o solo al ancla
        if (!rutaSinHash || archivoDestino === archivoActual) {
            evento.preventDefault();
            const bloque = document.querySelector(hash);
            if (bloque) {
                bloque.scrollIntoView({ behavior: 'smooth' });
                if (window.history && window.history.pushState) {
                    window.history.pushState(null, '', hash);
                } else {
                    window.location.hash = hash;
                }
            }
        }
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
