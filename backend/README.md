# Backend - Proyecto GOTY

Este es el servidor web en Python (Flask) para procesar la votación del proyecto GOTY.

## Requisitos
- Python 3.8+

## Instalación

1. Crea un entorno virtual (opcional pero recomendado):
   ```bash
   python -m venv venv
   # En Windows:
   venv\Scripts\activate
   # En macOS/Linux:
   source venv/bin/activate
   ```

2. Instala las dependencias:
   ```bash
   pip install -r requirements.txt
   ```

## Ejecución

Inicia el servidor ejecutando:
```bash
python app.py
```

El servidor estará corriendo en `http://localhost:5000`.

## Endpoints

### 1. `POST /api/vote`
Recibe los votos en formato JSON y los guarda en un archivo `votes.jsonl`. 
Las respuestas se adjuntan línea por línea.

**Ejemplo de Payload:**
```json
{
  "2023": {
    "Acción": "Juego A",
    "RPG": "Juego B"
  },
  "2022": {
    "Aventura": "Juego C"
  }
}
```

### 2. `GET /api/export`
Lee el archivo `votes.jsonl`, extrae todas las categorías votadas y genera un archivo `.csv` unificado.
Si para una entrada faltan votos en alguna categoría de algún año, esos campos quedarán vacíos en el CSV (equivalente a NaN). Devuelve el archivo `votes_export.csv` para descargar.
