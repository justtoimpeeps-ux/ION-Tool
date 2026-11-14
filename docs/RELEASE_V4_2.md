# V4.2 expanded recovery build

Continue on `recovery/v4-2-reconstruction`; `main` remains unchanged. The source engine bill of materials and Orinda census remain 934 fixed assets and 3,250 people. Reference facts, adopted planning values, forecasts and accepted operating records remain distinct.

## Watch and edit

Open the standalone HTML in a desktop browser. At Orinda choose **Load replay**, select `examples/ION_Orinda_Day_1_replay.json`, then **Play**. Opening a building shows its working machines, cargo and workers. Seeking and replay never post balances. Calculate a day to test another configuration; **Accept closing balances** advances once. A full Orinda calculation takes several minutes.

Choose **Proposal** to build. **B** opens larger two-column equipment types; choosing a type opens its design choices. CNC machines have selectable functions/recipes. **C** copies a selected equipment or path type and settings into placement without copying employees, inventory or history. **R**, click-drag and **Esc** retain their existing edit-mode behavior. Descriptions and output figures are in tile actions/hover; floor artwork fills more of each footprint and keeps its natural proportions. Operating processes animate; pausing freezes motion. Equipment designs share a family body with extensible stripes, generation marks and finish accents.

## Materials and transport

Realistic resource sprites appear in discrete open chests, vats, trays and assembly piles. Stock depletion removes actual handling groups; tooltips retain exact quantities and explain display grouping. Loading zones reserve one square from receiving storage, serve that store, and extend only through connected squares. Capacity excludes their area. Existing imports retain their stock and layouts.

Speeders use valid cart lanes and loading zones. Off-road transfers require finite hand-cart trips using existing handlers; whole items that exceed hand capacity require cart access or an inserter. Larger vehicles and loaded beds distinguish carried cargo. Shared adopted envelopes, mass, volume and stacking limits constrain carts, belts and storage. Engine-sized items occupy much more space than small components.

Belts accept connected mixed materials without a cargo filter. Each square has four finite reserved slots; cargo occupies slots according to its physical size and mass. One-square autonomous inserters transfer at connected interfaces, including cart handoffs. They reserve real work time and do not invent operators. Optional early-loader calls are set per tile as completion percentages; 100% is the unchanged default. Reservations may wait for completion, but never collect unfinished output. The routed-cargo and separate-material-lane controls remain available. Specific ports use triangles and routed arrows stop outside the equipment footprint.

## Reference locations

Fresh workspaces have Orinda's 13 reference areas, Corellia's 15 engineering-campus areas and the station's 16 modules. Existing workspaces gain missing reference locations without relocating saved Orinda machinery. Fresh Orinda plans place packaging in Shipping and toolroom support in Maintenance; Factory C remains unbuilt.

Corellia has 173 fixed process assets from the equipment rows, separate portable inventory, independent machinery/robotics recipes and an explicitly adopted 260-person planning roster. Header totals in the supplied collage differ from its row totals; they have not replaced the original ION register.

The station keeps its reference **220 m overall length, 140 m height, 85 personnel and four small-craft berths**. Height is not floor depth. Equipment fits bounded, nonexpandable module interiors. Assay, microgravity testing, machining, drone service and cargo handling produce their own outputs; command, medical, accommodation, commons, power and other support areas remain separate. Corridor/deck distances, individual interior dimensions, fleet allocation, stock, role splits and new operating recipes/rates are adopted estimates. External ship flight and interstellar transport are outside this model.

Maps have normalized clickable building/module regions. **Sites → reference image** accepts the original PNG/JPG/WebP, preserves its proportions and saves it in the workspace. Original inline map images are not available as downloadable source files in this workspace; the shipped view therefore remains an explicitly labeled reference-aligned schematic until those originals are added. It is not a pixel-identical recreated background. The transport replay map remains available separately.

## Verification and performance

85 core tests pass, along with source and standalone browser checks for the expanded controls, all 48 moving process types, natural art proportions, CNC copying, compressed saves, old-workspace retention, attachment controls, legacy inventory migration and replay without postings.

A fresh nine-hour Orinda day certified **247**, dispatched **194**, recorded **7,327** trips and needed **6.0831 h** preparation. Maximum material-balance error was **6.99×10⁻¹⁰**. All 7,327 carrier trips passed road-access and independent cell/edge/vehicle reservation audits. This day draws on opening WIP; it does not demonstrate sustainable annual output. Historical continuation results belong to their archived layouts.

The full run took **433.24 seconds** in this environment. A prior short CPU sample put about 80% of sampled execution in traffic reservation/search work; it is not a whole-run timing breakdown. New sites calculate separately: the station's small adopted scenario took about 0.28 s and Corellia's cold-start scenario about 23.13 s. A matched small-fixture early-call benchmark had median 4.85 ms off versus 5.32 ms at 20%, with four real precalls and the same completed units. Those fixture measurements are not campus-wide overhead estimates. Dense traffic and additional routes can materially increase calculation time; artwork is drawn during playback, separately from day simulation.

Conservative dispatch, adopted packing dimensions, approximate site interiors and incomplete pedestrian collision modeling remain limitations. Save/export retains the full workspace. ION change reports are read-only reconciliation artifacts, not resumable workspaces.
