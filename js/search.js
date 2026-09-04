// Search index: maps keywords to year pages and category anchors
const searchIndex = [
    // Years
    { keywords: ['2014', 'goty 2014', 'goty2014', 'dragon age', 'dragon age inquisition'], label: '2014 — Dragon Age: Inquisition', url: '2014.html', icon: '🏆' },
    { keywords: ['2015', 'goty 2015', 'goty2015', 'witcher', 'witcher 3'], label: '2015 — The Witcher 3: Wild Hunt', url: '2015.html', icon: '🏆' },
    { keywords: ['2016', 'goty 2016', 'goty2016', 'overwatch'], label: '2016 — Overwatch', url: '2016.html', icon: '🏆' },
    { keywords: ['2017', 'goty 2017', 'goty2017', 'zelda', 'breath of the wild', 'botw'], label: '2017 — The Legend of Zelda: BotW', url: '2017.html', icon: '🏆' },
    { keywords: ['2018', 'goty 2018', 'goty2018', 'god of war'], label: '2018 — God of War', url: '2018.html', icon: '🏆' },
    { keywords: ['2019', 'goty 2019', 'goty2019', 'sekiro', 'shadows die twice'], label: '2019 — Sekiro: Shadows Die Twice', url: '2019.html', icon: '🏆' },
    { keywords: ['2020', 'goty 2020', 'goty2020', 'last of us', 'tlou'], label: '2020 — The Last of Us Part II', url: '2020.html', icon: '🏆' },
    { keywords: ['2021', 'goty 2021', 'goty2021', 'it takes two'], label: '2021 — It Takes Two', url: '2021.html', icon: '🏆' },
    { keywords: ['2022', 'goty 2022', 'goty2022', 'elden ring'], label: '2022 — Elden Ring', url: '2022.html', icon: '🏆' },
    { keywords: ['2023', 'goty 2023', 'goty2023', 'baldurs gate', 'baldur', 'bg3'], label: "2023 — Baldur's Gate 3", url: '2023.html', icon: '🏆' },
    { keywords: ['2024', 'goty 2024', 'goty2024', 'astro bot', 'astro'], label: '2024 — Astro Bot', url: '2024.html', icon: '🏆' },

    // Categories by year (best music examples)
    { keywords: ['mejor musica 2014', 'best music 2014', 'musica 2014'], label: '2014 — Best Music: Destiny', url: '2014.html#banner-music', icon: '🎵' },
    { keywords: ['mejor musica 2015', 'best music 2015', 'musica 2015'], label: '2015 — Best Music: MGSV', url: '2015.html#banner-music', icon: '🎵' },
    { keywords: ['mejor musica 2016', 'best music 2016', 'musica 2016'], label: '2016 — Best Music: DOOM', url: '2016.html#banner-music', icon: '🎵' },
    { keywords: ['mejor musica 2017', 'best music 2017', 'musica 2017'], label: '2017 — Best Music: NieR: Automata', url: '2017.html#banner-music', icon: '🎵' },
    { keywords: ['mejor musica 2018', 'best music 2018', 'musica 2018'], label: '2018 — Best Music: RDR2', url: '2018.html#banner-music', icon: '🎵' },
    { keywords: ['mejor musica 2019', 'best music 2019', 'musica 2019'], label: '2019 — Best Music: Death Stranding', url: '2019.html#banner-music', icon: '🎵' },
    { keywords: ['mejor musica 2020', 'best music 2020', 'musica 2020'], label: '2020 — Best Music: FF VII Remake', url: '2020.html#banner-music', icon: '🎵' },
    { keywords: ['mejor musica 2021', 'best music 2021', 'musica 2021'], label: '2021 — Best Music: NieR Replicant', url: '2021.html#banner-music', icon: '🎵' },
    { keywords: ['mejor musica 2022', 'best music 2022', 'musica 2022'], label: '2022 — Best Music: GoW Ragnarök', url: '2022.html#banner-music', icon: '🎵' },
    { keywords: ['mejor musica 2023', 'best music 2023', 'musica 2023'], label: '2023 — Best Music: Final Fantasy XVI', url: '2023.html#banner-music', icon: '🎵' },
    { keywords: ['mejor musica 2024', 'best music 2024', 'musica 2024'], label: '2024 — Best Music: FF VII Rebirth', url: '2024.html#banner-music', icon: '🎵' },

    // Narrative
    { keywords: ['narrativa', 'mejor narrativa', 'best narrative', 'historia'], label: 'Buscar Best Narrative por año...', url: null, icon: '📖' },
    { keywords: ['mejor narrativa 2024', 'narrativa 2024', 'narrative 2024'], label: '2024 — Best Narrative: Metaphor: ReFantazio', url: '2024.html#banner-narrative', icon: '📖' },
    { keywords: ['mejor narrativa 2023', 'narrativa 2023', 'narrative 2023'], label: '2023 — Best Narrative: Alan Wake 2', url: '2023.html#banner-narrative', icon: '📖' },
    { keywords: ['mejor narrativa 2022', 'narrativa 2022', 'narrative 2022'], label: '2022 — Best Narrative: GoW Ragnarök', url: '2022.html#banner-narrative', icon: '📖' },

    // Direction
    { keywords: ['direccion', 'mejor direccion', 'best direction', 'game direction'], label: 'Buscar Best Direction por año...', url: null, icon: '🎬' },
    { keywords: ['mejor direccion 2024', 'direccion 2024', 'direction 2024'], label: '2024 — Best Direction: Astro Bot', url: '2024.html#banner-direction', icon: '🎬' },
    { keywords: ['mejor direccion 2023', 'direccion 2023', 'direction 2023'], label: '2023 — Best Direction: Alan Wake 2', url: '2023.html#banner-direction', icon: '🎬' },

    // Art Direction
    { keywords: ['arte', 'mejor arte', 'best art', 'art direction'], label: 'Buscar Best Art Direction por año...', url: null, icon: '🎨' },
    { keywords: ['mejor arte 2024', 'arte 2024', 'art 2024'], label: '2024 — Best Art: Metaphor: ReFantazio', url: '2024.html#banner-art', icon: '🎨' },
    { keywords: ['mejor arte 2023', 'arte 2023', 'art 2023'], label: '2023 — Best Art: Alan Wake 2', url: '2023.html#banner-art', icon: '🎨' },

    // RPG
    { keywords: ['rpg', 'mejor rpg', 'best rpg', 'role playing'], label: 'Buscar Best RPG por año...', url: null, icon: '📜' },
    { keywords: ['mejor rpg 2024', 'rpg 2024'], label: '2024 — Best RPG: Metaphor: ReFantazio', url: '2024.html#banner-rpg', icon: '📜' },
    { keywords: ['mejor rpg 2023', 'rpg 2023'], label: "2023 — Best RPG: Baldur's Gate 3", url: '2023.html#banner-rpg', icon: '📜' },
    { keywords: ['mejor rpg 2022', 'rpg 2022'], label: '2022 — Best RPG: Elden Ring', url: '2022.html#banner-rpg', icon: '📜' },

    // Indie
    { keywords: ['indie', 'independiente', 'mejor indie', 'best indie', 'best independent'], label: 'Buscar Best Indie por año...', url: null, icon: '🌱' },
    { keywords: ['mejor indie 2024', 'indie 2024'], label: '2024 — Best Indie: Balatro', url: '2024.html#banner-indie', icon: '🌱' },
    { keywords: ['mejor indie 2023', 'indie 2023'], label: '2023 — Best Indie: Sea of Stars', url: '2023.html#banner-indie', icon: '🌱' },

    // Action/Adventure
    { keywords: ['accion', 'aventura', 'action adventure', 'mejor accion'], label: 'Buscar Best Action/Adventure por año...', url: null, icon: '⚔️' },
    { keywords: ['mejor accion 2024', 'accion 2024', 'action 2024'], label: '2024 — Best Action/Adventure: Astro Bot', url: '2024.html#banner-actionadv', icon: '⚔️' },

    // Encuesta
    { keywords: ['encuesta', 'votar', 'votacion', 'survey', 'poll', 'voto'], label: '🗳️ Ir a la Encuesta GOTY', url: 'encuesta.html', icon: '🗳️' },

    // General music
    { keywords: ['musica', 'mejor musica', 'best music', 'soundtrack', 'score'], label: 'Buscar Best Music por año...', url: null, icon: '🎵' },
];

const input = document.getElementById('search-input');
const resultsContainer = document.getElementById('search-results');

input.addEventListener('input', function () {
    const query = this.value.toLowerCase().trim()
        .replace(/</g, '').replace(/>/g, '').replace(/</g, '').replace(/«/g, ' ')
        .replace(/»/g, ' ').replace(/>>/g, ' ').replace(/<</g, ' ').replace(/\s+/g, ' ').trim();

    if (query.length < 2) {
        resultsContainer.innerHTML = '';
        resultsContainer.classList.remove('active');
        return;
    }

    const matches = searchIndex.filter(item =>
        item.keywords.some(kw => kw.includes(query) || query.includes(kw))
    ).slice(0, 8);

    if (matches.length === 0) {
        resultsContainer.innerHTML = '<div class="search-result search-result--empty">Sin resultados</div>';
        resultsContainer.classList.add('active');
        return;
    }

    resultsContainer.innerHTML = matches.map(m => {
        if (m.url) {
            return `<a href="${m.url}" class="search-result"><span class="search-result__icon">${m.icon}</span><span class="search-result__label">${m.label}</span></a>`;
        }
        return `<div class="search-result search-result--hint"><span class="search-result__icon">${m.icon}</span><span class="search-result__label">${m.label}</span></div>`;
    }).join('');
    resultsContainer.classList.add('active');
});

// Close results when clicking outside
document.addEventListener('click', function (e) {
    if (!e.target.closest('.search-panel')) {
        resultsContainer.classList.remove('active');
    }
});
