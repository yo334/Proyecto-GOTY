# Graph Report - Proyecto_GOTY  (2026-10-07)

## Corpus Check
- cluster-only mode — file stats not available

## Summary
- 137 nodes · 202 edges · 8 communities (4 shown, 4 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 2 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `0f80c63e`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- server.py
- ManejadorGOTY
- TestServidorHTTP
- encuesta.js
- app.py
- TestProcesamientoVotos
- search.js
- os

## God Nodes (most connected - your core abstractions)
1. `TestServidorHTTP` - 14 edges
2. `ManejadorGOTY` - 13 edges
3. `guardar_voto()` - 10 edges
4. `asegurar_archivos_iniciales()` - 8 edges
5. `TestProcesamientoVotos` - 6 edges
6. `renderYearPanel()` - 6 edges
7. `crear_servidor()` - 5 edges
8. `leer_todos_los_votos()` - 5 edges
9. `submit_vote()` - 5 edges
10. `init()` - 4 edges

## Surprising Connections (you probably didn't know these)
- `export_csv()` --calls--> `asegurar_archivos_iniciales()`  [EXTRACTED]
  backend/app.py → backend/server.py
- `submit_vote()` --calls--> `guardar_voto()`  [EXTRACTED]
  backend/app.py → backend/server.py
- `get_votes()` --calls--> `leer_todos_los_votos()`  [EXTRACTED]
  backend/app.py → backend/server.py
- `submit_vote()` --calls--> `procesar_payload_voto()`  [EXTRACTED]
  backend/app.py → backend/server.py

## Import Cycles
- None detected.

## Communities (8 total, 4 thin omitted)

### Community 0 - "server.py"
Cohesion: 0.11
Nodes (6): asegurar_archivos_iniciales(), crear_servidor(), guardar_voto(), iniciar_servidor(), leer_todos_los_votos(), obtener_puerto()

### Community 3 - "encuesta.js"
Cohesion: 0.17
Nodes (18): ALL_YEARS, CANONICAL_CATEGORIES, CATEGORY_ANCHOR_MAP, currentVotes, FALLBACK_GOTY_DATA, handleCardClick(), hideFeedback(), init() (+10 more)

### Community 4 - "app.py"
Cohesion: 0.15
Nodes (5): export_csv(), get_votes(), servir_estaticos(), submit_vote(), procesar_payload_voto()

### Community 6 - "search.js"
Cohesion: 0.29
Nodes (3): input, resultsContainer, searchIndex

## Knowledge Gaps
- **11 isolated node(s):** `ALL_YEARS`, `CANONICAL_CATEGORIES`, `CATEGORY_ANCHOR_MAP`, `currentVotes`, `FALLBACK_GOTY_DATA` (+6 more)
  These have ≤1 connection - possible missing edges. (Counts symbols only; 70 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **4 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `TestServidorHTTP` connect `TestServidorHTTP` to `server.py`?**
  _High betweenness centrality (0.230) - this node is a cross-community bridge._
- **What connects `ALL_YEARS`, `CANONICAL_CATEGORIES`, `CATEGORY_ANCHOR_MAP` to the rest of the system?**
  _11 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `server.py` be split into smaller, more focused modules?**
  _Cohesion score 0.10837438423645321 - nodes in this community are weakly interconnected._
- **Why does `ManejadorGOTY` connect `ManejadorGOTY` to `server.py`?**
  _High betweenness centrality (0.177) - this node is a cross-community bridge._
- **Should `ManejadorGOTY` be split into smaller, more focused modules?**
  _Cohesion score 0.11333333333333333 - nodes in this community are weakly interconnected._
- **Why does `TestProcesamientoVotos` connect `TestProcesamientoVotos` to `server.py`?**
  _High betweenness centrality (0.102) - this node is a cross-community bridge._
- **Should `TestServidorHTTP` be split into smaller, more focused modules?**
  _Cohesion score 0.11594202898550725 - nodes in this community are weakly interconnected._