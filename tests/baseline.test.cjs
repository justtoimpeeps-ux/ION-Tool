const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm'),path=require('node:path');
const ctx=vm.createContext({structuredClone});for(const n of ['register','data','engine','baseline'])vm.runInContext(fs.readFileSync(path.join(__dirname,'../js/'+n+'.js'),'utf8'),ctx);
const {plan,specs,materials,register,engine,baseline,names}=vm.runInContext('({plan:FactoryBaseline.generate(SPECS,MATERIALS,BLDGS),specs:SPECS,materials:MATERIALS,register:ION_REGISTER,engine:FactoryEngine,baseline:FactoryBaseline,names:BLDGS})',ctx);
test('all 934 registered stations are placed once with their source ownership intact',()=>{
 const machines=Object.values(plan.buildings).flatMap(b=>b.machines);assert.equal(machines.length,934);assert.equal(new Set(machines.map(m=>m.id)).size,934);
 for(const [owner,f]of Object.entries(register.factories))for(const [category,count]of Object.entries(f.counts))if(category!=='movers')assert.equal(machines.filter(m=>m.owner===owner&&specs[m.type].category===category).length,count,owner+' '+category);
 assert.equal(register.factories['Factory A'].counts.movers+register.factories['Factory B'].counts.movers,160);
});
test('exact eight-subassembly recipes reconcile every documented kg and purchased component',()=>{
 const perCore=baseline.billOfMaterials(specs).raw;
 for(const [k,n]of Object.entries({...register.masses,...register.purchased}))assert.ok(Math.abs(perCore[k]-n)<1e-8,k);
 assert.equal(Object.keys(perCore).length,20);assert.equal(specs.kit.inputs.housing,1);assert.equal(Object.keys(specs.kit.inputs).length,8);
 assert.deepEqual(Object.keys(specs.cnc.inputs),['kit']);assert.deepEqual(Object.keys(specs.calibrate.inputs),['core']);assert.deepEqual(Object.keys(specs.qa.inputs),['calibrated']);assert.deepEqual(Object.keys(specs.package.inputs),['tested']);
});
test('shared equipment is relocated rather than duplicated; A/B hold upstream work',()=>{
 assert.equal(plan.buildings['Precision Machining'].machines.length,300);assert.equal(plan.buildings.Subassemblies.machines.length,120);assert.equal(plan.buildings['Final Assembly & Test'].machines.length,116);
 for(const name of ['Factory A','Factory B'])assert.ok(plan.buildings[name].machines.every(m=>!specs[m.type].building));
 assert.equal(Object.keys(plan.buildings).length,6);
});
test('candidate station rates reconcile source stage caps without resizing equipment to 247',()=>{
 for(const type of ['cast','cnc','field','energy','gas','electronic','thermal','interface','sensor','kit','integrate','calibrate','qa','package']){
  const sp=specs[type],count=Object.values(register.allocation).reduce((n,a)=>n+(a[type]||0),0);
  assert.ok(Math.abs(sp.rate*count*.7505*365-register.stages[sp.stage])<1e-6,type);
 }
 assert.equal(register.observed.enginesPerDay,247);assert.equal(register.observed.scope,'A+B combined');
});
test('measured floors are collision-free with clear ports, access points and paths',()=>{
 for(const b of Object.values(plan.buildings)){
  const occupied=new Set();for(const o of [...b.machines,...b.storage]){
   assert.ok(o.x>=0&&o.y>=0&&o.x+o.w<=b.cols&&o.y+o.h<=b.rows);
   for(let y=o.y;y<o.y+o.h;y++)for(let x=o.x;x<o.x+o.w;x++){const k=x+','+y;assert.ok(!occupied.has(k));occupied.add(k)}
  }
  const paths=new Set();for(const p of b.paths){const k=p.x+','+p.y;assert.ok(!occupied.has(k));assert.ok(!paths.has(k));paths.add(k)}
  for(const points of Object.values(b.docks))for(const p of points)assert.ok(paths.has(p.join(',')));
  for(const m of b.machines)if(specs[m.type].port==='fixed'){for(const p of [...engine.accessPoints(m,specs,false),...engine.accessPoints(m,specs,true)])assert.ok(paths.has(p.join(',')),m.type+' port access')}
 }
});
test('confirmed stock is converted once and unknown WIP/component stock is not invented; baseline generation is deterministic',()=>{
 assert.equal(register.opening.certifiedEngines,0);for(const [k,t]of Object.entries(register.openingTonnes)){const bin=plan.buildings.Receiving.storage.find(s=>s.item===k);assert.equal(bin.stock,t*1000);assert.ok(engine.storageCap(bin,materials)>=bin.stock)}assert.ok(plan.buildings.Receiving.storage.filter(s=>!Object.hasOwn(register.openingTonnes,s.item)).every(s=>s.stock===0));
 assert.equal(JSON.stringify(plan),JSON.stringify(baseline.generate(specs,materials,names)));
});
test('planning roster conserves all registered people, matches the proposed tier census and varies staffing assumptions',()=>{
 const machines=Object.values(plan.buildings).flatMap(b=>b.machines),assigned=machines.flatMap(m=>m.crew),all=[...assigned,...plan.workerPool];assert.equal(all.length,3250);assert.equal(new Set(all.map(w=>w.id)).size,3250);assert.deepEqual([1,2,3,4,5].map(t=>all.filter(w=>w.level===t).length),[1235,1235,618,146,16]);assert.ok(new Set(machines.map(m=>m.staffingRequired)).size>1);
});

test('internal chains preserve each parent material budget without buying finished internally planned parts',()=>{
 const field=baseline.billOfMaterials(specs,1,'field').raw,gas=baseline.billOfMaterials(specs,1,'gas').raw,couplers=baseline.billOfMaterials(specs,1,'interface').raw;
 for(const [k,n]of Object.entries({nickel:18,cobalt:7,copper:1.8,silver:.4,gold:.15,pgm:.05,superconductor:38}))assert.ok(Math.abs(field[k]-n)<1e-8,k);
 for(const [k,n]of Object.entries({iron:12,nickel:9,chromium:4,tibanna:16}))assert.ok(Math.abs(gas[k]-n)<1e-8,k);
 for(const [k,n]of Object.entries({iron:9,nickel:16,chromium:3}))assert.ok(Math.abs(couplers[k]-n)<1e-8,k);
 const raw=plan.sizing.perCore;for(const k of ['fieldCoil','coilWire','coilInsulation','regulator','seal','coupler'])assert.equal(raw[k],undefined,k+' must be internal');
 assert.equal(raw.insulationFeed,.12);assert.equal(raw.sealCompound,.9);assert.equal(raw.regValve,6);assert.equal(raw.regSense,6);
});
test('process order follows the declared manufacturing routes and source cycle times remain unknown',()=>{
 const order=engine.topological(specs);for(const chain of [['wireDraw','wireFinish','coilWind','coilInsulate','coilTest','field'],['regMachine','regAssemble','regTest','gas'],['sealForm','sealInspect','gas'],['couplerMachine','couplerCoat','couplerFit','interface'],['field','kit','cnc','integrate','calibrate','qa','package']])for(let i=1;i<chain.length;i++)assert.ok(order.indexOf(chain[i-1])<order.indexOf(chain[i]),chain.join(' > '));
 for(const s of Object.values(specs))assert.equal(s.cycleTimeMinutes,null);
});


test('explicit day WIP allocation respects the zero certified-engine opening balance',()=>{
 vm.runInContext(fs.readFileSync(path.join(__dirname,'../js/day-engine.js'),'utf8'),ctx);
 const state=vm.runInContext('FactoryDay.initial(FactoryBaseline.generate(SPECS,MATERIALS,BLDGS).buildings,SPECS,MATERIALS,{openingWip:750},FactoryBaseline.generate(SPECS,MATERIALS,BLDGS).workerPool)',ctx);
 assert.equal(state.wip.tested,undefined);assert.equal(state.wip.shipped,undefined);for(const inputs of Object.values(state.inputs)){assert.equal(inputs.tested,undefined);assert.equal(inputs.shipped,undefined)}for(const [id,stock]of Object.entries(state.stocks))assert.equal(stock,plan.buildings.Receiving.storage.find(s=>s.id===id).stock);
});

test('receiving reserves accommodate recorded inventory and three production days with physical load limits',()=>{
 const raw=baseline.billOfMaterials(specs,247).raw;
 for(const s of plan.buildings.Receiving.storage){
  const cap=engine.storageCap(s,materials),p=engine.storageProfile(s.item,materials),area=s.w*s.h;
  assert.equal(s.storageModel,'receiving-v1');
  assert.ok(cap>=s.stock/.85-1,s.item+' opening headroom');
  assert.ok(cap>=raw[s.item]*3*1.1-1,s.item+' replenishment capacity');
  assert.ok(cap*p.volumePerUnit<=area*p.usableVolume+1e-6,s.item+' packed volume');
  if(materials[s.item].unit==='kg')assert.ok(cap<=area*p.loadKg,s.item+' floor load');
  assert.equal(s.stock,(register.openingTonnes[s.item]||0)*1000,'capacity must not invent stock');
 }
 assert.equal(engine.storageCap({item:'iron',w:2,h:2},materials),Math.floor(4*8.8/materials.iron.volume),'legacy capacity preserved');
});

test('equipment variants retain recipes and apply independent throughput and staffing',()=>{
 for(const [type,s]of Object.entries(specs)){
  assert.ok(Object.keys(s.models).length>=2,type+' options');
  const m={type,condition:1,crew:[],upgrades:[]};
  assert.equal(engine.ratedRate(m,specs),s.rate,'legacy standard unchanged');
  for(const [model,v]of Object.entries(s.models)){
   const variant={...m,model};
   assert.equal(engine.ratedRate(variant,specs),s.rate*v.speed);
   assert.equal(engine.requiredWorkers(variant,specs),Math.min(s.operatorLimit,Math.max(1,s.workers+v.workerDelta)));
   assert.ok((v.inHouse?v.price===0:v.price>0)&&Number.isInteger(v.days)&&v.days>0);
  }
 }
 assert.ok(specs.cast.models.spartan);assert.ok(!specs.electronic.models.spartan);assert.ok(specs.electronic.models.vc);
});

test('compact process rows retain assets and provide connected worker and loading access',()=>{
 for(const [name,b]of Object.entries(plan.buildings)){
  const assets=[...b.machines,...b.storage],occupied=new Set();for(const o of assets)for(let y=o.y;y<o.y+o.h;y++)for(let x=o.x;x<o.x+o.w;x++)occupied.add(x+','+y);
  const reached=new Set(),queue=[b.docks.input[0]];for(let i=0;i<queue.length;i++){const [x,y]=queue[i],key=x+','+y;if(x<0||y<0||x>=b.cols||y>=b.rows||occupied.has(key)||reached.has(key))continue;reached.add(key);queue.push([x+1,y],[x-1,y],[x,y+1],[x,y-1])}
  for(const o of assets){const edges=o.type&&specs[o.type].port==='fixed'?engine.accessPoints(o,specs,false):[[o.x-1,o.y],[o.x+o.w,o.y],[o.x,o.y-1],[o.x,o.y+o.h]];assert.ok(edges.some(p=>reached.has(p.join(','))),name+' '+o.id+' accessible')}
  if(b.machines.length)assert.ok(occupied.size/(b.cols*b.rows)>.24,name+' avoids excessive dead space');
  const repacked=baseline.compactFloor(b,specs,materials),strip=o=>{const {x,y,...rest}=o;return rest};assert.deepEqual(repacked.machines.map(strip),b.machines.map(strip));assert.deepEqual(repacked.storage.map(strip),b.storage.map(strip));
 }
});
