// Neon purple lava-like fluid -> kubejs:liquid_source (block: kubejs:liquid_source, bucket: kubejs:liquid_source_bucket)
const $SoundActions = Java.loadClass('net.neoforged.neoforge.common.SoundActions')
const $SoundEvents = Java.loadClass('net.minecraft.sounds.SoundEvents')

StartupEvents.registry('fluid', event => {
  event.create('liquid_source')
    .displayName('Liquid Source')
    .tint(0xB000FF)
    .stillTexture('kubejs:block/liquid_source_still')
    .flowingTexture('kubejs:block/liquid_source_flow')
    .renderType(0)                // solid, like lava
    .slopeFindDistance(2)         // lava-style spreading
    .levelDecreasePerBlock(2)
    .tickRate(30)                 // lava flow speed
    .type(type => type
      .sound($SoundActions.BUCKET_FILL, $SoundEvents.BUCKET_FILL_LAVA)
      .sound($SoundActions.BUCKET_EMPTY, $SoundEvents.BUCKET_EMPTY_LAVA)
      .canSwim(false)
      .canDrown(false)
      .canExtinguish(false)
      .canHydrate(false)
      .supportsBoating(false)
      .canConvertToSource(false)
      .pathType(8)                // LAVA, so mobs avoid it
      .adjacentPathType(8)
      .lightLevel(15)
      .density(3000)
      .viscosity(6000)
      .temperature(1300)
      .motionScale(0.0023333333)
      .rarity('rare')
    )
})
