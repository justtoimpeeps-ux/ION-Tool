> On-duty policy update: unassigned staff are excluded by default; see `DUTY_MANHOURS_REVIEW.md` for active-driver rules, legacy setting handling and the visible headcount/hour breakdown.

# Separate prep crews and marginal overtime

New operating-day calculations use two distinct crews. Prep logistics and maintenance employees have separate `pre-shift:` identities, replay actors and payroll rows. Production employees retain their saved roster and production shift. Prep duties do not extend a production employee's day.

Each person's payroll is calculated as:

`hourly wage × (min(hours, 9) + max(hours − 9, 0) × 1.5)`

The existing configurable overtime multiplier defaults to 1.5. It applies only to hours beyond nine in that worker's own shift. The previous blanket overtime premium on all prep hours has been removed.

At 25 Cr/hour, six prep hours cost 150 Cr; a different worker's nine-hour production shift costs 225 Cr. The combined 375 Cr contains no overtime. A 12-hour production shift costs `(9 + 3 × 1.5) × 25 = 337.5 Cr`. Prep exceeding nine hours uses the same marginal rule independently.

Prep staffing and qualifications follow the modeled staging/service assignments as an explicit planning assumption. They are additional prep workers, rather than a second charge for overtime against the same production staff. Prep paid time remains the recorded duty span from first assignment to the production handover; staggered technician arrival is preserved. The production roster, reference headcounts, transport capacity, actual routes, delivery times, quantities and machine output are retained. Payroll exports show crew, worker ID, hours, regular/overtime split, wage and cost. The ledger shows production and additional prep headcounts separately.

New costs flow into preview, acceptance, cumulative costs and exported reports. Previously accepted days and imported legacy replays keep their recorded costs and identities; replay does not retroactively post revised payroll. Calculate a new day/proposal to use the corrected policy.

Regression comparisons retain every physical result while explicitly allowing the authorized payroll/cost and prep-identity changes. Dedicated tests cover 4/6/9/10/12-hour wages, separate 6+9-hour crews, real prep shifts over nine, 12-hour production, cost/hour reconciliation, crew identities and replay validation. Source and packaged-browser checks verify the ledger and accept/save/reload flow.
