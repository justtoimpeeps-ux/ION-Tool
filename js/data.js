// Exact manufacturing inputs: register §§8C and 11. Masses are kg; modules are each.
// Footprints, volumes, staffing factors and prices remain provisional planning values.
const MATERIALS={
 iron:{title:'Iron alloy',unit:'kg',volume:.00013},nickel:{title:'Nickel alloy',unit:'kg',volume:.00012},cobalt:{title:'Cobalt alloy',unit:'kg',volume:.00012},chromium:{title:'Chromium alloy',unit:'kg',volume:.00014},copper:{title:'Copper',unit:'kg',volume:.00012},silver:{title:'Silver',unit:'kg',volume:.0001},gold:{title:'Gold',unit:'kg',volume:.00006},pgm:{title:'Platinum-group metals',unit:'kg',volume:.00006},
 superconductor:{title:'Superconductive media',unit:'kg',volume:.001},ceramic:{title:'Technical ceramic',unit:'kg',volume:.0004},tibanna:{title:'Tibanna charge',unit:'kg',volume:.005},electronicsFeed:{title:'Electronics feedstock',unit:'kg',volume:.002},coolant:{title:'Coolant charge',unit:'kg',volume:.001},
 fieldCoil:{title:'Precision field coils',unit:'each',volume:.01},regulator:{title:'Regulator modules',unit:'each',volume:.01},seal:{title:'Seals',unit:'each',volume:.001},processor:{title:'Processor modules',unit:'each',volume:.002},coupler:{title:'Interface couplers',unit:'each',volume:.005},sensorModule:{title:'Sensor modules',unit:'each',volume:.003},safingModule:{title:'Safing modules',unit:'each',volume:.003},
 housingRaw:{title:'Formed housing preform',unit:'each',volume:1.4},housingHeat:{title:'Heat-processed housing',unit:'each',volume:1.3},housing:{title:'Structural core housing',unit:'each',volume:1.2},field:{title:'Field-control set',unit:'each',volume:.6},energy:{title:'Energy-transfer set',unit:'each',volume:.6},gas:{title:'Gas-control set',unit:'each',volume:.5},electronic:{title:'Control-electronics set',unit:'each',volume:.25},thermal:{title:'Thermal set',unit:'each',volume:.6},interface:{title:'Precision-interface set',unit:'each',volume:.25},sensor:{title:'Sensor/safety set',unit:'each',volume:.25},kit:{title:'Complete eight-subassembly IE-4 kit',unit:'each',volume:3.5},machined:{title:'Machined/integrated core',unit:'each',volume:4.4},core:{title:'Assembled core',unit:'each',volume:4.4},calibrated:{title:'Calibrated core',unit:'each',volume:4.4},tested:{title:'Certified IE-4 core',unit:'each',volume:4.4},shipped:{title:'Dispatched IE-4 core',unit:'each',volume:4.4}
};

// §9 internal routings; supplementary feeds and regulator bought-part quantities are explicit assumptions.
Object.assign(MATERIALS,{
  "housingBlank": {
    "title": "Finished housing blank",
    "unit": "each",
    "volume": 1.25
  },
  "coilWireRaw": {
    "title": "Drawn field-coil wire",
    "unit": "each",
    "volume": 0.015
  },
  "coilWire": {
    "title": "Finished field-coil wire",
    "unit": "each",
    "volume": 0.015
  },
  "coilInsulation": {
    "title": "Formed coil insulation",
    "unit": "each",
    "volume": 0.003
  },
  "woundCoil": {
    "title": "Wound field coil",
    "unit": "each",
    "volume": 0.04
  },
  "insulatedCoil": {
    "title": "Insulated field coil",
    "unit": "each",
    "volume": 0.045
  },
  "regBlank": {
    "title": "Machined regulator housing",
    "unit": "each",
    "volume": 0.02
  },
  "regUntested": {
    "title": "Assembled regulator",
    "unit": "each",
    "volume": 0.025
  },
  "sealRaw": {
    "title": "Formed seal",
    "unit": "each",
    "volume": 0.001
  },
  "contact": {
    "title": "Machined nickel-alloy contact",
    "unit": "each",
    "volume": 0.001
  },
  "couplerBlank": {
    "title": "Machined coupler body",
    "unit": "each",
    "volume": 0.006
  },
  "couplerCoated": {
    "title": "Coated coupler with contacts",
    "unit": "each",
    "volume": 0.008
  },
  "insulationFeed": {
    "title": "Qualified insulating feed",
    "unit": "kg",
    "volume": 0.001
  },
  "sealCompound": {
    "title": "Qualified seal compound",
    "unit": "kg",
    "volume": 0.001
  },
  "regValve": {
    "title": "Regulator valve",
    "unit": "each",
    "volume": 0.003
  },
  "regSense": {
    "title": "Regulator sensing element",
    "unit": "each",
    "volume": 0.001
  }
});
const SPECS={
 cast:{name:'Casting / forging / forming cell',building:'Foundry',category:'casting',stage:'casting',w:3,h:3,inputs:{iron:182,nickel:46,chromium:14},outputs:{housingRaw:1},price:93000,days:8,workers:2,port:'fixed',color:'#9a765d'},
 heat:{name:'Heat treatment / vacuum processing unit',building:'Heat Treatment',category:'heat',stage:'casting',w:3,h:3,inputs:{housingRaw:1},outputs:{housingHeat:1},price:120000,days:10,workers:2,port:'fixed',color:'#a27359'},
 finish:{name:'Surface finishing / cleaning / coating line',building:'Finishing',category:'finishing',stage:'casting',w:3,h:3,inputs:{housingHeat:1},outputs:{housing:1},price:118000,days:9,workers:2,port:'fixed',color:'#8b8e5c'},
 field:{name:'Field-control assembly cell',building:'Assembly',category:'assembly',stage:'components',w:3,h:3,inputs:{nickel:18,cobalt:7,copper:1.8,silver:.4,gold:.15,pgm:.05,superconductor:38,fieldCoil:12},outputs:{field:1},price:92000,days:7,workers:2,port:'flex',color:'#698c95'},
 energy:{name:'Energy-transfer assembly cell',building:'Assembly',category:'assembly',stage:'components',w:3,h:3,inputs:{nickel:12,copper:4,silver:.6,gold:.3,pgm:.1,superconductor:21,ceramic:34},outputs:{energy:1},price:94000,days:7,workers:2,port:'flex',color:'#698c95'},
 gas:{name:'Gas-control assembly cell',building:'Assembly',category:'assembly',stage:'components',w:3,h:3,inputs:{iron:12,nickel:9,chromium:4,tibanna:16,regulator:6,seal:18},outputs:{gas:1},price:78000,days:6,workers:2,port:'flex',color:'#698c95'},
 electronic:{name:'Control-electronics integration bench',building:'Assembly',category:'assembly',stage:'components',w:3,h:2,inputs:{copper:1.2,silver:.3,gold:.2,pgm:.1,electronicsFeed:24,processor:4},outputs:{electronic:1},price:83000,days:5,workers:2,port:'flex',color:'#698c95'},
 thermal:{name:'Thermal-management assembly cell',building:'Assembly',category:'assembly',stage:'components',w:3,h:3,inputs:{nickel:17,cobalt:3,chromium:6,ceramic:41,coolant:28},outputs:{thermal:1},price:92000,days:6,workers:2,port:'flex',color:'#698c95'},
 interface:{name:'Precision-interface fit-up bench',building:'Assembly',category:'assembly',stage:'components',w:3,h:2,inputs:{nickel:16,iron:9,chromium:3,coupler:8},outputs:{interface:1},price:61000,days:5,workers:2,port:'flex',color:'#698c95'},
 sensor:{name:'Sensor and safety integration bench',building:'Assembly',category:'assembly',stage:'components',w:3,h:2,inputs:{copper:.5,silver:.2,gold:.07,pgm:.03,electronicsFeed:13,sensorModule:10,safingModule:2},outputs:{sensor:1},price:67000,days:5,workers:2,port:'flex',color:'#698c95'},
 kit:{name:'Eight-subassembly kitting station',building:'Assembly',category:'assembly',stage:'receiving',w:3,h:3,inputs:{housing:1,field:1,energy:1,gas:1,electronic:1,thermal:1,interface:1,sensor:1},outputs:{kit:1},price:89000,days:6,workers:2,port:'flex',color:'#548877'},
 cnc:{name:'Precision machining / integration centre',building:'Machining',category:'machining',stage:'machining',w:3,h:3,inputs:{kit:1},outputs:{machined:1},price:155000,days:10,workers:2,port:'flex',color:'#527fa8'},
 integrate:{name:'Final engine assembly / integration cell',building:'Assembly',category:'assembly',stage:'integration',w:4,h:3,inputs:{machined:1},outputs:{core:1},price:142000,days:9,workers:3,port:'fixed',color:'#668477'},
 calibrate:{name:'Calibration / functional test stand',building:'Testing',category:'test',stage:'calibration',w:4,h:4,inputs:{core:1},outputs:{calibrated:1},price:190000,days:12,workers:3,port:'fixed',color:'#927b9f'},
 qa:{name:'QA / certification acceptance stand',building:'Testing',category:'test',stage:'qa',w:4,h:4,inputs:{calibrated:1},outputs:{tested:1},price:210000,days:13,workers:3,port:'fixed',color:'#997b9f'},
 package:{name:'Robotic packaging / palletizing station',building:'Packaging',category:'packaging',stage:'dispatch',w:3,h:3,inputs:{tested:1},outputs:{shipped:1},price:80000,days:6,workers:2,port:'flex',color:'#7d8461'},
 support:{name:'Fabrication / toolroom / maintenance workstation',building:'Maintenance',category:'toolroom',stage:null,w:3,h:3,inputs:{},outputs:{},rate:0,price:72000,days:6,workers:2,port:'flex',color:'#647083',support:true}
};

// One engine-equivalent batch per operation: quantities, not measured cycle times.
const INTERNAL_OPERATIONS={
  "wireDraw": {
    "name": "Wire drawing / extrusion batch",
    "category": "machining",
    "stage": "machining",
    "inputs": {
      "copper": 1.2,
      "silver": 0.24
    },
    "outputs": {
      "coilWireRaw": 12
    }
  },
  "wireFinish": {
    "name": "Conductor surface finishing batch",
    "category": "finishing",
    "stage": "components",
    "inputs": {
      "coilWireRaw": 12
    },
    "outputs": {
      "coilWire": 12
    }
  },
  "insulationForm": {
    "name": "Coil insulation forming batch",
    "category": "casting",
    "stage": "components",
    "inputs": {
      "insulationFeed": 0.12
    },
    "outputs": {
      "coilInsulation": 12
    }
  },
  "coilWind": {
    "name": "Precision coil winding batch",
    "category": "assembly",
    "stage": "components",
    "inputs": {
      "coilWire": 12,
      "superconductor": 38
    },
    "outputs": {
      "woundCoil": 12
    }
  },
  "coilInsulate": {
    "name": "Coil insulation / curing batch",
    "category": "heat",
    "stage": "components",
    "inputs": {
      "woundCoil": 12,
      "coilInsulation": 12
    },
    "outputs": {
      "insulatedCoil": 12
    }
  },
  "coilTest": {
    "name": "Field-coil electrical test batch",
    "category": "test",
    "stage": "components",
    "inputs": {
      "insulatedCoil": 12
    },
    "outputs": {
      "fieldCoil": 12
    }
  },
  "regMachine": {
    "name": "Regulator body machining batch",
    "category": "machining",
    "stage": "machining",
    "inputs": {
      "iron": 12,
      "nickel": 9,
      "chromium": 4
    },
    "outputs": {
      "regBlank": 6
    }
  },
  "regAssemble": {
    "name": "Regulator assembly batch",
    "category": "assembly",
    "stage": "components",
    "inputs": {
      "regBlank": 6,
      "regValve": 6,
      "regSense": 6
    },
    "outputs": {
      "regUntested": 6
    }
  },
  "regTest": {
    "name": "Regulator pressure-test batch",
    "category": "test",
    "stage": "components",
    "inputs": {
      "regUntested": 6
    },
    "outputs": {
      "regulator": 6
    }
  },
  "sealForm": {
    "name": "Seal molding / forming batch",
    "category": "casting",
    "stage": "components",
    "inputs": {
      "sealCompound": 0.9
    },
    "outputs": {
      "sealRaw": 18
    }
  },
  "sealInspect": {
    "name": "Seal dimensional inspection batch",
    "category": "test",
    "stage": "components",
    "inputs": {
      "sealRaw": 18
    },
    "outputs": {
      "seal": 18
    }
  },
  "contactMachine": {
    "name": "Coupler conductive-contact batch",
    "category": "machining",
    "stage": "machining",
    "inputs": {
      "nickel": 1.6
    },
    "outputs": {
      "contact": 8
    }
  },
  "couplerMachine": {
    "name": "Coupler body mill-turn batch",
    "category": "machining",
    "stage": "machining",
    "inputs": {
      "iron": 9,
      "nickel": 14.4,
      "chromium": 3
    },
    "outputs": {
      "couplerBlank": 8
    }
  },
  "couplerCoat": {
    "name": "Coupler coating / contact fit batch",
    "category": "finishing",
    "stage": "components",
    "inputs": {
      "couplerBlank": 8,
      "contact": 8
    },
    "outputs": {
      "couplerCoated": 8
    }
  },
  "couplerFit": {
    "name": "Interface coupler fit-test batch",
    "category": "test",
    "stage": "components",
    "inputs": {
      "couplerCoated": 8
    },
    "outputs": {
      "coupler": 8
    }
  },
  "housingMachine": {
    "name": "Housing precision finishing",
    "category": "machining",
    "stage": "machining",
    "inputs": {
      "housingBlank": 1
    },
    "outputs": {
      "housing": 1
    }
  }
};
for(const [id,op]of Object.entries(INTERNAL_OPERATIONS))SPECS[id]={w:3,h:3,port:'flex',workers:1,price:100000,days:7,color:'#668b96',recipeStatus:'Adopted planner baseline · internal component allocation',cycleTimeMinutes:null,...op};
SPECS.finish.outputs={housingBlank:1};
SPECS.field.inputs={nickel:18,cobalt:7,copper:.6,silver:.16,gold:.15,pgm:.05,fieldCoil:12};
SPECS.gas.inputs={tibanna:16,regulator:6,seal:18};
SPECS.interface.inputs={coupler:8};
const RECIPE_ASSUMPTIONS={coilWire:'1.2 kg Cu and 0.24 kg Ag moved from the field-control allowance into its 12 coils; 38 kg SC moved into winding, never counted again',insulation:'0.12 kg supplemental qualified insulation feed per 12 coils; provisional, outside the confirmed 583 kg',seals:'0.9 kg supplemental qualified compound per 18 seals; provisional, outside the confirmed 583 kg',regulators:'12 kg Fe / 9 kg Ni / 4 kg Cr of the gas-control allowance moved into six housings; one bought valve and sensing element per regulator assumed',couplers:'All interface Fe/Ni/Cr moved into eight couplers; 1.6 kg of the 16 kg Ni forms contacts, leaving 14.4 kg in the bodies'};
// Explicit candidate calibration, not measured machine rates. Each §13 A+B cap is
// shared across both factories' assigned stations at level-2 staffing / 95% condition.
// This derives rates from the register's existing stage model, NEVER fleet size from 247/day.
for(const [type,s]of Object.entries(SPECS))if(s.stage){
 const count=Object.values(ION_REGISTER.allocation).reduce((n,a)=>n+(a[type]||0),0);
 s.rate=ION_REGISTER.stages[s.stage]/(365*count*.7505);
 s.rateSource='§13 candidate stage model, evenly distributed across provisionally assigned A+B stations';
}
// The four shared production buildings and two upstream works are the user's campus allocation.
for(const s of Object.values(SPECS)){
 if(['casting','heat','finishing','toolroom'].includes(s.category)||['coilWind','regAssemble','coilTest','regTest','sealInspect','couplerFit'].some(t=>SPECS[t]===s))s.building=null;
 else if(s.category==='machining')s.building='Precision Machining';
 else if(s.category==='assembly'&&s.stage!=='integration')s.building='Subassemblies';
 else s.building='Final Assembly & Test';
}
const BLDGS=['Receiving','Factory A','Factory B','Subassemblies','Precision Machining','Final Assembly & Test'];
const UPGRADES={
 tooling:{name:'Precision tooling & quick-change fixtures',description:'Improved fixtures and reduced changeover time.',speed:1.15,priceFraction:.12,days:4},
 automation:{name:'Robotic loading & inspection assist',description:'Automated handling raises capacity; one fewer operator is needed, minimum one.',speed:1.25,workerReduction:1,priceFraction:.4,days:8}
};
// Work-centre staffing and individual skill distribution are planning assumptions.
const DEFAULT_STAFFING={wireDraw:1,wireFinish:1,insulationForm:1,coilWind:1,coilInsulate:1,coilTest:1,regMachine:1,regAssemble:2,regTest:1,sealForm:1,sealInspect:1,contactMachine:1,couplerMachine:1,couplerCoat:1,couplerFit:1,housingMachine:1,cast:2,heat:1,finish:1,field:2,energy:2,gas:1,electronic:1,thermal:2,interface:1,sensor:1,kit:1,cnc:1,integrate:3,calibrate:2,qa:2,package:1,support:1};
const STAFF_ROLES={machining:'Machining / upstream',assembly:'Assembly',handling:'Materials handling',shiftSupport:'Shift support / toolroom',qa:'QA / safety'};
const roleForSpec=s=>s.category==='test'?'qa':s.category==='assembly'?'assembly':s.category==='packaging'?'handling':s.category==='toolroom'?'shiftSupport':'machining';
const STAFF_POOLS=Object.entries(ION_REGISTER.factories).flatMap(([origin,f])=>Object.entries(f.roles).map(([role,count])=>({id:role+'-'+origin.slice(-1),origin,role,count}))).concat([{id:'qa-shared',origin:'Shared QA / safety',role:'qa',count:300}]);
// A transparent, editable model distribution, not an asserted employee census.
// User-proposed T1–T5 distribution; T0 remains available for manual trainee modeling.
const WORKFORCE_DISTRIBUTION=[.38,.38,.19,.045,.005];
const planningTier=i=>{const n=(i*37)%1000;return n<380?1:n<760?2:n<950?3:n<995?4:5};

for(const s of Object.values(SPECS)){s.cycleTimeMinutes=null;s.yieldAssumption=1;s.rateSource='§9 annual stage reference distributed over assigned owned equipment; provisional—not measured cycle time'}
// Estimated reserved working envelopes (body + operator/service access), 2 m/cell.
// Aisles are additional. These are industrial analogues, not surveyed IE-4 equipment.
const EQUIPMENT_PROFILES={
 cast:[4,3,2,'press','Inline press feed/discharge'],heat:[3,3,1,'furnace','Shared front furnace door'],finish:[4,2,1,'coating','Flexible finishing-line access'],
 cnc:[3,2,1,'cnc','Front loading door'],housingMachine:[3,2,1,'cnc','Front loading door'],regMachine:[3,2,1,'cnc','Front loading door'],couplerMachine:[3,2,1,'cnc','Front loading door'],contactMachine:[2,2,1,'cnc','Front loading door'],
 field:[3,2,2,'assembly','Any exposed edge'],energy:[3,2,2,'assembly','Any exposed edge'],gas:[2,2,1,'bench','Any exposed edge'],electronic:[2,1,1,'electronics','Any exposed edge'],thermal:[3,2,2,'assembly','Any exposed edge'],interface:[2,1,1,'bench','Any exposed edge'],sensor:[2,1,1,'electronics','Any exposed edge'],kit:[3,2,1,'racks','Any exposed edge'],integrate:[3,3,3,'robot','Any exposed edge'],
 calibrate:[3,2,2,'test','Any exposed edge'],qa:[4,3,2,'test','Shared front test-cell door'],package:[3,2,1,'palletizer','Inline feed/discharge'],support:[2,1,1,'bench','Any exposed edge'],
 wireDraw:[4,2,1,'wire','Inline wire-feed/discharge'],wireFinish:[3,2,1,'coating','Any exposed edge'],insulationForm:[2,2,1,'press','Any exposed edge'],coilWind:[2,1,1,'winder','Any exposed edge'],coilInsulate:[2,2,1,'furnace','Shared front oven door'],coilTest:[2,1,1,'electronics','Any exposed edge'],
 regAssemble:[2,1,2,'bench','Any exposed edge'],regTest:[2,2,1,'test','Any exposed edge'],sealForm:[2,2,1,'press','Inline mold-feed/discharge'],sealInspect:[1,1,1,'inspection','Any exposed edge'],couplerCoat:[3,2,1,'coating','Any exposed edge'],couplerFit:[2,1,1,'inspection','Any exposed edge']
};
for(const [id,[w,h,workers,art,access]]of Object.entries(EQUIPMENT_PROFILES)){
 const s=SPECS[id];Object.assign(s,{w,h,workers,art,accessDescription:access,footprintSource:'Adopted industrial working envelope; rounded up to 2 m squares'});DEFAULT_STAFFING[id]=workers;
 s.port=['Inline press feed/discharge','Inline feed/discharge','Inline wire-feed/discharge'].includes(access)?'fixed':'flex';
 if(access.startsWith('Front')||access.startsWith('Shared front')){s.port='fixed';s.access=[{kind:'in',side:'bottom',position:.5},{kind:'out',side:'bottom',position:.5}]}
}

for(const [item,m]of Object.entries(MATERIALS))m.procurement=Object.hasOwn(ION_REGISTER.purchased,item)?'External purchase (§9)':Object.hasOwn(ION_REGISTER.assumedPurchased,item)?'External purchase · adopted planner quantity':Object.hasOwn(ION_REGISTER.openingTonnes,item)?'Confirmed opening stock (§5); replenishment not dispatched':['insulationFeed','sealCompound'].includes(item)?'Adopted planner supplemental feed':'Internally manufactured / processed';
for(const id of ['field','gas','interface'])SPECS[id].recipeStatus='Register parent budget; adopted planner allocation through internal components';
SPECS.sealInspect.tileLabel='SEAL';
// Navigation foundation: only Orinda currently has a modeled floor inventory.
const SITES=[{id:'orinda',name:'Orinda Campus',buildings:BLDGS}];

// Equipment options preserve each process recipe and its service envelope.
// These are planning designs, not additional registered assets or supplier quotes.
for(const [id,s]of Object.entries(SPECS)){
 const bench=['bench','electronics','inspection','assembly','racks'].includes(s.art),automated=!s.support;
 s.models={standard:{name:'Standard production cell',price:s.price,days:s.days,speed:1,workerDelta:0,description:'Existing process reference; conventional industrial equipment.'}};
 if(bench||['press','winder','wire'].includes(s.art))s.models.manual={name:bench?'Manual fixture and assisted tooling':'Semi-automatic feed and operator control',price:Math.round(s.price*.72),days:Math.max(2,s.days-2),speed:.7,workerDelta:bench?1:0,description:'Lower capital cost; more manual handling and slower cycle throughput.'};
 if(automated)s.models.automated={name:bench?'Indexed fixtures with powered tooling':'Automatic feed and process control',price:Math.round(s.price*1.65),days:s.days+3,speed:1.3,workerDelta:-1,description:'Repeatable fixtures and controlled handling reduce operator tasks; at least one operator remains.'};
 if(['press','furnace','wire','coating'].includes(s.art)||s.support)s.models.spartan={name:'Spartan rugged industrial design',price:Math.round(s.price*1.35),days:s.days+4,speed:s.support?1:1.12,workerDelta:0,description:'Proposed heavy-duty handling and serviceable tooling, based on Spartan industrial fabrication capability.'};
 if(['cnc','electronics','inspection','robot','test','winder','palletizer'].includes(s.art))s.models.vc={name:'Valerion-Czerka precision automation',price:Math.round(s.price*2.1),days:s.days+6,speed:1.5,workerDelta:-1,description:'Proposed integrated controls, precision fixtures and automated handling based on VC engineering capability.'};
}
// Short readable captions; full names and batch recipes remain in hover details.
for(const [type,label]of Object.entries({wireDraw:'WIRE DRAW',wireFinish:'WIRE FIN.',insulationForm:'INSUL. FORM',coilWind:'WIND',coilInsulate:'INSULATE',coilTest:'COIL TEST',regMachine:'REG. CNC',regAssemble:'REG. ASSY',regTest:'REG. TEST',sealForm:'SEAL FORM',sealInspect:'SEAL QA',contactMachine:'CONTACT',couplerMachine:'COUPL. CNC',couplerCoat:'COUPL. COAT',couplerFit:'COUPL. FIT',housingMachine:'HOUSING',electronic:'ELECTRONICS',interface:'INTERFACE',calibrate:'CALIBRATE',integrate:'ENGINE ASSY'}))SPECS[type].tileLabel=label;

const MODEL_FAMILIES={
 press:['Hydraulic forming press','Operator-fed forming press','Servo press with automatic transfer','Spartan modular industrial press'],
 furnace:['Controlled-atmosphere batch furnace',null,'Vacuum furnace with automatic load racks','Spartan heavy-duty process furnace'],
 coating:['Controlled cleaning / finishing line',null,'Indexed automatic treatment line','Spartan modular surface-treatment line'],
 cnc:['CNC turn / mill centre',null,'Pallet-changing CNC centre',null,'VC multi-axis precision cell'],
 bench:['Fixture-assisted fit-up bench','Basic manual fixture bench','Indexed powered-tool bench','Spartan repair / fabrication bench'],
 electronics:['ESD assembly and probe bench','Manual assembly and test fixture','Programmed assembly / test fixture',null,'VC vision-guided electronics cell'],
 inspection:['Optical inspection station','Manual gauging bench','Automatic vision inspection station',null,'VC metrology and traceability cell'],
 winder:['Programmable coil winder','Assisted bench coil winder','Automatic tension-controlled winder',null,'VC servo winding and inspection cell'],
 wire:['Multi-pass wire-processing bank','Operator-fed wire-processing bank','Closed-loop wire-processing line','Spartan heavy-duty drawing line'],
 assembly:['Fixture-assisted assembly cell','Manual fit-up and tooling cell','Indexed assembly fixture cell',null,'VC reconfigurable assembly cell'],
 racks:['Kitting racks and pick bench','Open-bin manual pick bench','Pick-to-light kitting station',null,'VC scan-confirmed kitting cell'],
 robot:['Robot-assisted engine assembly',null,'Vision-guided robotic assembly',null,'VC dual-arm assembly / inspection cell'],
 test:['Instrumented functional test stand',null,'Automatic sequence test stand',null,'VC integrated calibration / test cell'],
 palletizer:['Powered palletizing station',null,'Robotic palletize / wrap / label cell',null,'VC verified pallet-handling cell']
};
const MODEL_PROCESS_NAMES={sealForm:['Seal compression-moulding press','Small-batch seal moulding press','Automatic seal moulding cell'],insulationForm:['Insulation forming press','Manual insulation mould fixture','Automatic insulation-forming cell'],housingMachine:['CNC housing boring / milling centre',null,'Palletized horizontal machining centre'],regMachine:['CNC valve-body turn / mill centre',null,'Bar-fed valve-body machining cell'],contactMachine:['Precision contact machining fixture',null,'Automatic contact cutting / finishing cell'],coilInsulate:['Batch impregnation / cure chamber',null,'Automatic vacuum impregnation / cure cell'],coilTest:['Coil electrical test fixture','Manual continuity / insulation test bench','Automatic winding test station'],regTest:['Regulator pressure / leak test bench',null,'Automatic pressure / leak test manifold'],calibrate:['Instrumented engine calibration stand',null,'Automatic engine calibration sequence'],qa:['Engine acceptance / certification stand',null,'Automatic acceptance and traceability cell'],support:['Toolroom repair bench','Basic manual toolroom bench',null,'Spartan modular repair fixture bench']};
for(const [type,s]of Object.entries(SPECS)){
 const names=MODEL_FAMILIES[s.art],overrides=MODEL_PROCESS_NAMES[type]||[],keys=['standard','manual','automated','spartan','vc'];
 if(['assembly','racks'].includes(s.art)&&!s.models.vc)s.models.vc={name:names[4],price:Math.round(s.price*1.95),days:s.days+5,speed:1.38,workerDelta:-1,description:'Proposed VC fixtures, controls and verification within the reserved service envelope.'};
 keys.forEach((key,i)=>{if(s.models[key])s.models[key].name=overrides[i]||names[i]||s.models[key].name});
 const gain={press:1.32,furnace:1.18,coating:1.25,cnc:1.35,bench:1.22,electronics:1.4,inspection:1.45,winder:1.3,wire:1.22,assembly:1.28,racks:1.2,robot:1.3,test:1.2,palletizer:1.4}[s.art];
 if(s.models.automated)s.models.automated.speed=gain;
 if(s.models.vc)s.models.vc.speed=Math.max(s.models.vc.speed,gain+.12);
}

// V4.2 adopted engineering limits and in-house fabrication designs.
for(const [type,s]of Object.entries(SPECS)){
 s.operatorLimit=Math.max(1,DEFAULT_STAFFING[type]||s.workers);
 s.helpers=['cast','heat','finish','field','energy','thermal','integrate','package','support'].includes(type)?1:0;
 if(s.models.spartan)s.models.spartan.retired=true;
 const commercial=Object.values(s.models).filter(m=>!m.retired&&!m.inHouse&&m!==s.models.vc),best=Math.max(...commercial.map(m=>m.speed));
 if(s.support){s.models.commercialService={name:'Commercial modular service/tooling cell',price:Math.round(s.price*1.4),days:s.days+4,speed:1,workerDelta:0,description:'Modular commercial fixtures and maintenance tooling; existing technician qualifications remain required.'};commercial.push(s.models.commercialService)}const old=s.models.vc||{workerDelta:-1};if(s.models.vc)s.models.vcLegacy={...s.models.vc,name:s.models.vc.name+' · legacy design',retired:true,inHouse:false};
 s.models.vc={...old,name:'VC generation I · '+s.name,price:0,days:Math.max(...commercial.map(m=>m.days))*3,speed:best*1.06,inHouse:true,description:'In-house fabrication: warehouse materials and labor, no external equipment purchase. Nominal capability 6% above the best commercial design.',bill:{iron:Math.ceil(s.w*s.h*45),nickel:Math.ceil(s.w*s.h*9),copper:Math.ceil(s.w*s.h*4),electronicsFeed:Math.ceil(s.w*s.h*2)},fabricationManHours:s.w*s.h*24};
}
const CANON_GROUP_NAMES={housing:'Injector-relay housing and frame',field:'Magnet-ring assembly',energy:'Ion-grid and particle-energizer cassette',gas:'Propellant pump and injection set',electronic:'Charge-input control electronics',thermal:'Ionization chamber and thermal jacket',interface:'Power-feed and mounting interfaces',sensor:'Engine sensors and safety instrumentation'};
for(const [id,title]of Object.entries(CANON_GROUP_NAMES)){MATERIALS[id].title=title;if(SPECS[id])SPECS[id].name=title+' cell'}
MATERIALS.housingRaw.title='Injector-relay housing preform';MATERIALS.housingHeat.title='Heat-treated injector-relay housing';
for(const id of ['kit','machined','core','calibrated','tested','shipped'])MATERIALS[id].title=({kit:'Complete IE-4 eight-module kit',machined:'Machined IE-4 engine',core:'Assembled IE-4 ion engine',calibrated:'Calibrated IE-4 ion engine',tested:'Certified IE-4 ion engine',shipped:'Packaged IE-4 ion engine'})[id];

// Short floor labels retain the type/number while full descriptions stay in hover/details.
for(const [id,label]of Object.entries({cast:'CAST',heat:'HEAT',finish:'FINISH',wireDraw:'DRAW',wireFinish:'WIRE FIN',insulationForm:'INS FORM',coilWind:'WIND',coilInsulate:'COIL INS',coilTest:'COIL QA',regMachine:'REG CNC',regAssemble:'REG ASSY',regTest:'REG QA',sealForm:'SEAL',sealInspect:'SEAL QA',contactMachine:'CONTACT',couplerMachine:'CPL CNC',couplerCoat:'CPL COAT',couplerFit:'CPL FIT',housingMachine:'HOUSING',field:'MAGNET',energy:'GRID',gas:'PUMP',electronic:'CTRL',thermal:'CHAMBER',interface:'PWR FIT',sensor:'SENSOR',kit:'KIT',cnc:'CNC',integrate:'ASSY',calibrate:'CAL',qa:'QA',package:'PACK',support:'SERVICE'}))SPECS[id].tileLabel=label;

// Adopted packaged working envelopes, not canonical dimensions from the engine image.
// Unit masses still come from the conserved recipe; these profiles add packing/visual geometry.
const ITEM_ENVELOPES={housingRaw:[1.8,1.3,.65],housingHeat:[1.7,1.2,.65],housingBlank:[1.7,1.2,.62],housing:[1.7,1.2,.6],field:[1.2,1.2,.42],energy:[1.6,1.05,.36],gas:[1.2,1,.42],electronic:[.8,.6,.52],thermal:[1.3,1.1,.42],interface:[1.1,.7,.33],sensor:[.8,.6,.52],kit:[2.4,1.6,1.15],machined:[2.4,1.6,1.15],core:[2.4,1.6,1.15],calibrated:[2.4,1.6,1.15],tested:[2.4,1.6,1.15],shipped:[2.4,1.6,1.15],fieldCoil:[.35,.35,.1],regulator:[.32,.22,.16],seal:[.12,.12,.02],processor:[.15,.12,.08],coupler:[.23,.18,.12],sensorModule:[.16,.12,.16],safingModule:[.18,.15,.15]};
for(const [id,envelope]of Object.entries(ITEM_ENVELOPES)){MATERIALS[id].envelope=envelope;MATERIALS[id].stackable=!['kit','machined','core','calibrated','tested','shipped'].includes(id)}
const STORAGE_PACKAGE_QUANTITIES={iron:1000,nickel:1000,cobalt:1000,chromium:1000,copper:1000,silver:1000,gold:1000,pgm:1000,superconductor:250,ceramic:500,tibanna:200,electronicsFeed:100,coolant:200,insulationFeed:250,sealCompound:250,fieldCoil:12,regulator:6,seal:100,processor:25,coupler:8,sensorModule:10,safingModule:10,coilWireRaw:12,coilWire:12,coilInsulation:12,woundCoil:12,insulatedCoil:12,regBlank:6,regUntested:6,sealRaw:100,contact:100,couplerBlank:8,couplerCoated:8,regValve:25,regSense:25};
for(const [id,quantity]of Object.entries(STORAGE_PACKAGE_QUANTITIES))MATERIALS[id].storagePackageQuantity=quantity;

// One-square transfer automation; it is equipment, not an invented production recipe.
SPECS.inserter={cycleTimeMinutes:null,name:'Robotic inserter arm',machineName:'Robotic inserter arm',w:1,h:1,workers:0,operatorLimit:0,helpers:0,autonomous:true,support:true,category:'handling',stage:null,art:'inserter',port:'fixed',accessDescription:'Pickup behind the base; placement in front. R rotates the arm.',inputs:{},outputs:{},rate:10800,price:16000,days:2,color:'#c89952',models:{standard:{name:'Standard transfer arm',price:16000,days:2,speed:1,workerDelta:0,armPayload:250,armVolume:2.5,description:'Automated three-second transfers; no full-time operator. Existing maintenance access still applies.'},heavy:{name:'Heavy-payload transfer arm',price:31000,days:4,speed:1.35,workerDelta:0,armPayload:1000,armVolume:6,description:'Stronger gripper and actuators for large assemblies and engines.'},vc:{name:'VC transfer arm · generation I',price:0,days:12,speed:1.431,workerDelta:0,armPayload:1100,armVolume:6,inHouse:true,generation:1,bill:{iron:80,nickel:12,copper:5,electronicsFeed:4},fabricationManHours:24,description:'In-house arm; explicit fabrication materials and labor, no external purchase.'}}};
ION_REGISTER.categories.handling='Transfer automation';
// New CNC designs share the same selectable recipe family; their identity does not cap future generations.
Object.assign(SPECS.cnc.models,{fiveAxis:{name:'Enclosed five-axis machining centre',price:275000,days:16,speed:1.65,workerDelta:0,artVariant:'cncFiveAxis',generation:2,visualIdentity:{accent:'#7fd8e6',mark:'5X',finish:.17},description:'Adopted five-axis fixtures, spindle access and integrated probing; selectable machining recipes.'},millTurn:{name:'Mill-turn machining centre',price:250000,days:15,speed:1.5,workerDelta:0,artVariant:'cncLathe',generation:2,visualIdentity:{accent:'#8ac3dd',mark:'MT',finish:.14},description:'Combined turning and milling with automatic tooling within the same working envelope.'},vc2:{...SPECS.cnc.models.vc,name:'VC machining centre · generation II',generation:2,speed:1.749,days:48,artVariant:'cncFiveAxis',bill:{iron:320,nickel:75,copper:28,electronicsFeed:24},fabricationManHours:240,visualIdentity:{accent:'#cfb0f0',mark:'G2',finish:.23},description:'Generation II in-house design; 6% above the strongest current commercial CNC design.'}});
