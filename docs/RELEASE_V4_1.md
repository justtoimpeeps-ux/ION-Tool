# V4.1 changes and use

The delivered HTML runs locally in a desktop browser with no server, installation, external artwork downloads or framework dependencies. The source ZIP includes reproducible SVG generation, packaging, tests and the recorded operating day.

## Building and placement

Open a building and select **Proposal · editable**. **B** opens two choices:

- **Add Station:** select a process card, compare its equipment models, then choose **Place selected model**. The process dropdown and palette rotation button are removed.
- **Define Space:** visual cards for belts, cart paths, walk paths, storage areas, floor expansion, work-area selection/export, removal and compact-layout proposals.

A translucent floor preview follows the cursor. **R** rotates an equipment or belt preview, moved tile or area being sized; **Esc** returns to selection. Storage and work areas use a drag rectangle. Invalid placement is red. Walk/cart squares remain empty space for tile placement. Wheel scrolling and middle-button drag panning work during playback and over the calculation panel.

Equipment models have saved identities, prices, installation days, throughput factors and staffing requirements. Options vary by process: examples include manual fixtures, pallet-changing machining, controlled-atmosphere/vacuum processing, automatic vision inspection and tension-controlled winding. Spartan designs focus on industrial fabrication; VC designs focus on precision, controls, inspection and automation. These are proposed planner designs and estimates, not vendor quotations or newly discovered registered assets. They use the process's reserved working envelope; footprint rounding includes service/operator space. Recipes and material yields remain unchanged across models. Existing machines default to their standard model.

## Layouts and storage

Fresh plans use repeated process bays, short loading connections, connected inbound/outbound cart aisles, and implicit walk access. Equipment size and all 934 registered fixed assets are retained. Factory A/B production-floor area falls substantially compared with V4's loose blocks. The receiving floor is sized from physical storage needs, rather than shrunk to match a preferred building size.

Existing saved layouts are retained. **Define Space → Compact Floor Layout** creates an explicit relocation proposal for one building, quotes estimated relocation cost/time, preserves asset IDs, stock, crews and operating history, and supports Undo. Cart/walk paths are regenerated. Automatic compaction refuses floors with belts, protecting their existing routing.

Receiving capacity accounts for packed volume, local access, floor load, opening inventory headroom and at least three days of recipe demand at the 247/day reference. Extra capacity does not invent opening stock. See [RECEIVING_STORAGE.md](RECEIVING_STORAGE.md) for assumptions. Existing legacy storage capacities remain readable. Billets, reels, sacks, crates and tank banks fill according to quantity/capacity; replay pickups/receipts update the drawing and hover quantities.

## Floor information and motion

There are 33 distinct overhead process illustrations, with four lightweight frames per process. Working mechanisms animate during playback; idle equipment stays still. Equipment models also receive distinct control/fixture accents. The two tile captions are process/number and current/max daily production. Recipes remain in hover/actions, with an explicit **Produces** section naming each output and its batch quantity. Narrow benches use a caption above their own service space.

Flexible-access outlines alternate cyan and amber segments, twice the former dash length. Tile actions let a flexible station choose specific input/output edges, or return to automatic exposed-edge access; choices rotate with the tile. Recalculate to redraw the actual routed connections. Fixed ports retain their industrial-profile locations. Direct freehand flow-line dragging is not included: routes remain bound to station ports and passable squares.

Status circles are steady: red when unmanned/not operating, amber when idle or under maintenance, green while producing. Green brightness follows cycle speed relative to rated speed. Three green stock squares follow the limiting recipe ingredient against its target reserve; amber marks output awaiting collection. Hover explains both.

Walking workers interpolate between path squares and are approximately 10% larger. After nine production hours, operators walk out on their recorded arrival paths in reverse. This departure phase is presentation only; it adds no production, material consumption, ledger posting or paid hours. Belt slats animate in their travel direction during replay. Role clothing and fixed-tier hats remain.

## Costs, calculation and saved data

Once calculated, **Daily manpower cost** stays above the Implementation Plan panel, showing wages and paid man-hours with normal shift, pre-shift logistics and maintenance separated. The latest implemented estimate remains visible while editing a proposal. Before an implemented estimate exists, a calculated proposal is labeled as such. Parts, vehicle energy and construction remain separate. The figure is labeled last calculated rather than silently treated as a new measurement after edits.

Calculation feedback covers the floor and shows phase progress, elapsed time and a top-bar indicator. Errors remain until closed. The floor can still be panned. An unchanged, unaccepted deterministic preview is reused; accepting it enables the next day's calculation. Skill tiers do not automatically progress. Machine condition affects capacity, wears with actual use and carries forward only when closing balances are accepted. Maintenance requires qualified people, time and finite parts.

## Performance and verification

Numeric grid search preserves route choices while avoiding string-key maps for every visited square. Traffic uses exact integer-second bitsets for forbidden departure windows, preserving cell, tail, edge, loading and door reservations. Proven failed windows are reused only while their assumptions remain valid. Caches are bounded or scoped to the calculation worker; finishing the calculation releases the worker. The Diagnostics count now reports delayed/blocked departure searches, rather than counting intermediate interval-merging operations; actual waiting times and transport physics are unchanged.

Replay indexes active trips and people, uses binary lookup for work/service intervals, advances inventory events only as needed, and skips off-screen drawings. Animation does not calculate production or consume inventory.

The frozen reference engine and fixed-input benchmark fixture are test-only resources. Automated comparisons check exact route choices, feasible departure times, trips, production, inventories, costs and labour; only the implementation-specific diagnostic counter differs. Full-campus measurements and the compact starting-day results are recorded in `VALIDATION_V4_1.json` after validation.

The 247 engines/day figure remains the source operating reference for A+B combined. Candidate forecasts, including the newly arranged starting floor, expose modeled traffic and supply constraints. They are not forced to match that figure. A first day drawing on opening WIP does not prove sustainable output. Actual step cycle measurements and a located WIP census would improve calibration.
