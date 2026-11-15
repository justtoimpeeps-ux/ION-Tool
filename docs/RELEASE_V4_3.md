# V4.3 review edition

Download the standalone HTML and open it locally in a modern desktop browser. Everything needed for normal operation, including artwork and calculation workers, is embedded. The source ZIP also contains the HTML plus the source and current replay examples. This is a review edition on recovery/v4-2-reconstruction; main is unchanged and earlier releases remain intact.

## What to review

- All 15 campus maps and their clickable areas. Newly furnished sparse rooms include orbital medical, crew quarters, communications and galley; administrative landmarks remain information-only. Deliberately cleared work areas stay clear.
- Machine cycles preview on map headings, or machines working in replay. Existing detailed cycles, full-size upright cargo, mixed belts, inserters, loading zones and hand-cart transfers remain.
- Equipment / fleet beside the configuration/date controls: record documented owned stock or place a commercial purchase/internal factory order, then deploy owned vehicle stock. Mining/refining/raw-material models are Spartan. Producer factory orders reserve finite actual materials and staffed cells; new proposed machines require owned stock or linked delivery before implementation.
- Drones start at zero. Acquire and deploy Spartan cargo drones, then set their active count in Operating day settings. They carry finite payloads on direct collision-free same-site flights, without drivers. Underground inter-level transport still uses the shaft.
- Parallel installation: configurable crews (default four) work on separate jobs concurrently. Supplier fabrication/delivery lead is separate from installation time. There is still one pending whole-configuration project at a time.
- Almost-black marked cart lanes and dark-gray walking areas; D/Delete confirmation and Undo; replay at 10x, 100x or 1000x.
- On-duty payroll excludes unassigned workers unless explicitly opted in. Pre-shift and production are separate crews; only each person's hours over nine receive the 1.5x overtime rate.

## Planning assumptions

Equipment bills, fabrication hours, delivery time, installation rates and adopted staffing are planning estimates. Factory orders are capital calendar jobs rather than fully routed part-by-part production recipes. A cell with a capital fabrication booking is conservatively reserved for its whole operating day so normal production cannot use that capacity too. Advancing dates may complete capital jobs/delivery; it does not fabricate operating-day production or wages for skipped dates. Purchase transactions, capital material allocations and accepted operating wages remain distinct.

More active transport creates more trips and replay records. Drones use direct waypoints and avoid the ground collision planner. With drones at zero, complete historical physical-result regressions remain unchanged. No general operating-day speedup is claimed by this equipment batch.

Save the entire campus workspace to resume later. Reconciliation reports and replay exports are separate read-only artifacts. Older saves migrate; existing recorded replay economics remain historical. Loading an older saved workspace can preserve its custom layouts instead of replacing them with the new default furnishing plan.

## Verification

115 core tests pass at source checkpoint 558dce0. Packaging verification also covers the standalone's inline workers, all sites/192 map clicks, finite Deep Vein day/replay/payroll/acceptance/save/reload, equipment receipts/orders/deployment/export/reload, machine animation and cargo, delete/Undo and the extracted source ZIP. See PACKAGING_VERIFICATION_V4_3.json for final evidence.
