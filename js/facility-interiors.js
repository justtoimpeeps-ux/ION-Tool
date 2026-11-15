/* Presentation policy only: never adds production, inventory, people or floor geometry. */
const FacilityInteriors=(()=>{
 function profile(name,b={}){const label=(b.referenceLabel||name.split(' / ').at(-1))+' '+(b.facilityRole||'');if(b.unbuilt||/expansion/i.test(label))return null;
  if(/^Spartan Orbit\s*\//i.test(name)){if(/medical/i.test(label))return 'medical';if(/quarters/i.test(label))return 'quarters';if(/galley|commons/i.test(label))return 'commons';if(/communications|comms/i.test(label))return 'control'}
  if(/headquarters|\bhq\b|admin|crew|quarters|habitat|commons|galley|medical|security|gatehouse|checkpoint|parking|courtyard|plaza|landing pad|shuttle pad|training|fleet operations|contractor offices|employee operations|internal logistics yard|vehicle yard|sensor mast|sensor beacon|communications and sensors|drill pad|drill tower|haul road|haul route|anchor truss/i.test(label))return null;
  if(/assay|laborator|\blab\b|labs|research|r&d|metallurgy/i.test(label))return 'laboratory';
  if(/maintenance|repair|toolroom|workshop|machine shop|robotics.*bay|fabrication|field installation|depot|prototype/i.test(label))return 'workshop';
  if(/power|utilit|thermal|fuel|water|reagent|tank farm/i.test(label))return 'utilities';
  if(/hangar|berth|drone rack|drone bay|docking/i.test(label))return 'hangar';
  if(/command|operations center|flight.*control|drone control|engineering|controls/i.test(label))return 'control';
  if(/storage|warehous|stores|silo|bins|stockpile|loading|receiving|cargo|dispatch yard|transfer node/i.test(label))return 'warehouse';
  return null;
 }
 function outdoor(name,b={}){const label=b.referenceLabel||name.split(' / ').at(-1);return /extraction zone|ridge excavation|open pit|ridge cut|cutting arm|autonomous drill|drill pad|drill tower|ore haul route|haul road/i.test(label)?(b.environmentType==='asteroid'?'asteroid':'surface'):null}
 function hasContents(b){return !!(b?.machines?.length||b?.storage?.length)}
 function canOpen(name,b){if(!b)return false;if(b.keepWorksiteOpen===true)return true;if(hasContents(b))return true;if(profile(name,b))return true;return !b.unbuilt&&!b.facilityRole&&!b.referenceLabel;}
 const fittingCache=new WeakMap(),roomPieces={medical:[['medicalBed',2,1.5],['medicalCabinet',1,1],['console',2,1],['safetyStation',1,1]],quarters:[['bunk',2,1],['locker',1,1],['chartTable',2,1.5],['basin',1,1]],commons:[['galleyLine',3,1.5],['cafeTable',2,1.5],['foodLocker',1,1],['waterUnit',1,1]],control:[['console',2,1],['display',2,.6],['chartTable',2,1.5],['cabinet',1,1]],laboratory:[['labBench',2.5,1.5],['sampleCabinet',1,1],['instrumentCart',1,1],['safetyStation',1,1]],workshop:[['workbench',2.5,1.5],['toolboard',2,.6],['toolCabinet',1,1],['toolCart',1,1]],utilities:[['powerRack',1.5,1],['manifold',2.5,1],['pumpSkid',2,1.5],['servicePanel',1,1]],warehouse:[['emptyRack',2.5,1],['packbench',2,1.5],['trolley',1,1],['cabinet',1,1]],hangar:[['serviceCradle',2.5,2],['gantry',3,1],['chargePost',1,1],['toolCabinet',1,1]]};
 function fixtures(name,b){const type=profile(name,b);if(!type||b.keepWorksiteOpen===true||outdoor(name,b)||!Number.isFinite(b.cols)||!Number.isFinite(b.rows))return [];
  const objects=[...(b.machines||[]),...(b.storage||[])],paths=b.paths||[],doors=Object.values(b.docks||{}).flat(),key=JSON.stringify([name,type,b.facilityRole,b.referenceLabel,b.cols,b.rows,objects.map(o=>[o.x,o.y,o.w,o.h]),paths.map(p=>[p.x,p.y]),doors]),old=fittingCache.get(b);if(old?.key===key)return old.items;
  const blocked=new Set(),mark=(x,y,w,h)=>{for(let yy=Math.max(0,Math.floor(y));yy<Math.min(b.rows,Math.ceil(y+h));yy++)for(let xx=Math.max(0,Math.floor(x));xx<Math.min(b.cols,Math.ceil(x+w));xx++)blocked.add(xx+','+yy)};
  // Keep the equipment service margin and every explicit path clear. Empty
  // support rooms retain a door corridor and a cross aisle through the room.
  for(const o of objects)mark(o.x-1,o.y-1,o.w+2,o.h+2);for(const p of paths)mark(p.x,p.y,1,1);for(const [x,y]of doors)mark(x-1,y-1,3,3);
  if(!objects.length&&!paths.length){mark(0,1,b.cols,1);mark(Math.floor(b.cols/2),1,1,b.rows-2);mark(1,Math.floor(b.rows/2),b.cols-2,1)}
  const items=[],catalog=roomPieces[type],limit=Math.min(24,Math.max(6,Math.floor(b.cols*b.rows/20))),fits=(x,y,w,h)=>{for(let yy=Math.floor(y);yy<Math.ceil(y+h);yy++)for(let xx=Math.floor(x);xx<Math.ceil(x+w);xx++)if(blocked.has(xx+','+yy))return false;return true};
  const major={control:['commandHub',4,3],laboratory:['labIsland',4,3],workshop:['serviceRig',4,3],utilities:[/power|reactor/i.test(name+' '+b.facilityRole)?'reactorBank':'tankBank',6,4],warehouse:['rackBank',4,3],hangar:['serviceBerth',5,4],medical:['treatmentBay',4,3],quarters:['bunkBay',4,3],commons:['galleyIsland',4,3]}[type];
  for(let i=0;i<(objects.length?1:2);i++){const [variant,w,h]=major,spots=[],ax=b.cols*(i?.72:.28)-w/2,ay=b.rows*(i?.72:.32)-h/2;for(let y=0;y+h<=b.rows;y++)for(let x=0;x+w<=b.cols;x++)if(fits(x,y,w,h))spots.push({x,y,d:(x-ax)**2+(y-ay)**2});spots.sort((a,b)=>a.d-b.d);const p=spots[0];if(p){items.push({kind:type,variant,x:p.x+.1,y:p.y+.1,w:w-.2,h:h-.2,index:items.length});mark(p.x-.25,p.y-.25,w+.5,h+.5)}}
  const candidates=catalog.map(([,w,h])=>{const spots=[];for(let y=0;y+h<=b.rows;y++)for(let x=0;x+w<=b.cols;x++)spots.push({x,y,edge:Math.min(x,y,b.cols-x-w,b.rows-y-h)});return spots.sort((a,b)=>a.edge-b.edge||((a.y*17+a.x*7)%101)-((b.y*17+b.x*7)%101))});
  for(let index=items.length;index<limit;index++){let placed=false;for(let attempt=0;attempt<catalog.length&&!placed;attempt++){const variantIndex=(index+attempt)%catalog.length,[variant,w,h]=catalog[variantIndex],p=candidates[variantIndex].find(p=>fits(p.x,p.y,w,h));if(p){items.push({kind:type,variant,x:p.x+.1,y:p.y+.1,w:w-.2,h:h-.2,index});mark(p.x-.25,p.y-.25,w+.5,h+.5);placed=true}}if(!placed)break}

  fittingCache.set(b,{key,items});return items;
 }

 function information(name,b){if(b.unbuilt)return 'Authorized expansion area; construction has not been implemented.';const label=name.toLowerCase();if(/headquarters|\bhq\b/.test(label))return 'Company administration, coordination and executive operations.';if(/crew|quarters|habitat|commons|galley|employee/.test(label))return 'Personnel accommodation, welfare and crew support.';if(/security|gate|checkpoint/.test(label))return 'Site access control and security.';if(/landing|shuttle|parking|vehicle/.test(label))return 'Transport access and vehicle staging.';if(/drill|haul|truss|sensor|beacon/.test(label))return 'External infrastructure supporting the site’s operating areas.';return 'Campus support area.';}
 return {outdoor,profile,hasContents,canOpen,fixtures,information};
})();
if(typeof module!=='undefined')module.exports=FacilityInteriors;
