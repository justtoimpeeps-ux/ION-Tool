importScripts('engine.js','day-engine.js');
onmessage=({data:d})=>{try{postMessage({result:FactoryDay.simulate(d.buildings,d.specs,d.materials,d.state,d.workers,d.config,d.supply,d.upgrades,progress=>postMessage({progress}))})}catch(e){postMessage({error:e.message})}};
