/* Work-only motion uses the same fitted 192×128 coordinates as each atlas plate. */
function processWorkFrame(progress){return 1+Math.min(2,Math.floor(Math.max(0,Math.min(1,progress))*3))}
function drawProcessMotion(c,m,progress,clock){
 const type=SPECS[FactoryEngine.recipeType(m)].motion||FactoryEngine.recipeType(m),a=machineArtLayout(m);c.save();c.beginPath();c.rect(m.x*CELL+3,m.y*CELL+3,m.w*CELL-6,m.h*CELL-6);c.clip();c.translate(a.cx,a.cy);c.rotate(a.angle);c.scale(a.fit,a.fit);c.translate(-a.box[0]-a.box[2]/2,-a.box[1]-a.box[3]/2);
 const phase=Math.max(0,Math.min(1,progress)),pulse=(Math.sin(clock/120)+1)/2,stroke=(color,width,points)=>{c.strokeStyle=color;c.lineWidth=width;c.beginPath();points.forEach(([x,y],i)=>i?c.lineTo(x,y):c.moveTo(x,y));c.stroke()},spark=(x,y)=>{c.strokeStyle='#ffdc90';c.lineWidth=1;for(let i=0;i<5;i++){const a=clock/150+i*1.256;c.beginPath();c.moveTo(x,y);c.lineTo(x+Math.cos(a)*(4+pulse*4),y+Math.sin(a)*(4+pulse*4));c.stroke()}},arm=(side,reach=phase)=>{const tip=[96+side*(15+Math.sin(clock/500)*4),64+reach*10];stroke('#c9a245',5,[[96+side*47,36],[96+side*30,51],tip]);c.fillStyle='#495861';c.beginPath();c.arc(96+side*30,51,3,0,Math.PI*2);c.fill();return tip};
 if(type==='inserter'){c.strokeStyle='#b8dae0';c.lineWidth=2;c.beginPath();c.arc(96,108,8,clock/350,clock/350+Math.PI*.7);c.stroke();}else if(type==='cast'){
  const pouring=phase<.5,fill=Math.min(1,phase/.5),cool=Math.max(0,(phase-.63)/.37),metal=cool>0?`rgb(${Math.round(255-105*cool)},${Math.round(134+24*cool)},${Math.round(35+132*cool)})`:'#ff9c32';
  c.fillStyle='#202b30';c.strokeStyle='#8f9695';c.lineWidth=3;c.beginPath();c.roundRect(76,66,42,26,4);c.fill();c.stroke();c.save();c.beginPath();c.roundRect(80,70,34,18,2);c.clip();const molten=c.createLinearGradient(0,70,0,89);molten.addColorStop(0,cool>.4?metal:'#fff1a1');molten.addColorStop(1,metal);c.fillStyle=molten;c.fillRect(80,88-fill*18,34,fill*18);if(cool<.8){c.strokeStyle=`rgba(255,229,156,${.65*(1-cool)})`;c.lineWidth=1;for(let i=0;i<3;i++){c.beginPath();c.ellipse(97,86-fill*14,7+i*4,1.5+i,Math.sin(clock/500)*.2,0,Math.PI*2);c.stroke()}}c.restore();
  c.save();c.translate(142,43);c.rotate(pouring?-.35-Math.sin(Math.min(1,phase/.2)*Math.PI/2)*.35:-.15);c.fillStyle='#6b777e';c.strokeStyle='#b4bec0';c.lineWidth=2;c.beginPath();c.roundRect(-13,-8,26,17,5);c.fill();c.stroke();c.fillStyle=pouring?'#ffc75d':'#5e4b3c';c.beginPath();c.ellipse(0,-6,10,4,0,0,Math.PI*2);c.fill();stroke('#a8b3b8',4,[[12,-1],[23,-1]]);c.restore();
  if(pouring){const width=2.5+Math.sin(clock/85)*.4;c.strokeStyle='#ff8b2e';c.lineWidth=width+2;c.beginPath();c.moveTo(133,49);c.quadraticCurveTo(127,60,97,88-fill*18);c.stroke();c.strokeStyle='#ffe9a0';c.lineWidth=width;c.stroke();spark(97,88-fill*18)}else if(cool>.5){stroke('#a1aeb2',3,[[75,95],[75,99],[117,99],[117,95]])}
 }else if(['heat','coilInsulate'].includes(type)){
  const warm=Math.min(1,phase/.3),cool=phase>.78?1-(phase-.78)/.22:1,temperature=Math.max(.08,warm*cool),radius=type==='heat'?25:18;
  const glow=c.createRadialGradient(96,65,4,96,65,radius+6);glow.addColorStop(0,`rgba(255,${Math.round(125+95*temperature)},80,${temperature*.6})`);glow.addColorStop(.6,`rgba(245,82,25,${temperature*.5})`);glow.addColorStop(1,'rgba(255,70,10,0)');c.fillStyle=glow;c.beginPath();c.arc(96,65,radius+6,0,Math.PI*2);c.fill();
  c.strokeStyle=`rgba(255,${Math.round(90+120*temperature)},75,${.25+temperature*.7})`;c.lineWidth=2;for(const side of [-1,1]){c.beginPath();for(let y=43;y<=85;y+=4){const x=96+side*(radius-2)+(y%8?2:-2);if(y===43)c.moveTo(x,y);else c.lineTo(x,y)}c.stroke()}
  c.strokeStyle=`rgba(255,198,127,${temperature*.2})`;c.lineWidth=1;for(let i=0;i<3;i++){const x=86+i*10;c.beginPath();c.moveTo(x,56);c.bezierCurveTo(x+Math.sin(clock/600+i)*3,48,x-3,42,x+Math.sin(clock/450+i)*3,34);c.stroke()}
  c.fillStyle='#26353d';c.fillRect(128,47,5,36);c.fillStyle='#e99a4e';c.fillRect(129,81-temperature*32,3,temperature*32);
 }else if(['coilWind','wireDraw','wireFinish'].includes(type)){
  stroke('#e9bd78',2,[[25,45+phase*7],[155,58]]);c.strokeStyle='#81d1d2';c.beginPath();c.arc(65,65,24,clock/300,clock/300+1);c.stroke();
  if(type==='coilWind'){c.strokeStyle='#d5a663';for(let i=0;i<3+Math.floor(phase*8);i++){c.beginPath();c.ellipse(103+i*2,64,12,20,0,0,Math.PI*2);c.stroke()}}
 }else if(['integrate','package','field','energy','thermal'].includes(type)){
  const left=arm(-1),right=arm(1);if(m.type!=='package')spark(...(pulse>.5?left:right));else{stroke('#d5bf83',2,[[63,49],[63,85],[132,85],[132,49]]);stroke('#a7d7dd',1,[[60,47+phase*39],[135,47+phase*39]])}
 }else if(['gas','regAssemble','interface'].includes(type)){
  const x=82+phase*28;stroke('#a8bac5',4,[[45,38],[65,42],[x,57]]);c.strokeStyle='#d8b670';c.lineWidth=2;c.beginPath();c.arc(x,57,8,clock/150,clock/150+Math.PI*1.5);c.stroke();stroke('#80bfd6',2,[[128,55],[139,55],[139,78],[124,78]]);
 }else if(['electronic','sensor'].includes(type)){
  const x=70+phase*53,y=54+Math.sin(clock/350)*8;stroke('#b8cbd2',3,[[133,30],[x,38],[x,y]]);spark(x,y);for(let i=0;i<4;i++){c.fillStyle=(i+Math.floor(clock/180))%3?'#487a71':'#99e2b8';c.fillRect(70+i*12,79,5,3)}
 }else if(type==='kit'){
  stroke('#99cfcb',2,[[46,30],[46+phase*97,30],[46+phase*97,98],[46,98]]);arm(-1,phase);arm(1,phase);
 }else if(['sealForm','insulationForm'].includes(type)){
  const press=35+(Math.sin(clock/320)+1)*9;c.fillStyle='#b3bcc0';c.fillRect(83,press,28,7);c.strokeStyle='#7d9198';c.lineWidth=2;c.strokeRect(83,press,28,7);
 }else if(['contactMachine','cnc','housingMachine','regMachine','couplerMachine'].includes(type)){
  const x=66+phase*45+Math.sin(clock/650)*8;stroke('#9eb3c0',5,[[x,30],[x,52]]);spark(x,62);c.strokeStyle='#82ced3';c.lineWidth=2;c.beginPath();c.arc(x,59,5,clock/100,clock/100+4);c.stroke();
 }else if(['calibrate','qa','coilTest','regTest','sealInspect','couplerFit'].includes(type)){
  const scan=48+(Math.sin(clock/850)+1)*46;stroke('#83e4d4',2,[[scan,30],[scan,98]]);stroke('#acbbc2',4,[[scan,28],[scan,35]]);if(type==='regTest'){stroke('#93cddd',2,[[124,77],[146,77],[146,48]]);c.fillStyle='#91dcc6';c.fillRect(143,67-phase*17,6,3)}
 }else if(['finish','couplerCoat'].includes(type)){
  const spray=59+(Math.sin(clock/750)+1)*35;stroke('#9baeb7',5,[[spray,28],[spray,43]]);c.fillStyle='#a0dcea55';for(let i=0;i<18;i++)c.fillRect(spray-13+(i*13)%26,44+(i*7+clock/40)%38,2,4);for(const x of [52,140]){c.strokeStyle='#7895a5';c.lineWidth=3;c.beginPath();c.arc(x,82,7,clock/450,clock/450+Math.PI*1.7);c.stroke()}
 }else if(type==='support'){
  stroke('#b7c8d0',4,[[78,47],[89,57],[99+phase*9,66]]);spark(104,68);
 }
 c.restore();
}
