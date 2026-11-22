const sourceStoneCompassDataComponents = Java.loadClass('net.minecraft.core.component.DataComponents')
const sourceStoneCompassTracker = Java.loadClass('net.minecraft.world.item.component.LodestoneTracker')
const sourceStoneCompassGlobalPos = Java.loadClass('net.minecraft.core.GlobalPos')
const sourceStoneCompassOptional = Java.loadClass('java.util.Optional')
const sourceStoneCompassBlockPos = Java.loadClass('net.minecraft.core.BlockPos')
const sourceStoneCompassMutableBlockPos = Java.loadClass('net.minecraft.core.BlockPos$MutableBlockPos')
const sourceStoneCompassBlocks = Java.loadClass('net.minecraft.core.registries.BuiltInRegistries')
const sourceStoneCompassRegistries = Java.loadClass('net.minecraft.core.registries.Registries')
const sourceStoneCompassResourceKey = Java.loadClass('net.minecraft.resources.ResourceKey')
const sourceStoneCompassResourceLocation = Java.loadClass('net.minecraft.resources.ResourceLocation')
const sourceStoneCompassSourceStoneBlock = sourceStoneCompassBlocks.BLOCK.get(
    sourceStoneCompassResourceLocation.fromNamespaceAndPath('ars_nouveau', 'sourcestone')
)

const sourceStoneCompassMaxRadius = 128
const sourceStoneCompassMinY = -48
const sourceStoneCompassMaxY = 48
const sourceStoneCompassMinOffset = 60
const sourceStoneCompassMaxOffset = 100
const sourceStoneCompassTimeoutMs = 30000
const sourceStoneCompassJobs = []

function sourceStoneCompassQuote(value) {
    return '"' + value.replace(/\\/g, '\\\\').replace(/"/g, '\\"') + '"'
}

const sourceStoneCompassName = sourceStoneCompassQuote(JSON.stringify({
    text: 'Source Stone Compass',
    italic: false
}))
const sourceStoneCompassLore = sourceStoneCompassQuote(JSON.stringify({
    text: 'Right-click to find a nearby Source Stone node',
    color: 'gray',
    italic: false
}))
const sourceStoneCompassItem = Item.of(
    'minecraft:compass[custom_data={kubejs_source_stone_compass:"true"},item_name=' +
    sourceStoneCompassName + ',lore=[' + sourceStoneCompassLore + ']]'
)

ServerEvents.recipes(event => {
    event.shaped(sourceStoneCompassItem, [
        ' S ',
        'SCS',
        ' S '
    ], {
        S: 'ars_nouveau:sourcestone',
        C: 'minecraft:compass'
    }).id('kubejs:source_stone_compass')
})

function sourceStoneCompassIsMarked(stack) {
    const data = stack.get(sourceStoneCompassDataComponents.CUSTOM_DATA)
    return data && String(data.copyTag().getString('kubejs_source_stone_compass')) === 'true'
}

function sourceStoneCompassMakeRing(job, radius) {
    const points = []
    if (radius === 0) {
        points.push({ x: job.x, z: job.z })
    } else {
        for (let dx = -radius; dx <= radius; dx++) {
            for (let dz = -radius; dz <= radius; dz++) {
                if (Math.max(Math.abs(dx), Math.abs(dz)) === radius &&
                    dx * dx + dz * dz <= sourceStoneCompassMaxRadius * sourceStoneCompassMaxRadius) {
                    points.push({ x: job.x + dx, z: job.z + dz })
                }
            }
        }
    }

    job.points = points
    job.pointIndex = 0
}

function sourceStoneCompassScanColumn(job, point) {
    const chunkKey = (point.x >> 4) + ',' + (point.z >> 4)
    if (job.loadedChunks[chunkKey] === undefined) {
        job.loadedChunks[chunkKey] = job.level.hasChunkAt(
            new sourceStoneCompassBlockPos(point.x, job.minY, point.z)
        )
    }
    if (!job.loadedChunks[chunkKey]) return

    for (let y = job.minY; y <= job.maxY; y++) {
        const pos = job.scanPos.set(point.x, y, point.z)
        const state = job.level.getBlockState(pos)
        if (!state.getBlock().equals(sourceStoneCompassSourceStoneBlock)) continue

        const dx = point.x + 0.5 - job.originX
        const dy = y + 0.5 - job.originY
        const dz = point.z + 0.5 - job.originZ
        const distanceSquared = dx * dx + dy * dy + dz * dz
        if (distanceSquared > sourceStoneCompassMaxRadius * sourceStoneCompassMaxRadius) continue
        if (!job.best || distanceSquared < job.best.distanceSquared) {
            job.best = { x: point.x, y: y, z: point.z, distanceSquared: distanceSquared }
        }
    }
}

function sourceStoneCompassStep(job) {
    const now = Date.now()
    if (now >= job.deadline) {
        job.timedOut = true
        return true
    }

    const stopAt = Math.min(now + 10, job.deadline)
    while (Date.now() < stopAt) {
        if (!job.points || job.pointIndex >= job.points.length) {
            if (job.best && Math.pow(job.ring - 1, 2) > job.best.distanceSquared) return true
            if (job.ring > sourceStoneCompassMaxRadius) return true
            sourceStoneCompassMakeRing(job, job.ring++)
        }

        sourceStoneCompassScanColumn(job, job.points[job.pointIndex++])
    }

    if (Date.now() >= job.deadline) {
        job.timedOut = true
        return true
    }
    return false
}

function sourceStoneCompassFinish(job) {
    if (job.player.hasDisconnected()) return

    if (job.timedOut) {
        job.player.displayClientMessage(
            Text.red('Source Stone search timed out after 30 seconds. Try again closer to loaded terrain.'),
            true
        )
        return
    }

    if (!job.best) {
        job.player.displayClientMessage(
            Text.red('No Source Stone node found within 128 blocks in loaded terrain.'),
            true
        )
        return
    }

    const target = sourceStoneCompassGlobalPos.of(
        job.dimensionKey,
        new sourceStoneCompassBlockPos(job.best.x, job.best.y, job.best.z)
    )
    const tracker = new sourceStoneCompassTracker(sourceStoneCompassOptional.of(target), false)
    if (sourceStoneCompassIsMarked(job.stack)) {
        job.stack.set(sourceStoneCompassDataComponents.LODESTONE_TRACKER, tracker)
    }

    for (const stack of [job.player.mainHandItem, job.player.offHandItem]) {
        if (sourceStoneCompassIsMarked(stack)) {
            stack.set(sourceStoneCompassDataComponents.LODESTONE_TRACKER, tracker)
        }
    }

    const inventory = job.player.getInventory()
    for (let i = 0; i < inventory.getContainerSize(); i++) {
        const stack = inventory.getItem(i)
        if (sourceStoneCompassIsMarked(stack)) {
            stack.set(sourceStoneCompassDataComponents.LODESTONE_TRACKER, tracker)
        }
    }

    const distance = Math.round(Math.sqrt(job.best.distanceSquared))
    job.player.displayClientMessage(
        Text.gold('The needle points to Source Stone, about ' + distance + ' blocks away.'),
        true
    )
}

ItemEvents.rightClicked('minecraft:compass', event => {
    if (!sourceStoneCompassIsMarked(event.item)) return

    const player = event.player
    const level = event.level
    const dimension = String(level.dimension)
    const isPersonalDimension = dimension.startsWith('ppd:')
    if (dimension !== 'minecraft:overworld' && !isPersonalDimension) {
        player.displayClientMessage(
            Text.red('The Source Stone Compass only works in the Overworld and personal dimensions.'),
            true
        )
        return
    }
    const dimensionParts = dimension.split(':')
    const dimensionKey = sourceStoneCompassResourceKey.create(
        sourceStoneCompassRegistries.DIMENSION,
        sourceStoneCompassResourceLocation.fromNamespaceAndPath(dimensionParts[0], dimensionParts[1])
    )

    const uuid = String(player.uuid)
    if (sourceStoneCompassJobs.some(job => job.uuid === uuid)) return

    const origin = player.blockPosition()
    sourceStoneCompassJobs.push({
        uuid: uuid,
        player: player,
        level: level,
        stack: event.item,
        dimensionKey: dimensionKey,
        deadline: Date.now() + sourceStoneCompassTimeoutMs,
        x: origin.getX(),
        z: origin.getZ(),
        minY: isPersonalDimension ? level.getMinBuildHeight() + sourceStoneCompassMinOffset : sourceStoneCompassMinY,
        maxY: isPersonalDimension ? level.getMinBuildHeight() + sourceStoneCompassMaxOffset : sourceStoneCompassMaxY,
        originX: player.getX(),
        originY: player.getY(),
        originZ: player.getZ(),
        ring: 0,
        points: null,
        pointIndex: 0,
        best: null,
        scanPos: new sourceStoneCompassMutableBlockPos(),
        loadedChunks: {}
    })
    player.displayClientMessage(Text.gray('Searching nearby terrain for Source Stone...'), true)
})

ServerEvents.tick(() => {
    if (!sourceStoneCompassJobs.length) return

    const job = sourceStoneCompassJobs[0]
    if (job.player.hasDisconnected()) {
        sourceStoneCompassJobs.shift()
        return
    }
    if (sourceStoneCompassStep(job)) {
        sourceStoneCompassJobs.shift()
        sourceStoneCompassFinish(job)
    }
})
