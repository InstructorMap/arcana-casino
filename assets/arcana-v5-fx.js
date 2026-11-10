/* ARCANA V5 — procedural audio and visual orchestration; no external audio downloads. */
window.ArcanaFX=(()=>{
let audio=null,enabled=true;
const get=()=>{try{return audio||(audio=new(window.AudioContext||window.webkitAudioContext)())}catch{return null}};
function tone(freq=440,duration=.12,kind="sine",volume=.035,delay=0){if(!enabled)return;const a=get();if(!a)return;if(a.state==="suspended")a.resume().catch(()=>{});const t=a.currentTime+delay,o=a.createOscillator(),g=a.createGain();o.type=kind;o.frequency.setValueAtTime(freq,t);g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(volume,t+.015);g.gain.exponentialRampToValueAtTime(.0001,t+duration);o.connect(g).connect(a.destination);o.start(t);o.stop(t+duration+.02)}
function noise(duration=.16,volume=.025){if(!enabled)return;const a=get();if(!a)return;const n=Math.ceil(a.sampleRate*duration),buffer=a.createBuffer(1,n,a.sampleRate),samples=buffer.getChannelData(0);for(let i=0;i<n;i++)samples[i]=(Math.random()*2-1)*(1-i/n);let src=a.createBufferSource(),f=a.createBiquadFilter(),g=a.createGain();f.type="lowpass";f.frequency.value=1900;g.gain.value=volume;src.buffer=buffer;src.connect(f).connect(g).connect(a.destination);src.start()}
function event(type){if(!enabled)return;switch(type){
case "start":noise(.21,.016);[190,240,320].forEach((n,i)=>tone(n,.13,"triangle",.028,i*.075));break;
case "tick":tone(140,.055,"square",.009);break;
case "stop":tone(270,.11,"triangle",.038);tone(125,.15,"sine",.023,.04);break;
case "fall":noise(.12,.014);tone(300,.11,"sine",.024);break;
case "clear":tone(850,.14,"sine",.04);tone(1260,.17,"triangle",.025,.09);break;
case "win":[523,659,784,1046].forEach((n,i)=>tone(n,.26,"triangle",.045,i*.12));break;
case "bonus":[392,523,659,784,1046].forEach((n,i)=>tone(n,.4,"sine",.05,i*.17));break;
case "select":tone(480,.08,"sine",.02);break;
}}
function burst(target,count=28){if(!target)return;const rect=target.getBoundingClientRect();const parent=target.closest(".stage")||target.parentElement;const area=parent.getBoundingClientRect();for(let i=0;i<count;i++){const s=document.createElement("i");s.className="v5-particle";const x=rect.left-area.left+rect.width*(.2+Math.random()*.6),y=rect.top-area.top+rect.height*(.2+Math.random()*.6);s.style.cssText="left:"+x+"px;top:"+y+"px;--vx:"+(Math.random()*240-120)+"px;--vy:"+(-30-Math.random()*160)+"px;--hue:"+(25+Math.random()*50)+";--delay:"+(Math.random()*.13)+"s";parent.appendChild(s);setTimeout(()=>s.remove(),1200)}}
function screenPulse(){let stage=document.querySelector(".stage");if(!stage)return;stage.classList.remove("v5-impact");void stage.offsetWidth;stage.classList.add("v5-impact");setTimeout(()=>stage.classList.remove("v5-impact"),700)}
return{event,burst,screenPulse,setEnabled(v){enabled=!!v},get enabled(){return enabled}};
})();
