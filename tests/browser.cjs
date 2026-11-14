const {chromium}=require('playwright'),assert=require('node:assert/strict');
(async()=>{
 const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||'/usr/bin/chromium',headless:true,args:['--no-sandbox']});
 try{
  const page=await browser.newPage({viewport:{width:1700,height:1050}}),errors=[],dialogs=[];
  page.on('pageerror',e=>errors.push(e.message));page.on('dialog',async d=>{dialogs.push(d.message());await d.accept()});
  await page.goto(process.argv[2]||'http://127.0.0.1:8001');await page.waitForSelector('[data-tab]');
  assert.equal(await page.locator('[data-tab]').count(),6);assert.equal(await page.evaluate(()=>Object.values(buildings).reduce((n,b)=>n+b.machines.length,0)),934);assert.equal(await page.locator('#feeds input').count(),20);
  const run=async()=>{console.time('campus forecast');await page.click('#test');await page.waitForFunction(()=>document.getElementById('status').textContent.startsWith('Tested:'),{timeout:180000});console.timeEnd('campus forecast');return page.evaluate(()=>({qa:tested.stage.qa.actual,routes:tested.routes.length,receiving:tested.routes.filter(r=>r.building==='Receiving').length,hours:tested.hours,warmup:tested.warmupDays,days:tested.dailyOutputs}))};
  const initial=await run();console.log('Initial scenario',initial);assert.ok(Math.abs(initial.qa-247)<3);assert.equal(initial.warmup,2);assert.equal(initial.days.length,3);assert.ok(initial.days.every(Number.isFinite));assert.ok(initial.receiving>0);assert.equal(initial.hours,9);assert.ok((await page.locator('#summary').innerText()).includes('247 engines / 9-hour day'));
  await page.locator('#zoom').fill('60');await page.locator('#zoom').dispatchEvent('input');
  const point=async(x,y)=>{const box=await page.locator('#floor').boundingBox(),cell=box.width/await page.evaluate(()=>COLS);return {x:box.x+x*cell,y:box.y+y*cell}};
  const click=async(x,y)=>{const p=await point(x,y);await page.mouse.click(p.x,p.y)};
  await click(2.5,2.5);await page.locator('#refit').waitFor();const before=await page.evaluate(()=>capacity(selected));
  await page.locator('[data-upgrade="tooling"]').click();assert.ok(await page.evaluate(()=>capacity(selected))>before);assert.ok((await page.locator('#cost').innerText())!=='0 Cr');await page.click('#undo');
  await click(2.5,2.5);const condition=await page.evaluate(()=>selected.condition);await page.click('#refit');assert.ok(await page.evaluate(()=>selected.condition)>condition);await page.click('#undo');
  await click(2.5,2.5);await page.mouse.move((await point(2.5,2.5)).x,(await point(2.5,2.5)).y);assert.ok((await page.locator('#tooltip').innerText()).includes('182 kg Iron'));
  // Actual placement, drag movement and erase, with full undo restoration.
  const placement=await page.evaluate(()=>{const b=buildings[active],s=SPECS[catalog];for(let y=1;y<10;y++)for(let x=1;x<30;x++){const o={x,y,w:s.w,h:s.h};if(valid(b,o)&&!Object.values(b.docks).flat().some(([x,y])=>contains(o,{x,y,w:1,h:1})))return o}throw Error('No test placement')});
  await page.click('[data-tool="place"]');await click(placement.x+.5,placement.y+.5);assert.equal(await page.evaluate(()=>buildings['Factory A'].machines.length),205);
  await page.click('[data-tool="select"]');let a=await point(placement.x+.5,placement.y+.5),z=await point(placement.x+.5,placement.y+1.5);await page.mouse.move(a.x,a.y);await page.mouse.down();await page.mouse.move(z.x,z.y);await page.mouse.up();assert.equal(await page.evaluate(()=>buildings['Factory A'].machines.at(-1).y),placement.y+1);
  await page.click('[data-tool="erase"]');await click(placement.x+.5,placement.y+1.5);assert.equal(await page.evaluate(()=>buildings['Factory A'].machines.length),204);
  await page.click('#undo');await page.click('#undo');await page.click('#undo');assert.equal(await page.evaluate(()=>buildings['Factory A'].machines.length),204);
  await page.click('[data-tool="select"]');await click(2.5,2.5);await page.locator('[data-upgrade="tooling"]').click();
  // Physical area selection and scoped collaborative import.
  await page.click('[data-tool="area"]');a=await point(1.2,1.2);z=await point(6.8,5.8);await page.mouse.move(a.x,a.y);await page.mouse.down();await page.mouse.move(z.x,z.y);await page.mouse.up();assert.equal(await page.locator('#scope').inputValue(),'area');
  async function exported(scope){await page.selectOption('#scope',scope);const promise=page.waitForEvent('download');await page.click('#export');const d=await promise,s=await d.createReadStream(),chunks=[];for await(const c of s)chunks.push(c);return JSON.parse(Buffer.concat(chunks).toString())}
  const areaData=await exported('area');assert.equal(areaData.buildings['Factory A'].machines.length,1);assert.equal(areaData.proposedWork.length,1);assert.ok(areaData.proposedWork[0].cost>0);
  await page.evaluate(()=>{snapshot();buildings['Factory A'].machines[0].condition=.4;buildings['Factory A'].machines[1].condition=.6;commit(0,0,'Test scoped replacement')});
  async function imported(data){const count=dialogs.length;await page.setInputFiles('#file',{name:'plan.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify(data))});await page.waitForFunction(n=>document.getElementById('saveState').textContent.length>0,count);await page.waitForTimeout(200)}
  await imported(areaData);assert.equal(await page.evaluate(()=>buildings['Factory A'].machines[0].condition),.95);assert.equal(await page.evaluate(()=>buildings['Factory A'].machines[1].condition),.6);assert.equal(await page.evaluate(()=>expenses.filter(e=>e.cost>0).length),1);const buildingData=await exported('building');await imported(buildingData);assert.equal(await page.evaluate(()=>expenses.filter(e=>e.cost>0).length),1);
  await page.locator('details').filter({has:page.locator('#feeds')}).locator('summary').click();await page.fill('#feed-iron','60000');await page.locator('#feed-iron').blur();const campus=await exported('campus');assert.equal(campus.scenario.supply.iron,60000);
  const original=await page.evaluate(()=>JSON.stringify(buildings)),broken=structuredClone(campus);broken.buildings['Factory A'].machines[0].condition=.1;broken.buildings['Final Assembly & Test'].paths[0].kind='broken';await imported(broken);assert.equal(await page.evaluate(()=>JSON.stringify(buildings)),original);assert.ok(dialogs.some(s=>s.startsWith('Import failed:')));
  await imported(campus);assert.ok(dialogs.some(s=>s.startsWith('Blueprint imported.')));await page.reload();assert.equal(await page.locator('#feed-iron').inputValue(),'60000');assert.equal(await page.evaluate(()=>buildings['Factory A'].machines[1].condition),.6);
  await run();await page.click('[data-tab="Subassemblies"]');await page.evaluate(()=>{document.querySelector('aside').scrollTop=0;document.querySelector('aside.right').scrollTop=0});
  assert.deepEqual(errors,[]);await page.screenshot({path:'/tmp/ion-campus-validated.png'});
  console.log('PASS: source totals, six floors, receiving flow, reference vs forecast, upgrades/refit/undo, tile details, pointer placement/move/erase, scoped area import, atomic rejection, campus round-trip, resource and floor persistence; no page errors.');
 }finally{await browser.close()}
})().catch(e=>{console.error(e);process.exitCode=1});
