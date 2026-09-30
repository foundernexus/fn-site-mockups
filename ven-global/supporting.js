(() => {
  const form = document.querySelector('#membership-form');
  if (form) {
    const requestedIntent = new URLSearchParams(location.search).get('intent');
    if (requestedIntent === 'team') form.elements.intent.value = 'team';
    const review = document.querySelector('#request-review');
    const fields = [['intent','Exploring'],['name','Name'],['email','Work email'],['company','Company'],['role','Role'],['stage','Stage'],['priority','Top challenges']];
    form.addEventListener('submit', event => {
      event.preventDefault();
      if (!form.reportValidity()) return;
      const summary = document.querySelector('#request-summary');
      summary.replaceChildren();
      const data = new FormData(form);
      for (const [key,label] of fields) {
        const dt=document.createElement('dt'), dd=document.createElement('dd');
        dt.textContent=label;
        dd.textContent=key==='intent'?(data.get(key)==='team'?'Membership for colleagues':'Membership for myself'):(data.get(key)||'To discuss');
        summary.append(dt,dd);
      }
      form.hidden=true; review.hidden=false;
      document.querySelector('#review-title').focus();
    });
    document.querySelector('#edit-request').addEventListener('click',()=>{review.hidden=true;form.hidden=false;form.elements.name.focus();});
    document.querySelector('#clear-request').addEventListener('click',()=>{form.reset();review.hidden=true;form.hidden=false;form.elements.name.focus();});
  }
  document.querySelector('#print-brief')?.addEventListener('click',()=>window.print());
  const model=document.querySelector('#equation-model');
  if(model){
    model.addEventListener('submit',event=>event.preventDefault());
    const names=['team-size','leaders','decisions','baseline','supported'];
    const read=key=>Number(document.getElementById(key).value);
    const logTerm=(p,count)=>count===0?0:p===0?-Infinity:count*Math.log(p);
    const fmt=log=>log===-Infinity?'0.00%':Math.exp(log)*100<.01?'<0.01%':(Math.exp(log)*100).toFixed(2)+'%';
    function update(){
      const n=read('team-size');
      ['leaders','leaders-number'].forEach(id=>{const input=document.getElementById(id);input.max=n;if(Number(input.value)>n)input.value=n;});
      const m=read('leaders'),d=read('decisions'),a=read('baseline')/100,b=read('supported')/100,total=n*d,covered=m*d;
      const logBase=logTerm(a,total),logSupport=logTerm(b,covered)+logTerm(a,total-covered);
      const base=Math.exp(logBase),withSupport=Math.exp(logSupport);
      document.querySelector('#base-result').textContent=fmt(logBase);
      document.querySelector('#supported-result').textContent=fmt(logSupport);
      if(document.querySelector('#one-result')){
        const logOne=logTerm(b,d)+logTerm(a,total-d);
        document.querySelector('#one-result').textContent=fmt(logOne);
        document.querySelector('#one-bar').style.width=(Math.exp(logOne)*100)+'%';
        document.querySelector('#selected-result-label').textContent=`Your selection: ${m} ${m===1?'leader':'leaders'}`;
      }
      document.querySelector('#base-bar').style.width=(base*100)+'%';
      document.querySelector('#supported-bar').style.width=(withSupport*100)+'%';
      document.querySelector('#model-context').textContent=`A hypothetical team of ${n}, with ${total} decisions in total. ${m} of ${n} leaders use the support assumption for ${covered} decisions.`;
      document.querySelector('#participation-context').textContent=`Out of your hypothetical team of ${n}`;
      const difference=logSupport-logBase;
      const ratio=logSupport===-Infinity?'0.00':difference>Math.log(1000000)?`10^${(difference/Math.LN10).toFixed(1)}`:Math.exp(difference)<.01?'<0.01':Math.exp(difference).toFixed(2);
      document.querySelector('#comparison').textContent=logBase===-Infinity?'Comparison ratio is undefined when the baseline is zero.':`Your selected participation vs baseline: ${ratio}×.`;
      document.querySelector('#assumption-summary').textContent=`You have assumed ${Math.round(a*100)}% per decision at baseline and ${Math.round(b*100)}% for decisions with support. The model multiplies these inputs; it does not establish that support changes decision quality.`;
    }
    names.forEach(name=>{
      const range=document.getElementById(name),number=document.getElementById(name+'-number');
      range.addEventListener('input',()=>{number.value=range.value;update();});
      number.addEventListener('input',()=>{if(number.value!==''&&number.validity.valid){range.value=number.value;update();}});
      number.addEventListener('change',()=>{if(number.value==='')number.value=range.value;number.value=Math.max(Number(range.min),Math.min(Number(range.max),Math.round(Number(number.value))));range.value=number.value;update();});
    });
    model.addEventListener('reset',()=>{
      const defaultTeam=document.getElementById('team-size').defaultValue;
      ['leaders','leaders-number'].forEach(id=>{document.getElementById(id).max=defaultTeam;});
      requestAnimationFrame(update);
    });
    update();
  }
})();
