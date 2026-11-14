# Current V4.2 matching replay

`ION_Orinda_Day_1_replay.json` was generated from the exact reconstructed V4.2 starting layout and a fresh full-campus physical simulation: 244 certified, 194 dispatched, 7,338 trips, 6.7825 hours pre-shift plus nine production hours. Load it at Orinda in a fresh V4.2 workspace. It is read-only and cannot be accepted as a new operating day.

The original V4.1 replay remains recoverable from commit `87676c2` and the verified V4.1 complete source ZIP. Its layout differs and must not be loaded as the V4.2 baseline.

To regenerate after relevant changes, run `node scripts/benchmark-day.cjs --compact --output=/workspace/ion-v42-day.json`, validate the result, then `node scripts/write_release_replay.cjs /workspace/ion-v42-day.json`. Do not reuse a replay for a different release layout.

`continuation/ION_Orinda_Day_2_replay.json` and `continuation/ION_Orinda_Day_3_replay.json` carry the preceding final state directly. They certify 245 and 196 engines respectively and demonstrate that the day-one result does not establish steady throughput. These artifacts are read-only validation previews and are not accepted/postable operating entries. All three replay files pass schema checks against the exact release layout.

Replay files use the existing `ION-gzip-1` portable JSON wrapper. The app decompresses them directly. The day-one download is approximately 3.3 MiB instead of roughly 48 MiB of raw trace JSON; quantities and events are unchanged.
