"""Generate lightweight, original overhead equipment sprites; no image downloads."""
import json
from pathlib import Path
from urllib.parse import quote

def box(x,y,w,h,c='#587584',r=3): return f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="{r}" fill="{c}" stroke="#172c38" stroke-width="2"/>'
def disk(x,y,r,c='#91b6c2'): return f'<circle cx="{x}" cy="{y}" r="{r}" fill="{c}" stroke="#18323d" stroke-width="2"/>'
def line(x,y,a,b,c='#a8d1d8',w=4): return f'<path d="M{x} {y}L{a} {b}" stroke="{c}" stroke-width="{w}" fill="none"/>'
def ring(x,y,r,c='#d3aa76'): return disk(x,y,r,c)+disk(x,y,r*.46,'#223a46')
def coil(x,y,r=12): return ''.join(f'<ellipse cx="{x+i}" cy="{y}" rx="{r*.45}" ry="{r}" fill="none" stroke="#dbac64" stroke-width="2"/>' for i in range(-7,8,3))
def fan(x,y,r,p): return disk(x,y,r,'#263e4b')+f'<g transform="rotate({p*30} {x} {y})">'+''.join(line(x,y,x+r*.75,y,c='#96bbc1',w=4) if a==0 else f'<g transform="rotate({a} {x} {y})">'+line(x,y,x+r*.75,y,c='#96bbc1',w=4)+'</g>' for a in [0,120,240])+'</g>'
def bench(): return box(10,14,172,100,'#807862')
def bed(): return box(16,12,160,104,'#6e8994')+box(30,26,130,76,'#203846')
def conveyor(p=0): return box(4,40,184,48,'#344d5a')+''.join(line(x+p*3,44,x+p*3,84,'#849ba6',3) for x in range(10,180,12))
def robot(x,y,p=0):
    p=[0,1,2,1][p%4]
    return disk(x,y,12,'#e2b55e')+line(x,y,x-19,y-26,'#dfb25a',12)+disk(x-19,y-26,7,'#d4c18e')+line(x-19,y-26,x-42+p*3,y-20,'#e2b55e',9)
def art(k,p):
    motion=[0,1,2,1][p%4]
    if k=='cast': return bed()+''.join(disk(x,y,9,'#dbb15f') for x in [35,157] for y in [30,98])+box(57,36+motion*2,78,54,'#b8bec1')+box(76,46,40,33,'#a57f57')
    if k=='heat': return box(25,10,125,108,'#76868e')+box(38,24,98,78,'#6f4132')+ring(86,63,28,'#e7a359')+fan(163,34,17,p)+line(151,76,180,76,'#94a9b4',12)
    if k=='finish': return conveyor(p)+box(49,16,89,96,'#5c9f9f')+box(64,36,59,56,'#203b4b')+''.join(line(68,y,119,y,'#78c4db',2) for y in range(43+p,85,10))+fan(153,21,13,p)
    if k=='wireDraw': return box(6,20,180,88)+''.join(ring(30+i*42,64,18-i*2,'#c5b07f') for i in range(4))+line(10,44,178,44,'#e2c186',2)+box(78+motion*2,40,7,48,'#86b8be')
    if k=='wireFinish': return box(12,25,168,80)+line(3,65,189,65,'#d4b071',3)+''.join(disk(x,49,12,'#8babb8')+disk(x,81,12,'#8babb8') for x in [42,81,120])+fan(159,64,18,p)
    if k=='insulationForm': return bed()+box(35,35,40,56,'#c6baa0')+box(90+motion*2,44,42,37,'#9ed1d4')+disk(151,64,17,'#d9cfac')+line(74,64,91,64)
    if k=='coilWind': return bench()+ring(65,65,34)+disk(65,65,8,'#e8d8a9')+ring(151,41,18)+line(88,46,148,37,'#e7b263',2)+box(104+motion*4,67,21,21,'#9db8c0')
    if k=='coilInsulate': return box(13,13,166,104,'#8a938b')+box(34,25,101,77,'#496a65')+coil(82,63,25)+disk(158,42,14,'#b4d5ba')+line(141,44,115,63,'#8bc4ac',5)+box(146,81+motion*2,23,15)
    if k=='coilTest': return bench()+coil(93,67,27)+box(22,25,39,24,'#477787')+line(52,48,76+motion,65,'#db6b58',3)+line(157,97,112,69,'#6fc4c5',3)+box(142,24,31,19,'#65b8a9')
    if k=='regMachine': return bed()+''.join(box(48+i*30,45,17,38,'#a9bcc6')+disk(56+i*30,45,9) for i in range(3))+box(43,26+motion*3,105,12,'#d5ae65')
    if k=='regAssemble': return bench()+''.join(box(32+i*43,45,29,30,'#a7a9a0')+disk(47+i*43,60,7,'#659aad') for i in range(3))+box(134,88,31,13,'#bcb081')+line(26,91,70+motion*2,91,'#9fb5bd',5)
    if k=='regTest': return box(14,16,164,96)+line(29,63,164,63,'#a1c1bf',9)+''.join(disk(45+i*47,44,13,'#9ec4ca')+line(45+i*47,57,45+i*47,78,'#d6c381',5) for i in range(3))+box(76,89,40,13,'#63b5a5')
    if k=='sealForm': return bed()+disk(39,64,19,'#e3ceb0')+box(71,34,73,62,'#87a4ae')+ring(92,64,14,'#d9d1a7')+ring(123,64,12,'#d9d1a7')+box(149-motion*3,48,20,32,'#d5a55b')
    if k=='sealInspect': return bench()+''.join(ring(47+i*31,76,10,'#cfc79f') for i in range(4))+disk(95,46,21,'#648c9c')+disk(95,46,14,'#b9d8d3')+box(142,24+motion*3,18,27,'#e5c48e')
    if k=='contactMachine': return bed()+''.join(box(47+i*12,44,8,40,'#ddc47c') for i in range(8))+box(40,27+motion*3,117,12,'#b4c7ca')
    if k=='couplerMachine': return bed()+ring(66,65,26,'#a7c0c7')+ring(127,65,22,'#b7bdc3')+box(33+motion*3,26,126,12,'#d0a76b')
    if k=='couplerCoat': return conveyor(p)+box(52,19,84,91,'#8a9ca0')+ring(77,64,16,'#c6ceaa')+ring(111,64,16,'#c6ceaa')+''.join(line(x,30,x,42,'#7cc9dc',3) for x in [65,85,105,125])
    if k=='couplerFit': return bench()+box(32,29,84,73,'#526e79')+ring(74,65,24,'#c9bd97')+box(127-motion*3,49,44,29,'#a7b7c4')
    if k=='housingMachine': return bed()+ring(96,66,33,'#b7c4ca')+box(85,16+motion*3,22,30,'#d6b778')+''.join(disk(x,y,4,'#2a424c') for x,y in [(73,44),(119,44),(73,88),(119,88)])
    if k=='field': return bench()+box(34,28,122,76,'#36586c')+''.join(coil(x,y,9) for x in [56,82,108,134] for y in [43,65,87])+box(16,44+motion*3,12,37,'#88b4bd')
    if k=='energy': return bed()+''.join(box(48+i*21,35,13,56,'#c7c4a7') for i in range(5))+line(40,31,147,31,'#b67c49',6)+line(40,97,147,97,'#b67c49',6)+box(151,48+motion*3,15,24,'#73c5b3')
    if k=='gas': return bench()+line(32,63,160,63,'#b6bab7',8)+''.join(disk(x,y,8,'#82a4a4')+line(x,y,x,63,'#b6bab7',5) for x in [48,95,142] for y in [40,86])+box(18,17,28,13,'#d5aa6f')
    if k=='electronic': return bench()+box(43,32,105,63,'#3e8b6b')+''.join(box(x,y,14,12,'#203b46') for x in [54,79,104,129] for y in [43,69])+line(156,24,124+motion*3,57,'#c7d9d4',4)+box(19,37,15,45,'#6493a1')
    if k=='thermal': return bed()+box(47,32,98,63,'#739ba6')+''.join(line(x,39,x,89,'#b2cbcb',3) for x in range(55,142,8))+fan(28,63,18,p)+fan(165,63,18,p)+line(48,26,144,26,'#70c1c5',7)
    if k=='interface': return bench()+box(66,24,58,80,'#6a8491')+''.join(ring(x,y,13,'#b5c4c3') for x in [44,148] for y in [41,83])+box(77+motion*2,45,36,36,'#d0b783')
    if k=='sensor': return bench()+''.join(box(34+i*31,32,18,22,'#78b1c0')+disk(43+i*31,76,9,'#d9d7bf') for i in range(4))+box(152,25,22,69,'#3b5e6b')+line(18,99,131+motion*3,99,'#cdb67e',4)
    if k=='kit': return box(10,14,172,100,'#788a87')+''.join(box(20+i*41,24+j*44,32,34,['#a9b6c2','#b9a47d','#80b4b5','#b7b5aa'][i])+disk(36+i*41,41+j*44,6+i,'#3c5966') for i in range(4) for j in range(2))
    if k=='cnc': return bed()+box(49,41,96,47,'#a3b7c2')+disk(51,64,20,'#c8d2d1')+box(105,22+motion*4,18,80,'#d0b378')+line(34,97,159,97,'#a6c7ce',3)
    if k=='integrate': return box(12,12,168,104,'#506d7a')+box(68,42,65,44,'#9cb2ba')+ring(63,64,22,'#c5ccca')+robot(160,92,p)+robot(35,34,3-p)
    if k=='calibrate': return box(12,12,168,104,'#647c8e')+box(53,43,90,43,'#9bb5bb')+ring(51,64,22,'#bdc6c1')+''.join(line(x,24,x,44,'#d3bf7e',5) for x in [77,101,125])+box(148,25,19,77,'#6d9fa9')+fan(25,98,12,p)
    if k=='qa': return box(12,10,168,108,'#818a9b')+box(29,25,134,78,'#294454')+box(58,45,78,40,'#a8b7c0')+ring(54,64,18,'#c6d7ce')+box(37+motion*17,22,12,84,'#aad4c9')+box(145,109,20,7,'#6ac495')
    if k=='package': return conveyor(p)+box(64,28,65,75,'#b89f70')+''.join(line(69,y,123,y,'#85754f',3) for y in [37,50,63,76,89])+line(81,28,81,103,'#edddad',3)+robot(166,24,p)
    if k=='support': return bench()+box(23,27,40,30,'#94a7b0')+box(34,24,18,38,'#596e78')+''.join(line(83+i*14,30,83+i*14,52,'#c4d5d5',4) for i in range(6))+ring(103,83,15,'#b8c7c7')+line(140,72,165,97,'#b5c8d0',6)
    raise KeyError(k)

kinds='cast heat finish field energy gas electronic thermal interface sensor kit cnc integrate calibrate qa package support wireDraw wireFinish insulationForm coilWind coilInsulate coilTest regMachine regAssemble regTest sealForm sealInspect contactMachine couplerMachine couplerCoat couplerFit housingMachine'.split()
frames={}
for k in kinds:
    frames[k]=[]
    for phase in range(4):
        svg=f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 128"><title>{k} overhead equipment</title>{art(k,phase)}</svg>'
        frames[k].append('data:image/svg+xml,'+quote(svg,safe=''))
root=Path(__file__).resolve().parents[1]
(root/'js/process-art.js').write_text('/* Generated by scripts/generate_process_art.py; four lightweight overhead frames per process. */\nconst PROCESS_FRAMES='+json.dumps(frames,separators=(',',':'))+';\nconst PROCESS_ART=Object.fromEntries(Object.entries(PROCESS_FRAMES).map(([id,frames])=>[id,frames[0]]));\n')
print(f'{len(frames)} distinct process sprites, {sum(map(len,frames.values()))} frames')
