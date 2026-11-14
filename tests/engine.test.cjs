const {test}=require('node:test');
const assert=require('node:assert/strict');
const Engine=require('../js/engine.js');
const materials={a:{volume:1},b:{volume:1},c:{volume:2},tested:{volume:1}};
const spec=(inputs,outputs,extra={})=>({rate:24,workers:1,inputs,outputs,port:'flex',...extra});
const machine=(id,type,x=0)=>({id,type,x,y:0,w:1,h:1,angle:0,number:1,condition:1,crew:[{id:id+'worker',level:5}]});
const building=(machines=[],storage=[],paths=[])=>({machines,storage,paths});
test('missing ingredient does not consume any part of a recipe',()=>{
 const specs={mix:spec({a:1,b:1},{tested:1})};
 const r=Engine.simulate({A:building([machine('mix','mix')])},specs,materials,{supply:{a:24,b:0}});
 assert.equal(r.machines.mix,0);assert.equal(r.remainingSupply.a,24);
});
test('production is limited by complete recipes and staffing',()=>{
 const specs={mix:spec({a:2,b:1},{tested:1})};
 const r=Engine.simulate({A:building([machine('mix','mix')])},specs,materials,{supply:{a:12,b:24}});
 assert.ok(Math.abs(r.machines.mix-6)<1e-5);assert.ok(Math.abs(r.remainingSupply.a)<1e-5);assert.ok(Math.abs(r.remainingSupply.b-18)<1e-5);
 const m=machine('empty','mix');m.crew=[];
 assert.equal(Engine.simulate({A:building([m])},specs,materials,{supply:{a:100,b:100}}).machines.empty,0);
});
test('a blocked output stops upstream production at buffer capacity',()=>{
 const specs={source:spec({a:1},{c:1})};
 const r=Engine.simulate({A:building([machine('s','source')])},specs,materials,{supply:{a:100}});
 assert.ok(Math.abs(r.machines.s-4.8)<1e-6);assert.ok(r.details.s.blocked>0);
});
test('dock limit is shared by all machines and measured in cargo volume',()=>{
 const specs={source:spec({a:1},{c:1}),target:spec({c:1},{tested:1})};
 const r=Engine.simulate({A:building([machine('s','source'),machine('s2','source',2)]),B:building([machine('t','target'),machine('t2','target',2)])},specs,materials,{supply:{a:100},dockCapacity:12});
 assert.ok(Math.abs(r.stage.target.actual-6)<1e-4);
 assert.ok(r.links[0].total<=12+1e-5);assert.equal(r.links.length,1);
});
test('walkway capacity respects cargo volume, and disconnected machines cannot transfer',()=>{
 const specs={source:spec({a:1},{c:1}),target:spec({c:1},{tested:1})};
 const paths=[1,2,3].map(x=>({x,y:0,kind:'walk',dir:0}));
 const b=building([machine('s','source'),machine('t','target',4)],[],paths);
 const r=Engine.simulate({A:b},specs,materials,{supply:{a:100}});
 assert.ok(Math.abs(r.machines.t-11)<1e-4);
 assert.ok(Object.values(r.traffic.A).every(t=>t.total<=22+1e-5));
 b.paths=[];assert.equal(Engine.simulate({A:b},specs,materials,{supply:{a:100}}).machines.t,0);
});
test('fixed output port and belt direction must connect to target input',()=>{
 const specs={source:spec({a:1},{c:1},{port:'fixed'}),target:spec({c:1},{tested:1},{port:'fixed'})};
 const b=building([machine('s','source'),machine('t','target',4)],[],[1,2,3].map(x=>({x,y:0,kind:'belt',cargo:'c',dir:0})));
 assert.ok(Engine.simulate({A:b},specs,materials,{supply:{a:100}}).machines.t>0);
 b.paths[1].dir=2;assert.equal(Engine.simulate({A:b},specs,materials,{supply:{a:100}}).machines.t,0);
 b.paths[1].dir=0;b.machines[0].angle=2;assert.equal(Engine.simulate({A:b},specs,materials,{supply:{a:100}}).machines.t,0);
});
test('storage stock is finite and simulation is repeatable without mutating layout',()=>{
 const specs={target:spec({c:1},{tested:1})};
 const b=building([machine('t','target',2)],[{id:'store',item:'c',x:0,y:0,w:1,h:1,stock:3}],[{x:1,y:0,kind:'cart',dir:0}]);
 const before=JSON.stringify(b);const a=Engine.simulate({A:b},specs,materials);
 assert.ok(Math.abs(a.machines.t-3)<1e-5);assert.equal(JSON.stringify(b),before);assert.deepEqual(Engine.simulate({A:b},specs,materials),a);
});
test('cyclic recipes are rejected clearly',()=>assert.throws(()=>Engine.topological({one:spec({a:1},{b:1}),two:spec({b:1},{a:1})}),/cycle/));
