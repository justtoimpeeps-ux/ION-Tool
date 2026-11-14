# ION Campus Planner V4.2

A reconstructed browser factory-design and operating-day planner for the IE-4 program. Recovered from the verified V4.1 package and rebuilt against the preserved V4.2 handoff. This is reconstruction, not recovery of the inaccessible original V4.2 workspace.

Downloads from the recovery branch: [standalone HTML](https://github.com/justtoimpeeps-ux/ION-Tool/raw/refs/heads/recovery/v4-2-reconstruction/dist/ION_Campus_Planner_v4_2.html), [complete source ZIP](https://github.com/justtoimpeeps-ux/ION-Tool/raw/refs/heads/recovery/v4-2-reconstruction/dist/ION_Campus_Planner_v4_2.zip), and [SHA-256 checksums](https://github.com/justtoimpeeps-ux/ION-Tool/raw/refs/heads/recovery/v4-2-reconstruction/dist/SHA256SUMS). Packaging verification is recorded in `docs/PACKAGING_VERIFICATION_V4_2.json`.

Open `dist/ION_Campus_Planner_v4_2.html` in a modern desktop browser, or unpack the complete source ZIP and run `npm start`. The standalone embeds artwork, styles and simulation workers and needs no server or external assets for normal desktop use. The development app has no runtime npm dependencies or credentials.

```sh
npm start
npm test
node tests/ui-v4.cjs http://127.0.0.1:8000
node tests/capital-browser.cjs http://127.0.0.1:8000
npm run package
node tests/ui-v4.cjs http://127.0.0.1:8000/dist/ION_Campus_Planner_v4_2.html
node tests/replay-v4.cjs http://127.0.0.1:8000/dist/ION_Campus_Planner_v4_2.html
```

Browser tests require Playwright and Chromium; the prepared cloud machine provides both. Packaging uses Python's standard library. To regenerate artwork, run `python3 scripts/generate_v4_2_art.py` then `node scripts/render_atlases.cjs`; the retained reference-derived PNG and source drawings are under `assets/source/`.

The campus starts with 934 fixed assets, 3,250 workers and six shared/upstream buildings. Tiers remain fixed at 1,235 / 1,235 / 618 / 146 / 16 people. Source recipes and the 247-engine combined A+B reference are preserved. Portrait/near-square floors are derived from equipment, storage and access; imported layouts remain intact. B opens the two-stage build palette, R rotates and Escape cancels. Use Proposal to edit, then schedule implementation. Old production applies until completion.

Calculate an operating day first, then replay. Complete recipes, finite inventory, buffers, physical payloads, paths, traffic reservations, pre-shift service, condition and paid manpower are modeled. Only acceptance posts the day once; replay, seeking, previews and report export do not. Existing skills do not progress automatically. Physical staffing/helper limits apply while legacy excess assignments remain preserved and paid. Cart lanes require complete unobstructed 2×2 blocks; narrow segments show red and reject carriers.

VC generation I designs have explicit fabrication bills, planned labor obligations and longer lead times. Scheduling allocates actual warehouse stock once. A shortage blocks scheduling, and completion does not debit the bill again. Legacy VC designs keep their historical capability and price as retired choices; they do not become new in-house projects. Quotes, cumulative spending, signed cash adjustments and inventory entries remain distinct. Retired manufacturing models remain importable.

**Save complete workspace** exports the resumable state. **Export ION change report** produces read-only `ION-change-report-1` reconciliation data with stable workspace/transaction IDs. Repeated export creates no postings. The report is not a replacement save and is rejected by workspace import. Accepted operating transactions preserve detailed production, material balances and manpower beyond the rolling display history.

The resupplied engine cutaway informs the eight part groups and coordinated machinery/workpieces, item icons, output piles, storage and repulsorlift cargo. Artwork fits its footprint without distortion. Process motion depends on recorded work and freezes on pause. Flexible input/output edges and attachment positions can be edited in tile actions or chosen directly on highlighted floor boundary squares, with Undo and Escape cancellation; recalculation redraws their routed connections. Placement ghosts preserve the same artwork proportions as installed machines.

The matching `examples/ION_Orinda_Day_1_replay.json` demonstrates the exact new starting layout. A fresh nine-hour day certified **244** engines and dispatched **194**, after approximately **6.78h** pre-shift preparation, with material-balance error below **10⁻⁹**. Continuation days certified 245 and then 196 without resetting stock or WIP; the decline exposes upstream/delivery/buffer constraints. Independent full-trip audits found no overlapping cell/edge reservations or double-booked vehicles on all three days. These runs do not demonstrate sustainable 247/day or the 108,800/year overtime requirement. Gross sales are not profit.

Read [release notes](docs/RELEASE_V4_2.md), [validation](docs/VALIDATION_V4_2.json), [source reconciliation](docs/REGISTER_RECONCILIATION.md), [continuation diagnosis](docs/CONTINUATION_V4_2.json), and the [reference/recipe revision packet](docs/handoff/ION_IE4_Canon_Revision_Packet.md). The full request and historical recovery audit remain under `docs/handoff/`. November source DOCX files and extracts are retained under `docs/sources/110926/`. V4.1 release documentation and original downloads remain historical recovery artifacts.
