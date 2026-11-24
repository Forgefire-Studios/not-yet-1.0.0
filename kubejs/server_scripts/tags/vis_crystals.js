ServerEvents.tags('item', event => {
    event.add('kubejs:vis_crystal_aer', 'kubejs:vis_crystal_aer')
    event.add('kubejs:vis_crystal_ignis', 'kubejs:vis_crystal_ignis')
    event.add('kubejs:vis_crystal_aqua', 'kubejs:vis_crystal_aqua')
    event.add('kubejs:vis_crystal_terra', 'kubejs:vis_crystal_terra')
    event.add('kubejs:vis_crystal_ordo', 'kubejs:vis_crystal_ordo')
    event.add('kubejs:vis_crystal_perditio', 'kubejs:vis_crystal_perditio')
    event.add('kubejs:vis_crystal_vitium', 'kubejs:vis_crystal_vitium')
    event.add('kubejs:vis_crystals', [
        'kubejs:vis_crystal_aer',
        'kubejs:vis_crystal_ignis',
        'kubejs:vis_crystal_aqua',
        'kubejs:vis_crystal_terra',
        'kubejs:vis_crystal_ordo',
        'kubejs:vis_crystal_perditio',
        'kubejs:vis_crystal_vitium'
    ])
})

ServerEvents.tags('block', event => {
    event.add('kubejs:vis_crystal_aer', 'thaumaturge:crystal_aer')
    event.add('kubejs:vis_crystal_ignis', 'thaumaturge:crystal_ignis')
    event.add('kubejs:vis_crystal_aqua', 'thaumaturge:crystal_aqua')
    event.add('kubejs:vis_crystal_terra', 'thaumaturge:crystal_terra')
    event.add('kubejs:vis_crystal_ordo', 'thaumaturge:crystal_ordo')
    event.add('kubejs:vis_crystal_perditio', 'thaumaturge:crystal_perditio')
    event.add('kubejs:vis_crystal_vitium', 'thaumaturge:crystal_vitium')
})
