// ═══════════════════════════════════════════════════════════════════
//  SISTEMA DE ENCUESTAS INTERACTIVAS (2014–2025)
//  The Game Awards Archive
// ═══════════════════════════════════════════════════════════════════

/**
 * Categorías canónicas de The Game Awards (orden secuencial exacto)
 */
const CANONICAL_CATEGORIES = [
    'Game of the Year',
    'Best Independent Game',
    'Best Narrative',
    'Best Art Direction',
    'Best Soundtrack',
    'Best Multiplayer',
    'Best Game Direction'
];

/**
 * Identificadores de anclaje para navegación e integración con el buscador
 */
const CATEGORY_ANCHOR_MAP = {
    'Game of the Year': 'cat-goty',
    'Best Independent Game': 'cat-indie',
    'Best Narrative': 'cat-narrative',
    'Best Art Direction': 'cat-art',
    'Best Soundtrack': 'cat-soundtrack',
    'Best Multiplayer': 'cat-multiplayer',
    'Best Game Direction': 'cat-direction'
};

/**
 * Registro de respaldo embebido de nominados (2014 a 2025)
 * Permite renderizado instantáneo y funcionamiento offline / protocolo file://
 */
const FALLBACK_GOTY_DATA = {
  "2014": {
    "Game of the Year": [
      {
        "name": "Dragon Age: Inquisition",
        "isWinner": true,
        "image": "../imagenes/covers/dragon_age_inquisition.jpg"
      },
      {
        "name": "Bayonetta 2",
        "isWinner": false,
        "image": "../imagenes/covers/bayonetta_2.jpg"
      },
      {
        "name": "Dark Souls II",
        "isWinner": false,
        "image": "../imagenes/covers/dark_souls_ii.jpg"
      },
      {
        "name": "Hearthstone",
        "isWinner": false,
        "image": "../imagenes/covers/hearthstone.jpg"
      },
      {
        "name": "Middle-earth: Shadow of Mordor",
        "isWinner": false,
        "image": "../imagenes/covers/middle-earth_shadow_of_mordor.jpg"
      }
    ],
    "Best Independent Game": [
      {
        "name": "Shovel Knight",
        "isWinner": true,
        "image": "../imagenes/covers/shovel_knight.jpg"
      },
      {
        "name": "Broken Age Part 1",
        "isWinner": false,
        "image": "../imagenes/covers/broken_age_part_1.jpg"
      },
      {
        "name": "Monument Valley",
        "isWinner": false,
        "image": "../imagenes/covers/monument_valley.jpg"
      },
      {
        "name": "Transistor",
        "isWinner": false,
        "image": "../imagenes/covers/transistor.jpg"
      },
      {
        "name": "The Vanishing of Ethan Carter",
        "isWinner": false,
        "image": "../imagenes/covers/the_vanishing_of_ethan_carter.jpg"
      }
    ],
    "Best Narrative": [
      {
        "name": "Valiant Hearts: The Great War",
        "isWinner": true,
        "image": "../imagenes/covers/valiant_hearts_the_great_war.jpg"
      },
      {
        "name": "South Park: The Stick of Truth",
        "isWinner": false,
        "image": "../imagenes/covers/south_park_the_stick_of_truth.jpg"
      },
      {
        "name": "The Walking Dead: Season Two",
        "isWinner": false,
        "image": "../imagenes/covers/the_walking_dead_season_two.jpg"
      },
      {
        "name": "The Wolf Among Us",
        "isWinner": false,
        "image": "../imagenes/covers/the_wolf_among_us.jpg"
      },
      {
        "name": "Wolfenstein: The New Order",
        "isWinner": false,
        "image": "../imagenes/covers/wolfenstein_the_new_order.jpg"
      }
    ],
    "Best Art Direction": [
      {
        "name": "Monument Valley",
        "isWinner": true,
        "image": "../imagenes/covers/monument_valley.jpg"
      },
      {
        "name": "Assassin's Creed Unity",
        "isWinner": false,
        "image": "../imagenes/covers/assassins_creed_unity.jpg"
      },
      {
        "name": "Child of Light",
        "isWinner": false,
        "image": "../imagenes/covers/child_of_light.jpg"
      },
      {
        "name": "Destiny",
        "isWinner": false,
        "image": "../imagenes/covers/destiny.jpg"
      },
      {
        "name": "Sunset Overdrive",
        "isWinner": false,
        "image": "../imagenes/covers/sunset_overdrive.jpg"
      }
    ],
    "Best Soundtrack": [
      {
        "name": "Destiny",
        "isWinner": true,
        "image": "../imagenes/covers/destiny.jpg"
      },
      {
        "name": "Alien: Isolation",
        "isWinner": false,
        "image": "../imagenes/covers/alien_isolation.jpg"
      },
      {
        "name": "Child of Light",
        "isWinner": false,
        "image": "../imagenes/covers/child_of_light.jpg"
      },
      {
        "name": "Sunset Overdrive",
        "isWinner": false,
        "image": "../imagenes/covers/sunset_overdrive.jpg"
      },
      {
        "name": "Transistor",
        "isWinner": false,
        "image": "../imagenes/covers/transistor.jpg"
      }
    ],
    "Best Multiplayer": [
      {
        "name": "Destiny",
        "isWinner": true,
        "image": "../imagenes/covers/destiny.jpg"
      },
      {
        "name": "Call of Duty: Advanced Warfare",
        "isWinner": false,
        "image": "../imagenes/covers/call_of_duty_advanced_warfare.jpg"
      },
      {
        "name": "Dark Souls II",
        "isWinner": false,
        "image": "../imagenes/covers/dark_souls_ii.jpg"
      },
      {
        "name": "Hearthstone",
        "isWinner": false,
        "image": "../imagenes/covers/hearthstone.jpg"
      },
      {
        "name": "Titanfall",
        "isWinner": false,
        "image": "../imagenes/covers/titanfall.jpg"
      }
    ],
    "Best Game Direction": [
      {
        "name": "Nintendo",
        "isWinner": true,
        "image": "../imagenes/covers/nintendo.jpg"
      },
      {
        "name": "Blizzard Entertainment",
        "isWinner": false,
        "image": "../imagenes/covers/blizzard_entertainment.jpg"
      },
      {
        "name": "Monolith Productions",
        "isWinner": false,
        "image": "../imagenes/covers/monolith_productions.jpg"
      },
      {
        "name": "Telltale Games",
        "isWinner": false,
        "image": "../imagenes/covers/telltale_games.jpg"
      },
      {
        "name": "Ubisoft Montreal",
        "isWinner": false,
        "image": "../imagenes/covers/ubisoft_montreal.jpg"
      }
    ]
  },
  "2015": {
    "Game of the Year": [
      {
        "name": "The Witcher 3: Wild Hunt",
        "isWinner": true,
        "image": "../imagenes/covers/the_witcher_3_wild_hunt.jpg"
      },
      {
        "name": "Bloodborne",
        "isWinner": false,
        "image": "../imagenes/covers/bloodborne.jpg"
      },
      {
        "name": "Fallout 4",
        "isWinner": false,
        "image": "../imagenes/covers/fallout_4.jpg"
      },
      {
        "name": "Metal Gear Solid V: The Phantom Pain",
        "isWinner": false,
        "image": "../imagenes/covers/metal_gear_solid_v_the_phantom_pain.jpg"
      },
      {
        "name": "Super Mario Maker",
        "isWinner": false,
        "image": "../imagenes/covers/super_mario_maker.jpg"
      }
    ],
    "Best Independent Game": [
      {
        "name": "Rocket League",
        "isWinner": true,
        "image": "../imagenes/covers/rocket_league.jpg"
      },
      {
        "name": "Axiom Verge",
        "isWinner": false,
        "image": "../imagenes/covers/axiom_verge.jpg"
      },
      {
        "name": "Her Story",
        "isWinner": false,
        "image": "../imagenes/covers/her_story.jpg"
      },
      {
        "name": "Ori and the Blind Forest",
        "isWinner": false,
        "image": "../imagenes/covers/ori_and_the_blind_forest.jpg"
      },
      {
        "name": "Undertale",
        "isWinner": false,
        "image": "../imagenes/covers/undertale.jpg"
      }
    ],
    "Best Narrative": [
      {
        "name": "Her Story",
        "isWinner": true,
        "image": "../imagenes/covers/her_story.jpg"
      },
      {
        "name": "Life Is Strange",
        "isWinner": false,
        "image": "../imagenes/covers/life_is_strange.jpg"
      },
      {
        "name": "Tales from the Borderlands",
        "isWinner": false,
        "image": "../imagenes/covers/tales_from_the_borderlands.jpg"
      },
      {
        "name": "The Witcher 3: Wild Hunt",
        "isWinner": false,
        "image": "../imagenes/covers/the_witcher_3_wild_hunt.jpg"
      },
      {
        "name": "Until Dawn",
        "isWinner": false,
        "image": "../imagenes/covers/until_dawn.jpg"
      }
    ],
    "Best Art Direction": [
      {
        "name": "Ori and the Blind Forest",
        "isWinner": true,
        "image": "../imagenes/covers/ori_and_the_blind_forest.jpg"
      },
      {
        "name": "Batman: Arkham Knight",
        "isWinner": false,
        "image": "../imagenes/covers/batman_arkham_knight.jpg"
      },
      {
        "name": "Bloodborne",
        "isWinner": false,
        "image": "../imagenes/covers/bloodborne.jpg"
      },
      {
        "name": "Metal Gear Solid V: The Phantom Pain",
        "isWinner": false,
        "image": "../imagenes/covers/metal_gear_solid_v_the_phantom_pain.jpg"
      },
      {
        "name": "The Witcher 3: Wild Hunt",
        "isWinner": false,
        "image": "../imagenes/covers/the_witcher_3_wild_hunt.jpg"
      }
    ],
    "Best Soundtrack": [
      {
        "name": "Metal Gear Solid V: The Phantom Pain",
        "isWinner": true,
        "image": "../imagenes/covers/metal_gear_solid_v_the_phantom_pain.jpg"
      },
      {
        "name": "Fallout 4",
        "isWinner": false,
        "image": "../imagenes/covers/fallout_4.jpg"
      },
      {
        "name": "Halo 5: Guardians",
        "isWinner": false,
        "image": "../imagenes/covers/halo_5_guardians.jpg"
      },
      {
        "name": "Ori and the Blind Forest",
        "isWinner": false,
        "image": "../imagenes/covers/ori_and_the_blind_forest.jpg"
      },
      {
        "name": "The Witcher 3: Wild Hunt",
        "isWinner": false,
        "image": "../imagenes/covers/the_witcher_3_wild_hunt.jpg"
      }
    ],
    "Best Multiplayer": [
      {
        "name": "Splatoon",
        "isWinner": true,
        "image": "../imagenes/covers/splatoon.jpg"
      },
      {
        "name": "Call of Duty: Black Ops III",
        "isWinner": false,
        "image": "../imagenes/covers/call_of_duty_black_ops_iii.jpg"
      },
      {
        "name": "Destiny: The Taken King",
        "isWinner": false,
        "image": "../imagenes/covers/destiny_the_taken_king.jpg"
      },
      {
        "name": "Halo 5: Guardians",
        "isWinner": false,
        "image": "../imagenes/covers/halo_5_guardians.jpg"
      },
      {
        "name": "Rocket League",
        "isWinner": false,
        "image": "../imagenes/covers/rocket_league.jpg"
      }
    ],
    "Best Game Direction": [
      {
        "name": "CD Projekt Red",
        "isWinner": true,
        "image": "../imagenes/covers/cd_projekt_red.jpg"
      },
      {
        "name": "Bethesda Game Studios",
        "isWinner": false,
        "image": "../imagenes/covers/bethesda_game_studios.jpg"
      },
      {
        "name": "FromSoftware",
        "isWinner": false,
        "image": "../imagenes/covers/fromsoftware.jpg"
      },
      {
        "name": "Kojima Productions",
        "isWinner": false,
        "image": "../imagenes/covers/kojima_productions.jpg"
      },
      {
        "name": "Nintendo",
        "isWinner": false,
        "image": "../imagenes/covers/nintendo.jpg"
      }
    ]
  },
  "2016": {
    "Game of the Year": [
      {
        "name": "Overwatch",
        "isWinner": true,
        "image": "../imagenes/covers/overwatch.jpg"
      },
      {
        "name": "Doom",
        "isWinner": false,
        "image": "../imagenes/covers/doom.jpg"
      },
      {
        "name": "Inside",
        "isWinner": false,
        "image": "../imagenes/covers/inside.jpg"
      },
      {
        "name": "Titanfall 2",
        "isWinner": false,
        "image": "../imagenes/covers/titanfall_2.jpg"
      },
      {
        "name": "Uncharted 4: A Thief's End",
        "isWinner": false,
        "image": "../imagenes/covers/uncharted_4_a_thiefs_end.jpg"
      }
    ],
    "Best Independent Game": [
      {
        "name": "Inside",
        "isWinner": true,
        "image": "../imagenes/covers/inside.jpg"
      },
      {
        "name": "Firewatch",
        "isWinner": false,
        "image": "../imagenes/covers/firewatch.jpg"
      },
      {
        "name": "Hyper Light Drifter",
        "isWinner": false,
        "image": "../imagenes/covers/hyper_light_drifter.jpg"
      },
      {
        "name": "Stardew Valley",
        "isWinner": false,
        "image": "../imagenes/covers/stardew_valley.jpg"
      },
      {
        "name": "The Witness",
        "isWinner": false,
        "image": "../imagenes/covers/the_witness.jpg"
      }
    ],
    "Best Narrative": [
      {
        "name": "Uncharted 4: A Thief's End",
        "isWinner": true,
        "image": "../imagenes/covers/uncharted_4_a_thiefs_end.jpg"
      },
      {
        "name": "Firewatch",
        "isWinner": false,
        "image": "../imagenes/covers/firewatch.jpg"
      },
      {
        "name": "Inside",
        "isWinner": false,
        "image": "../imagenes/covers/inside.jpg"
      },
      {
        "name": "Mafia III",
        "isWinner": false,
        "image": "../imagenes/covers/mafia_iii.jpg"
      },
      {
        "name": "Oxenfree",
        "isWinner": false,
        "image": "../imagenes/covers/oxenfree.jpg"
      }
    ],
    "Best Art Direction": [
      {
        "name": "Inside",
        "isWinner": true,
        "image": "../imagenes/covers/inside.jpg"
      },
      {
        "name": "Abzû",
        "isWinner": false,
        "image": "../imagenes/covers/abz.jpg"
      },
      {
        "name": "Firewatch",
        "isWinner": false,
        "image": "../imagenes/covers/firewatch.jpg"
      },
      {
        "name": "Overwatch",
        "isWinner": false,
        "image": "../imagenes/covers/overwatch.jpg"
      },
      {
        "name": "Uncharted 4: A Thief's End",
        "isWinner": false,
        "image": "../imagenes/covers/uncharted_4_a_thiefs_end.jpg"
      }
    ],
    "Best Soundtrack": [
      {
        "name": "Doom",
        "isWinner": true,
        "image": "../imagenes/covers/doom.jpg"
      },
      {
        "name": "Battlefield 1",
        "isWinner": false,
        "image": "../imagenes/covers/battlefield_1.jpg"
      },
      {
        "name": "Inside",
        "isWinner": false,
        "image": "../imagenes/covers/inside.jpg"
      },
      {
        "name": "Rez Infinite",
        "isWinner": false,
        "image": "../imagenes/covers/rez_infinite.jpg"
      },
      {
        "name": "Thumper",
        "isWinner": false,
        "image": "../imagenes/covers/thumper.jpg"
      }
    ],
    "Best Multiplayer": [
      {
        "name": "Overwatch",
        "isWinner": true,
        "image": "../imagenes/covers/overwatch.jpg"
      },
      {
        "name": "Battlefield 1",
        "isWinner": false,
        "image": "../imagenes/covers/battlefield_1.jpg"
      },
      {
        "name": "Gears of War 4",
        "isWinner": false,
        "image": "../imagenes/covers/gears_of_war_4.jpg"
      },
      {
        "name": "Titanfall 2",
        "isWinner": false,
        "image": "../imagenes/covers/titanfall_2.jpg"
      },
      {
        "name": "Tom Clancy's Rainbow Six Siege",
        "isWinner": false,
        "image": "../imagenes/covers/tom_clancys_rainbow_six_siege.jpg"
      }
    ],
    "Best Game Direction": [
      {
        "name": "Blizzard Entertainment",
        "isWinner": true,
        "image": "../imagenes/covers/blizzard_entertainment.jpg"
      },
      {
        "name": "DICE",
        "isWinner": false,
        "image": "../imagenes/covers/dice.jpg"
      },
      {
        "name": "id Software",
        "isWinner": false,
        "image": "../imagenes/covers/id_software.jpg"
      },
      {
        "name": "Naughty Dog",
        "isWinner": false,
        "image": "../imagenes/covers/naughty_dog.jpg"
      },
      {
        "name": "Respawn Entertainment",
        "isWinner": false,
        "image": "../imagenes/covers/respawn_entertainment.jpg"
      }
    ]
  },
  "2017": {
    "Game of the Year": [
      {
        "name": "The Legend of Zelda: Breath of the Wild",
        "isWinner": true,
        "image": "../imagenes/covers/the_legend_of_zelda_breath_of_the_wild.jpg"
      },
      {
        "name": "Horizon Zero Dawn",
        "isWinner": false,
        "image": "../imagenes/covers/horizon_zero_dawn.jpg"
      },
      {
        "name": "Persona 5",
        "isWinner": false,
        "image": "../imagenes/covers/persona_5.jpg"
      },
      {
        "name": "PlayerUnknown's Battlegrounds",
        "isWinner": false,
        "image": "../imagenes/covers/playerunknowns_battlegrounds.jpg"
      },
      {
        "name": "Super Mario Odyssey",
        "isWinner": false,
        "image": "../imagenes/covers/super_mario_odyssey.jpg"
      }
    ],
    "Best Independent Game": [
      {
        "name": "Cuphead",
        "isWinner": true,
        "image": "../imagenes/covers/cuphead.jpg"
      },
      {
        "name": "Hellblade: Senua's Sacrifice",
        "isWinner": false,
        "image": "../imagenes/covers/hellblade_senuas_sacrifice.jpg"
      },
      {
        "name": "Night in the Woods",
        "isWinner": false,
        "image": "../imagenes/covers/night_in_the_woods.jpg"
      },
      {
        "name": "Pyre",
        "isWinner": false,
        "image": "../imagenes/covers/pyre.jpg"
      },
      {
        "name": "What Remains of Edith Finch",
        "isWinner": false,
        "image": "../imagenes/covers/what_remains_of_edith_finch.jpg"
      }
    ],
    "Best Narrative": [
      {
        "name": "What Remains of Edith Finch",
        "isWinner": true,
        "image": "../imagenes/covers/what_remains_of_edith_finch.jpg"
      },
      {
        "name": "Hellblade: Senua's Sacrifice",
        "isWinner": false,
        "image": "../imagenes/covers/hellblade_senuas_sacrifice.jpg"
      },
      {
        "name": "Horizon Zero Dawn",
        "isWinner": false,
        "image": "../imagenes/covers/horizon_zero_dawn.jpg"
      },
      {
        "name": "NieR: Automata",
        "isWinner": false,
        "image": "../imagenes/covers/nier_automata.jpg"
      },
      {
        "name": "Wolfenstein II: The New Colossus",
        "isWinner": false,
        "image": "../imagenes/covers/wolfenstein_ii_the_new_colossus.jpg"
      }
    ],
    "Best Art Direction": [
      {
        "name": "Cuphead",
        "isWinner": true,
        "image": "../imagenes/covers/cuphead.jpg"
      },
      {
        "name": "Destiny 2",
        "isWinner": false,
        "image": "../imagenes/covers/destiny_2.jpg"
      },
      {
        "name": "Horizon Zero Dawn",
        "isWinner": false,
        "image": "../imagenes/covers/horizon_zero_dawn.jpg"
      },
      {
        "name": "Persona 5",
        "isWinner": false,
        "image": "../imagenes/covers/persona_5.jpg"
      },
      {
        "name": "The Legend of Zelda: Breath of the Wild",
        "isWinner": false,
        "image": "../imagenes/covers/the_legend_of_zelda_breath_of_the_wild.jpg"
      }
    ],
    "Best Soundtrack": [
      {
        "name": "NieR: Automata",
        "isWinner": true,
        "image": "../imagenes/covers/nier_automata.jpg"
      },
      {
        "name": "Cuphead",
        "isWinner": false,
        "image": "../imagenes/covers/cuphead.jpg"
      },
      {
        "name": "Destiny 2",
        "isWinner": false,
        "image": "../imagenes/covers/destiny_2.jpg"
      },
      {
        "name": "Persona 5",
        "isWinner": false,
        "image": "../imagenes/covers/persona_5.jpg"
      },
      {
        "name": "Super Mario Odyssey",
        "isWinner": false,
        "image": "../imagenes/covers/super_mario_odyssey.jpg"
      },
      {
        "name": "The Legend of Zelda: Breath of the Wild",
        "isWinner": false,
        "image": "../imagenes/covers/the_legend_of_zelda_breath_of_the_wild.jpg"
      }
    ],
    "Best Multiplayer": [
      {
        "name": "PlayerUnknown's Battlegrounds",
        "isWinner": true,
        "image": "../imagenes/covers/playerunknowns_battlegrounds.jpg"
      },
      {
        "name": "Call of Duty: WWII",
        "isWinner": false,
        "image": "../imagenes/covers/call_of_duty_wwii.jpg"
      },
      {
        "name": "Destiny 2",
        "isWinner": false,
        "image": "../imagenes/covers/destiny_2.jpg"
      },
      {
        "name": "Fortnite",
        "isWinner": false,
        "image": "../imagenes/covers/fortnite.jpg"
      },
      {
        "name": "Mario Kart 8 Deluxe",
        "isWinner": false,
        "image": "../imagenes/covers/mario_kart_8_deluxe.jpg"
      },
      {
        "name": "Splatoon 2",
        "isWinner": false,
        "image": "../imagenes/covers/splatoon_2.jpg"
      }
    ],
    "Best Game Direction": [
      {
        "name": "The Legend of Zelda: Breath of the Wild",
        "isWinner": true,
        "image": "../imagenes/covers/the_legend_of_zelda_breath_of_the_wild.jpg"
      },
      {
        "name": "Horizon Zero Dawn",
        "isWinner": false,
        "image": "../imagenes/covers/horizon_zero_dawn.jpg"
      },
      {
        "name": "Resident Evil 7: Biohazard",
        "isWinner": false,
        "image": "../imagenes/covers/resident_evil_7_biohazard.jpg"
      },
      {
        "name": "Super Mario Odyssey",
        "isWinner": false,
        "image": "../imagenes/covers/super_mario_odyssey.jpg"
      },
      {
        "name": "Wolfenstein II: The New Colossus",
        "isWinner": false,
        "image": "../imagenes/covers/wolfenstein_ii_the_new_colossus.jpg"
      }
    ]
  },
  "2018": {
    "Game of the Year": [
      {
        "name": "God of War",
        "isWinner": true,
        "image": "../imagenes/covers/god_of_war.jpg"
      },
      {
        "name": "Assassin's Creed Odyssey",
        "isWinner": false,
        "image": "../imagenes/covers/assassins_creed_odyssey.jpg"
      },
      {
        "name": "Celeste",
        "isWinner": false,
        "image": "../imagenes/covers/celeste.jpg"
      },
      {
        "name": "Marvel's Spider-Man",
        "isWinner": false,
        "image": "../imagenes/covers/marvels_spider-man.jpg"
      },
      {
        "name": "Monster Hunter: World",
        "isWinner": false,
        "image": "../imagenes/covers/monster_hunter_world.jpg"
      },
      {
        "name": "Red Dead Redemption 2",
        "isWinner": false,
        "image": "../imagenes/covers/red_dead_redemption_2.jpg"
      }
    ],
    "Best Independent Game": [
      {
        "name": "Celeste",
        "isWinner": true,
        "image": "../imagenes/covers/celeste.jpg"
      },
      {
        "name": "Dead Cells",
        "isWinner": false,
        "image": "../imagenes/covers/dead_cells.jpg"
      },
      {
        "name": "Into the Breach",
        "isWinner": false,
        "image": "../imagenes/covers/into_the_breach.jpg"
      },
      {
        "name": "Return of the Obra Dinn",
        "isWinner": false,
        "image": "../imagenes/covers/return_of_the_obra_dinn.jpg"
      },
      {
        "name": "The Messenger",
        "isWinner": false,
        "image": "../imagenes/covers/the_messenger.jpg"
      }
    ],
    "Best Narrative": [
      {
        "name": "Red Dead Redemption 2",
        "isWinner": true,
        "image": "../imagenes/covers/red_dead_redemption_2.jpg"
      },
      {
        "name": "Detroit: Become Human",
        "isWinner": false,
        "image": "../imagenes/covers/detroit_become_human.jpg"
      },
      {
        "name": "God of War",
        "isWinner": false,
        "image": "../imagenes/covers/god_of_war.jpg"
      },
      {
        "name": "Life Is Strange 2: Episode 1",
        "isWinner": false,
        "image": "../imagenes/covers/life_is_strange_2_episode_1.jpg"
      },
      {
        "name": "Marvel's Spider-Man",
        "isWinner": false,
        "image": "../imagenes/covers/marvels_spider-man.jpg"
      }
    ],
    "Best Art Direction": [
      {
        "name": "Return of the Obra Dinn",
        "isWinner": true,
        "image": "../imagenes/covers/return_of_the_obra_dinn.jpg"
      },
      {
        "name": "Assassin's Creed Odyssey",
        "isWinner": false,
        "image": "../imagenes/covers/assassins_creed_odyssey.jpg"
      },
      {
        "name": "God of War",
        "isWinner": false,
        "image": "../imagenes/covers/god_of_war.jpg"
      },
      {
        "name": "Octopath Traveler",
        "isWinner": false,
        "image": "../imagenes/covers/octopath_traveler.jpg"
      },
      {
        "name": "Red Dead Redemption 2",
        "isWinner": false,
        "image": "../imagenes/covers/red_dead_redemption_2.jpg"
      }
    ],
    "Best Soundtrack": [
      {
        "name": "Red Dead Redemption 2",
        "isWinner": true,
        "image": "../imagenes/covers/red_dead_redemption_2.jpg"
      },
      {
        "name": "Celeste",
        "isWinner": false,
        "image": "../imagenes/covers/celeste.jpg"
      },
      {
        "name": "God of War",
        "isWinner": false,
        "image": "../imagenes/covers/god_of_war.jpg"
      },
      {
        "name": "Marvel's Spider-Man",
        "isWinner": false,
        "image": "../imagenes/covers/marvels_spider-man.jpg"
      },
      {
        "name": "Ni no Kuni II: Revenant Kingdom",
        "isWinner": false,
        "image": "../imagenes/covers/ni_no_kuni_ii_revenant_kingdom.jpg"
      },
      {
        "name": "Octopath Traveler",
        "isWinner": false,
        "image": "../imagenes/covers/octopath_traveler.jpg"
      }
    ],
    "Best Multiplayer": [
      {
        "name": "Fortnite",
        "isWinner": true,
        "image": "../imagenes/covers/fortnite.jpg"
      },
      {
        "name": "Call of Duty: Black Ops 4",
        "isWinner": false,
        "image": "../imagenes/covers/call_of_duty_black_ops_4.jpg"
      },
      {
        "name": "Destiny 2: Forsaken",
        "isWinner": false,
        "image": "../imagenes/covers/destiny_2_forsaken.jpg"
      },
      {
        "name": "Monster Hunter: World",
        "isWinner": false,
        "image": "../imagenes/covers/monster_hunter_world.jpg"
      },
      {
        "name": "Sea of Thieves",
        "isWinner": false,
        "image": "../imagenes/covers/sea_of_thieves.jpg"
      }
    ],
    "Best Game Direction": [
      {
        "name": "God of War",
        "isWinner": true,
        "image": "../imagenes/covers/god_of_war.jpg"
      },
      {
        "name": "A Way Out",
        "isWinner": false,
        "image": "../imagenes/covers/a_way_out.jpg"
      },
      {
        "name": "Detroit: Become Human",
        "isWinner": false,
        "image": "../imagenes/covers/detroit_become_human.jpg"
      },
      {
        "name": "Marvel's Spider-Man",
        "isWinner": false,
        "image": "../imagenes/covers/marvels_spider-man.jpg"
      },
      {
        "name": "Red Dead Redemption 2",
        "isWinner": false,
        "image": "../imagenes/covers/red_dead_redemption_2.jpg"
      }
    ]
  },
  "2019": {
    "Game of the Year": [
      {
        "name": "Sekiro: Shadows Die Twice",
        "isWinner": true,
        "image": "../imagenes/covers/sekiro_shadows_die_twice.jpg"
      },
      {
        "name": "Control",
        "isWinner": false,
        "image": "../imagenes/covers/control.jpg"
      },
      {
        "name": "Death Stranding",
        "isWinner": false,
        "image": "../imagenes/covers/death_stranding.jpg"
      },
      {
        "name": "Resident Evil 2",
        "isWinner": false,
        "image": "../imagenes/covers/resident_evil_2.jpg"
      },
      {
        "name": "Super Smash Bros. Ultimate",
        "isWinner": false,
        "image": "../imagenes/covers/super_smash_bros_ultimate.jpg"
      },
      {
        "name": "The Outer Worlds",
        "isWinner": false,
        "image": "../imagenes/covers/the_outer_worlds.jpg"
      }
    ],
    "Best Independent Game": [
      {
        "name": "Disco Elysium",
        "isWinner": true,
        "image": "../imagenes/covers/disco_elysium.jpg"
      },
      {
        "name": "Baba Is You",
        "isWinner": false,
        "image": "../imagenes/covers/baba_is_you.jpg"
      },
      {
        "name": "Katana Zero",
        "isWinner": false,
        "image": "../imagenes/covers/katana_zero.jpg"
      },
      {
        "name": "Outer Wilds",
        "isWinner": false,
        "image": "../imagenes/covers/outer_wilds.jpg"
      },
      {
        "name": "Untitled Goose Game",
        "isWinner": false,
        "image": "../imagenes/covers/untitled_goose_game.jpg"
      }
    ],
    "Best Narrative": [
      {
        "name": "Disco Elysium",
        "isWinner": true,
        "image": "../imagenes/covers/disco_elysium.jpg"
      },
      {
        "name": "A Plague Tale: Innocence",
        "isWinner": false,
        "image": "../imagenes/covers/a_plague_tale_innocence.jpg"
      },
      {
        "name": "Control",
        "isWinner": false,
        "image": "../imagenes/covers/control.jpg"
      },
      {
        "name": "Death Stranding",
        "isWinner": false,
        "image": "../imagenes/covers/death_stranding.jpg"
      },
      {
        "name": "The Outer Worlds",
        "isWinner": false,
        "image": "../imagenes/covers/the_outer_worlds.jpg"
      }
    ],
    "Best Art Direction": [
      {
        "name": "Control",
        "isWinner": true,
        "image": "../imagenes/covers/control.jpg"
      },
      {
        "name": "Death Stranding",
        "isWinner": false,
        "image": "../imagenes/covers/death_stranding.jpg"
      },
      {
        "name": "Gris",
        "isWinner": false,
        "image": "../imagenes/covers/gris.jpg"
      },
      {
        "name": "Sayonara Wild Hearts",
        "isWinner": false,
        "image": "../imagenes/covers/sayonara_wild_hearts.jpg"
      },
      {
        "name": "Sekiro: Shadows Die Twice",
        "isWinner": false,
        "image": "../imagenes/covers/sekiro_shadows_die_twice.jpg"
      },
      {
        "name": "The Legend of Zelda: Link's Awakening",
        "isWinner": false,
        "image": "../imagenes/covers/the_legend_of_zelda_links_awakening.jpg"
      }
    ],
    "Best Soundtrack": [
      {
        "name": "Death Stranding",
        "isWinner": true,
        "image": "../imagenes/covers/death_stranding.jpg"
      },
      {
        "name": "Cadence of Hyrule",
        "isWinner": false,
        "image": "../imagenes/covers/cadence_of_hyrule.jpg"
      },
      {
        "name": "Devil May Cry 5",
        "isWinner": false,
        "image": "../imagenes/covers/devil_may_cry_5.jpg"
      },
      {
        "name": "Kingdom Hearts III",
        "isWinner": false,
        "image": "../imagenes/covers/kingdom_hearts_iii.jpg"
      },
      {
        "name": "Sayonara Wild Hearts",
        "isWinner": false,
        "image": "../imagenes/covers/sayonara_wild_hearts.jpg"
      }
    ],
    "Best Multiplayer": [
      {
        "name": "Apex Legends",
        "isWinner": true,
        "image": "../imagenes/covers/apex_legends.jpg"
      },
      {
        "name": "Borderlands 3",
        "isWinner": false,
        "image": "../imagenes/covers/borderlands_3.jpg"
      },
      {
        "name": "Call of Duty: Modern Warfare",
        "isWinner": false,
        "image": "../imagenes/covers/call_of_duty_modern_warfare.jpg"
      },
      {
        "name": "Tetris 99",
        "isWinner": false,
        "image": "../imagenes/covers/tetris_99.jpg"
      },
      {
        "name": "Tom Clancy's The Division 2",
        "isWinner": false,
        "image": "../imagenes/covers/tom_clancys_the_division_2.jpg"
      }
    ],
    "Best Game Direction": [
      {
        "name": "Death Stranding",
        "isWinner": true,
        "image": "../imagenes/covers/death_stranding.jpg"
      },
      {
        "name": "Control",
        "isWinner": false,
        "image": "../imagenes/covers/control.jpg"
      },
      {
        "name": "Resident Evil 2",
        "isWinner": false,
        "image": "../imagenes/covers/resident_evil_2.jpg"
      },
      {
        "name": "Sekiro: Shadows Die Twice",
        "isWinner": false,
        "image": "../imagenes/covers/sekiro_shadows_die_twice.jpg"
      },
      {
        "name": "Outer Wilds",
        "isWinner": false,
        "image": "../imagenes/covers/outer_wilds.jpg"
      }
    ]
  },
  "2020": {
    "Game of the Year": [
      {
        "name": "The Last of Us Part II",
        "isWinner": true,
        "image": "../imagenes/covers/the_last_of_us_part_ii.jpg"
      },
      {
        "name": "Animal Crossing: New Horizons",
        "isWinner": false,
        "image": "../imagenes/covers/animal_crossing_new_horizons.jpg"
      },
      {
        "name": "Doom Eternal",
        "isWinner": false,
        "image": "../imagenes/covers/doom_eternal.jpg"
      },
      {
        "name": "Final Fantasy VII Remake",
        "isWinner": false,
        "image": "../imagenes/covers/final_fantasy_vii_remake.jpg"
      },
      {
        "name": "Ghost of Tsushima",
        "isWinner": false,
        "image": "../imagenes/covers/ghost_of_tsushima.jpg"
      },
      {
        "name": "Hades",
        "isWinner": false,
        "image": "../imagenes/covers/hades.jpg"
      }
    ],
    "Best Independent Game": [
      {
        "name": "Hades",
        "isWinner": true,
        "image": "../imagenes/covers/hades.jpg"
      },
      {
        "name": "Carrion",
        "isWinner": false,
        "image": "../imagenes/covers/carrion.jpg"
      },
      {
        "name": "Fall Guys: Ultimate Knockout",
        "isWinner": false,
        "image": "../imagenes/covers/fall_guys_ultimate_knockout.jpg"
      },
      {
        "name": "Spelunky 2",
        "isWinner": false,
        "image": "../imagenes/covers/spelunky_2.jpg"
      },
      {
        "name": "Spiritfarer",
        "isWinner": false,
        "image": "../imagenes/covers/spiritfarer.jpg"
      }
    ],
    "Best Narrative": [
      {
        "name": "The Last of Us Part II",
        "isWinner": true,
        "image": "../imagenes/covers/the_last_of_us_part_ii.jpg"
      },
      {
        "name": "13 Sentinels: Aegis Rim",
        "isWinner": false,
        "image": "../imagenes/covers/13_sentinels_aegis_rim.jpg"
      },
      {
        "name": "Final Fantasy VII Remake",
        "isWinner": false,
        "image": "../imagenes/covers/final_fantasy_vii_remake.jpg"
      },
      {
        "name": "Ghost of Tsushima",
        "isWinner": false,
        "image": "../imagenes/covers/ghost_of_tsushima.jpg"
      },
      {
        "name": "Hades",
        "isWinner": false,
        "image": "../imagenes/covers/hades.jpg"
      }
    ],
    "Best Art Direction": [
      {
        "name": "Ghost of Tsushima",
        "isWinner": true,
        "image": "../imagenes/covers/ghost_of_tsushima.jpg"
      },
      {
        "name": "Final Fantasy VII Remake",
        "isWinner": false,
        "image": "../imagenes/covers/final_fantasy_vii_remake.jpg"
      },
      {
        "name": "Hades",
        "isWinner": false,
        "image": "../imagenes/covers/hades.jpg"
      },
      {
        "name": "Ori and the Will of the Wisps",
        "isWinner": false,
        "image": "../imagenes/covers/ori_and_the_will_of_the_wisps.jpg"
      },
      {
        "name": "The Last of Us Part II",
        "isWinner": false,
        "image": "../imagenes/covers/the_last_of_us_part_ii.jpg"
      }
    ],
    "Best Soundtrack": [
      {
        "name": "Final Fantasy VII Remake",
        "isWinner": true,
        "image": "../imagenes/covers/final_fantasy_vii_remake.jpg"
      },
      {
        "name": "Doom Eternal",
        "isWinner": false,
        "image": "../imagenes/covers/doom_eternal.jpg"
      },
      {
        "name": "Hades",
        "isWinner": false,
        "image": "../imagenes/covers/hades.jpg"
      },
      {
        "name": "Ori and the Will of the Wisps",
        "isWinner": false,
        "image": "../imagenes/covers/ori_and_the_will_of_the_wisps.jpg"
      },
      {
        "name": "The Last of Us Part II",
        "isWinner": false,
        "image": "../imagenes/covers/the_last_of_us_part_ii.jpg"
      }
    ],
    "Best Multiplayer": [
      {
        "name": "Among Us",
        "isWinner": true,
        "image": "../imagenes/covers/among_us.jpg"
      },
      {
        "name": "Animal Crossing: New Horizons",
        "isWinner": false,
        "image": "../imagenes/covers/animal_crossing_new_horizons.jpg"
      },
      {
        "name": "Call of Duty: Warzone",
        "isWinner": false,
        "image": "../imagenes/covers/call_of_duty_warzone.jpg"
      },
      {
        "name": "Fall Guys: Ultimate Knockout",
        "isWinner": false,
        "image": "../imagenes/covers/fall_guys_ultimate_knockout.jpg"
      },
      {
        "name": "Valorant",
        "isWinner": false,
        "image": "../imagenes/covers/valorant.jpg"
      }
    ],
    "Best Game Direction": [
      {
        "name": "The Last of Us Part II",
        "isWinner": true,
        "image": "../imagenes/covers/the_last_of_us_part_ii.jpg"
      },
      {
        "name": "Final Fantasy VII Remake",
        "isWinner": false,
        "image": "../imagenes/covers/final_fantasy_vii_remake.jpg"
      },
      {
        "name": "Ghost of Tsushima",
        "isWinner": false,
        "image": "../imagenes/covers/ghost_of_tsushima.jpg"
      },
      {
        "name": "Hades",
        "isWinner": false,
        "image": "../imagenes/covers/hades.jpg"
      },
      {
        "name": "Half-Life: Alyx",
        "isWinner": false,
        "image": "../imagenes/covers/half-life_alyx.jpg"
      }
    ]
  },
  "2021": {
    "Game of the Year": [
      {
        "name": "It Takes Two",
        "isWinner": true,
        "image": "../imagenes/covers/it_takes_two.jpg"
      },
      {
        "name": "Deathloop",
        "isWinner": false,
        "image": "../imagenes/covers/deathloop.jpg"
      },
      {
        "name": "Metroid Dread",
        "isWinner": false,
        "image": "../imagenes/covers/metroid_dread.jpg"
      },
      {
        "name": "Psychonauts 2",
        "isWinner": false,
        "image": "../imagenes/covers/psychonauts_2.jpg"
      },
      {
        "name": "Ratchet & Clank: Rift Apart",
        "isWinner": false,
        "image": "../imagenes/covers/ratchet__clank_rift_apart.jpg"
      },
      {
        "name": "Resident Evil Village",
        "isWinner": false,
        "image": "../imagenes/covers/resident_evil_village.jpg"
      }
    ],
    "Best Independent Game": [
      {
        "name": "Kena: Bridge of Spirits",
        "isWinner": true,
        "image": "../imagenes/covers/kena_bridge_of_spirits.jpg"
      },
      {
        "name": "12 Minutes",
        "isWinner": false,
        "image": "../imagenes/covers/12_minutes.jpg"
      },
      {
        "name": "Death's Door",
        "isWinner": false,
        "image": "../imagenes/covers/deaths_door.jpg"
      },
      {
        "name": "Inscryption",
        "isWinner": false,
        "image": "../imagenes/covers/inscryption.jpg"
      },
      {
        "name": "Loop Hero",
        "isWinner": false,
        "image": "../imagenes/covers/loop_hero.jpg"
      }
    ],
    "Best Narrative": [
      {
        "name": "Marvel's Guardians of the Galaxy",
        "isWinner": true,
        "image": "../imagenes/covers/marvels_guardians_of_the_galaxy.jpg"
      },
      {
        "name": "Deathloop",
        "isWinner": false,
        "image": "../imagenes/covers/deathloop.jpg"
      },
      {
        "name": "It Takes Two",
        "isWinner": false,
        "image": "../imagenes/covers/it_takes_two.jpg"
      },
      {
        "name": "Life is Strange: True Colors",
        "isWinner": false,
        "image": "../imagenes/covers/life_is_strange_true_colors.jpg"
      },
      {
        "name": "Psychonauts 2",
        "isWinner": false,
        "image": "../imagenes/covers/psychonauts_2.jpg"
      }
    ],
    "Best Art Direction": [
      {
        "name": "Deathloop",
        "isWinner": true,
        "image": "../imagenes/covers/deathloop.jpg"
      },
      {
        "name": "Kena: Bridge of Spirits",
        "isWinner": false,
        "image": "../imagenes/covers/kena_bridge_of_spirits.jpg"
      },
      {
        "name": "Psychonauts 2",
        "isWinner": false,
        "image": "../imagenes/covers/psychonauts_2.jpg"
      },
      {
        "name": "Ratchet & Clank: Rift Apart",
        "isWinner": false,
        "image": "../imagenes/covers/ratchet__clank_rift_apart.jpg"
      },
      {
        "name": "The Artful Escape",
        "isWinner": false,
        "image": "../imagenes/covers/the_artful_escape.jpg"
      }
    ],
    "Best Soundtrack": [
      {
        "name": "NieR Replicant ver.1.22474487139...",
        "isWinner": true,
        "image": "../imagenes/covers/nier_replicant_ver122474487139.jpg"
      },
      {
        "name": "Cyberpunk 2077",
        "isWinner": false,
        "image": "../imagenes/covers/cyberpunk_2077.jpg"
      },
      {
        "name": "Deathloop",
        "isWinner": false,
        "image": "../imagenes/covers/deathloop.jpg"
      },
      {
        "name": "Marvel's Guardians of the Galaxy",
        "isWinner": false,
        "image": "../imagenes/covers/marvels_guardians_of_the_galaxy.jpg"
      },
      {
        "name": "The Artful Escape",
        "isWinner": false,
        "image": "../imagenes/covers/the_artful_escape.jpg"
      }
    ],
    "Best Multiplayer": [
      {
        "name": "It Takes Two",
        "isWinner": true,
        "image": "../imagenes/covers/it_takes_two.jpg"
      },
      {
        "name": "Back 4 Blood",
        "isWinner": false,
        "image": "../imagenes/covers/back_4_blood.jpg"
      },
      {
        "name": "Knockout City",
        "isWinner": false,
        "image": "../imagenes/covers/knockout_city.jpg"
      },
      {
        "name": "Monster Hunter Rise",
        "isWinner": false,
        "image": "../imagenes/covers/monster_hunter_rise.jpg"
      },
      {
        "name": "New World",
        "isWinner": false,
        "image": "../imagenes/covers/new_world.jpg"
      },
      {
        "name": "Valheim",
        "isWinner": false,
        "image": "../imagenes/covers/valheim.jpg"
      }
    ],
    "Best Game Direction": [
      {
        "name": "Deathloop",
        "isWinner": true,
        "image": "../imagenes/covers/deathloop.jpg"
      },
      {
        "name": "It Takes Two",
        "isWinner": false,
        "image": "../imagenes/covers/it_takes_two.jpg"
      },
      {
        "name": "Returnal",
        "isWinner": false,
        "image": "../imagenes/covers/returnal.jpg"
      },
      {
        "name": "Psychonauts 2",
        "isWinner": false,
        "image": "../imagenes/covers/psychonauts_2.jpg"
      },
      {
        "name": "Ratchet & Clank: Rift Apart",
        "isWinner": false,
        "image": "../imagenes/covers/ratchet__clank_rift_apart.jpg"
      }
    ]
  },
  "2022": {
    "Game of the Year": [
      {
        "name": "Elden Ring",
        "isWinner": true,
        "image": "../imagenes/covers/elden_ring.jpg"
      },
      {
        "name": "A Plague Tale: Requiem",
        "isWinner": false,
        "image": "../imagenes/covers/a_plague_tale_requiem.jpg"
      },
      {
        "name": "God of War Ragnarök",
        "isWinner": false,
        "image": "../imagenes/covers/god_of_war_ragnark.jpg"
      },
      {
        "name": "Horizon Forbidden West",
        "isWinner": false,
        "image": "../imagenes/covers/horizon_forbidden_west.jpg"
      },
      {
        "name": "Stray",
        "isWinner": false,
        "image": "../imagenes/covers/stray.jpg"
      },
      {
        "name": "Xenoblade Chronicles 3",
        "isWinner": false,
        "image": "../imagenes/covers/xenoblade_chronicles_3.jpg"
      }
    ],
    "Best Independent Game": [
      {
        "name": "Stray",
        "isWinner": true,
        "image": "../imagenes/covers/stray.jpg"
      },
      {
        "name": "Cult of the Lamb",
        "isWinner": false,
        "image": "../imagenes/covers/cult_of_the_lamb.jpg"
      },
      {
        "name": "Neon White",
        "isWinner": false,
        "image": "../imagenes/covers/neon_white.jpg"
      },
      {
        "name": "Sifu",
        "isWinner": false,
        "image": "../imagenes/covers/sifu.jpg"
      },
      {
        "name": "Tunic",
        "isWinner": false,
        "image": "../imagenes/covers/tunic.jpg"
      }
    ],
    "Best Narrative": [
      {
        "name": "God of War Ragnarök",
        "isWinner": true,
        "image": "../imagenes/covers/god_of_war_ragnark.jpg"
      },
      {
        "name": "A Plague Tale: Requiem",
        "isWinner": false,
        "image": "../imagenes/covers/a_plague_tale_requiem.jpg"
      },
      {
        "name": "Elden Ring",
        "isWinner": false,
        "image": "../imagenes/covers/elden_ring.jpg"
      },
      {
        "name": "Horizon Forbidden West",
        "isWinner": false,
        "image": "../imagenes/covers/horizon_forbidden_west.jpg"
      },
      {
        "name": "Immortality",
        "isWinner": false,
        "image": "../imagenes/covers/immortality.jpg"
      }
    ],
    "Best Art Direction": [
      {
        "name": "Elden Ring",
        "isWinner": true,
        "image": "../imagenes/covers/elden_ring.jpg"
      },
      {
        "name": "God of War Ragnarök",
        "isWinner": false,
        "image": "../imagenes/covers/god_of_war_ragnark.jpg"
      },
      {
        "name": "Horizon Forbidden West",
        "isWinner": false,
        "image": "../imagenes/covers/horizon_forbidden_west.jpg"
      },
      {
        "name": "Scorn",
        "isWinner": false,
        "image": "../imagenes/covers/scorn.jpg"
      },
      {
        "name": "Stray",
        "isWinner": false,
        "image": "../imagenes/covers/stray.jpg"
      }
    ],
    "Best Soundtrack": [
      {
        "name": "God of War Ragnarök",
        "isWinner": true,
        "image": "../imagenes/covers/god_of_war_ragnark.jpg"
      },
      {
        "name": "A Plague Tale: Requiem",
        "isWinner": false,
        "image": "../imagenes/covers/a_plague_tale_requiem.jpg"
      },
      {
        "name": "Elden Ring",
        "isWinner": false,
        "image": "../imagenes/covers/elden_ring.jpg"
      },
      {
        "name": "Metal: Hellsinger",
        "isWinner": false,
        "image": "../imagenes/covers/metal_hellsinger.jpg"
      },
      {
        "name": "Xenoblade Chronicles 3",
        "isWinner": false,
        "image": "../imagenes/covers/xenoblade_chronicles_3.jpg"
      }
    ],
    "Best Multiplayer": [
      {
        "name": "Splatoon 3",
        "isWinner": true,
        "image": "../imagenes/covers/splatoon_3.jpg"
      },
      {
        "name": "Call of Duty: Modern Warfare II",
        "isWinner": false,
        "image": "../imagenes/covers/call_of_duty_modern_warfare_ii.jpg"
      },
      {
        "name": "MultiVersus",
        "isWinner": false,
        "image": "../imagenes/covers/multiversus.jpg"
      },
      {
        "name": "Overwatch 2",
        "isWinner": false,
        "image": "../imagenes/covers/overwatch_2.jpg"
      },
      {
        "name": "Teenage Mutant Ninja Turtles: Shredder's Revenge",
        "isWinner": false,
        "image": "../imagenes/covers/teenage_mutant_ninja_turtles_shredders_revenge.jpg"
      }
    ],
    "Best Game Direction": [
      {
        "name": "Elden Ring",
        "isWinner": true,
        "image": "../imagenes/covers/elden_ring.jpg"
      },
      {
        "name": "God of War Ragnarök",
        "isWinner": false,
        "image": "../imagenes/covers/god_of_war_ragnark.jpg"
      },
      {
        "name": "Horizon Forbidden West",
        "isWinner": false,
        "image": "../imagenes/covers/horizon_forbidden_west.jpg"
      },
      {
        "name": "Immortality",
        "isWinner": false,
        "image": "../imagenes/covers/immortality.jpg"
      },
      {
        "name": "Stray",
        "isWinner": false,
        "image": "../imagenes/covers/stray.jpg"
      }
    ]
  },
  "2023": {
    "Game of the Year": [
      {
        "name": "Baldur's Gate 3",
        "isWinner": true,
        "image": "../imagenes/covers/baldurs_gate_3.jpg"
      },
      {
        "name": "Alan Wake 2",
        "isWinner": false,
        "image": "../imagenes/covers/alan_wake_2.jpg"
      },
      {
        "name": "Marvel's Spider-Man 2",
        "isWinner": false,
        "image": "../imagenes/covers/marvels_spider-man_2.jpg"
      },
      {
        "name": "Resident Evil 4",
        "isWinner": false,
        "image": "../imagenes/covers/resident_evil_4.jpg"
      },
      {
        "name": "Super Mario Bros. Wonder",
        "isWinner": false,
        "image": "../imagenes/covers/super_mario_bros_wonder.jpg"
      },
      {
        "name": "The Legend of Zelda: Tears of the Kingdom",
        "isWinner": false,
        "image": "../imagenes/covers/the_legend_of_zelda_tears_of_the_kingdom.jpg"
      }
    ],
    "Best Independent Game": [
      {
        "name": "Sea of Stars",
        "isWinner": true,
        "image": "../imagenes/covers/sea_of_stars.jpg"
      },
      {
        "name": "Cocoon",
        "isWinner": false,
        "image": "../imagenes/covers/cocoon.jpg"
      },
      {
        "name": "Dave the Diver",
        "isWinner": false,
        "image": "../imagenes/covers/dave_the_diver.jpg"
      },
      {
        "name": "Dredge",
        "isWinner": false,
        "image": "../imagenes/covers/dredge.jpg"
      },
      {
        "name": "Viewfinder",
        "isWinner": false,
        "image": "../imagenes/covers/viewfinder.jpg"
      }
    ],
    "Best Narrative": [
      {
        "name": "Alan Wake 2",
        "isWinner": true,
        "image": "../imagenes/covers/alan_wake_2.jpg"
      },
      {
        "name": "Baldur's Gate 3",
        "isWinner": false,
        "image": "../imagenes/covers/baldurs_gate_3.jpg"
      },
      {
        "name": "Cyberpunk 2077: Phantom Liberty",
        "isWinner": false,
        "image": "../imagenes/covers/cyberpunk_2077_phantom_liberty.jpg"
      },
      {
        "name": "Final Fantasy XVI",
        "isWinner": false,
        "image": "../imagenes/covers/final_fantasy_xvi.jpg"
      },
      {
        "name": "Marvel's Spider-Man 2",
        "isWinner": false,
        "image": "../imagenes/covers/marvels_spider-man_2.jpg"
      }
    ],
    "Best Art Direction": [
      {
        "name": "Alan Wake 2",
        "isWinner": true,
        "image": "../imagenes/covers/alan_wake_2.jpg"
      },
      {
        "name": "Hi-Fi Rush",
        "isWinner": false,
        "image": "../imagenes/covers/hi-fi_rush.jpg"
      },
      {
        "name": "Lies of P",
        "isWinner": false,
        "image": "../imagenes/covers/lies_of_p.jpg"
      },
      {
        "name": "Super Mario Bros. Wonder",
        "isWinner": false,
        "image": "../imagenes/covers/super_mario_bros_wonder.jpg"
      },
      {
        "name": "The Legend of Zelda: Tears of the Kingdom",
        "isWinner": false,
        "image": "../imagenes/covers/the_legend_of_zelda_tears_of_the_kingdom.jpg"
      }
    ],
    "Best Soundtrack": [
      {
        "name": "Final Fantasy XVI",
        "isWinner": true,
        "image": "../imagenes/covers/final_fantasy_xvi.jpg"
      },
      {
        "name": "Alan Wake 2",
        "isWinner": false,
        "image": "../imagenes/covers/alan_wake_2.jpg"
      },
      {
        "name": "Baldur's Gate 3",
        "isWinner": false,
        "image": "../imagenes/covers/baldurs_gate_3.jpg"
      },
      {
        "name": "Hi-Fi Rush",
        "isWinner": false,
        "image": "../imagenes/covers/hi-fi_rush.jpg"
      },
      {
        "name": "The Legend of Zelda: Tears of the Kingdom",
        "isWinner": false,
        "image": "../imagenes/covers/the_legend_of_zelda_tears_of_the_kingdom.jpg"
      }
    ],
    "Best Multiplayer": [
      {
        "name": "Baldur's Gate 3",
        "isWinner": true,
        "image": "../imagenes/covers/baldurs_gate_3.jpg"
      },
      {
        "name": "Diablo IV",
        "isWinner": false,
        "image": "../imagenes/covers/diablo_iv.jpg"
      },
      {
        "name": "Party Animals",
        "isWinner": false,
        "image": "../imagenes/covers/party_animals.jpg"
      },
      {
        "name": "Street Fighter 6",
        "isWinner": false,
        "image": "../imagenes/covers/street_fighter_6.jpg"
      },
      {
        "name": "Super Mario Bros. Wonder",
        "isWinner": false,
        "image": "../imagenes/covers/super_mario_bros_wonder.jpg"
      }
    ],
    "Best Game Direction": [
      {
        "name": "Alan Wake 2",
        "isWinner": true,
        "image": "../imagenes/covers/alan_wake_2.jpg"
      },
      {
        "name": "Baldur's Gate 3",
        "isWinner": false,
        "image": "../imagenes/covers/baldurs_gate_3.jpg"
      },
      {
        "name": "Marvel's Spider-Man 2",
        "isWinner": false,
        "image": "../imagenes/covers/marvels_spider-man_2.jpg"
      },
      {
        "name": "Super Mario Bros. Wonder",
        "isWinner": false,
        "image": "../imagenes/covers/super_mario_bros_wonder.jpg"
      },
      {
        "name": "The Legend of Zelda: Tears of the Kingdom",
        "isWinner": false,
        "image": "../imagenes/covers/the_legend_of_zelda_tears_of_the_kingdom.jpg"
      }
    ]
  },
  "2024": {
    "Game of the Year": [
      {
        "name": "Astro Bot",
        "isWinner": true,
        "image": "../imagenes/covers/astro_bot.jpg"
      },
      {
        "name": "Balatro",
        "isWinner": false,
        "image": "../imagenes/covers/balatro.jpg"
      },
      {
        "name": "Black Myth: Wukong",
        "isWinner": false,
        "image": "../imagenes/covers/black_myth_wukong.jpg"
      },
      {
        "name": "Elden Ring Shadow of the Erdtree",
        "isWinner": false,
        "image": "../imagenes/covers/elden_ring_shadow_of_the_erdtree.jpg"
      },
      {
        "name": "Final Fantasy VII Rebirth",
        "isWinner": false,
        "image": "../imagenes/covers/final_fantasy_vii_rebirth.jpg"
      },
      {
        "name": "Metaphor: ReFantazio",
        "isWinner": false,
        "image": "../imagenes/covers/metaphor_refantazio.jpg"
      }
    ],
    "Best Independent Game": [
      {
        "name": "Balatro",
        "isWinner": true,
        "image": "../imagenes/covers/balatro.jpg"
      },
      {
        "name": "Animal Well",
        "isWinner": false,
        "image": "../imagenes/covers/animal_well.jpg"
      },
      {
        "name": "Lorelei and the Laser Eyes",
        "isWinner": false,
        "image": "../imagenes/covers/lorelei_and_the_laser_eyes.jpg"
      },
      {
        "name": "Neva",
        "isWinner": false,
        "image": "../imagenes/covers/neva.jpg"
      },
      {
        "name": "UFO 50",
        "isWinner": false,
        "image": "../imagenes/covers/ufo_50.jpg"
      }
    ],
    "Best Narrative": [
      {
        "name": "Metaphor: ReFantazio",
        "isWinner": true,
        "image": "../imagenes/covers/metaphor_refantazio.jpg"
      },
      {
        "name": "Final Fantasy VII Rebirth",
        "isWinner": false,
        "image": "../imagenes/covers/final_fantasy_vii_rebirth.jpg"
      },
      {
        "name": "Like a Dragon: Infinite Wealth",
        "isWinner": false,
        "image": "../imagenes/covers/like_a_dragon_infinite_wealth.jpg"
      },
      {
        "name": "Senua's Saga: Hellblade II",
        "isWinner": false,
        "image": "../imagenes/covers/senuas_saga_hellblade_ii.jpg"
      },
      {
        "name": "Silent Hill 2",
        "isWinner": false,
        "image": "../imagenes/covers/silent_hill_2.jpg"
      }
    ],
    "Best Art Direction": [
      {
        "name": "Metaphor: ReFantazio",
        "isWinner": true,
        "image": "../imagenes/covers/metaphor_refantazio.jpg"
      },
      {
        "name": "Astro Bot",
        "isWinner": false,
        "image": "../imagenes/covers/astro_bot.jpg"
      },
      {
        "name": "Black Myth: Wukong",
        "isWinner": false,
        "image": "../imagenes/covers/black_myth_wukong.jpg"
      },
      {
        "name": "Neva",
        "isWinner": false,
        "image": "../imagenes/covers/neva.jpg"
      },
      {
        "name": "Senua's Saga: Hellblade II",
        "isWinner": false,
        "image": "../imagenes/covers/senuas_saga_hellblade_ii.jpg"
      }
    ],
    "Best Soundtrack": [
      {
        "name": "Final Fantasy VII Rebirth",
        "isWinner": true,
        "image": "../imagenes/covers/final_fantasy_vii_rebirth.jpg"
      },
      {
        "name": "Astro Bot",
        "isWinner": false,
        "image": "../imagenes/covers/astro_bot.jpg"
      },
      {
        "name": "Metaphor: ReFantazio",
        "isWinner": false,
        "image": "../imagenes/covers/metaphor_refantazio.jpg"
      },
      {
        "name": "Silent Hill 2",
        "isWinner": false,
        "image": "../imagenes/covers/silent_hill_2.jpg"
      },
      {
        "name": "Stellar Blade",
        "isWinner": false,
        "image": "../imagenes/covers/stellar_blade.jpg"
      }
    ],
    "Best Multiplayer": [
      {
        "name": "Helldivers 2",
        "isWinner": true,
        "image": "../imagenes/covers/helldivers_2.jpg"
      },
      {
        "name": "Call of Duty: Black Ops 6",
        "isWinner": false,
        "image": "../imagenes/covers/call_of_duty_black_ops_6.jpg"
      },
      {
        "name": "Super Mario Party Jamboree",
        "isWinner": false,
        "image": "../imagenes/covers/super_mario_party_jamboree.jpg"
      },
      {
        "name": "Tekken 8",
        "isWinner": false,
        "image": "../imagenes/covers/tekken_8.jpg"
      },
      {
        "name": "Warhammer 40,000: Space Marine 2",
        "isWinner": false,
        "image": "../imagenes/covers/warhammer_40000_space_marine_2.jpg"
      }
    ],
    "Best Game Direction": [
      {
        "name": "Astro Bot",
        "isWinner": true,
        "image": "../imagenes/covers/astro_bot.jpg"
      },
      {
        "name": "Balatro",
        "isWinner": false,
        "image": "../imagenes/covers/balatro.jpg"
      },
      {
        "name": "Black Myth: Wukong",
        "isWinner": false,
        "image": "../imagenes/covers/black_myth_wukong.jpg"
      },
      {
        "name": "Elden Ring Shadow of the Erdtree",
        "isWinner": false,
        "image": "../imagenes/covers/elden_ring_shadow_of_the_erdtree.jpg"
      },
      {
        "name": "Final Fantasy VII Rebirth",
        "isWinner": false,
        "image": "../imagenes/covers/final_fantasy_vii_rebirth.jpg"
      },
      {
        "name": "Metaphor: ReFantazio",
        "isWinner": false,
        "image": "../imagenes/covers/metaphor_refantazio.jpg"
      }
    ]
  },
  "2025": {
    "Game of the Year": [
      {
        "name": "Clair Obscur: Expedition 33",
        "isWinner": true,
        "image": "../imagenes/covers/clair_obscur_expedition_33.jpg"
      },
      {
        "name": "Death Stranding 2: On the Beach",
        "isWinner": false,
        "image": "../imagenes/covers/death_stranding_2_on_the_beach.jpg"
      },
      {
        "name": "Donkey Kong Bananza",
        "isWinner": false,
        "image": "../imagenes/covers/donkey_kong_bananza.jpg"
      },
      {
        "name": "Hades II",
        "isWinner": false,
        "image": "../imagenes/covers/hades_ii.jpg"
      },
      {
        "name": "Hollow Knight: Silksong",
        "isWinner": false,
        "image": "../imagenes/covers/hollow_knight_silksong.jpg"
      },
      {
        "name": "Kingdom Come: Deliverance II",
        "isWinner": false,
        "image": "../imagenes/covers/kingdom_come_deliverance_ii.jpg"
      }
    ],
    "Best Independent Game": [
      {
        "name": "Clair Obscur: Expedition 33",
        "isWinner": true,
        "image": "../imagenes/covers/clair_obscur_expedition_33.jpg"
      },
      {
        "name": "Absolum",
        "isWinner": false,
        "image": "../imagenes/covers/absolum.jpg"
      },
      {
        "name": "Ball x Pit",
        "isWinner": false,
        "image": "../imagenes/covers/ball_x_pit.jpg"
      },
      {
        "name": "Blue Prince",
        "isWinner": false,
        "image": "../imagenes/covers/blue_prince.jpg"
      },
      {
        "name": "Hades II",
        "isWinner": false,
        "image": "../imagenes/covers/hades_ii.jpg"
      },
      {
        "name": "Hollow Knight: Silksong",
        "isWinner": false,
        "image": "../imagenes/covers/hollow_knight_silksong.jpg"
      }
    ],
    "Best Narrative": [
      {
        "name": "Clair Obscur: Expedition 33",
        "isWinner": true,
        "image": "../imagenes/covers/clair_obscur_expedition_33.jpg"
      },
      {
        "name": "Death Stranding 2: On the Beach",
        "isWinner": false,
        "image": "../imagenes/covers/death_stranding_2_on_the_beach.jpg"
      },
      {
        "name": "Ghost of Yōtei",
        "isWinner": false,
        "image": "../imagenes/covers/ghost_of_yotei.jpg"
      },
      {
        "name": "Kingdom Come: Deliverance II",
        "isWinner": false,
        "image": "../imagenes/covers/kingdom_come_deliverance_ii.jpg"
      },
      {
        "name": "Silent Hill f",
        "isWinner": false,
        "image": "../imagenes/covers/silent_hill_f.jpg"
      }
    ],
    "Best Art Direction": [
      {
        "name": "Clair Obscur: Expedition 33",
        "isWinner": true,
        "image": "../imagenes/covers/clair_obscur_expedition_33.jpg"
      },
      {
        "name": "Death Stranding 2: On the Beach",
        "isWinner": false,
        "image": "../imagenes/covers/death_stranding_2_on_the_beach.jpg"
      },
      {
        "name": "Ghost of Yōtei",
        "isWinner": false,
        "image": "../imagenes/covers/ghost_of_yotei.jpg"
      },
      {
        "name": "Hades II",
        "isWinner": false,
        "image": "../imagenes/covers/hades_ii.jpg"
      },
      {
        "name": "Hollow Knight: Silksong",
        "isWinner": false,
        "image": "../imagenes/covers/hollow_knight_silksong.jpg"
      }
    ],
    "Best Soundtrack": [
      {
        "name": "Clair Obscur: Expedition 33",
        "isWinner": true,
        "image": "../imagenes/covers/clair_obscur_expedition_33.jpg"
      },
      {
        "name": "Death Stranding 2: On the Beach",
        "isWinner": false,
        "image": "../imagenes/covers/death_stranding_2_on_the_beach.jpg"
      },
      {
        "name": "Ghost of Yōtei",
        "isWinner": false,
        "image": "../imagenes/covers/ghost_of_yotei.jpg"
      },
      {
        "name": "Hades II",
        "isWinner": false,
        "image": "../imagenes/covers/hades_ii.jpg"
      },
      {
        "name": "Hollow Knight: Silksong",
        "isWinner": false,
        "image": "../imagenes/covers/hollow_knight_silksong.jpg"
      }
    ],
    "Best Multiplayer": [
      {
        "name": "Arc Raiders",
        "isWinner": true,
        "image": "../imagenes/covers/arc_raiders.jpg"
      },
      {
        "name": "Battlefield 6",
        "isWinner": false,
        "image": "../imagenes/covers/battlefield_6.jpg"
      },
      {
        "name": "Elden Ring: Nightreign",
        "isWinner": false,
        "image": "../imagenes/covers/elden_ring_nightreign.jpg"
      },
      {
        "name": "Peak",
        "isWinner": false,
        "image": "../imagenes/covers/peak.jpg"
      },
      {
        "name": "Split Fiction",
        "isWinner": false,
        "image": "../imagenes/covers/split_fiction.jpg"
      }
    ],
    "Best Game Direction": [
      {
        "name": "Clair Obscur: Expedition 33",
        "isWinner": true,
        "image": "../imagenes/covers/clair_obscur_expedition_33.jpg"
      },
      {
        "name": "Death Stranding 2: On the Beach",
        "isWinner": false,
        "image": "../imagenes/covers/death_stranding_2_on_the_beach.jpg"
      },
      {
        "name": "Ghost of Yōtei",
        "isWinner": false,
        "image": "../imagenes/covers/ghost_of_yotei.jpg"
      },
      {
        "name": "Hades II",
        "isWinner": false,
        "image": "../imagenes/covers/hades_ii.jpg"
      },
      {
        "name": "Split Fiction",
        "isWinner": false,
        "image": "../imagenes/covers/split_fiction.jpg"
      }
    ]
  }
};

// ═══════════════════════════════════════════════════════════════════
//  ESTADO GLOBAL DE LA APLICACIÓN
// ═══════════════════════════════════════════════════════════════════

/**
 * Lista ordenada de todos los años soportados (2014 a 2025)
 */
const ALL_YEARS = [2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025].sort((a, b) => a - b);

// Lectura de parámetro de año desde la URL (?y=YYYY)
const params = new URLSearchParams(window.location.search);
let activeYear = parseInt(params.get('y')) || 2025;
if (activeYear < 2014 || activeYear > 2025) {
    activeYear = 2025;
}

/**
 * Almacenamiento en memoria de votos emitidos por año
 * Estructura: { 2025: { 'Game of the Year': 'Nombre del Juego', ... }, ... }
 */
const currentVotes = {};
ALL_YEARS.forEach(y => {
    currentVotes[y] = {};
    CANONICAL_CATEGORIES.forEach(cat => {
        currentVotes[y][cat] = null;
    });
});

/**
 * Caché de datos cargados dinámicamente desde datos/{year}.json
 */
const yearDataCache = {};

/**
 * Registro de años ya enviados con éxito
 */
const submittedYears = {};

// ═══════════════════════════════════════════════════════════════════
//  FUNCIONES DE CARGA DE DATOS
// ═══════════════════════════════════════════════════════════════════

/**
 * Carga dinámica de datos desde datos/{year}.json con fallback local
 */
async function loadYearData(year) {
    if (yearDataCache[year]) {
        return yearDataCache[year];
    }

    try {
        const response = await fetch('datos/' + year + '.json');
        if (response.ok) {
            const data = await response.json();
            yearDataCache[year] = data;
            return data;
        }
    } catch (err) {
        console.warn('[Encuesta] No se pudo obtener datos/' + year + '.json por red, recurriendo a datos locales:', err);
    }

    if (FALLBACK_GOTY_DATA && FALLBACK_GOTY_DATA[year]) {
        yearDataCache[year] = FALLBACK_GOTY_DATA[year];
        return FALLBACK_GOTY_DATA[year];
    }

    return null;
}

// ═══════════════════════════════════════════════════════════════════
//  CONSTRUCCIÓN Y RENDERIZADO DE LA INTERFAZ
// ═══════════════════════════════════════════════════════════════════

/**
 * Inicialización principal de la página de encuesta
 */
async function init() {
    const tabsContainer = document.getElementById('yearTabs');

    // ── 1. Construir pestañas selectoras de año (2014-2025) ──
    if (tabsContainer) {
        tabsContainer.innerHTML = '';
        ALL_YEARS.forEach(year => {
            const tab = document.createElement('div');
            tab.className = 'enc-tab' + (year === activeYear ? ' active' : '');
            tab.textContent = year;
            tab.dataset.year = year;
            tab.setAttribute('role', 'tab');
            tab.setAttribute('aria-selected', year === activeYear ? 'true' : 'false');
            tab.addEventListener('click', () => switchYear(year));
            tabsContainer.appendChild(tab);
        });
    }

    // ── 2. Asociar eventos a los botones de acción ──
    const submitBtn = document.getElementById('submit-survey');
    if (submitBtn) {
        submitBtn.addEventListener('click', submitSurvey);
    }

    const resetBtn = document.getElementById('reset-survey');
    if (resetBtn) {
        resetBtn.addEventListener('click', () => resetYear(activeYear));
    }

    // ── 3. Cargar y mostrar el año activo inicial ──
    await switchYear(activeYear);
}

/**
 * Cambia el año visible en la encuesta y actualiza el estado de navegación
 */
async function switchYear(year) {
    activeYear = year;

    // Actualizar URL en barra de direcciones sin recargar
    try {
        const newUrl = new URL(window.location.href);
        newUrl.searchParams.set('y', year);
        window.history.pushState({ year: year }, '', newUrl.toString());
    } catch (e) {
        // En entornos restrictivos de iframe ignorar
    }

    // Actualizar encabezado del navegador
    const navYearDisplay = document.getElementById('navYearDisplay');
    if (navYearDisplay) {
        navYearDisplay.textContent = 'Encuesta ' + year;
    }

    // Actualizar estado activo en pestañas
    document.querySelectorAll('.enc-tab').forEach(t => {
        const isCurrent = Number(t.dataset.year) === year;
        t.classList.toggle('active', isCurrent);
        t.setAttribute('aria-selected', isCurrent ? 'true' : 'false');
    });

    // Ocultar todos los paneles existentes
    document.querySelectorAll('.enc-year-panel').forEach(p => {
        p.classList.remove('active');
    });

    // Buscar o construir panel del año seleccionado
    let panel = document.getElementById('panel-' + year);
    if (!panel) {
        panel = await renderYearPanel(year);
    }

    if (panel) {
        panel.classList.add('active');
    }

    hideFeedback();
}

/**
 * Genera el DOM del panel para un año con todas sus tarjetas de candidatos
 */
async function renderYearPanel(year) {
    const panelsContainer = document.getElementById('yearPanels');
    if (!panelsContainer) return null;

    showFeedback('Cargando nominados del año ' + year + '...', 'info');
    const data = await loadYearData(year);
    hideFeedback();

    if (!data) {
        showFeedback('No fue posible cargar los nominados del año ' + year + '.', 'error');
        return null;
    }

    const panel = document.createElement('div');
    panel.className = 'enc-year-panel';
    panel.id = 'panel-' + year;

    // Generar las 7 categorías canónicas
    CANONICAL_CATEGORIES.forEach(categoryName => {
        const nominees = data[categoryName] || [];
        if (!nominees || nominees.length === 0) return;

        const block = document.createElement('div');
        block.className = 'category-block';
        block.dataset.category = categoryName;
        if (CATEGORY_ANCHOR_MAP[categoryName]) {
            block.id = CATEGORY_ANCHOR_MAP[categoryName];
        }

        const title = document.createElement('h2');
        title.className = 'category-title';
        title.textContent = categoryName;
        block.appendChild(title);

        const grid = document.createElement('div');
        grid.className = 'candidate-grid';

        nominees.forEach(nom => {
            const card = document.createElement('div');
            card.className = 'candidate-card survey-card';
            card.dataset.category = categoryName;
            card.dataset.nominee = nom.name;

            // Comprobar si ya estaba seleccionado previamente
            if (currentVotes[year] && currentVotes[year][categoryName] === nom.name) {
                card.classList.add('card--selected');
            }

            // Normalizar ruta de portada
            let imagePath = nom.image || '';
            if (imagePath.startsWith('../')) {
                imagePath = imagePath.slice(3);
            }

            const img = document.createElement('img');
            img.className = 'candidate-card__image';
            img.src = imagePath;
            img.alt = nom.name;
            img.loading = 'lazy';
            card.appendChild(img);

            const h3 = document.createElement('h3');
            h3.className = 'candidate-card__title';
            h3.textContent = nom.name;
            card.appendChild(h3);

            // ── Evento de Selección / Exclusión Mutua / Deselección ──
            card.addEventListener('click', () => {
                handleCardClick(card, categoryName, nom.name, year);
            });

            grid.appendChild(card);
        });

        block.appendChild(grid);
        panel.appendChild(block);
    });

    panelsContainer.appendChild(panel);
    return panel;
}

// ═══════════════════════════════════════════════════════════════════
//  INTERACCIÓN: SELECCIÓN, EXCLUSIÓN MUTUA Y DESELECCIÓN
// ═══════════════════════════════════════════════════════════════════

/**
 * Controla la selección interactiva de una tarjeta de candidato.
 * - Si ya está seleccionada: se deselecciona (toggle off) y el voto queda en null.
 * - Si no está seleccionada: deselecciona cualquier otra en la misma categoría y la marca.
 */
function handleCardClick(card, categoryName, nomineeName, year) {
    const isAlreadySelected = card.classList.contains('card--selected');
    const categoryBlock = card.closest('.category-block');

    if (isAlreadySelected) {
        // Deselección / Toggle off: se remueve la clase y se asigna null
        card.classList.remove('card--selected');
        if (!currentVotes[year]) currentVotes[year] = {};
        currentVotes[year][categoryName] = null;
    } else {
        // Exclusión mutua: remover selección previa en este bloque de categoría
        if (categoryBlock) {
            const previousCards = categoryBlock.querySelectorAll('.candidate-card.card--selected');
            previousCards.forEach(c => c.classList.remove('card--selected'));
        }
        // Marcar la nueva tarjeta seleccionada
        card.classList.add('card--selected');
        if (!currentVotes[year]) currentVotes[year] = {};
        currentVotes[year][categoryName] = nomineeName;
    }
}

// ═══════════════════════════════════════════════════════════════════
//  ENVÍO DE VOTACIÓN AL BACKEND (POST /api/vote)
// ═══════════════════════════════════════════════════════════════════

/**
 * Recopila los votos de las 7 categorías canónicas y los envía al backend
 */
async function submitSurvey() {
    const submitBtn = document.getElementById('submit-survey');
    const year = activeYear;

    // Asegurar estructura con las 7 categorías canónicas
    // Las no seleccionadas se serializan explícitamente como null
    const yearVotes = currentVotes[year] || {};
    const votesPayload = {};
    CANONICAL_CATEGORIES.forEach(cat => {
        const val = yearVotes[cat];
        votesPayload[cat] = (val !== undefined && val !== null && val !== '') ? val : null;
    });

    const payload = {
        year: year,
        votes: votesPayload
    };

    // Resolver URL del endpoint del servidor backend
    let apiEndpoint = '/api/vote';
    if (!window.location.origin || window.location.origin === 'null' || window.location.protocol === 'file:') {
        apiEndpoint = 'http://localhost:8000/api/vote';
    }

    // Feedback visual y bloqueo del botón durante la petición
    if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Enviando votación...';
    }
    showFeedback('Enviando tus votos para el año ' + year + ' al servidor...', 'info');

    try {
        const response = await fetch(apiEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        if (response.ok) {
            const result = await response.json().catch(() => ({}));
            submittedYears[year] = votesPayload;

            // Retroalimentación de éxito
            showFeedback('¡Votación para ' + year + ' guardada con éxito! Muchas gracias por participar.', 'success');

            // Marcar visualmente el panel y la pestaña como enviados
            const panel = document.getElementById('panel-' + year);
            if (panel) panel.classList.add('submitted');
            const tab = document.querySelector('.enc-tab[data-year="' + year + '"]');
            if (tab) tab.classList.add('submitted');

            updateCSVButton();
        } else {
            const errorData = await response.json().catch(() => null);
            const msg = errorData && errorData.message ? errorData.message : ('Error del servidor (' + response.status + ')');
            showFeedback('⚠️ No se pudo registrar la votación: ' + msg, 'error');
        }
    } catch (err) {
        console.error('[Encuesta] Error en fetch a /api/vote:', err);
        showFeedback('⚠️ No se pudo conectar con el servidor local (/api/vote). Asegúrate de que el servidor backend esté corriendo en el puerto 8000.', 'error');
    } finally {
        if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Enviar mi votación';
        }
    }
}

/**
 * Reinicia las selecciones del año especificado, borrando el resaltado dorado
 */
function resetYear(year) {
    const panel = document.getElementById('panel-' + year);
    if (panel) {
        panel.querySelectorAll('.candidate-card.card--selected').forEach(c => {
            c.classList.remove('card--selected');
        });
        panel.classList.remove('submitted');
    }

    const tab = document.querySelector('.enc-tab[data-year="' + year + '"]');
    if (tab) tab.classList.remove('submitted');

    // Restablecer valores a null
    if (!currentVotes[year]) currentVotes[year] = {};
    CANONICAL_CATEGORIES.forEach(cat => {
        currentVotes[year][cat] = null;
    });

    delete submittedYears[year];
    updateCSVButton();
    showFeedback('Se han reiniciado los votos para el año ' + year + '.', 'info');
}

/**
 * Actualiza la visibilidad y estado del botón de descarga CSV
 */
function updateCSVButton() {
    const csvBtn = document.getElementById('csvBtn');
    if (!csvBtn) return;
    const hasSubmissions = Object.keys(submittedYears).length > 0;
    csvBtn.disabled = !hasSubmissions;
    csvBtn.classList.toggle('hidden', !hasSubmissions);
}

/**
 * Descarga local en formato CSV de todos los votos emitidos
 */
function downloadCSV() {
    const BOM = '\uFEFF';
    const header = '"Año","Categoría","Mi Voto"';
    const rows = [header];

    const sortedYears = Object.keys(submittedYears).map(Number).sort();
    sortedYears.forEach(year => {
        const picks = submittedYears[year];
        CANONICAL_CATEGORIES.forEach(cat => {
            const pick = picks[cat] !== null ? picks[cat] : 'NaN';
            const escapedPick = String(pick).replace(/"/g, '""');
            rows.push('"' + year + '","' + cat + '","' + escapedPick + '"');
        });
    });

    const csvContent = BOM + rows.join('\r\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'votos_encuesta_goty.csv';
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

// ═══════════════════════════════════════════════════════════════════
//  UTILIDADES DE MENSAJES DE FEEDBACK
// ═══════════════════════════════════════════════════════════════════

function showFeedback(message, type) {
    const feedbackEl = document.getElementById('surveyFeedback');
    if (!feedbackEl) return;
    feedbackEl.textContent = message;
    feedbackEl.className = 'survey-feedback show ' + (type || 'info');
}

function hideFeedback() {
    const feedbackEl = document.getElementById('surveyFeedback');
    if (!feedbackEl) return;
    feedbackEl.textContent = '';
    feedbackEl.className = 'survey-feedback';
}

// ═══════════════════════════════════════════════════════════════════
//  INICIALIZACIÓN AL CARGAR EL DOCUMENTO
// ═══════════════════════════════════════════════════════════════════
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
