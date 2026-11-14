# Matching expanded V4.2 replay

Open the delivered HTML, leave Orinda selected, choose **Load replay**, select `ION_Orinda_Day_1_replay.json`, then **Play**. Open any building to watch its machines, handlers and cargo. No recalculation is needed. Replay and seeking never post inventory or advance a day.

This file matches the fresh 13-area Orinda reference layout: 247 certified, 194 dispatched, 7,327 trips, 6.0831 hours preparation plus nine production hours. It is a finite opening-WIP scenario, not evidence of sustainable output.

`archive/` retains the prior release's day-one and continuation traces with their own embedded layouts. The copies in `continuation/` are historical e509a3f-layout examples; they do not match the expanded fresh layout and must not be loaded into it. Their earlier results are not current release measurements.

Regenerate with `node scripts/benchmark-day.cjs --fresh --output=work/day.json`, audit that result, then `node scripts/write_release_replay.cjs work/day.json`. Portable replay JSON uses the app's existing lossless gzip wrapper.
