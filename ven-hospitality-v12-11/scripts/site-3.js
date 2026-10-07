(() => {
  'use strict';
  if (typeof window.__VEN_ADVISOR_CLEANUP__ === 'function') window.__VEN_ADVISOR_CLEANUP__();
  const root = document.querySelector('[data-advisor-carousel]');
  if (!root) return;
  const track = root.querySelector('[data-advisor-track]');
  const cards = [...track.querySelectorAll('.c-person')];
  const previous = root.querySelector('[data-advisor-previous]');
  const next = root.querySelector('[data-advisor-next]');
  const counter = root.querySelector('[data-advisor-count]');
  const abort = new AbortController();
  const options = {signal: abort.signal};
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let frame = 0;
  function layout() {
    const rect = track.getBoundingClientRect();
    const visible = cards.map((card,index) => ({rect:card.getBoundingClientRect(),index})).filter(item => item.rect.left >= rect.left - 3 && item.rect.right <= rect.right + 3);
    const first = visible[0]?.index ?? cards.findIndex(card => card.getBoundingClientRect().right > rect.left + 8);
    const last = visible.at(-1)?.index ?? Math.max(first,0);
    return {first:Math.max(first,0),last:Math.max(last,0),count:Math.max(visible.length,1)};
  }
  function update() {
    const view=layout();
    previous.disabled = track.scrollLeft < 3;
    next.disabled = track.scrollLeft >= track.scrollWidth - track.clientWidth - 3;
    counter.textContent = view.first===view.last ? `${view.first+1} of ${cards.length}` : `${view.first+1}–${view.last+1} of ${cards.length}`;
  }
  function schedule() { if (frame) cancelAnimationFrame(frame); frame=requestAnimationFrame(() => {frame=0;update();}); }
  function move(direction) {
    const view=layout();
    const target=Math.max(0,Math.min(cards.length-1,view.first+direction*view.count));
    const left=cards[target].getBoundingClientRect().left-track.getBoundingClientRect().left+track.scrollLeft;
    track.scrollTo({left,behavior:motion.matches?'instant':'smooth'});
  }
  previous.addEventListener('click',()=>move(-1),options);
  next.addEventListener('click',()=>move(1),options);
  track.addEventListener('scroll',schedule,{...options,passive:true});
  track.addEventListener('keydown',event => {
    if(event.target!==track)return;
    if(event.key==='ArrowRight'||event.key==='ArrowLeft'){event.preventDefault();move(event.key==='ArrowRight'?1:-1);}
    else if(event.key==='Home'||event.key==='End'){event.preventDefault();track.scrollTo({left:event.key==='Home'?0:track.scrollWidth,behavior:motion.matches?'instant':'smooth'});}
  },options);
  const observer=new ResizeObserver(schedule);
  observer.observe(track);
  window.__VEN_ADVISOR_CLEANUP__=()=>{abort.abort();observer.disconnect();if(frame)cancelAnimationFrame(frame);window.__VEN_ADVISOR_CLEANUP__=null;};
  update();
})();
