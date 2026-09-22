(()=>{
'use strict';
const THEME_KEY='musicFilesThemeV1';
let theme=localStorage.getItem(THEME_KEY)||'dark';

const css=document.createElement('style');
css.textContent=`
:root{--guide-red:#e53935}
.game-tools{position:static!important;z-index:120;display:flex;align-items:center;gap:5px;flex:0 0 auto;margin-left:auto}
.game-tool{border:1px solid #46525d;background:rgba(10,14,18,.96);color:#eef2f5;padding:5px 8px;border-radius:5px;cursor:pointer;font:700 .70rem "Segoe UI",Tahoma,Arial,sans-serif;box-shadow:none;white-space:nowrap}
.game-tool .tool-icon{font-weight:900;margin-right:4px}
html[data-theme="light"] body{background:#eef1f3!important;color:#1e252b!important}
html[data-theme="light"] .game-tool{background:#fff;color:#1e252b;border-color:#8d979f}
html[data-theme="light"] .desktop-qr{background:rgba(255,255,255,.97)!important;color:#1e252b!important;border-color:#8d979f!important}
html[data-theme="light"] .desktop-qr span{color:#59636b!important}
@media(min-width:851px){
 html,body{height:100%!important;overflow:hidden!important}
 #hub{height:100vh!important;display:grid!important;grid-template-rows:44px auto minmax(0,1fr) auto!important;overflow:hidden!important}
 .top{height:44px!important;min-height:44px!important;position:relative!important;top:auto!important;padding:0 14px!important;gap:10px!important;overflow:hidden!important}
 .top .brand{flex:0 0 auto}.top .season{flex:0 1 auto;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
 .hero{width:100%!important;max-width:1360px!important;padding:12px 18px 7px!important;grid-template-columns:minmax(0,1fr) 330px!important;gap:12px!important}
 .hero h1{font-size:clamp(2.7rem,5.3vh,4.6rem)!important;margin:.08em 0!important}
 .intro{font-size:.92rem!important;line-height:1.35!important}
 .profile{padding:10px 12px!important}.profile h2{font-size:1.25rem!important;margin:.15em 0!important}.stats{margin-top:7px!important;gap:6px!important}.stat{padding-top:5px!important}.bar{margin-top:6px!important}
 .cases{width:100%!important;max-width:1360px!important;min-height:0!important;overflow:hidden!important;padding:4px 18px 8px!important}
 .wall{height:100%!important;min-height:0!important;grid-template-columns:repeat(3,minmax(0,1fr))!important;grid-template-rows:repeat(2,minmax(0,1fr))!important;gap:8px!important}
 .case{min-height:0!important;height:100%!important;padding:10px 12px!important;overflow:hidden!important}.case h3{font-size:clamp(1.05rem,2.1vh,1.4rem)!important;margin:.2em 0!important}.case p{font-size:clamp(.72rem,1.35vh,.88rem)!important;line-height:1.28!important;margin:.25em 0!important}.tags{gap:3px!important}.tag{font-size:.58rem!important;padding:2px 4px!important}.state{margin-top:5px!important;font-size:.66rem!important}
 .footer{padding:5px 10px!important;min-height:34px!important;font-size:.68rem!important;overflow:hidden!important}
 #player{height:100vh!important;display:grid!important;grid-template-rows:40px minmax(0,1fr)!important;overflow:hidden!important}
 .playerbar{height:40px!important;min-height:40px!important;padding:0 7px!important;gap:6px!important;overflow:hidden!important}.playerbar strong{font-size:.66rem!important;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:28vw}.pbtn{padding:4px 7px!important;font-size:.68rem!important;white-space:nowrap}
 .desktop-qr{width:132px!important;padding:7px!important;right:12px!important;bottom:38px!important}.desktop-qr img{width:106px!important;height:106px!important;margin-bottom:5px!important}.desktop-qr strong{font-size:.66rem!important}.desktop-qr span{font-size:.58rem!important}
}
@media(max-width:850px){.game-tools{gap:3px;margin-left:auto}.game-tool{padding:4px 6px;font-size:.66rem}.game-tool .tool-label{display:none}.game-tool .tool-icon{margin:0}}
`;
document.head.appendChild(css);

const tools=document.createElement('div');
tools.className='game-tools';
tools.id='gameTools';
tools.innerHTML='<button class="game-tool" id="themeBtn" type="button"></button>';
document.body.appendChild(tools);
const themeBtn=document.getElementById('themeBtn');

function placeTools(){
 const player=document.getElementById('player');
 const inCase=player&&!player.classList.contains('hidden');
 const target=inCase?document.querySelector('.playerbar'):document.querySelector('.top');
 if(!target)return;
 if(inCase){
  const spacer=target.querySelector('.spacer');
  if(spacer)target.insertBefore(tools,spacer);else target.appendChild(tools);
 }else{
  const season=target.querySelector('.season');
  if(season)target.insertBefore(tools,season);else target.appendChild(tools);
 }
}

function innerCSS(){return `
.action-required{outline:4px solid #e53935!important;outline-offset:3px!important;border-color:#e53935!important;box-shadow:0 0 0 7px rgba(229,57,53,.18),0 0 20px rgba(229,57,53,.35)!important;animation:guidePulse 1.25s ease-in-out infinite!important}.prompt.action-required{color:#ff7772!important}.controls .action-required{padding:3px 6px!important;border-radius:5px!important;background:rgba(229,57,53,.12)!important}@keyframes guidePulse{50%{box-shadow:0 0 0 3px rgba(229,57,53,.12),0 0 8px rgba(229,57,53,.22)}}
html[data-game-theme="light"],html[data-game-theme="light"] body{background:#eef1f3!important;color:#1d252b!important;color-scheme:light!important}html[data-game-theme="light"]{--bg:#eef1f3;--panel:#f8fafb;--panel2:#fff;--ink:#1d252b;--muted:#5d6870;--line:#aeb7bd;--cyan:#006f8c;--mag:#a51458;--amber:#8d6200;--green:#27784e;--shadow:0 14px 42px rgba(45,55,62,.14)}html[data-game-theme="light"] .topbar,html[data-game-theme="light"] .controls{background:#e1e6e9!important;color:#475159!important}html[data-game-theme="light"] .card,html[data-game-theme="light"] .screen,html[data-game-theme="light"] .sidebar,html[data-game-theme="light"] .feature,html[data-game-theme="light"] .statement,html[data-game-theme="light"] .event,html[data-game-theme="light"] .side,html[data-game-theme="light"] .legend,html[data-game-theme="light"] .scorebox,html[data-game-theme="light"] .conclusion,html[data-game-theme="light"] .comparebox{background:#f8fafb!important;color:#1d252b!important;border-color:#aeb7bd!important}html[data-game-theme="light"] .option{background:#fff!important;color:#1d252b!important;border-color:#aeb7bd!important}html[data-game-theme="light"] .copy,html[data-game-theme="light"] .subtitle,html[data-game-theme="light"] .screenhead p,html[data-game-theme="light"] .feature p,html[data-game-theme="light"] .statement p,html[data-game-theme="light"] .event p{color:#364149!important}html[data-game-theme="light"] .meta,html[data-game-theme="light"] .option small,html[data-game-theme="light"] .tag{color:#5d6870!important}html[data-game-theme="light"] .network,html[data-game-theme="light"] .plot{background:#e9eef1!important}
@media(min-width:851px){
 html,body{height:100%!important;min-height:100%!important;overflow:hidden!important}
 #app{height:100vh!important;min-height:0!important;display:grid!important;grid-template-rows:38px minmax(0,1fr) 34px!important;overflow:hidden!important}
 .topbar{height:38px!important;min-height:38px!important;padding:0 10px!important}.controls{height:34px!important;min-height:34px!important;font-size:.68rem!important;gap:12px!important}
 main{display:block!important;height:auto!important;min-height:0!important;overflow:hidden!important;padding:5px!important}.stage{height:100%!important;min-height:0!important;overflow:hidden!important}.card{height:100%!important;min-height:0!important;overflow:hidden!important}
 .center{height:100%!important;padding:16px!important}.title{font-size:clamp(2.8rem,8vh,5.2rem)!important}.subtitle{font-size:clamp(.82rem,1.65vh,1.02rem)!important;line-height:1.3!important}.feed{gap:4px!important;margin-top:8px!important}.feed div{padding:5px 8px!important}.prompt{margin-top:10px!important;padding:7px 13px!important}
 .casefile{height:100%!important;min-height:0!important;overflow:hidden!important}.sidebar,.screen{min-height:0!important;overflow:hidden!important;padding:9px!important;gap:7px!important}.sidebar h2,.screen h2{font-size:clamp(1.35rem,2.8vh,1.85rem)!important;margin:.05em 0!important}.eyebrow{font-size:.62rem!important}.copy{font-size:clamp(.72rem,1.5vh,.9rem)!important;line-height:1.28!important}.screenhead{margin-bottom:5px!important;gap:8px!important}.screenhead p{font-size:.72rem!important;line-height:1.2!important}
 .evidence-list{gap:4px!important;margin-top:4px!important}.chip{padding:5px 7px!important;font-size:.72rem!important}.options{gap:5px!important;margin-top:5px!important}.option{padding:5px 7px!important;font-size:clamp(.68rem,1.35vh,.84rem)!important;line-height:1.15!important;min-height:0!important}.option small{font-size:.78em!important;margin-top:1px!important}
 .covers,.concepts{gap:5px!important;min-height:0!important}.covercard{padding:4px!important;gap:2px!important;min-height:0!important}.covermeta,.match{font-size:.62rem!important}.fakecover .name{font-size:.62rem!important}
 .networkwrap,.compare,.timeline,.report,.model,.cluster,.featuregrid,.grid4,.metrics,.logic,.scenario,.verdicts,.statement-grid{min-height:0!important;height:100%!important;overflow:hidden!important;gap:6px!important}.network{min-height:0!important;height:100%!important;overflow:hidden!important}.legend,.side{padding:7px!important;overflow:hidden!important}.legend h3,.side h3{font-size:.92rem!important;margin:0 0 4px!important}.metric{padding:4px 0!important;font-size:.72rem!important}
 .statement,.event,.feature,.tile{padding:7px!important;min-height:0!important;overflow:hidden!important}.statement h3,.event h3,.feature h3{font-size:.92rem!important;margin:.15em 0!important}.statement p,.event p,.feature p{font-size:.72rem!important;line-height:1.22!important}.timeline{align-items:stretch!important}.event{min-height:0!important}
 .report{grid-template-columns:220px minmax(0,1fr)!important}.scorebox,.conclusion{padding:9px!important;overflow:hidden!important}.scorebig{font-size:3.25rem!important}.bars{gap:4px!important;margin-top:7px!important}.bar label{font-size:.68rem!important}.finding{padding:6px 8px!important;margin:5px 0!important;font-size:.74rem!important}.matrix{max-width:100%!important;min-width:0!important;overflow:hidden!important}.row,.cell{font-size:.66rem!important;padding:3px!important}
}
@media(min-width:851px) and (max-height:780px){#app{grid-template-rows:34px minmax(0,1fr) 30px!important}.topbar{height:34px!important;min-height:34px!important}.controls{height:30px!important;min-height:30px!important}.screen,.sidebar{padding:6px!important}.copy{font-size:.70rem!important}.option{padding:4px 6px!important}.networkwrap{grid-template-columns:minmax(0,1fr) 240px!important}.statement,.event,.feature{padding:5px!important}.casefile{grid-template-columns:32% 68%!important}.report{grid-template-columns:190px minmax(0,1fr)!important}.scorebig{font-size:2.8rem!important}}
@media(max-width:850px){html,body{overflow:auto!important}#app{height:auto!important;min-height:100dvh!important}.controls{display:none!important}}
`}

function frame(){return document.getElementById('caseframe')}
function fitDesktop(d){
 try{
  if(window.matchMedia('(max-width:850px)').matches)return;
  const stage=d.getElementById('stage'),card=stage?.firstElementChild;
  if(!stage||!card)return;
  card.style.transform='';card.style.transformOrigin='top left';card.style.width='100%';card.style.height='100%';
  requestAnimationFrame(()=>{
   const ah=stage.clientHeight,aw=stage.clientWidth,sh=card.scrollHeight,sw=card.scrollWidth;
   if(!ah||!aw||!sh||!sw)return;
   const scale=Math.min(1,ah/sh,aw/sw);
   if(scale<.995){card.style.transform=`scale(${scale})`;card.style.width=`${100/scale}%`;card.style.height=`${100/scale}%`}
  });
 }catch(e){}
}
function markCase(d){
 d.querySelectorAll('.action-required').forEach(x=>x.classList.remove('action-required'));
 let t=d.querySelector('.prompt')||d.querySelector('.option.focused');
 if(!t&&d.querySelector('.report'))t=d.querySelector('.option');
 if(t)t.classList.add('action-required');
}
function patchFrame(){
 const f=frame();if(!f)return;
 try{
  const d=f.contentDocument;if(!d||!d.head)return;
  let s=d.getElementById('music-interaction-layer');
  if(!s){s=d.createElement('style');s.id='music-interaction-layer';s.textContent=innerCSS();d.head.appendChild(s)}
  d.documentElement.dataset.gameTheme=theme;
  markCase(d);fitDesktop(d);
  const st=d.getElementById('stage');
  if(st&&!st.__musicUIObserver){
   st.__musicUIObserver=new MutationObserver(()=>{markCase(d);fitDesktop(d)});
   st.__musicUIObserver.observe(st,{childList:true,subtree:true});
  }
  if(!d.__musicUIInput){
   d.__musicUIInput=true;
   const later=()=>setTimeout(()=>{markCase(d);fitDesktop(d)},0);
   d.addEventListener('keydown',later);
   d.addEventListener('click',later);
   d.addEventListener('pointerup',later);
  }
 }catch(e){}
}
function applyTheme(){
 document.documentElement.dataset.theme=theme;
 document.documentElement.style.colorScheme=theme;
 themeBtn.innerHTML=theme==='dark'?'<span class="tool-icon">☀</span><span class="tool-label">Φωτεινό</span>':'<span class="tool-icon">☾</span><span class="tool-label">Σκοτεινό</span>';
 let s=document.getElementById('hubLightTheme');
 if(!s){
  s=document.createElement('style');s.id='hubLightTheme';
  s.textContent=`html[data-theme="light"]{--bg:#eef1f3;--panel:#f8fafb;--ink:#1d252b;--muted:#5d6870;--line:#aeb7bd;--cyan:#006f8c;--mag:#a51458;--amber:#8d6200;--green:#27784e}html[data-theme="light"] body{background:radial-gradient(circle at 15% 5%,#fff,#eef1f3 48%,#e5eaed)!important}html[data-theme="light"] .top,html[data-theme="light"] .profile,html[data-theme="light"] .case,html[data-theme="light"] .footer,html[data-theme="light"] .playerbar{background:#f8fafb!important;color:#1d252b!important;border-color:#aeb7bd!important}html[data-theme="light"] .case p,html[data-theme="light"] .intro{color:#3c474f!important}html[data-theme="light"] .btn,html[data-theme="light"] .pbtn{background:#fff!important;color:#1d252b!important;border-color:#8d979f!important}`;
  document.head.appendChild(s);
 }
 patchFrame();
}

themeBtn.onclick=()=>{
 theme=theme==='dark'?'light':'dark';
 localStorage.setItem(THEME_KEY,theme);
 applyTheme();
};

const f=frame();
if(f)f.addEventListener('load',()=>setTimeout(()=>{placeTools();patchFrame()},120));
new MutationObserver(()=>{placeTools();patchFrame()}).observe(document.body,{childList:true,subtree:true});
window.addEventListener('resize',()=>{placeTools();patchFrame()});
applyTheme();
placeTools();
setTimeout(()=>{placeTools();patchFrame()},300);
})();