# Recovery audit and development environment

This checkout is recovered V4.1, not recovered or reconstructed V4.2. The complete user request is preserved in `V4_2_RECONSTRUCTION_REQUEST.txt`. Historical results in that request are not current validation results.

## Verified recovery

- Recovery branch: `planner-v4-1-downloads`, commit `0f9ba7271dfce9bf7cc09d8c1662d3615629e6bf`.
- Original ZIP SHA-256: `993b7b296a700b0392e878eabfadd7a3cd92e3737498f44232db933ee296969f`.
- Original standalone HTML SHA-256: `595fb32857d7bfb34ada4599d75a5f0f180efc72a68324e058feaf416bf166de`.
- Both hashes matched before extracting the package. Complete source, source documents, fixtures, scripts and replay were present.
- Remote source checkpoint: `d30daa58d9824e4295760a212b257f486982ffb1`, branch `recovery/v4-2-reconstruction`; push and remote SHA verified. Main was not changed.
- Original inaccessible environment was not accessed or modified.

## Workflow

Use the existing `/workspace/ION-Tool` checkout. Cloud tasks are isolated already; do not create a worktree unless requested. The application needs Python 3 to serve development files and Node to run the existing tests. It has no runtime npm dependencies, database, credentials, or required external services. This instance provides Python 3.12.14, Node 24.22.1, Playwright 1.62.1, and `/usr/bin/chromium`.

From `/workspace/ION-Tool`, run `npm start` in a retained terminal session. It serves port 8000. Verify readiness with an HTTP request for `index.html`, then run `node tests/ui-v4.cjs http://127.0.0.1:8000`. An open port alone is insufficient. Do not expose localhost preview links during onboarding. Processes must be restarted after snapshot restoration.

Core check: `npm test`. Browser checks: `tests/ui-v4.cjs`, `tests/display-v4-1.cjs`, `tests/compat-v4-1.cjs`, and `tests/replay-v4.cjs`, each accepting a local base URL. `ui-v4.cjs` also tests the standalone HTML and asserts it makes no additional HTTP requests.

No dependency installation or tool activation was needed in this instance. Existing injected GitHub HTTPS authentication supports reads and the explicitly authorized recovery-branch push. No secrets or extra network domains were requested.

## Preserve originals when packaging

`npm run package` writes `dist/ION_Campus_Planner_v4_1.html` and `.zip`; those original recovery files are tracked even though `dist/` is ignored. Build in an isolated staging directory for setup validation. Copy `index.html`, `styles.css`, `README.md`, `package.json`, `.gitignore`, and directories `js`, `docs`, `tests`, `scripts`, `examples` to a fresh directory under `/workspace`; execute `python3 scripts/package.py` there. This procedure was exercised successfully. The generated standalone matches the original HTML hash, and the generated ZIP passes CRC validation. ZIP byte identity is not expected because entry timestamps and included documentation can differ. Original tracked downloads were preserved.

## V4.2 implementation checklist

| Requirement | Restored V4.1 evidence / remaining work |
| --- | --- |
| Source facts and recipes | Present: November DOCX and extracted text in `docs/sources/110926/`; reconciliation documentation and recipe tests. Preserve quantities. |
| Assets and people | Verified 934 assets and 3,250 people; tiers 1,235 / 1,235 / 618 / 146 / 16. Fixed skills and existing roster assignments are present. |
| Campus/layout | Present: six shared/upstream buildings, explicit compaction proposal with Undo, preserved legacy layouts. V4.2 portrait packing remains to reconstruct. Fresh V4.1 dimensions: Receiving 64×107; A 75×52; B 70×52; Subassemblies 58×35; Precision 80×67; Final 59×48. |
| Finite operating day | Present and tested: complete recipes, bounded buffers, payloads, reservations, pre-shift service, carry-forward, one-time acceptance, nonposting replay and seek. Full current-instance benchmark is recorded separately when complete. |
| Wear and payroll | Present: default wear .002 per nine busy hours, finite maintenance kits, qualified personnel, separate pre-shift payroll, fixed tiers, 29,250 base paid hours for full roster. |
| Operator limits/helpers | Partial: required staffing varies, assignment UI stops at required count. `staffingRequired` accepts arbitrary 1–20 and calculation averages every assigned person's skill; physical caps, helper benefit and preserved excess-roster warnings remain to implement. |
| Cart roads | Partial: implicit walk floor and cart paint separate from equipment occupancy; physical traffic reservations exist. No complete-2×2 validity classification/red narrow-lane highlighting in recovered geometry. Reconstruct and test without breaking walking access. |
| Material flow | Present: separate lanes, endpoint arrows, hover details, ports, flexible input/output edge selection and reserve indicators. Exact attachment-point editing/freehand routing is absent. |
| Status and animation | Present: work-driven four-frame SVG process illustrations, steady status semantics, worker arrivals/departures, storage fullness, output pickup markers. V4.2 WebP atlases and coordinated overlays absent. |
| Aspect-preserving sprites | Missing: `drawEquipmentArt` draws into independent width/height; implement contain-fit and align process motion. |
| Canon engine groups | Missing: old material names remain. Apply the handoff's eight-group mapping consistently without changing recipe quantities or inventory identities. Original cutaway upload is absent. |
| Speeder/cargo/roads | Missing V4.2 visual treatment: recovered vehicle definitions are tow tractor/forklift and old artwork. Keep physical payloads and traffic when reconstructing speeders, cargo, markings and gridlines. |
| Header/sidebar/zoom | Partial: progress overlay, compact scenario controls, flow list, palette, hover and detail dialog present. Move save/workforce before Test, move manpower above right dashboard, remove cargo sidebar, normalize 70% to new 100%. |
| Build catalogue | Partial: two-stage palette, commercial/model choices, ghost, rotation, Escape, Undo. Spartan offered on manufacturing; VC uses cash price and speed >6% above best commercial. Reconstruct eligibility, material fabrication bill, longer lead time, allocation-once accounting. |
| Dated implementation | Present and browser-tested: proposal/implemented separation, schedule, quote/spending distinction, old output before completion, new output afterward, calendar advance without operating postings. |
| Saves and reconciliation | Partial: complete workspace, legacy import and combined `ION-implementation-1` report exist. Separate read-only `ION-change-report-1`, persistent workspace identity, stable transaction IDs, signed adjustments and material allocations remain to implement and test. |
| V4.2 modules | `capital.js`, `ion-export.js`, `sprite-assets.js`, `process-motion.js`, `floor-art.js` absent. Preserve compatible existing modules where possible. |
| V4.2 artwork | Lost `assets/machine-atlas.webp`, `item-atlas.webp`, `ion-engine-atlas.webp` absent from recovery ZIP. Regeneration is reconstruction, not recovery. |
| Release and downloads | Original V4.1 HTML/ZIP verified. No V4.2 release delivered; full source/assets, matching replay, standalone, ZIP and validation remain release requirements. |

## Validation scope

Current-instance core tests: 50 passed, zero failed/skipped. Source browser suites for physical fixture/day acceptance/carry/import, display, and legacy compatibility passed. Standalone physical fixture suite passed with no extra HTTP dependencies. Historical recorded full-campus replay passed with 246 certified, 194 dispatched, 7,461 trips, maximum balance error 1.1641532182693481e-9, approximately 52.9 FPS while a fresh calculation ran concurrently; final balances, departures, scrolling and nonposting were checked. This replay result is distinct from a newly calculated day.

The fresh full-campus result and final onboarding evidence are in `ENVIRONMENT_VALIDATION.json`. Future release validation must rerun affected tests against the reconstructed source, package and exact release layout. None of these V4.1 results establishes V4.2 behavior or sustainable/overtime throughput.
