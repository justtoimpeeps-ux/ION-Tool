/* Presentation policy only: never adds production, inventory, people or floor geometry. */
const FacilityInteriors=(()=>{
 function profile(name,b={}){const label=(b.referenceLabel||name.split(' / ').at(-1))+' '+(b.facilityRole||'');if(b.unbuilt||/expansion/i.test(label))return null;
  if(/headquarters|\bhq\b|admin|crew|quarters|habitat|commons|galley|medical|security|gatehouse|checkpoint|parking|courtyard|plaza|landing pad|shuttle pad|training|fleet operations|contractor offices|employee operations|internal logistics yard|vehicle yard|sensor mast|sensor beacon|communications and sensors|drill pad|drill tower|haul road|haul route|anchor truss/i.test(label))return null;
  if(/assay|laborator|\blab\b|labs|research|r&d|metallurgy/i.test(label))return 'laboratory';
  if(/maintenance|repair|toolroom|workshop|fabrication|field installation|depot|prototype/i.test(label))return 'workshop';
  if(/power|utilit|thermal|fuel|water|reagent|tank farm/i.test(label))return 'utilities';
  if(/hangar|berth|drone rack|drone bay|docking/i.test(label))return 'hangar';
  if(/command|operations center|flight.*control|drone control|engineering|controls/i.test(label))return 'control';
  if(/storage|warehous|stores|silo|bins|stockpile|loading|receiving|cargo|dispatch yard|transfer node/i.test(label))return 'warehouse';
  return null;
 }
 function hasContents(b){return !!(b?.machines?.length||b?.storage?.length)}
 function canOpen(name,b){if(!b)return false;if(hasContents(b))return true;if(profile(name,b))return true;return !b.unbuilt&&!b.facilityRole&&!b.referenceLabel;}
 function fixtures(name,b){if(hasContents(b))return [];const type=profile(name,b);if(!type)return [];const left=Math.min(2,b.cols*.12),top=Math.min(2,b.rows*.12),W=b.cols-2*left,H=b.rows-2*top,columns=type==='utilities'?3:2,rows=type==='hangar'?2:3,items=[];for(let row=0;row<rows;row++)for(let col=0;col<columns;col++){const cw=W/columns,ch=H/rows;items.push({kind:type,x:left+col*cw+cw*.05,y:top+row*ch+ch*.06,w:cw*.90,h:ch*.88,index:row*columns+col})}return items;}
 function information(name,b){if(b.unbuilt)return 'Authorized expansion area; construction has not been implemented.';const label=name.toLowerCase();if(/headquarters|\bhq\b/.test(label))return 'Company administration, coordination and executive operations.';if(/crew|quarters|habitat|commons|galley|employee/.test(label))return 'Personnel accommodation, welfare and crew support.';if(/security|gate|checkpoint/.test(label))return 'Site access control and security.';if(/landing|shuttle|parking|vehicle/.test(label))return 'Transport access and vehicle staging.';if(/drill|haul|truss|sensor|beacon/.test(label))return 'External infrastructure supporting the site’s operating areas.';return 'Campus support area.';}
 return {profile,hasContents,canOpen,fixtures,information};
})();
if(typeof module!=='undefined')module.exports=FacilityInteriors;
