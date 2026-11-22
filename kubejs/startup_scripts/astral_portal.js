PortalEvents.register(event => {
	event.create()
		.frameBlock("astralsorcery:marble_raw") // required
		.lightWithFluid("astralsorcery:liquid_starlight")
		.setDestination("kubejs:astral_night") // required
})
