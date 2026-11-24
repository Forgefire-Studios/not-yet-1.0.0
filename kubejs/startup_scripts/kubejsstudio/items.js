// kubejsstudio registry additions; re-apply merges by id
StartupEvents.registry('item', event => {
    event.create('kubejs:infused_iron').displayName('Infused Iron').texture('minecraft:item/iron_ingot').parentModel('minecraft:item/iron_ingot').glow(true)
    event.create('kubejs:infused_iron_nugget').texture('minecraft:item/iron_nugget').parentModel('minecraft:item/iron_nugget').glow(true)
    event.create('kubejs:vis_crystal_aer').displayName('Aer Vis Crystal').parentModel('thaumaturge:item/essentia_crystal')
    event.create('kubejs:vis_crystal_ignis').displayName('Ignis Vis Crystal').parentModel('thaumaturge:item/essentia_crystal')
    event.create('kubejs:vis_crystal_aqua').displayName('Aqua Vis Crystal').parentModel('thaumaturge:item/essentia_crystal')
    event.create('kubejs:vis_crystal_terra').displayName('Terra Vis Crystal').parentModel('thaumaturge:item/essentia_crystal')
    event.create('kubejs:vis_crystal_ordo').displayName('Ordo Vis Crystal').parentModel('thaumaturge:item/essentia_crystal')
    event.create('kubejs:vis_crystal_perditio').displayName('Perditio Vis Crystal').parentModel('thaumaturge:item/essentia_crystal')
    event.create('kubejs:vis_crystal_vitium').displayName('Vitium Vis Crystal').parentModel('thaumaturge:item/essentia_crystal')
})
