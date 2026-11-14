// Keep the editor responsive while calculating the campus forecast.
importScripts('engine.js');
onmessage=({data})=>{
 try{postMessage({result:FactoryEngine.simulate(data.buildings,data.specs,data.materials,{...data.options,onProgress:progress=>postMessage({progress})})})}
 catch(error){postMessage({error:error.message})}
};
