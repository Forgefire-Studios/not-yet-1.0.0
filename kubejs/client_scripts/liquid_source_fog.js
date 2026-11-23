const $Minecraft = Java.loadClass('net.minecraft.client.Minecraft')
const $BuiltInRegistries = Java.loadClass('net.minecraft.core.registries.BuiltInRegistries')

NativeEvents.onEvent('net.neoforged.neoforge.client.event.ViewportEvent$ComputeFogColor', event => {
  const level = $Minecraft.getInstance().level
  if (level == null) return

  const fluid = level.getFluidState(event.getCamera().getBlockPosition()).getType()
  const fluidId = String($BuiltInRegistries.FLUID.getKey(fluid))
  if (fluidId !== 'kubejs:liquid_source' && fluidId !== 'kubejs:flowing_liquid_source') return

  event.setRed(0.42)
  event.setGreen(0.0)
  event.setBlue(0.72)
})
