const BuiltInRegistries = Java.loadClass('net.minecraft.core.registries.BuiltInRegistries')
const ResourceLocation = Java.loadClass('net.minecraft.resources.ResourceLocation')
const ResourceKey = Java.loadClass('net.minecraft.resources.ResourceKey')
const Registries = Java.loadClass('net.minecraft.core.registries.Registries')
const CustomPortalApiRegistry = Java.loadClass('net.kyrptonaught.customportalapi.CustomPortalApiRegistry')

const block = id => BuiltInRegistries.BLOCK.get(ResourceLocation.parse(id))
const stillNight = ResourceLocation.parse('kubejs:still_night')
const returnDimensionKey = 'still_night_portal_return_dimension'

const getDimensionLocation = level => {
    const dimensionKey = String(level.dimension)
    const separator = dimensionKey.indexOf(' / ')
    const dimensionId = separator >= 0
        ? dimensionKey.substring(separator + 3, dimensionKey.length - 1)
        : dimensionKey

    return ResourceLocation.parse(dimensionId)
}

const getLevel = (entity, dimension) => entity.level.getServer().getLevel(
    ResourceKey.create(Registries.DIMENSION, dimension)
)

PortalEvents.register(event => {
    event.create()
        .frameBlock('astralsorcery:marble_raw')
        .lightWithFluid('astralsorcery:liquid_starlight')
        .setDestination('kubejs:still_night')
        .beforeTeleportation(entity => {
            const frame = block('astralsorcery:marble_raw')
            const currentDimension = getDimensionLocation(entity.level)
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