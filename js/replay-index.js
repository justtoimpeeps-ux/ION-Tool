/* Presentation-only time index. Seeking never changes the operating ledger. */
class ReplayRangeIndex{
 constructor(records,start=r=>r.start,end=r=>r.end){this.records=records;this.events=[];records.forEach((r,index)=>{const a=start(r),b=end(r);if(b>a){this.events.push({time:a,index,enter:true},{time:b,index,enter:false})}});this.events.sort((a,b)=>a.time-b.time||Number(a.enter)-Number(b.enter)||a.index-b.index);this.reset()}
 reset(){this.time=-Infinity;this.cursor=0;this.active=new Set();this.result=[]}
 at(time){if(time<this.time)this.reset();let changed=false;while(this.cursor<this.events.length&&this.events[this.cursor].time<=time){const e=this.events[this.cursor++];if(e.enter)this.active.add(e.index);else this.active.delete(e.index);changed=true}this.time=time;if(changed)this.result=[...this.active].sort((a,b)=>a-b).map(i=>this.records[i]);return this.result}
}
if(typeof module!=='undefined')module.exports=ReplayRangeIndex;
