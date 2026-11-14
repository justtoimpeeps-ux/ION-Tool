/* Browser saves stay portable JSON internally; gzip avoids duplicating large
   layout snapshots against the browser's small localStorage quota. */
const FactoryStorage={
 async pack(text){if(typeof CompressionStream==='undefined')return text;const bytes=new Uint8Array(await new Response(new Blob([text]).stream().pipeThrough(new CompressionStream('gzip'))).arrayBuffer());let encoded='';for(let i=0;i<bytes.length;i+=16384)encoded+=String.fromCharCode(...bytes.subarray(i,i+16384));return JSON.stringify({format:'ION-gzip-1',data:btoa(encoded)})},
 async unpack(text){const data=JSON.parse(text);if(data.format!=='ION-gzip-1')return data;if(typeof DecompressionStream==='undefined')throw Error('Use JSON export/import in a browser with gzip support.');const bytes=Uint8Array.from(atob(data.data),c=>c.charCodeAt(0));return JSON.parse(await new Response(new Blob([bytes]).stream().pipeThrough(new DecompressionStream('gzip'))).text())}
};
