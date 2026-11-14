# Receiving storage audit — V4.1

Each square is 4 m². Previous receiving sizes used only opening quantity × bare material volume / 8.8 m³ per square, with a four-square minimum. This omitted packaging, weight, replenishment needs and operating headroom.

New starting stores use the larger of recorded opening quantity / 0.85 and 3 × daily recipe demand × 1.10. Daily demand is the complete bill of materials for 247 dispatched engines, A+B combined; this is a sizing reference rather than a promise of output. Zero opening quantities remain zero, even when capacity is reserved.

Capacity is constrained by both packed volume and mass. Billets use 1.6 × solid volume; reels, crates and sacks use 1.8 × material volume. Ordinary stores allow 2.2 m³ usable packed storage and 2,500 kg per square (625 kg/m²). Coolant and Tibanna tank banks use the existing modeled cargo densities, 4 m³ per square and a 5,000 kg per-square limit. These are adopted planning parameters, not surveyed floor ratings, certified pressure-vessel designs or established Tibanna properties. Footprints include local storage access; building transport aisles remain additional. No logistics payload density is changed.

At the 247/day reference, recorded raw opening inventories represent roughly 36–43 production days, so opening inventory generally determines area. Iron needs about 50,141 kg/day and has 1,800,000 kg opening stock (35.9 days); its starting store is 3,480 m² with 2,175,000 kg capacity. Nickel needs 29,146 kg/day and has 1,100,000 kg opening stock (37.7 days); its store is 2,116 m² with 1,322,500 kg capacity. Electronics feedstock needs 9,139 kg/day and has 350,000 kg opening stock (38.3 days); its store is 2,704 m² with 413,111 kg capacity.

Existing saved storage footprints and legacy capacities remain unchanged. New baseline storage carries `storageModel: receiving-v1`, preserved by workspace exports. Hover information identifies legacy capacity and shows daily usage, days on hand, area and fullness. Capacity does not imply stock availability or supplier deliveries.

Top-down storage graphics distinguish billets, reels, sacks, crates and tank banks. Symbols are schematic, not individual counted containers. Their collective occupied fraction and the continuous capacity bar follow current quantity / capacity, including recorded pickups and receipts during playback. Each store is drawn within its actual footprint.

Worker departures are a presentation phase after shift end, using recorded arrival paths in reverse. They do not add production, consume inventory, post another ledger or alter paid-hour accounting. Walking interpolates between recorded path points; clothing and hats retain job and skill colors.
