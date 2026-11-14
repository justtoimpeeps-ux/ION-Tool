# All-sites review build

This build includes all 15supplied locations. The 12 new Spartan locations have operating interiors, finite material chains, source headcounts, independent ledgers and included maps. Their individual machine allocations and operating assumptions are deliberately visible for review.

## Open and inspect

1. Download `ION_Campus_Planner_v4_2_all_sites_review.html` and open it in your desktop browser.
2. Use Location to choose any site, then open highlighted areas.
3. Open Sites + → Review all 15 sites for the census and annual source figures; export its review inventory if useful.
4. Calculate a new site’s day, then Play or seek through the recorded work. Acceptance advances its own ledger once.
5. For instant examples, select Deep Vein or Spartan HQ and load the corresponding replay from `examples/review/`. Replays are read-only. The existing Orinda day-one replay still matches its original layout.

## Included sites

| Site | Modeled people | Areas | Placed equipment |
|---|---:|---:|---:|
| Orinda Campus | 3,250 | 13 | 934 |
| Valerion-Czerka Corellia | 260 | 15 | 173 |
| Spartan Orbital Testing and Logistics | 85 | 16 | 20 |
| West Basin Project | 120 | 11 | 28 |
| Outer Spur Mine | 120 | 11 | 38 |
| Keldon Ridge Mine | 110 | 11 | 34 |
| Redbank Mine | 115 | 12 | 31 |
| Deep Vein Complex | 120 | 12 | 43 |
| North Ridge Mine | 125 | 13 | 42 |
| Asteron Belt Mine | 140 | 13 | 50 |
| Talus Bulk Processing Terminal | 165 | 12 | 37 |
| Selonia Metals Recovery Works | 190 | 13 | 40 |
| Drall Dense-Media and Separation Works | 170 | 13 | 46 |
| Harrow Junction Central Processing Hub | 185 | 13 | 43 |
| Spartan Headquarters and Manufacturing Campus | 1,450 | 14 | 96 |

Total:15 sites,192 areas,6,605 modeled people and1,655 placed equipment. Orinda retains its934 registered assets and3,250 people. The VC 260-person roster is adopted; all 12 new Spartan personnel totals follow their references.

## First nine-hour cold-start checks

The figures below are simulated finished output and dispatch, not raw extraction or a claim to meet the annual references. Opening raw stocks are adopted and finite. All twelve site ledgers balance; every recorded carrier load remains within payload limits and its floor cart/loading network. Deep Vein lift trips are serialized.

| Site | Completed | Dispatched | Unit | Calculation seconds |
|---|---:|---:|---|---:|
| West Basin Project | 70.7 | 70.7 | t | 2.47 |
| Outer Spur Mine | 28.2 | 26.6 | t | 2.41 |
| Keldon Ridge Mine | 89.4 | 88.2 | t | 1.81 |
| Redbank Mine | 53.2 | 53.2 | t | 3.85 |
| Deep Vein Complex | 37.8 | 37.8 | t | 1.12 |
| North Ridge Mine | 48.9 | 48.1 | t | 2.41 |
| Asteron Belt Mine | 50.5 | 50.5 | t | 2.50 |
| Talus Bulk Processing Terminal | 80.5 | 79.1 | t | 3.25 |
| Selonia Metals Recovery Works | 32.3 | 31.6 | t | 4.33 |
| Drall Dense-Media and Separation Works | 67.2 | 63.3 | t | 3.82 |
| Harrow Junction Central Processing Hub | 58.2 | 57.4 | t | 3.80 |
| Spartan Headquarters and Manufacturing Campus | 125 | 122 | units | 10.42 |

Spartan HQ’s second carried day dispatched3 qualified equipment modules,16 drones,25 scanners and102 spare-parts kits, with1,450 paid people and no material error. It does not reset stocks or unfinished work.

## Main review decisions

- All new individual equipment allocations, role/skill splits, dimensions, two-day opening stocks, 365 operating days, nine-hour shifts and mineral recovery recipes are adopted review values.
- Mine annual extraction and processing capacity are reference figures, not achieved simulation results. Cold-start days are not sustainable throughput demonstrations.
- Finished ore feeds and concentrates are not refined metal. Mineral mass includes contained tailings and all reagent/water inputs.
- Asteroid paths represent protected module-transfer galleries. The shared Deep Vein shaft is reserved for one entire cargo trip at a time; its transport rates and loading abstraction are adopted.
- Listed mine/processor relationships are shown. Cross-site and cross-world shipment scheduling, allocation shares, freight costs and receiving automation are not implemented. Site ledgers remain independent.
- Reference conveyors between areas are abstracted by reserved cargo transfers in this review build. Within each floor, mixed belts and inserters remain available.
- Spartan HQ produces transportable equipment modules, drones, scanners and kits; final assembly of large self-propelled haul vehicles is outside the current carrier envelope.
- Current source and all three previous-site layouts are retained; older workspace upgrades do not relocate saved machinery.

Source PNGs, compact runtime maps, processing/ore sprites, generators, tests and the machine-readable review inventory are retained in the source package. Historical duplicate continuation traces are omitted from this review ZIP to keep it within hosting limits; they remain in the repository and prior release.

This is a review checkpoint on the recovery branch. Main remains unchanged.

## Campus navigation and interior audit

Campus hover now adds a translucent color tint and outline, preserving the underlying image. Administrative, accommodation and exterior landmarks show map information rather than an empty floor; ION HQ is one example. These landmarks are omitted from the interior tabs.

The 192 mapped areas now resolve to 138 interiors and 54 information-only landmarks. All openable reference interiors have operating equipment/storage or purpose-specific support fittings. Fifty support areas have fitted lab benches, workshops, utility systems, storage racks, control consoles or hangar bays. These fittings are visual support layouts, not extra productive equipment or employees. Existing saved machinery or storage always keeps its area accessible.
