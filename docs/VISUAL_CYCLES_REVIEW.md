> Later payroll correction: see `PAYROLL_CREWS_REVIEW.md`. Historical timing/visual evidence below describes its delivered checkpoint. New crew identities and wage totals intentionally differ; physical production, routing and all graphics remain covered by regression checks.

# Machine cycles, cargo and map review

The machine floor renderer now draws complete shaded mechanisms instead of animating lines over static reference photographs. Catalogue/reference art is retained. Working cells use repeating 30-fps mechanisms: ladle tilt and a pouring stream, mold filling and cooling, furnace temperature cycles, turning spools and increasing wire packs, moving spindles and presses, articulated assembly arms, crusher teeth, vibrating screens, grinding drums, tank agitation, filtration and hoists. Excavators have tracks, a moving boom, cutting teeth and falling ore. Enclosed equipment keeps a function badge; physical equipment design marks remain visible.

Kitting has eight open compartments, one per input. Replay contents follow the actual input inventory and recorded work state, including waiting before all parts arrive. Rendering never advances inventory or production. Pause freezes the mechanism clock. The campus **Machine cycles** button opens a read-only preview so the user can inspect cycles without calculating a day. Its kitting example is explicitly an arrival-order preview.

Cargo uses one large, naturally proportioned icon across every material, regardless of the item's physical envelope. It stays upright on turning speeders and walking handcarts. Campus carriers now show the actual matching item image too. Quantities, dimensions, payloads and all traffic rules are unchanged.

Included maps crop out the right-hand information panels and surrounding title/footer furniture. Original source images and optional uploaded images are retained. Highlight mapping now matches numbered areas by number, fixing Orinda's out-of-order source regions. Individually revised hit areas replace the generic small boxes across the twelve newer sites. All 192 real map clicks pass. Open excavation/cutting/drilling areas render as terrain, with no building/module shell; their existing machinery, workforce, paths, stocks and dimensions are preserved. Actual workshops, processing buildings and enclosed asteroid modules retain their interiors.

## Load and verification

The richer mechanisms add replay drawing work; they do not add work to the operating-day worker. The numerical engine is byte-identical to the delivered performance-trim build. Shared 288×192 plates update at 30 fps, reuse their canvases, and retain at most 64 plates (13.5 MiB of raw RGBA pixels). Only visible equipment is drawn during replay. Higher zoom, more distinct visible machine types and slower graphics hardware can increase replay cost; rendering does not change simulated throughput.

97 core tests pass. Browser checks cover every process moving, frozen pause, inventory-driven kit compartments, every material icon at four cart headings, cropped maps, numbered highlight alignment, unchanged saved ledgers, programmed-machine copy/recipes, old replay compatibility, save round trips and all 192 mapped areas. The same checks run against the packaged standalone, with ZIP CRC/source matching and a reproducible HTML rebuild.
