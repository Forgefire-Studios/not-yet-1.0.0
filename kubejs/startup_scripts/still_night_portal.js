const BuiltInRegistries = Java.loadClass('net.minecraft.core.registries.BuiltInRegistries')
const ResourceLocation = Java.loadClass('net.minecraft.resources.ResourceLocation')
const ResourceKey = Java.loadClass('net.minecraft.resources.ResourceKey')
const Registries = Java.loadClass('net.minecraft.core.registries.Registries')
const CustomPortalApiRegistry = Java.loadClass('net.kyrptonaught.customportalapi.CustomPortalApiRegistry')

const block = id => BuiltInRegistries.BLOCK.get(ResourceLocation.parse(id))
const fluid = id => BuiltInRegistries.FLUID.get(ResourceLocation.parse(id))
const frame = block('astralsorcery:marble_raw')
const stillNight = ResourceLocation.parse('kubejs:still_night')
const returnDimensionKey = 'still_night_portal_return_dimension'

const getLevel = (entity, dimension) => entity.level().getServer().getLevel(
    ResourceKey.create(Registries.DIMENSION, dimension)
)

PortalEvents.register(event => {
    event.create()
        .frameBlock(frame)
        .lightWithFluid(fluid('astralsorcery:liquid_starlight'))
        .setDestination(stillNight)
        .beforeTeleportation(entity => {
            const currentDimension = entity.level().dimension().location()
            const portalLink = CustomPortalApiRegistry.getPortalLinkFromBase(frame)

            if (!portalLink) {
                console.error('Still Night portal: PortalJS has no registered link for its marble frame.')
                return ShouldTP.CANCEL
            }

            if (currentDimension.equals(stillNight)) {
                const returnDimension = entity.persistentData.getString(returnDimensionKey)

                if (!returnDimension) {
                    console.warn('Still Night portal: no origin dimension is stored for this entity; teleport cancelled.')
                    return ShouldTP.CANCEL
                }

                const destinationLevel = getLevel(entity, ResourceLocation.parse(returnDimension))
                if (!destinationLevel) {
                    console.error(`Still Night portal: origin dimension ${returnDimension} is unavailable; teleport cancelled.`)
                    return ShouldTP.CANCEL
                }

                // PortalLink is shared, so set this entity's route immediately before PortalJS resolves the destination.
                portalLink.returnDimID = ResourceLocation.parse(returnDimension)
                portalLink.returnPortalSearchYBottom = destinationLevel.getMinBuildHeight()
            } else {
                const destinationLevel = getLevel(entity, stillNight)
                if (!destinationLevel) {
                    console.error('Still Night portal: destination dimension is unavailable; teleport cancelled.')
                    return ShouldTP.CANCEL
                }

                entity.persistentData.putString(returnDimensionKey, currentDimension.toString())
                portalLink.returnDimID = currentDimension
                portalLink.portalSearchYBottom = destinationLevel.getMinBuildHeight()
            }

            return ShouldTP.CONTINUE
        })
})