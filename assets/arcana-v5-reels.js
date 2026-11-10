/* ARCANA V5 - column reel renderer. Uses a moving strip overlay rather than random symbol flicker. */
window.ArcanaReels=(()=>{
const wait=ms=>new Promise(r=>setTimeout(r,ms));
async function spin({root,columns=5,rows=3,symbols,images,random,settle}){
if(!root||!root.isConnected)return;
const cells=[...root.querySelectorAll(".cell")];
if(cells.length!==columns*rows)return;
const rect=root.getBoundingClientRect(),cellRect=cells[0].getBoundingClientRect();
const overlays=[];
for(let x=0;x<columns;x++){
const top=cells[x].getBoundingClientRect(),bottom=cells[(rows-1)*columns+x].getBoundingClientRect();
const overlay=document.createElement("div");overlay.className="reel-track";overlay.style.cssText="left:"+(top.left-rect.left)+"px;top:"+(top.top-rect.top)+"px;width:"+top.width+"px;height:"+(bottom.bottom-top.top)+"px";
const strip=document.createElement("div");strip.className="reel-strip";strip.style.setProperty("--duration",(210+x*27)+"ms");
for(let i=0;i<10;i++){const img=document.createElement("img");img.alt="";img.src=images[symbols[random(symbols.length)]];strip.append(img)}
overlay.append(strip);root.append(overlay);overlays.push(overlay);
}
await Promise.all(overlays.map(async(overlay,x)=>{
await wait(900+x*230);
overlay.classList.add("stopping");await wait(250);
settle(x);
overlay.classList.add("ended");await wait(270);overlay.remove();
}));
}
return{spin};
})();
