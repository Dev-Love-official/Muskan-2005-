const $=(s)=>document.querySelector(s), $$=(s)=>[...document.querySelectorAll(s)];

// Scroll reveal
const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')}),{threshold:.15});
$$('.reveal').forEach(el=>observer.observe(el));

// Begin button
$('#beginBtn').addEventListener('click',()=>$('#story').scrollIntoView({behavior:'smooth'}));

// Gentle 3D tilt on desktop
if(matchMedia('(pointer:fine)').matches){
  $$('.tilt-card').forEach(card=>{
    card.addEventListener('mousemove',e=>{const r=card.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;card.style.transform=`perspective(900px) rotateX(${y*-3}deg) rotateY(${x*4}deg)`});
    card.addEventListener('mouseleave',()=>card.style.transform='');
  });
}

// Falling petals
const petalBox=$('.petals');
setInterval(()=>{if(document.hidden)return;const p=document.createElement('i');p.className='petal';p.textContent=['🌸','💜','✨','♡'][Math.floor(Math.random()*4)];p.style.left=Math.random()*100+'vw';p.style.fontSize=(10+Math.random()*12)+'px';p.style.opacity=.25+Math.random()*.35;p.style.setProperty('--drift',(Math.random()-.5)*180+'px');p.style.animationDuration=(6+Math.random()*5)+'s';petalBox.append(p);setTimeout(()=>p.remove(),12000)},900);

// Moments carousel
const moments=[
  {image:'assets/moment-1.svg',title:'ਮੇਰੀ favourite notification: ਤੇਰਾ message.',text:'ਤੂੰ “ਕੀ ਕਰ ਰਿਹਾ?” ਪੁੱਛੇਂ ਤੇ ਮੇਰਾ ਦਿਲ full attendance ਲਾ ਦੇਵੇ.'},
  {image:'assets/moment-2.svg',title:'ਤੇਰੇ ਨਾਲ boring ਵੀ aesthetic ਲੱਗਦਾ.',text:'ਕੁਝ ਨਾ ਕਰਦੇ ਹੋਏ ਵੀ, ਤੇਰੇ ਨਾਲ time best part ਬਣ ਜਾਂਦਾ.'},
  {image:'assets/moment-3.svg',title:'Future plans? ਪਹਿਲਾਂ ਤੂੰ, ਫਿਰ ਬਾਕੀ ਸਭ.',text:'ਮੈਨੂੰ ਵੱਡੀਆਂ promises ਨਹੀਂ ਚਾਹੀਦੀਆਂ — ਬੱਸ ਹਰ chapter ਵਿੱਚ ਤੇਰਾ cameo permanent ਹੋਵੇ.'}
];
let active=0;const img=$('#momentImage'),title=$('#momentTitle'),text=$('#momentText'),count=$('#momentCounter'),dots=$('#momentDots');
moments.forEach((_,i)=>{const b=document.createElement('button');b.setAttribute('aria-label',`Memory ${i+1}`);b.onclick=()=>show(i);dots.append(b)});
function show(i){active=(i+moments.length)%moments.length;const m=moments[active];img.animate([{opacity:.2,transform:'scale(.96)'},{opacity:1,transform:'scale(1)'}],{duration:380});img.src=m.image;title.textContent=m.title;text.textContent=m.text;count.textContent=`${String(active+1).padStart(2,'0')} / 03`;[...dots.children].forEach((d,j)=>d.classList.toggle('active',j===active));}
$('#prevMoment').onclick=()=>show(active-1);$('#nextMoment').onclick=()=>show(active+1);show(0);

// Audio player + custom song upload
const audio=$('#audio'),play=$('#playButton'),toggle=$('#musicToggle'),label=$('#musicLabel'),seek=$('#seekBar'),record=$('#record'),cur=$('#currentTime'),dur=$('#duration'),picker=$('#songPicker'),track=$('#trackName');let fallback=false;
audio.addEventListener('error',()=>{if(!fallback){fallback=true;audio.src=audio.dataset.fallback;audio.load();track.textContent='Preview beat'}});
const fmt=s=>Number.isFinite(s)?`${Math.floor(s/60)}:${String(Math.floor(s%60)).padStart(2,'0')}`:'0:00';
function sync(){const on=!audio.paused;play.textContent=on?'❚❚':'▶';label.textContent=on?'Pause':'ਸਾਡਾ ਗਾਣਾ';record.classList.toggle('spinning',on)}
async function togglePlay(){try{audio.paused?await audio.play():audio.pause()}catch(e){console.warn(e)}sync()}
play.onclick=togglePlay;toggle.onclick=togglePlay;audio.onplay=sync;audio.onpause=sync;audio.onloadedmetadata=()=>dur.textContent=fmt(audio.duration);audio.ontimeupdate=()=>{cur.textContent=fmt(audio.currentTime);seek.value=audio.duration?(audio.currentTime/audio.duration)*100:0};seek.oninput=()=>{if(audio.duration)audio.currentTime=(seek.value/100)*audio.duration};picker.onchange=()=>{const file=picker.files[0];if(!file)return;audio.pause();audio.src=URL.createObjectURL(file);audio.load();track.textContent=file.name.replace(/\.[^.]+$/,'');fallback=true;sync()};

// Final surprise
$('#confettiButton').onclick=()=>{const colors=['#8b5cf6','#f58cac','#ffd166','#88dbc0','#ffffff'];for(let i=0;i<140;i++){const c=document.createElement('i');c.className='confetti';c.style.left=Math.random()*100+'vw';c.style.background=colors[Math.floor(Math.random()*colors.length)];c.style.setProperty('--x',(Math.random()-.5)*320+'px');c.style.animationDuration=(2.6+Math.random()*2.7)+'s';document.body.append(c);setTimeout(()=>c.remove(),6000)}$('#hiddenNote').classList.add('show');};
