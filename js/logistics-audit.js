/* Import-time audits for finite belt slots, autonomous arms and road-only carriers. */
const LogisticsAudit=(()=>{
 function verify(r,buildings,specs,Day){const slots=new Map(),arms=new Map(),geo=Day.geometry(buildings,specs),machines=new Map(Object.values(buildings).flatMap(b=>b.machines.map(m=>[m.id,m])));const directArms=new Set(r.trips.filter(t=>t.kind==='inserter').map(t=>t.vehicle+'|'+t.start));let carriers=0,parcels=0;
 const add=(map,key,start,end,id)=>{const rows=map.get(key)||[];rows.push({start,end,id});map.set(key,rows)};
 for(const t of r.trips){const path=r.paths[t.path];if(['tug','forklift'].includes(t.kind)){for(const [scene,x,y]of path)if(scene!=='@campus'&&!geo.free(scene,x,y,t.kind))throw Error('Recorded carrier leaves its cart/loading network.');carriers++}
 if(t.kind==='belt'){if(!Number.isInteger(t.parcelSlots)||t.parcelSlots<1||t.parcelSlots>4||!Array.isArray(t.beltSlotIds)||t.beltSlotIds.length!==path.length||!Array.isArray(t.beltHolds)||t.beltHolds.length!==path.length||!Number.isFinite(t.beltClearance)||t.beltClearance<0)throw Error('Invalid belt parcel reservation.');for(let i=0;i<path.length;i++){const ids=t.beltSlotIds[i];if(!Array.isArray(ids)||ids.length<t.parcelSlots||ids.length>4||new Set(ids).size!==ids.length||ids.some(n=>!Number.isInteger(n)||n<0||n>3)||!Number.isFinite(t.beltHolds[i])||t.beltHolds[i]<0)throw Error('Invalid belt slot allocation.');for(const slot of ids)add(slots,JSON.stringify(path[i])+'|'+slot,t.start+t.times[i],(i+1<path.length?t.start+t.times[i+1]:t.drop)+t.beltClearance,t.id)}parcels++}
 if(t.kind==='inserter'){if(machines.get(t.vehicle)?.type!=='inserter'||t.driver!==null)throw Error('Invalid autonomous arm.');add(arms,t.vehicle,t.start,t.end,t.id)}
 }
 // Belt-linked arms have explicit work intervals rather than mobile carrier trips.
 for(const e of r.events)if(e.type==='work-start'&&machines.get(e.machine)?.type==='inserter'&&!directArms.has(e.machine+'|'+e.time))add(arms,e.machine,e.time,e.finish,e.machine+'@'+e.time);
 for(const [label,map]of [['Belt slot',slots],['Inserter',arms]])for(const rows of map.values()){rows.sort((a,b)=>a.start-b.start);for(let i=1;i<rows.length;i++)if(rows[i].start<rows[i-1].end-1e-6)throw Error(label+' reservation overlap.');}
 return {carrierTrips:carriers,beltParcels:parcels,reservedBeltSlots:slots.size,inserterCount:arms.size};
 }
 return {verify};
})();
if(typeof module!=='undefined')module.exports=LogisticsAudit;
