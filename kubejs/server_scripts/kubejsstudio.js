// kubejsstudio custom: kubejsstudio:arcane_log
ServerEvents.generateData('after_mods', event => {
    event.json(
      'kubejsstudio:recipe/arcane_log',
      {
        "type": "ars_nouveau:imbuement",
        "input": {"tag":"minecraft:logs"},
        "output": {"count":1,"id":"kubejs:arcane_log"},
        "pedestalItems": [],
        "source": 50
      }
    )
})
