const {chromium}=require('playwright'),assert=require('node:assert/strict'),path=require('node:path');
(async()=>{
 const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||'/usr/bin/chromium',headless:true,args:['--no-sandbox']});
 try{const page=await browser.newPage({viewport:{width:1700,height:1050}}),errors=[],network=[];page.on('pageerror',e=>errors.push(e.message));page.on('request',r=>{if(/^https?:/.test(r.url()))network.push(r.url())});
 const target=process.argv[2]||'http://127.0.0.1:8001/dist/ION_Campus_Planner_v3.html';await page.goto(/^https?:/.test(target)?target:'file://'+path.resolve(target));await page.waitForSelector('[data-tab]');assert.equal(await page.locator('[data-tab]').count(),6);
 await page.click('[data-campus-building="Factory A"]');await page.click('#test');await page.waitForTimeout(100);const start=Date.now();await page.locator('#zoom').fill('95');await page.locator('#zoom').dispatchEvent('input');assert.ok(Date.now()-start<3000,'editor must stay responsive while the inline worker calculates');
 await page.waitForFunction(()=>document.getElementById('status').textContent.startsWith('Tested:'),{timeout:180000});const qa=await page.evaluate(()=>tested.stage.qa.actual);assert.ok(qa>200);assert.ok(await page.evaluate(()=>tested.stage.qa.actual/tested.stage.qa.possible>.98));assert.deepEqual(errors,[]);assert.deepEqual(network.filter(url=>url!==target),[]);
 await page.click('[data-tab="Subassemblies"]');await page.screenshot({path:'/tmp/ion-campus-standalone.png'});console.log('PASS standalone file: six floors, responsive inline worker, '+qa.toFixed(2)+' certified/day, no external dependencies, no JavaScript errors.');
 }finally{await browser.close()}
})().catch(e=>{console.error(e);process.exitCode=1});
