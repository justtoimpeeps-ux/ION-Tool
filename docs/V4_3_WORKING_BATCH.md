# V4.3 working batch — not packaged

There is sufficient scope for a consolidated V4.3 review: the broader site set, complete machine cycles, corrected separate-crew/on-duty payroll and marginal overtime, confirmed D/Delete editing, replay speeds and cleaned-up map identifiers. More feature requests are not required to justify the version number.

The user asked to batch small feedback instead of creating another downloadable edition for every comment. This working batch does **not** update `dist/`, package.json or release/version tags. The last delivered standalone remains the verified map-identifier-cleanup build at `aa559491a5c1e605586951f7baafa573c27fc8ca`.

## Interior furnishing pass

Previously, the presence of any machine or storage tile disabled all room fittings, leaving sparse labs and workshops unfinished. Their unused space now gets purpose-specific fittings. Small cabinets, benches, carts and control screens complement larger lab islands, reactor/tank banks, service rigs, empty rack banks and service cradles. Each room has varied fittings at sensible grid scale instead of repeated oversized stamps.

Station communications, medical, crew and galley modules now open as furnished interiors. They use the existing adopted floor dimensions and locked envelope. Medical beds, bunks/lockers, galley fixtures and consoles provide recognizable room functions. The station still has its original 85-person reference, four craft berths and fixed overall envelope. ION headquarters and other appropriate campus landmarks remain information-only.

The placement plan avoids equipment footprints and their service margin, all explicit paths, entrances and neighboring fittings. Empty rooms retain a door corridor and cross aisle. Deliberately cleared rooms (`keepWorksiteOpen`) stay clear. Fittings do not create owned productive assets, material stocks, additional payroll duties or simulated transport obstacles.

Plans are deterministic and weak-key cached by layout. At most 24 fittings are drawn per room, on the static floor layer; the operating-day worker does not load this renderer. Furnishing does not add work to the operating-day calculation.

## Working verification

- 106 core tests pass, including fitting bounds, overlap/entrance/path clearance, preserved saved data and intentionally cleared floors.
- All 15 sites and 192 real map clicks pass; productive rosters, finite Deep Vein day acceptance and save/reload still pass.
- Campus hover/keyboard behavior, machine cycles/controls/save compatibility and D/Delete/Undo pass.
- Default reference presentation now has 142 accessible interiors and 50 map landmarks; 54 support-only rooms have fittings, in addition to furnishings in sparse working rooms.

Review this batch before creating a V4.3 standalone/source ZIP. Current working browser tests include the newly furnished station quarters and therefore target source, not the older delivered standalone.
