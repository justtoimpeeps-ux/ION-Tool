const {test}=require('node:test'),assert=require('node:assert/strict'),Engine=require('../js/engine.js');
const materials={raw:{volume:1},tested:{volume:1}},specs={work:{rate:24,workers:2,inputs:{raw:1},outputs:{tested:1},port:'flex'}};
const worker=id=>({id,level:5}),m=()=>({id:'m',type:'work',number:1,x:3,y:0,w:1,h:1,angle:0,condition:1,crew:[worker('one'),worker('two')],upgrades:[]});
const b=(machines=[],storage=[])=>({machines,storage,paths:[1,2].flatMap(y=>[0,1,2,3,4].map(x=>({x,y,kind:'cart',dir:0}))),docks:{input:[[0,1]],output:[[4,1]]}});
const store=()=>({id:'raw-bin',item:'raw',stock:0,x:1,y:0,w:1,h:1,receiving:true});
test('receiving deliveries trace a physical inbound route and cannot teleport when disconnected',()=>{
 const campus={Receiving:b([m()],[store()])},options={supply:{raw:24},receiving:'Receiving',requireDocks:true};
 const r=Engine.simulate(campus,specs,materials,options);assert.ok(Math.abs(r.machines.m-24)<1e-4);assert.ok(r.routes.some(r=>r.from==='Receiving-input'));assert.ok(r.routes.some(r=>r.from==='raw-bin'&&r.to==='m'));
 campus.Receiving.paths=campus.Receiving.paths.filter(p=>p.x!==0);
 assert.equal(Engine.simulate(campus,specs,materials,options).machines.m,0);
});
test('cross-building deliveries require local routes at both ends',()=>{
 const campus={Receiving:b([],[store()]),Workshop:b([m()])},options={supply:{raw:24},receiving:'Receiving',requireDocks:true};
 const r=Engine.simulate(campus,specs,materials,options);assert.ok(r.machines.m>0);assert.ok(r.routes.some(r=>r.building==='Receiving'&&r.interbuilding));assert.ok(r.routes.some(r=>r.building==='Workshop'&&r.interbuilding));
 campus.Workshop.paths=[];assert.equal(Engine.simulate(campus,specs,materials,options).machines.m,0);
});
test('transport efficiency follows belt, cart, then walking',()=>{assert.ok(Engine.pathCapacity({kind:'belt'})>Engine.pathCapacity({kind:'cart'}));assert.ok(Engine.pathCapacity({kind:'cart'})>Engine.pathCapacity({kind:'walk'}))});
test('industrial upgrades affect rate and required staffing; overtime scales the candidate day',()=>{
 const machine=m(),catalog={auto:{speed:1.25,workerReduction:1}};machine.crew=[worker('one')];
 const before=Engine.effectiveRate(machine,specs,catalog);machine.upgrades=['auto'];assert.equal(Engine.requiredWorkers(machine,specs,catalog),1);assert.ok(Engine.effectiveRate(machine,specs,catalog)>before);
 const options={supply:{raw:100},upgrades:catalog},normal=Engine.simulate({W:b([machine])},specs,materials,{...options,hours:9}),overtime=Engine.simulate({W:b([machine])},specs,materials,{...options,hours:12});
 assert.ok(Math.abs(overtime.machines.m/normal.machines.m-12/9)<1e-5);
});
test('warm-up is calculation-only and reported output covers one day, not the whole warm-up',()=>{
 const campus={Receiving:b([m()],[store()])},before=JSON.stringify(campus);
 const result=Engine.simulate(campus,specs,materials,{supply:{raw:24},receiving:'Receiving',requireDocks:true,warmupDays:2});
 assert.equal(result.warmupDays,2);assert.equal(result.dailyOutputs.length,3);assert.ok(Math.abs(result.machines.m-24)<1e-4);assert.ok(result.dailyOutputs.every(n=>Math.abs(n-24)<1e-4));assert.equal(JSON.stringify(campus),before);
});
test('empty floor is walkable when enabled and daily input supply/need are reported',()=>{
 const campus={Receiving:{...b([m()],[store()]),cols:6,rows:3,paths:[]}};
 const result=Engine.simulate(campus,specs,materials,{supply:{raw:10},receiving:'Receiving',requireDocks:true,implicitWalk:true});
 assert.ok(result.machines.m>0);assert.equal(result.details.m.inputNeed.raw,24);assert.ok(Math.abs(result.details.m.inputSupply.raw-result.machines.m)<1e-6);
 const blocked=Engine.simulate(campus,specs,materials,{supply:{raw:10},receiving:'Receiving',requireDocks:true});assert.equal(blocked.machines.m,0);
});
test('station-specific operator requirements affect staffing without changing the recipe',()=>{
 const machine=m();machine.crew=[worker('one')];const before=Engine.effectiveRate(machine,specs);machine.staffingRequired=1;assert.equal(Engine.requiredWorkers(machine,specs),1);assert.ok(Engine.effectiveRate(machine,specs)>before);
});
test('multi-unit batches have output buffers scaled by batch quantity',()=>{
 const mats={raw:{volume:.001},coil:{volume:.001},tested:{volume:.001}},sp={source:{rate:24,workers:1,inputs:{raw:1},outputs:{coil:18},port:'flex'},end:{rate:24,workers:1,inputs:{coil:18},outputs:{tested:1},port:'flex'}};
 const src={id:'s',type:'source',number:1,x:0,y:0,w:1,h:1,angle:0,condition:1,crew:[worker('sworker')]},end={...src,id:'e',type:'end',x:2,crew:[worker('eworker')]};
 const result=Engine.simulate({A:b([src]),B:b([end])},sp,mats,{supply:{raw:100}});assert.ok(Math.abs(result.stage.end.actual-24)<1e-5);
});
test('shared front-door input/output access rotates with the actual footprint',()=>{
 const sp={work:{...specs.work,w:3,h:2,port:'fixed',access:[{kind:'in',side:'bottom',position:.5},{kind:'out',side:'bottom',position:.5}]}},machine={...m(),x:2,y:2,w:3,h:2};assert.deepEqual(Engine.accessPoints(machine,sp,false),[[3,4]]);assert.deepEqual(Engine.accessPoints(machine,sp,true),[[3,4]]);machine.angle=1;machine.w=2;machine.h=3;assert.deepEqual(Engine.accessPoints(machine,sp,false),[[1,3]]);
});
