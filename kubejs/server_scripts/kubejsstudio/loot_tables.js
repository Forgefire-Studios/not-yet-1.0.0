// kubejsstudio loot tables; re-apply merges by table id
ServerEvents.generateData('after_mods', event => {
    event.json('ars_nouveau:loot_table/blocks/sourcestone', {"type":"minecraft:block","random_sequence":"ars_nouveau:blocks/sourcestone","pools":[{"rolls":1.0,"bonus_rolls":0.0,"name":"main","conditions":[{"condition":"minecraft:survives_explosion"}],"entries":[{"type":"minecraft:item","name":"ars_additions:cracked_sourcestone"}]}]})
})
