const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];

// mobile menu
const nav=$('#nav'),menu=$('.menu');
menu.addEventListener('click',()=>menu.setAttribute('aria-expanded',nav.classList.toggle('open')));
nav.addEventListener('click',e=>{if(e.target.tagName==='A'){nav.classList.remove('open');menu.setAttribute('aria-expanded','false')}});

// skills tabs (all panels stay visible if JavaScript is off)
const tabs=$$('[role=tab]'),panels=$$('[role=tabpanel]');
function pick(t){
 tabs.forEach(x=>{const on=x===t;x.setAttribute('aria-selected',on);x.tabIndex=on?0:-1});
 panels.forEach(p=>p.hidden=p.id!==t.getAttribute('aria-controls'));
}
tabs.forEach((t,i)=>{
 t.addEventListener('click',()=>pick(t));
 t.addEventListener('keydown',e=>{
  const step={ArrowRight:1,ArrowLeft:-1}[e.key];
  if(step){const n=tabs[(i+step+tabs.length)%tabs.length];n.focus();pick(n)}
 });
});
pick(tabs[0]);

// copy email
$('#copy').addEventListener('click',async e=>{
 const b=e.currentTarget;
 try{await navigator.clipboard.writeText(b.dataset.email);b.textContent='Email copied'}
 catch{b.textContent=b.dataset.email}
 setTimeout(()=>b.textContent='Copy email',2500);
});

$('#year').textContent=new Date().getFullYear();

// optional profile photo: initials show until images/profile.jpg exists
const photo=$('.photo img'),noPhoto=()=>photo.remove();
photo.addEventListener('error',noPhoto);
if(photo.complete&&!photo.naturalWidth)noPhoto();
