# Orinda campus: source reconciliation

The user confirms that the current inefficient **A+B campus produces approximately 247 certified engines per normal nine-hour operating day**. This is an operating reference, not a target used to manufacture equipment counts. Factory C is non-producing.

Source: [uploaded consolidated register](sources/ION_Consolidated_Assets_Register.docx), with a [searchable text extraction](sources/ION_Consolidated_Assets_Register.txt). The filename describes a 2026-10-13 organization update; its internal header says Working V2, 12 October 2026, Day 0. Its own qualifications about unresolved engineering and stock data are recorded as source facts, not treated as instructions to the developer.

## Equipment: §7A

| Category | Registered A | Registered B | Campus |
| --- | ---: | ---: | ---: |
| Precision machining / mill-turn | 155 | 145 | 300 |
| Casting / forging / forming | 35 | 33 | 68 |
| Heat treatment / vacuum processing | 44 | 42 | 86 |
| Robotic assembly / integration | 88 | 84 | 172 |
| Test / calibration / acceptance | 42 | 40 | 82 |
| Finishing / cleaning / coating | 31 | 29 | 60 |
| Packaging / palletizing | 18 | 18 | 36 |
| Fabrication / toolroom / maintenance | 65 | 65 | 130 |
| **Fixed stations** | **478** | **456** | **934** |
| Mobile handling units (not additional stations) | 80 | 80 | 160 |

The earlier generated 404-station fleet is superseded. Asset ownership remains A/B even after physical relocation into shared buildings. Station counts do not infer output rates.

## Campus allocation: user clarification and image

The six editable floors are:

- Receiving: one central receiving/raw-material warehouse. The 20 input-material bins are modeled infrastructure, not additional production machines.
- Factory A and Factory B: upstream forming, heat processing, finishing and local toolroom/support work, retaining their registered near-half inventory split.
- Subassemblies: one shared building for the seven other assembly sets and complete eight-set kitting.
- Precision Machining: one shared hall containing all 300 registered machining centres, operating on the complete kit according to §12.
- Final Assembly & Test: one shared building containing final integration, calibration, certification, and modeled outbound packaging. The image's shipping yard is downstream campus context, not a duplicated production fleet.

Within the 172 assembly cells, seven subassembly processes, kitting and final integration have **provisional** task assignments whose sums equal 88 A and 84 B. Similarly, 82 test stands are provisionally divided into 39 calibration and 43 QA stands. The register does not resolve those assignments. The housing's specific forming → heat processing → finishing sequence is a provisional task assignment of registered equipment; the exact housing material recipe is sourced.

Buildings are measured after all assigned equipment, receiving bins, service gaps, port access and handling aisles are placed. Two metres per cell edge is fixed. Dimensions and resulting floor areas are estimates, not surveyed floorplans. Campus roads, yards, offices, utilities and Factory C are excluded from summed production-floor area.

## Exact input quantities: §§8C, 11

Every engine needs one of each of eight subassembly sets, simultaneously. Expanding those recipes gives:

| Feed | kg per engine |
| --- | ---: |
| Iron | 203 |
| Nickel | 118 |
| Cobalt | 10 |
| Chromium | 27 |
| Copper | 7.5 |
| Silver | 1.5 |
| Gold | 0.72 |
| Platinum-group metals | 0.28 |
| Superconductors | 59 |
| Technical ceramics | 75 |
| Tibanna | 16 |
| Electronics feedstock | 37 |
| Coolant | 28 |

Also required per engine: 12 field coils, 6 regulator modules, 18 seals, 4 processor modules, 8 interface couplers, 10 sensor modules and 2 safing modules. Their units are **each**, not kg. The thirteen mass feeds total 583 kg before the separately counted purchased modules. No material total is consumed again after the subassemblies are complete.

The prototype's generic fabricated plate input, one-unit iron input, and missing specialty materials are removed from this version's recipes. Revised blueprints use `ION-campus-2` and cannot silently reinterpret legacy recipes.

## Dependencies and throughput: §§10, 12–14

Qualified refined feed and purchased components enter receiving → upstream housing processing and subassembly fabrication → all eight sets released as a complete kit → precision machining/integration → final assembly → calibration → QA/certification → packaging/dispatch.

Mining, extraction and sequential refining remain external upstream references, not invented extra machines or immediately available inventories on the Orinda campus.

| Candidate stage (A+B) | Source engines/year |
| --- | ---: |
| Receiving/kits | 112,000 |
| Casting/forming | 105,000 |
| Machining | 96,000 |
| Subassembly builds | 100,000 |
| Final integration | 94,000 |
| Calibration / functional testing | 92,000 |
| QA / certification | 90,000 |
| Packaging / dispatch | 110,000 |

The register explicitly calls these a **candidate constrained model**, not validated work-centre cycle measurements. QA's 90k cap closes its existing sustainable baseline. For this version, candidate station rates divide those annual stage caps over assigned A+B equipment at a reference level-2 crew and 95% condition. The conversion uses 365 nine-hour operating days as a stated provisional calendar, matching roughly 247/day; individual employee schedules and the actual annual calendar remain unresolved. Heat/finish candidate rates reuse the casting-stage reference because no separate verified caps exist. They are not independently measured extra source capacities.

Actual worker levels, condition, equipment upgrades, incomplete recipes, finite buffers and physical handling routes affect the separate candidate forecast. **The forecast is not overwritten with 247**, nor does a low forecast revise the user's current operating fact. An unexplained mismatch identifies calibration/model work still needed. The baseline cold-start day is about 144.0 engines with empty machine buffers; its next modeled days stabilize at 245.6/day. The default forecast therefore uses two synthetic warm-up days and reports only the next nine-hour day. This simulates a warmed process rather than inventing the real distribution of the ~750 WIP. Warm-up does not advance campaign time or alter any real inventory ledger. The UI warns when the last two modeled daily outputs have not stabilized. The existing candidate bottleneck ladder is QA → calibration → integration → machining, followed by unresolved specialty feed and logistics constraints.

## Workforce and inventory: §4A and §§8C, 12

A operations: 1,500 (machining 550; assembly 420; handling 210; shift support 320). B operations: 1,450 (530; 405; 205; 310). ION's testing/QA/safety group of 300 is shared, not copied into every building. Model worker assignments and skill distributions are provisional, not a verified roster; a staffing adjustment does not create real hires or silently move company headcount.

Zero finished certified engines are confirmed at the opening reference. Roughly 750 WIP cores are campus-wide with unresolved stage counts. Raw and subassembly stock counts are unresolved. Consequently, this scenario begins with empty machine buffers and explicit planned stock settings; it does **not** turn the 750 WIP into usable finished kits or cores. Defaults for inbound deliveries cover 247 engines/day plus 10%, and are editable assumptions rather than an assertion about inventory or contracts.

## Transport, upgrades, and planning economics

Belts carry 280, carts 145 and walking routes 22 modeled cargo-volume units per normal nine-hour day. Pathfinding prefers efficient handling when a modest detour beats walking. Volume conversions and handling rates are planning assumptions. Incoming feeds visibly travel from receiving access points into bins, then through local output access and destination input access to workstations. No interbuilding transfer bypasses disconnected local access. Off-floor freight is represented as a shared building-pair handoff with a separately editable volume cap.

Refit restores seven condition points. Precision tooling / quick-change fixtures add a candidate 15% speed at 12% of equipment purchase estimate and four installation days. Robotic loading/inspection assist adds 25% speed, reduces required operators by one (minimum one), costs 40% of the equipment estimate and takes eight days. These are real-world industrial analogues with **provisional quotes and performance**, not Star Wars lore claims or sourced supplier offers. Applying them changes a proposed finished layout; construction downtime is reported in the sequential work ledger, not simulated inside the normal production day. Overtime wage estimates use an explicit 25 Cr/hour, 1.5× assumption, separate from capital costs.

## Preservation

The original HTML remains at `/workspace/ion-reference/index.html`. The pre-register planner is archived at `/workspace/ion-reference/planner-before-register.tar.gz`. Its browser key `ion-factory-plan` is never overwritten; a download button appears when that older plan exists. The new campus saves independently under `ion-campus-2`.

Scoped blueprints include cost/time quotes attributable to their building or fully contained work area. Import previews those quotes and merges distinct work IDs; repeated imports do not charge the same quoted job twice. Independent, differently identified proposals can overlap and should be reviewed by planners.

## Interactive controls update

Save, scope selection, export/import and Workforce are on the top bar. Inspect mode supports direct dragging of equipment, storage and explicit transport tiles; drive lanes are empty space for equipment placement and are removed beneath a moved footprint. All otherwise unoccupied floor is walkable by default. Building access squares remain fixed.

Material routes use separated colour lanes with duplicate per-material edges combined. Each station tile shows its type/number, current/candidate-nameplate output and every input’s per-cycle quantity plus delivered/required quantity per selected day. Daily need is at candidate nameplate, not a claim that those deliveries occurred. Input and output colours are on the station edges; flexible stations show both on every edge.

The new baseline uses varied editable staffing requirements by equipment type, rather than assuming two operators everywhere. The planning roster has 1,203 assigned and 2,047 unassigned people within the 3,250 source headcount (A+B operations plus shared QA/safety). Unassigned in this model does not mean those staff are genuinely idle: handling, shift support and safety roles still have other duties. T0–T5 skill distribution is an explicit assumption (5%, 30%, 35%, 22%, 6%, 2%, mean tier 2), not a register census. Required staffing and worker skills can be edited as scenario/roster corrections without implying training or elapsed campaign time. Assigning and releasing workers transfers existing identities to/from compatible-role pools; it does not create new employees. Undo, campus saves and scoped imports retain roster state.
