#!/usr/bin/env python3
"""
Servidor alternativo en Flask para el Proyecto GOTY.
Mantiene 100% de compatibilidad con backend/server.py:
- Mismos esquemas de datos (JSON y CSV en datos/votos_encuestas.*)
- Mismos endpoints: POST /api/vote, GET /api/votes, GET /api/export
- Manejo idéntico de votos parciales (null en JSON, NaN en CSV)
- Soporte para CORS y servicio de archivos estáticos.
"""

import os
import sys

# Asegurar que la carpeta backend esté en el sys.path para importar server.py
DIRECTORIO_ACTUAL = os.path.dirname(os.path.abspath(__file__))
if DIRECTORIO_ACTUAL not in sys.path:
    sys.path.insert(0, DIRECTORIO_ACTUAL)

import server

try:
    from flask import Flask, request, jsonify, send_file, send_from_directory
    from flask_cors import CORS
except ImportError:
    print("Aviso: Flask o Flask-Cors no están instalados en este entorno.")
    print("Para utilizar este archivo alternativo, instale las dependencias con:")
    print("  pip install -r requirements.txt")
    print("O ejecute directamente el servidor nativo sin dependencias:")
    print("  python backend/server.py")
    sys.exit(1)

app = Flask(__name__)
# Habilitar CORS para permitir peticiones desde cualquier origen local
CORS(app)

# Inicializar los archivos de datos si aún no existen
server.asegurar_archivos_iniciales()


@app.route('/api/vote', methods=['POST'])
def submit_vote():
    """
    Recibe los votos en formato JSON y los persiste en datos/votos_encuestas.json y .csv.
    Soporta formatos {"year": 2025, "votes": {...}} y {"2025": {...}}.
    Las categorías no respondidas se guardan como null (JSON) y NaN (CSV).
    """
    datos = request.get_json(silent=True)
    if not datos:
        return jsonify({
            "status": "error",
            "message": "Cuerpo de la petición vacío o JSON inválido."
        }), 400

    año, votos_normalizados = server.procesar_payload_voto(datos)
    if año is None:
        return jsonify({
            "status": "error",
            "message": "Payload inválido. Debe especificar 'year' y las respuestas en 'votes'."
        }), 400

    try:
        registro = server.guardar_voto(año, votos_normalizados)
        return jsonify({
            "status": "success",
            "message": "Vote recorded successfully",
            "id": registro["id"],
            "timestamp": registro["timestamp"]
        }), 201
    except Exception as e:
        return jsonify({
            "status": "error",
            "message": f"Error interno al registrar el voto: {str(e)}"
        }), 500


@app.route('/api/votes', methods=['GET'])
def get_votes():
    """
    Retorna la lista de todos los votos almacenados en formato JSON.
    """
    votos = server.leer_todos_los_votos()
    return jsonify(votos), 200


@app.route('/api/export', methods=['GET'])
def export_csv():
    """
    Permite descargar el archivo CSV con todos los votos registrados.
    """
    server.asegurar_archivos_iniciales()
    try:
        return send_file(
            server.ARCHIVO_CSV,
            mimetype='text/csv',
            as_attachment=True,
            download_name='votos_encuestas.csv'
        )
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500


@app.route('/', defaults={'ruta_archivo': 'index.html'})
@app.route('/<path:ruta_archivo>')
def servir_estaticos(ruta_archivo):
    """
    Sirve archivos estáticos directamente desde la raíz del proyecto.
    """
    archivo_completo = os.path.join(server.DIRECTORIO_RAIZ, ruta_archivo)
    if os.path.exists(archivo_completo) and not os.path.isdir(archivo_completo):
        return send_from_directory(server.DIRECTORIO_RAIZ, ruta_archivo)
    elif os.path.exists(os.path.join(archivo_completo, 'index.html')):
        return send_from_directory(archivo_completo, 'index.html')
    else:
        return jsonify({"status": "error", "message": f"Archivo '{ruta_archivo}' no encontrado."}), 404


if __name__ == '__main__':
    puerto = server.obtener_puerto()
    # Si no se pasó argumento ni PORT, usar 5000 por defecto para Flask si el 8000 está en uso por server.py
    if len(sys.argv) <= 1 and not os.environ.get('PORT'):
        puerto = 5000
    print(f"Servidor Flask Proyecto GOTY iniciado en http://localhost:{puerto}/")
    app.run(host='0.0.0.0', port=puerto, debug=True)
