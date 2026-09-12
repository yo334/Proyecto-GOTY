#!/usr/bin/env python3
"""
Servidor local para el Proyecto GOTY (The Game Awards).
Desarrollado exclusivamente con la biblioteca estándar de Python (sin dependencias externas).
Compatible con Python 3.8+ y Python 3.14+.

Funcionalidades:
1. Servidor de archivos estáticos desde la raíz del proyecto para desarrollo local (puerto 8000).
2. API POST /api/vote: Guarda votos en JSON y CSV admitiendo votos parciales (null / NaN).
3. API GET /api/votes: Retorna todos los votos acumulados en formato JSON.
4. API GET /api/export: Retorna la exportación de votos en formato CSV.
5. Soporte completo para CORS (Cross-Origin Resource Sharing) y preflight (OPTIONS).
"""

import http.server
import socketserver
import json
import csv
import os
import sys
import time
import threading
import urllib.parse
from datetime import datetime

# ==============================================================================
# CONFIGURACIÓN DE DIRECTORIOS Y ARCHIVOS
# ==============================================================================

# Directorio donde se ubica este archivo (backend/)
DIRECTORIO_BACKEND = os.path.dirname(os.path.abspath(__file__))

# Directorio raíz del proyecto GOTY (un nivel arriba de backend/)
DIRECTORIO_RAIZ = os.path.abspath(os.path.join(DIRECTORIO_BACKEND, ".."))

# Carpeta de almacenamiento de datos del proyecto
CARPETA_DATOS = os.path.join(DIRECTORIO_RAIZ, "datos")

# Archivos de persistencia de votos
ARCHIVO_JSON = os.path.join(CARPETA_DATOS, "votos_encuestas.json")
ARCHIVO_CSV = os.path.join(CARPETA_DATOS, "votos_encuestas.csv")

# Las 7 categorías canónicas de The Game Awards en el orden oficial del proyecto
CATEGORIAS_OFICIALES = [
    "Game of the Year",
    "Best Independent Game",
    "Best Narrative",
    "Best Art Direction",
    "Best Soundtrack",
    "Best Multiplayer",
    "Best Game Direction"
]

# Cabecera estándar del archivo CSV de votos
CABECERA_CSV = ["timestamp", "year"] + CATEGORIAS_OFICIALES

# Candado reentrante (RLock) para garantizar que las lecturas y escrituras en disco sean seguras y atómicas
BLOQUEO_ARCHIVOS = threading.RLock()


# ==============================================================================
# FUNCIONES AUXILIARES DE PERSISTENCIA Y NORMALIZACIÓN
# ==============================================================================

def asegurar_archivos_iniciales():
    """
    Verifica que la carpeta 'datos' y los archivos 'votos_encuestas.json' y
    'votos_encuestas.csv' existan. Si no existen, los inicializa con su estructura básica.
    """
    with BLOQUEO_ARCHIVOS:
        # Crear la carpeta datos si no existe
        if not os.path.exists(CARPETA_DATOS):
            os.makedirs(CARPETA_DATOS, exist_ok=True)

        # Inicializar el archivo JSON como un arreglo vacío si no existe o si está vacío
        if not os.path.exists(ARCHIVO_JSON) or os.path.getsize(ARCHIVO_JSON) == 0:
            with open(ARCHIVO_JSON, 'w', encoding='utf-8') as f:
                json.dump([], f, indent=2, ensure_ascii=False)

        # Inicializar el archivo CSV con la cabecera si no existe o si está vacío
        if not os.path.exists(ARCHIVO_CSV) or os.path.getsize(ARCHIVO_CSV) == 0:
            with open(ARCHIVO_CSV, 'w', newline='', encoding='utf-8') as f:
                writer = csv.writer(f)
                writer.writerow(CABECERA_CSV)


def procesar_payload_voto(datos):
    """
    Analiza y normaliza el cuerpo de la petición de voto.
    Soporta múltiples estructuras habituales:
      1. {"year": 2025, "votes": {"Game of the Year": "..."}}
      2. {"2025": {"Game of the Year": "..."}}
      3. {"year": 2025, "Game of the Year": "..."}

    Retorna una tupla: (año, dict_votos_normalizados)
    Si la carga es inválida o no contiene año, retorna (None, None).
    """
    if not isinstance(datos, dict):
        return None, None

    año = None
    votos_crudos = {}

    # Caso 1: Formato estándar con claves separadas 'year' y 'votes'
    if "year" in datos and "votes" in datos and isinstance(datos["votes"], dict):
        año = datos["year"]
        votos_crudos = datos["votes"]

    # Caso 2: Objeto plano con 'year' y las categorías en el mismo nivel
    elif "year" in datos:
        año = datos["year"]
        votos_crudos = {k: v for k, v in datos.items() if k != "year"}
        if "votes" in votos_crudos and isinstance(votos_crudos["votes"], dict):
            votos_crudos = votos_crudos["votes"]

    # Caso 3: El objeto tiene el año como clave única principal ej. {"2025": {...}}
    elif len(datos) == 1:
        clave_unica = next(iter(datos))
        if clave_unica not in ("votes", "vote") and isinstance(datos[clave_unica], dict):
            if str(clave_unica).isdigit():
                año = clave_unica
                votos_crudos = datos[clave_unica]

    # Caso 4: Buscar si alguna clave es un año de 4 dígitos
    if año is None:
        for k, v in datos.items():
            if str(k).isdigit() and len(str(k)) == 4 and isinstance(v, dict):
                año = k
                votos_crudos = v
                break

    # Si no se pudo determinar el año, el payload no es válido
    if año is None:
        return None, None

    # Intentar normalizar el año a un número entero si es posible
    try:
        año = int(año)
    except (ValueError, TypeError):
        año = str(año).strip()

    # Normalizar los votos para las 7 categorías oficiales
    # Las categorías que el usuario no seleccionó se registran explícitamente como None (null en JSON)
    votos_normalizados = {}
    for categoria in CATEGORIAS_OFICIALES:
        valor = votos_crudos.get(categoria)
        if valor is None:
            votos_normalizados[categoria] = None
        else:
            valor_str = str(valor).strip()
            # Tratar cadenas vacías o representaciones textuales de nulo como None
            if valor_str == "" or valor_str.lower() in ("nan", "null", "none", "undefined"):
                votos_normalizados[categoria] = None
            else:
                votos_normalizados[categoria] = valor_str

    # Preservar cualquier categoría extra que venga en la petición
    for categoria_extra, valor_extra in votos_crudos.items():
        if categoria_extra not in votos_normalizados:
            if valor_extra is None:
                votos_normalizados[categoria_extra] = None
            else:
                valor_str = str(valor_extra).strip()
                if valor_str == "" or valor_str.lower() in ("nan", "null", "none", "undefined"):
                    votos_normalizados[categoria_extra] = None
                else:
                    votos_normalizados[categoria_extra] = valor_str

    return año, votos_normalizados


def guardar_voto(año, votos_dict):
    """
    Persiste el voto de forma atómica y segura en:
      1. datos/votos_encuestas.json (arreglo de objetos)
      2. datos/votos_encuestas.csv (fila con 'NaN' para categorías vacías)

    Retorna el diccionario con el registro creado.
    """
    with BLOQUEO_ARCHIVOS:
        asegurar_archivos_iniciales()

        # 1. Leer registros existentes en el archivo JSON
        registros = []
        if os.path.exists(ARCHIVO_JSON):
            try:
                with open(ARCHIVO_JSON, 'r', encoding='utf-8') as f:
                    contenido = f.read().strip()
                    if contenido:
                        registros = json.loads(contenido)
                        if not isinstance(registros, list):
                            registros = []
            except Exception:
                registros = []

        # 2. Generar identificador autoincremental y marca de tiempo
        nuevo_id = 1
        if registros:
            ids_existentes = [r.get("id") for r in registros if isinstance(r, dict) and isinstance(r.get("id"), int)]
            if ids_existentes:
                nuevo_id = max(ids_existentes) + 1
            else:
                nuevo_id = len(registros) + 1

        registro = {
            "id": nuevo_id,
            "timestamp": datetime.now().isoformat(),
            "year": año,
            "votes": votos_dict
        }
        registros.append(registro)

        # 3. Guardar en JSON de manera atómica y resiliente
        contenido_json = json.dumps(registros, indent=2, ensure_ascii=False)
        archivo_temporal = f"{ARCHIVO_JSON}.{os.getpid()}_{threading.get_ident()}_{time.time_ns()}.tmp"
        guardado_exitoso = False
        try:
            with open(archivo_temporal, 'w', encoding='utf-8') as f:
                f.write(contenido_json)
                f.flush()
            # Reintentar os.replace hasta 10 veces en caso de bloqueos transitorios en Windows
            for _ in range(10):
                try:
                    os.replace(archivo_temporal, ARCHIVO_JSON)
                    guardado_exitoso = True
                    break
                except (PermissionError, OSError):
                    time.sleep(0.02)
        except Exception:
            pass
        finally:
            if not guardado_exitoso:
                # Fallback: escritura directa si el reemplazo atómico fue bloqueado por el SO
                try:
                    with open(ARCHIVO_JSON, 'w', encoding='utf-8') as f:
                        f.write(contenido_json)
                    guardado_exitoso = True
                except Exception:
                    pass
            if os.path.exists(archivo_temporal):
                try:
                    os.remove(archivo_temporal)
                except Exception:
                    pass

        # 4. Guardar en CSV agregando la nueva fila con reintentos
        # Si una categoría es None, se escribe 'NaN' cumpliendo la especificación
        fila_csv = [registro["timestamp"], registro["year"]]
        for categoria in CATEGORIAS_OFICIALES:
            valor = votos_dict.get(categoria)
            if valor is None:
                fila_csv.append("NaN")
            else:
                fila_csv.append(str(valor))

        for _ in range(10):
            try:
                with open(ARCHIVO_CSV, 'a', newline='', encoding='utf-8') as f:
                    writer = csv.writer(f)
                    writer.writerow(fila_csv)
                    f.flush()
                break
            except (PermissionError, OSError):
                time.sleep(0.02)

        return registro


def leer_todos_los_votos():
    """
    Lee todos los votos registrados en datos/votos_encuestas.json de forma segura.
    Retorna una lista de diccionarios.
    """
    with BLOQUEO_ARCHIVOS:
        if not os.path.exists(ARCHIVO_JSON):
            return []
        try:
            with open(ARCHIVO_JSON, 'r', encoding='utf-8') as f:
                contenido = f.read().strip()
                if not contenido:
                    return []
                datos = json.loads(contenido)
                if isinstance(datos, list):
                    return datos
                return []
        except Exception:
            return []


def leer_contenido_csv():
    """
    Lee el archivo CSV de datos/votos_encuestas.csv.
    Si no existe, retorna la cabecera por defecto.
    """
    with BLOQUEO_ARCHIVOS:
        if os.path.exists(ARCHIVO_CSV):
            try:
                with open(ARCHIVO_CSV, 'r', encoding='utf-8') as f:
                    return f.read()
            except Exception:
                pass
        return ",".join(CABECERA_CSV) + "\n"


# ==============================================================================
# MANEJADOR HTTP (SimpleHTTPRequestHandler + Endpoints de API + CORS)
# ==============================================================================

class ManejadorGOTY(http.server.SimpleHTTPRequestHandler):
    """
    Manejador de peticiones HTTP para el Proyecto GOTY.
    Hereda de SimpleHTTPRequestHandler para servir todos los archivos estáticos
    (HTML, CSS, JS, imágenes) desde la raíz del proyecto y atiende las rutas /api/*.
    """

    extensions_map = http.server.SimpleHTTPRequestHandler.extensions_map.copy()
    extensions_map.update({
        '.jpg': 'image/jpeg',
        '.jpeg': 'image/jpeg',
        '.png': 'image/png',
        '.gif': 'image/gif',
        '.webp': 'image/webp',
        '.svg': 'image/svg+xml',
        '.json': 'application/json; charset=utf-8',
        '.js': 'application/javascript; charset=utf-8',
        '.css': 'text/css; charset=utf-8',
        '.html': 'text/html; charset=utf-8',
        '.ico': 'image/x-icon',
    })

    def __init__(self, *args, **kwargs):
        # Servir archivos estáticos directamente desde el directorio raíz del proyecto
        super().__init__(*args, directory=DIRECTORIO_RAIZ, **kwargs)

    def translate_path(self, path):
        """
        Traduce una ruta HTTP a la ruta del sistema de archivos local.
        Garantiza que rutas codificadas en URL (ej. /A%C3%B1os/2025.html) se
        decodifiquen limpiamente a caracteres UTF-8 (/Años/2025.html).
        """
        path = urllib.parse.unquote(path)
        return super().translate_path(path)

    def address_string(self):
        """
        Retorna la dirección IP del cliente directamente sin intentar resolución DNS inversa,
        evitando retrasos de 2 segundos por petición en entornos Windows/localhost.
        """
        return str(self.client_address[0])

    def end_headers(self):
        """
        Agrega encabezados CORS universales a todas las respuestas del servidor,
        permitiendo que el frontend interactúe con el backend desde cualquier origen local.
        """
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With')
        super().end_headers()

    def do_OPTIONS(self):
        """
        Responde a las solicitudes de verificación previa CORS (preflight).
        """
        self.send_response(200)
        self.send_header('Content-Length', '0')
        self.end_headers()

    def responder_json(self, codigo_estado, datos_dict):
        """
        Envía una respuesta con formato JSON y código de estado HTTP especificado.
        """
        cuerpo_bytes = json.dumps(datos_dict, indent=2, ensure_ascii=False).encode('utf-8')
        self.send_response(codigo_estado)
        self.send_header('Content-Type', 'application/json; charset=utf-8')
        self.send_header('Content-Length', str(len(cuerpo_bytes)))
        self.end_headers()
        self.wfile.write(cuerpo_bytes)

    def do_GET(self):
        """
        Atiende solicitudes GET:
        - /api/votes: Retorna todos los votos en formato JSON.
        - /api/export: Retorna la exportación de votos en formato CSV.
        - Archivos estáticos: index.html, encuesta.html, etc.
        """
        ruta_parseada = urllib.parse.urlparse(self.path)
        ruta_limpia = ruta_parseada.path.rstrip('/')

        if ruta_limpia == '/api/votes':
            self.manejar_get_votes()
        elif ruta_limpia == '/api/export':
            self.manejar_get_export()
        elif ruta_limpia == '/api/vote':
            self.responder_json(405, {
                "status": "error",
                "message": "Método no permitido. Use POST para enviar votos a /api/vote."
            })
        elif ruta_limpia.startswith('/api/'):
            self.responder_json(404, {
                "status": "error",
                "message": f"Ruta de API '{ruta_limpia}' no encontrada."
            })
        else:
            # Delegar al manejador de archivos estáticos de SimpleHTTPRequestHandler
            super().do_GET()

    def do_POST(self):
        """
        Atiende solicitudes POST:
        - /api/vote: Recibe y procesa los votos de una encuesta.
        """
        ruta_parseada = urllib.parse.urlparse(self.path)
        ruta_limpia = ruta_parseada.path.rstrip('/')

        if ruta_limpia == '/api/vote':
            self.manejar_post_vote()
        elif ruta_limpia in ('/api/votes', '/api/export'):
            self.responder_json(405, {
                "status": "error",
                "message": "Método no permitido. Use GET para consultar este endpoint."
            })
        else:
            self.responder_json(404, {
                "status": "error",
                "message": f"Ruta de API '{ruta_limpia}' no encontrada."
            })

    def manejar_post_vote(self):
        """
        Procesa el envío de votos a /api/vote.
        Valida el JSON, procesa las categorías, guarda en disco y responde.
        """
        try:
            longitud = int(self.headers.get('Content-Length', 0))
        except (ValueError, TypeError):
            longitud = 0

        if longitud <= 0:
            self.responder_json(400, {
                "status": "error",
                "message": "El cuerpo de la petición está vacío."
            })
            return

        try:
            cuerpo_bytes = self.rfile.read(longitud)
            cuerpo_texto = cuerpo_bytes.decode('utf-8')
            datos_recibidos = json.loads(cuerpo_texto)
        except json.JSONDecodeError as err:
            self.responder_json(400, {
                "status": "error",
                "message": f"JSON malformado: {str(err)}"
            })
            return
        except Exception as err:
            self.responder_json(400, {
                "status": "error",
                "message": f"Error al leer la petición: {str(err)}"
            })
            return

        año, votos_normalizados = procesar_payload_voto(datos_recibidos)
        if año is None:
            self.responder_json(400, {
                "status": "error",
                "message": "Payload inválido. Debe especificar el campo 'year' y las respuestas en 'votes'."
            })
            return

        try:
            registro = guardar_voto(año, votos_normalizados)
            self.responder_json(201, {
                "status": "success",
                "message": "Vote recorded successfully",
                "id": registro["id"],
                "timestamp": registro["timestamp"]
            })
        except Exception as err:
            self.responder_json(500, {
                "status": "error",
                "message": f"Error interno al guardar los votos: {str(err)}"
            })

    def manejar_get_votes(self):
        """
        Retorna la lista de todos los votos almacenados en formato JSON.
        """
        votos = leer_todos_los_votos()
        cuerpo_bytes = json.dumps(votos, indent=2, ensure_ascii=False).encode('utf-8')
        self.send_response(200)
        self.send_header('Content-Type', 'application/json; charset=utf-8')
        self.send_header('Content-Length', str(len(cuerpo_bytes)))
        self.end_headers()
        self.wfile.write(cuerpo_bytes)

    def manejar_get_export(self):
        """
        Retorna el archivo CSV completo de votos con Content-Type: text/csv.
        """
        contenido_csv = leer_contenido_csv()
        cuerpo_bytes = contenido_csv.encode('utf-8')
        self.send_response(200)
        self.send_header('Content-Type', 'text/csv; charset=utf-8')
        self.send_header('Content-Disposition', 'attachment; filename="votos_encuestas.csv"')
        self.send_header('Content-Length', str(len(cuerpo_bytes)))
        self.end_headers()
        self.wfile.write(cuerpo_bytes)


# ==============================================================================
# CONFIGURACIÓN Y ARRANQUE DEL SERVIDOR
# ==============================================================================

def obtener_puerto():
    """
    Determina el puerto de ejecución:
    1. Primer argumento de línea de comandos (ej. python backend/server.py 8080)
    2. Variable de entorno PORT (ej. PORT=8000)
    3. Puerto por defecto: 8000
    """
    if len(sys.argv) > 1:
        try:
            return int(sys.argv[1])
        except ValueError:
            print(f"Aviso: El argumento '{sys.argv[1]}' no es un número de puerto válido. Se usará el puerto por defecto.")

    puerto_env = os.environ.get('PORT')
    if puerto_env:
        try:
            return int(puerto_env)
        except ValueError:
            print(f"Aviso: La variable PORT='{puerto_env}' no es válida. Se usará el puerto por defecto.")

    return 8000


def crear_servidor(puerto=None):
    """
    Crea e inicializa una instancia de ThreadingTCPServer con el ManejadorGOTY.
    """
    if puerto is None:
        puerto = obtener_puerto()

    asegurar_archivos_iniciales()
    socketserver.TCPServer.allow_reuse_address = True
    servidor = socketserver.ThreadingTCPServer(("", puerto), ManejadorGOTY)
    servidor.daemon_threads = True
    puerto_real = servidor.server_address[1]
    return servidor, puerto_real


def iniciar_servidor(puerto=None):
    """
    Inicia el servidor y lo mantiene en ejecución hasta recibir una interrupción del usuario.
    """
    servidor, puerto_asignado = crear_servidor(puerto)

    print("=" * 65)
    print(f" Proyecto GOTY — Servidor Local de Encuestas y Archivo Web")
    print(f" Estado: En línea en http://localhost:{puerto_asignado}/")
    print(f" Directorio raíz servido: {DIRECTORIO_RAIZ}")
    print(f" API Guardar Voto: POST http://localhost:{puerto_asignado}/api/vote")
    print(f" API Ver Votos:   GET  http://localhost:{puerto_asignado}/api/votes")
    print(f" API Exportar CSV: GET http://localhost:{puerto_asignado}/api/export")
    print(f" Presione Ctrl+C para detener el servidor.")
    print("=" * 65)

    try:
        servidor.serve_forever()
    except KeyboardInterrupt:
        print("\nDeteniendo el servidor Proyecto GOTY...")
    finally:
        servidor.server_close()
        print("Servidor cerrado correctamente.")


if __name__ == '__main__':
    iniciar_servidor()
