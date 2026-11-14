# ION Campus Planner V4.2 — reconstructed release

Reconstructed from the verified V4.1 complete package and the preserved V4.2 handoff. The inaccessible original V4.2 environment was not modified. Main remains unchanged; source, artwork, validation and downloads are on the recovery branch.

## Use

Open the standalone `ION_Campus_Planner_v4_2.html` in a modern desktop browser, or serve the source with `npm start`. For desktop use the HTML embeds art, worker code and styles; no asset server or external download is required. Managed-browser testing serves that single file locally because file navigation is restricted there.

The fresh campus retains 934 assets and 3,250 workers, with the fixed tier census and recipes preserved. New floors are near-square or portrait rectangles derived from placement; prior imported layouts are retained. Compact-layout proposals remain explicit and undoable. Default 100% now has the former 70% square size.

## Operation and accounting

Calculate a day before replay. Replay, seeking and report export do not post operations. Only accepting the implemented day's closing balances posts inventory, wear, payroll and accepted operating results once. Preparation and the nine-hour production shift remain separately timed and costed. Calendar advancement implements due projects but creates no operating days.

Physical operator/helper limits apply to assignment and calculation. Legacy excess assignments remain identified and paid, but do not increase productive hours or machine capacity. Helpers can provide a modest benefit within mechanical capacity. No automatic hiring, XP or promotions occur.

Cart cells must belong to a complete unobstructed 2×2 painted block. Narrow segments are red and unavailable to carriers; walkers can still traverse them. Empty floor stays walkable. Fresh layouts contain no narrow cart cells. Carrier paths, loads and traffic reservations remain physical.

VC in-house options allocate actual warehouse materials once when scheduled, expose fabrication labor obligations and enforce the minimum individual lead time. A shortage prevents scheduling; proposed warehouse quantities cannot fund it. Use Schedule / change report → Warehouse receipt / signed correction to record an actual receipt or adjustment. Completion installs the allocation without consuming its bill again. External purchase quotes, cumulative actual spending, signed cash adjustments and fabrication WIP remain separate. Retired Spartan manufacturing options still import but are not offered for new placement.

Use **Save complete workspace** for a resumable save. **Export ION change report** creates read-only `ION-change-report-1` reconciliation data with persistent workspace/transaction identities, assets/configuration, staffing, inventories, project dates, production, accepted material balances, paid manpower, capital quotes, actual cash adjustments and fabrication allocations. Reports cannot be imported as complete workspaces. Repeated exports add no debit or expense. Accepted operating transactions are archived beyond the engine's rolling 90-day display history; legacy saves cannot recover older discarded detail. Starting a new ledger creates a distinct operating-series identity.

## Visuals and controls

The resupplied engine reference informs the coordinated eight part groups, grid/chamber/magnet/housing/pump/power-line layout, completed engines, pallets and shipping cradle. Palette art, machine workpieces, output waiting for pickup, storage and cargo use the same atlas family. Images preserve proportions on rotated footprints. Work-driven motion includes process feeds, forming, furnace heat/pouring, machining/welding, coating and testing; idle machinery does not run the animation. Repulsorlift cargo speeders replace wheeled vehicle drawings. Material cues are confined to cargo.

B opens Add Station / Define Space, R rotates, Escape cancels. Flexible stations let you choose input/output edges and move the attachment along that edge in tile actions; changes redraw on recalculation. Fixed industrial ports remain fixed. Routing follows passable squares; arbitrary freehand carrier routes are not invented. Hover and double-click details retain recipes, quantities, staffing, condition and throughput. Flow arrows and lane spacing are increased. Three-square reserve indicators, steady status lights, stock capacity/fullness and worker departures remain.

Save/export and Workforce precede test controls. Daily manpower is above the right production dashboard after calculation; the interbuilding sidebar is removed while transfers remain modeled. Diagnostics stay collapsed. Dragging uses an overlay without recomputing the day.

## Evidence and limitations

See `VALIDATION_V4_2.json` for current measurements. The new full-campus day certified 244 and dispatched 194 with finite inventory and conservation. This first day draws on opening WIP; it does not establish sustainable 247/day or the overtime-supported 108,800/year requirement. A+B's 247/day source reference remains separate. 108,800 × 250,000 Cr is 27.2 billion Cr gross annual engine sales, not profit. The provisional 365-day requirement is 298.08/day; a linear ~10.9h estimate is not a demonstrated overtime requirement. Do not add labor again to the referenced 152,500 Cr/engine expense without reconciling its coverage; other service revenue is separate.

Physical dimensions, packing, service parameters, fabrication bills and equipment equivalents are adopted planning values where source measurements are absent. The original reference cutaway does not supply these missing measurements. The existing conservative traffic dispatcher is not an optimized safety/turning study. Pedestrians do not have a full collision model, and cross-site/interstellar logistics are not invented. Artwork is reconstructed, not recovered from the inaccessible V4.2 workspace.
