const {chromium}=require('playwright'),assert=require('node:assert/strict');
(async()=>{const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||'/usr/bin/chromium',headless:true,args:['--no-sandbox']});try{
 const page=await browser.newPage({viewport:{width:1700,height:1050}}),errors=[];page.on('pageerror',e=>errors.push(e.message));await page.goto(process.argv[2]||'http://127.0.0.1:8001');await page.waitForSelector('[data-tab]');assert.equal(await page.evaluate(()=>tool),'select');
 const point=async(x,y)=>{const b=await page.locator('#floor').boundingBox(),cols=await page.evaluate(()=>COLS);return{x:b.x+x*b.width/cols,y:b.y+y*b.width/cols}};
 const drag=async(ax,ay,bx,by)=>{const a=await point(ax,ay),b=await point(bx,by);await page.mouse.move(a.x,a.y);await page.mouse.down();const paints=await page.evaluate(()=>globalThis.__paints);await page.mouse.move(b.x,b.y,{steps:8});assert.equal(await page.evaluate(()=>globalThis.__paints),paints,'drag should not repaint the base floor');await page.mouse.up()};
 await page.evaluate(()=>{globalThis.__paints=0;const original=paint;paint=function(){globalThis.__paints++;return original()}});
 for(const zoom of ['65','125']){await page.locator('#zoom').fill(zoom);await page.locator('#zoom').dispatchEvent('input');const original=await page.evaluate(()=>JSON.stringify(buildings['Factory A']));
  const p=await point(2.5,2.5);await page.mouse.click(p.x,p.y);assert.ok(await page.evaluate(()=>selected?.type==='cast'));assert.equal(await page.evaluate(()=>history.length),0);
  await drag(2.5,2.5,2.5,3.5);assert.equal(await page.evaluate(()=>buildings['Factory A'].machines[0].y),3);assert.equal(await page.evaluate(()=>expenses.at(-1).cost),2400);await page.click('#undo');assert.equal(await page.evaluate(()=>JSON.stringify(buildings['Factory A'])),original);
  await drag(2.5,2.5,7.5,2.5);assert.equal(await page.evaluate(()=>history.length),0);assert.equal(await page.evaluate(()=>JSON.stringify(buildings['Factory A'])),original);
 }
 await page.locator('#zoom').fill('75');await page.locator('#zoom').dispatchEvent('input');
 await drag(1.5,1.5,2.5,1.5);assert.equal(await page.evaluate(()=>!!pathAt(buildings[active],1,1)),false);assert.ok(await page.evaluate(()=>!!pathAt(buildings[active],2,1)));await page.click('#undo');
 await page.evaluate(()=>{const a=pathAt(buildings[active],1,1),b=pathAt(buildings[active],1,2);a.kind='belt';a.cargo='iron';a.dir=2;b.kind='walk';paint()});
 await drag(1.5,1.5,1.5,2.5);assert.equal(await page.evaluate(()=>pathAt(buildings[active],1,1).kind),'walk');assert.equal(await page.evaluate(()=>pathAt(buildings[active],1,2).cargo),'iron');assert.equal(await page.evaluate(()=>pathAt(buildings[active],1,2).dir),2);await page.click('#undo');
 const before=await page.evaluate(()=>JSON.stringify(buildings[active]));await drag(1.5,1.5,3.5,3.5);assert.equal(await page.evaluate(()=>JSON.stringify(buildings[active])),before);assert.equal(await page.evaluate(()=>history.length),0);
 await drag(1.5,5.5,2.5,1.5);assert.equal(await page.evaluate(()=>JSON.stringify(buildings[active])),before);
 await page.click('[data-tab="Receiving"]');await drag(2.5,2.5,2.5,3.5);assert.equal(await page.evaluate(()=>buildings.Receiving.storage[0].y),3);await page.click('#undo');assert.equal(await page.evaluate(()=>buildings.Receiving.storage[0].y),2);
 assert.deepEqual(errors,[]);console.log('PASS direct Inspect-mode drag: click inspection, equipment at 65%/125% zoom, collision rejection, storage, path relocation and swapping, locked docks, Undo, cost tracking; no page errors.');
}finally{await browser.close()}})().catch(e=>{console.error(e);process.exitCode=1});
