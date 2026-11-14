/* Continuous worn repulsorlift lanes; red cells never qualify for carrier access. */
function drawRoads(c,b,cell){const lanes=FactoryEngine.cartCells(b),paths=new Set(b.paths.filter(p=>p.kind==='cart').map(p=>p.x+','+p.y));c.save();for(const p of b.paths){if(p.kind==='belt'){drawBelt(c,p);continue}if(p.kind!=='cart')continue;const x=p.x*cell,y=p.y*cell;c.fillStyle='#414f5b';c.fillRect(x,y,cell,cell);c.strokeStyle='#8593a01d';c.lineWidth=.5;c.strokeRect(x,y,cell,cell);const narrow=lanes.narrow.has(p.x+','+p.y);if(narrow){c.strokeStyle='#ed6960';c.lineWidth=2;c.strokeRect(x+2,y+2,cell-4,cell-4);continue}c.strokeStyle='#bcae7766';c.lineWidth=1;c.setLineDash([8,14]);for(const [dx,dy]of [[1,0],[-1,0],[0,1],[0,-1]])if(!paths.has((p.x+dx)+','+(p.y+dy))){c.beginPath();if(dx){c.moveTo(x+(dx>0?cell-3:3),y+2);c.lineTo(x+(dx>0?cell-3:3),y+cell-2)}else{c.moveTo(x+2,y+(dy>0?cell-3:3));c.lineTo(x+cell-2,y+(dy>0?cell-3:3))}c.stroke()}c.setLineDash([]);if((p.x*7+p.y*3)%19===0){c.fillStyle='#c4bc8c44';c.font='8px monospace';c.fillText('▰ ╎ ⋮',x+10,y+27)}}c.restore()}
function drawSpeeder(c,x,y,angle,trip,loaded,clock,result){
 const level=result.initialState.employees[trip.driver]?.level??2;
 if(trip.kind==='walker'){
  c.save();c.translate(x,y);c.rotate(angle);const stride=Math.sin(clock/130)*3;
  c.fillStyle='#07121c55';c.beginPath();c.ellipse(0,4,9,7,0,0,Math.PI*2);c.fill();
  c.strokeStyle='#9aafbd';c.lineWidth=3;c.beginPath();c.moveTo(-1,-3);c.lineTo(-7,-4+stride);c.moveTo(-1,3);c.lineTo(-7,4-stride);c.stroke();
  c.fillStyle='#df9b3b';c.fillRect(-4,-5,9,10);c.fillStyle=workerColor(level);c.beginPath();c.arc(3,0,4,0,Math.PI*2);c.fill();
  if(loaded)IONArt.item(c,trip.item,11,0,14);c.restore();return;
 }
 c.save();c.translate(x,y);c.rotate(angle);const bob=Math.sin(clock/400+x)*.7;c.fillStyle='#07121c66';c.beginPath();c.ellipse(0,5,24,17,0,0,Math.PI*2);c.fill();c.translate(0,bob);c.scale(1.02,1.02);c.fillStyle='#889b9e';c.strokeStyle='#233945';c.lineWidth=1.5;c.beginPath();c.roundRect(-22,-16,44,32,6);c.fill();c.stroke();c.fillStyle='#304b59';c.fillRect(-19,-12,13,24);c.fillStyle='#bba37c';c.fillRect(-19,-16,38,3);c.fillStyle='#88b5bf';c.fillRect(-24,-12,5,6);c.fillRect(-24,6,5,6);c.fillStyle=workerColor(level);c.fillRect(-15,-4,7,8);c.fillStyle='#273d48';c.fillRect(-4,-13,25,26);if(loaded){IONArt.item(c,trip.item,9,0,26,27);c.fillStyle=materialColor(trip.item);c.fillRect(18,11,3,2)}c.restore();
}
function campusCarrierMarkup(trip,position){
 const p=position,walk=trip.kind==='walker',title=escapeHtml(transportName(trip.kind,trip.vehicle)+' · '+(p.loaded?fmt(trip.amount)+' '+MATERIALS[trip.item].title:'empty')+' · '+trip.driver);
 const body=walk?'<circle r=".55" fill="#df9b3b"/><circle cx=".4" r=".25" fill="#e8edf0"/>':'<rect x="-1.4" y="-.7" width="2.8" height="1.4" rx=".3" fill="#889b9e" stroke="#081923" stroke-width=".3"/><rect x="-.95" y="-.45" width=".65" height=".9" fill="#304b59"/><path d="M-1.5 -.4v.8" stroke="#88b5bf" stroke-width=".3"/>';
 const cargo=p.loaded?'<rect data-cargo="'+escapeHtml(trip.item)+'" x=".15" y="-.4" width=".85" height=".8" rx=".12" fill="'+materialColor(trip.item)+'" stroke="#1e3039" stroke-width=".15"/>':'';
 return '<g data-carrier="'+(walk?'walker':'speeder')+'" transform="translate('+p.x+' '+p.y+') rotate('+p.angle*180/Math.PI+')">'+body+cargo+'<title>'+title+'</title></g>';
}

function transportName(kind,id){return ({tug:'Heavy cargo speeder',forklift:'Light cargo speeder',walker:'Walking handler',belt:'Conveyor'}[kind]||'Carrier')+' '+String(id).split('-').at(-1)}

function drawLoadingZones(c,b,cell){for(const zone of FactoryEngine.loadingCells(b)){const s=b.storage.find(s=>s.id===zone.storageId),x=zone.x*cell,y=zone.y*cell;c.save();c.fillStyle='#253b44';c.fillRect(x,y,cell,cell);c.strokeStyle='#68c8c4';c.lineWidth=2;c.strokeRect(x+3,y+3,cell-6,cell-6);c.strokeStyle='#c9b36d';c.lineWidth=3;for(let i=5;i<cell-6;i+=9){c.beginPath();c.moveTo(x+i,y+3);c.lineTo(x+i+4,y+7);c.moveTo(x+i,y+cell-7);c.lineTo(x+i+4,y+cell-3);c.stroke()}c.globalAlpha=.4;IONArt.item(c,s.item,x+cell/2,y+cell/2,cell*.57,cell*.57);c.globalAlpha=1;c.strokeStyle='#a0d8d1';c.lineWidth=2;c.beginPath();c.moveTo(x+10,y+cell*.66);c.lineTo(x+10,y+12);c.lineTo(x+15,y+17);c.moveTo(x+cell-10,y+12);c.lineTo(x+cell-10,y+cell*.66);c.lineTo(x+cell-15,y+cell*.66-5);c.stroke();c.restore()}}
