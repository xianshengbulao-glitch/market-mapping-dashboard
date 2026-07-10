const http = require('http');
const page = process.argv[2] || 'history';
const outPath = `C:/Users/m1896/Documents/kimi/workspace/market-mapping-history/dashboard/screenshot-${page}.png`;

function send(data) {
  return new Promise((resolve) => {
    const req = http.request({hostname:'127.0.0.1',port:10086,path:'/command',method:'POST',headers:{'Content-Type':'application/json'}}, res => {
      let b=''; res.on('data',c=>b+=c); res.on('end',()=>{try{resolve(JSON.parse(b))}catch(e){resolve({error:e.message})}});
    });
    req.write(JSON.stringify(data)); req.end();
  });
}

(async () => {
  await send({action:'navigate',args:{url:'file:///C:/Users/m1896/Documents/kimi/workspace/market-mapping-history/dashboard/index.html',newTab:true},session:'market-verify'});
  await new Promise(r=>setTimeout(r,1000));
  await send({action:'evaluate',args:{code:`document.querySelector("[data-page='${page}']").click()`},session:'market-verify'});
  await new Promise(r=>setTimeout(r,1500));
  const r = await send({action:'screenshot',args:{format:'png',path:outPath},session:'market-verify'});
  console.log(JSON.stringify(r));
})();
