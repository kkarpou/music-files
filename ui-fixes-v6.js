(()=>{
'use strict';
const style=document.createElement('style');
style.textContent=`
#gameTools{position:static!important;inset:auto!important;transform:none!important;display:flex!important;align-items:center!important;gap:4px!important;flex:0 0 auto!important;margin:0 0 0 auto!important;z-index:1!important}
#gameTools .game-tool{width:28px!important;height:28px!important;min-width:28px!important;max-width:28px!important;padding:0!important;margin:0!important;display:grid!important;place-items:center!important;border-radius:5px!important;box-shadow:none!important;font-size:14px!important;line-height:1!important;overflow:hidden!important}
#gameTools .tool-label{display:none!important}
#gameTools .tool-icon{margin:0!important;display:block!important}
.top,#player .playerbar{overflow:hidden!important}
@media(max-width:850px){#gameTools .game-tool{width:26px!important;height:26px!important;min-width:26px!important;max-width:26px!important;font-size:13px!important}}
`;
document.head.appendChild(style);

function iconize(){
 const tour=document.getElementById('tourBtn');
 const theme=document.getElementById('themeBtn');
 if(tour){tour.innerHTML='?';tour.title='Οδηγός';tour.setAttribute('aria-label','Οδηγός')}
 if(theme){
  const light=document.documentElement.dataset.theme==='light';
  theme.textContent=light?'☾':'☀';
  theme.title=light?'Σκοτεινό θέμα':'Φωτεινό θέμα';
  theme.setAttribute('aria-label',theme.title);
 }
 const tools=document.getElementById('gameTools');
 if(!tools)return;
 const player=document.getElementById('player');
 const inCase=player&&!player.classList.contains('hidden');
 const target=inCase?document.querySelector('.playerbar'):document.querySelector('.top');
 if(!target)return;
 if(tools.parentElement!==target)target.appendChild(tools);
}

function wireFrame(){
 const f=document.getElementById('caseframe');
 if(!f)return;
 try{
  const d=f.contentDocument;
  if(!d||!d.body||d.__clickPromptsV6)return;
  d.__clickPromptsV6=true;
  const css=d.createElement('style');
  css.textContent='.prompt{cursor:pointer;user-select:none}.prompt:hover{filter:brightness(1.15)}';
  d.head.appendChild(css);
  d.addEventListener('click',e=>{
   const p=e.target.closest?.('.prompt');
   if(!p||!(/\bENTER\b/i.test(p.textContent)||/ΑΝΟΙΞΕ ΤΗΝ ΥΠΟΘΕΣΗ/i.test(p.textContent)))return;
   e.preventDefault();
   const ev=new d.defaultView.KeyboardEvent('keydown',{key:'Enter',code:'Enter',keyCode:13,which:13,bubbles:true,cancelable:true});
   (d.body||d.documentElement).dispatchEvent(ev);
  });
 }catch(e){}
}

const frame=document.getElementById('caseframe');
if(frame)frame.addEventListener('load',()=>{setTimeout(()=>{wireFrame();iconize()},50)});
new MutationObserver(()=>{iconize();wireFrame()}).observe(document.body,{childList:true,subtree:true});
document.addEventListener('click',e=>{if(e.target.closest?.('#themeBtn'))setTimeout(iconize,0)},true);
iconize();wireFrame();
})();