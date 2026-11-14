# Confirmed tile removal

In Proposal/edit mode, select a machine, storage area or transport square and press **D** or **Delete**. A native confirmation names the target and asks whether to replace its footprint with walk path. Cancel leaves the layout, workers, expenses and undo history unchanged.

Confirming removes the selected object, restores walk squares across its footprint, returns a machine's assigned workers to the unassigned roster, clears stale selection/replay graphics and uses the existing estimated removal cost/installation workflow. Undo restores the layout and assignments. A reference worksite deliberately cleared by the user remains open and buildable even after its last machine is removed. Implemented stock/operating ledgers are not edited by a proposal deletion; existing implementation stock-transfer rules remain in force.

The standard eraser uses the same confirmed removal for equipment, storage and ordinary paths. Its existing loading-zone editing behavior remains separate. Fixed building access is protected. Shortcuts are ignored in input fields, open dialogs, active drags, repeat key events and read-only Implemented view. Selection is cleared on navigation/undo to prevent an old path selection from being removed later.

Browser verification covers both keys, cancellation, machines, storage, cart paths, footprint-to-walk conversion, retained workers and implemented stock, undo, fixed-access protection, typing/modal/repeat guards, and valid workspace saves. This change does not alter operating-day calculations or animation assets.
