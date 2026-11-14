# Included map artwork

These retained PNGs are illustrated reconstructions generated from the user's pasted references, with the user's explicit approval to match them closely. They are not measured engineering drawings or exact recovered originals.

- Orinda preserves the coastline, factory rows, unbuilt C area, receiving-to-shipping sequence and supporting campus buildings. Live area numbers follow the supplied Orinda legend.
- Corellia preserves the engineering campus, distinctive HQ/training/R&D forms, workshops, bridges, logistics yard, gate and landing apron. Numbered areas follow its fifteen-area reference.
- Spartan preserves the cutaway station, command tower, docking collar, industrial/service spine and support areas. Its artwork and operating site retain Corellia high orbit, 220 m overall length, 140 m overall height, 85 personnel and four small-craft berths.

`map-hotspots.json` aligns live clickable areas to the included renderings. Custom uploaded images continue to use each site's reference regions. Neither drawing nor hotspot changes alter the interior floors or physical-day model.

Run `node scripts/render_reference_maps.cjs` to encode the retained PNGs into the runtime WebP images and regenerate `js/map-art.js`. Packaging embeds those images in the standalone HTML. Original source images and any custom uploaded replacement remain distinct.
