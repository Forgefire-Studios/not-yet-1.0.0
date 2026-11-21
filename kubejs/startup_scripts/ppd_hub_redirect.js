// Sends players to Alfheim instead of the overworld when they pick dimension 0 in a PPD World Hub.
// PPD has no API/events of its own, so this hooks NeoForge's travel event and checks PPD's
// public "travelingPlayers" list, which only holds players mid-way through a World Hub teleport.
// Startup script: needs a full game restart after edits. Messages go to logs/kubejs/startup.log as [ppd redirect].

var TARGET_DIM = 'masterfulbotany:alfheim'
var TARGET_X = 0.5
var TARGET_Z = 0.5
var TARGET_Y = null // null = land on the highest block at X/Z; or set a number, e.g. 100

var $ProcessWorldHub = Java.loadClass('com.zetal.ppd.message.ProcessWorldHub')
var $Heightmap = Java.loadClass('net.minecraft.world.level.levelgen.Heightmap$Types')
var $Runnable = Java.loadClass('java.lang.Runnable')

// Avoids hub_server.getLevel(...), which KubeJS overloads and can fail to resolve.
function findLevel(srv, id) {
  var hubFound = null
  srv.getAllLevels().forEach(lvl => {
    // KubeJS turns `dimension` into a property (the dimension id) instead of a method.
    var dimId = String(lvl.dimension)
    if (dimId.indexOf(' / ') >= 0) dimId = dimId.substring(dimId.indexOf(' / ') + 3, dimId.length - 1) // ResourceKey[... / id]
    if (dimId == id) hubFound = lvl
  })
  return hubFound
}

function runCommand(srv, cmd) {
  srv.getCommands().performPrefixedCommand(srv.createCommandSourceStack().withSuppressedOutput(), cmd)
}

NativeEvents.onEvent('net.neoforged.neoforge.event.entity.EntityTravelToDimensionEvent', event => {
  try {
    var hub_player = event.getEntity()
    if (!$ProcessWorldHub.travelingPlayers.contains(hub_player)) return // not a hub teleport
    if (String(event.getDimension().location()) != 'minecraft:overworld') return // only "0" in the hub

    var hub_server = hub_player.getServer()
    var hub_level = findLevel(hub_server, TARGET_DIM)
    if (hub_level == null) {
      console.warn(`[ppd redirect] ${TARGET_DIM} not found, letting PPD send them to the overworld`)
      return
    }

    event.setCanceled(true) // stop the overworld trip
    var hub_name = String(hub_player.getGameProfile().getName())
    console.info(`[ppd redirect] cancelled overworld trip for ${hub_name}`)

    // Queued on the server thread; runs right after PPD's teleport task finishes.
    hub_server.execute(new $Runnable({
      run: function () {
        try {
          var hubY = TARGET_Y
          if (hubY == null) {
            // Load (and generate if needed) the landing chunk first; an unloaded chunk reports the world bottom.
            var bx = Math.floor(TARGET_X), bz = Math.floor(TARGET_Z)
            var hubChunk = hub_level.getChunk(bx >> 4, bz >> 4)
            hubY = hubChunk.getHeight($Heightmap.MOTION_BLOCKING, bx & 15, bz & 15) + 1
          }
          runCommand(hub_server, `execute in ${TARGET_DIM} run tp ${hub_name} ${TARGET_X} ${hubY} ${TARGET_Z}`)
          console.info(`[ppd redirect] sent ${hub_name} to ${TARGET_DIM} ${TARGET_X} ${hubY} ${TARGET_Z}`)
        } catch (e) {
          console.error(`[ppd redirect] teleport failed: ${e}`)
        }
      }
    }))
  } catch (e) {
    console.error(`[ppd redirect] hub redirect error: ${e}`) // never var an error break PPD's teleport
  }
})
