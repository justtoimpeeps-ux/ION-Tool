/* Support furnishings are illustrative floor fittings, never production machines or extra staff. */
function drawSupportInterior(c,b,cell){if(!b.facilityRole||b.machines.length||b.storage.length)return;const role=b.facilityRole,W=b.cols*cell,H=b.rows*cell;c.save();c.fillStyle='#182c37';c.strokeStyle='#86a4ab';c.lineWidth=2;
 const box=(x,y,w,h,color='#52646a')=>{c.fillStyle=color;c.beginPath();c.roundRect(x,y,w,h,5);c.fill();c.stroke()};
 if(role==='Expansion'){c.strokeStyle='#c4a74e';c.setLineDash([12,10]);c.strokeRect(cell,cell,W-2*cell,H-2*cell);c.setLineDash([])}
 else if(role==='Hangar'||role==='Landing pad'){for(let i=0;i<4;i++){const x=cell+(i%2)*(W-2*cell)/2,y=cell+Math.floor(i/2)*(H-2*cell)/2,w=(W-2*cell)/2-15,h=(H-2*cell)/2-15;box(x,y,w,h,'#35444e');c.strokeStyle='#d3b76d';c.setLineDash([8,6]);c.strokeRect(x+12,y+12,w-24,h-24);c.setLineDash([]);c.strokeStyle='#86a4ab'}}
 else if(['Quarters','Medical'].includes(role)){for(let i=0;i<8;i++){const x=cell+(i%4)*(W-2*cell)/4,y=cell*2+Math.floor(i/4)*(H-3*cell)/2;box(x,y,cell*1.4,cell*2.3,'#677e89');box(x+5,y+6,cell*1.2,cell*.55,'#b1c7c9')}}
 else if(['Power','Utilities'].includes(role)){for(let i=0;i<4;i++){const x=W*(.2+i*.2);box(x-cell*.6,H*.25,cell*1.2,H*.5,'#59686b');c.strokeStyle='#c8ad6a';c.beginPath();c.moveTo(x,H*.75);c.lineTo(x,H*.84);c.lineTo(W*.5,H*.84);c.stroke()}}
 else if(['Plaza','Parking','Security'].includes(role)){for(let i=0;i<8;i++){const x=cell+(i%4)*(W-2*cell)/4,y=cell+Math.floor(i/4)*(H-2*cell)/2;box(x,y,cell*1.7,cell*1.7,role==='Plaza'?'#526b49':'#3b4e58')}}
 else{for(let i=0;i<6;i++){const x=cell+(i%3)*(W-2*cell)/3,y=cell*2+Math.floor(i/3)*(H-3*cell)/2;box(x,y,cell*2.2,cell*.85);if(role!=='Commons'){box(x+cell*.3,y-cell*.5,cell*1.6,cell*.55,'#264c62');c.fillStyle='#70bfc9';c.fillRect(x+cell*.5,y-cell*.4,cell*1.1,cell*.25)}box(x+cell*.7,y+cell,cell*.8,cell*.65,'#354651')}}
 c.restore();
}

function drawSpartanFloor(c,b,cell){if(!b.environmentType)return;c.save();const W=b.cols*cell,H=b.rows*cell;c.strokeStyle=b.environmentType==='asteroid'?'#9cb4bf':'#ad926b';c.lineWidth=4;c.strokeRect(3,3,W-6,H-6);if(b.environmentType==='asteroid'||b.level<0){c.strokeStyle='#dbb56b';c.lineWidth=2;for(let x=12;x<W-10;x+=28){c.beginPath();c.moveTo(x,4);c.lineTo(x+9,11);c.moveTo(x,H-11);c.lineTo(x+9,H-4);c.stroke()}c.fillStyle='#182a36';c.fillRect(10,H-32,Math.min(W-20,400),22);c.fillStyle='#bdd7dc';c.font='12px system-ui';c.fillText(b.level<0?'Underground level · shared shaft access':'Enclosed module deck · protected transfer access',18,H-16)}c.restore()}
