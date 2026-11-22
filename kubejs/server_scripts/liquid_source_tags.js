// Being in #minecraft:lava gives the fluid lava behaviour:
// sets entities on fire, burns dropped items, lava swimming physics.
ServerEvents.tags('fluid', event => {
  event.add('minecraft:lava', /^kubejs:(flowing_)?liquid_source(_flowing)?$/)
})
