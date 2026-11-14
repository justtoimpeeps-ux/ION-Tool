# ION Campus Planner V4.1

A self-contained browser factory planner for the IE-4 engine program. Open `ION_Campus_Planner_v4_1.html` from the ZIP in a modern desktop browser. No server or network is needed. For development, use `npm start` or `python3 -m http.server 8000`.

The current source reference remains approximately **247 engines per nine-hour day across A+B**. This is separate from candidate forecasts and traffic-constrained day calculations. Rates, working envelopes, staffing, travel, costs and service parameters remain estimates where the register provides no measured values.

## Current configuration and proposals

The tool opens the **implemented** configuration. Choose **Proposal · editable** to drag tiles or use Build. The implemented configuration remains separate while a change is planned. Orinda includes Receiving, A, B, Subassemblies, Precision Machining, and Final Assembly & Test, with all 934 registered fixed assets represented once. Fresh starting floors use tighter repeated process bays with connected aisles; 2 × 2 m squares and registered equipment counts are preserved.

Hover for recipes and named outputs; double-click for tile actions. B opens Add Station / Define Space; choose a process and equipment model, then R rotates its floor preview; Esc returns to normal selection. Empty squares are walkable. Drive paths remain empty space for moving equipment. Tile illustrations, fixed/flexible ports, separated material lanes, endpoint arrows and route hover remain available. Floor expansion and reversible compact-layout proposals are in Define Space. See [the V4.1 guide](docs/RELEASE_V4_1.md).

Test Proposal gives the quick aggregate forecast. Calculate operating day runs the detailed inventory and transport model, then enables replay. A proposal day is a preview; only an implemented day can be accepted into the operating ledger.

## Implementation and document updates

1. Edit and test a proposal for the selected site.
2. Open **Schedule / change report**. Record the start, calendar duration and actual spending to date. Quoted work costs remain separate from actual spending.
3. Record the schedule. The prior production report remains in force before completion; the new report applies from the completion date.
4. Advance the operating date, or accept operating days to advance it one day at a time. Due configurations become implemented. Calendar advances alone do not invent production, shipments, inventory consumption or wages for skipped days.
5. Export the **document update + workspace** file. It includes machine inventories before/after, added/removed/modified IDs, work quotes, capital cost, actual spending, dates, production/capacity/efficiency by step, labour/cost results when calculated, and a complete importable workspace.

Import that handoff through Import JSON, or import a complete workspace JSON. Machine IDs, assignments, stock, unfinished work, fixed skill levels, implementation schedules and historical reports are retained. A new version can read these records instead of requiring manual transcription. Unknown recipes/assets require an explicit migration; saved production reports are not silently recalculated as historical measurements. The source process catalogue is embedded in full workspace exports.

Only one project may be pending at a time. A project implements the selected site's proposal. Other site proposals stay separate. Construction downtime is not simulated: the agreed policy retains prior production until completion. Dates are calendar days; duration can be edited to reflect concurrent installation. There is no external purchasing or document publication action.

## Operating day and replay

The ZIP includes `examples/ION_Orinda_Day_1_replay.json`. Select Orinda in the unchanged register layout, click **Load replay**, and choose this file to watch the recorded baseline immediately. It is read-only and matches the new compact starting layout. Calculate Day has been optimized and benchmarked against a frozen copy of the previous engine; see [validation](docs/VALIDATION_V4_1.json) for measured times and results. The fixed-input cloud benchmark fell from 20m 11s to 7m 14s (about 2.8× faster); browser and hardware vary. Full-campus calculation still takes time. Unchanged previews are reused immediately; The matching compact day certifies 246 engines and dispatches 194, with leftovers conserved. It uses opening WIP and is not proof of sustainable output. Quick Test remains available for layout work.

The deterministic day has a separately calculated pre-shift logistics/maintenance phase, then nine production hours by default. It calculates before playback. Controls provide play/pause, restart, seeking, speed, compressed replay export and loading. Daily labour/document reports remain readable JSON; large replay logs are compressed to keep downloads practical. Loaded replays cannot be posted as a new day.

Pickups remove source stock, vehicles carry real loads, drops fill specific tile buffers, and production waits for complete recipes. Output buffers can block production. Closing reserves, WIP, unfinished cycles, warehouse balances, service parts and condition carry into the next accepted day. Accept closing balances posts the day once; replaying or seeking never changes inventory or cost.

Opening WIP defaults to the register's roughly 750 engines equivalent. Its **unverified stage allocation is an explicit assumption**: intermediates are staged at consuming tiles, with surplus in a receiving WIP store. It is not an extra raw-stock receipt, and it excludes certified/finished engines to preserve the register’s zero opening balance. Set opening WIP to zero for a cold start. Existing internal-only WIP can also start at distributed remaining cycle times, modeling a running plant rather than restarting every machine’s cycle together. This allocation is estimated and can be disabled. A first-day replay does not validate a sustained rate: it may draw down opening WIP. Use carried operating days and the step-level balances to assess ongoing supply. These settings only apply when initializing a ledger. Actual later days carry balances. Missing material is not manufactured during the pre-shift phase merely to fill a target.

Carrier loads are limited by estimated mass, volume and individual item envelope. Raw kg items use 1 kg/unit; internal item masses derive from their expanded recipes; bought module masses and packing volumes are assumptions. Day settings show the load table. Registered fleet limits are 160 movers and 110 forklifts/pallet movers; defaults model these as tow tractors and forklifts, plus a small walking/hand-cart crew. The available unassigned handling roster supplies distinct drivers. No employee performs simultaneous driving, production and maintenance jobs.

Belts carry matching material in their configured direction. Carrier routes prefer drive paths and slow down on ordinary floor. Cell/time and edge reservations prevent vehicle overlap and head-on swaps, including the two-square carrier trail. Trips yield in off-floor holding areas until their entire route is safe. Campus roads have separate directional lanes and retain the same carrier identity/cargo across building scenes. Road geometry and door travel are schematic estimates. Dispatch uses a rolling booking horizon and prioritizes downstream output clearance. The scheduler is conservative and greedy, not an optimal fleet dispatcher or a validated turning/safety study. Operator and technician walks are illustrated; they are not a complete pedestrian collision simulation.

Maintenance uses qualified existing shift-support people, travel/service time and finite service kits. It restores condition to the configured target when the shortfall exceeds its service threshold; productive use causes configurable wear. Starting 95% condition is an assumption, not an inspection reading. Kits can be received through day settings. Random breakdowns and failure probabilities are not invented.

## Man-hours, costs and fixed skills

**Skill tiers stay fixed. There is no automatic experience gain or promotion.** Workers retain stable identities, tiers, roles and tile assignments. Skills can be manually corrected through Workforce/tile actions. Initial T1–T5 proportions are 38%, 38%, 19%, 4.5%, 0.5%: 1,235 / 1,235 / 618 / 146 / 16 people in the 3,250-person modeled roster.

The day ledger separates normal paid man-hours, pre-shift logistics, pre-shift maintenance, productive machine man-hours, vehicle busy hours, and process/role totals. With the full hired roster paid for nine hours, the normal base is **29,250 man-hours/day**, before preparation. Unassigned staff are paid by default at Orinda: they are hired workers, and other duties are not fully modeled. Day settings can change that assumption; new empty sites default to paying assigned/active staff only. Drivers and maintenance staff are not charged twice within the normal roster.

Extra pre-shift attendance and overtime use an editable wage multiplier. Operating cost separates normal workforce wages, early logistics, early maintenance, service parts and carrier energy. It excludes unpriced utilities, buildings, external freight and feed purchases, so it is not asserted to be a complete accounting profit/loss. Capital modifications remain in the separate implementation ledger.

**Export daily production / labour report** in Ledger provides a compact handoff with production by step, capacities/utilization, paid/productive man-hours, operating costs, material balances, per-engine requirements and closing state. Material procurement/usage scaling can be calculated outside the tool using these quantities.

## Sites, saves and collaboration

Sites + adds named factory, headquarters, mine, refinery, warehouse or research locations and empty buildings. No unknown assets, mining recipes or interstellar supply routes are fabricated. Existing equipment can be laid out, and real available workers assigned. Each site has a campus overview and building tabs. Cross-site payroll/fleet transfers and simultaneous multi-site operations are not modeled.

Save/export and Workforce remain on the header. Complete workspace exports include all sites, both configurations, operating ledgers and implementation reports. Building/area exports provide scoped collaboration blueprints and preserve unaffected tiles on import. Browser saves use gzip to fit layout snapshots within browser storage quotas; the indicator confirms when an asynchronous save finishes. JSON exports remain portable and readable. V3 blueprints with compatible recipes can be imported; old browser keys remain available for download. Restoring the register layout removes additional sites and ledgers after confirmation.

## Validation and development

```sh
npm test
node tests/ui-v3.cjs http://127.0.0.1:8000
node tests/ui-v4.cjs http://127.0.0.1:8000
npm run package
node tests/ui-v4.cjs http://127.0.0.1:8000/dist/ION_Campus_Planner_v4_1.html
node tests/display-v4-1.cjs http://127.0.0.1:8000/dist/ION_Campus_Planner_v4_1.html
node tests/replay-v4.cjs http://127.0.0.1:8000/dist/ION_Campus_Planner_v4_1.html
```

Browser checks require Playwright/Chromium (`CHROMIUM_PATH` may override the executable). Core checks cover recipes, source counts, fixed roster, stock conservation, deterministic replay, payload limits, vehicle reservations, directed belts, paid man-hours and completion-date production changes. The V4 browser suite covers sites, proposal/implemented separation, dated implementation, real day posting once, next-day carry, fixed skills, compressed saves and workspace import.

`js/day-engine.js` calculates operating days; `js/campaign.js` plays and posts them; `js/implementation-model.js` and `js/implementation.js` manage change schedules/reports; `js/storage.js` compresses browser saves. The original aggregate solver remains available for quick planning tests. Large physical campus calculations can take substantially longer; they run in a worker so the editor stays responsive.

The managed cloud browser blocks `file://` navigation. Standalone tests serve the single bundled HTML locally and exercise its embedded workers without external dependencies; direct desktop file launch is outside that managed-browser check.

See [source reconciliation](docs/REGISTER_RECONCILIATION.md) and [day model notes](docs/TRANSPORT_REPLAY_DESIGN.md). The November register and logistics documents remain in `docs/sources/110926/`.

## V4.1 display update

Calculations show a blocking loading panel over the factory floor, phase progress, elapsed time, and a top-bar status. Errors remain visible until closed. Default zoom is 70% with larger tile lettering. Cart/Walk popup labels are capitalized. Selection/export guidance and browser-save status now sit by the top-bar export controls, replacing the left Collaborative blueprints box.

Gap-filled insulation, seal and regulator bought-part quantities are adopted planner recipes at the user’s direction. Item names no longer carry “Assumed” tags. Purchased Flow Display items use a trailing `(Purchased)` label, one item per line; hover gives the baseline quantity where useful. Historical reconciliation notes retain the origin of these values.

Reproduce the fixed-input engine benchmark with `node scripts/benchmark-day.cjs` and `node scripts/benchmark-day.cjs --reference`. Use `--compact` separately to measure the new starting layout. Test-only reference code is never loaded by the app.

The full-campus replay browser check measured about 59 FPS. [Release notes](docs/RELEASE_V4_1.md) explain the palette, models, storage, animation, labour display, compatibility and remaining modeling assumptions.
