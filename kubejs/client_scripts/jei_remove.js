// betterblockz whitelist
const betterBlockzCraftedItems = [
  'agon_blockz_0', 'ambercore_blockz_0', 'armz_blockz_0', 'aurora_blockz',
  'auto_placer', 'azur_blockz_0', 'bitt_blockz_0', 'block_disconnect',
  'block_extend', 'block_randomizer', 'block_replacer', 'blockz_core',
  'checkered_spade', 'cobble_crafter', 'color_changer', 'copper_blockz_0',
  'cray_blockz_0', 'crimson_blockz_0', 'cyberlight_alt_blockz_0', 'cyberlight_bar_0',
  'cyberlight_bar_vertical_0', 'cyberlight_blockz_0', 'cyberlight_cycle_blockz_0', 'cyberlight_thin_0',
  'cyberlight_thin_alt_0', 'diamond_blockz_0', 'diamond_frame_platform_blockz_0', 'eclipse_blockz_0',
  'flat_lamp', 'forgecopper_blockz_0', 'fort_blockz_0', 'gold_blockz_0',
  'gold_frame_platform_blockz_0', 'hazard_blockz_0', 'iron_blockz_0', 'ironslate_blockz_0',
  'ironslateredstone_blockz_0', 'iszm_blockz_0', 'jelt_blockz_0', 'korp_blockz_0',
  'kryp_blockz_0', 'lablink_19_blockz_0', 'lablink_blockz_0', 'lairblood_blockz_0',
  'lairdecay_blockz_0', 'lairflesh_blockz_0', 'lairhusk_blockz_0', 'lairstain_blockz_0',
  'lave_blockz_0', 'meta_wand', 'metalzone_copper_blockz_0', 'metalzone_iron_blockz_0',
  'metalzone_rustycopper_blockz_0', 'metalzone_rustyiron_blockz_0', 'mint_blockz_0', 'myst_blockz_0',
  'number_blockz_0', 'omni_spade', 'reactor_1_blockz_0', 'reactor_7_blockz_0',
  'reactor_blockz_0', 'reed_blockz_0', 'stone_blockz', 'stone_blockz_0',
  'sync_blockz_0', 'synthalloy_blockz_0', 'tank_blockz_0', 'tintedglass_blockz_0',
  'transmuter_blockz', 'variant_shuffler', 'vect_blockz_0', 'vena_blockz_0',
  'zane_blockz_0', 'zeno_black_blockz_0', 'zeno_blue_blockz_0', 'zeno_brown_blockz_0',
  'zeno_cyan_blockz_0', 'zeno_gray_blockz_0', 'zeno_green_blockz_0', 'zeno_light_blue_blockz_0',
  'zeno_light_gray_blockz_0', 'zeno_lime_blockz_0', 'zeno_magenta_blockz_0', 'zeno_orange_blockz_0',
  'zeno_pink_blockz_0', 'zeno_purple_blockz_0', 'zeno_red_blockz_0', 'zeno_white_blockz_0',
  'zeno_yellow_blockz_0', 'zenohex_blockz_0', 'zeon_black_blockz_0', 'zeon_blue_blockz_0',
  'zeon_brown_blockz_0', 'zeon_cyan_blockz_0', 'zeon_gray_blockz_0', 'zeon_green_blockz_0',
  'zeon_light_blue_blockz_0', 'zeon_light_gray_blockz_0', 'zeon_lime_blockz_0', 'zeon_magenta_blockz_0',
  'zeon_orange_blockz_0', 'zeon_pink_blockz_0', 'zeon_purple_blockz_0', 'zeon_red_blockz_0',
  'zeon_white_blockz_0', 'zeon_yellow_blockz_0', 'zoea_0_blockz_0', 'zoea_1_blockz_0',
  'zoea_2_blockz_0', 'zoea_3_blockz_0', 'zoea_blockz_0', 'zome_black_blockz_0',
  'zome_blue_blockz_0', 'zome_brown_blockz_0', 'zome_cyan_blockz_0', 'zome_gray_blockz_0',
  'zome_green_blockz_0', 'zome_light_blue_blockz_0', 'zome_light_gray_blockz_0', 'zome_lime_blockz_0',
  'zome_magenta_blockz_0', 'zome_orange_blockz_0', 'zome_pink_blockz_0', 'zome_purple_blockz_0',
  'zome_red_blockz_0', 'zome_white_blockz_0', 'zome_yellow_blockz_0', 'ztyl_blockz_0',
]

// remove by mod
RecipeViewerEvents.removeEntries('item', event => {
  event.remove(/chipped:(?!alchemy_bench$|botanist_workbench$|carpenters_table$|chisel$|glassblower$|loom_table$|mason_table$|tinkering_table$).*/)
  event.remove(/chisel:(?!chisel$).*/)
  event.remove(/chisel_chipped_integration:.*/)
  event.remove(/rechiseled:.*/)
  event.remove(/rechiseled_chipped:.*/)
  event.remove(/rechiseledae2:.*/)
  event.remove(new RegExp('^betterblockz:(?!(?:' + betterBlockzCraftedItems.join('|') + ')$).*'))
  event.remove(/factory_blocks:(?!factory$).*/)
})