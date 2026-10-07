(() => {
  const form=document.querySelector('[data-inquiry-form]');
  const summary=document.querySelector('#request-summary, #partner-summary');
  const email=document.querySelector('[data-email-inquiry]');
  const copy=document.querySelector('[data-copy-starter]');
  const status=document.querySelector('[data-copy-starter-status]');
  if(!form||!summary||!email)return;
  const recipient="karink@foundernexus.com";
  const text=()=> 'VEN inquiry\n'+[...summary.querySelectorAll('dt')].map(dt=>dt.textContent+': '+dt.nextElementSibling.textContent).join('\n');
  const update=()=>{email.href='mailto:'+recipient+'?subject='+encodeURIComponent(form.id==='partner-form'?'VEN partnership inquiry':'VEN fit inquiry')+'&body='+encodeURIComponent(text());};
  new MutationObserver(update).observe(summary,{childList:true,subtree:true,characterData:true});
  update();
  copy?.addEventListener('click',async()=>{
    try{await navigator.clipboard.writeText(text());status.textContent='Conversation starter copied. Email it to '+recipient+'.';}
    catch(_){const range=document.createRange();range.selectNodeContents(summary);const selected=window.getSelection();selected.removeAllRanges();selected.addRange(range);status.textContent='Details selected. Copy them and email '+recipient+'.';}
  });
  document.querySelector('[data-clear-request]').addEventListener('click',()=>{status.textContent='';});
})();