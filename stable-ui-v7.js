(()=>{
'use strict';
const shell=document.getElementById('season');
if(!shell)return;
const THEME_KEY='musicFilesThemeV1';
let theme=localStorage.getItem(THEME_KEY)||'dark';

function seasonDoc(){try{return shell.contentDocument}catch(e){return null}}
function seasonWin(){try{return shell.contentWindow}catch(e){return null}}

function addStyle(d,id,text){if(!d||d.getElementById(id))return;const s=d.createElement('style');s.id=id;s.textContent=text;d.head.appendChild(s)}

const seasonCSS=`
html,body{height:100%!important;overflow:hidden!important}
#hub{height:100vh!important;display:grid!important;grid-template-rows:44px auto minmax(0,1fr) auto!important;overflow:hidden!important}
.top{height:44px!important;min-height:44px!important;position:relative!important;top:auto!important;padding:0 14px!important;gap:8px!important;overflow:hidden!important}
.top .brand{flex:0 0 auto}.top .season{min-width:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.stable-tools{display:flex;gap:4px;align-items:center;flex:0 0 auto;margin-left:auto}
.stable-tool{width:28px;height:28px;min-width:28px;border:1px solid #46525d;background:#10161b;color:#eef2f5;border-radius:5px;display:grid;place-items:center;padding:0;cursor:pointer;font:800 14px/1 "Segoe UI",Arial,sans-serif}
.hero{width:100%!important;max-width:1360px!important;padding:10px 18px 6px!important;grid-template-columns:minmax(0,1fr) 330px!important;gap:10px!important}
.hero h1{font-size:clamp(2.5rem,5vh,4.4rem)!important;margin:.05em 0!important}.intro{font-size:.9rem!important;line-height:1.3!important}.profile{padding:9px 11px!important}.profile h2{font-size:1.2rem!important;margin:.1em 0!important}.stats{margin-top:6px!important;gap:5px!important}.stat{padding-top:4px!important}.bar{margin-top:5px!important}
.cases{width:100%!important;max-width:1360px!important;min-height:0!important;overflow:hidden!important;padding:4px 18px 7px!important}.wall{height:100%!important;min-height:0!important;grid-template-columns:repeat(3,minmax(0,1fr))!important;grid-template-rows:repeat(2,minmax(0,1fr))!important;gap:7px!important}.case{height:100%!important;min-height:0!important;padding:9px 11px!important;overflow:hidden!important}.case h3{font-size:clamp(1rem,2vh,1.35rem)!important;margin:.15em 0!important}.case p{font-size:clamp(.7rem,1.25vh,.84rem)!important;line-height:1.22!important;margin:.2em 0!important}.tags{gap:3px!important}.tag{font-size:.56rem!important;padding:2px 4px!important}.state{margin-top:4px!important;font-size:.64rem!important}.footer{padding:4px 8px!important;min-height:32px!important;font-size:.66rem!important;overflow:hidden!important}
#player{height:100vh!important;display:grid!important;grid-template-rows:40px minmax(0,1fr)!important;overflow:hidden!important}.playerbar{height:40px!important;min-height:40px!important;padding:0 7px!important;gap:5px!important;overflow:hidden!important}.playerbar strong{font-size:.64rem!important;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:26vw}.pbtn{padding:4px 6px!important;font-size:.66rem!important;white-space:nowrap}.touchbar{display:none!important}#caseframe{width:100%!important;height:100%!important;border:0!important}
html[data-stable-theme="light"] body{background:#eef1f3!important;color:#1e252b!important}html[data-stable-theme="light"] .top,html[data-stable-theme="light"] .profile,html[data-stable-theme="light"] .case,html[data-stable-theme="light"] .footer,html[data-stable-theme="light"] .playerbar{background:#f8fafb!important;color:#1d252b!important;border-color:#aeb7bd!important}html[data-stable-theme="light"] .case p,html[data-stable-theme="light"] .intro{color:#3c474f!important}html[data-stable-theme="light"] .btn,html[data-stable-theme="light"] .pbtn,html[data-stable-theme="light"] .stable-tool{background:#fff!important;color:#1d252b!important;border-color:#8d979f!important}
@media(max-width:850px){html,body{overflow:auto!important}#hub{height:auto!important;display:block!important}.top{height:44px!important}.hero{display:block!important;padding:18px 10px 8px!important}.cases{padding:6px 10px 18px!important;overflow:visible!important}.wall{display:grid!important;grid-template-columns:1fr!important;grid-template-rows:none!important;height:auto!important}.case{min-height:180px!important}.footer{padding-bottom:18px!important}#player{height:100dvh!important;grid-template-rows:40px minmax(0,1fr) 64px!important}.touchbar{display:grid!important}.stable-tool{width:26px;height:26px;min-width:26px;font-size:13px}}
`;

const caseCSS=`
html,body{height:100%!important;min-height:100%!important;overflow:hidden!important}
#app{height:100vh!important;min-height:0!important;display:grid!important;grid-template-rows:36px minmax(0,1fr) 30px!important;overflow:hidden!important}
.topbar{height:36px!important;min-height:36px!important;padding:0 9px!important}.controls{height:30px!important;min-height:30px!important;font-size:.66rem!important;gap:11px!important}
main{height:auto!important;min-height:0!important;overflow:hidden!important;padding:5px!important;display:flex!important}.stage{height:100%!important;min-height:0!important;overflow:hidden!important}.card{height:100%!important;min-height:0!important;overflow:hidden!important}
.center{height:100%!important;padding:12px!important}.title{font-size:clamp(2.6rem,7.5vh,5rem)!important}.subtitle{font-size:clamp(.78rem,1.5vh,.98rem)!important;line-height:1.24!important}.feed{gap:4px!important;margin-top:7px!important}.feed div{padding:5px 7px!important}.prompt{margin-top:8px!important;padding:7px 12px!important;cursor:pointer!important;user-select:none!important}
.casefile{height:100%!important;min-height:0!important;overflow:hidden!important}.sidebar,.screen{min-height:0!important;overflow:hidden!important;padding:7px!important;gap:5px!important}.sidebar h2,.screen h2{font-size:clamp(1.25rem,2.6vh,1.72rem)!important;margin:.04em 0!important}.eyebrow{font-size:.58rem!important}.copy{font-size:clamp(.68rem,1.35vh,.84rem)!important;line-height:1.22!important}.screenhead{margin-bottom:4px!important;gap:7px!important}.screenhead p{font-size:.68rem!important;line-height:1.15!important}
.evidence-list{gap:3px!important;margin-top:3px!important}.chip{padding:4px 6px!important;font-size:.68rem!important}.options{gap:4px!important;margin-top:auto!important}.option{padding:4px 6px!important;font-size:clamp(.64rem,1.2vh,.8rem)!important;line-height:1.12!important;min-height:0!important}.option small{font-size:.76em!important;margin-top:1px!important}
.covers,.concepts{gap:4px!important;min-height:0!important}.covercard{padding:4px!important;gap:2px!important;min-height:0!important}.covermeta,.match{font-size:.58rem!important}.fakecover .name{font-size:.58rem!important}
.networkwrap,.compare,.timeline,.report,.model,.cluster,.featuregrid,.grid4,.metrics,.logic,.scenario,.verdicts,.statement-grid{min-height:0!important;height:100%!important;overflow:hidden!important;gap:5px!important}.network{min-height:0!important;height:100%!important;overflow:hidden!important}.legend,.side{padding:6px!important;overflow:hidden!important}.legend h3,.side h3{font-size:.86rem!important;margin:0 0 3px!important}.metric{padding:3px 0!important;font-size:.68rem!important}
.statement,.event,.feature,.tile{padding:5px!important;min-height:0!important;overflow:hidden!important}.statement h3,.event h3,.feature h3{font-size:.86rem!important;margin:.1em 0!important}.statement p,.event p,.feature p{font-size:.68rem!important;line-height:1.16!important}.timeline{align-items:stretch!important}.event{min-height:0!important}.report{grid-template-columns:190px minmax(0,1fr)!important}.scorebox,.conclusion{padding:7px!important;overflow:hidden!important}.scorebig{font-size:2.8rem!important}.bars{gap:3px!important;margin-top:5px!important}.bar label{font-size:.64rem!important}.finding{padding:5px 7px!important;margin:4px 0!important;font-size:.69rem!important}.row,.cell{font-size:.62rem!important;padding:2px!important}
html[data-stable-theme="light"],html[data-stable-theme="light"] body{background:#eef1f3!important;color:#1d252b!important;color-scheme:light!important}html[data-stable-theme="light"]{--bg:#eef1f3;--panel:#f8fafb;--panel2:#fff;--ink:#1d252b;--muted:#5d6870;--line:#aeb7bd;--cyan:#006f8c;--mag:#a51458;--amber:#8d6200;--green:#27784e}html[data-stable-theme="light"] .topbar,html[data-stable-theme="light"] .controls{background:#e1e6e9!important;color:#475159!important}html[data-stable-theme="light"] .card,html[data-stable-theme="light"] .screen,html[data-stable-theme="light"] .sidebar,html[data-stable-theme="light"] .feature,html[data-stable-theme="light"] .statement,html[data-stable-theme="light"] .event,html[data-stable-theme="light"] .side,html[data-stable-theme="light"] .legend,html[data-stable-theme="light"] .scorebox,html[data-stable-theme="light"] .conclusion{background:#f8fafb!important;color:#1d252b!important;border-color:#aeb7bd!important}html[data-stable-theme="light"] .option{background:#fff!important;color:#1d252b!important;border-color:#aeb7bd!important}
@media(max-width:850px){html,body{overflow:auto!important}#app{height:auto!important;min-height:100dvh!important;grid-template-rows:38px minmax(0,1fr)!important}.controls{display:none!important}main{overflow-y:auto!important;padding:5px!important}.stage,.card{height:auto!important;min-height:100%!important;overflow:visible!important}.screen,.sidebar{overflow:visible!important}}
`;

function currentCaseId(cf){const m=(cf.getAttribute('src')||cf.src||'').match(/case0?([1-6])/i);return m?Number(m[1]):null}

function fitCase(cf){
 try{
  if(matchMedia('(max-width:850px)').matches)return;
  const d=cf.contentDocument,stage=d?.getElementById('stage'),card=stage?.firstElementChild;
  if(!stage||!card)return;
  card.style.transform='none';card.style.transformOrigin='top left';card.style.width='100%';card.style.height='100%';
  requestAnimationFrame(()=>{
   const ah=stage.clientHeight,aw=stage.clientWidth,sh=Math.max(card.scrollHeight,card.getBoundingClientRect().height),sw=Math.max(card.scrollWidth,card.getBoundingClientRect().width);
   if(!ah||!aw||!sh||!sw)return;
   const scale=Math.min(1,ah/sh,aw/sw);
   if(scale<.995){card.style.transform=`scale(${scale})`;card.style.width=`${100/scale}%`;card.style.height=`${100/scale}%`}
  });
 }catch(e){}
}

function patchCaseFrame(cf){
 try{
  const d=cf.contentDocument,w=cf.contentWindow;if(!d||!d.head)return;
  addStyle(d,'stable-case-css',caseCSS);
  d.documentElement.dataset.stableTheme=theme;
  if(!d.__stableClickPrompt){
   d.__stableClickPrompt=true;
   d.addEventListener('click',e=>{
    const p=e.target.closest?.('.prompt');
    if(!p)return;
    const text=p.textContent||'';
    if(!(/\bENTER\b/i.test(text)||/ΑΝΟΙΞΕ ΤΗΝ ΥΠΟΘΕΣΗ/i.test(text)))return;
    e.preventDefault();
    if(typeof w.activate==='function')w.activate();
    else w.dispatchEvent(new w.KeyboardEvent('keydown',{key:'Enter',code:'Enter',bubbles:true,cancelable:true}));
   });
  }
  if(typeof w.render==='function'&&!w.__stableRenderV7){
   const original=w.render.bind(w);
   w.render=function(){original();fitCase(cf)};
   w.__stableRenderV7=true;
  }
  fitCase(cf);
 }catch(e){}
}

function translateCurrentCase(){
 try{
  const d=seasonDoc(),w=seasonWin(),cf=d?.getElementById('caseframe');if(!cf)return;
  const id=currentCaseId(cf);if(id&&typeof w.patchCase==='function')w.patchCase(cf,id);
 }catch(e){}
}

function applyTheme(){
 const d=seasonDoc();if(!d)return;
 d.documentElement.dataset.stableTheme=theme;
 const cf=d.getElementById('caseframe');
 try{if(cf?.contentDocument?.documentElement)cf.contentDocument.documentElement.dataset.stableTheme=theme}catch(e){}
 const b=d.getElementById('stableTheme');if(b){b.textContent=theme==='dark'?'☀':'☾';b.title=theme==='dark'?'Φωτεινό θέμα':'Σκοτεινό θέμα';b.setAttribute('aria-label',b.title)}
}

function placeTools(){
 const d=seasonDoc();if(!d)return;
 let tools=d.getElementById('stableTools');
 if(!tools){
  tools=d.createElement('div');tools.id='stableTools';tools.className='stable-tools';
  tools.innerHTML='<button id="stableGuide" class="stable-tool" type="button" title="Οδηγός" aria-label="Οδηγός">?</button><button id="stableTheme" class="stable-tool" type="button" aria-label="Αλλαγή θέματος"></button>';
  tools.querySelector('#stableGuide').onclick=()=>alert('Πλοήγηση: ↑/↓ επιλογή · Enter επιβεβαίωση · Esc πίσω · H βοήθεια. Μπορείς επίσης να κάνεις κλικ στις επιλογές και στο «ENTER — άνοιξε την υπόθεση».');
  tools.querySelector('#stableTheme').onclick=()=>{theme=theme==='dark'?'light':'dark';localStorage.setItem(THEME_KEY,theme);applyTheme()};
 }
 const player=d.getElementById('player'),inCase=player&&!player.classList.contains('hidden');
 const target=inCase?d.querySelector('.playerbar'):d.querySelector('.top');if(!target)return;
 if(tools.parentElement!==target)target.appendChild(tools);
 applyTheme();
}

function initSeason(){
 const d=seasonDoc();if(!d)return;
 addStyle(d,'stable-season-css',seasonCSS);
 placeTools();applyTheme();
 const cf=d.getElementById('caseframe');
 if(cf&&!cf.__stableLoadV7){
  cf.__stableLoadV7=true;
  cf.addEventListener('load',()=>{
   setTimeout(()=>{patchCaseFrame(cf);translateCurrentCase();placeTools()},40);
   setTimeout(()=>{translateCurrentCase();patchCaseFrame(cf)},500);
   setTimeout(()=>{translateCurrentCase();patchCaseFrame(cf)},1200);
  });
 }
 d.addEventListener('click',e=>{
  if(e.target.closest?.('.case,#home,#restart,#next,#demo,#reset'))setTimeout(()=>{placeTools();const c=d.getElementById('caseframe');if(c)patchCaseFrame(c)},40);
 },true);
 if(cf?.contentDocument?.readyState==='complete'){patchCaseFrame(cf);setTimeout(translateCurrentCase,500)}
}

shell.addEventListener('load',()=>{setTimeout(initSeason,30)});
if(shell.contentDocument?.readyState==='complete')setTimeout(initSeason,30);
})();