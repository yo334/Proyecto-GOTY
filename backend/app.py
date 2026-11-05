#!/usr/bin/env python3
"""
Servidor del Proyecto GOTY hecho con Flask.

Hace dos cosas:
1. Sirve los archivos del sitio (index.html, Años/, Encuestas/, Css/, js/, imagenes/, datos/).
2. Guarda los votos de la encuesta en datos/votos_encuestas.json.

Las páginas se ven también con Live Server; Flask solo hace falta para votar.

Para iniciarlo:  python backend/app.py   (puerto 5000, o el de la variable PORT)
"""

# ═══════════════════════════════════════════════════════════════════
#  COSAS QUE IMPORTAMOS
#  "import" = traer código ya hecho (de Python o de librerías) para usarlo acá.
# ═══════════════════════════════════════════════════════════════════

import csv  # sirve para escribir archivos CSV (tablas separadas por comas) sin armar las comas a mano
import io  # nos da un "archivo falso" en memoria (StringIO), así armamos el CSV sin crear un archivo real
import json  # sirve para leer y escribir archivos .json (el formato en el que guardamos los datos)
import os  # sirve para trabajar con rutas de carpetas y archivos (unirlas, ver si existen, renombrar)
import posixpath  # igual que os.path pero siempre con "/" (las URLs usan "/" aunque estemos en Windows)
import threading  # nos da el "candado" (Lock) para que dos personas no escriban a la vez
from datetime import datetime  # sirve para saber la fecha y hora actual (para anotar cuándo se votó)

# Flask es la librería que hace de servidor web. De ella traemos:
#   Flask    = la clase principal (el servidor en sí)
#   Response = para armar una respuesta a mano (la usamos para el CSV)
#   abort    = para cortar el pedido con un error (por ejemplo 404 "no encontrado")
#   jsonify  = convierte un diccionario de Python en una respuesta JSON
#   request  = el pedido que mandó el navegador (su URL, su contenido, etc.)
from flask import Flask, Response, abort, jsonify, request

# ═══════════════════════════════════════════════════════════════════
#  CONFIGURACIÓN (valores que se usan en todo el archivo)
#  Las variables en MAYÚSCULAS son "constantes": se definen una vez y no se cambian.
# ═══════════════════════════════════════════════════════════════════

# Carpeta raíz del proyecto (un nivel arriba de backend/)
# __file__ es la ruta de este archivo (app.py); dirname saca la carpeta (backend);
# el ".." sube un nivel (Proyecto_GOTY); abspath arma la ruta completa sin "..".
CARPETA_RAIZ = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))

# Años que tienen página y encuesta
# range(2014, 2026) da 2014, 2015, ..., 2025 (el último número, 2026, NO entra)
# y list(...) lo convierte en una lista normal.
ANIOS_VALIDOS = list(range(2014, 2026))

# Las 7 categorías oficiales, en el orden en que se exportan al CSV
# Tienen que estar escritas EXACTAMENTE igual que en los archivos datos/AAAA.json.
CATEGORIAS_OFICIALES = [
    "Game of the Year",
    "Best Independent Game",
    "Best Narrative",
    "Best Art Direction",
    "Best Soundtrack",
    "Best Multiplayer",
    "Best Game Direction",
]

# Lo único que se publica del proyecto: las páginas y las carpetas del sitio.
# Todo lo demás (backend/, .git/, documentos .md, ...) responde 404.
# La primera parte de la URL ("/js/search.js" -> "js") tiene que estar en esta lista.
# El "" (texto vacío) es para la dirección "/" sola, o sea la página principal.
RUTAS_PUBLICAS = ["", "index.html", "años.html", "encuesta.html", "seleccionar_encuesta.html",
                  "Css", "js", "imagenes", "datos", "api", "Años", "años", "Encuestas", "encuestas"]

# Creamos el servidor. Flask(...) es el objeto que recibe los pedidos del navegador.
# static_folder apunta a la raíz: así /Css/style.css sirve el archivo Css/style.css
# (static_url_path="" significa que las URLs de los archivos no llevan un prefijo, como /static/)
# __name__ le dice a Flask cómo se llama este módulo (Python lo completa solo).
app = Flask(__name__, static_folder=CARPETA_RAIZ, static_url_path="")
# Tamaño máximo de un pedido (un voto real ocupa menos de 1 KB)
# Si alguien manda algo de más de 10000 bytes, Flask lo rechaza solo (así nadie nos llena el disco).
app.config["MAX_CONTENT_LENGTH"] = 10000
# Dónde se guarda el archivo con los votos (en datos/votos_encuestas.json).
# Lo guardamos en app.config para poder cambiarlo si hiciera falta (por ejemplo, para probar).
app.config["ARCHIVO_VOTOS"] = os.path.join(CARPETA_RAIZ, "datos", "votos_encuestas.json")

# Candado para que dos votos que llegan juntos no se pisen al escribir el archivo
# Es como la llave de un baño: el que la agarra entra, y el otro espera afuera hasta que la suelte.
candado_votos = threading.Lock()


# ═══════════════════════════════════════════════════════════════════
#  FUNCIONES PARA LEER Y GUARDAR ARCHIVOS
# ═══════════════════════════════════════════════════════════════════

# leer_votos: abre datos/votos_encuestas.json y devuelve la lista de votos.
# No recibe nada. Devuelve una lista (vacía si todavía no hay archivo).
# Se llama al votar, al ver los votos y al exportar el CSV.
def leer_votos():
    """Devuelve la lista de votos guardados (lista vacía si todavía no hay archivo)."""
    ruta = app.config["ARCHIVO_VOTOS"]  # saco de la configuración la ruta del archivo de votos
    if not os.path.exists(ruta):  # si el archivo todavía no existe...
        return []  # ...no hay votos: devuelvo una lista vacía y listo
    with open(ruta, "r", encoding="utf-8") as archivo:  # abro el archivo para leer ("r"); "with" lo cierra solo al terminar
        return json.load(archivo)  # convierto el texto JSON del archivo en una lista de Python y la devuelvo


# guardar_votos: escribe la lista completa de votos en el archivo.
# Recibe la lista de votos (con el voto nuevo ya agregado). No devuelve nada.
# Se llama una sola vez, desde recibir_voto, y siempre adentro del candado.
def guardar_votos(votos):
    """
    Escribe la lista completa de votos en el archivo JSON.
    Primero escribe un archivo temporal y después lo renombra: si el programa
    se corta a mitad de camino, el archivo de votos original queda sano.
    """
    # PASO A PASO (por qué no escribimos directo en el archivo real):
    #   1. Escribimos todo en un archivo temporal (votos_encuestas.json.tmp).
    #   2. Cuando terminó bien, recién ahí lo renombramos al nombre real.
    # Si se corta la luz a la mitad del paso 1, el archivo real sigue intacto.
    # Si escribiéramos directo y se cortara, el archivo quedaría roto y perderíamos todos los votos.
    ruta = app.config["ARCHIVO_VOTOS"]  # ruta del archivo real de votos
    with open(ruta + ".tmp", "w", encoding="utf-8") as archivo:  # abro el temporal para escribir ("w"); si no existe lo crea
        json.dump(votos, archivo, indent=2, ensure_ascii=False)  # escribo la lista como JSON; indent=2 lo deja ordenado y legible, ensure_ascii=False deja las tildes y la ñ tal cual
    os.replace(ruta + ".tmp", ruta)  # renombro el temporal para que pase a ser el archivo real (pisa al viejo de golpe)


# leer_datos_anio: abre datos/AAAA.json y devuelve su contenido.
# Recibe el año (un número, ej. 2015). Devuelve un diccionario con las 7 categorías y sus nominados.
# La usa validar_payload para saber cuáles son los nominados reales de ese año.
def leer_datos_anio(anio):
    """Devuelve el contenido de datos/AAAA.json (nominados de cada categoría)."""
    ruta_datos = os.path.join(CARPETA_RAIZ, "datos", str(anio) + ".json")  # armo la ruta: str(2015) convierte el número en texto "2015", y queda datos/2015.json
    with open(ruta_datos, "r", encoding="utf-8") as archivo:  # abro el archivo para leer
        return json.load(archivo)  # convierto el JSON en un diccionario de Python y lo devuelvo


# ═══════════════════════════════════════════════════════════════════
#  VALIDACIÓN DEL VOTO (¿lo que mandó el navegador es un voto de verdad?)
# ═══════════════════════════════════════════════════════════════════

# validar_payload: revisa que el voto recibido sea válido (nunca hay que confiar en lo que llega de afuera,
# porque alguien podría mandar cualquier cosa sin pasar por la página).
# Recibe lo que mandó el navegador. Devuelve el diccionario de votos limpio, o None si algo está mal.
# FUNCIÓN COMPLEJA, paso a paso:
#   1. Se fija que llegue un diccionario con "year" y "votes".
#   2. Se fija que el año sea un número entero entre 2014 y 2025.
#   3. Arma un diccionario con las 7 categorías, todas en None (sin responder).
#   4. Recorre lo que votó la persona: cada categoría tiene que ser oficial,
#      y cada juego elegido tiene que ser un nominado REAL de esa categoría ese año.
#   5. Si todo está bien devuelve el diccionario, si algo falla devuelve None.
def validar_payload(datos):
    """
    Revisa el voto que manda js/encuesta.js. El único formato aceptado es:
        {"year": 2025, "votes": {"Game of the Year": "Nombre" o null, ...}}
    Devuelve el diccionario de votos con las 7 categorías, o None si es inválido.
    """
    if not isinstance(datos, dict):  # si lo recibido NO es un diccionario (por ejemplo vino vacío o una lista)...
        return None  # ...es inválido
    anio = datos.get("year")  # saco el año; .get devuelve None si la clave no existe (en vez de dar error)
    votos = datos.get("votes")  # saco los votos; también None si no existe
    # El año tiene que ser un número entero de la lista (True/False no cuentan)
    # (en Python True es técnicamente un 1, por eso usamos "type(...) is not int" en vez de isinstance)
    if type(anio) is not int or anio not in ANIOS_VALIDOS:  # si no es entero, o no es de 2014 a 2025...
        return None  # ...es inválido
    if not isinstance(votos, dict):  # los votos tienen que ser un diccionario {categoría: juego}
        return None  # si no lo son, es inválido

    datos_anio = leer_datos_anio(anio)  # cargo los nominados reales de ese año para comparar contra ellos
    votos_limpios = {}  # acá voy a armar el diccionario final, vacío al principio
    for categoria in CATEGORIAS_OFICIALES:  # para cada una de las 7 categorías...
        votos_limpios[categoria] = None  # ...arranco con None (o sea "no respondió"), así siempre quedan las 7
    for categoria, elegido in votos.items():  # ahora recorro lo que votó la persona (.items() da pares categoría + juego elegido)
        # Solo se aceptan las categorías oficiales
        if categoria not in CATEGORIAS_OFICIALES:  # si mandó una categoría inventada...
            return None  # ...es inválido
        # null = categoría sin responder
        if elegido is None:  # en JSON "null" llega como None en Python: la persona no eligió nada en esta categoría
            continue  # "continue" salta al siguiente de la vuelta (no hay nada que revisar acá)
        # Si no es null, tiene que ser uno de los nominados reales de esa categoría
        nombres_nominados = []  # lista vacía donde junto los nombres de los nominados de esta categoría
        for nominado in datos_anio[categoria]:  # recorro los nominados de esa categoría en el JSON del año
            nombres_nominados.append(nominado["name"])  # agrego el nombre de cada uno a la lista
        if elegido not in nombres_nominados:  # si el juego que mandó NO está entre los nominados...
            return None  # ...es inválido (así nadie puede votar un juego inventado)
        votos_limpios[categoria] = elegido  # todo bien: guardo el voto de esta categoría
    return votos_limpios  # devuelvo el diccionario con las 7 categorías ya validadas


# ═══════════════════════════════════════════════════════════════════
#  RUTAS DE LA API (las direcciones a las que le habla el JavaScript)
#  Un "decorador" (@app.route) le avisa a Flask: "cuando llegue un pedido a esta URL,
#  ejecutá la función que está justo abajo".
# ═══════════════════════════════════════════════════════════════════

# recibir_voto: guarda un voto nuevo. La llama el navegador con POST a /api/vote cuando
# la persona aprieta "Enviar mi votación" (el fetch está en js/encuesta.js).
# methods=["POST"] significa que solo acepta pedidos que ENVÍAN datos (no los de solo mirar).
# FUNCIÓN COMPLEJA, paso a paso:
#   1. Lee el JSON que mandó el navegador.
#   2. Lo valida; si está mal, responde 400 (error del que pidió).
#   3. Toma el candado, lee los votos viejos, le suma el nuevo y guarda todo.
#   4. Responde 201 (creado) con el id y la hora del voto.
@app.route("/api/vote", methods=["POST"])
def recibir_voto():
    """Guarda un voto nuevo. Responde 201 si salió bien o 400 si el pedido es inválido."""
    datos = request.get_json(silent=True)  # leo el JSON que vino en el pedido; silent=True devuelve None si venía roto (en vez de dar error)
    votos = validar_payload(datos)  # lo reviso con la función de arriba: da el diccionario limpio o None
    if votos is None:  # si no pasó la validación...
        mensaje = 'Voto inválido. Formato esperado: {"year": 2014-2025, "votes": {categoría: nombre o null}}'  # texto que explica qué esperábamos
        return jsonify({"status": "error", "message": mensaje}), 400  # respondo con el error; 400 = "el pedido está mal"

    with candado_votos:  # agarro el candado: hasta que termine este bloque nadie más puede entrar acá
        lista = leer_votos()  # leo todos los votos que ya hay
        registro = {  # armo el registro del voto nuevo (un diccionario con 4 datos)
            "id": len(lista) + 1,  # el id es la cantidad de votos que había + 1 (el primero es 1, el segundo 2, etc.)
            "timestamp": datetime.now().isoformat(),  # fecha y hora de ahora, escrita como texto (ej. 2026-10-08T03:18:03)
            "year": datos["year"],  # el año al que pertenece este voto
            "votes": votos,  # las 7 categorías ya validadas
        }
        lista.append(registro)  # agrego el voto nuevo al final de la lista
        guardar_votos(lista)  # guardo la lista completa en el archivo

    # respondo con el id y la hora del voto guardado; 201 = "se creó algo nuevo"
    return jsonify({"status": "success", "id": registro["id"], "timestamp": registro["timestamp"]}), 201


# ver_votos: devuelve todos los votos en formato JSON. Se usa entrando a /api/votes en el navegador.
# methods=["GET"] es el tipo de pedido común (el de "quiero ver algo", como cuando abrís una página).
@app.route("/api/votes", methods=["GET"])
def ver_votos():
    """Devuelve todos los votos guardados en formato JSON."""
    # Se usa el candado para no leer el archivo justo mientras se está escribiendo
    with candado_votos:  # agarro el candado para que nadie esté guardando un voto mientras leo
        votos = leer_votos()  # leo la lista de votos
    return jsonify(votos)  # la mando de vuelta como JSON (si todo sale bien Flask responde 200 solo)


# exportar_csv: arma una tabla CSV con todos los votos para abrirla en Excel. Va a /api/export.
# Un CSV es un texto donde cada fila es una línea y las columnas se separan con comas.
# FUNCIÓN COMPLEJA, paso a paso:
#   1. Prepara un "archivo falso" en memoria y un escritor de CSV.
#   2. Escribe la primera fila (los títulos de las columnas).
#   3. Lee los votos y escribe una fila por voto (las categorías sin responder dicen "NaN").
#   4. Devuelve el texto como descarga con nombre votos_encuestas.csv.
@app.route("/api/export", methods=["GET"])
def exportar_csv():
    """Arma un CSV con todos los votos. Las categorías sin responder se escriben como NaN."""
    texto = io.StringIO()  # creo un archivo falso en memoria donde voy a ir escribiendo el CSV
    escritor = csv.writer(texto)  # creo el escritor de CSV: se encarga de poner las comas y las comillas bien
    escritor.writerow(["timestamp", "year"] + CATEGORIAS_OFICIALES)  # primera fila: los títulos (las dos listas se pegan con +)
    with candado_votos:  # agarro el candado mientras leo el archivo de votos
        votos = leer_votos()  # leo la lista de votos
    for voto in votos:  # recorro los votos de a uno (cada uno va a ser una fila)
        fila = [voto["timestamp"], voto["year"]]  # arranco la fila con las dos primeras columnas: fecha y año
        for categoria in CATEGORIAS_OFICIALES:  # sigo con una columna por categoría, en el mismo orden que los títulos
            elegido = voto["votes"].get(categoria)  # el juego votado en esta categoría (None si no hay)
            if elegido is None:  # si no respondió esa categoría...
                fila.append("NaN")  # ...pongo NaN ("no es un número", se usa para decir "dato vacío")
            else:  # si respondió...
                fila.append(elegido)  # ...pongo el nombre del juego
        escritor.writerow(fila)  # escribo la fila completa en el CSV

    cabeceras = {"Content-Disposition": "attachment; filename=votos_encuestas.csv"}  # le aviso al navegador: "descargá esto como archivo con este nombre" en vez de mostrarlo en pantalla
    return Response(texto.getvalue(), mimetype="text/csv", headers=cabeceras)  # mando el texto armado; mimetype dice que es un CSV


# ═══════════════════════════════════════════════════════════════════
#  PROTECCIÓN DE ARCHIVOS Y PÁGINA PRINCIPAL
# ═══════════════════════════════════════════════════════════════════

# bloquear_archivos_privados: se ejecuta ANTES de cada pedido (por eso "before_request").
# Corta con 404 todo lo que no esté en RUTAS_PUBLICAS, para que nadie pueda bajar
# el código del servidor, la carpeta .git ni los documentos del proyecto.
# FUNCIÓN COMPLEJA, paso a paso:
#   1. Limpia la ruta con normpath: así "/Css/../backend/app.py" pasa a ser "/backend/app.py"
#      (ese truco de usar ".." para escaparse de una carpeta se llama "path traversal").
#   2. Se queda con la primera parte ("backend").
#   3. Si esa parte no está en la lista pública, responde 404.
@app.before_request
def bloquear_archivos_privados():
    """Solo deja pasar los pedidos a RUTAS_PUBLICAS (backend/, .git/, etc. dan 404)."""
    # normpath resuelve trucos como /Css/../backend/app.py -> /backend/app.py
    ruta = posixpath.normpath(request.path)  # limpio la ruta del pedido, resolviendo los ".." y las barras repetidas
    partes = [p for p in ruta.split("/") if p]
    primera_parte = partes[0] if partes else ""
    rutas_lower = [r.lower() for r in RUTAS_PUBLICAS]
    if primera_parte.lower() not in rutas_lower:  # si esa carpeta o archivo no es público...
        abort(404)  # ...corto el pedido acá con "no encontrado" (finge que no existe)


# inicio: lo que se muestra al entrar a http://localhost:5000/ (la dirección sola, sin nada más).
@app.route("/")
def inicio():
    """Página principal."""
    return app.send_static_file("index.html")  # mando el archivo index.html de la carpeta raíz


# ═══════════════════════════════════════════════════════════════════
#  ARRANQUE DEL SERVIDOR
# ═══════════════════════════════════════════════════════════════════

# Este "if" es verdadero solo si ejecutás este archivo directamente (python backend/app.py).
# Si otro archivo lo importara, no arrancaría el servidor solo.
if __name__ == "__main__":
    puerto = int(os.environ.get("PORT", 5000))  # busco una variable de entorno llamada PORT; si no existe uso 5000; int(...) lo pasa a número
    print("Servidor GOTY en http://localhost:" + str(puerto) + "/")  # muestro en la terminal en qué dirección quedó andando
    app.run(port=puerto)  # arranco el servidor y se queda esperando pedidos (se corta con Ctrl+C)
