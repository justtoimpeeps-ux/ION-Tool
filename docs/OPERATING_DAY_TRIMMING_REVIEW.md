# Operating-day trimming review — November 2026

The calculation still produces the same complete operating-day result. No recipe, transport rule, inventory limit, employee, building, drawing, animation frame, replay event, or scheduling resolution was removed.

## Changes

- Route timing and vehicle-footprint plans now stay cached for the lifetime of their route. The previous 256-route cache repeatedly discarded plans while the larger route cache was still using those routes. A weak-key cache allows discarded routes to be collected without a separate cleanup pass. Plans remain local to one calculation; edited geometry and subsequent days get fresh plans.
- Each reservation search resolves its cell and edge booking arrays once. Searches across multiple departure windows reuse those arrays. Their contents cannot change until the search returns, and the check order and half-open overlap rules stay identical.
- A frozen copy of the previous engine and exact-output tests protect the current feature set. A reproducible full-catalogue benchmark is included as `scripts/benchmark-optimization.cjs`.

## What costs time

The main cost is scheduling finite carriers through shared lanes while reserving their entire footprint and preventing head-on conflicts. The larger production and material catalogue increases the number of transport requests. Finite handoffs and early-loader waiting also create real scheduling work; both remain intact.

The day worker imports the numerical engine and scheduler, not the drawing code or image assets. Removing machine art or reducing animation frames would not address that scheduling cost. Graphics and replay continue to use the complete trace.

## Verification and timings

The full Orinda day used **12.35–14.83% less CPU time** than two baseline runs (479.59/493.56 seconds before; 420.37 seconds after). Its entire 53,778,124-byte JSON result is byte-identical: 247 certified, 194 dispatched, 7,327 trips and 25,335 events. Spartan HQ used **9.62% less CPU time** (12.67 to 11.46 seconds) with an identical full-result hash.

The baseline profile spent 55.63% of samples in lane exclusion checks and 21.45% building plans. Afterward, plan construction fell to 9.59% of samples; lane exclusion remains the largest cost.

Matched full-day measurements and trace hashes are recorded in `OPERATING_DAY_TRIMMING_RESULTS.json`. CPU time measures actual process work; wall time on the shared development machine is sensitive to other running tasks and is not a promised wait time on another computer.

All 97 core tests pass. The added modern traffic test compares 1,600 requests, including congestion, pickup waits, failure caches and pruning. Complete Deep Vein and Spartan HQ days compare every returned value, including all replay events and diagnostics, against the frozen engine. Browser checks cover all 106 process motions, reference-aligned progressive workpieces, cargo graphics, recipe selection, C-copy, save round trips and read-only replay playback. The packaged standalone passes the same flow and campus-interior checks.

To reproduce with the same catalogue and a nine-hour Orinda day, run these sequentially on an otherwise idle machine:

```sh
node scripts/benchmark-optimization.cjs --engine=tests/reference/day-engine-pre-trim.js --output=/tmp/ion-before
node scripts/benchmark-optimization.cjs --output=/tmp/ion-after
```

Compare the `sha256` fields in the two summary files. Each hash covers the entire unmodified JSON result. The compressed result files retain the full traces for inspection. Add `--site=spartan-hq` or another current site ID for a smaller benchmark.

The cache trades some retained route-plan memory for less recomputation. It does not persist between operating-day calculations. Timings vary with layout and congestion; this change does not make the nine-hour simulation instantaneous.
