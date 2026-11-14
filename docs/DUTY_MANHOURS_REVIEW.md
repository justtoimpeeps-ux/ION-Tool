# On-duty man-hours and visible payroll arithmetic

The user confirmed a nine-hour production setting and requested that unassigned workers be excluded unless they have a modeled duty.

New calculations now pay:

- Assigned station crews for their production shift, including assigned workers waiting for material.
- Unassigned handling staff only when they have a real production-phase trip. Merely reserving an unused vehicle slot does not generate nine hours of pay.
- A separate prep crew for its actual prep duty spans, as established in `PAYROLL_CREWS_REVIEW.md`.

Unused roster members remain hired and available in the workforce; they are not removed or silently reassigned. They have no paid hours under the new default. Reference personnel counts and `rosterPeople` remain distinct from `paidPeople`. The paid-standby option remains available as an explicit opt-in. Legacy settings without the new policy marker use the requested on-duty default, even if they carried the previous default `payUnassigned: 1`. Saving a deliberate new standby choice preserves it.

The daily manpower panel now follows the selected Proposal/Implemented view. Previously it always preferred an implemented estimate, which could hide the result just calculated for a proposal. It shows production headcount × production shift hours, separate prep logistics and maintenance hours, their sum, and excluded/standby counts. Legacy cached totals without a breakdown are labeled as recorded estimates, rather than presented as a newly calculated on-duty result. Historical accepted costs remain unchanged.

The hours input is now labeled **Production shift hours (prep excluded)**. A value of 9 means nine production hours; prep is determined separately and is never multiplied across the entire roster. Initial reference and aggregate reports show only the assigned-station base until logistics/prep have actually been calculated.

## Evidence

A browser regression uses a real simulation with a 2,000-person roster, one assigned production worker, one separate prep maintenance worker, and all remaining staff unassigned. It produces nine production man-hours plus approximately five prep man-hours, not 28,000. It also verifies legacy default migration, retained explicit standby opt-in, separate saved panel estimates by view and valid workspace exports.

As a historical reference, the retained Orinda day-one trace reported 31,182.96 paid man-hours, including all 3,250 roster members for nine hours. Applying the new on-duty rule to that unchanged physical trace gives 1,151 assigned station staff plus 282 active production drivers: 1,433 × 9 = 12,897 production man-hours, plus 1,932.96 prep man-hours, or 14,829.96 total. This is an illustration from the retained trace, not a claim about the user's edited workspace.

Dedicated tests verify that unused staff remain in the roster without receiving payroll, prep-only technicians are not also charged a full production shift, and production driver payroll matches actual production duties. Existing physical-result equivalence tests continue to compare every non-payroll field and event, normalizing only authorized payroll/identity changes and the new standby default.
