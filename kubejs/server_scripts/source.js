ServerEvents.recipes(event => {
    AE2Recipes.transformFluid(
        event,
        '#kubejs:liquid_source',
        [
        '#minecraft:logs'
        ],
        'kubejs:arcane_log',
        1,
        'kubejs:ae2/transform/arcane_log'
    );

        AE2Recipes.transformFluid(
 event,
        '#kubejs:liquid_source',
        [
        'ars_nouveau:sourcestone'
        ],
        'ars_nouveau:source_gem',
        2,
        'kubejs:ae2/transform/source_gem'
    );
    AE2Recipes.transformFluid(
        event,
        '#kubejs:liquid_source',
        [
        'minecraft:iron_ingot'
        ],
        'kubejs:infused_iron',
        1,
        'kubejs:ae2/transform/infused_iron_ingot'
    );
        AE2Recipes.transformFluid(
        event,
        '#kubejs:liquid_source',
        [
        'minecraft:iron_nugget'
        ],
        'kubejs:infused_iron_nugget',
        1,
        'kubejs:ae2/transform/infused_iron_ingot_nugget'
    );

})








