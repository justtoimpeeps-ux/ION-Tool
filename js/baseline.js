/* Registered fleets are fixed; physical allocation follows the user's campus plan.
   Floor dimensions are derived AFTER placing assets, receiving stores and aisles. */
const FactoryBaseline=(()=>{
 const rawReferenceOrder=['tibanna','nickel','cobalt','copper','silver','gold','pgm','iron','chromium','electronicsFeed','processor','sealCompound','regValve','regSense','superconductor','insulationFeed','sensorModule','safingModule','ceramic','coolant'];
 function billOfMaterials(specs,units=1,output='shipped'){
  const demand={[output]:units},cycles={};
  for(const type of FactoryEngine.topological(specs).slice().reverse()){
   const sp=specs[type],n=Math.max(0,...Object.entries(sp.outputs).map(([item,q])=>(demand[item]||0)/q));cycles[type]=n;
   for(const [item,q]of Object.entries(sp.inputs))demand[item]=(demand[item]||0)+q*n;
  }
  const outputs=new Set(Object.values(specs).flatMap(s=>Object.keys(s.outputs)));
  return {demand,cycles,raw:Object.fromEntries(Object.entries(demand).filter(([k,q])=>q>0&&!outputs.has(k)).sort((a,b)=>output==='shipped'?(rawReferenceOrder.indexOf(a[0])<0?999:rawReferenceOrder.indexOf(a[0]))-(rawReferenceOrder.indexOf(b[0])<0?999:rawReferenceOrder.indexOf(b[0])):0))};
 }
 function compactFloor(input,specs,materials={}){
  const b=structuredClone(input),order=FactoryEngine.topological(specs);
  const groups=order.filter(type=>!specs[type].support).map(type=>b.machines.filter(m=>m.type===type).sort((a,b)=>a.number-b.number)).filter(g=>g.length),rounds=Math.max(0,...groups.map(g=>g.length)),process=[];
  // Repeated production bays keep successive operations adjacent, rather than
  // funneling whole departments through the same cross-floor aisle.
  for(let round=0;round<rounds;round++)for(const group of groups)process.push(...group.slice(Math.ceil(round*group.length/rounds),Math.ceil((round+1)*group.length/rounds)));
  const items=[...b.storage,...process,...b.machines.filter(m=>specs[m.type].support).sort((a,b)=>a.number-b.number)];
  if(!items.length)return b;
  const rough=items.reduce((n,o)=>n+(o.w+2)*(o.h+2),0),minWidth=Math.max(...items.map(o=>o.w)),ideal=Math.sqrt(rough*.82);
  function pack(width){let x=2,y=2,height=0,used=0;const positions=[],shelves=[];for(const o of items){if(x>2&&x+o.w>width+2){shelves.push({top:y,y:y+height,height});y+=height+2;x=2;height=0}positions.push({id:o.id,x,y,h:o.h});x+=o.w+2;height=Math.max(height,o.h);used=Math.max(used,x-1)}shelves.push({top:y,y:y+height,height});for(const p of positions){const shelf=shelves.find(s=>s.top===p.y);p.y=shelf.y-p.h}const cols=Math.max(12,used+3),rows=Math.max(10,y+height+3);return {positions,shelves,cols,rows,score:cols*rows*(1+.6*Math.abs(Math.log(cols/rows/.86)))}}
  let best;for(let width=Math.max(minWidth,Math.floor(ideal*.65));width<=Math.max(minWidth,Math.ceil(ideal*1.45));width++){const trial=pack(width);if(b.allowLandscape!==true&&trial.cols>trial.rows||trial.cols>400||trial.rows>400||trial.cols*trial.rows>25000)continue;if(!best||trial.score<best.score)best=trial}
  if(!best)throw Error('Equipment cannot fit within the supported floor size.');
  const byId=new Map(items.map(o=>[o.id,o]));for(const p of best.positions)Object.assign(byId.get(p.id),{x:p.x,y:p.y});
  Object.assign(b,{cols:best.cols,rows:best.rows,layoutRevision:5,docks:{input:[],output:[]}});
  const occupied=new Set();for(const o of items)for(let y=o.y;y<o.y+o.h;y++)for(let x=o.x;x<o.x+o.w;x++)occupied.add(x+','+y);
  const paths=new Map(),add=(x,y,kind='cart',laneRole=null)=>{const key=x+','+y;if(x>=0&&y>=0&&x<b.cols&&y<b.rows&&!occupied.has(key)&&(!paths.has(key)||kind==='cart'))paths.set(key,{x,y,kind,cargo:null,dir:0,laneRole:laneRole||paths.get(key)?.laneRole||null})};
  for(const shelf of best.shelves)for(let x=1;x<b.cols-1;x++){add(x,shelf.y,'cart','input');add(x,shelf.y+1,'cart','output')}
  for(let y=1;y<b.rows-1;y++){add(0,y);add(1,y);add(b.cols-2,y);add(b.cols-1,y)}
  // Distributed loading bays serve connected process aisles; local gaps remain walkable.
  const doorShelves=best.shelves;
  for(const shelf of doorShelves){b.docks.input.push([1,shelf.y],[b.cols-2,shelf.y]);b.docks.output.push([1,shelf.y+1],[b.cols-2,shelf.y+1])}
  for(const m of b.machines){const s=specs[m.type],shelf=best.shelves.find(row=>row.y===m.y+m.h),bulky=Object.entries(s.outputs).reduce((n,[item,q])=>n+q*(materials[item]?.volume||0),0)*s.rate>22,points=s.port==='fixed'?[...FactoryEngine.accessPoints(m,specs,false),...FactoryEngine.accessPoints(m,specs,true)]:bulky?[[m.x-1,m.y+Math.floor(m.h/2)],[m.x+m.w,m.y+Math.floor(m.h/2)]]:[];for(const [x,y]of points)for(let yy=y;yy<=shelf.y+1;yy++){add(x,yy,'cart');add(x<m.x?x-1:x+1,yy,'cart')}}

  b.paths=[...paths.values()];const lanes=FactoryEngine.cartCells(b);for(const p of b.paths)if(lanes.narrow.has(p.x+','+p.y))p.kind='walk';return b;
 }
 function generate(specs,materials,names){
  const buildings=Object.fromEntries(names.map(name=>[name,{machines:[],storage:[],paths:[],docks:{input:[],output:[]},revision:3,layoutRevision:4}]));
  // Retain three historical zero-stock receiving slots so existing V4.2 replays/layouts still match.
  const perCore=billOfMaterials(specs),incoming=Object.fromEntries(Object.entries(perCore.raw).flatMap(([k,v])=>[[k,Object.hasOwn(ION_REGISTER.openingTonnes,k)?0:Math.ceil(v*247*1.1)],...(k==='pgm'&&materials.damagedDrone&&materials.testCoupon&&materials.oreSample?[['damagedDrone',0],['testCoupon',0],['oreSample',0]]:[])]));
  let worker=0;const numbers={};
  for(const [owner,allocation]of Object.entries(ION_REGISTER.allocation))for(const [type,count]of Object.entries(allocation)){
   const sp=specs[type],destination=sp.building||owner,role=roleForSpec(sp),homePool=role==='qa'?'qa-shared':role+'-'+owner.slice(-1),staffingRequired=DEFAULT_STAFFING[type]??sp.workers;
   for(let i=0;i<count;i++)buildings[destination].machines.push({id:owner.replace(' ','')+'-'+type+'-'+(i+1),type,owner,number:numbers[type]=(numbers[type]||0)+1,x:0,y:0,w:sp.w,h:sp.h,angle:0,condition:.95,staffingRequired,upgrades:[],crew:Array.from({length:staffingRequired},()=>({id:'worker-'+(++worker),level:planningTier(worker),role,homePool}))});
  }
  // Confirmed opening tonnes become kg once; unknown components remain zero-stock scenarios.
  for(const item of Object.keys(incoming)){
   const stock=(ION_REGISTER.openingTonnes[item]||0)*1000,dailyUse=(perCore.raw[item]||0)*247,p=FactoryEngine.storageProfile(item,materials),target=Math.max(stock/.85,dailyUse*3*1.1),perSquare=Math.min(p.usableVolume/p.volumePerUnit,materials[item].unit==='kg'?p.loadKg:Infinity),area=Math.max(4,Math.ceil(target/perSquare)+1),w=Math.ceil(Math.sqrt(area)),h=Math.ceil(area/w);
   buildings.Receiving.storage.push({id:'receiving-'+item,item,stock,x:0,y:0,w,h,storageModel:'receiving-v1',receiving:true,stockSource:stock?'Register §5 opening tonnes × 1000':'Unknown; zero opening assumed'});
  }
  for(const [name,b]of Object.entries(buildings))buildings[name]=compactFloor(b,specs,materials);

  for(const s of buildings.Receiving.storage)s.loadingZones=[[Math.floor(s.w/2),s.h-1]];
  const workerPool=availableWorkers(buildings,specs);
  const roster=[...Object.values(buildings).flatMap(b=>b.machines.flatMap(m=>m.crew)),...workerPool];
  // Largest-remainder rounding conserves the census; deterministic shuffle spreads
  // senior people among assigned and unassigned staff without creating identities.
  const quotas=WORKFORCE_DISTRIBUTION.map((fraction,i)=>({level:i+1,exact:fraction*roster.length,count:Math.floor(fraction*roster.length)}));
  let remaining=roster.length-quotas.reduce((n,q)=>n+q.count,0);
  for(const q of [...quotas].sort((a,b)=>(b.exact-b.count)-(a.exact-a.count)||a.level-b.level)){if(remaining-->0)q.count++}
  const levels=quotas.flatMap(q=>Array(q.count).fill(q.level));
  let seed=110926;
  for(let i=levels.length-1;i>0;i--){seed=(Math.imul(seed,1664525)+1013904223)>>>0;const j=seed%(i+1);[levels[i],levels[j]]=[levels[j],levels[i]]}
  roster.forEach((person,i)=>{person.level=levels[i]});
  return {buildings,workerPool,sizing:{observed:247,perCore:perCore.raw,incoming,dockCapacity:2000}};
 }
 function availableWorkers(buildings,specs){
  const used={};for(const b of Object.values(buildings))for(const m of b.machines)for(const w of m.crew){const role=w.role||roleForSpec(specs[m.type]),pool=w.homePool||(role==='qa'?'qa-shared':role+'-'+(m.owner==='Factory B'?'B':'A'));used[pool]=(used[pool]||0)+1}
  const ids=new Set(Object.values(buildings).flatMap(b=>b.machines.flatMap(m=>m.crew.map(w=>w.id))));let index=0;return STAFF_POOLS.flatMap(pool=>{let sequence=0;return Array.from({length:Math.max(0,pool.count-(used[pool.id]||0))},()=>{let id;do{id='reserve-'+pool.id+'-'+(++sequence)}while(ids.has(id));ids.add(id);return {id,level:planningTier(++index),role:pool.role,homePool:pool.id}})});
 }
 return {generate,compactFloor,billOfMaterials,availableWorkers};
})();
if(typeof module!=='undefined')module.exports=FactoryBaseline;
