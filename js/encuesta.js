// ═══════════════════════════════════════════════════
//  GOTY DATA  (2014–2024, no winner field needed)
// ═══════════════════════════════════════════════════
const gotyData = {
  2014: {
    categories: [
      { name: 'Game of the Year', icon: '🏆', nominees: ['Dragon Age: Inquisition', 'Bayonetta 2', 'Dark Souls II', 'Hearthstone', 'Middle-earth: Shadow of Mordor'] },
      { name: 'Best Narrative', icon: '📖', nominees: ['Valiant Hearts: The Great War', 'South Park: The Stick of Truth', 'The Walking Dead: Season Two', 'The Wolf Among Us', 'Wolfenstein: The New Order'] },
      { name: 'Best Music', icon: '🎵', nominees: ['Destiny', 'Alien: Isolation', 'Child of Light', 'Sunset Overdrive', 'Transistor'] },
      { name: 'Best Independent Game', icon: '🌱', nominees: ['Shovel Knight', 'Broken Age: Act I', 'Monument Valley', 'Transistor', 'The Vanishing of Ethan Carter'] },
      { name: 'Best Role Playing Game', icon: '📜', nominees: ['Dragon Age: Inquisition', 'Bravely Default', 'Dark Souls II', 'Divinity: Original Sin', 'South Park: The Stick of Truth'] },
      { name: 'Best Action/Adventure', icon: '⚔️', nominees: ['Middle-earth: Shadow of Mordor', 'Alien: Isolation', "Assassin's Creed Unity", 'Bayonetta 2', 'Sunset Overdrive'] }
    ]
  },
  2015: {
    categories: [
      { name: 'Game of the Year', icon: '🏆', nominees: ['The Witcher 3: Wild Hunt', 'Bloodborne', 'Fallout 4', 'Metal Gear Solid V: The Phantom Pain', 'Super Mario Maker'] },
      { name: 'Best Narrative', icon: '📖', nominees: ['Her Story', 'Life Is Strange', 'Tales from the Borderlands', 'The Witcher 3: Wild Hunt', 'Until Dawn'] },
      { name: 'Best Art Direction', icon: '🎨', nominees: ['Ori and the Blind Forest', 'Batman: Arkham Knight', 'Bloodborne', 'Metal Gear Solid V: The Phantom Pain', 'The Witcher 3: Wild Hunt'] },
      { name: 'Best Music', icon: '🎵', nominees: ['Metal Gear Solid V: The Phantom Pain', 'Fallout 4', 'Halo 5: Guardians', 'Ori and the Blind Forest', 'The Witcher 3: Wild Hunt'] },
      { name: 'Best Independent Game', icon: '🌱', nominees: ['Rocket League', 'Axiom Verge', 'Her Story', 'Ori and the Blind Forest', 'Undertale'] },
      { name: 'Best Role Playing Game', icon: '📜', nominees: ['The Witcher 3: Wild Hunt', 'Bloodborne', 'Fallout 4', 'Pillars of Eternity', 'Undertale'] },
      { name: 'Best Action/Adventure', icon: '⚔️', nominees: ['Metal Gear Solid V: The Phantom Pain', "Assassin's Creed Syndicate", 'Batman: Arkham Knight', 'Ori and the Blind Forest', 'Rise of the Tomb Raider'] }
    ]
  },
  2016: {
    categories: [
      { name: 'Game of the Year', icon: '🏆', nominees: ['Overwatch', 'DOOM', 'Inside', 'Titanfall 2', "Uncharted 4: A Thief's End"] },
      { name: 'Best Game Direction', icon: '🎬', nominees: ['Blizzard (Overwatch)', 'DICE (Battlefield 1)', 'id Software (DOOM)', 'Naughty Dog (Uncharted 4)', 'Respawn Entertainment (Titanfall 2)'] },
      { name: 'Best Narrative', icon: '📖', nominees: ["Uncharted 4: A Thief's End", 'Firewatch', 'Inside', 'Mafia III', 'Oxenfree'] },
      { name: 'Best Art Direction', icon: '🎨', nominees: ['Inside', 'Abzû', 'Firewatch', 'Overwatch', "Uncharted 4: A Thief's End"] },
      { name: 'Best Music', icon: '🎵', nominees: ['DOOM', 'Battlefield 1', 'Inside', 'Rez Infinite', 'Thumper'] },
      { name: 'Best Independent Game', icon: '🌱', nominees: ['Inside', 'Firewatch', 'Hyper Light Drifter', 'Stardew Valley', 'The Witness'] },
      { name: 'Best Role Playing Game', icon: '📜', nominees: ['The Witcher 3: Blood and Wine', 'Dark Souls III', 'Deus Ex: Mankind Divided', 'World of Warcraft: Legion', 'Xenoblade Chronicles X'] },
      { name: 'Best Action/Adventure', icon: '⚔️', nominees: ['Dishonored 2', 'Hitman', 'Hyper Light Drifter', 'Ratchet & Clank', "Uncharted 4: A Thief's End"] }
    ]
  },
  2017: {
    categories: [
      { name: 'Game of the Year', icon: '🏆', nominees: ['The Legend of Zelda: Breath of the Wild', 'Horizon Zero Dawn', 'Persona 5', "PlayerUnknown's Battlegrounds", 'Super Mario Odyssey'] },
      { name: 'Best Game Direction', icon: '🎬', nominees: ['The Legend of Zelda: Breath of the Wild', 'Horizon Zero Dawn', 'Resident Evil 7: Biohazard', 'Super Mario Odyssey', 'Wolfenstein II: The New Colossus'] },
      { name: 'Best Narrative', icon: '📖', nominees: ['What Remains of Edith Finch', "Hellblade: Senua's Sacrifice", 'Horizon Zero Dawn', 'NieR: Automata', 'Wolfenstein II: The New Colossus'] },
      { name: 'Best Art Direction', icon: '🎨', nominees: ['Cuphead', 'Destiny 2', 'Horizon Zero Dawn', 'Persona 5', 'The Legend of Zelda: Breath of the Wild'] },
      { name: 'Best Music', icon: '🎵', nominees: ['NieR: Automata', 'Cuphead', 'Destiny 2', 'Persona 5', 'Super Mario Odyssey'] },
      { name: 'Best Independent Game', icon: '🌱', nominees: ['Cuphead', "Hellblade: Senua's Sacrifice", 'Night in the Woods', 'Pyre', 'What Remains of Edith Finch'] },
      { name: 'Best Role Playing Game', icon: '📜', nominees: ['Persona 5', 'Divinity: Original Sin II', 'Final Fantasy XV', 'NieR: Automata', 'South Park: The Fractured But Whole'] },
      { name: 'Best Action/Adventure', icon: '⚔️', nominees: ['The Legend of Zelda: Breath of the Wild', "Assassin's Creed: Origins", 'Horizon Zero Dawn', 'Super Mario Odyssey', 'Uncharted: The Lost Legacy'] }
    ]
  },
  2018: {
    categories: [
      { name: 'Game of the Year', icon: '🏆', nominees: ['God of War', "Assassin's Creed Odyssey", 'Celeste', "Marvel's Spider-Man", 'Monster Hunter: World', 'Red Dead Redemption 2'] },
      { name: 'Best Game Direction', icon: '🎬', nominees: ['God of War', 'A Way Out', 'Detroit: Become Human', "Marvel's Spider-Man", 'Red Dead Redemption 2'] },
      { name: 'Best Narrative', icon: '📖', nominees: ['Red Dead Redemption 2', 'Detroit: Become Human', 'God of War', 'Life is Strange 2: Episode 1', "Marvel's Spider-Man"] },
      { name: 'Best Art Direction', icon: '🎨', nominees: ['Return of the Obra Dinn', "Assassin's Creed Odyssey", 'God of War', 'Octopath Traveler', 'Red Dead Redemption 2'] },
      { name: 'Best Music', icon: '🎵', nominees: ['Red Dead Redemption 2', 'Celeste', 'God of War', "Marvel's Spider-Man", 'Octopath Traveler'] },
      { name: 'Best Independent Game', icon: '🌱', nominees: ['Celeste', 'Dead Cells', 'Into the Breach', 'Return of the Obra Dinn', 'The Messenger'] },
      { name: 'Best Role Playing Game', icon: '📜', nominees: ['Monster Hunter: World', 'Dragon Quest XI', 'Ni no Kuni II: Revenant Kingdom', 'Octopath Traveler', 'Pillars of Eternity II: Deadfire'] },
      { name: 'Best Action/Adventure', icon: '⚔️', nominees: ['God of War', "Assassin's Creed Odyssey", "Marvel's Spider-Man", 'Red Dead Redemption 2', 'Shadow of the Tomb Raider'] }
    ]
  },
  2019: {
    categories: [
      { name: 'Game of the Year', icon: '🏆', nominees: ['Sekiro: Shadows Die Twice', 'Control', 'Death Stranding', 'Resident Evil 2', 'Super Smash Bros. Ultimate', 'The Outer Worlds'] },
      { name: 'Best Game Direction', icon: '🎬', nominees: ['Death Stranding', 'Control', 'Outer Wilds', 'Resident Evil 2', 'Sekiro: Shadows Die Twice'] },
      { name: 'Best Narrative', icon: '📖', nominees: ['Disco Elysium', 'A Plague Tale: Innocence', 'Control', 'Death Stranding', 'The Outer Worlds'] },
      { name: 'Best Art Direction', icon: '🎨', nominees: ['Control', 'Death Stranding', 'Gris', 'Sayonara Wild Hearts', 'Sekiro: Shadows Die Twice'] },
      { name: 'Best Music', icon: '🎵', nominees: ['Death Stranding', 'Cadence of Hyrule', 'Devil May Cry 5', 'Kingdom Hearts III', 'Sayonara Wild Hearts'] },
      { name: 'Best Independent Game', icon: '🌱', nominees: ['Disco Elysium', 'Baba Is You', 'Katana ZERO', 'Outer Wilds', 'Untitled Goose Game'] },
      { name: 'Best Role Playing Game', icon: '📜', nominees: ['Disco Elysium', 'Final Fantasy XIV', 'Kingdom Hearts III', 'Monster Hunter World: Iceborne', 'The Outer Worlds'] },
      { name: 'Best Action/Adventure', icon: '⚔️', nominees: ['Sekiro: Shadows Die Twice', 'Borderlands 3', 'Control', 'Death Stranding', 'Resident Evil 2'] }
    ]
  },
  2020: {
    categories: [
      { name: 'Game of the Year', icon: '🏆', nominees: ['The Last of Us Part II', 'Animal Crossing: New Horizons', 'Doom Eternal', 'Final Fantasy VII Remake', 'Ghost of Tsushima', 'Hades'] },
      { name: 'Best Game Direction', icon: '🎬', nominees: ['The Last of Us Part II', 'Final Fantasy VII Remake', 'Ghost of Tsushima', 'Hades', 'Half-Life: Alyx'] },
      { name: 'Best Narrative', icon: '📖', nominees: ['The Last of Us Part II', '13 Sentinels: Aegis Rim', 'Final Fantasy VII Remake', 'Ghost of Tsushima', 'Hades'] },
      { name: 'Best Art Direction', icon: '🎨', nominees: ['Ghost of Tsushima', 'Final Fantasy VII Remake', 'Hades', 'The Last of Us Part II', 'Ori and the Will of the Wisps'] },
      { name: 'Best Music', icon: '🎵', nominees: ['Final Fantasy VII Remake', 'Doom Eternal', 'Hades', 'Ori and the Will of the Wisps', 'The Last of Us Part II'] },
      { name: 'Best Independent Game', icon: '🌱', nominees: ['Hades', 'Carrion', 'Fall Guys: Ultimate Knockout', 'Spelunky 2', 'Spiritfarer'] },
      { name: 'Best Role Playing Game', icon: '📜', nominees: ['Final Fantasy VII Remake', 'Genshin Impact', 'Persona 5 Royal', 'Wasteland 3', 'Yakuza: Like a Dragon'] },
      { name: 'Best Action/Adventure', icon: '⚔️', nominees: ['The Last of Us Part II', "Assassin's Creed Valhalla", 'Ghost of Tsushima', "Marvel's Spider-Man: Miles Morales", 'Ori and the Will of the Wisps'] }
    ]
  },
  2021: {
    categories: [
      { name: 'Game of the Year', icon: '🏆', nominees: ['It Takes Two', 'Deathloop', 'Metroid Dread', 'Psychonauts 2', 'Ratchet & Clank: Rift Apart', 'Resident Evil Village'] },
      { name: 'Best Game Direction', icon: '🎬', nominees: ['Deathloop', 'It Takes Two', 'Psychonauts 2', 'Ratchet & Clank: Rift Apart', 'Returnal'] },
      { name: 'Best Narrative', icon: '📖', nominees: ["Marvel's Guardians of the Galaxy", 'Deathloop', 'It Takes Two', 'Life is Strange: True Colors', 'Psychonauts 2'] },
      { name: 'Best Art Direction', icon: '🎨', nominees: ['Deathloop', 'Kena: Bridge of Spirits', 'Psychonauts 2', 'Ratchet & Clank: Rift Apart', 'The Artful Escape'] },
      { name: 'Best Music', icon: '🎵', nominees: ['NieR Replicant ver.1.22474487139...', 'Cyberpunk 2077', 'Deathloop', "Marvel's Guardians of the Galaxy", 'The Artful Escape'] },
      { name: 'Best Independent Game', icon: '🌱', nominees: ['Kena: Bridge of Spirits', '12 Minutes', "Death's Door", 'Inscryption', 'Loop Hero'] },
      { name: 'Best Role Playing Game', icon: '📜', nominees: ['Tales of Arise', 'Cyberpunk 2077', 'Monster Hunter Rise', 'Scarlet Nexus', 'Shin Megami Tensei V'] },
      { name: 'Best Action/Adventure', icon: '⚔️', nominees: ['Resident Evil Village', "Marvel's Guardians of the Galaxy", 'Psychonauts 2', 'Ratchet & Clank: Rift Apart', 'The Legend of Zelda: Skyward Sword HD'] }
    ]
  },
  2022: {
    categories: [
      { name: 'Game of the Year', icon: '🏆', nominees: ['Elden Ring', 'A Plague Tale: Requiem', 'God of War Ragnarök', 'Horizon Forbidden West', 'Stray', 'Xenoblade Chronicles 3'] },
      { name: 'Best Game Direction', icon: '🎬', nominees: ['Elden Ring', 'God of War Ragnarök', 'Horizon Forbidden West', 'Immortality', 'Stray'] },
      { name: 'Best Narrative', icon: '📖', nominees: ['God of War Ragnarök', 'A Plague Tale: Requiem', 'Elden Ring', 'Horizon Forbidden West', 'Immortality'] },
      { name: 'Best Art Direction', icon: '🎨', nominees: ['Elden Ring', 'God of War Ragnarök', 'Horizon Forbidden West', 'Scorn', 'Stray'] },
      { name: 'Best Music', icon: '🎵', nominees: ['God of War Ragnarök', 'A Plague Tale: Requiem', 'Elden Ring', 'Metal: Hellsinger', 'Xenoblade Chronicles 3'] },
      { name: 'Best Independent Game', icon: '🌱', nominees: ['Stray', 'Cult of the Lamb', 'Neon White', 'Sifu', 'TUNIC'] },
      { name: 'Best Role Playing Game', icon: '📜', nominees: ['Elden Ring', 'Live A Live', 'Pokémon Legends: Arceus', 'Triangle Strategy', 'Xenoblade Chronicles 3'] },
      { name: 'Best Action/Adventure', icon: '⚔️', nominees: ['God of War Ragnarök', 'A Plague Tale: Requiem', 'Horizon Forbidden West', 'Stray', 'TUNIC'] }
    ]
  },
  2023: {
    categories: [
      { name: 'Game of the Year', icon: '🏆', nominees: ["Baldur's Gate 3", 'Alan Wake 2', "Marvel's Spider-Man 2", 'Resident Evil 4', 'Super Mario Bros. Wonder', 'The Legend of Zelda: Tears of the Kingdom'] },
      { name: 'Best Game Direction', icon: '🎬', nominees: ['Alan Wake 2', "Baldur's Gate 3", "Marvel's Spider-Man 2", 'Super Mario Bros. Wonder', 'The Legend of Zelda: Tears of the Kingdom'] },
      { name: 'Best Narrative', icon: '📖', nominees: ['Alan Wake 2', "Baldur's Gate 3", 'Cyberpunk 2077: Phantom Liberty', 'Final Fantasy XVI', "Marvel's Spider-Man 2"] },
      { name: 'Best Art Direction', icon: '🎨', nominees: ['Alan Wake 2', 'Hi-Fi Rush', 'Lies of P', 'Super Mario Bros. Wonder', 'The Legend of Zelda: Tears of the Kingdom'] },
      { name: 'Best Music', icon: '🎵', nominees: ['Final Fantasy XVI', 'Alan Wake 2', "Baldur's Gate 3", 'Hi-Fi Rush', 'The Legend of Zelda: Tears of the Kingdom'] },
      { name: 'Best Independent Game', icon: '🌱', nominees: ['Sea of Stars', 'Cocoon', 'Dave the Diver', 'Dredge', 'Viewfinder'] },
      { name: 'Best Role Playing Game', icon: '📜', nominees: ["Baldur's Gate 3", 'Final Fantasy XVI', 'Lies of P', 'Sea of Stars', 'Starfield'] },
      { name: 'Best Action/Adventure', icon: '⚔️', nominees: ['The Legend of Zelda: Tears of the Kingdom', 'Alan Wake 2', "Marvel's Spider-Man 2", 'Resident Evil 4', 'Star Wars Jedi: Survivor'] }
    ]
  },
  2024: {
    categories: [
      { name: 'Game of the Year', icon: '🏆', nominees: ['Astro Bot', 'Balatro', 'Black Myth: Wukong', 'Elden Ring: Shadow of the Erdtree', 'Final Fantasy VII Rebirth', 'Metaphor: ReFantazio'] },
      { name: 'Best Game Direction', icon: '🎬', nominees: ['Astro Bot', 'Balatro', 'Black Myth: Wukong', 'Elden Ring: Shadow of the Erdtree', 'Final Fantasy VII Rebirth', 'Metaphor: ReFantazio'] },
      { name: 'Best Narrative', icon: '📖', nominees: ['Metaphor: ReFantazio', 'Final Fantasy VII Rebirth', 'Like a Dragon: Infinite Wealth', "Senua's Saga: Hellblade II", 'Silent Hill 2'] },
      { name: 'Best Art Direction', icon: '🎨', nominees: ['Metaphor: ReFantazio', 'Astro Bot', 'Black Myth: Wukong', 'Elden Ring: Shadow of the Erdtree', 'Neva'] },
      { name: 'Best Music', icon: '🎵', nominees: ['Final Fantasy VII Rebirth', 'Astro Bot', 'Metaphor: ReFantazio', 'Silent Hill 2', 'Stellar Blade'] },
      { name: 'Best Independent Game', icon: '🌱', nominees: ['Balatro', 'Animal Well', 'Lorelei and the Laser Eyes', 'Neva', 'UFO 50'] },
      { name: 'Best Role Playing Game', icon: '📜', nominees: ['Metaphor: ReFantazio', 'Dragon Age: The Veilguard', "Dragon's Dogma 2", 'Elden Ring: Shadow of the Erdtree', 'Final Fantasy VII Rebirth', 'Like a Dragon: Infinite Wealth'] },
      { name: 'Best Action/Adventure', icon: '⚔️', nominees: ['Astro Bot', 'Prince of Persia: The Lost Crown', 'Silent Hill 2', 'Star Wars Outlaws', 'The Legend of Zelda: Echoes of Wisdom'] }
    ]
  }
};

// ═══════════════════════════════════════════════════
//  STATE
// ═══════════════════════════════════════════════════
let activeYear = 2024;

/** Tracks submitted picks per year.
 *  Shape: { 2014: { 'Game of the Year': 'Dragon Age...', 'Best Narrative': 'NA', ... }, ... } */
const submittedYears = {};

// ═══════════════════════════════════════════════════
//  HELPERS
// ═══════════════════════════════════════════════════
function escapeHtml(s) {
  const d = document.createElement('div');
  d.textContent = s;
  return d.innerHTML;
}

function escapeAttr(s) {
  return s.replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

/**
 * Wraps a value in double-quotes for CSV, escaping any internal
 * double-quotes by doubling them (RFC 4180).
 * This safely handles commas, ampersands, colons, etc. in game names.
 */
function csvField(value) {
  const escaped = String(value).replace(/"/g, '""');
  return '"' + escaped + '"';
}

// ═══════════════════════════════════════════════════
//  BUILD UI
// ═══════════════════════════════════════════════════
function init() {
  const tabsContainer = document.getElementById('yearTabs');
  const panelsContainer = document.getElementById('yearPanels');
  const years = Object.keys(gotyData).map(Number).sort();

  // ── Create year tabs ──
  years.forEach(year => {
    const tab = document.createElement('div');
    tab.className = 'enc-tab' + (year === activeYear ? ' active' : '');
    tab.textContent = year;
    tab.dataset.year = year;
    tab.addEventListener('click', () => switchYear(year));
    tabsContainer.appendChild(tab);
  });

  // ── Create year panels ──
  years.forEach(year => {
    const data = gotyData[year];
    const panel = document.createElement('div');
    panel.className = 'enc-year-panel' + (year === activeYear ? ' active' : '');
    panel.id = 'panel-' + year;

    let html = '';
    data.categories.forEach((cat, ci) => {
      const groupName = `y${year}_c${ci}`;
      html += `<div class="enc-category" data-cat-idx="${ci}">`;
      html += `<div class="enc-cat-header">`;
      html += `<span class="enc-cat-icon">${cat.icon}</span>`;
      html += `<span class="enc-cat-name">${cat.name}</span>`;
      html += `</div>`;
      html += `<div class="enc-nominees">`;
      cat.nominees.forEach((nom, ni) => {
        const id = `${groupName}_n${ni}`;
        html += `<div class="enc-nominee" data-nominee="${escapeAttr(nom)}">`;
        html += `<input type="radio" name="${groupName}" id="${id}" value="${escapeAttr(nom)}" />`;
        html += `<label for="${id}">${escapeHtml(nom)}</label>`;
        html += `</div>`;
      });
      html += `</div></div>`;
    });

    // Action button (Guardar / Reiniciar)
    html += `<div class="enc-actions">`;
    html += `<button class="enc-btn" id="btn-${year}" onclick="handleAction(${year})">Guardar mis picks</button>`;
    html += `</div>`;

    panel.innerHTML = html;
    panelsContainer.appendChild(panel);
  });

  // ── Global CSV download section (after all panels) ──
  const csvSection = document.createElement('div');
  csvSection.className = 'enc-csv-section';
  csvSection.id = 'csvSection';

  const csvBtn = document.createElement('button');
  csvBtn.className = 'enc-btn--csv hidden';
  csvBtn.id = 'csvBtn';
  csvBtn.textContent = '📥 Descargar CSV';
  csvBtn.disabled = true;
  csvBtn.addEventListener('click', downloadCSV);

  csvSection.appendChild(csvBtn);
  panelsContainer.parentNode.insertBefore(csvSection, panelsContainer.nextSibling);
}

// ═══════════════════════════════════════════════════
//  TAB SWITCHING
// ═══════════════════════════════════════════════════
function switchYear(year) {
  activeYear = year;
  document.querySelectorAll('.enc-tab').forEach(t => {
    t.classList.toggle('active', Number(t.dataset.year) === year);
  });
  document.querySelectorAll('.enc-year-panel').forEach(p => {
    p.classList.toggle('active', p.id === 'panel-' + year);
  });
}

// ═══════════════════════════════════════════════════
//  SUBMIT / RESET / HANDLE ACTION
// ═══════════════════════════════════════════════════

/**
 * Toggles between submitting picks and resetting them for a given year.
 */
function handleAction(year) {
  if (submittedYears[year]) {
    resetYear(year);
  } else {
    submitYear(year);
  }
}

/**
 * Collects radio selections for the year and stores them.
 * Categories with no selection are saved as 'NA'.
 */
function submitYear(year) {
  const panel = document.getElementById('panel-' + year);
  const data = gotyData[year];
  const picks = {};

  data.categories.forEach((cat, ci) => {
    const groupName = `y${year}_c${ci}`;
    const selected = panel.querySelector(`input[name="${groupName}"]:checked`);
    picks[cat.name] = selected ? selected.value : 'NA';
  });

  // Save picks
  submittedYears[year] = picks;

  // Visual feedback on panel and tab
  panel.classList.add('submitted');
  const tab = document.querySelector(`.enc-tab[data-year="${year}"]`);
  if (tab) tab.classList.add('submitted');

  // Change button text
  document.getElementById('btn-' + year).textContent = 'Reiniciar';

  // Show/enable CSV download button
  updateCSVButton();
}

/**
 * Clears all selections for a year and removes its submitted state.
 */
function resetYear(year) {
  const panel = document.getElementById('panel-' + year);

  // Clear radio selections
  panel.querySelectorAll('input[type="radio"]').forEach(r => { r.checked = false; });

  // Remove submitted visual state
  panel.classList.remove('submitted');
  const tab = document.querySelector(`.enc-tab[data-year="${year}"]`);
  if (tab) tab.classList.remove('submitted');

  // Remove from submitted data
  delete submittedYears[year];

  // Reset button text
  document.getElementById('btn-' + year).textContent = 'Guardar mis picks';

  // Hide CSV button if nothing is submitted
  updateCSVButton();
}

/**
 * Shows the CSV download button when at least one year is submitted,
 * hides it otherwise.
 */
function updateCSVButton() {
  const csvBtn = document.getElementById('csvBtn');
  if (!csvBtn) return;

  const hasSubmissions = Object.keys(submittedYears).length > 0;
  csvBtn.disabled = !hasSubmissions;
  csvBtn.classList.toggle('hidden', !hasSubmissions);
}

// ═══════════════════════════════════════════════════
//  CSV EXPORT
// ═══════════════════════════════════════════════════

/**
 * Generates and downloads a CSV file with all submitted picks.
 * Columns: Año, Categoría, Mi Pick
 * Fields are quoted to safely handle commas, ampersands, colons, etc.
 */
function downloadCSV() {
  const BOM = '\uFEFF'; // UTF-8 BOM for proper accent/special char display
  const header = [csvField('Año'), csvField('Categoría'), csvField('Mi Pick')].join(',');
  const rows = [header];

  // Iterate years in ascending order
  const sortedYears = Object.keys(submittedYears).map(Number).sort();

  sortedYears.forEach(year => {
    const picks = submittedYears[year];
    const data = gotyData[year];

    // Use gotyData category order to keep consistent row ordering
    data.categories.forEach(cat => {
      const pick = picks[cat.name] || 'NA';
      rows.push([csvField(year), csvField(cat.name), csvField(pick)].join(','));
    });
  });

  const csvContent = BOM + rows.join('\r\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = 'mis_picks_goty.csv';
  link.style.display = 'none';
  document.body.appendChild(link);
  link.click();

  // Cleanup
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

// ═══════════════════════════════════════════════════
//  INIT ON LOAD
// ═══════════════════════════════════════════════════
init();
