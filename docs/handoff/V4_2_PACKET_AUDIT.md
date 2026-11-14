# V4.2 user-packet audit

The packet uploaded for this review is preserved verbatim as `V4_2_USER_PACKET.txt`. Its requirements match the prior reconstruction handoff; the prior saved file additionally contains an introductory conversation and a final instruction to begin with V4.1 inspection. This review checks the implementation, rather than treating the prior completion checklist as proof.

## Gaps corrected in this review

- Walking cargo handlers previously shared a vehicle-shaped renderer. They now have a human silhouette, moving stride and carried item. Their physical transport rules are unchanged.
- Campus transfer markers previously colored the entire vehicle by material. Speeders now have a neutral chassis/cab and a separately colored cargo bed; walkers have their own silhouette. Detailed floor cargo retains the actual item artwork.
- The three working atlas plates previously repeated a finished output. Assembly processes now show ingredient arrangements, assembly in progress and the output. Kitting gathers the eight reference-aligned groups before showing an engine. Machining and calibration can retain the same exterior; their moving tools/scanners show the operation. Stages use recorded work-cycle progress, not a repeating decorative frame counter. A resumed cycle visualizes its recorded remaining interval; exact earlier assembly geometry is not available in old saves.
- The generic moving rectangle used by several processes was replaced with assembly arms/welding, pump/interface tooling, electronics probes, kitting tooling, impregnation heating and coupler testing. All 33 process roles have work motion. Animation is invoked only for recorded work and freezes on pause.
- The user's follow-up request to recognize machines by sight adds 33 distinct painted pictograms with process color accents. The same identifiers appear in palette artwork and installed machines; floor borders/caption accents use the matching color. Original machinery artwork is retained. Shape distinguishes processes that share a color, avoiding dependence on color alone.
- Ordinary UI now calls adopted staffing/supply/engineering values planning values or parameters. Opening WIP's unknown stage allocation and unconfirmed external deliveries remain explicitly distinguished. The duplicate bottom calculation message was removed; the progress overlay remains.

## Requirement-by-requirement findings

“Present” means concrete code/artifacts and the cited validation exist. It does not imply the source production references or historical performance numbers have been achieved by this model.

| Packet | Requested behavior | Finding and evidence |
| --- | --- | --- |
| Recovery | Preserve original environment and main; dedicated verified checkpoints | Present. Work stays on `recovery/v4-2-reconstruction`; recorded main SHA is `718ae90c0a731e785474c3f5baba88748baff112`. Original V4.1 HTML/ZIP hashes match packet. |
| 1 | 247/day combined A+B, nine hours, 90,000/year reference | Present in `register.js`, header and reconciliation. Shared counts are not halved. |
| 1 | 108,800/year, 250,000 Cr, 27.2 billion sales, 298.08/day and approximate 10.9h | Present in register/reconciliation/release documentation, with provisional accounting basis and no claim of demonstrated overtime output. |
| 1 | Gross sales distinct from profit; avoid duplicate 152,500 expense/labor; separate service revenue | Present in `REGISTER_RECONCILIATION.md`, `RELEASE_V4_2.md` and `ion-export.js` limitations. No invented profit posting. |
| 2 | November source priority and material recipes | Present: both November DOCX files/extracts retained; `write_handoff_catalogue.cjs` verifies exact expanded raw recipe against recovery fixture. Adopted internal feeds/allocations remain quantity-conserving. |
| 2 | Identify absent source evidence | Original V5.5 simulator, October organization document and campus master-plan upload are not present as independent originals in this checkout. The recovered V4.1 package, source extracts, November documents and resupplied engine reference support reconstruction; they do not establish exact missing measurements. |
| 3 | 2m squares, shared receiving/machining/subassemblies/final hall, A+B remainder, C unbuilt | Present: `baseline.js`, `sites.js`, `register.js`. Six initial buildings; C has no installed assets. |
| 3 | Layout from real asset/process inventory, portrait/compact floors | Present: category allocation exactly conserves 934 assets; `baseline.test.cjs` and `reconstruction.test.cjs` verify process allocation, portrait floors, access and no narrow baseline cart cells. Historical dimensions are references, not forced sizes. |
| 3 | Preserve imported layouts; explicit repack and Undo | Present: `compactActiveFloor`, migration/compatibility tests and `compat-v4-1.cjs`. No automatic rearrangement on import. |
| 4 | 3,250 identities, tier census 1235/1235/618/146/16, no hiring/progression | Present: baseline and day tests; `day-engine.js` ignores obsolete promotion settings. Worker IDs and spare roster persist. |
| 4 | Physical operators/helpers, preserve/pay excess legacy assignments | Present: shared `requiredWorkers`, `productiveCrew`, staffing limits in engine/UI and reconstruction tests. Helpers cannot exceed mechanical capability. |
| 4 | 29,250 normal paid hours plus preparation/maintenance | Present: day labor accounting, ledger/export and manpower dashboard; fresh-day measurements distinguish normal and total paid hours. |
| 5 | Calculate first, recorded replay; complete recipes, finite buffers, WIP/transit conservation | Present: physical day engine, replay validation/index, material-balance tests, full-day run and full-trip audit. |
| 5 | Zero opening certified engines; 750-equivalent WIP is not finished stock | Present: `FactoryDay.initial` excludes tested/shipped from opening WIP; stage allocation stays explicitly estimated. |
| 5 | Separately timed service/preparation; condition wear and qualified finite-kit maintenance | Present: day service scheduling, wearPerDay `.002`, qualified support workers and finite kits; day tests cover service/wear. |
| 5 | Accept exactly once; previews/replay/seeking/export do not post | Present: `ui-v4.cjs`, `replay-v4.cjs`, replay validation and operating-entry identity tests. Calendar advancement also does not fabricate days. |
| 5 | Workers enter/depart | Present: recorded arrivals/departures and replay tests including end-of-shift absence. |
| 6 | Belt/cart/walk; empty floor walkable; road paint does not occupy machinery space | Present: geometry/pathfinding and placement rules. Existing carrier traffic reservations remain unchanged. |
| 6 | Complete 2×2 cart blocks, red invalid cells, walkers still pass | Present: engine/cart geometry and reconstruction tests. New placement removes paint under equipment and recomputes validity. |
| 6 | Repulsorlift speeders, bobbing, identifiable cargo, neutral chassis | Corrected/completed in this review: `floor-art.js`, `campusCarrierMarkup`; `packet-visuals.cjs` checks human handlers, unchanged chassis pixels and separate cargo. |
| 6 | Payload by mass/volume/envelope and whole items | Present: `materialPhysics`, `payload`, vehicle decks, dispatch flooring; day and engine tests. Rendering does not change transported quantities. |
| 6 | Continuous worn roads/stencils and faint floor/road grids | Present: `drawRoads`, `paint`, `floor-art.js`; display checks and visual inspection. |
| 6 | Interbuilding calculations/map transfers remain | Present: day campus paths and replay transfers, with separate neutral carrier/cargo markers. Hidden sidebar does not remove transfers. |
| 7 | Parallel lanes, larger start/end arrows, attachments and hover information | Present: `flowGeometry`, `drawFlows`, `flowAt`; fixed/flexible ports and input/output boundary markings retained. |
| 7 | Interactive attachment movement and redraw | Present: exact boundary-square selection, edge slider, rotated coordinates, blocked/interior/no-op rejection, Escape/Undo; `attachments-browser.cjs`. Routes recompute through physical passable squares. No arbitrary freehand vehicle path. |
| 7 | Three-square reserve and steady work-dependent status | Present in `drawReplay`: least-ingredient reserve, output waiting, red/yellow/green work state and intensity. No generic blinking green. |
| 8 | Plausible different footprints; only centered TYPE # and output/capacity text | Present: adopted envelopes in `data.js`; `drawMachine`. Color accents/pictograms add identity without adding recipe text over machines. |
| 8 | Details make output/inputs/quantities/supply/need/staff/condition explicit; double-click | Present: `renderSelection`, `showTip`, double-click handler and browser UI checks. |
| 8 | Contain-fit artwork, rotated ghosts and aligned mechanisms | Present: fitted draw coordinates shared by artwork/motion. Attachments/replay checks cover all four rotations and ghosts. |
| 9 | Eight reference-aligned production groups without new consumption | Present: `CANON_GROUP_NAMES`, preserved stable IDs/BOM, source engine sheet. IE-4 remains the project designation. |
| 9 | Matching icons/parts/engine/certified/pallet/cargo/storage/workpieces | Present across three atlases, item renderer, storage and cargo. Progressive machine workpieces added in this review; `packet-visuals.cjs` checks real atlas pixels and recorded-cycle stages. |
| 9 | Element abbreviations only on bar artwork; ordinary names full | Present in material titles and item art. Full ordinary labels are retained; process identifiers are pictograms, not new abbreviations. |
| 10 | Pouring/heat/wire/winding/arms/welding/machining/press/coating/scanning | Present with expanded process-specific overlays in this review. Every process has visible work motion; no production animation when inactive. |
| 10 | Engine parts become engines | Corrected: the atlas now composes ingredients/intermediate/output at cycle stages, including eight-group kitting; not just a replacement final-engine icon. |
| 10 | WebP atlases retained and bundled | Present: machine/item/engine WebP plus generated source PNG/SVG/metadata/scripts, embedded by packager. |
| 10 | Storage actual type/fullness/capacity audit; empty/full; output waiting | Present: `storageProfile`, `storageCap`, `storageAudit`, `drawStorage` and replay output buffers. No visual rescaling changes stock. |
| 11 | Compact header, save/workforce/test ordering, location then buildings, campus first | Present in `index.html`/`refresh`; display checks. |
| 11 | Remove footprint/basis/shared-handling/blueprints/detail/source/cargo sidebar controls | Present: absent from ordinary UI. Detail dialogs and retained internal source metadata remain available as required. |
| 11 | Remove duplicate bottom calculation message | Corrected in this review. Progress overlay provides phase/progress/errors; status reports completion/failure. |
| 11 | Keep flow/production/manpower/ledger/collapsed diagnostics; purchased list naming | Present in DOM/renderers; one flow chip per line and `flowItemLabel` uses full name plus `(Purchased)`. |
| 11 | Former 70% becomes 100%; larger actors; scrolling and responsive drag | Present: `.7 × zoom / 100`, actor scale and viewport overlay; display/replay/drag tests. |
| 12 | B, two-stage palette, space tools, hover model details, ghost/R/Escape | Present: palette/control/display/attachment tests. No redundant Inspect/Move/Rotate palette controls. |
| 12 | 2–4 commercial alternatives plus VC; Spartan not factory default | Present: 2–3 non-retired commercial choices for each of 33 roles, plus VC; old Spartan/VC retained for import. |
| 12 | VC 6% above strongest commercial, longer lead, explicit material/labor bill, no external purchase | Present: catalogue/reconstruction tests; scheduling validates actual stock atomically and allocates once. Fabrication hours are planned obligations, not invented attendance. |
| 13 | Proposal/implemented/scheduled/completed, dates, before/after, quote versus actual | Present: implementation model/workflow and capital/browser tests. Old production remains effective before completion. |
| 13 | Complete workspace separate from read-only report, stable identities | Present: storage/migrations and `ION-change-report-1`; repeated exports compare equal and do not debit, report import rejects, scoped failures preserve state. |
| 13 | Detailed accepted resources/production/manpower/costs plus assets/staff/inventory | Present: accepted operating archive and `ion-export.js`; duplicated views explicitly say additionalPosting=false, ledger restarts get distinct series IDs. |
| 14 | Named modules/artifacts, standalone workers/assets and source ZIP | Present. Additional process-identity module included; current source, tests, handoff and generation sources are packaged. |
| 15–16 | Fresh tests/full day/matching replay, publish and verify remote downloads | Current review results are in `PACKET_AUDIT_VALIDATION_V4_2.json`. Earlier results remain historical in their original reports. Download checksums and branch tip are verified after publishing. |

## Limits that remain explicit

- The inaccessible original V4.2 source/artwork is not recovered. This is reconstructed behavior and artwork.
- Exact source machine dimensions, canonical engine specifications, vendor quotations and missing original documents are not supplied by the engine image. Adopted model values are not measured factory facts.
- Full pedestrian collision avoidance, vehicle turning/safety certification and interstellar logistics are outside the existing model. The carrier reservation audit does not establish those properties.
- An opening-WIP-assisted day and the three continuation results do not prove sustainable 247/day or 108,800/year overtime output. Reported forecasts remain distinct from accepted modeled days and actual ION implementation.
- Direct desktop file launch needs separate verification on the user's desktop; local standalone browser tests can establish that styles, artwork and worker code are embedded without external network requests.
- Visual process stages are illustrative, driven by recorded work. They are not a measured engineering assembly sequence or a change to recipes/yields.
