const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('fs'),vm=require('vm'),path=require('path');
const c=vm.createContext({structuredClone});for(const name of ['register','data','engine','baseline'])vm.runInContext(fs.readFileSync(path.join(__dirname,'../js/'+name+'.js'),'utf8'),c);const reference=vm.runInContext(fs.readFileSync(path.join(__dirname,'reference/day-engine-v4.js'),'utf8')+';FactoryDay',vm.createContext({structuredClone,FactoryEngine:vm.runInContext('FactoryEngine',c)}));vm.runInContext(fs.readFileSync(path.join(__dirname,'../js/day-engine.js'),'utf8'),c);const {day,specs,materials,plan,upgrades}=vm.runInContext('({day:FactoryDay,specs:SPECS,materials:MATERIALS,plan:FactoryBaseline.generate(SPECS,MATERIALS,BLDGS),upgrades:UPGRADES})',c),plain=x=>JSON.parse(JSON.stringify(x));
test('numeric path searches preserve exact routes, terrain choices and fixed ports',()=>{
 const old=reference.geometry(plan.buildings,specs),next=day.geometry(plan.buildings,specs);
 for(const [name,b]of Object.entries(plan.buildings)){
  const nodes=[...b.storage,...b.machines].filter((_,i)=>i%17===0).map(m=>({...m,building:name}));
  for(let i=0;i<nodes.length;i++)for(const kind of ['walker','forklift']){
   assert.deepEqual(plain(next.approach(nodes[i],kind)),plain(old.approach(nodes[i],kind)));
   if(i)assert.deepEqual(plain(next.route(nodes[i-1],nodes[i],kind)),plain(old.route(nodes[i-1],nodes[i],kind)));
  }
 }
});
test('bitset reservation windows match the reference scheduler through congested competing paths',()=>{
 const old=new reference.Traffic(),next=new day.Traffic();let seed=19;const rand=n=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed%n};
 for(let i=0;i<500;i++){
  const horizontal=rand(2),x=rand(4),y=rand(4),length=2+rand(8),route=Array.from({length},(_,n)=>['Floor',x+(horizontal?n:0),y+(horizontal?0:n)]);if(rand(2))route.reverse();const kind=['walker','forklift','tug'][rand(3)],earliest=rand(800),latest=rand(3)?3000:800,maxStart=rand(2)?1500:Infinity;
  const a=old.reserve(route,kind,earliest,0,length-1,latest,maxStart),b=next.reserve(route,kind,earliest,0,length-1,latest,maxStart);assert.deepEqual(plain(b),plain(a),'reservation '+i);assert.equal(next.waitSeconds,old.waitSeconds);
 }
});
test('full operating-day outputs remain identical on a multi-station physical-delivery fixture',()=>{
 const materials={raw:{unit:'kg',volume:.001},tested:{unit:'each',volume:.1},shipped:{unit:'each',volume:.1}},specs={work:{rate:25,workers:1,w:1,h:1,inputs:{raw:2},outputs:{tested:1},port:'flex'},pack:{rate:40,workers:1,w:1,h:1,inputs:{tested:1},outputs:{shipped:1},port:'flex'}};
 const crew=id=>[{id:'op-'+id,role:'assembly',level:2}],b={Works:{cols:20,rows:14,machines:Array.from({length:8},(_,i)=>({id:'m'+i,type:i<4?'work':'pack',number:i+1,x:4+(i%4)*3,y:i<4?3:8,w:1,h:1,angle:0,condition:.95,crew:crew(i),upgrades:[]})),storage:[{id:'bin',item:'raw',stock:1000,x:1,y:1,w:2,h:2}],paths:[],docks:{input:[[0,5]],output:[[19,5]]}}},workers=Array.from({length:6},(_,i)=>({id:'driver'+i,role:'handling',level:2})),config={openingWip:0,forklifts:6,tugs:0,walkers:0,maintenanceTarget:.95},state=day.initial(b,specs,materials,config,workers);
 const a=plain(day.simulate(b,specs,materials,state,workers,config)),r=plain(reference.simulate(b,specs,materials,state,workers,config));delete a.traffic.conflicts;delete r.traffic.conflicts;assert.deepEqual(a,r);
});

test('reservation windows preserve exact starts across bitset and word boundaries',()=>{
 const old=new reference.Traffic(),next=new day.Traffic(),route=[['F',0,0],['F',1,0],['F',2,0]];
 for(const time of [0,31,32,33,1023,1024,1025,4096,20000,20001,21025])for(const kind of ['walker','tug']){
  assert.deepEqual(plain(next.reserve(route,kind,time,0,2,50000,45000)),plain(old.reserve(route,kind,time,0,2,50000,45000)));
 }
});

test('failed route caching stays valid across new path objects and pruning',()=>{
 const old=new reference.Traffic(),next=new day.Traffic();
 for(let i=0;i<120;i++){
  const path=[['F',0,0],['F',1,0],['F',2,0]],time=i*3,kind=i%2?'tug':'forklift';
  if(i%25===0){old.prune(time);next.prune(time)}
  assert.deepEqual(plain(next.reserve(path,kind,time,0,2,10000,time+15,'route-'+kind)),plain(old.reserve(path,kind,time,0,2,10000,time+15)));
 }
});
