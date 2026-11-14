/* User-created locations have no invented inventories, employees or outputs. */
const FactorySites=(()=>{
 const kinds=['Factory','Headquarters','Mine','Refinery','Warehouse','Research'];
 function validate(sites){if(!Array.isArray(sites)||sites.length<1||sites.length>30)throw Error('Invalid site list.');const ids=new Set(),names=new Set();for(const s of sites){if(!/^[a-zA-Z0-9_-]{1,60}$/.test(s.id)||ids.has(s.id)||typeof s.name!=='string'||!/^[-a-zA-Z0-9 /]{1,65}$/.test(s.name)||!Array.isArray(s.buildings)||s.buildings.length<1||s.buildings.length>30)throw Error('Invalid site or building list.');ids.add(s.id);for(const n of s.buildings){if(typeof n!=='string'||!/^[-a-zA-Z0-9 &/]{1,100}$/.test(n)||names.has(n)||['__proto__','constructor','prototype'].includes(n))throw Error('Invalid or duplicate building name.');names.add(n)}}if(sites[0].id!=='orinda'||BLDGS.slice(0,6).some(n=>!sites[0].buildings.includes(n)))throw Error('Orinda reference buildings must be retained.');return sites}
 function blank(){return {cols:30,rows:22,machines:[],storage:[],paths:Array.from({length:30},(_,x)=>({x,y:11,kind:'cart',cargo:null,dir:0})),docks:{input:[[0,11]],output:[[29,11]]},revision:3,layoutRevision:5}}
 return {kinds,validate,blank};
})();
