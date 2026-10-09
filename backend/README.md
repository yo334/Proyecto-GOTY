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

## Páginas de los años

Hay una sola página para todos los años: `años.html?y=2015` muestra 2015.
`js/anio.js` la arma con los datos de `datos/AAAA.json` (igual que `encuesta.html`),
así que funciona tanto con Flask como con Live Server.
Para cambiar un nominado o una portada, se edita el JSON del año.

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
