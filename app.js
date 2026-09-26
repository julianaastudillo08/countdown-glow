const KEY="countdown-glow-v1";
const pad=n=>String(n).padStart(2,"0");
function defaultTarget(){ const d=new Date(); d.setDate(d.getDate()+7); d.setMinutes(0,0,0); return d; }
function toLocal(d){ const p=n=>String(n).padStart(2,"0"); return `${d.getFullYear()}-${p(d.getMonth()+1)}-${p(d.getDate())}T${p(d.getHours())}:${p(d.getMinutes())}`; }
let saved=JSON.parse(localStorage.getItem(KEY)||"null");
if(!saved) saved={title:"Launch day", target: defaultTarget().toISOString()};
document.getElementById("title").value=saved.title;
document.getElementById("target").value=toLocal(new Date(saved.target));
document.getElementById("label").textContent=saved.title;
function tick(){
  const end=new Date(saved.target).getTime(); const now=Date.now(); let diff=Math.max(0,end-now);
  if(diff===0){ document.getElementById("status").textContent="Time's up!"; }
  else document.getElementById("status").textContent="";
  const d=Math.floor(diff/86400000); diff%=86400000;
  const h=Math.floor(diff/3600000); diff%=3600000;
  const m=Math.floor(diff/60000); const s=Math.floor((diff%60000)/1000);
  document.getElementById("d").textContent=pad(d);
  document.getElementById("h").textContent=pad(h);
  document.getElementById("m").textContent=pad(m);
  document.getElementById("s").textContent=pad(s);
}
document.getElementById("start").onclick=()=>{
  saved={title:document.getElementById("title").value.trim()||"Countdown", target:new Date(document.getElementById("target").value).toISOString()};
  localStorage.setItem(KEY, JSON.stringify(saved));
  document.getElementById("label").textContent=saved.title;
  tick();
};
tick(); setInterval(tick,1000);
