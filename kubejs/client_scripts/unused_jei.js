const confirmedUnobtainableItemsByMod = {
  ae2: [
    'creative_storage_cell',
    'debug_card',
    'debug_eraser',
    'debug_meteorite_placer',
    'debug_replicator_card',
  ],
  appliedthaumaturge: ['essentia_cell_creative'],
  ars_nouveau: ['debug'],
  avaritia: ['test_sword'],
  fluxnetworks: ['admin_configurator'],
  minecraft: [
    'barrier',
    'chain_command_block',
    'command_block',
    'command_block_minecart',
    'debug_stick',
    'end_portal_frame',
    'jigsaw',
    'knowledge_book',
    'light',
    'reinforced_deepslate',
    'repeating_command_block',
    'spawner',
    'structure_block',
    'structure_void',
    'trial_spawner',
    'vault',
  ],
  mm: ['debug_tool'],
  nuclear_radiation: ['creative_rad_source'],
  powahaddon: [
    'battery_creative',
    'creative_crystal_block',
    'creative_tier_installer',
    'crystal_creative',
    'ender_cell_creative',
    'ender_gate_creative',
    'energizing_rod_creative',
    'energy_cable_creative',
    'energy_cell_creative',
    'furnator_creative',
    'magmator_creative',
    'player_transmitter_creative',
    'reactor_creative',
    'solar_panel_creative',
    'thermo_generator_creative',
  ],
  thaumaturge: ['creative_flux_sponge', 'creative_node_placer'],
}

RecipeViewerEvents.removeEntries('item', event => {
  Object.keys(confirmedUnobtainableItemsByMod).sort().forEach(modId => {
    confirmedUnobtainableItemsByMod[modId].forEach(itemId => {
      event.remove(modId + ':' + itemId)
    })
  })
})
