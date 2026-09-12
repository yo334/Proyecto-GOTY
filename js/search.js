// Search index: maps keywords to year pages and category anchors
const searchIndex = [
    { keywords: ['2014', 'goty 2014', 'goty2014', 'año 2014', 'ganadores 2014', 'premios 2014', 'dragon age', 'dragon age inquisition', 'dragon age: inquisition', 'dai'], label: '2014 — Dragon Age: Inquisition', url: 'Años/2014.html', icon: '🏆' },
    { keywords: ['2015', 'goty 2015', 'goty2015', 'año 2015', 'ganadores 2015', 'premios 2015', 'witcher', 'witcher 3', 'wild hunt', 'the witcher 3: wild hunt', 'tw3'], label: '2015 — The Witcher 3: Wild Hunt', url: 'Años/2015.html', icon: '🏆' },
    { keywords: ['2016', 'goty 2016', 'goty2016', 'año 2016', 'ganadores 2016', 'premios 2016', 'overwatch', 'ow', 'blizzard'], label: '2016 — Overwatch', url: 'Años/2016.html', icon: '🏆' },
    { keywords: ['2017', 'goty 2017', 'goty2017', 'año 2017', 'ganadores 2017', 'premios 2017', 'zelda', 'breath of the wild', 'botw', 'the legend of zelda: botw', 'nintendo', 'the legend of zelda: breath of the wild'], label: '2017 — The Legend of Zelda: Breath of the Wild', url: 'Años/2017.html', icon: '🏆' },
    { keywords: ['2018', 'goty 2018', 'goty2018', 'año 2018', 'ganadores 2018', 'premios 2018', 'god of war', 'gow', 'kratos', 'santa monica'], label: '2018 — God of War', url: 'Años/2018.html', icon: '🏆' },
    { keywords: ['2019', 'goty 2019', 'goty2019', 'año 2019', 'ganadores 2019', 'premios 2019', 'sekiro', 'shadows die twice', 'sekiro: shadows die twice', 'fromsoftware'], label: '2019 — Sekiro: Shadows Die Twice', url: 'Años/2019.html', icon: '🏆' },
    { keywords: ['2020', 'goty 2020', 'goty2020', 'año 2020', 'ganadores 2020', 'premios 2020', 'last of us', 'the last of us', 'the last of us part ii', 'tlou', 'tlou2', 'naughty dog'], label: '2020 — The Last of Us Part II', url: 'Años/2020.html', icon: '🏆' },
    { keywords: ['2021', 'goty 2021', 'goty2021', 'año 2021', 'ganadores 2021', 'premios 2021', 'it takes two', 'hazelight'], label: '2021 — It Takes Two', url: 'Años/2021.html', icon: '🏆' },
    { keywords: ['2022', 'goty 2022', 'goty2022', 'año 2022', 'ganadores 2022', 'premios 2022', 'elden ring', 'fromsoftware', 'er', 'miyazaki'], label: '2022 — Elden Ring', url: 'Años/2022.html', icon: '🏆' },
    { keywords: ['2023', 'goty 2023', 'goty2023', 'año 2023', 'ganadores 2023', 'premios 2023', 'baldurs gate', 'baldur', 'baldur\'s gate 3', 'bg3', 'larian'], label: '2023 — Baldur\'s Gate 3', url: 'Años/2023.html', icon: '🏆' },
    { keywords: ['2024', 'goty 2024', 'goty2024', 'año 2024', 'ganadores 2024', 'premios 2024', 'astro bot', 'astro', 'team asobi'], label: '2024 — Astro Bot', url: 'Años/2024.html', icon: '🏆' },
    { keywords: ['2025', 'goty 2025', 'goty2025', 'año 2025', 'ganadores 2025', 'premios 2025', 'clair obscur', 'clair obscur: expedition 33', 'expedition 33', 'sandfall', 'sandfall interactive'], label: '2025 — Clair Obscur: Expedition 33', url: 'Años/2025.html', icon: '🏆' },
    { keywords: ['encuesta', 'votar', 'votacion', 'survey', 'poll', 'voto', 'votar goty', 'encuesta goty'], label: '🗳️ Ir a la Encuesta GOTY', url: 'encuesta.html', icon: '🗳️' },
    { keywords: ['seleccionar encuesta', 'elegir encuesta', 'todas las encuestas', 'portal encuestas'], label: '🗳️ Seleccionar Año de Encuesta', url: 'seleccionar_encuesta.html', icon: '🗳️' },
    { keywords: ['encuesta 2014', 'votar 2014', 'votar goty 2014', 'voto 2014', 'survey 2014'], label: '🗳️ Encuesta GOTY 2014 — Votar nominados', url: 'encuesta.html', icon: '🗳️' },
    { keywords: ['encuesta 2015', 'votar 2015', 'votar goty 2015', 'voto 2015', 'survey 2015'], label: '🗳️ Encuesta GOTY 2015 — Votar nominados', url: 'encuesta.html', icon: '🗳️' },
    { keywords: ['encuesta 2016', 'votar 2016', 'votar goty 2016', 'voto 2016', 'survey 2016'], label: '🗳️ Encuesta GOTY 2016 — Votar nominados', url: 'encuesta.html', icon: '🗳️' },
    { keywords: ['encuesta 2017', 'votar 2017', 'votar goty 2017', 'voto 2017', 'survey 2017'], label: '🗳️ Encuesta GOTY 2017 — Votar nominados', url: 'encuesta.html', icon: '🗳️' },
    { keywords: ['encuesta 2018', 'votar 2018', 'votar goty 2018', 'voto 2018', 'survey 2018'], label: '🗳️ Encuesta GOTY 2018 — Votar nominados', url: 'encuesta.html', icon: '🗳️' },
    { keywords: ['encuesta 2019', 'votar 2019', 'votar goty 2019', 'voto 2019', 'survey 2019'], label: '🗳️ Encuesta GOTY 2019 — Votar nominados', url: 'encuesta.html', icon: '🗳️' },
    { keywords: ['encuesta 2020', 'votar 2020', 'votar goty 2020', 'voto 2020', 'survey 2020'], label: '🗳️ Encuesta GOTY 2020 — Votar nominados', url: 'encuesta.html', icon: '🗳️' },
    { keywords: ['encuesta 2021', 'votar 2021', 'votar goty 2021', 'voto 2021', 'survey 2021'], label: '🗳️ Encuesta GOTY 2021 — Votar nominados', url: 'encuesta.html', icon: '🗳️' },
    { keywords: ['encuesta 2022', 'votar 2022', 'votar goty 2022', 'voto 2022', 'survey 2022'], label: '🗳️ Encuesta GOTY 2022 — Votar nominados', url: 'encuesta.html', icon: '🗳️' },
    { keywords: ['encuesta 2023', 'votar 2023', 'votar goty 2023', 'voto 2023', 'survey 2023'], label: '🗳️ Encuesta GOTY 2023 — Votar nominados', url: 'encuesta.html', icon: '🗳️' },
    { keywords: ['encuesta 2024', 'votar 2024', 'votar goty 2024', 'voto 2024', 'survey 2024'], label: '🗳️ Encuesta GOTY 2024 — Votar nominados', url: 'encuesta.html', icon: '🗳️' },
    { keywords: ['encuesta 2025', 'votar 2025', 'votar goty 2025', 'voto 2025', 'survey 2025'], label: '🗳️ Encuesta GOTY 2025 — Votar nominados', url: 'encuesta.html', icon: '🗳️' },
    { keywords: ['game of the year 2014', 'juego del año 2014', 'mejor game of the year 2014', 'dragon age: inquisition', 'dragon age: inquisition 2014'], label: '2014 — Game of the Year: Dragon Age: Inquisition', url: 'Años/2014.html#cat-goty', icon: '🏆' },
    { keywords: ['best independent game 2014', 'mejor juego independiente 2014', 'mejor best independent game 2014', 'shovel knight', 'shovel knight 2014'], label: '2014 — Best Independent Game: Shovel Knight', url: 'Años/2014.html#cat-indie', icon: '🌱' },
    { keywords: ['best narrative 2014', 'mejor narrativa 2014', 'mejor best narrative 2014', 'valiant hearts: the great war', 'valiant hearts: the great war 2014'], label: '2014 — Best Narrative: Valiant Hearts: The Great War', url: 'Años/2014.html#cat-narrative', icon: '📖' },
    { keywords: ['best art direction 2014', 'mejor dirección de arte 2014', 'mejor best art direction 2014', 'monument valley', 'monument valley 2014'], label: '2014 — Best Art Direction: Monument Valley', url: 'Años/2014.html#cat-art', icon: '🎨' },
    { keywords: ['best soundtrack 2014', 'mejor banda sonora 2014', 'mejor best soundtrack 2014', 'destiny', 'destiny 2014'], label: '2014 — Best Soundtrack: Destiny', url: 'Años/2014.html#cat-soundtrack', icon: '🎵' },
    { keywords: ['best multiplayer 2014', 'mejor multijugador 2014', 'mejor best multiplayer 2014', 'destiny', 'destiny 2014'], label: '2014 — Best Multiplayer: Destiny', url: 'Años/2014.html#cat-multiplayer', icon: '👥' },
    { keywords: ['best game direction 2014', 'mejor dirección de juego 2014', 'mejor best game direction 2014', 'nintendo', 'nintendo 2014'], label: '2014 — Best Game Direction: Nintendo', url: 'Años/2014.html#cat-direction', icon: '🎬' },
    { keywords: ['game of the year 2015', 'juego del año 2015', 'mejor game of the year 2015', 'the witcher 3: wild hunt', 'the witcher 3: wild hunt 2015'], label: '2015 — Game of the Year: The Witcher 3: Wild Hunt', url: 'Años/2015.html#cat-goty', icon: '🏆' },
    { keywords: ['best independent game 2015', 'mejor juego independiente 2015', 'mejor best independent game 2015', 'rocket league', 'rocket league 2015'], label: '2015 — Best Independent Game: Rocket League', url: 'Años/2015.html#cat-indie', icon: '🌱' },
    { keywords: ['best narrative 2015', 'mejor narrativa 2015', 'mejor best narrative 2015', 'her story', 'her story 2015'], label: '2015 — Best Narrative: Her Story', url: 'Años/2015.html#cat-narrative', icon: '📖' },
    { keywords: ['best art direction 2015', 'mejor dirección de arte 2015', 'mejor best art direction 2015', 'ori and the blind forest', 'ori and the blind forest 2015'], label: '2015 — Best Art Direction: Ori and the Blind Forest', url: 'Años/2015.html#cat-art', icon: '🎨' },
    { keywords: ['best soundtrack 2015', 'mejor banda sonora 2015', 'mejor best soundtrack 2015', 'metal gear solid v: the phantom pain', 'metal gear solid v: the phantom pain 2015'], label: '2015 — Best Soundtrack: Metal Gear Solid V: The Phantom Pain', url: 'Años/2015.html#cat-soundtrack', icon: '🎵' },
    { keywords: ['best multiplayer 2015', 'mejor multijugador 2015', 'mejor best multiplayer 2015', 'splatoon', 'splatoon 2015'], label: '2015 — Best Multiplayer: Splatoon', url: 'Años/2015.html#cat-multiplayer', icon: '👥' },
    { keywords: ['best game direction 2015', 'mejor dirección de juego 2015', 'mejor best game direction 2015', 'cd projekt red', 'cd projekt red 2015'], label: '2015 — Best Game Direction: CD Projekt Red', url: 'Años/2015.html#cat-direction', icon: '🎬' },
    { keywords: ['game of the year 2016', 'juego del año 2016', 'mejor game of the year 2016', 'overwatch', 'overwatch 2016'], label: '2016 — Game of the Year: Overwatch', url: 'Años/2016.html#cat-goty', icon: '🏆' },
    { keywords: ['best independent game 2016', 'mejor juego independiente 2016', 'mejor best independent game 2016', 'inside', 'inside 2016'], label: '2016 — Best Independent Game: Inside', url: 'Años/2016.html#cat-indie', icon: '🌱' },
    { keywords: ['best narrative 2016', 'mejor narrativa 2016', 'mejor best narrative 2016', 'uncharted 4: a thief\'s end', 'uncharted 4: a thief\'s end 2016'], label: '2016 — Best Narrative: Uncharted 4: A Thief\'s End', url: 'Años/2016.html#cat-narrative', icon: '📖' },
    { keywords: ['best art direction 2016', 'mejor dirección de arte 2016', 'mejor best art direction 2016', 'inside', 'inside 2016'], label: '2016 — Best Art Direction: Inside', url: 'Años/2016.html#cat-art', icon: '🎨' },
    { keywords: ['best soundtrack 2016', 'mejor banda sonora 2016', 'mejor best soundtrack 2016', 'doom', 'doom 2016'], label: '2016 — Best Soundtrack: Doom', url: 'Años/2016.html#cat-soundtrack', icon: '🎵' },
    { keywords: ['best multiplayer 2016', 'mejor multijugador 2016', 'mejor best multiplayer 2016', 'overwatch', 'overwatch 2016'], label: '2016 — Best Multiplayer: Overwatch', url: 'Años/2016.html#cat-multiplayer', icon: '👥' },
    { keywords: ['best game direction 2016', 'mejor dirección de juego 2016', 'mejor best game direction 2016', 'blizzard entertainment', 'blizzard entertainment 2016'], label: '2016 — Best Game Direction: Blizzard Entertainment', url: 'Años/2016.html#cat-direction', icon: '🎬' },
    { keywords: ['game of the year 2017', 'juego del año 2017', 'mejor game of the year 2017', 'the legend of zelda: breath of the wild', 'the legend of zelda: breath of the wild 2017'], label: '2017 — Game of the Year: The Legend of Zelda: Breath of the Wild', url: 'Años/2017.html#cat-goty', icon: '🏆' },
    { keywords: ['best independent game 2017', 'mejor juego independiente 2017', 'mejor best independent game 2017', 'cuphead', 'cuphead 2017'], label: '2017 — Best Independent Game: Cuphead', url: 'Años/2017.html#cat-indie', icon: '🌱' },
    { keywords: ['best narrative 2017', 'mejor narrativa 2017', 'mejor best narrative 2017', 'what remains of edith finch', 'what remains of edith finch 2017'], label: '2017 — Best Narrative: What Remains of Edith Finch', url: 'Años/2017.html#cat-narrative', icon: '📖' },
    { keywords: ['best art direction 2017', 'mejor dirección de arte 2017', 'mejor best art direction 2017', 'cuphead', 'cuphead 2017'], label: '2017 — Best Art Direction: Cuphead', url: 'Años/2017.html#cat-art', icon: '🎨' },
    { keywords: ['best soundtrack 2017', 'mejor banda sonora 2017', 'mejor best soundtrack 2017', 'nier: automata', 'nier: automata 2017'], label: '2017 — Best Soundtrack: NieR: Automata', url: 'Años/2017.html#cat-soundtrack', icon: '🎵' },
    { keywords: ['best multiplayer 2017', 'mejor multijugador 2017', 'mejor best multiplayer 2017', 'playerunknown\'s battlegrounds', 'playerunknown\'s battlegrounds 2017'], label: '2017 — Best Multiplayer: PlayerUnknown\'s Battlegrounds', url: 'Años/2017.html#cat-multiplayer', icon: '👥' },
    { keywords: ['best game direction 2017', 'mejor dirección de juego 2017', 'mejor best game direction 2017', 'the legend of zelda: breath of the wild', 'the legend of zelda: breath of the wild 2017'], label: '2017 — Best Game Direction: The Legend of Zelda: Breath of the Wild', url: 'Años/2017.html#cat-direction', icon: '🎬' },
    { keywords: ['game of the year 2018', 'juego del año 2018', 'mejor game of the year 2018', 'god of war', 'god of war 2018'], label: '2018 — Game of the Year: God of War', url: 'Años/2018.html#cat-goty', icon: '🏆' },
    { keywords: ['best independent game 2018', 'mejor juego independiente 2018', 'mejor best independent game 2018', 'celeste', 'celeste 2018'], label: '2018 — Best Independent Game: Celeste', url: 'Años/2018.html#cat-indie', icon: '🌱' },
    { keywords: ['best narrative 2018', 'mejor narrativa 2018', 'mejor best narrative 2018', 'red dead redemption 2', 'red dead redemption 2 2018'], label: '2018 — Best Narrative: Red Dead Redemption 2', url: 'Años/2018.html#cat-narrative', icon: '📖' },
    { keywords: ['best art direction 2018', 'mejor dirección de arte 2018', 'mejor best art direction 2018', 'return of the obra dinn', 'return of the obra dinn 2018'], label: '2018 — Best Art Direction: Return of the Obra Dinn', url: 'Años/2018.html#cat-art', icon: '🎨' },
    { keywords: ['best soundtrack 2018', 'mejor banda sonora 2018', 'mejor best soundtrack 2018', 'red dead redemption 2', 'red dead redemption 2 2018'], label: '2018 — Best Soundtrack: Red Dead Redemption 2', url: 'Años/2018.html#cat-soundtrack', icon: '🎵' },
    { keywords: ['best multiplayer 2018', 'mejor multijugador 2018', 'mejor best multiplayer 2018', 'fortnite', 'fortnite 2018'], label: '2018 — Best Multiplayer: Fortnite', url: 'Años/2018.html#cat-multiplayer', icon: '👥' },
    { keywords: ['best game direction 2018', 'mejor dirección de juego 2018', 'mejor best game direction 2018', 'god of war', 'god of war 2018'], label: '2018 — Best Game Direction: God of War', url: 'Años/2018.html#cat-direction', icon: '🎬' },
    { keywords: ['game of the year 2019', 'juego del año 2019', 'mejor game of the year 2019', 'sekiro: shadows die twice', 'sekiro: shadows die twice 2019'], label: '2019 — Game of the Year: Sekiro: Shadows Die Twice', url: 'Años/2019.html#cat-goty', icon: '🏆' },
    { keywords: ['best independent game 2019', 'mejor juego independiente 2019', 'mejor best independent game 2019', 'disco elysium', 'disco elysium 2019'], label: '2019 — Best Independent Game: Disco Elysium', url: 'Años/2019.html#cat-indie', icon: '🌱' },
    { keywords: ['best narrative 2019', 'mejor narrativa 2019', 'mejor best narrative 2019', 'disco elysium', 'disco elysium 2019'], label: '2019 — Best Narrative: Disco Elysium', url: 'Años/2019.html#cat-narrative', icon: '📖' },
    { keywords: ['best art direction 2019', 'mejor dirección de arte 2019', 'mejor best art direction 2019', 'control', 'control 2019'], label: '2019 — Best Art Direction: Control', url: 'Años/2019.html#cat-art', icon: '🎨' },
    { keywords: ['best soundtrack 2019', 'mejor banda sonora 2019', 'mejor best soundtrack 2019', 'death stranding', 'death stranding 2019'], label: '2019 — Best Soundtrack: Death Stranding', url: 'Años/2019.html#cat-soundtrack', icon: '🎵' },
    { keywords: ['best multiplayer 2019', 'mejor multijugador 2019', 'mejor best multiplayer 2019', 'apex legends', 'apex legends 2019'], label: '2019 — Best Multiplayer: Apex Legends', url: 'Años/2019.html#cat-multiplayer', icon: '👥' },
    { keywords: ['best game direction 2019', 'mejor dirección de juego 2019', 'mejor best game direction 2019', 'death stranding', 'death stranding 2019'], label: '2019 — Best Game Direction: Death Stranding', url: 'Años/2019.html#cat-direction', icon: '🎬' },
    { keywords: ['game of the year 2020', 'juego del año 2020', 'mejor game of the year 2020', 'the last of us part ii', 'the last of us part ii 2020'], label: '2020 — Game of the Year: The Last of Us Part II', url: 'Años/2020.html#cat-goty', icon: '🏆' },
    { keywords: ['best independent game 2020', 'mejor juego independiente 2020', 'mejor best independent game 2020', 'hades', 'hades 2020'], label: '2020 — Best Independent Game: Hades', url: 'Años/2020.html#cat-indie', icon: '🌱' },
    { keywords: ['best narrative 2020', 'mejor narrativa 2020', 'mejor best narrative 2020', 'the last of us part ii', 'the last of us part ii 2020'], label: '2020 — Best Narrative: The Last of Us Part II', url: 'Años/2020.html#cat-narrative', icon: '📖' },
    { keywords: ['best art direction 2020', 'mejor dirección de arte 2020', 'mejor best art direction 2020', 'ghost of tsushima', 'ghost of tsushima 2020'], label: '2020 — Best Art Direction: Ghost of Tsushima', url: 'Años/2020.html#cat-art', icon: '🎨' },
    { keywords: ['best soundtrack 2020', 'mejor banda sonora 2020', 'mejor best soundtrack 2020', 'final fantasy vii remake', 'final fantasy vii remake 2020'], label: '2020 — Best Soundtrack: Final Fantasy VII Remake', url: 'Años/2020.html#cat-soundtrack', icon: '🎵' },
    { keywords: ['best multiplayer 2020', 'mejor multijugador 2020', 'mejor best multiplayer 2020', 'among us', 'among us 2020'], label: '2020 — Best Multiplayer: Among Us', url: 'Años/2020.html#cat-multiplayer', icon: '👥' },
    { keywords: ['best game direction 2020', 'mejor dirección de juego 2020', 'mejor best game direction 2020', 'the last of us part ii', 'the last of us part ii 2020'], label: '2020 — Best Game Direction: The Last of Us Part II', url: 'Años/2020.html#cat-direction', icon: '🎬' },
    { keywords: ['game of the year 2021', 'juego del año 2021', 'mejor game of the year 2021', 'it takes two', 'it takes two 2021'], label: '2021 — Game of the Year: It Takes Two', url: 'Años/2021.html#cat-goty', icon: '🏆' },
    { keywords: ['best independent game 2021', 'mejor juego independiente 2021', 'mejor best independent game 2021', 'kena: bridge of spirits', 'kena: bridge of spirits 2021'], label: '2021 — Best Independent Game: Kena: Bridge of Spirits', url: 'Años/2021.html#cat-indie', icon: '🌱' },
    { keywords: ['best narrative 2021', 'mejor narrativa 2021', 'mejor best narrative 2021', 'marvel\'s guardians of the galaxy', 'marvel\'s guardians of the galaxy 2021'], label: '2021 — Best Narrative: Marvel\'s Guardians of the Galaxy', url: 'Años/2021.html#cat-narrative', icon: '📖' },
    { keywords: ['best art direction 2021', 'mejor dirección de arte 2021', 'mejor best art direction 2021', 'deathloop', 'deathloop 2021'], label: '2021 — Best Art Direction: Deathloop', url: 'Años/2021.html#cat-art', icon: '🎨' },
    { keywords: ['best soundtrack 2021', 'mejor banda sonora 2021', 'mejor best soundtrack 2021', 'nier replicant ver.1.22474487139...', 'nier replicant ver.1.22474487139... 2021'], label: '2021 — Best Soundtrack: NieR Replicant ver.1.22474487139...', url: 'Años/2021.html#cat-soundtrack', icon: '🎵' },
    { keywords: ['best multiplayer 2021', 'mejor multijugador 2021', 'mejor best multiplayer 2021', 'it takes two', 'it takes two 2021'], label: '2021 — Best Multiplayer: It Takes Two', url: 'Años/2021.html#cat-multiplayer', icon: '👥' },
    { keywords: ['best game direction 2021', 'mejor dirección de juego 2021', 'mejor best game direction 2021', 'deathloop', 'deathloop 2021'], label: '2021 — Best Game Direction: Deathloop', url: 'Años/2021.html#cat-direction', icon: '🎬' },
    { keywords: ['game of the year 2022', 'juego del año 2022', 'mejor game of the year 2022', 'elden ring', 'elden ring 2022'], label: '2022 — Game of the Year: Elden Ring', url: 'Años/2022.html#cat-goty', icon: '🏆' },
    { keywords: ['best independent game 2022', 'mejor juego independiente 2022', 'mejor best independent game 2022', 'stray', 'stray 2022'], label: '2022 — Best Independent Game: Stray', url: 'Años/2022.html#cat-indie', icon: '🌱' },
    { keywords: ['best narrative 2022', 'mejor narrativa 2022', 'mejor best narrative 2022', 'god of war ragnarök', 'god of war ragnarök 2022'], label: '2022 — Best Narrative: God of War Ragnarök', url: 'Años/2022.html#cat-narrative', icon: '📖' },
    { keywords: ['best art direction 2022', 'mejor dirección de arte 2022', 'mejor best art direction 2022', 'elden ring', 'elden ring 2022'], label: '2022 — Best Art Direction: Elden Ring', url: 'Años/2022.html#cat-art', icon: '🎨' },
    { keywords: ['best soundtrack 2022', 'mejor banda sonora 2022', 'mejor best soundtrack 2022', 'god of war ragnarök', 'god of war ragnarök 2022'], label: '2022 — Best Soundtrack: God of War Ragnarök', url: 'Años/2022.html#cat-soundtrack', icon: '🎵' },
    { keywords: ['best multiplayer 2022', 'mejor multijugador 2022', 'mejor best multiplayer 2022', 'splatoon 3', 'splatoon 3 2022'], label: '2022 — Best Multiplayer: Splatoon 3', url: 'Años/2022.html#cat-multiplayer', icon: '👥' },
    { keywords: ['best game direction 2022', 'mejor dirección de juego 2022', 'mejor best game direction 2022', 'elden ring', 'elden ring 2022'], label: '2022 — Best Game Direction: Elden Ring', url: 'Años/2022.html#cat-direction', icon: '🎬' },
    { keywords: ['game of the year 2023', 'juego del año 2023', 'mejor game of the year 2023', 'baldur\'s gate 3', 'baldur\'s gate 3 2023'], label: '2023 — Game of the Year: Baldur\'s Gate 3', url: 'Años/2023.html#cat-goty', icon: '🏆' },
    { keywords: ['best independent game 2023', 'mejor juego independiente 2023', 'mejor best independent game 2023', 'sea of stars', 'sea of stars 2023'], label: '2023 — Best Independent Game: Sea of Stars', url: 'Años/2023.html#cat-indie', icon: '🌱' },
    { keywords: ['best narrative 2023', 'mejor narrativa 2023', 'mejor best narrative 2023', 'alan wake 2', 'alan wake 2 2023'], label: '2023 — Best Narrative: Alan Wake 2', url: 'Años/2023.html#cat-narrative', icon: '📖' },
    { keywords: ['best art direction 2023', 'mejor dirección de arte 2023', 'mejor best art direction 2023', 'alan wake 2', 'alan wake 2 2023'], label: '2023 — Best Art Direction: Alan Wake 2', url: 'Años/2023.html#cat-art', icon: '🎨' },
    { keywords: ['best soundtrack 2023', 'mejor banda sonora 2023', 'mejor best soundtrack 2023', 'final fantasy xvi', 'final fantasy xvi 2023'], label: '2023 — Best Soundtrack: Final Fantasy XVI', url: 'Años/2023.html#cat-soundtrack', icon: '🎵' },
    { keywords: ['best multiplayer 2023', 'mejor multijugador 2023', 'mejor best multiplayer 2023', 'baldur\'s gate 3', 'baldur\'s gate 3 2023'], label: '2023 — Best Multiplayer: Baldur\'s Gate 3', url: 'Años/2023.html#cat-multiplayer', icon: '👥' },
    { keywords: ['best game direction 2023', 'mejor dirección de juego 2023', 'mejor best game direction 2023', 'alan wake 2', 'alan wake 2 2023'], label: '2023 — Best Game Direction: Alan Wake 2', url: 'Años/2023.html#cat-direction', icon: '🎬' },
    { keywords: ['game of the year 2024', 'juego del año 2024', 'mejor game of the year 2024', 'astro bot', 'astro bot 2024'], label: '2024 — Game of the Year: Astro Bot', url: 'Años/2024.html#cat-goty', icon: '🏆' },
    { keywords: ['best independent game 2024', 'mejor juego independiente 2024', 'mejor best independent game 2024', 'balatro', 'balatro 2024'], label: '2024 — Best Independent Game: Balatro', url: 'Años/2024.html#cat-indie', icon: '🌱' },
    { keywords: ['best narrative 2024', 'mejor narrativa 2024', 'mejor best narrative 2024', 'metaphor: refantazio', 'metaphor: refantazio 2024'], label: '2024 — Best Narrative: Metaphor: ReFantazio', url: 'Años/2024.html#cat-narrative', icon: '📖' },
    { keywords: ['best art direction 2024', 'mejor dirección de arte 2024', 'mejor best art direction 2024', 'metaphor: refantazio', 'metaphor: refantazio 2024'], label: '2024 — Best Art Direction: Metaphor: ReFantazio', url: 'Años/2024.html#cat-art', icon: '🎨' },
    { keywords: ['best soundtrack 2024', 'mejor banda sonora 2024', 'mejor best soundtrack 2024', 'final fantasy vii rebirth', 'final fantasy vii rebirth 2024'], label: '2024 — Best Soundtrack: Final Fantasy VII Rebirth', url: 'Años/2024.html#cat-soundtrack', icon: '🎵' },
    { keywords: ['best multiplayer 2024', 'mejor multijugador 2024', 'mejor best multiplayer 2024', 'helldivers 2', 'helldivers 2 2024'], label: '2024 — Best Multiplayer: Helldivers 2', url: 'Años/2024.html#cat-multiplayer', icon: '👥' },
    { keywords: ['best game direction 2024', 'mejor dirección de juego 2024', 'mejor best game direction 2024', 'astro bot', 'astro bot 2024'], label: '2024 — Best Game Direction: Astro Bot', url: 'Años/2024.html#cat-direction', icon: '🎬' },
    { keywords: ['game of the year 2025', 'juego del año 2025', 'mejor game of the year 2025', 'clair obscur: expedition 33', 'clair obscur: expedition 33 2025'], label: '2025 — Game of the Year: Clair Obscur: Expedition 33', url: 'Años/2025.html#cat-goty', icon: '🏆' },
    { keywords: ['best independent game 2025', 'mejor juego independiente 2025', 'mejor best independent game 2025', 'clair obscur: expedition 33', 'clair obscur: expedition 33 2025'], label: '2025 — Best Independent Game: Clair Obscur: Expedition 33', url: 'Años/2025.html#cat-indie', icon: '🌱' },
    { keywords: ['best narrative 2025', 'mejor narrativa 2025', 'mejor best narrative 2025', 'clair obscur: expedition 33', 'clair obscur: expedition 33 2025'], label: '2025 — Best Narrative: Clair Obscur: Expedition 33', url: 'Años/2025.html#cat-narrative', icon: '📖' },
    { keywords: ['best art direction 2025', 'mejor dirección de arte 2025', 'mejor best art direction 2025', 'clair obscur: expedition 33', 'clair obscur: expedition 33 2025'], label: '2025 — Best Art Direction: Clair Obscur: Expedition 33', url: 'Años/2025.html#cat-art', icon: '🎨' },
    { keywords: ['best soundtrack 2025', 'mejor banda sonora 2025', 'mejor best soundtrack 2025', 'clair obscur: expedition 33', 'clair obscur: expedition 33 2025'], label: '2025 — Best Soundtrack: Clair Obscur: Expedition 33', url: 'Años/2025.html#cat-soundtrack', icon: '🎵' },
    { keywords: ['best multiplayer 2025', 'mejor multijugador 2025', 'mejor best multiplayer 2025', 'arc raiders', 'arc raiders 2025'], label: '2025 — Best Multiplayer: Arc Raiders', url: 'Años/2025.html#cat-multiplayer', icon: '👥' },
    { keywords: ['best game direction 2025', 'mejor dirección de juego 2025', 'mejor best game direction 2025', 'clair obscur: expedition 33', 'clair obscur: expedition 33 2025'], label: '2025 — Best Game Direction: Clair Obscur: Expedition 33', url: 'Años/2025.html#cat-direction', icon: '🎬' },
    { keywords: ['bayonetta 2', 'bayonetta 2 2014', 'bayonetta 2 game of the year'], label: 'Bayonetta 2 (2014 · Game of the Year)', url: 'Años/2014.html#cat-goty', icon: '🎮' },
    { keywords: ['dark souls ii', 'dark souls ii 2014', 'dark souls ii game of the year'], label: 'Dark Souls II (2014 · Game of the Year)', url: 'Años/2014.html#cat-goty', icon: '🎮' },
    { keywords: ['hearthstone', 'hearthstone 2014', 'hearthstone game of the year'], label: 'Hearthstone (2014 · Game of the Year)', url: 'Años/2014.html#cat-goty', icon: '🎮' },
    { keywords: ['middle-earth: shadow of mordor', 'middle-earth: shadow of mordor 2014', 'middle-earth: shadow of mordor game of the year'], label: 'Middle-earth: Shadow of Mordor (2014 · Game of the Year)', url: 'Años/2014.html#cat-goty', icon: '🎮' },
    { keywords: ['broken age part 1', 'broken age part 1 2014', 'broken age part 1 best independent game'], label: 'Broken Age Part 1 (2014 · Best Independent Game)', url: 'Años/2014.html#cat-indie', icon: '🎮' },
    { keywords: ['monument valley', 'monument valley 2014', 'monument valley best independent game'], label: 'Monument Valley (2014 · Best Independent Game)', url: 'Años/2014.html#cat-indie', icon: '🎮' },
    { keywords: ['transistor', 'transistor 2014', 'transistor best independent game'], label: 'Transistor (2014 · Best Independent Game)', url: 'Años/2014.html#cat-indie', icon: '🎮' },
    { keywords: ['the vanishing of ethan carter', 'the vanishing of ethan carter 2014', 'the vanishing of ethan carter best independent game'], label: 'The Vanishing of Ethan Carter (2014 · Best Independent Game)', url: 'Años/2014.html#cat-indie', icon: '🎮' },
    { keywords: ['south park: the stick of truth', 'south park: the stick of truth 2014', 'south park: the stick of truth best narrative'], label: 'South Park: The Stick of Truth (2014 · Best Narrative)', url: 'Años/2014.html#cat-narrative', icon: '🎮' },
    { keywords: ['the walking dead: season two', 'the walking dead: season two 2014', 'the walking dead: season two best narrative'], label: 'The Walking Dead: Season Two (2014 · Best Narrative)', url: 'Años/2014.html#cat-narrative', icon: '🎮' },
    { keywords: ['the wolf among us', 'the wolf among us 2014', 'the wolf among us best narrative'], label: 'The Wolf Among Us (2014 · Best Narrative)', url: 'Años/2014.html#cat-narrative', icon: '🎮' },
    { keywords: ['wolfenstein: the new order', 'wolfenstein: the new order 2014', 'wolfenstein: the new order best narrative'], label: 'Wolfenstein: The New Order (2014 · Best Narrative)', url: 'Años/2014.html#cat-narrative', icon: '🎮' },
    { keywords: ['assassin\'s creed unity', 'assassin\'s creed unity 2014', 'assassin\'s creed unity best art direction'], label: 'Assassin\'s Creed Unity (2014 · Best Art Direction)', url: 'Años/2014.html#cat-art', icon: '🎮' },
    { keywords: ['child of light', 'child of light 2014', 'child of light best art direction'], label: 'Child of Light (2014 · Best Art Direction)', url: 'Años/2014.html#cat-art', icon: '🎮' },
    { keywords: ['destiny', 'destiny 2014', 'destiny best art direction'], label: 'Destiny (2014 · Best Art Direction)', url: 'Años/2014.html#cat-art', icon: '🎮' },
    { keywords: ['sunset overdrive', 'sunset overdrive 2014', 'sunset overdrive best art direction'], label: 'Sunset Overdrive (2014 · Best Art Direction)', url: 'Años/2014.html#cat-art', icon: '🎮' },
    { keywords: ['alien: isolation', 'alien: isolation 2014', 'alien: isolation best soundtrack'], label: 'Alien: Isolation (2014 · Best Soundtrack)', url: 'Años/2014.html#cat-soundtrack', icon: '🎮' },
    { keywords: ['child of light', 'child of light 2014', 'child of light best soundtrack'], label: 'Child of Light (2014 · Best Soundtrack)', url: 'Años/2014.html#cat-soundtrack', icon: '🎮' },
    { keywords: ['sunset overdrive', 'sunset overdrive 2014', 'sunset overdrive best soundtrack'], label: 'Sunset Overdrive (2014 · Best Soundtrack)', url: 'Años/2014.html#cat-soundtrack', icon: '🎮' },
    { keywords: ['transistor', 'transistor 2014', 'transistor best soundtrack'], label: 'Transistor (2014 · Best Soundtrack)', url: 'Años/2014.html#cat-soundtrack', icon: '🎮' },
    { keywords: ['call of duty: advanced warfare', 'call of duty: advanced warfare 2014', 'call of duty: advanced warfare best multiplayer'], label: 'Call of Duty: Advanced Warfare (2014 · Best Multiplayer)', url: 'Años/2014.html#cat-multiplayer', icon: '🎮' },
    { keywords: ['dark souls ii', 'dark souls ii 2014', 'dark souls ii best multiplayer'], label: 'Dark Souls II (2014 · Best Multiplayer)', url: 'Años/2014.html#cat-multiplayer', icon: '🎮' },
    { keywords: ['hearthstone', 'hearthstone 2014', 'hearthstone best multiplayer'], label: 'Hearthstone (2014 · Best Multiplayer)', url: 'Años/2014.html#cat-multiplayer', icon: '🎮' },
    { keywords: ['titanfall', 'titanfall 2014', 'titanfall best multiplayer'], label: 'Titanfall (2014 · Best Multiplayer)', url: 'Años/2014.html#cat-multiplayer', icon: '🎮' },
    { keywords: ['blizzard entertainment', 'blizzard entertainment 2014', 'blizzard entertainment best game direction'], label: 'Blizzard Entertainment (2014 · Best Game Direction)', url: 'Años/2014.html#cat-direction', icon: '🎮' },
    { keywords: ['monolith productions', 'monolith productions 2014', 'monolith productions best game direction'], label: 'Monolith Productions (2014 · Best Game Direction)', url: 'Años/2014.html#cat-direction', icon: '🎮' },
    { keywords: ['telltale games', 'telltale games 2014', 'telltale games best game direction'], label: 'Telltale Games (2014 · Best Game Direction)', url: 'Años/2014.html#cat-direction', icon: '🎮' },
    { keywords: ['ubisoft montreal', 'ubisoft montreal 2014', 'ubisoft montreal best game direction'], label: 'Ubisoft Montreal (2014 · Best Game Direction)', url: 'Años/2014.html#cat-direction', icon: '🎮' },
    { keywords: ['bloodborne', 'bloodborne 2015', 'bloodborne game of the year'], label: 'Bloodborne (2015 · Game of the Year)', url: 'Años/2015.html#cat-goty', icon: '🎮' },
    { keywords: ['fallout 4', 'fallout 4 2015', 'fallout 4 game of the year'], label: 'Fallout 4 (2015 · Game of the Year)', url: 'Años/2015.html#cat-goty', icon: '🎮' },
    { keywords: ['metal gear solid v: the phantom pain', 'metal gear solid v: the phantom pain 2015', 'metal gear solid v: the phantom pain game of the year'], label: 'Metal Gear Solid V: The Phantom Pain (2015 · Game of the Year)', url: 'Años/2015.html#cat-goty', icon: '🎮' },
    { keywords: ['super mario maker', 'super mario maker 2015', 'super mario maker game of the year'], label: 'Super Mario Maker (2015 · Game of the Year)', url: 'Años/2015.html#cat-goty', icon: '🎮' },
    { keywords: ['axiom verge', 'axiom verge 2015', 'axiom verge best independent game'], label: 'Axiom Verge (2015 · Best Independent Game)', url: 'Años/2015.html#cat-indie', icon: '🎮' },
    { keywords: ['her story', 'her story 2015', 'her story best independent game'], label: 'Her Story (2015 · Best Independent Game)', url: 'Años/2015.html#cat-indie', icon: '🎮' },
    { keywords: ['ori and the blind forest', 'ori and the blind forest 2015', 'ori and the blind forest best independent game'], label: 'Ori and the Blind Forest (2015 · Best Independent Game)', url: 'Años/2015.html#cat-indie', icon: '🎮' },
    { keywords: ['undertale', 'undertale 2015', 'undertale best independent game'], label: 'Undertale (2015 · Best Independent Game)', url: 'Años/2015.html#cat-indie', icon: '🎮' },
    { keywords: ['life is strange', 'life is strange 2015', 'life is strange best narrative'], label: 'Life Is Strange (2015 · Best Narrative)', url: 'Años/2015.html#cat-narrative', icon: '🎮' },
    { keywords: ['tales from the borderlands', 'tales from the borderlands 2015', 'tales from the borderlands best narrative'], label: 'Tales from the Borderlands (2015 · Best Narrative)', url: 'Años/2015.html#cat-narrative', icon: '🎮' },
    { keywords: ['the witcher 3: wild hunt', 'the witcher 3: wild hunt 2015', 'the witcher 3: wild hunt best narrative'], label: 'The Witcher 3: Wild Hunt (2015 · Best Narrative)', url: 'Años/2015.html#cat-narrative', icon: '🎮' },
    { keywords: ['until dawn', 'until dawn 2015', 'until dawn best narrative'], label: 'Until Dawn (2015 · Best Narrative)', url: 'Años/2015.html#cat-narrative', icon: '🎮' },
    { keywords: ['batman: arkham knight', 'batman: arkham knight 2015', 'batman: arkham knight best art direction'], label: 'Batman: Arkham Knight (2015 · Best Art Direction)', url: 'Años/2015.html#cat-art', icon: '🎮' },
    { keywords: ['bloodborne', 'bloodborne 2015', 'bloodborne best art direction'], label: 'Bloodborne (2015 · Best Art Direction)', url: 'Años/2015.html#cat-art', icon: '🎮' },
    { keywords: ['metal gear solid v: the phantom pain', 'metal gear solid v: the phantom pain 2015', 'metal gear solid v: the phantom pain best art direction'], label: 'Metal Gear Solid V: The Phantom Pain (2015 · Best Art Direction)', url: 'Años/2015.html#cat-art', icon: '🎮' },
    { keywords: ['the witcher 3: wild hunt', 'the witcher 3: wild hunt 2015', 'the witcher 3: wild hunt best art direction'], label: 'The Witcher 3: Wild Hunt (2015 · Best Art Direction)', url: 'Años/2015.html#cat-art', icon: '🎮' },
    { keywords: ['fallout 4', 'fallout 4 2015', 'fallout 4 best soundtrack'], label: 'Fallout 4 (2015 · Best Soundtrack)', url: 'Años/2015.html#cat-soundtrack', icon: '🎮' },
    { keywords: ['halo 5: guardians', 'halo 5: guardians 2015', 'halo 5: guardians best soundtrack'], label: 'Halo 5: Guardians (2015 · Best Soundtrack)', url: 'Años/2015.html#cat-soundtrack', icon: '🎮' },
    { keywords: ['ori and the blind forest', 'ori and the blind forest 2015', 'ori and the blind forest best soundtrack'], label: 'Ori and the Blind Forest (2015 · Best Soundtrack)', url: 'Años/2015.html#cat-soundtrack', icon: '🎮' },
    { keywords: ['the witcher 3: wild hunt', 'the witcher 3: wild hunt 2015', 'the witcher 3: wild hunt best soundtrack'], label: 'The Witcher 3: Wild Hunt (2015 · Best Soundtrack)', url: 'Años/2015.html#cat-soundtrack', icon: '🎮' },
    { keywords: ['call of duty: black ops iii', 'call of duty: black ops iii 2015', 'call of duty: black ops iii best multiplayer'], label: 'Call of Duty: Black Ops III (2015 · Best Multiplayer)', url: 'Años/2015.html#cat-multiplayer', icon: '🎮' },
    { keywords: ['destiny: the taken king', 'destiny: the taken king 2015', 'destiny: the taken king best multiplayer'], label: 'Destiny: The Taken King (2015 · Best Multiplayer)', url: 'Años/2015.html#cat-multiplayer', icon: '🎮' },
    { keywords: ['halo 5: guardians', 'halo 5: guardians 2015', 'halo 5: guardians best multiplayer'], label: 'Halo 5: Guardians (2015 · Best Multiplayer)', url: 'Años/2015.html#cat-multiplayer', icon: '🎮' },
    { keywords: ['rocket league', 'rocket league 2015', 'rocket league best multiplayer'], label: 'Rocket League (2015 · Best Multiplayer)', url: 'Años/2015.html#cat-multiplayer', icon: '🎮' },
    { keywords: ['bethesda game studios', 'bethesda game studios 2015', 'bethesda game studios best game direction'], label: 'Bethesda Game Studios (2015 · Best Game Direction)', url: 'Años/2015.html#cat-direction', icon: '🎮' },
    { keywords: ['fromsoftware', 'fromsoftware 2015', 'fromsoftware best game direction'], label: 'FromSoftware (2015 · Best Game Direction)', url: 'Años/2015.html#cat-direction', icon: '🎮' },
    { keywords: ['kojima productions', 'kojima productions 2015', 'kojima productions best game direction'], label: 'Kojima Productions (2015 · Best Game Direction)', url: 'Años/2015.html#cat-direction', icon: '🎮' },
    { keywords: ['nintendo', 'nintendo 2015', 'nintendo best game direction'], label: 'Nintendo (2015 · Best Game Direction)', url: 'Años/2015.html#cat-direction', icon: '🎮' },
    { keywords: ['doom', 'doom 2016', 'doom game of the year'], label: 'Doom (2016 · Game of the Year)', url: 'Años/2016.html#cat-goty', icon: '🎮' },
    { keywords: ['inside', 'inside 2016', 'inside game of the year'], label: 'Inside (2016 · Game of the Year)', url: 'Años/2016.html#cat-goty', icon: '🎮' },
    { keywords: ['titanfall 2', 'titanfall 2 2016', 'titanfall 2 game of the year'], label: 'Titanfall 2 (2016 · Game of the Year)', url: 'Años/2016.html#cat-goty', icon: '🎮' },
    { keywords: ['uncharted 4: a thief\'s end', 'uncharted 4: a thief\'s end 2016', 'uncharted 4: a thief\'s end game of the year'], label: 'Uncharted 4: A Thief\'s End (2016 · Game of the Year)', url: 'Años/2016.html#cat-goty', icon: '🎮' },
    { keywords: ['firewatch', 'firewatch 2016', 'firewatch best independent game'], label: 'Firewatch (2016 · Best Independent Game)', url: 'Años/2016.html#cat-indie', icon: '🎮' },
    { keywords: ['hyper light drifter', 'hyper light drifter 2016', 'hyper light drifter best independent game'], label: 'Hyper Light Drifter (2016 · Best Independent Game)', url: 'Años/2016.html#cat-indie', icon: '🎮' },
    { keywords: ['stardew valley', 'stardew valley 2016', 'stardew valley best independent game'], label: 'Stardew Valley (2016 · Best Independent Game)', url: 'Años/2016.html#cat-indie', icon: '🎮' },
    { keywords: ['the witness', 'the witness 2016', 'the witness best independent game'], label: 'The Witness (2016 · Best Independent Game)', url: 'Años/2016.html#cat-indie', icon: '🎮' },
    { keywords: ['firewatch', 'firewatch 2016', 'firewatch best narrative'], label: 'Firewatch (2016 · Best Narrative)', url: 'Años/2016.html#cat-narrative', icon: '🎮' },
    { keywords: ['inside', 'inside 2016', 'inside best narrative'], label: 'Inside (2016 · Best Narrative)', url: 'Años/2016.html#cat-narrative', icon: '🎮' },
    { keywords: ['mafia iii', 'mafia iii 2016', 'mafia iii best narrative'], label: 'Mafia III (2016 · Best Narrative)', url: 'Años/2016.html#cat-narrative', icon: '🎮' },
    { keywords: ['oxenfree', 'oxenfree 2016', 'oxenfree best narrative'], label: 'Oxenfree (2016 · Best Narrative)', url: 'Años/2016.html#cat-narrative', icon: '🎮' },
    { keywords: ['abzû', 'abzû 2016', 'abzû best art direction'], label: 'Abzû (2016 · Best Art Direction)', url: 'Años/2016.html#cat-art', icon: '🎮' },
    { keywords: ['firewatch', 'firewatch 2016', 'firewatch best art direction'], label: 'Firewatch (2016 · Best Art Direction)', url: 'Años/2016.html#cat-art', icon: '🎮' },
    { keywords: ['overwatch', 'overwatch 2016', 'overwatch best art direction'], label: 'Overwatch (2016 · Best Art Direction)', url: 'Años/2016.html#cat-art', icon: '🎮' },
    { keywords: ['uncharted 4: a thief\'s end', 'uncharted 4: a thief\'s end 2016', 'uncharted 4: a thief\'s end best art direction'], label: 'Uncharted 4: A Thief\'s End (2016 · Best Art Direction)', url: 'Años/2016.html#cat-art', icon: '🎮' },
    { keywords: ['battlefield 1', 'battlefield 1 2016', 'battlefield 1 best soundtrack'], label: 'Battlefield 1 (2016 · Best Soundtrack)', url: 'Años/2016.html#cat-soundtrack', icon: '🎮' },
    { keywords: ['inside', 'inside 2016', 'inside best soundtrack'], label: 'Inside (2016 · Best Soundtrack)', url: 'Años/2016.html#cat-soundtrack', icon: '🎮' },
    { keywords: ['rez infinite', 'rez infinite 2016', 'rez infinite best soundtrack'], label: 'Rez Infinite (2016 · Best Soundtrack)', url: 'Años/2016.html#cat-soundtrack', icon: '🎮' },
    { keywords: ['thumper', 'thumper 2016', 'thumper best soundtrack'], label: 'Thumper (2016 · Best Soundtrack)', url: 'Años/2016.html#cat-soundtrack', icon: '🎮' },
    { keywords: ['battlefield 1', 'battlefield 1 2016', 'battlefield 1 best multiplayer'], label: 'Battlefield 1 (2016 · Best Multiplayer)', url: 'Años/2016.html#cat-multiplayer', icon: '🎮' },
    { keywords: ['gears of war 4', 'gears of war 4 2016', 'gears of war 4 best multiplayer'], label: 'Gears of War 4 (2016 · Best Multiplayer)', url: 'Años/2016.html#cat-multiplayer', icon: '🎮' },
    { keywords: ['titanfall 2', 'titanfall 2 2016', 'titanfall 2 best multiplayer'], label: 'Titanfall 2 (2016 · Best Multiplayer)', url: 'Años/2016.html#cat-multiplayer', icon: '🎮' },
    { keywords: ['tom clancy\'s rainbow six siege', 'tom clancy\'s rainbow six siege 2016', 'tom clancy\'s rainbow six siege best multiplayer'], label: 'Tom Clancy\'s Rainbow Six Siege (2016 · Best Multiplayer)', url: 'Años/2016.html#cat-multiplayer', icon: '🎮' },
    { keywords: ['dice', 'dice 2016', 'dice best game direction'], label: 'DICE (2016 · Best Game Direction)', url: 'Años/2016.html#cat-direction', icon: '🎮' },
    { keywords: ['id software', 'id software 2016', 'id software best game direction'], label: 'id Software (2016 · Best Game Direction)', url: 'Años/2016.html#cat-direction', icon: '🎮' },
    { keywords: ['naughty dog', 'naughty dog 2016', 'naughty dog best game direction'], label: 'Naughty Dog (2016 · Best Game Direction)', url: 'Años/2016.html#cat-direction', icon: '🎮' },
    { keywords: ['respawn entertainment', 'respawn entertainment 2016', 'respawn entertainment best game direction'], label: 'Respawn Entertainment (2016 · Best Game Direction)', url: 'Años/2016.html#cat-direction', icon: '🎮' },
    { keywords: ['horizon zero dawn', 'horizon zero dawn 2017', 'horizon zero dawn game of the year'], label: 'Horizon Zero Dawn (2017 · Game of the Year)', url: 'Años/2017.html#cat-goty', icon: '🎮' },
    { keywords: ['persona 5', 'persona 5 2017', 'persona 5 game of the year'], label: 'Persona 5 (2017 · Game of the Year)', url: 'Años/2017.html#cat-goty', icon: '🎮' },
    { keywords: ['playerunknown\'s battlegrounds', 'playerunknown\'s battlegrounds 2017', 'playerunknown\'s battlegrounds game of the year'], label: 'PlayerUnknown\'s Battlegrounds (2017 · Game of the Year)', url: 'Años/2017.html#cat-goty', icon: '🎮' },
    { keywords: ['super mario odyssey', 'super mario odyssey 2017', 'super mario odyssey game of the year'], label: 'Super Mario Odyssey (2017 · Game of the Year)', url: 'Años/2017.html#cat-goty', icon: '🎮' },
    { keywords: ['hellblade: senua\'s sacrifice', 'hellblade: senua\'s sacrifice 2017', 'hellblade: senua\'s sacrifice best independent game'], label: 'Hellblade: Senua\'s Sacrifice (2017 · Best Independent Game)', url: 'Años/2017.html#cat-indie', icon: '🎮' },
    { keywords: ['night in the woods', 'night in the woods 2017', 'night in the woods best independent game'], label: 'Night in the Woods (2017 · Best Independent Game)', url: 'Años/2017.html#cat-indie', icon: '🎮' },
    { keywords: ['pyre', 'pyre 2017', 'pyre best independent game'], label: 'Pyre (2017 · Best Independent Game)', url: 'Años/2017.html#cat-indie', icon: '🎮' },
    { keywords: ['what remains of edith finch', 'what remains of edith finch 2017', 'what remains of edith finch best independent game'], label: 'What Remains of Edith Finch (2017 · Best Independent Game)', url: 'Años/2017.html#cat-indie', icon: '🎮' },
    { keywords: ['hellblade: senua\'s sacrifice', 'hellblade: senua\'s sacrifice 2017', 'hellblade: senua\'s sacrifice best narrative'], label: 'Hellblade: Senua\'s Sacrifice (2017 · Best Narrative)', url: 'Años/2017.html#cat-narrative', icon: '🎮' },
    { keywords: ['horizon zero dawn', 'horizon zero dawn 2017', 'horizon zero dawn best narrative'], label: 'Horizon Zero Dawn (2017 · Best Narrative)', url: 'Años/2017.html#cat-narrative', icon: '🎮' },
    { keywords: ['nier: automata', 'nier: automata 2017', 'nier: automata best narrative'], label: 'NieR: Automata (2017 · Best Narrative)', url: 'Años/2017.html#cat-narrative', icon: '🎮' },
    { keywords: ['wolfenstein ii: the new colossus', 'wolfenstein ii: the new colossus 2017', 'wolfenstein ii: the new colossus best narrative'], label: 'Wolfenstein II: The New Colossus (2017 · Best Narrative)', url: 'Años/2017.html#cat-narrative', icon: '🎮' },
    { keywords: ['destiny 2', 'destiny 2 2017', 'destiny 2 best art direction'], label: 'Destiny 2 (2017 · Best Art Direction)', url: 'Años/2017.html#cat-art', icon: '🎮' },
    { keywords: ['horizon zero dawn', 'horizon zero dawn 2017', 'horizon zero dawn best art direction'], label: 'Horizon Zero Dawn (2017 · Best Art Direction)', url: 'Años/2017.html#cat-art', icon: '🎮' },
    { keywords: ['persona 5', 'persona 5 2017', 'persona 5 best art direction'], label: 'Persona 5 (2017 · Best Art Direction)', url: 'Años/2017.html#cat-art', icon: '🎮' },
    { keywords: ['the legend of zelda: breath of the wild', 'the legend of zelda: breath of the wild 2017', 'the legend of zelda: breath of the wild best art direction'], label: 'The Legend of Zelda: Breath of the Wild (2017 · Best Art Direction)', url: 'Años/2017.html#cat-art', icon: '🎮' },
    { keywords: ['cuphead', 'cuphead 2017', 'cuphead best soundtrack'], label: 'Cuphead (2017 · Best Soundtrack)', url: 'Años/2017.html#cat-soundtrack', icon: '🎮' },
    { keywords: ['destiny 2', 'destiny 2 2017', 'destiny 2 best soundtrack'], label: 'Destiny 2 (2017 · Best Soundtrack)', url: 'Años/2017.html#cat-soundtrack', icon: '🎮' },
    { keywords: ['persona 5', 'persona 5 2017', 'persona 5 best soundtrack'], label: 'Persona 5 (2017 · Best Soundtrack)', url: 'Años/2017.html#cat-soundtrack', icon: '🎮' },
    { keywords: ['super mario odyssey', 'super mario odyssey 2017', 'super mario odyssey best soundtrack'], label: 'Super Mario Odyssey (2017 · Best Soundtrack)', url: 'Años/2017.html#cat-soundtrack', icon: '🎮' },
    { keywords: ['the legend of zelda: breath of the wild', 'the legend of zelda: breath of the wild 2017', 'the legend of zelda: breath of the wild best soundtrack'], label: 'The Legend of Zelda: Breath of the Wild (2017 · Best Soundtrack)', url: 'Años/2017.html#cat-soundtrack', icon: '🎮' },
    { keywords: ['call of duty: wwii', 'call of duty: wwii 2017', 'call of duty: wwii best multiplayer'], label: 'Call of Duty: WWII (2017 · Best Multiplayer)', url: 'Años/2017.html#cat-multiplayer', icon: '🎮' },
    { keywords: ['destiny 2', 'destiny 2 2017', 'destiny 2 best multiplayer'], label: 'Destiny 2 (2017 · Best Multiplayer)', url: 'Años/2017.html#cat-multiplayer', icon: '🎮' },
    { keywords: ['fortnite', 'fortnite 2017', 'fortnite best multiplayer'], label: 'Fortnite (2017 · Best Multiplayer)', url: 'Años/2017.html#cat-multiplayer', icon: '🎮' },
    { keywords: ['mario kart 8 deluxe', 'mario kart 8 deluxe 2017', 'mario kart 8 deluxe best multiplayer'], label: 'Mario Kart 8 Deluxe (2017 · Best Multiplayer)', url: 'Años/2017.html#cat-multiplayer', icon: '🎮' },
    { keywords: ['splatoon 2', 'splatoon 2 2017', 'splatoon 2 best multiplayer'], label: 'Splatoon 2 (2017 · Best Multiplayer)', url: 'Años/2017.html#cat-multiplayer', icon: '🎮' },
    { keywords: ['horizon zero dawn', 'horizon zero dawn 2017', 'horizon zero dawn best game direction'], label: 'Horizon Zero Dawn (2017 · Best Game Direction)', url: 'Años/2017.html#cat-direction', icon: '🎮' },
    { keywords: ['resident evil 7: biohazard', 'resident evil 7: biohazard 2017', 'resident evil 7: biohazard best game direction'], label: 'Resident Evil 7: Biohazard (2017 · Best Game Direction)', url: 'Años/2017.html#cat-direction', icon: '🎮' },
    { keywords: ['super mario odyssey', 'super mario odyssey 2017', 'super mario odyssey best game direction'], label: 'Super Mario Odyssey (2017 · Best Game Direction)', url: 'Años/2017.html#cat-direction', icon: '🎮' },
    { keywords: ['wolfenstein ii: the new colossus', 'wolfenstein ii: the new colossus 2017', 'wolfenstein ii: the new colossus best game direction'], label: 'Wolfenstein II: The New Colossus (2017 · Best Game Direction)', url: 'Años/2017.html#cat-direction', icon: '🎮' },
    { keywords: ['assassin\'s creed odyssey', 'assassin\'s creed odyssey 2018', 'assassin\'s creed odyssey game of the year'], label: 'Assassin\'s Creed Odyssey (2018 · Game of the Year)', url: 'Años/2018.html#cat-goty', icon: '🎮' },
    { keywords: ['celeste', 'celeste 2018', 'celeste game of the year'], label: 'Celeste (2018 · Game of the Year)', url: 'Años/2018.html#cat-goty', icon: '🎮' },
    { keywords: ['marvel\'s spider-man', 'marvel\'s spider-man 2018', 'marvel\'s spider-man game of the year'], label: 'Marvel\'s Spider-Man (2018 · Game of the Year)', url: 'Años/2018.html#cat-goty', icon: '🎮' },
    { keywords: ['monster hunter: world', 'monster hunter: world 2018', 'monster hunter: world game of the year'], label: 'Monster Hunter: World (2018 · Game of the Year)', url: 'Años/2018.html#cat-goty', icon: '🎮' },
    { keywords: ['red dead redemption 2', 'red dead redemption 2 2018', 'red dead redemption 2 game of the year'], label: 'Red Dead Redemption 2 (2018 · Game of the Year)', url: 'Años/2018.html#cat-goty', icon: '🎮' },
    { keywords: ['dead cells', 'dead cells 2018', 'dead cells best independent game'], label: 'Dead Cells (2018 · Best Independent Game)', url: 'Años/2018.html#cat-indie', icon: '🎮' },
    { keywords: ['into the breach', 'into the breach 2018', 'into the breach best independent game'], label: 'Into the Breach (2018 · Best Independent Game)', url: 'Años/2018.html#cat-indie', icon: '🎮' },
    { keywords: ['return of the obra dinn', 'return of the obra dinn 2018', 'return of the obra dinn best independent game'], label: 'Return of the Obra Dinn (2018 · Best Independent Game)', url: 'Años/2018.html#cat-indie', icon: '🎮' },
    { keywords: ['the messenger', 'the messenger 2018', 'the messenger best independent game'], label: 'The Messenger (2018 · Best Independent Game)', url: 'Años/2018.html#cat-indie', icon: '🎮' },
    { keywords: ['detroit: become human', 'detroit: become human 2018', 'detroit: become human best narrative'], label: 'Detroit: Become Human (2018 · Best Narrative)', url: 'Años/2018.html#cat-narrative', icon: '🎮' },
    { keywords: ['god of war', 'god of war 2018', 'god of war best narrative'], label: 'God of War (2018 · Best Narrative)', url: 'Años/2018.html#cat-narrative', icon: '🎮' },
    { keywords: ['life is strange 2: episode 1', 'life is strange 2: episode 1 2018', 'life is strange 2: episode 1 best narrative'], label: 'Life Is Strange 2: Episode 1 (2018 · Best Narrative)', url: 'Años/2018.html#cat-narrative', icon: '🎮' },
    { keywords: ['marvel\'s spider-man', 'marvel\'s spider-man 2018', 'marvel\'s spider-man best narrative'], label: 'Marvel\'s Spider-Man (2018 · Best Narrative)', url: 'Años/2018.html#cat-narrative', icon: '🎮' },
    { keywords: ['assassin\'s creed odyssey', 'assassin\'s creed odyssey 2018', 'assassin\'s creed odyssey best art direction'], label: 'Assassin\'s Creed Odyssey (2018 · Best Art Direction)', url: 'Años/2018.html#cat-art', icon: '🎮' },
    { keywords: ['god of war', 'god of war 2018', 'god of war best art direction'], label: 'God of War (2018 · Best Art Direction)', url: 'Años/2018.html#cat-art', icon: '🎮' },
    { keywords: ['octopath traveler', 'octopath traveler 2018', 'octopath traveler best art direction'], label: 'Octopath Traveler (2018 · Best Art Direction)', url: 'Años/2018.html#cat-art', icon: '🎮' },
    { keywords: ['red dead redemption 2', 'red dead redemption 2 2018', 'red dead redemption 2 best art direction'], label: 'Red Dead Redemption 2 (2018 · Best Art Direction)', url: 'Años/2018.html#cat-art', icon: '🎮' },
    { keywords: ['celeste', 'celeste 2018', 'celeste best soundtrack'], label: 'Celeste (2018 · Best Soundtrack)', url: 'Años/2018.html#cat-soundtrack', icon: '🎮' },
    { keywords: ['god of war', 'god of war 2018', 'god of war best soundtrack'], label: 'God of War (2018 · Best Soundtrack)', url: 'Años/2018.html#cat-soundtrack', icon: '🎮' },
    { keywords: ['marvel\'s spider-man', 'marvel\'s spider-man 2018', 'marvel\'s spider-man best soundtrack'], label: 'Marvel\'s Spider-Man (2018 · Best Soundtrack)', url: 'Años/2018.html#cat-soundtrack', icon: '🎮' },
    { keywords: ['ni no kuni ii: revenant kingdom', 'ni no kuni ii: revenant kingdom 2018', 'ni no kuni ii: revenant kingdom best soundtrack'], label: 'Ni no Kuni II: Revenant Kingdom (2018 · Best Soundtrack)', url: 'Años/2018.html#cat-soundtrack', icon: '🎮' },
    { keywords: ['octopath traveler', 'octopath traveler 2018', 'octopath traveler best soundtrack'], label: 'Octopath Traveler (2018 · Best Soundtrack)', url: 'Años/2018.html#cat-soundtrack', icon: '🎮' },
    { keywords: ['call of duty: black ops 4', 'call of duty: black ops 4 2018', 'call of duty: black ops 4 best multiplayer'], label: 'Call of Duty: Black Ops 4 (2018 · Best Multiplayer)', url: 'Años/2018.html#cat-multiplayer', icon: '🎮' },
    { keywords: ['destiny 2: forsaken', 'destiny 2: forsaken 2018', 'destiny 2: forsaken best multiplayer'], label: 'Destiny 2: Forsaken (2018 · Best Multiplayer)', url: 'Años/2018.html#cat-multiplayer', icon: '🎮' },
    { keywords: ['monster hunter: world', 'monster hunter: world 2018', 'monster hunter: world best multiplayer'], label: 'Monster Hunter: World (2018 · Best Multiplayer)', url: 'Años/2018.html#cat-multiplayer', icon: '🎮' },
    { keywords: ['sea of thieves', 'sea of thieves 2018', 'sea of thieves best multiplayer'], label: 'Sea of Thieves (2018 · Best Multiplayer)', url: 'Años/2018.html#cat-multiplayer', icon: '🎮' },
    { keywords: ['a way out', 'a way out 2018', 'a way out best game direction'], label: 'A Way Out (2018 · Best Game Direction)', url: 'Años/2018.html#cat-direction', icon: '🎮' },
    { keywords: ['detroit: become human', 'detroit: become human 2018', 'detroit: become human best game direction'], label: 'Detroit: Become Human (2018 · Best Game Direction)', url: 'Años/2018.html#cat-direction', icon: '🎮' },
    { keywords: ['marvel\'s spider-man', 'marvel\'s spider-man 2018', 'marvel\'s spider-man best game direction'], label: 'Marvel\'s Spider-Man (2018 · Best Game Direction)', url: 'Años/2018.html#cat-direction', icon: '🎮' },
    { keywords: ['red dead redemption 2', 'red dead redemption 2 2018', 'red dead redemption 2 best game direction'], label: 'Red Dead Redemption 2 (2018 · Best Game Direction)', url: 'Años/2018.html#cat-direction', icon: '🎮' },
    { keywords: ['control', 'control 2019', 'control game of the year'], label: 'Control (2019 · Game of the Year)', url: 'Años/2019.html#cat-goty', icon: '🎮' },
    { keywords: ['death stranding', 'death stranding 2019', 'death stranding game of the year', 'death stranding 2', 'ds2'], label: 'Death Stranding (2019 · Game of the Year)', url: 'Años/2019.html#cat-goty', icon: '🎮' },
    { keywords: ['resident evil 2', 'resident evil 2 2019', 'resident evil 2 game of the year'], label: 'Resident Evil 2 (2019 · Game of the Year)', url: 'Años/2019.html#cat-goty', icon: '🎮' },
    { keywords: ['super smash bros. ultimate', 'super smash bros. ultimate 2019', 'super smash bros. ultimate game of the year'], label: 'Super Smash Bros. Ultimate (2019 · Game of the Year)', url: 'Años/2019.html#cat-goty', icon: '🎮' },
    { keywords: ['the outer worlds', 'the outer worlds 2019', 'the outer worlds game of the year'], label: 'The Outer Worlds (2019 · Game of the Year)', url: 'Años/2019.html#cat-goty', icon: '🎮' },
    { keywords: ['baba is you', 'baba is you 2019', 'baba is you best independent game'], label: 'Baba Is You (2019 · Best Independent Game)', url: 'Años/2019.html#cat-indie', icon: '🎮' },
    { keywords: ['katana zero', 'katana zero 2019', 'katana zero best independent game'], label: 'Katana Zero (2019 · Best Independent Game)', url: 'Años/2019.html#cat-indie', icon: '🎮' },
    { keywords: ['outer wilds', 'outer wilds 2019', 'outer wilds best independent game'], label: 'Outer Wilds (2019 · Best Independent Game)', url: 'Años/2019.html#cat-indie', icon: '🎮' },
    { keywords: ['untitled goose game', 'untitled goose game 2019', 'untitled goose game best independent game'], label: 'Untitled Goose Game (2019 · Best Independent Game)', url: 'Años/2019.html#cat-indie', icon: '🎮' },
    { keywords: ['a plague tale: innocence', 'a plague tale: innocence 2019', 'a plague tale: innocence best narrative'], label: 'A Plague Tale: Innocence (2019 · Best Narrative)', url: 'Años/2019.html#cat-narrative', icon: '🎮' },
    { keywords: ['control', 'control 2019', 'control best narrative'], label: 'Control (2019 · Best Narrative)', url: 'Años/2019.html#cat-narrative', icon: '🎮' },
    { keywords: ['death stranding', 'death stranding 2019', 'death stranding best narrative', 'death stranding 2', 'ds2'], label: 'Death Stranding (2019 · Best Narrative)', url: 'Años/2019.html#cat-narrative', icon: '🎮' },
    { keywords: ['the outer worlds', 'the outer worlds 2019', 'the outer worlds best narrative'], label: 'The Outer Worlds (2019 · Best Narrative)', url: 'Años/2019.html#cat-narrative', icon: '🎮' },
    { keywords: ['death stranding', 'death stranding 2019', 'death stranding best art direction', 'death stranding 2', 'ds2'], label: 'Death Stranding (2019 · Best Art Direction)', url: 'Años/2019.html#cat-art', icon: '🎮' },
    { keywords: ['gris', 'gris 2019', 'gris best art direction'], label: 'Gris (2019 · Best Art Direction)', url: 'Años/2019.html#cat-art', icon: '🎮' },
    { keywords: ['sayonara wild hearts', 'sayonara wild hearts 2019', 'sayonara wild hearts best art direction'], label: 'Sayonara Wild Hearts (2019 · Best Art Direction)', url: 'Años/2019.html#cat-art', icon: '🎮' },
    { keywords: ['sekiro: shadows die twice', 'sekiro: shadows die twice 2019', 'sekiro: shadows die twice best art direction'], label: 'Sekiro: Shadows Die Twice (2019 · Best Art Direction)', url: 'Años/2019.html#cat-art', icon: '🎮' },
    { keywords: ['the legend of zelda: link\'s awakening', 'the legend of zelda: link\'s awakening 2019', 'the legend of zelda: link\'s awakening best art direction'], label: 'The Legend of Zelda: Link\'s Awakening (2019 · Best Art Direction)', url: 'Años/2019.html#cat-art', icon: '🎮' },
    { keywords: ['cadence of hyrule', 'cadence of hyrule 2019', 'cadence of hyrule best soundtrack'], label: 'Cadence of Hyrule (2019 · Best Soundtrack)', url: 'Años/2019.html#cat-soundtrack', icon: '🎮' },
    { keywords: ['devil may cry 5', 'devil may cry 5 2019', 'devil may cry 5 best soundtrack'], label: 'Devil May Cry 5 (2019 · Best Soundtrack)', url: 'Años/2019.html#cat-soundtrack', icon: '🎮' },
    { keywords: ['kingdom hearts iii', 'kingdom hearts iii 2019', 'kingdom hearts iii best soundtrack'], label: 'Kingdom Hearts III (2019 · Best Soundtrack)', url: 'Años/2019.html#cat-soundtrack', icon: '🎮' },
    { keywords: ['sayonara wild hearts', 'sayonara wild hearts 2019', 'sayonara wild hearts best soundtrack'], label: 'Sayonara Wild Hearts (2019 · Best Soundtrack)', url: 'Años/2019.html#cat-soundtrack', icon: '🎮' },
    { keywords: ['borderlands 3', 'borderlands 3 2019', 'borderlands 3 best multiplayer'], label: 'Borderlands 3 (2019 · Best Multiplayer)', url: 'Años/2019.html#cat-multiplayer', icon: '🎮' },
    { keywords: ['call of duty: modern warfare', 'call of duty: modern warfare 2019', 'call of duty: modern warfare best multiplayer'], label: 'Call of Duty: Modern Warfare (2019 · Best Multiplayer)', url: 'Años/2019.html#cat-multiplayer', icon: '🎮' },
    { keywords: ['tetris 99', 'tetris 99 2019', 'tetris 99 best multiplayer'], label: 'Tetris 99 (2019 · Best Multiplayer)', url: 'Años/2019.html#cat-multiplayer', icon: '🎮' },
    { keywords: ['tom clancy\'s the division 2', 'tom clancy\'s the division 2 2019', 'tom clancy\'s the division 2 best multiplayer'], label: 'Tom Clancy\'s The Division 2 (2019 · Best Multiplayer)', url: 'Años/2019.html#cat-multiplayer', icon: '🎮' },
    { keywords: ['control', 'control 2019', 'control best game direction'], label: 'Control (2019 · Best Game Direction)', url: 'Años/2019.html#cat-direction', icon: '🎮' },
    { keywords: ['resident evil 2', 'resident evil 2 2019', 'resident evil 2 best game direction'], label: 'Resident Evil 2 (2019 · Best Game Direction)', url: 'Años/2019.html#cat-direction', icon: '🎮' },
    { keywords: ['sekiro: shadows die twice', 'sekiro: shadows die twice 2019', 'sekiro: shadows die twice best game direction'], label: 'Sekiro: Shadows Die Twice (2019 · Best Game Direction)', url: 'Años/2019.html#cat-direction', icon: '🎮' },
    { keywords: ['outer wilds', 'outer wilds 2019', 'outer wilds best game direction'], label: 'Outer Wilds (2019 · Best Game Direction)', url: 'Años/2019.html#cat-direction', icon: '🎮' },
    { keywords: ['animal crossing: new horizons', 'animal crossing: new horizons 2020', 'animal crossing: new horizons game of the year'], label: 'Animal Crossing: New Horizons (2020 · Game of the Year)', url: 'Años/2020.html#cat-goty', icon: '🎮' },
    { keywords: ['doom eternal', 'doom eternal 2020', 'doom eternal game of the year'], label: 'Doom Eternal (2020 · Game of the Year)', url: 'Años/2020.html#cat-goty', icon: '🎮' },
    { keywords: ['final fantasy vii remake', 'final fantasy vii remake 2020', 'final fantasy vii remake game of the year'], label: 'Final Fantasy VII Remake (2020 · Game of the Year)', url: 'Años/2020.html#cat-goty', icon: '🎮' },
    { keywords: ['ghost of tsushima', 'ghost of tsushima 2020', 'ghost of tsushima game of the year'], label: 'Ghost of Tsushima (2020 · Game of the Year)', url: 'Años/2020.html#cat-goty', icon: '🎮' },
    { keywords: ['hades', 'hades 2020', 'hades game of the year'], label: 'Hades (2020 · Game of the Year)', url: 'Años/2020.html#cat-goty', icon: '🎮' },
    { keywords: ['carrion', 'carrion 2020', 'carrion best independent game'], label: 'Carrion (2020 · Best Independent Game)', url: 'Años/2020.html#cat-indie', icon: '🎮' },
    { keywords: ['fall guys: ultimate knockout', 'fall guys: ultimate knockout 2020', 'fall guys: ultimate knockout best independent game'], label: 'Fall Guys: Ultimate Knockout (2020 · Best Independent Game)', url: 'Años/2020.html#cat-indie', icon: '🎮' },
    { keywords: ['spelunky 2', 'spelunky 2 2020', 'spelunky 2 best independent game'], label: 'Spelunky 2 (2020 · Best Independent Game)', url: 'Años/2020.html#cat-indie', icon: '🎮' },
    { keywords: ['spiritfarer', 'spiritfarer 2020', 'spiritfarer best independent game'], label: 'Spiritfarer (2020 · Best Independent Game)', url: 'Años/2020.html#cat-indie', icon: '🎮' },
    { keywords: ['13 sentinels: aegis rim', '13 sentinels: aegis rim 2020', '13 sentinels: aegis rim best narrative'], label: '13 Sentinels: Aegis Rim (2020 · Best Narrative)', url: 'Años/2020.html#cat-narrative', icon: '🎮' },
    { keywords: ['final fantasy vii remake', 'final fantasy vii remake 2020', 'final fantasy vii remake best narrative'], label: 'Final Fantasy VII Remake (2020 · Best Narrative)', url: 'Años/2020.html#cat-narrative', icon: '🎮' },
    { keywords: ['ghost of tsushima', 'ghost of tsushima 2020', 'ghost of tsushima best narrative'], label: 'Ghost of Tsushima (2020 · Best Narrative)', url: 'Años/2020.html#cat-narrative', icon: '🎮' },
    { keywords: ['hades', 'hades 2020', 'hades best narrative'], label: 'Hades (2020 · Best Narrative)', url: 'Años/2020.html#cat-narrative', icon: '🎮' },
    { keywords: ['final fantasy vii remake', 'final fantasy vii remake 2020', 'final fantasy vii remake best art direction'], label: 'Final Fantasy VII Remake (2020 · Best Art Direction)', url: 'Años/2020.html#cat-art', icon: '🎮' },
    { keywords: ['hades', 'hades 2020', 'hades best art direction'], label: 'Hades (2020 · Best Art Direction)', url: 'Años/2020.html#cat-art', icon: '🎮' },
    { keywords: ['ori and the will of the wisps', 'ori and the will of the wisps 2020', 'ori and the will of the wisps best art direction'], label: 'Ori and the Will of the Wisps (2020 · Best Art Direction)', url: 'Años/2020.html#cat-art', icon: '🎮' },
    { keywords: ['the last of us part ii', 'the last of us part ii 2020', 'the last of us part ii best art direction'], label: 'The Last of Us Part II (2020 · Best Art Direction)', url: 'Años/2020.html#cat-art', icon: '🎮' },
    { keywords: ['doom eternal', 'doom eternal 2020', 'doom eternal best soundtrack'], label: 'Doom Eternal (2020 · Best Soundtrack)', url: 'Años/2020.html#cat-soundtrack', icon: '🎮' },
    { keywords: ['hades', 'hades 2020', 'hades best soundtrack'], label: 'Hades (2020 · Best Soundtrack)', url: 'Años/2020.html#cat-soundtrack', icon: '🎮' },
    { keywords: ['ori and the will of the wisps', 'ori and the will of the wisps 2020', 'ori and the will of the wisps best soundtrack'], label: 'Ori and the Will of the Wisps (2020 · Best Soundtrack)', url: 'Años/2020.html#cat-soundtrack', icon: '🎮' },
    { keywords: ['the last of us part ii', 'the last of us part ii 2020', 'the last of us part ii best soundtrack'], label: 'The Last of Us Part II (2020 · Best Soundtrack)', url: 'Años/2020.html#cat-soundtrack', icon: '🎮' },
    { keywords: ['animal crossing: new horizons', 'animal crossing: new horizons 2020', 'animal crossing: new horizons best multiplayer'], label: 'Animal Crossing: New Horizons (2020 · Best Multiplayer)', url: 'Años/2020.html#cat-multiplayer', icon: '🎮' },
    { keywords: ['call of duty: warzone', 'call of duty: warzone 2020', 'call of duty: warzone best multiplayer'], label: 'Call of Duty: Warzone (2020 · Best Multiplayer)', url: 'Años/2020.html#cat-multiplayer', icon: '🎮' },
    { keywords: ['fall guys: ultimate knockout', 'fall guys: ultimate knockout 2020', 'fall guys: ultimate knockout best multiplayer'], label: 'Fall Guys: Ultimate Knockout (2020 · Best Multiplayer)', url: 'Años/2020.html#cat-multiplayer', icon: '🎮' },
    { keywords: ['valorant', 'valorant 2020', 'valorant best multiplayer'], label: 'Valorant (2020 · Best Multiplayer)', url: 'Años/2020.html#cat-multiplayer', icon: '🎮' },
    { keywords: ['final fantasy vii remake', 'final fantasy vii remake 2020', 'final fantasy vii remake best game direction'], label: 'Final Fantasy VII Remake (2020 · Best Game Direction)', url: 'Años/2020.html#cat-direction', icon: '🎮' },
    { keywords: ['ghost of tsushima', 'ghost of tsushima 2020', 'ghost of tsushima best game direction'], label: 'Ghost of Tsushima (2020 · Best Game Direction)', url: 'Años/2020.html#cat-direction', icon: '🎮' },
    { keywords: ['hades', 'hades 2020', 'hades best game direction'], label: 'Hades (2020 · Best Game Direction)', url: 'Años/2020.html#cat-direction', icon: '🎮' },
    { keywords: ['half-life: alyx', 'half-life: alyx 2020', 'half-life: alyx best game direction'], label: 'Half-Life: Alyx (2020 · Best Game Direction)', url: 'Años/2020.html#cat-direction', icon: '🎮' },
    { keywords: ['deathloop', 'deathloop 2021', 'deathloop game of the year'], label: 'Deathloop (2021 · Game of the Year)', url: 'Años/2021.html#cat-goty', icon: '🎮' },
    { keywords: ['metroid dread', 'metroid dread 2021', 'metroid dread game of the year'], label: 'Metroid Dread (2021 · Game of the Year)', url: 'Años/2021.html#cat-goty', icon: '🎮' },
    { keywords: ['psychonauts 2', 'psychonauts 2 2021', 'psychonauts 2 game of the year'], label: 'Psychonauts 2 (2021 · Game of the Year)', url: 'Años/2021.html#cat-goty', icon: '🎮' },
    { keywords: ['ratchet & clank: rift apart', 'ratchet & clank: rift apart 2021', 'ratchet & clank: rift apart game of the year'], label: 'Ratchet & Clank: Rift Apart (2021 · Game of the Year)', url: 'Años/2021.html#cat-goty', icon: '🎮' },
    { keywords: ['resident evil village', 'resident evil village 2021', 'resident evil village game of the year'], label: 'Resident Evil Village (2021 · Game of the Year)', url: 'Años/2021.html#cat-goty', icon: '🎮' },
    { keywords: ['12 minutes', '12 minutes 2021', '12 minutes best independent game'], label: '12 Minutes (2021 · Best Independent Game)', url: 'Años/2021.html#cat-indie', icon: '🎮' },
    { keywords: ['death\'s door', 'death\'s door 2021', 'death\'s door best independent game'], label: 'Death\'s Door (2021 · Best Independent Game)', url: 'Años/2021.html#cat-indie', icon: '🎮' },
    { keywords: ['inscryption', 'inscryption 2021', 'inscryption best independent game'], label: 'Inscryption (2021 · Best Independent Game)', url: 'Años/2021.html#cat-indie', icon: '🎮' },
    { keywords: ['loop hero', 'loop hero 2021', 'loop hero best independent game'], label: 'Loop Hero (2021 · Best Independent Game)', url: 'Años/2021.html#cat-indie', icon: '🎮' },
    { keywords: ['deathloop', 'deathloop 2021', 'deathloop best narrative'], label: 'Deathloop (2021 · Best Narrative)', url: 'Años/2021.html#cat-narrative', icon: '🎮' },
    { keywords: ['it takes two', 'it takes two 2021', 'it takes two best narrative'], label: 'It Takes Two (2021 · Best Narrative)', url: 'Años/2021.html#cat-narrative', icon: '🎮' },
    { keywords: ['life is strange: true colors', 'life is strange: true colors 2021', 'life is strange: true colors best narrative'], label: 'Life is Strange: True Colors (2021 · Best Narrative)', url: 'Años/2021.html#cat-narrative', icon: '🎮' },
    { keywords: ['psychonauts 2', 'psychonauts 2 2021', 'psychonauts 2 best narrative'], label: 'Psychonauts 2 (2021 · Best Narrative)', url: 'Años/2021.html#cat-narrative', icon: '🎮' },
    { keywords: ['kena: bridge of spirits', 'kena: bridge of spirits 2021', 'kena: bridge of spirits best art direction'], label: 'Kena: Bridge of Spirits (2021 · Best Art Direction)', url: 'Años/2021.html#cat-art', icon: '🎮' },
    { keywords: ['psychonauts 2', 'psychonauts 2 2021', 'psychonauts 2 best art direction'], label: 'Psychonauts 2 (2021 · Best Art Direction)', url: 'Años/2021.html#cat-art', icon: '🎮' },
    { keywords: ['ratchet & clank: rift apart', 'ratchet & clank: rift apart 2021', 'ratchet & clank: rift apart best art direction'], label: 'Ratchet & Clank: Rift Apart (2021 · Best Art Direction)', url: 'Años/2021.html#cat-art', icon: '🎮' },
    { keywords: ['the artful escape', 'the artful escape 2021', 'the artful escape best art direction'], label: 'The Artful Escape (2021 · Best Art Direction)', url: 'Años/2021.html#cat-art', icon: '🎮' },
    { keywords: ['cyberpunk 2077', 'cyberpunk 2077 2021', 'cyberpunk 2077 best soundtrack'], label: 'Cyberpunk 2077 (2021 · Best Soundtrack)', url: 'Años/2021.html#cat-soundtrack', icon: '🎮' },
    { keywords: ['deathloop', 'deathloop 2021', 'deathloop best soundtrack'], label: 'Deathloop (2021 · Best Soundtrack)', url: 'Años/2021.html#cat-soundtrack', icon: '🎮' },
    { keywords: ['marvel\'s guardians of the galaxy', 'marvel\'s guardians of the galaxy 2021', 'marvel\'s guardians of the galaxy best soundtrack'], label: 'Marvel\'s Guardians of the Galaxy (2021 · Best Soundtrack)', url: 'Años/2021.html#cat-soundtrack', icon: '🎮' },
    { keywords: ['the artful escape', 'the artful escape 2021', 'the artful escape best soundtrack'], label: 'The Artful Escape (2021 · Best Soundtrack)', url: 'Años/2021.html#cat-soundtrack', icon: '🎮' },
    { keywords: ['back 4 blood', 'back 4 blood 2021', 'back 4 blood best multiplayer'], label: 'Back 4 Blood (2021 · Best Multiplayer)', url: 'Años/2021.html#cat-multiplayer', icon: '🎮' },
    { keywords: ['knockout city', 'knockout city 2021', 'knockout city best multiplayer'], label: 'Knockout City (2021 · Best Multiplayer)', url: 'Años/2021.html#cat-multiplayer', icon: '🎮' },
    { keywords: ['monster hunter rise', 'monster hunter rise 2021', 'monster hunter rise best multiplayer'], label: 'Monster Hunter Rise (2021 · Best Multiplayer)', url: 'Años/2021.html#cat-multiplayer', icon: '🎮' },
    { keywords: ['new world', 'new world 2021', 'new world best multiplayer'], label: 'New World (2021 · Best Multiplayer)', url: 'Años/2021.html#cat-multiplayer', icon: '🎮' },
    { keywords: ['valheim', 'valheim 2021', 'valheim best multiplayer'], label: 'Valheim (2021 · Best Multiplayer)', url: 'Años/2021.html#cat-multiplayer', icon: '🎮' },
    { keywords: ['it takes two', 'it takes two 2021', 'it takes two best game direction'], label: 'It Takes Two (2021 · Best Game Direction)', url: 'Años/2021.html#cat-direction', icon: '🎮' },
    { keywords: ['returnal', 'returnal 2021', 'returnal best game direction'], label: 'Returnal (2021 · Best Game Direction)', url: 'Años/2021.html#cat-direction', icon: '🎮' },
    { keywords: ['psychonauts 2', 'psychonauts 2 2021', 'psychonauts 2 best game direction'], label: 'Psychonauts 2 (2021 · Best Game Direction)', url: 'Años/2021.html#cat-direction', icon: '🎮' },
    { keywords: ['ratchet & clank: rift apart', 'ratchet & clank: rift apart 2021', 'ratchet & clank: rift apart best game direction'], label: 'Ratchet & Clank: Rift Apart (2021 · Best Game Direction)', url: 'Años/2021.html#cat-direction', icon: '🎮' },
    { keywords: ['a plague tale: requiem', 'a plague tale: requiem 2022', 'a plague tale: requiem game of the year'], label: 'A Plague Tale: Requiem (2022 · Game of the Year)', url: 'Años/2022.html#cat-goty', icon: '🎮' },
    { keywords: ['god of war ragnarök', 'god of war ragnarök 2022', 'god of war ragnarök game of the year'], label: 'God of War Ragnarök (2022 · Game of the Year)', url: 'Años/2022.html#cat-goty', icon: '🎮' },
    { keywords: ['horizon forbidden west', 'horizon forbidden west 2022', 'horizon forbidden west game of the year'], label: 'Horizon Forbidden West (2022 · Game of the Year)', url: 'Años/2022.html#cat-goty', icon: '🎮' },
    { keywords: ['stray', 'stray 2022', 'stray game of the year'], label: 'Stray (2022 · Game of the Year)', url: 'Años/2022.html#cat-goty', icon: '🎮' },
    { keywords: ['xenoblade chronicles 3', 'xenoblade chronicles 3 2022', 'xenoblade chronicles 3 game of the year'], label: 'Xenoblade Chronicles 3 (2022 · Game of the Year)', url: 'Años/2022.html#cat-goty', icon: '🎮' },
    { keywords: ['cult of the lamb', 'cult of the lamb 2022', 'cult of the lamb best independent game'], label: 'Cult of the Lamb (2022 · Best Independent Game)', url: 'Años/2022.html#cat-indie', icon: '🎮' },
    { keywords: ['neon white', 'neon white 2022', 'neon white best independent game'], label: 'Neon White (2022 · Best Independent Game)', url: 'Años/2022.html#cat-indie', icon: '🎮' },
    { keywords: ['sifu', 'sifu 2022', 'sifu best independent game'], label: 'Sifu (2022 · Best Independent Game)', url: 'Años/2022.html#cat-indie', icon: '🎮' },
    { keywords: ['tunic', 'tunic 2022', 'tunic best independent game'], label: 'Tunic (2022 · Best Independent Game)', url: 'Años/2022.html#cat-indie', icon: '🎮' },
    { keywords: ['a plague tale: requiem', 'a plague tale: requiem 2022', 'a plague tale: requiem best narrative'], label: 'A Plague Tale: Requiem (2022 · Best Narrative)', url: 'Años/2022.html#cat-narrative', icon: '🎮' },
    { keywords: ['elden ring', 'elden ring 2022', 'elden ring best narrative'], label: 'Elden Ring (2022 · Best Narrative)', url: 'Años/2022.html#cat-narrative', icon: '🎮' },
    { keywords: ['horizon forbidden west', 'horizon forbidden west 2022', 'horizon forbidden west best narrative'], label: 'Horizon Forbidden West (2022 · Best Narrative)', url: 'Años/2022.html#cat-narrative', icon: '🎮' },
    { keywords: ['immortality', 'immortality 2022', 'immortality best narrative'], label: 'Immortality (2022 · Best Narrative)', url: 'Años/2022.html#cat-narrative', icon: '🎮' },
    { keywords: ['god of war ragnarök', 'god of war ragnarök 2022', 'god of war ragnarök best art direction'], label: 'God of War Ragnarök (2022 · Best Art Direction)', url: 'Años/2022.html#cat-art', icon: '🎮' },
    { keywords: ['horizon forbidden west', 'horizon forbidden west 2022', 'horizon forbidden west best art direction'], label: 'Horizon Forbidden West (2022 · Best Art Direction)', url: 'Años/2022.html#cat-art', icon: '🎮' },
    { keywords: ['scorn', 'scorn 2022', 'scorn best art direction'], label: 'Scorn (2022 · Best Art Direction)', url: 'Años/2022.html#cat-art', icon: '🎮' },
    { keywords: ['stray', 'stray 2022', 'stray best art direction'], label: 'Stray (2022 · Best Art Direction)', url: 'Años/2022.html#cat-art', icon: '🎮' },
    { keywords: ['a plague tale: requiem', 'a plague tale: requiem 2022', 'a plague tale: requiem best soundtrack'], label: 'A Plague Tale: Requiem (2022 · Best Soundtrack)', url: 'Años/2022.html#cat-soundtrack', icon: '🎮' },
    { keywords: ['elden ring', 'elden ring 2022', 'elden ring best soundtrack'], label: 'Elden Ring (2022 · Best Soundtrack)', url: 'Años/2022.html#cat-soundtrack', icon: '🎮' },
    { keywords: ['metal: hellsinger', 'metal: hellsinger 2022', 'metal: hellsinger best soundtrack'], label: 'Metal: Hellsinger (2022 · Best Soundtrack)', url: 'Años/2022.html#cat-soundtrack', icon: '🎮' },
    { keywords: ['xenoblade chronicles 3', 'xenoblade chronicles 3 2022', 'xenoblade chronicles 3 best soundtrack'], label: 'Xenoblade Chronicles 3 (2022 · Best Soundtrack)', url: 'Años/2022.html#cat-soundtrack', icon: '🎮' },
    { keywords: ['call of duty: modern warfare ii', 'call of duty: modern warfare ii 2022', 'call of duty: modern warfare ii best multiplayer'], label: 'Call of Duty: Modern Warfare II (2022 · Best Multiplayer)', url: 'Años/2022.html#cat-multiplayer', icon: '🎮' },
    { keywords: ['multiversus', 'multiversus 2022', 'multiversus best multiplayer'], label: 'MultiVersus (2022 · Best Multiplayer)', url: 'Años/2022.html#cat-multiplayer', icon: '🎮' },
    { keywords: ['overwatch 2', 'overwatch 2 2022', 'overwatch 2 best multiplayer'], label: 'Overwatch 2 (2022 · Best Multiplayer)', url: 'Años/2022.html#cat-multiplayer', icon: '🎮' },
    { keywords: ['teenage mutant ninja turtles: shredder\'s revenge', 'teenage mutant ninja turtles: shredder\'s revenge 2022', 'teenage mutant ninja turtles: shredder\'s revenge best multiplayer'], label: 'Teenage Mutant Ninja Turtles: Shredder\'s Revenge (2022 · Best Multiplayer)', url: 'Años/2022.html#cat-multiplayer', icon: '🎮' },
    { keywords: ['god of war ragnarök', 'god of war ragnarök 2022', 'god of war ragnarök best game direction'], label: 'God of War Ragnarök (2022 · Best Game Direction)', url: 'Años/2022.html#cat-direction', icon: '🎮' },
    { keywords: ['horizon forbidden west', 'horizon forbidden west 2022', 'horizon forbidden west best game direction'], label: 'Horizon Forbidden West (2022 · Best Game Direction)', url: 'Años/2022.html#cat-direction', icon: '🎮' },
    { keywords: ['immortality', 'immortality 2022', 'immortality best game direction'], label: 'Immortality (2022 · Best Game Direction)', url: 'Años/2022.html#cat-direction', icon: '🎮' },
    { keywords: ['stray', 'stray 2022', 'stray best game direction'], label: 'Stray (2022 · Best Game Direction)', url: 'Años/2022.html#cat-direction', icon: '🎮' },
    { keywords: ['alan wake 2', 'alan wake 2 2023', 'alan wake 2 game of the year'], label: 'Alan Wake 2 (2023 · Game of the Year)', url: 'Años/2023.html#cat-goty', icon: '🎮' },
    { keywords: ['marvel\'s spider-man 2', 'marvel\'s spider-man 2 2023', 'marvel\'s spider-man 2 game of the year'], label: 'Marvel\'s Spider-Man 2 (2023 · Game of the Year)', url: 'Años/2023.html#cat-goty', icon: '🎮' },
    { keywords: ['resident evil 4', 'resident evil 4 2023', 'resident evil 4 game of the year'], label: 'Resident Evil 4 (2023 · Game of the Year)', url: 'Años/2023.html#cat-goty', icon: '🎮' },
    { keywords: ['super mario bros. wonder', 'super mario bros. wonder 2023', 'super mario bros. wonder game of the year'], label: 'Super Mario Bros. Wonder (2023 · Game of the Year)', url: 'Años/2023.html#cat-goty', icon: '🎮' },
    { keywords: ['the legend of zelda: tears of the kingdom', 'the legend of zelda: tears of the kingdom 2023', 'the legend of zelda: tears of the kingdom game of the year'], label: 'The Legend of Zelda: Tears of the Kingdom (2023 · Game of the Year)', url: 'Años/2023.html#cat-goty', icon: '🎮' },
    { keywords: ['cocoon', 'cocoon 2023', 'cocoon best independent game'], label: 'Cocoon (2023 · Best Independent Game)', url: 'Años/2023.html#cat-indie', icon: '🎮' },
    { keywords: ['dave the diver', 'dave the diver 2023', 'dave the diver best independent game'], label: 'Dave the Diver (2023 · Best Independent Game)', url: 'Años/2023.html#cat-indie', icon: '🎮' },
    { keywords: ['dredge', 'dredge 2023', 'dredge best independent game'], label: 'Dredge (2023 · Best Independent Game)', url: 'Años/2023.html#cat-indie', icon: '🎮' },
    { keywords: ['viewfinder', 'viewfinder 2023', 'viewfinder best independent game'], label: 'Viewfinder (2023 · Best Independent Game)', url: 'Años/2023.html#cat-indie', icon: '🎮' },
    { keywords: ['baldur\'s gate 3', 'baldur\'s gate 3 2023', 'baldur\'s gate 3 best narrative'], label: 'Baldur\'s Gate 3 (2023 · Best Narrative)', url: 'Años/2023.html#cat-narrative', icon: '🎮' },
    { keywords: ['cyberpunk 2077: phantom liberty', 'cyberpunk 2077: phantom liberty 2023', 'cyberpunk 2077: phantom liberty best narrative'], label: 'Cyberpunk 2077: Phantom Liberty (2023 · Best Narrative)', url: 'Años/2023.html#cat-narrative', icon: '🎮' },
    { keywords: ['final fantasy xvi', 'final fantasy xvi 2023', 'final fantasy xvi best narrative'], label: 'Final Fantasy XVI (2023 · Best Narrative)', url: 'Años/2023.html#cat-narrative', icon: '🎮' },
    { keywords: ['marvel\'s spider-man 2', 'marvel\'s spider-man 2 2023', 'marvel\'s spider-man 2 best narrative'], label: 'Marvel\'s Spider-Man 2 (2023 · Best Narrative)', url: 'Años/2023.html#cat-narrative', icon: '🎮' },
    { keywords: ['hi-fi rush', 'hi-fi rush 2023', 'hi-fi rush best art direction'], label: 'Hi-Fi Rush (2023 · Best Art Direction)', url: 'Años/2023.html#cat-art', icon: '🎮' },
    { keywords: ['lies of p', 'lies of p 2023', 'lies of p best art direction'], label: 'Lies of P (2023 · Best Art Direction)', url: 'Años/2023.html#cat-art', icon: '🎮' },
    { keywords: ['super mario bros. wonder', 'super mario bros. wonder 2023', 'super mario bros. wonder best art direction'], label: 'Super Mario Bros. Wonder (2023 · Best Art Direction)', url: 'Años/2023.html#cat-art', icon: '🎮' },
    { keywords: ['the legend of zelda: tears of the kingdom', 'the legend of zelda: tears of the kingdom 2023', 'the legend of zelda: tears of the kingdom best art direction'], label: 'The Legend of Zelda: Tears of the Kingdom (2023 · Best Art Direction)', url: 'Años/2023.html#cat-art', icon: '🎮' },
    { keywords: ['alan wake 2', 'alan wake 2 2023', 'alan wake 2 best soundtrack'], label: 'Alan Wake 2 (2023 · Best Soundtrack)', url: 'Años/2023.html#cat-soundtrack', icon: '🎮' },
    { keywords: ['baldur\'s gate 3', 'baldur\'s gate 3 2023', 'baldur\'s gate 3 best soundtrack'], label: 'Baldur\'s Gate 3 (2023 · Best Soundtrack)', url: 'Años/2023.html#cat-soundtrack', icon: '🎮' },
    { keywords: ['hi-fi rush', 'hi-fi rush 2023', 'hi-fi rush best soundtrack'], label: 'Hi-Fi Rush (2023 · Best Soundtrack)', url: 'Años/2023.html#cat-soundtrack', icon: '🎮' },
    { keywords: ['the legend of zelda: tears of the kingdom', 'the legend of zelda: tears of the kingdom 2023', 'the legend of zelda: tears of the kingdom best soundtrack'], label: 'The Legend of Zelda: Tears of the Kingdom (2023 · Best Soundtrack)', url: 'Años/2023.html#cat-soundtrack', icon: '🎮' },
    { keywords: ['diablo iv', 'diablo iv 2023', 'diablo iv best multiplayer'], label: 'Diablo IV (2023 · Best Multiplayer)', url: 'Años/2023.html#cat-multiplayer', icon: '🎮' },
    { keywords: ['party animals', 'party animals 2023', 'party animals best multiplayer'], label: 'Party Animals (2023 · Best Multiplayer)', url: 'Años/2023.html#cat-multiplayer', icon: '🎮' },
    { keywords: ['street fighter 6', 'street fighter 6 2023', 'street fighter 6 best multiplayer'], label: 'Street Fighter 6 (2023 · Best Multiplayer)', url: 'Años/2023.html#cat-multiplayer', icon: '🎮' },
    { keywords: ['super mario bros. wonder', 'super mario bros. wonder 2023', 'super mario bros. wonder best multiplayer'], label: 'Super Mario Bros. Wonder (2023 · Best Multiplayer)', url: 'Años/2023.html#cat-multiplayer', icon: '🎮' },
    { keywords: ['baldur\'s gate 3', 'baldur\'s gate 3 2023', 'baldur\'s gate 3 best game direction'], label: 'Baldur\'s Gate 3 (2023 · Best Game Direction)', url: 'Años/2023.html#cat-direction', icon: '🎮' },
    { keywords: ['marvel\'s spider-man 2', 'marvel\'s spider-man 2 2023', 'marvel\'s spider-man 2 best game direction'], label: 'Marvel\'s Spider-Man 2 (2023 · Best Game Direction)', url: 'Años/2023.html#cat-direction', icon: '🎮' },
    { keywords: ['super mario bros. wonder', 'super mario bros. wonder 2023', 'super mario bros. wonder best game direction'], label: 'Super Mario Bros. Wonder (2023 · Best Game Direction)', url: 'Años/2023.html#cat-direction', icon: '🎮' },
    { keywords: ['the legend of zelda: tears of the kingdom', 'the legend of zelda: tears of the kingdom 2023', 'the legend of zelda: tears of the kingdom best game direction'], label: 'The Legend of Zelda: Tears of the Kingdom (2023 · Best Game Direction)', url: 'Años/2023.html#cat-direction', icon: '🎮' },
    { keywords: ['balatro', 'balatro 2024', 'balatro game of the year'], label: 'Balatro (2024 · Game of the Year)', url: 'Años/2024.html#cat-goty', icon: '🎮' },
    { keywords: ['black myth: wukong', 'black myth: wukong 2024', 'black myth: wukong game of the year'], label: 'Black Myth: Wukong (2024 · Game of the Year)', url: 'Años/2024.html#cat-goty', icon: '🎮' },
    { keywords: ['elden ring shadow of the erdtree', 'elden ring shadow of the erdtree 2024', 'elden ring shadow of the erdtree game of the year'], label: 'Elden Ring Shadow of the Erdtree (2024 · Game of the Year)', url: 'Años/2024.html#cat-goty', icon: '🎮' },
    { keywords: ['final fantasy vii rebirth', 'final fantasy vii rebirth 2024', 'final fantasy vii rebirth game of the year'], label: 'Final Fantasy VII Rebirth (2024 · Game of the Year)', url: 'Años/2024.html#cat-goty', icon: '🎮' },
    { keywords: ['metaphor: refantazio', 'metaphor: refantazio 2024', 'metaphor: refantazio game of the year'], label: 'Metaphor: ReFantazio (2024 · Game of the Year)', url: 'Años/2024.html#cat-goty', icon: '🎮' },
    { keywords: ['animal well', 'animal well 2024', 'animal well best independent game'], label: 'Animal Well (2024 · Best Independent Game)', url: 'Años/2024.html#cat-indie', icon: '🎮' },
    { keywords: ['lorelei and the laser eyes', 'lorelei and the laser eyes 2024', 'lorelei and the laser eyes best independent game'], label: 'Lorelei and the Laser Eyes (2024 · Best Independent Game)', url: 'Años/2024.html#cat-indie', icon: '🎮' },
    { keywords: ['neva', 'neva 2024', 'neva best independent game'], label: 'Neva (2024 · Best Independent Game)', url: 'Años/2024.html#cat-indie', icon: '🎮' },
    { keywords: ['ufo 50', 'ufo 50 2024', 'ufo 50 best independent game'], label: 'UFO 50 (2024 · Best Independent Game)', url: 'Años/2024.html#cat-indie', icon: '🎮' },
    { keywords: ['final fantasy vii rebirth', 'final fantasy vii rebirth 2024', 'final fantasy vii rebirth best narrative'], label: 'Final Fantasy VII Rebirth (2024 · Best Narrative)', url: 'Años/2024.html#cat-narrative', icon: '🎮' },
    { keywords: ['like a dragon: infinite wealth', 'like a dragon: infinite wealth 2024', 'like a dragon: infinite wealth best narrative'], label: 'Like a Dragon: Infinite Wealth (2024 · Best Narrative)', url: 'Años/2024.html#cat-narrative', icon: '🎮' },
    { keywords: ['senua\'s saga: hellblade ii', 'senua\'s saga: hellblade ii 2024', 'senua\'s saga: hellblade ii best narrative'], label: 'Senua\'s Saga: Hellblade II (2024 · Best Narrative)', url: 'Años/2024.html#cat-narrative', icon: '🎮' },
    { keywords: ['silent hill 2', 'silent hill 2 2024', 'silent hill 2 best narrative'], label: 'Silent Hill 2 (2024 · Best Narrative)', url: 'Años/2024.html#cat-narrative', icon: '🎮' },
    { keywords: ['astro bot', 'astro bot 2024', 'astro bot best art direction'], label: 'Astro Bot (2024 · Best Art Direction)', url: 'Años/2024.html#cat-art', icon: '🎮' },
    { keywords: ['black myth: wukong', 'black myth: wukong 2024', 'black myth: wukong best art direction'], label: 'Black Myth: Wukong (2024 · Best Art Direction)', url: 'Años/2024.html#cat-art', icon: '🎮' },
    { keywords: ['neva', 'neva 2024', 'neva best art direction'], label: 'Neva (2024 · Best Art Direction)', url: 'Años/2024.html#cat-art', icon: '🎮' },
    { keywords: ['senua\'s saga: hellblade ii', 'senua\'s saga: hellblade ii 2024', 'senua\'s saga: hellblade ii best art direction'], label: 'Senua\'s Saga: Hellblade II (2024 · Best Art Direction)', url: 'Años/2024.html#cat-art', icon: '🎮' },
    { keywords: ['astro bot', 'astro bot 2024', 'astro bot best soundtrack'], label: 'Astro Bot (2024 · Best Soundtrack)', url: 'Años/2024.html#cat-soundtrack', icon: '🎮' },
    { keywords: ['metaphor: refantazio', 'metaphor: refantazio 2024', 'metaphor: refantazio best soundtrack'], label: 'Metaphor: ReFantazio (2024 · Best Soundtrack)', url: 'Años/2024.html#cat-soundtrack', icon: '🎮' },
    { keywords: ['silent hill 2', 'silent hill 2 2024', 'silent hill 2 best soundtrack'], label: 'Silent Hill 2 (2024 · Best Soundtrack)', url: 'Años/2024.html#cat-soundtrack', icon: '🎮' },
    { keywords: ['stellar blade', 'stellar blade 2024', 'stellar blade best soundtrack'], label: 'Stellar Blade (2024 · Best Soundtrack)', url: 'Años/2024.html#cat-soundtrack', icon: '🎮' },
    { keywords: ['call of duty: black ops 6', 'call of duty: black ops 6 2024', 'call of duty: black ops 6 best multiplayer'], label: 'Call of Duty: Black Ops 6 (2024 · Best Multiplayer)', url: 'Años/2024.html#cat-multiplayer', icon: '🎮' },
    { keywords: ['super mario party jamboree', 'super mario party jamboree 2024', 'super mario party jamboree best multiplayer'], label: 'Super Mario Party Jamboree (2024 · Best Multiplayer)', url: 'Años/2024.html#cat-multiplayer', icon: '🎮' },
    { keywords: ['tekken 8', 'tekken 8 2024', 'tekken 8 best multiplayer'], label: 'Tekken 8 (2024 · Best Multiplayer)', url: 'Años/2024.html#cat-multiplayer', icon: '🎮' },
    { keywords: ['warhammer 40,000: space marine 2', 'warhammer 40,000: space marine 2 2024', 'warhammer 40,000: space marine 2 best multiplayer'], label: 'Warhammer 40,000: Space Marine 2 (2024 · Best Multiplayer)', url: 'Años/2024.html#cat-multiplayer', icon: '🎮' },
    { keywords: ['balatro', 'balatro 2024', 'balatro best game direction'], label: 'Balatro (2024 · Best Game Direction)', url: 'Años/2024.html#cat-direction', icon: '🎮' },
    { keywords: ['black myth: wukong', 'black myth: wukong 2024', 'black myth: wukong best game direction'], label: 'Black Myth: Wukong (2024 · Best Game Direction)', url: 'Años/2024.html#cat-direction', icon: '🎮' },
    { keywords: ['elden ring shadow of the erdtree', 'elden ring shadow of the erdtree 2024', 'elden ring shadow of the erdtree best game direction'], label: 'Elden Ring Shadow of the Erdtree (2024 · Best Game Direction)', url: 'Años/2024.html#cat-direction', icon: '🎮' },
    { keywords: ['final fantasy vii rebirth', 'final fantasy vii rebirth 2024', 'final fantasy vii rebirth best game direction'], label: 'Final Fantasy VII Rebirth (2024 · Best Game Direction)', url: 'Años/2024.html#cat-direction', icon: '🎮' },
    { keywords: ['metaphor: refantazio', 'metaphor: refantazio 2024', 'metaphor: refantazio best game direction'], label: 'Metaphor: ReFantazio (2024 · Best Game Direction)', url: 'Años/2024.html#cat-direction', icon: '🎮' },
    { keywords: ['death stranding 2: on the beach', 'death stranding 2: on the beach 2025', 'death stranding 2: on the beach game of the year', 'death stranding', 'death stranding 2', 'ds2'], label: 'Death Stranding 2: On the Beach (2025 · Game of the Year)', url: 'Años/2025.html#cat-goty', icon: '🎮' },
    { keywords: ['donkey kong bananza', 'donkey kong bananza 2025', 'donkey kong bananza game of the year'], label: 'Donkey Kong Bananza (2025 · Game of the Year)', url: 'Años/2025.html#cat-goty', icon: '🎮' },
    { keywords: ['hades ii', 'hades ii 2025', 'hades ii game of the year'], label: 'Hades II (2025 · Game of the Year)', url: 'Años/2025.html#cat-goty', icon: '🎮' },
    { keywords: ['hollow knight: silksong', 'hollow knight: silksong 2025', 'hollow knight: silksong game of the year', 'silksong', 'silksong 2025'], label: 'Hollow Knight: Silksong (2025 · Game of the Year)', url: 'Años/2025.html#cat-goty', icon: '🎮' },
    { keywords: ['kingdom come: deliverance ii', 'kingdom come: deliverance ii 2025', 'kingdom come: deliverance ii game of the year'], label: 'Kingdom Come: Deliverance II (2025 · Game of the Year)', url: 'Años/2025.html#cat-goty', icon: '🎮' },
    { keywords: ['absolum', 'absolum 2025', 'absolum best independent game'], label: 'Absolum (2025 · Best Independent Game)', url: 'Años/2025.html#cat-indie', icon: '🎮' },
    { keywords: ['ball x pit', 'ball x pit 2025', 'ball x pit best independent game'], label: 'Ball x Pit (2025 · Best Independent Game)', url: 'Años/2025.html#cat-indie', icon: '🎮' },
    { keywords: ['blue prince', 'blue prince 2025', 'blue prince best independent game'], label: 'Blue Prince (2025 · Best Independent Game)', url: 'Años/2025.html#cat-indie', icon: '🎮' },
    { keywords: ['hades ii', 'hades ii 2025', 'hades ii best independent game'], label: 'Hades II (2025 · Best Independent Game)', url: 'Años/2025.html#cat-indie', icon: '🎮' },
    { keywords: ['hollow knight: silksong', 'hollow knight: silksong 2025', 'hollow knight: silksong best independent game', 'silksong', 'silksong 2025'], label: 'Hollow Knight: Silksong (2025 · Best Independent Game)', url: 'Años/2025.html#cat-indie', icon: '🎮' },
    { keywords: ['death stranding 2: on the beach', 'death stranding 2: on the beach 2025', 'death stranding 2: on the beach best narrative', 'death stranding', 'death stranding 2', 'ds2'], label: 'Death Stranding 2: On the Beach (2025 · Best Narrative)', url: 'Años/2025.html#cat-narrative', icon: '🎮' },
    { keywords: ['ghost of yōtei', 'ghost of yōtei 2025', 'ghost of yōtei best narrative'], label: 'Ghost of Yōtei (2025 · Best Narrative)', url: 'Años/2025.html#cat-narrative', icon: '🎮' },
    { keywords: ['kingdom come: deliverance ii', 'kingdom come: deliverance ii 2025', 'kingdom come: deliverance ii best narrative'], label: 'Kingdom Come: Deliverance II (2025 · Best Narrative)', url: 'Años/2025.html#cat-narrative', icon: '🎮' },
    { keywords: ['silent hill f', 'silent hill f 2025', 'silent hill f best narrative'], label: 'Silent Hill f (2025 · Best Narrative)', url: 'Años/2025.html#cat-narrative', icon: '🎮' },
    { keywords: ['death stranding 2: on the beach', 'death stranding 2: on the beach 2025', 'death stranding 2: on the beach best art direction', 'death stranding', 'death stranding 2', 'ds2'], label: 'Death Stranding 2: On the Beach (2025 · Best Art Direction)', url: 'Años/2025.html#cat-art', icon: '🎮' },
    { keywords: ['ghost of yōtei', 'ghost of yōtei 2025', 'ghost of yōtei best art direction'], label: 'Ghost of Yōtei (2025 · Best Art Direction)', url: 'Años/2025.html#cat-art', icon: '🎮' },
    { keywords: ['hades ii', 'hades ii 2025', 'hades ii best art direction'], label: 'Hades II (2025 · Best Art Direction)', url: 'Años/2025.html#cat-art', icon: '🎮' },
    { keywords: ['hollow knight: silksong', 'hollow knight: silksong 2025', 'hollow knight: silksong best art direction', 'silksong', 'silksong 2025'], label: 'Hollow Knight: Silksong (2025 · Best Art Direction)', url: 'Años/2025.html#cat-art', icon: '🎮' },
    { keywords: ['death stranding 2: on the beach', 'death stranding 2: on the beach 2025', 'death stranding 2: on the beach best soundtrack', 'death stranding', 'death stranding 2', 'ds2'], label: 'Death Stranding 2: On the Beach (2025 · Best Soundtrack)', url: 'Años/2025.html#cat-soundtrack', icon: '🎮' },
    { keywords: ['ghost of yōtei', 'ghost of yōtei 2025', 'ghost of yōtei best soundtrack'], label: 'Ghost of Yōtei (2025 · Best Soundtrack)', url: 'Años/2025.html#cat-soundtrack', icon: '🎮' },
    { keywords: ['hades ii', 'hades ii 2025', 'hades ii best soundtrack'], label: 'Hades II (2025 · Best Soundtrack)', url: 'Años/2025.html#cat-soundtrack', icon: '🎮' },
    { keywords: ['hollow knight: silksong', 'hollow knight: silksong 2025', 'hollow knight: silksong best soundtrack', 'silksong', 'silksong 2025'], label: 'Hollow Knight: Silksong (2025 · Best Soundtrack)', url: 'Años/2025.html#cat-soundtrack', icon: '🎮' },
    { keywords: ['battlefield 6', 'battlefield 6 2025', 'battlefield 6 best multiplayer'], label: 'Battlefield 6 (2025 · Best Multiplayer)', url: 'Años/2025.html#cat-multiplayer', icon: '🎮' },
    { keywords: ['elden ring: nightreign', 'elden ring: nightreign 2025', 'elden ring: nightreign best multiplayer'], label: 'Elden Ring: Nightreign (2025 · Best Multiplayer)', url: 'Años/2025.html#cat-multiplayer', icon: '🎮' },
    { keywords: ['peak', 'peak 2025', 'peak best multiplayer'], label: 'Peak (2025 · Best Multiplayer)', url: 'Años/2025.html#cat-multiplayer', icon: '🎮' },
    { keywords: ['split fiction', 'split fiction 2025', 'split fiction best multiplayer'], label: 'Split Fiction (2025 · Best Multiplayer)', url: 'Años/2025.html#cat-multiplayer', icon: '🎮' },
    { keywords: ['death stranding 2: on the beach', 'death stranding 2: on the beach 2025', 'death stranding 2: on the beach best game direction', 'death stranding', 'death stranding 2', 'ds2'], label: 'Death Stranding 2: On the Beach (2025 · Best Game Direction)', url: 'Años/2025.html#cat-direction', icon: '🎮' },
    { keywords: ['ghost of yōtei', 'ghost of yōtei 2025', 'ghost of yōtei best game direction'], label: 'Ghost of Yōtei (2025 · Best Game Direction)', url: 'Años/2025.html#cat-direction', icon: '🎮' },
    { keywords: ['hades ii', 'hades ii 2025', 'hades ii best game direction'], label: 'Hades II (2025 · Best Game Direction)', url: 'Años/2025.html#cat-direction', icon: '🎮' },
    { keywords: ['split fiction', 'split fiction 2025', 'split fiction best game direction'], label: 'Split Fiction (2025 · Best Game Direction)', url: 'Años/2025.html#cat-direction', icon: '🎮' },
];

// Determinación del contexto de ruta: raíz (index.html, encuesta.html) vs subcarpeta (Años/*.html)
const isSubfolder = window.location.pathname.includes('/Años/') ||
                    window.location.pathname.includes('/A%C3%B1os/') ||
                    window.location.pathname.includes('/Anos/');

/**
 * Resuelve la URL relativa adecuada según la ubicación actual.
 * Si apunta a encuesta.html con año especificado en label, añade parámetro ?y={año}.
 */
function resolveUrl(rawUrl, label) {
    if (!rawUrl) return null;
    let target = rawUrl;

    if (target === 'encuesta.html' && label) {
        const yearMatch = label.match(/\b(20\d\d)\b/);
        if (yearMatch) {
            target = target + '?y=' + yearMatch[1];
        }
    }

    if (isSubfolder) {
        if (target.startsWith('Años/')) {
            return target.substring(5);
        } else {
            return '../' + target;
        }
    } else {
        return './' + target;
    }
}

/**
 * Normaliza un texto removiendo acentos/diacríticos y puntuación para búsquedas flexibles.
 */
function normalizeText(str) {
    if (!str) return '';
    return str
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/ñ/g, 'n')
        .replace(/[:',.!?¿¡\-_]/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
}

const input = document.getElementById('search-input');
const resultsContainer = document.getElementById('search-results');

let selectedIndex = -1;

function updateHighlight(items) {
    items.forEach((item, idx) => {
        if (idx === selectedIndex) {
            item.classList.add('highlight');
            item.classList.add('active');
            item.setAttribute('aria-selected', 'true');
            item.scrollIntoView({ block: 'nearest' });
        } else {
            item.classList.remove('highlight');
            item.classList.remove('active');
            item.removeAttribute('aria-selected');
        }
    });
}

if (input && resultsContainer) {
    input.addEventListener('input', function () {
        const query = this.value.toLowerCase().trim()
            .replace(/</g, '').replace(/>/g, '').replace(/«/g, ' ')
            .replace(/»/g, ' ').replace(/>>/g, ' ').replace(/<</g, ' ').replace(/\s+/g, ' ').trim();

        if (query.length < 2) {
            resultsContainer.innerHTML = '';
            resultsContainer.classList.remove('active');
            selectedIndex = -1;
            return;
        }

        const normQuery = normalizeText(query);
        const queryWords = normQuery.split(' ').filter(w => w.length > 0);

        const matches = searchIndex.filter(item => {
            const normLabel = normalizeText(item.label);
            const matchesKeywords = item.keywords.some(kw => {
                const normKw = normalizeText(kw);
                if (normKw.includes(normQuery) || normQuery.includes(normKw)) return true;
                if (queryWords.length > 1 && queryWords.every(w => normKw.includes(w))) return true;
                return false;
            });
            if (matchesKeywords) return true;
            if (normLabel.includes(normQuery)) return true;
            if (queryWords.length > 1 && queryWords.every(w => normLabel.includes(w))) return true;
            return false;
        });

        if (matches.length === 0) {
            resultsContainer.innerHTML = '<div class="search-result search-result--empty">Sin resultados</div>';
            resultsContainer.classList.add('active');
            selectedIndex = -1;
            return;
        }

        resultsContainer.innerHTML = matches.map(m => {
            const href = resolveUrl(m.url, m.label);
            if (m.url) {
                return `<a href="${href}" class="search-result"><span class="search-result__icon">${m.icon}</span><span class="search-result__label">${m.label}</span></a>`;
            }
            return `<div class="search-result search-result--hint"><span class="search-result__icon">${m.icon}</span><span class="search-result__label">${m.label}</span></div>`;
        }).join('');

        resultsContainer.classList.add('active');
        selectedIndex = -1;
    });

    // Navegación por teclado (ArrowDown, ArrowUp, Enter, Escape)
    input.addEventListener('keydown', function (e) {
        const resultItems = Array.from(resultsContainer.querySelectorAll('.search-result:not(.search-result--empty):not(.search-result--hint)'));

        if (e.key === 'ArrowDown' || e.keyCode === 40) {
            if (!resultsContainer.classList.contains('active') || resultItems.length === 0) return;
            e.preventDefault();
            selectedIndex = Math.min(selectedIndex + 1, resultItems.length - 1);
            updateHighlight(resultItems);
        } else if (e.key === 'ArrowUp' || e.keyCode === 38) {
            if (!resultsContainer.classList.contains('active') || resultItems.length === 0) return;
            e.preventDefault();
            selectedIndex = Math.max(selectedIndex - 1, 0);
            updateHighlight(resultItems);
        } else if (e.key === 'Enter' || e.keyCode === 13) {
            if (selectedIndex >= 0 && selectedIndex < resultItems.length) {
                e.preventDefault();
                const targetItem = resultItems[selectedIndex];
                if (targetItem && targetItem.href) {
                    window.location.href = targetItem.href;
                } else if (targetItem) {
                    targetItem.click();
                }
            }
        } else if (e.key === 'Escape' || e.keyCode === 27) {
            resultsContainer.classList.remove('active');
            selectedIndex = -1;
        }
    });

    // Cierre y desplazamiento suave al hacer clic en resultados
    resultsContainer.addEventListener('click', function (e) {
        const link = e.target.closest('a.search-result');
        if (!link) return;
        const href = link.getAttribute('href');
        if (href && href.includes('#')) {
            const hash = href.substring(href.indexOf('#'));
            const targetEl = document.querySelector(hash);
            if (targetEl) {
                targetEl.scrollIntoView({ behavior: 'smooth' });
            }
        }
        resultsContainer.classList.remove('active');
        selectedIndex = -1;
    });

    // Cierre de resultados al hacer clic fuera del panel
    document.addEventListener('click', function (e) {
        if (!e.target.closest('.search-panel')) {
            resultsContainer.classList.remove('active');
            selectedIndex = -1;
        }
    });
}
