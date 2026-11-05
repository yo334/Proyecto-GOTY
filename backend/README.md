# Backend - Proyecto GOTY

Servidor en Python con Flask. Sirve todo el sitio (HTML, CSS, JS, imágenes),
arma las páginas de cada año y guarda los votos de la encuesta.

## Instalación

```bash
pip install -r backend/requirements.txt
```

## Ejecución

Desde la carpeta raíz del proyecto:

```bash
python backend/app.py
```

El sitio queda en `http://localhost:5000`. Para usar otro puerto: `PORT=5055 python backend/app.py`.

## Páginas de los años y encuestas

Cada año tiene su propia página HTML estática independiente:
- Ganadores: `Años/AAAA.html` (ej. `Años/2015.html`).
- Encuestas: `Encuestas/AAAA.html` (ej. `Encuestas/2015.html`).
Las páginas funcionan tanto con Flask como con Live Server o abriéndolas directamente en el navegador.
Para cambiar un nominado o una portada, se edita el HTML o el JSON del año correspondiente.

## Endpoints

| Método | Ruta          | Qué hace |
|--------|---------------|----------|
| POST   | `/api/vote`   | Guarda un voto en `datos/votos_encuestas.json`. Responde 201, o 400 si el voto es inválido. |
| GET    | `/api/votes`  | Devuelve todos los votos en JSON. |
| GET    | `/api/export` | Descarga todos los votos como CSV (`timestamp,year` + las 7 categorías; sin respuesta = `NaN`). |

Formato del voto (es el que manda `js/encuesta.js`):

```json
{
  "year": 2025,
  "votes": {
    "Game of the Year": "Clair Obscur: Expedition 33",
    "Best Independent Game": null
  }
}
```

- `year`: número entero entre 2014 y 2025.
- `votes`: solo las 7 categorías oficiales; el valor es el nombre elegido o `null` si no se respondió.
