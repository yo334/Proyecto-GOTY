#!/usr/bin/env python3
"""
Suite de Pruebas Automatizadas para el Servidor Local y Persistencia (Milestone 2 - R2 Backend).
Desarrollado exclusivamente con la biblioteca estándar de Python (unittest, urllib.request).

Verifica:
1. Funciones de procesamiento de payload y normalización (esquemas A, B y C).
2. Manejo de envíos parciales (null en JSON, NaN en CSV).
3. Arranque del servidor HTTP en hilo separado.
4. Endpoint POST /api/vote con votos completos y parciales.
5. Encabezados CORS (Access-Control-Allow-Origin, Methods, Headers) y preflight OPTIONS.
6. Endpoint GET /api/votes (recuperación de votos en JSON).
7. Endpoint GET /api/export (exportación en CSV con Content-Type text/csv).
8. Servidor de archivos estáticos (GET / e index.html).
9. Manejo de errores (JSON malformado, payloads sin año).
"""

import unittest
import urllib.request
import urllib.parse
import urllib.error
import json
import csv
import os
import sys
import time
import shutil
import tempfile
import threading

# Asegurar que la carpeta backend esté en el sys.path
DIRECTORIO_BACKEND = os.path.dirname(os.path.abspath(__file__))
if DIRECTORIO_BACKEND not in sys.path:
    sys.path.insert(0, DIRECTORIO_BACKEND)

import server


class TestProcesamientoVotos(unittest.TestCase):
    """
    Pruebas unitarias de las funciones lógicas de normalización y persistencia.
    """

    def test_esquema_a_estandar(self):
        """Prueba de payload con claves 'year' y 'votes'."""
        datos = {
            "year": 2025,
            "votes": {
                "Game of the Year": "Clair Obscur: Expedition 33",
                "Best Narrative": "Clair Obscur: Expedition 33"
            }
        }
        año, votos = server.procesar_payload_voto(datos)
        self.assertEqual(año, 2025)
        self.assertEqual(votos["Game of the Year"], "Clair Obscur: Expedition 33")
        self.assertEqual(votos["Best Narrative"], "Clair Obscur: Expedition 33")
        # Las categorías no votadas deben ser None (null en JSON)
        self.assertIsNone(votos["Best Independent Game"])
        self.assertIsNone(votos["Best Art Direction"])
        self.assertIsNone(votos["Best Soundtrack"])
        self.assertIsNone(votos["Best Multiplayer"])
        self.assertIsNone(votos["Best Game Direction"])

    def test_esquema_b_clave_año(self):
        """Prueba de payload con el año como clave principal ej. {'2025': {...}}."""
        datos = {
            "2025": {
                "Game of the Year": "Grand Theft Auto VI",
                "Best Art Direction": "Ghost of Yōtei"
            }
        }
        año, votos = server.procesar_payload_voto(datos)
        self.assertEqual(año, 2025)
        self.assertEqual(votos["Game of the Year"], "Grand Theft Auto VI")
        self.assertEqual(votos["Best Art Direction"], "Ghost of Yōtei")
        self.assertIsNone(votos["Best Narrative"])

    def test_esquema_c_objeto_plano(self):
        """Prueba de payload plano con 'year' y categorías en el nivel superior."""
        datos = {
            "year": 2024,
            "Game of the Year": "Astro Bot",
            "Best Independent Game": "Balatro"
        }
        año, votos = server.procesar_payload_voto(datos)
        self.assertEqual(año, 2024)
        self.assertEqual(votos["Game of the Year"], "Astro Bot")
        self.assertEqual(votos["Best Independent Game"], "Balatro")
        self.assertIsNone(votos["Best Soundtrack"])

    def test_payload_invalido(self):
        """Prueba de payloads que no contienen año o estructura válida."""
        self.assertEqual(server.procesar_payload_voto({}), (None, None))
        self.assertEqual(server.procesar_payload_voto([]), (None, None))
        self.assertEqual(server.procesar_payload_voto("texto"), (None, None))
        self.assertEqual(server.procesar_payload_voto({"votes": {"GOTY": "Juego"}}), (None, None))


class TestServidorHTTP(unittest.TestCase):
    """
    Pruebas de integración HTTP sobre una instancia activa de ThreadingTCPServer.
    """

    @classmethod
    def setUpClass(cls):
        # Crear un directorio temporal para aislar los archivos de prueba
        cls.dir_temporal = tempfile.mkdtemp()
        cls.orig_json = server.ARCHIVO_JSON
        cls.orig_csv = server.ARCHIVO_CSV
        cls.orig_datos = server.CARPETA_DATOS

        server.CARPETA_DATOS = cls.dir_temporal
        server.ARCHIVO_JSON = os.path.join(cls.dir_temporal, "votos_encuestas.json")
        server.ARCHIVO_CSV = os.path.join(cls.dir_temporal, "votos_encuestas.csv")
        server.asegurar_archivos_iniciales()

        # Iniciar servidor en un puerto aleatorio libre (puerto 0)
        cls.servidor, cls.puerto = server.crear_servidor(0)
        cls.hilo_servidor = threading.Thread(target=cls.servidor.serve_forever, daemon=True)
        cls.hilo_servidor.start()
        cls.base_url = f"http://127.0.0.1:{cls.puerto}"
        # Pausa breve para asegurar inicio del socket
        time.sleep(0.1)

    @classmethod
    def tearDownClass(cls):
        # Detener servidor y limpiar archivos temporales
        cls.servidor.shutdown()
        cls.servidor.server_close()
        shutil.rmtree(cls.dir_temporal, ignore_errors=True)

        # Restaurar rutas originales
        server.CARPETA_DATOS = cls.orig_datos
        server.ARCHIVO_JSON = cls.orig_json
        server.ARCHIVO_CSV = cls.orig_csv

    def peticion(self, metodo, ruta, datos=None, encabezados=None):
        """Método auxiliar para realizar peticiones HTTP."""
        if encabezados is None:
            encabezados = {}
        url = f"{self.base_url}{ruta}"
        cuerpo = None
        if datos is not None:
            cuerpo = json.dumps(datos).encode('utf-8')
            if 'Content-Type' not in encabezados:
                encabezados['Content-Type'] = 'application/json'

        req = urllib.request.Request(url, data=cuerpo, headers=encabezados, method=metodo)
        try:
            with urllib.request.urlopen(req) as resp:
                status = resp.status
                headers = dict(resp.headers)
                body = resp.read().decode('utf-8')
                return status, headers, body
        except urllib.error.HTTPError as e:
            status = e.code
            headers = dict(e.headers)
            body = e.read().decode('utf-8')
            return status, headers, body

    def test_01_cors_preflight_options(self):
        """Verifica que OPTIONS /api/vote responda con 200 y encabezados CORS apropiados."""
        status, headers, _ = self.peticion('OPTIONS', '/api/vote')
        self.assertEqual(status, 200)
        self.assertEqual(headers.get('Access-Control-Allow-Origin'), '*')
        self.assertIn('POST', headers.get('Access-Control-Allow-Methods', ''))
        self.assertIn('GET', headers.get('Access-Control-Allow-Methods', ''))
        self.assertIn('OPTIONS', headers.get('Access-Control-Allow-Methods', ''))
        self.assertIn('Content-Type', headers.get('Access-Control-Allow-Headers', ''))

    def test_02_post_voto_completo(self):
        """Verifica el registro exitoso de una encuesta con todas las categorías votadas."""
        payload = {
            "year": 2024,
            "votes": {
                "Game of the Year": "Astro Bot",
                "Best Independent Game": "Balatro",
                "Best Narrative": "Metaphor: ReFantazio",
                "Best Art Direction": "Astro Bot",
                "Best Soundtrack": "Final Fantasy VII Rebirth",
                "Best Multiplayer": "Helldivers 2",
                "Best Game Direction": "Astro Bot"
            }
        }
        status, headers, body = self.peticion('POST', '/api/vote', datos=payload)
        self.assertEqual(status, 201)
        self.assertEqual(headers.get('Access-Control-Allow-Origin'), '*')
        res = json.loads(body)
        self.assertEqual(res.get("status"), "success")
        self.assertEqual(res.get("message"), "Vote recorded successfully")
        self.assertEqual(res.get("id"), 1)

        # Verificar contenido en JSON
        with open(server.ARCHIVO_JSON, 'r', encoding='utf-8') as f:
            registros = json.load(f)
        self.assertEqual(len(registros), 1)
        self.assertEqual(registros[0]["votes"]["Game of the Year"], "Astro Bot")
        self.assertEqual(registros[0]["votes"]["Best Multiplayer"], "Helldivers 2")

        # Verificar contenido en CSV
        with open(server.ARCHIVO_CSV, 'r', encoding='utf-8') as f:
            lector = list(csv.reader(f))
        self.assertEqual(len(lector), 2)  # Cabecera + 1 fila
        self.assertIn("Astro Bot", lector[1])
        self.assertIn("Helldivers 2", lector[1])

    def test_03_post_voto_parcial_null_nan(self):
        """
        Verifica el registro de un voto parcial:
        - Categorías no seleccionadas se guardan como null en JSON.
        - Categorías no seleccionadas se guardan como 'NaN' en CSV.
        """
        payload_parcial = {
            "year": 2025,
            "votes": {
                "Game of the Year": "Clair Obscur: Expedition 33",
                "Best Narrative": "Clair Obscur: Expedition 33",
                "Best Multiplayer": "Arc Raiders"
            }
        }
        status, _, body = self.peticion('POST', '/api/vote', datos=payload_parcial)
        self.assertEqual(status, 201)
        res = json.loads(body)
        self.assertEqual(res.get("status"), "success")
        self.assertEqual(res.get("id"), 2)

        # 1. Verificar que en JSON los no seleccionados son explícitamente null
        with open(server.ARCHIVO_JSON, 'r', encoding='utf-8') as f:
            registros = json.load(f)
        segundo_registro = registros[1]
        votos_guardados = segundo_registro["votes"]

        self.assertEqual(votos_guardados["Game of the Year"], "Clair Obscur: Expedition 33")
        self.assertEqual(votos_guardados["Best Multiplayer"], "Arc Raiders")
        self.assertIsNone(votos_guardados["Best Independent Game"])
        self.assertIsNone(votos_guardados["Best Art Direction"])
        self.assertIsNone(votos_guardados["Best Soundtrack"])
        self.assertIsNone(votos_guardados["Best Game Direction"])

        # 2. Verificar que en CSV los no seleccionados son 'NaN'
        with open(server.ARCHIVO_CSV, 'r', encoding='utf-8') as f:
            lector = list(csv.reader(f))
        self.assertEqual(len(lector), 3)  # Cabecera + 2 filas
        fila2 = lector[2]
        self.assertEqual(fila2[1], "2025")
        self.assertEqual(fila2[2], "Clair Obscur: Expedition 33")  # Game of the Year
        self.assertEqual(fila2[3], "NaN")                         # Best Independent Game
        self.assertEqual(fila2[4], "Clair Obscur: Expedition 33")  # Best Narrative
        self.assertEqual(fila2[5], "NaN")                         # Best Art Direction
        self.assertEqual(fila2[6], "NaN")                         # Best Soundtrack
        self.assertEqual(fila2[7], "Arc Raiders")                 # Best Multiplayer
        self.assertEqual(fila2[8], "NaN")                         # Best Game Direction

    def test_04_post_voto_formato_año_plano(self):
        """Verifica formato alternativo {'2023': {'Game of the Year': 'Baldur\'s Gate 3'}}."""
        payload = {
            "2023": {
                "Game of the Year": "Baldur's Gate 3"
            }
        }
        status, _, body = self.peticion('POST', '/api/vote', datos=payload)
        self.assertEqual(status, 201)
        res = json.loads(body)
        self.assertEqual(res.get("status"), "success")

    def test_05_get_votes(self):
        """Verifica que GET /api/votes retorne todos los votos en JSON."""
        status, headers, body = self.peticion('GET', '/api/votes')
        self.assertEqual(status, 200)
        self.assertIn("application/json", headers.get('Content-Type', ''))
        self.assertEqual(headers.get('Access-Control-Allow-Origin'), '*')
        datos = json.loads(body)
        self.assertEqual(len(datos), 3)
        self.assertEqual(datos[0]["year"], 2024)
        self.assertEqual(datos[1]["year"], 2025)
        self.assertEqual(datos[2]["year"], 2023)

    def test_06_get_export_csv(self):
        """Verifica que GET /api/export retorne el contenido CSV con Content-Type: text/csv."""
        status, headers, body = self.peticion('GET', '/api/export')
        self.assertEqual(status, 200)
        self.assertIn("text/csv", headers.get('Content-Type', ''))
        self.assertEqual(headers.get('Access-Control-Allow-Origin'), '*')
        lineas = [l for l in body.strip().splitlines() if l]
        self.assertEqual(len(lineas), 4)  # Cabecera + 3 filas
        self.assertTrue(lineas[0].startswith("timestamp,year,Game of the Year"))
        # Verificar que 'NaN' está presente en el CSV exportado
        self.assertIn("NaN", body)

    def test_07_post_payload_invalido_devuelve_400(self):
        """Verifica que un payload sin año devuelva error 400 Bad Request."""
        status, _, body = self.peticion('POST', '/api/vote', datos={"invalido": True})
        self.assertEqual(status, 400)
        res = json.loads(body)
        self.assertEqual(res.get("status"), "error")

    def test_08_metodos_no_permitidos(self):
        """Verifica que métodos GET en /api/vote o POST en /api/votes devuelvan 405."""
        status, _, _ = self.peticion('GET', '/api/vote')
        self.assertEqual(status, 405)
        status, _, _ = self.peticion('POST', '/api/votes', datos={})
        self.assertEqual(status, 405)

    def test_09_archivos_estaticos_index(self):
        """Verifica que el servidor entregue archivos estáticos desde la raíz del proyecto."""
        status, headers, body = self.peticion('GET', '/index.html')
        self.assertEqual(status, 200)
        self.assertEqual(headers.get('Access-Control-Allow-Origin'), '*')
        self.assertIn("<html", body.lower())


if __name__ == '__main__':
    unittest.main(verbosity=2)
