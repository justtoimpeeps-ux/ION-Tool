"""Reconstruct coordinated IE-4 artwork from retained process drawings.
Rasterization uses scripts/render_atlases.cjs and installed Playwright/Chromium.
"""
from pathlib import Path
import json,runpy,subprocess
root=Path(__file__).resolve().parents[1]
base=runpy.run_path(str(root/'scripts/generate_process_art.py'))
box,disk,ring,line,coil=[base[n] for n in ['box','disk','ring','line','coil']]
def engine(stage='core'):
    # Top-down cutaway: injector and pump to chamber, magnet ring, acceleration/vector grids.
    s=box(38,38,112,53,'#839ca5',8)+box(18,48,30,34,'#536b79')+box(30,40,16,50,'#9cafb4')
    s+=box(52,43,45,42,'#2d4251',7)+disk(73,64,18,'#a9c5c3')+disk(73,64,12,'#28596a')
    s+=ring(108,64,29,'#b8a783')+''.join(line(x,42,x,86,'#9bd5dc',2) for x in range(98,127,5))
    s+=box(132,39,14,51,'#6e8d99')+''.join(line(136,y,163,y,'#a9c6c8',2) for y in range(44,88,7))
    s+=box(55,25,25,12,'#536f81')+box(51,91,30,12,'#526d80')+line(27,45,56,32,'#d1aa68',3)+line(26,86,52,97,'#7ac5d5',3)
    s+=box(83,29,30,7,'#87a7b5')+''.join(disk(x,y,2,'#243842') for x in [45,91,145] for y in [40,88])
    if stage=='tested':s+=box(152,22,19,10,'#74c79a')
    if stage=='shipped':s=box(9,15,174,100,'#82704d')+s+line(13,29,178,29,'#d6ba76',3)+line(13,105,178,105,'#d6ba76',3)
    return s

def item(k):
    if k in ['kit','machined','core','calibrated','tested','shipped']:return engine(k)
    if k in ['housing','housingRaw','housingHeat']:return box(25,34,140,62,'#8098a5',9)+box(45,46,99,37,'#203d4d')+box(13,45,28,40,'#6a8190')+''.join(disk(x,y,3) for x in [34,154] for y in [41,90])
    if k=='field':return ring(96,64,42,'#aa9c7e')+''.join(f'<g transform="rotate({a} 96 64)">'+box(87,15,18,24,'#bd9769')+'</g>' for a in range(0,360,45))
    if k=='energy':return box(37,23,118,83,'#6e8e98')+''.join(line(x,29,x,100,'#a3dbe0',3) for x in range(47,147,10))+disk(31,64,15,'#c0a67c')
    if k=='gas':return disk(72,64,28,'#a2b6b7')+box(96,48,54,29,'#788f99')+line(28,64,49,64,'#d1ae72',11)+line(120,30,120,48,'#abc4c8',8)
    if k=='electronic':return box(36,28,120,72,'#397f6c')+''.join(box(x,y,17,14,'#1c3542') for x in [48,78,108,136] for y in [40,70])+line(28,38,28,90,'#d9b878',6)
    if k=='thermal':return box(31,26,128,78,'#738e9b')+ring(96,64,34,'#a2c1c7')+''.join(line(x,31,x,97,'#bad4d4',3) for x in [40,48,144,152])
    if k=='interface':return box(47,26,98,77,'#819ba8')+ring(96,64,27,'#b2c4c4')+''.join(disk(x,y,5,'#263e4d') for x in [58,134] for y in [36,92])
    if k=='sensor':return ''.join(box(x,38,26,50,'#688e9d')+disk(x+13,56,10,'#c4d5cc') for x in [37,82,127])
    symbols={'iron':'Fe','nickel':'Ni','cobalt':'Co','chromium':'Cr','copper':'Cu','silver':'Ag','gold':'Au','pgm':'Pt'}
    if k in symbols:
        colors={'copper':'#bb8058','gold':'#cbb364','silver':'#c3cdd2'}
        return ''.join(box(23,30+i*23,146,17,colors.get(k,'#9aa9b4')) for i in range(3))+f'<text x="42" y="66" fill="#364752" font-size="12" font-family="sans-serif">{symbols[k]}</text>'
    if k in ['wire','wireInsulated','superconductor','fieldCoil']:return coil(96,64,38)+disk(96,64,14,'#304953')
    if k in ['tibanna','coolant']:return box(31,24,130,81,'#526d7c',24)+disk(96,64,28,'#79adbf' if k=='coolant' else '#a590bb')+line(55,32,55,97,'#b4c9c7',4)
    if 'coil' in k.lower():return ring(96,64,34,'#c5a375')+coil(96,64,21)
    if 'seal' in k.lower():return ''.join(ring(x,64,19,'#b8b39c') for x in [52,96,140])
    if 'reg' in k.lower():return box(39,42,116,44,'#9eaeb4')+''.join(disk(x,42,11,'#7998a4') for x in [60,96,132])
    if 'coupler' in k.lower():return ring(67,64,29,'#adbdc4')+ring(126,64,24,'#9aafb8')
    if k in ['electronicsFeed','processor','sensorModule','safingModule']:return box(40,29,112,70,'#497e70')+box(70,42,52,43,'#233944')+''.join(line(x,26,x,39,'#c6b279',3) for x in range(49,145,12))
    return box(29,28,134,75,'#8b815f')+box(42,39,107,52,'#b2a886')+line(30,46,162,46,'#66644f',3)+line(96,28,96,103,'#d3c195',5)

result=subprocess.check_output(['node','-e',"const fs=require('fs'),vm=require('vm'),c=vm.createContext({});for(const n of ['register','data'])vm.runInContext(fs.readFileSync('js/'+n+'.js','utf8'),c);console.log(vm.runInContext('JSON.stringify(Object.keys(MATERIALS))',c))"],cwd=root,text=True)
items=json.loads(result)
kinds=base['kinds'];sources={'machines':{},'items':{},'engines':{}}
svg=lambda content:f'<svg xmlns="http://www.w3.org/2000/svg" width="192" height="128" viewBox="0 0 192 128">{content}</svg>'
for k in kinds:
    frames=[]
    for phase in range(4):
        if k in ['cnc','integrate','calibrate','qa','package']:
            body=base['conveyor'](phase) if k=='package' else base['bed']()
            # The reference-derived engine is composited by render_atlases.cjs.
            body+=base['robot'](160,102,phase) if k in ['integrate','package'] else box(34,18+phase*6,125,9,'#a6c5c9')
        elif k in ['field','energy','gas','electronic','thermal','interface','sensor','housingMachine']:
            body=base['bench']()+box(15+phase*3,25,10,70,'#c2aa7e')
        else:body=base['art'](k,phase)
        frames.append(svg(body))
    sources['machines'][k]=frames
sources['machines']['inserter']=[sources['machines']['integrate'][0]]*4
sources['machines']['cncFiveAxis']=sources['machines']['cnc'].copy()
sources['machines']['cncLathe']=sources['machines']['cnc'].copy()
sources['containers']={'metalChest':[svg('')],'gasVat':[svg('')]}
for k in items:sources['items'][k]=[svg(item(k))]
for k in ['housing','field','energy','gas','electronic','thermal','interface','sensor','core','tested','shipped']:sources['engines'][k]=[svg(item(k))]
(root/'assets/source').mkdir(parents=True,exist_ok=True)
(root/'assets/source/atlas-sources.json').write_text(json.dumps(sources))
print('Coordinated source artwork:',len(kinds),'machines;',len(items),'items')
