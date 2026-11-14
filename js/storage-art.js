/* Discrete stockpiles. Fixed handling quantities affect presentation only, never inventory. */
const StockpileArt=(()=>{
 const bulk={iron:1000,nickel:1000,cobalt:1000,chromium:1000,copper:1000,silver:1000,gold:1000,pgm:1000,superconductor:250,ceramic:500,tibanna:200,electronicsFeed:100,coolant:200,insulationFeed:250,sealCompound:250};
 const packs={fieldCoil:12,regulator:6,seal:100,processor:25,coupler:8,sensorModule:10,safingModule:10,coilWireRaw:12,coilWire:12,coilInsulation:12,woundCoil:12,insulatedCoil:12,regBlank:6,regUntested:6,sealRaw:100,contact:100,couplerBlank:8,couplerCoated:8,regValve:25,regSense:25};
 function plan(s,amount,capacity,materials){const quantity=Math.max(0,Number.isFinite(amount)?amount:0),packageSize=materials[s.item].storagePackageQuantity||bulk[s.item]||packs[s.item]||1,fullPackages=Math.floor(quantity/packageSize),remainder=Math.max(0,quantity-fullPackages*packageSize),packageCount=fullPackages+(remainder>1e-8?1:0),W=s.w*48-12,H=s.h*48-28,maxSlots=Math.max(1,Math.min(400,Math.floor(W/43)*Math.floor(H/39)-(s.loadingZones?.length||0)*4)),packagesPerPile=Math.max(1,Math.ceil(Math.ceil(capacity/packageSize)/maxSlots)),pileCount=Math.ceil(packageCount/packagesPerPile),columns=Math.max(1,Math.min(Math.floor(W/43)||1,Math.floor(W/43)||1)),piles=[];
  for(let i=0;i<pileCount;i++){const q=Math.min(packageSize*packagesPerPile,Math.max(0,quantity-i*packageSize*packagesPerPile)),packages=Math.ceil(q/packageSize-1e-10);piles.push({quantity:q,packages,layers:Math.max(1,Math.min(4,Math.ceil(packages/Math.max(1,packagesPerPile/4))))})}
  return {quantity,packageSize,fullPackages,remainder,packageCount,packagesPerPile,pileCount,columns,piles,unit:materials[s.item].unit};
 }
 return {plan};
})();
if(typeof module!=='undefined')module.exports=StockpileArt;
const storageArtCache=new Map();
function storageStockLayer(s,plan,W,H){const visualKey=[Object.keys(IONArt.images).length,s.item,s.w,s.h,JSON.stringify(s.loadingZones||[]),plan.packageSize,plan.packagesPerPile,plan.columns,...plan.piles.map(p=>p.layers)].join(':'),previous=storageArtCache.get(s.id);if(previous?.key===visualKey)return previous.canvas;
 const image=document.createElement('canvas'),scale=Math.min(1,1200/Math.max(W,H));image.width=Math.ceil(W*scale);image.height=Math.ceil(H*scale);const c=image.getContext('2d');c.scale(scale,scale);const columns=plan.columns,cw=Math.min(60,(W-12)/columns),rows=Math.ceil(plan.pileCount/columns),ch=Math.min(54,(H-15)/Math.max(1,rows));
 const spots=[];for(let row=0;row<Math.floor((H-8)/ch);row++)for(let col=0;col<columns;col++){const x=6+(col+.5)*cw,y=7+(row+.5)*ch,size=Math.min(48,cw-5,ch-3);if(!(s.loadingZones||[]).some(([dx,dy])=>x+size/2>dx*48-2&&x-size/2<(dx+1)*48-2&&y+size/2>dy*48-2&&y-size/2<(dy+1)*48-2))spots.push({x,y,size})}
 for(let i=0;i<plan.pileCount&&i<spots.length;i++){const pile=plan.piles[i],{x,y,size}=spots[i];c.fillStyle='#0b172540';c.beginPath();c.ellipse(x,y+size*.26,size*.48,size*.24,0,0,Math.PI*2);c.fill();const gas=s.item==='tibanna',large=MATERIALS[s.item].volume>=1;if(gas)IONArt.container(c,'gasVat',x,y,size*1.12,size);else if(large)IONArt.item(c,s.item,x,y,size,size*.85);else{IONArt.container(c,'metalChest',x,y,size*1.18,size);c.save();c.beginPath();c.ellipse(x,y-size*.05,size*.34,size*.23,0,0,Math.PI*2);c.clip();for(let layer=0;layer<pile.layers;layer++)IONArt.item(c,s.item,x+(layer%2)*1.2,y-layer*2-size*.04,size*.75,size*.61);c.restore()}}

 if(storageArtCache.size>90)storageArtCache.delete(storageArtCache.keys().next().value);storageArtCache.set(s.id,{key:visualKey,canvas:image});return image;
}
