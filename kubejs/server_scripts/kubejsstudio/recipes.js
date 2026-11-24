// kubejsstudio recipes; re-apply merges by recipe id
ServerEvents.generateData('after_mods', event => {
    event.json('kubejsstudio:recipe/arcane_log', {"type":"ars_nouveau:imbuement","input":{"tag":"minecraft:logs"},"output":{"count":1,"id":"kubejs:arcane_log"},"pedestalItems":[],"source":500})
    event.json('kubejsstudio:recipe/imbument/infused_iron', {"type":"ars_nouveau:imbuement","input":{"tag":"c:ingots/iron"},"output":{"count":1,"id":"kubejs:infused_iron"},"pedestalItems":[],"source":500})
    event.json('kubejsstudio:recipe/imbument/source_gem', {"type":"ars_nouveau:imbuement","input":{"item":"ars_additions:cracked_sourcestone"},"output":{"count":1,"id":"ars_nouveau:source_gem"},"pedestalItems":[{"item":"kubejs:vis_crystal_aer"},{"item":"kubejs:vis_crystal_ignis"},{"item":"kubejs:vis_crystal_ordo"},{"item":"kubejs:vis_crystal_perditio"},{"item":"kubejs:vis_crystal_vitium"},{"item":"kubejs:vis_crystal_terra"}],"source":500})
    event.json('kubejsstudio:recipe/smelting/sourcestone', {"type":"minecraft:smelting","ingredient":{"item":"ars_additions:cracked_sourcestone"},"result":{"id":"ars_nouveau:sourcestone"},"experience":0.1,"cookingtime":200})
})
ServerEvents.recipes(event => {
    event.remove({ id: 'ars_nouveau:sourcestone' })
    event.shapeless(Item.of('kubejs:infused_iron_nugget', 9), ['kubejs:infused_iron']).id('kubejsstudio:infused_iron_nugget')
    event.shapeless(Item.of('kubejs:infused_iron', 9), ['kubejs:infused_iron_nugget', 'kubejs:infused_iron_nugget', 'kubejs:infused_iron_nugget', 'kubejs:infused_iron_nugget', 'kubejs:infused_iron_nugget', 'kubejs:infused_iron_nugget', 'kubejs:infused_iron_nugget', 'kubejs:infused_iron_nugget', 'kubejs:infused_iron_nugget']).id('kubejsstudio:infused_iron')
    event.remove({ id: 'ars_additions:crafting/stonecutter/sourcestone_0' })
    event.remove({ id: 'ars_additions:crafting/revert/cracked_sourcestone_to_sourcestone' })
})
