/* Work-only motion uses the same fitted 192×128 coordinates as each atlas plate. */
function processWorkFrame(progress){return 1+Math.min(2,Math.floor(Math.max(0,Math.min(1,progress))*3))}
function drawProcessMotion(c,m,progress,clock){
 const W=m.w*CELL,H=m.h*CELL,top=H<=CELL?4:36,bodyH=H-top-15,angle=(m.angle||0)*Math.PI/2,iw=m.angle%2?bodyH:W-10,ih=m.angle%2?W-10:bodyH,fit=Math.min(iw/192,ih/128);
 c.save();c.translate(m.x*CELL+W/2,m.y*CELL+top+bodyH/2);c.rotate(angle);c.scale(fit,fit);c.translate(-96,-64);
 const phase=Math.max(0,Math.min(1,progress)),pulse=(Math.sin(clock/120)+1)/2,stroke=(color,width,points)=>{c.strokeStyle=color;c.lineWidth=width;c.beginPath();points.forEach(([x,y],i)=>i?c.lineTo(x,y):c.moveTo(x,y));c.stroke()},spark=(x,y)=>{c.strokeStyle='#ffdc90';c.lineWidth=1;for(let i=0;i<5;i++){const a=clock/150+i*1.256;c.beginPath();c.moveTo(x,y);c.lineTo(x+Math.cos(a)*(4+pulse*4),y+Math.sin(a)*(4+pulse*4));c.stroke()}},arm=(side,reach=phase)=>{const tip=[96+side*(15+Math.sin(clock/500)*4),64+reach*10];stroke('#c9a245',5,[[96+side*47,36],[96+side*30,51],tip]);c.fillStyle='#495861';c.beginPath();c.arc(96+side*30,51,3,0,Math.PI*2);c.fill();return tip};
 if(m.type==='cast'){
  c.fillStyle='rgba(255,143,45,'+(.25+pulse*.25)+')';c.fillRect(82,69,28,20);c.strokeStyle='#ffd384';c.lineWidth=3;c.beginPath();c.moveTo(143,55);c.quadraticCurveTo(128,53,96,76+phase*5);c.stroke();spark(96,77);
 }else if(['heat','coilInsulate'].includes(m.type)){
  c.fillStyle='rgba(255,143,45,'+(.15+pulse*.2)+')';c.beginPath();c.arc(96,65,m.type==='heat'?24:17,0,Math.PI*2);c.fill();stroke('#e7a661',2,[[69,45],[69,86],[123,86],[123,45]]);
 }else if(['coilWind','wireDraw','wireFinish'].includes(m.type)){
  stroke('#e9bd78',2,[[25,45+phase*7],[155,58]]);c.strokeStyle='#81d1d2';c.beginPath();c.arc(65,65,24,clock/300,clock/300+1);c.stroke();
  if(m.type==='coilWind'){c.strokeStyle='#d5a663';for(let i=0;i<3+Math.floor(phase*8);i++){c.beginPath();c.ellipse(103+i*2,64,12,20,0,0,Math.PI*2);c.stroke()}}
 }else if(['integrate','package','field','energy','thermal'].includes(m.type)){
  const left=arm(-1),right=arm(1);if(m.type!=='package')spark(...(pulse>.5?left:right));else{stroke('#d5bf83',2,[[63,49],[63,85],[132,85],[132,49]]);stroke('#a7d7dd',1,[[60,47+phase*39],[135,47+phase*39]])}
 }else if(['gas','regAssemble','interface'].includes(m.type)){
  const x=82+phase*28;stroke('#a8bac5',4,[[45,38],[65,42],[x,57]]);c.strokeStyle='#d8b670';c.lineWidth=2;c.beginPath();c.arc(x,57,8,clock/150,clock/150+Math.PI*1.5);c.stroke();stroke('#80bfd6',2,[[128,55],[139,55],[139,78],[124,78]]);
 }else if(['electronic','sensor'].includes(m.type)){
  const x=70+phase*53,y=54+Math.sin(clock/350)*8;stroke('#b8cbd2',3,[[133,30],[x,38],[x,y]]);spark(x,y);for(let i=0;i<4;i++){c.fillStyle=(i+Math.floor(clock/180))%3?'#487a71':'#99e2b8';c.fillRect(70+i*12,79,5,3)}
 }else if(m.type==='kit'){
  stroke('#99cfcb',2,[[46,30],[46+phase*97,30],[46+phase*97,98],[46,98]]);arm(-1,phase);arm(1,phase);
 }else if(['sealForm','insulationForm'].includes(m.type)){
  const press=35+Math.sin(phase*Math.PI)*16;c.fillStyle='#b3bcc0';c.fillRect(83,press,28,7);c.strokeStyle='#7d9198';c.lineWidth=2;c.strokeRect(83,press,28,7);
 }else if(['contactMachine','cnc','housingMachine','regMachine','couplerMachine'].includes(m.type)){
  const x=66+phase*61;stroke('#9eb3c0',5,[[x,30],[x,52]]);spark(x,62);c.strokeStyle='#82ced3';c.lineWidth=2;c.beginPath();c.arc(x,59,5,clock/100,clock/100+4);c.stroke();
 }else if(['calibrate','qa','coilTest','regTest','sealInspect','couplerFit'].includes(m.type)){
  stroke('#83e4d4',2,[[45+phase*100,30],[45+phase*100,98]]);if(m.type==='regTest'){stroke('#93cddd',2,[[124,77],[146,77],[146,48]]);c.fillStyle='#91dcc6';c.fillRect(143,67-phase*17,6,3)}
 }else if(['finish','couplerCoat'].includes(m.type)){
  c.fillStyle='#a0dcea55';for(let i=0;i<15;i++)c.fillRect(61+(i*13)%70,40+(i*7+clock/40)%45,2,5);
 }else if(m.type==='support'){
  stroke('#b7c8d0',4,[[78,47],[89,57],[99+phase*9,66]]);spark(104,68);
 }
 c.restore();
}
