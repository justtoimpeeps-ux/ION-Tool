/* Complete-recipe, finite-buffer planning solver. No campaign time is advanced. */
const FactoryEngine=(()=>{
 const EPS=1e-8;
 function recipeType(m){return m.recipe||m.type}
 function operation(m,specs){return specs[recipeType(m)]}
 function recipeChoices(m,specs){const hardware=specs[m.type];return hardware.art==='cnc'?Object.keys(specs).filter(k=>specs[k].art==='cnc'&&specs[k].w<=hardware.w&&specs[k].h<=hardware.h):[m.type]}
 function equipmentModel(m,specs){return specs[m.type].models?.[m.model||'standard']||{speed:1,workerDelta:0,price:specs[m.type].price,days:specs[m.type].days,name:'Standard production cell'}}
 function modifiers(m,catalog={}){return (m.upgrades||[]).reduce((a,k)=>{const u=catalog[k];if(u){a.speed*=u.speed||1;a.workers+=u.workerReduction||0}return a},{speed:1,workers:0})}
 function operatorLimit(m,specs){return specs[m.type].operatorLimit??Math.max(1,specs[m.type].workers||1)}
 function requiredWorkers(m,specs,catalog={}){return Math.min(operatorLimit(m,specs),Math.max(1,(m.staffingRequired??Math.max(1,specs[m.type].workers+(equipmentModel(m,specs).workerDelta||0)))-modifiers(m,catalog).workers))}
 function crewLimit(m,specs,catalog={}){return requiredWorkers(m,specs,catalog)+(specs[m.type].helpers||0)}
 function productiveCrew(m,specs,catalog={}){return (m.crew||[]).slice(0,crewLimit(m,specs,catalog))}
 function staffing(m,specs,catalog={}){const crew=productiveCrew(m,specs,catalog),required=requiredWorkers(m,specs,catalog),operators=crew.slice(0,required);return operators.length?Math.min(1,Math.min(1,operators.length/required)*(.65+Math.min(.35,operators.reduce((n,p)=>n+p.level,0)/operators.length*.07))*(1+Math.min(1,Math.max(0,crew.length-required))*.04)):0}
 function loadingCells(b){return b.storage.flatMap(s=>(s.loadingZones||[]).map(([x,y])=>({x:s.x+x,y:s.y+y,kind:'loading',storageId:s.id})))}
 function loadingPoints(s){return s.loadingZones?.length?s.loadingZones.map(([x,y])=>[s.x+x,s.y+y]):null}
 function validateLoadingZones(b){for(const s of b.storage){if(s.loadingZones===undefined)continue;if(!Array.isArray(s.loadingZones)||s.loadingZones.length>s.w*s.h-1)throw Error('Invalid storage loading zones.');const keys=new Set();for(const p of s.loadingZones){if(!Array.isArray(p)||p.length!==2||!p.every(Number.isInteger)||p[0]<0||p[1]<0||p[0]>=s.w||p[1]>=s.h||keys.has(p.join(',')))throw Error('Invalid or duplicate loading square.');keys.add(p.join(','))}if(!keys.size)continue;const seen=new Set(),queue=[s.loadingZones[0]];for(const [x,y]of queue){const k=x+','+y;if(seen.has(k))continue;seen.add(k);for(const [dx,dy]of [[1,0],[-1,0],[0,1],[0,-1]])if(keys.has((x+dx)+','+(y+dy))&&!seen.has((x+dx)+','+(y+dy)))queue.push([x+dx,y+dy])}if(seen.size!==keys.size)throw Error('Loading squares must connect to the existing zone for this store.');const exposed=s.loadingZones.some(([x,y])=>[[1,0],[-1,0],[0,1],[0,-1]].some(([dx,dy])=>{const xx=x+dx,yy=y+dy;if(xx>=0&&yy>=0&&xx<s.w&&yy<s.h)return false;const gx=s.x+xx,gy=s.y+yy;return gx>=0&&gy>=0&&gx<b.cols&&gy<b.rows&&![...b.machines,...b.storage].some(o=>o.id!==s.id&&gx>=o.x&&gy>=o.y&&gx<o.x+o.w&&gy<o.y+o.h)&&!b.paths.some(p=>p.x===gx&&p.y===gy&&p.kind==='belt')}));if(!exposed)throw Error('Loading zone needs an exposed entrance at the storage boundary.');}return b}
 function cartCells(b){const occupied=new Set();for(const o of [...b.machines,...b.storage])for(let y=o.y;y<o.y+o.h;y++)for(let x=o.x;x<o.x+o.w;x++)occupied.add(x+','+y);const painted=new Set(b.paths.filter(p=>p.kind==='cart'&&!occupied.has(p.x+','+p.y)).map(p=>p.x+','+p.y)),valid=new Set();for(const k of painted){const [x,y]=k.split(',').map(Number),block=[k,(x+1)+','+y,x+','+(y+1),(x+1)+','+(y+1)];if(block.every(p=>painted.has(p)))block.forEach(p=>valid.add(p))}return {valid,narrow:new Set([...painted].filter(k=>!valid.has(k)))}}

 function effectiveRate(m,specs,catalog={}){return operation(m,specs).rate*equipmentModel(m,specs).speed*modifiers(m,catalog).speed*staffing(m,specs,catalog)*m.condition}
 function ratedRate(m,specs,catalog={}){return operation(m,specs).rate*equipmentModel(m,specs).speed*modifiers(m,catalog).speed}
 function accessPoints(m,specs,output){
  const s=specs[m.type],side=output?m.outputSide:m.inputSide,access=s.port==='flex'&&side?[{kind:output?'out':'in',side,position:(output?m.outputPosition:m.inputPosition)??.5}]:s.access;if(!access){const a=m.angle||0,sign=output?1:-1;if(a%2)return [[m.x+Math.floor(m.w/2),sign*(a===1?1:-1)>0?m.y+m.h:m.y-1]];return [[sign*(a===0?1:-1)>0?m.x+m.w:m.x-1,m.y+Math.floor(m.h/2)]]}
  return access.filter(p=>p.kind===(output?'out':'in')).map(p=>{
   let w=s.w,h=s.h,x=p.side==='left'?-1:p.side==='right'?w:Math.min(w-1,Math.floor(w*p.position)),y=p.side==='top'?-1:p.side==='bottom'?h:Math.min(h-1,Math.floor(h*p.position));
   for(let a=0;a<(m.angle||0);a++){[x,y]=[h-1-y,x];[w,h]=[h,w]}return [m.x+x,m.y+y];
  });
 }
 function attachmentAt(m,specs,kind,x,y){const s=specs[m.type];if(s.port!=='flex'||!['input','output'].includes(kind))return null;for(const side of ['left','right','top','bottom']){const size=side==='left'||side==='right'?s.h:s.w;for(let i=0;i<size;i++){const position=(i+.5)/size,candidate={...m,[kind+'Side']:side,[kind+'Position']:position};if(accessPoints(candidate,specs,kind==='output').some(p=>p[0]===x&&p[1]===y))return {side,position}}}return null}
 function pathCapacity(p){return p.kind==='belt'?280:['cart','loading'].includes(p.kind)?145:22}
 function storageProfile(item,materials){
  const m=materials[item],tank=['coolant','tibanna'].includes(item),metal=['iron','nickel','cobalt','chromium','copper','silver','gold','pgm'].includes(item);
  return {kind:tank?'tank':metal?'billets':item==='superconductor'?'reels':item==='ceramic'?'sacks':'crates',volumePerUnit:m.volume*(tank?1:metal?1.6:1.8),usableVolume:tank?4:2.2,loadKg:tank?5000:2500};
 }
 function storageCap(s,materials){const area=Math.max(0,s.w*s.h-(s.loadingZones?.length||0));if(s.storageModel!=='receiving-v1')return Math.floor(area*8.8/materials[s.item].volume);const p=storageProfile(s.item,materials);return Math.floor(area*Math.min(p.usableVolume/p.volumePerUnit,materials[s.item].unit==='kg'?p.loadKg:Infinity))}
 function topological(specs){const done=new Set(),order=[];while(order.length<Object.keys(specs).length){let progress=false;for(const [type,s]of Object.entries(specs)){if(done.has(type))continue;const deps=Object.keys(specs).filter(t=>Object.keys(specs[t].outputs).some(k=>Object.hasOwn(s.inputs,k)));if(deps.every(t=>done.has(t))){done.add(type);order.push(type);progress=true}}if(!progress)throw Error('Recipe cycle detected. A starting-inventory model is required.')}return order}
 function simulate(buildings,specs,materials,options={}){
  const warmupDays=options.warmupDays||0,dailyOutputs=[];
  const steps=options.steps||36,hours=options.hours??9,timeFactor=hours/9,catalog=options.upgrades||{},dockCap=(options.dockCapacity??2000)*timeFactor;
  if(!Number.isInteger(warmupDays)||warmupDays<0||warmupDays>10||!Number.isInteger(steps)||steps<1||steps>1000||!Number.isFinite(hours)||hours<=0||hours>24)throw Error('Invalid simulation period.');
  const supply={...(options.supply||{iron:3000,nickel:600})},remainingSupply={...supply};
  const receiving=options.receiving,terminal=options.terminal||(materials.shipped?'shipped':'tested');
  const all=[],stores=[],owners={},pathMaps={},machines={},stage={},stocks={},buffers={},traffic={},details={},sources={};
  const routeCache=new Map(),pathCache=new Map(),routes=new Map(),links=new Map();
  for(const [bn,b]of Object.entries(buildings)){
   pathMaps[bn]=new Map();
   if(options.implicitWalk){const occupied=new Set();for(const o of [...b.machines,...b.storage])for(let y=o.y;y<o.y+o.h;y++)for(let x=o.x;x<o.x+o.w;x++)occupied.add(x+','+y);for(let y=0;y<b.rows;y++)for(let x=0;x<b.cols;x++)if(!occupied.has(x+','+y))pathMaps[bn].set(x+','+y,{x,y,kind:'walk',dir:0})}
   const lanes=cartCells(b);for(const p of b.paths)pathMaps[bn].set(p.x+','+p.y,p.kind==='cart'&&!lanes.valid.has(p.x+','+p.y)?{...p,kind:'walk'}:p);for(const p of loadingCells(b))pathMaps[bn].set(p.x+','+p.y,p);traffic[bn]={};
   for(const m of b.machines){all.push(m);owners[m.id]=bn;buffers[m.id]={};machines[m.id]=0;details[m.id]={capacity:effectiveRate(m,specs,catalog)*timeFactor,blocked:0,shortages:{},inputSupply:{},inputNeed:Object.fromEntries(Object.entries(operation(m,specs).inputs).map(([item,n])=>[item,n*ratedRate(m,specs,catalog)*timeFactor]))};
    for(const item of Object.keys(operation(m,specs).outputs))(sources[item]??=[]).push(m);
    const st=stage[recipeType(m)]??={rated:0,possible:0,actual:0,machines:0};st.rated+=operation(m,specs).rate*equipmentModel(m,specs).speed*modifiers(m,catalog).speed*timeFactor;st.possible+=details[m.id].capacity;st.machines++;
   }
   for(const s of b.storage){stores.push(s);owners[s.id]=bn;stocks[s.id]=Math.min(s.stock||0,storageCap(s,materials))}
  }
  const order=topological(specs),sorted=all.slice().sort((a,b)=>order.indexOf(recipeType(a))-order.indexOf(recipeType(b)));
  const vol=item=>materials[item].volume;
  function ends(o,output){
   if(o.points)return o.points;const loading=loadingPoints(o);if(loading)return loading;
   if(o.type&&(specs[o.type].port==='fixed'||(output?o.outputSide:o.inputSide)))return accessPoints(o,specs,output);
   const out=[];for(let x=o.x;x<o.x+o.w;x++)out.push([x,o.y-1],[x,o.y+o.h]);for(let y=o.y;y<o.y+o.h;y++)out.push([o.x-1,y],[o.x+o.w,y]);return out;
  }
  function local(bn,source,target,item){
   const id=bn+':'+source.id+'>'+target.id+':'+item;if(pathCache.has(id))return pathCache.get(id);
   const map=pathMaps[bn],allowed=p=>p&&(p.kind!=='belt'||p.cargo===item),goals=new Set(ends(target,false).filter(([x,y])=>allowed(map.get(x+','+y))).map(p=>p.join(','))),queue=[],prev=new Map();
   for(const p of ends(source,true)){const k=p.join(',');if(allowed(map.get(k))&&!prev.has(k)){queue.push(p);prev.set(k,null)}}
   // Prefer efficient handling: a cart detour can beat a short walking route.
   const distance=new Map(),heap=[];
   function push(p,cost){let i=heap.length;heap.push({p,cost});while(i){const parent=(i-1)>>1;if(heap[parent].cost<=cost)break;heap[i]=heap[parent];i=parent}heap[i]={p,cost}}
   function pop(){const top=heap[0],last=heap.pop();if(heap.length){let i=0;while(true){let child=i*2+1;if(child>=heap.length)break;if(child+1<heap.length&&heap[child+1].cost<heap[child].cost)child++;if(heap[child].cost>=last.cost)break;heap[i]=heap[child];i=child}heap[i]=last}return top}
   for(const p of queue){distance.set(p.join(','),0);push(p,0)}
   let found=null;while(heap.length){const {p:point,cost}=pop(),[x,y]=point,k=x+','+y,p=map.get(k);if(cost!==distance.get(k))continue;if(goals.has(k)){found=k;break}
    for(const [dx,dy,d]of [[1,0,0],[0,1,1],[-1,0,2],[0,-1,3]]){const nk=(x+dx)+','+(y+dy),n=map.get(nk);if(!allowed(n)||p.kind==='belt'&&p.dir!==d||n.kind==='belt'&&n.dir!==d)continue;const role=source.id===bn+'-input'?'input':target.id===bn+'-output'?'output':null;const next=cost+(n.kind==='belt'?1:['cart','loading'].includes(n.kind)?2:8)*(role&&n.laneRole&&n.laneRole!==role?4:1);if(next<(distance.get(nk)??Infinity)){distance.set(nk,next);prev.set(nk,k);push([x+dx,y+dy],next)}}
   }
   const cells=[];while(found!==null){cells.push(found.split(',').map(Number));found=prev.get(found)}const result=cells.length?{building:bn,cells:cells.reverse()}:null;pathCache.set(id,result);return result;
  }
  const dock=(bn,kind)=>({id:bn+'-'+kind,points:buildings[bn].docks?.[kind]||[]});
  function route(source,target,item){
   const id=source.id+'>'+target.id+':'+item;if(routeCache.has(id))return routeCache.get(id);
   const from=owners[source.id],to=owners[target.id];let result;
   if(from===to){const path=local(from,source,target,item);result=path?{segments:[path]}:null}
   else if(buildings[from].docks&&buildings[to].docks){const a=local(from,source,dock(from,'output'),item),b=local(to,dock(to,'input'),target,item);result=a&&b?{dock:from+' → '+to,fromBuilding:from,toBuilding:to,segments:[a,b]}:null}
   else result=options.requireDocks?null:{dock:from+' → '+to,fromBuilding:from,toBuilding:to,segments:[]};
   routeCache.set(id,result);return result;
  }
  let loads,dockLoads;
  function room(r,item,extra=new Map()){
   let available=Infinity;
   if(r.dock)available=(dockCap/steps-(dockLoads[r.dock]||0)-(extra.get('dock:'+r.dock)||0));
   for(const seg of r.segments)for(const p of seg.cells){const k=p.join(','),id=seg.building+':'+k;available=Math.min(available,pathCapacity(pathMaps[seg.building].get(k))*timeFactor/steps-(loads[id]||0)-(extra.get(id)||0))}
   return Math.max(0,available)/vol(item);
  }
  function reserve(r,item,amount,extra){if(r.dock){const id='dock:'+r.dock;extra.set(id,(extra.get(id)||0)+amount*vol(item))}for(const seg of r.segments)for(const p of seg.cells){const id=seg.building+':'+p.join(',');extra.set(id,(extra.get(id)||0)+amount*vol(item))}}
  function record(source,target,item,amount,r){
   if(amount<EPS)return;const id=source.id+'>'+target.id+':'+item;
   for(const [i,seg]of r.segments.entries()){
    const rid=id+':'+i;if(!routes.has(rid))routes.set(rid,{...seg,item,from:source.id,to:target.id,rate:0,interbuilding:!!r.dock});routes.get(rid).rate+=amount;
    for(const p of seg.cells){const k=p.join(','),lid=seg.building+':'+k;loads[lid]=(loads[lid]||0)+amount*vol(item);const t=traffic[seg.building][k]??={total:0,items:{}};t.total+=amount*vol(item);t.items[item]=(t.items[item]||0)+amount}
   }
   if(r.dock){dockLoads[r.dock]=(dockLoads[r.dock]||0)+amount*vol(item);const l=links.get(r.dock)||{from:r.fromBuilding,to:r.toBuilding,total:0,items:{}};l.total+=amount*vol(item);l.items[item]=(l.items[item]||0)+amount;links.set(r.dock,l)}
  }
  const candidates=new Map();
  for(const m of all)for(const item of Object.keys(operation(m,specs).inputs)){
   const list=[...stores.filter(s=>s.item===item),...(sources[item]||[])].filter(s=>s!==m);
   const distance=s=>owners[s.id]===owners[m.id]?Math.abs(s.x-m.x)+Math.abs(s.y-m.y):100000;
   list.sort((a,b)=>distance(a)-distance(b));candidates.set(m.id+':'+item,list);
  }
  function plan(m,units){
   const transfers=[],raw={},extra=new Map(),missing=[];
   for(const [item,n]of Object.entries(operation(m,specs).inputs)){
    let need=units*n;
    if(!receiving&&Object.hasOwn(supply,item)){raw[item]=Math.min(need,remainingSupply[item]);need-=raw[item]}
    else for(const source of candidates.get(m.id+':'+item)){
     if(source===m||need<EPS)continue;const available=source.type?(buffers[source.id][item]||0):stocks[source.id];if(available<EPS)continue;
     const r=route(source,m,item);if(!r)continue;const amount=Math.min(need,available,room(r,item,extra));if(amount<EPS)continue;
     transfers.push({source,item,amount,r});reserve(r,item,amount,extra);need-=amount;
    }
    if(need>EPS)missing.push(item);
   }
   return {transfers,raw,missing};
  }
  for(let tick=0;tick<steps*(warmupDays+1);tick++){
   if(tick%6===0&&options.onProgress)options.onProgress({completed:tick,total:steps*(warmupDays+1)});
   if(tick&&tick%steps===0){
    dailyOutputs.push(stage.qa?.actual??stage[sorted.at(-1)?.type]?.actual??0);
    for(const m of all){machines[m.id]=0;details[m.id].blocked=0;details[m.id].shortages={};details[m.id].inputSupply={}}
    for(const st of Object.values(stage))st.actual=0;
    for(const bn of Object.keys(traffic))traffic[bn]={};routes.clear();links.clear();Object.assign(remainingSupply,supply);
   }
   loads={};dockLoads={};
   if(receiving){for(const s of stores.filter(s=>owners[s.id]===receiving&&s.receiving)){
    const item=s.item,source=dock(receiving,'input'),path=local(receiving,source,s,item);if(!path)continue;const r={segments:[path]};
    const amount=Math.min((supply[item]||0)/steps,remainingSupply[item]||0,storageCap(s,materials)-stocks[s.id],room(r,item));
    if(amount>EPS){stocks[s.id]+=amount;remainingSupply[item]-=amount;record(source,s,item,amount,r)}
   }}
   for(const m of sorted){
    const sp=operation(m,specs),detail=details[m.id];if(sp.support)continue;let max=detail.capacity/steps;
    for(const [item,n]of Object.entries(sp.outputs))if(item!==terminal)max=Math.min(max,Math.max(0,sp.rate*.2*n-(buffers[m.id][item]||0))/n);
    if(max+EPS<detail.capacity/steps)detail.blocked++;
    let chosen=plan(m,max),amount=max;
    if(chosen.missing.length){for(const item of chosen.missing)detail.shortages[item]=(detail.shortages[item]||0)+1;let lo=0,hi=max;for(let j=0;j<18;j++){const mid=(lo+hi)/2;if(plan(m,mid).missing.length)hi=mid;else lo=mid}amount=lo;chosen=plan(m,amount)}
    if(amount>EPS){for(const [item,n]of Object.entries(chosen.raw))remainingSupply[item]-=n;
     for(const t of chosen.transfers){if(t.source.type)buffers[t.source.id][t.item]-=t.amount;else stocks[t.source.id]-=t.amount;record(t.source,m,t.item,t.amount,t.r)}
     for(const [item,n]of Object.entries(sp.inputs))detail.inputSupply[item]=(detail.inputSupply[item]||0)+amount*n;
     machines[m.id]+=amount;stage[recipeType(m)].actual+=amount;for(const [item,n]of Object.entries(sp.outputs))if(item!==terminal)buffers[m.id][item]=(buffers[m.id][item]||0)+amount*n;
    }
    for(const [item,quantity]of Object.entries(buffers[m.id]))if(quantity>EPS)for(const s of stores.filter(s=>owners[s.id]===owners[m.id]&&s.item===item&&!s.receiving)){
     const r=route(m,s,item);if(!r)continue;const send=Math.min(buffers[m.id][item],storageCap(s,materials)-stocks[s.id],room(r,item));if(send>EPS){stocks[s.id]+=send;buffers[m.id][item]-=send;record(m,s,item,send,r)}
    }
   }
  }
  const diagnostics=[];for(const m of all){if(specs[m.type].support)continue;const d=details[m.id],name=specs[m.type].name+' #'+m.number;
   if(!m.crew.length)diagnostics.push(name+': no workers assigned.');
   else if(d.blocked)diagnostics.push(name+': output buffer blocked in '+d.blocked+' of '+steps+' steps.');
   for(const item of Object.keys(d.shortages))diagnostics.push(name+': constrained by '+materials[item].title+' supply or its route.');
  }
  dailyOutputs.push(stage.qa?.actual??stage[sorted.at(-1)?.type]?.actual??0);
  return {warmupDays,dailyOutputs,machines,stage,stocks,buffers,traffic,details,diagnostics,routes:[...routes.values()],links:[...links.values()],remainingSupply,steps,hours};
 }
 return {recipeType,operation,recipeChoices,loadingCells,loadingPoints,validateLoadingZones,attachmentAt,operatorLimit,crewLimit,productiveCrew,cartCells,equipmentModel,storageProfile,simulate,staffing,requiredWorkers,effectiveRate,ratedRate,accessPoints,pathCapacity,storageCap,topological};
})();
if(typeof module!=='undefined')module.exports=FactoryEngine;
