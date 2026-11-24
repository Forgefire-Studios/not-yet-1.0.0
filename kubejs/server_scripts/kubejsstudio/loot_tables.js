// kubejsstudio loot tables; re-apply merges by table id
ServerEvents.generateData('after_mods', event => {
    event.json('ars_nouveau:loot_table/blocks/sourcestone', {"type":"minecraft:block","random_sequence":"ars_nouveau:blocks/sourcestone","pools":[{"rolls":1.0,"bonus_rolls":0.0,"name":"main","conditions":[{"condition":"minecraft:survives_explosion"}],"entries":[{"type":"minecraft:item","name":"ars_additions:cracked_sourcestone"}]}]})
    const aspects = ['aer', 'ignis', 'aqua', 'terra', 'ordo', 'perditio', 'vitium']

    for (const aspect of aspects) {
        event.json(`thaumaturge:loot_table/blocks/crystal_${aspect}`, {
            type: 'minecraft:block',
            pools: [{
                rolls: 1.0,
                bonus_rolls: 0.0,
                entries: [{
                    type: 'minecraft:item',
                    name: `kubejs:vis_crystal_${aspect}`,
                    functions: [{
                        count: {
                            type: 'minecraft:uniform',
                            min: 1.0,
                            max: 4.0
                        },
                        function: 'minecraft:set_count'
                    }]
                }]
            }],
            random_sequence: `thaumaturge:blocks/crystal_${aspect}`
        })
    }
})
