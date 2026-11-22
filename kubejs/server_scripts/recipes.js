// kubejsstudio recipes; re-apply merges by recipe id
ServerEvents.generateData('after_mods', event => {
    event.json('kubejsstudio:recipe/arcane_log', {"type":"ars_nouveau:imbuement","input":{"tag":"c:stones"},"output":{"count":1,"id":"ars_nouveau:sourcestone"},"pedestalItems":[],"source":500})
})
ServerEvents.recipes(event => {
    event.remove({ id: 'ars_nouveau:sourcestone' })
    event.shapeless(Item.of('kubejs:infused_iron_nugget', 9), ['kubejs:infused_iron']).id('kubejsstudio:infused_iron_nugget')
    event.shapeless(Item.of('kubejs:infused_iron', 9), ['kubejs:infused_iron_nugget', 'kubejs:infused_iron_nugget', 'kubejs:infused_iron_nugget', 'kubejs:infused_iron_nugget', 'kubejs:infused_iron_nugget', 'kubejs:infused_iron_nugget', 'kubejs:infused_iron_nugget', 'kubejs:infused_iron_nugget', 'kubejs:infused_iron_nugget']).id('kubejsstudio:infused_iron')
})
