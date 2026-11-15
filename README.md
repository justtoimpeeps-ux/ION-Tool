# ION Campus Planner V4.3 — downloadable review

Open `dist/ION_Campus_Planner_v4_3.html` in a desktop browser. It is self-contained and includes all 15 sites, furnished interiors, animated machinery, equipment inventory/orders, parallel installation estimates and autonomous Spartan cargo drones.

Downloads: [standalone HTML](https://github.com/justtoimpeeps-ux/ION-Tool/raw/refs/heads/recovery/v4-2-reconstruction/dist/ION_Campus_Planner_v4_3.html) · [source ZIP and standalone](https://github.com/justtoimpeeps-ux/ION-Tool/raw/refs/heads/recovery/v4-2-reconstruction/dist/ION_Campus_Planner_v4_3.zip). Download the HTML, then open the saved file; GitHub's source preview does not run the application.

See [V4.3 review notes](docs/RELEASE_V4_3.md) for what to try. Build with `npm run package`; source has no runtime dependencies. The ZIP retains current source, artwork, tests, documentation and current replay examples; historical duplicate archive/continuation traces remain in the repository. Earlier downloads remain available and unchanged. Main is unchanged.

# All-sites review build

Use `dist/ION_Campus_Planner_v4_2_all_sites_review.html` for the complete15-site review. It includes seven mines, four processing plants and Spartan HQ/manufacturing in addition to the three earlier sites. Open **Sites + → Review all 15 sites**. See [review guide](docs/ALL_SITES_REVIEW.md) for reference facts, adopted allocations, measured site-day checks and limitations.

Build the review package with `python3 scripts/package.py --review`. It preserves the previous standalone artifacts and excludes duplicate historical continuation traces from the review ZIP.

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

The expanded build includes Orinda, Valerion-Czerka Corellia and the fixed-envelope Spartan orbital testing/logistics station. Orinda retains 934 fixed assets and 3,250 people. New-site recipes, rosters and interior estimates are identified separately from confirmed reference facts.

To watch immediately, open the HTML, select Orinda, choose **Load replay**, select `examples/ION_Orinda_Day_1_replay.json`, then **Play**. Open a building to see machinery and cargo. Replay does not advance balances. For edits choose **Proposal**; **B** opens the two-stage palette, **C** copies a selected type/settings, **R** rotates and **Esc** cancels.

The current full nine-hour Orinda scenario certified 247 and dispatched 194, with 7,327 physical deliveries and exact material conservation within floating-point tolerance. Its approximately 433-second calculation is separate from smooth replay; opening WIP means this is not a sustainable-output demonstration.

See [release notes](docs/RELEASE_V4_2.md) for loading zones, realistic stored materials, configurable CNC programs, finite mixed belts/inserters, hand-cart transfers, early calls, station constraints, map-reference upload, measured performance and remaining assumptions. All three reference maps are now included as close illustrated reconstructions with 44 clickable building/module highlights. Uploading an original image is optional.

Save the complete workspace to resume. Change reports and replays are read-only artifacts. `main` and retained V4.1 deliverables remain unchanged.
