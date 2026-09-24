const VERSION="1.6.2";
const chapters=[
{era:"ANTES DEL PUEBLO",title:"El territorio no habla solo",text:"El abuelo abre una caja y sonríe: «Hoy vas a jugar a detective». Hay tres rastros. Tocá dos y descubrí qué historia esconden juntos.",evidence:[
["🌊","EL AGUA","El río Neuquén y las obras de regulación ayudaron a transformar el territorio.",["agua","territorio"]],
["🌾","LA TIERRA","En 1968 comenzaron obras de riego y las tierras fueron parceladas en chacras.",["tierra","producción"]],
["🧭","EL RASTRO","Una fotografía muestra un momento, pero necesita otras pistas para contar una historia.",["tiempo","prueba"]]
],question:"¿Qué dos pistas cuentan mejor cómo empezó el cambio?",answers:["🌊 Agua + 🌾 tierra","🧭 Fotografía + 🔑 llave","🏘️ Pueblo + 🧭 fotografía"],correct:0,fact:"En 1968 la documentación registra obras de riego y parcelación de tierras."},
{era:"1968 → 1973",title:"Seguir la huella",text:"«¡Mirá esa huella!», dice tu abuelo. Ahora hay agua, chacras y plantaciones. ¿Qué pasó después?",evidence:[
["💧","SISTEMA DE RIEGO","En 1968 se otorgó una concesión para regar 8.200 hectáreas.",["agua","producción"]],
["🍑","PLANTACIONES","En 1971 ya se habían plantado 500 hectáreas, según el documento consultado.",["producción","tiempo"]],
["🏘️","NÚCLEO URBANO","El desarrollo productivo generó la necesidad de un núcleo para trabajadores agrícolas.",["personas","comunidad"]]
],question:"¿Qué cadena arma la historia?",answers:["💧 Riego → 🌾 producción → 👥 trabajadores → 🏘️ comunidad","🏘️ Pueblo → 🌊 río → desaparición de chacras","🍑 Plantaciones → abandono → ciudad"],correct:0,fact:"La documentación señala que en 1973 se creó la Comisión de Fomento de San Patricio del Chañar en este contexto."},
{era:"1973",title:"Nace una comunidad",text:"Tu abuelo te da una lupa de juguete. «Una fecha sola no cuenta una historia. Buscá a las personas que hay detrás».",evidence:[
["📅","1973","Se crea la Comisión de Fomento de San Patricio del Chañar.",["tiempo","comunidad"]],
["👥","PERSONAS","El crecimiento productivo necesitó trabajadores y un lugar donde radicarse.",["personas","comunidad"]],
["🗺️","TERRITORIO","El paisaje rural y el núcleo urbano forman parte de una misma historia.",["territorio","comunidad"]]
],question:"¿Qué convierte las pistas en una historia?",answers:["👥 Conectar personas, lugares, cambios y documentos","📅 Elegir una fecha y olvidar lo demás","🧭 Una foto que explique absolutamente todo"],correct:0,fact:"La investigación histórica reconstruye procesos conectando evidencias, lugares, personas y tiempos."},
{era:"INVESTIGACIÓN FINAL",title:"El último rastro",text:"La caja ya está casi vacía. El abuelo pregunta: «¿Te animás a explicarme qué pasó?». Esta vez vos sos quien cuenta la historia.",evidence:[
["🌊","AGUA","Una condición material para transformar el territorio.",["agua","territorio"]],
["🌾","PRODUCCIÓN","Las chacras y plantaciones modificaron el paisaje y la economía local.",["producción","tierra"]],
["👣","COMUNIDAD","Las personas dieron forma a una nueva etapa del territorio.",["personas","comunidad"]]
],question:"¿Cuál es tu reconstrucción final?",answers:["🌊 Agua + 🌾 producción + 👣 personas","🔑 Una llave explica todo","🧭 Una fotografía demuestra todo lo ocurrido"],correct:0,fact:"La reconstrucción del juego toma como base documentación pública sobre la transformación territorial de San Patricio del Chañar."]
}];

let chapter=0,opened=[],answered=false,score=0,discoveries=[],streak=0,best=0,connections=0,historyTags=[],connected=false;
function startGame(){chapter=0;score=0;streak=0;best=0;connections=0;discoveries=[];historyTags=[];connected=false;document.getElementById("home").classList.remove("active");document.getElementById("result").classList.remove("active");renderChapter();window.scrollTo({top:0,behavior:"smooth"})}
function renderChapter(){
 if(!chapters[chapter])return finishGame();
 const c=chapters[chapter];opened=[];answered=false;connected=false;
 document.getElementById("home").classList.remove("active");document.getElementById("result").classList.remove("active");
 const story=document.getElementById("story");story.className="screen active";
 const memory=historyTags.length?historyTags.slice(-3).map(x=>"✨ "+x).join(" · "):"Todavía no hay pistas en tu memoria";
 story.innerHTML=`<div class="card"><div class="top"><span>VILLA PELÓN · V1.6.2</span><span>AVENTURA ${chapter+1}/${chapters.length}</span></div><div class="timeline">${chapters.map((_,i)=>`<i class="dot ${i<=chapter?"on":""}"></i>`).join("")}</div><div class="era">🌟 ${c.era}</div><h2 class="title">${c.title}</h2><p class="narrative">${c.text}</p><div class="memory"><span>🧠 LO QUE YA SABÉS</span><strong>${memory}</strong></div><div class="mission"><span>🎯 MISIÓN</span><strong>Encontrá 2 pistas y descubrí qué tienen en común.</strong><div class="case-status"><i id="caseFill"></i><span id="caseText">0/2 pistas</span></div></div><div class="evidence-grid">${c.evidence.map((e,i)=>`<button class="evidence-card" onclick="inspectEvidence(${i},this)"><span class="icon">${e[0]}</span><span class="evidence-name">${e[1]}</span><span class="evidence-text">${e[2]}</span><span class="inspect">👀 MIRAR</span></button>`).join("")}</div><div id="questionBox" class="question-box" style="display:none"><div class="question-label">🕵️ TU ELECCIÓN</div><div class="question">${c.question}</div><div class="answers">${c.answers.map((a,i)=>`<button class="answer" onclick="answer(${i},this)">${a}</button>`).join("")}</div><div id="feedback" class="feedback"></div><button id="next" class="primary next" style="display:none" onclick="nextChapter()">${chapter<chapters.length-1?"SEGUIR LA HUELLA →":"CONTARLE LA HISTORIA →"}</button></div><div class="journal"><span>📖 CUADERNO</span><strong id="journalCount">${discoveries.length} pistas · ${connections} conexiones</strong></div></div>`
}
function inspectEvidence(i,b){
 if(!opened.includes(i)){opened.push(i);const e=chapters[chapter].evidence[i];discoveries.push(e[1]);e[3].forEach(t=>{if(!historyTags.includes(t))historyTags.push(t)});b.classList.add("inspected");b.querySelector(".inspect").textContent="✓ ¡ENCONTRADA!";document.getElementById("journalCount").textContent=discoveries.length+" pistas · "+connections+" conexiones";document.getElementById("caseFill").style.width=(opened.length/2*100)+"%";document.getElementById("caseText").textContent=opened.length+"/2 pistas"}
 if(opened.length>=2){if(!connected){connected=true;connections++;document.getElementById("journalCount").textContent=discoveries.length+" pistas · "+connections+" conexiones"}const q=document.getElementById("questionBox");q.style.display="block";setTimeout(()=>q.scrollIntoView({behavior:"smooth",block:"start"}),60)}
}
function answer(i,b){
 if(answered)return;answered=true;const c=chapters[chapter],correct=i===c.correct;
 if(correct){score++;streak++;best=Math.max(best,streak);b.classList.add("correct");document.getElementById("feedback").innerHTML=`<strong>🎉 ¡LO DESCUBRISTE!</strong><p>${c.fact}</p>${streak>1?"<p>🔥 ¡"+streak+" reconstrucciones seguidas!</p>":""}`}
 else{streak=0;b.classList.add("wrong");document.querySelectorAll(".answer")[c.correct].classList.add("correct");document.getElementById("feedback").innerHTML=`<strong>💡 CASI...</strong><p>${c.fact}</p><p>La pista correcta queda marcada para que puedas seguir jugando.</p>`}
 document.getElementById("next").style.display="block"
}
function nextChapter(){if(chapter<chapters.length-1){chapter++;renderChapter();window.scrollTo({top:0,behavior:"smooth"})}else finishGame()}
function finishGame(){
 chapter=chapters.length;document.getElementById("story").classList.remove("active");const result=document.getElementById("result");result.className="screen active";
 const percentage=Math.round(score/chapters.length*100);
 result.innerHTML=`<div class="card result-card"><div class="chapter">🏁 AVENTURA COMPLETADA · V1.6.2</div><div class="score">${score}/${chapters.length}</div><h2 class="title">${score===chapters.length?"¡Detective del Chañar!":"¡La historia dejó huellas!"}</h2><p class="narrative">Ahora podés mirar un territorio de otra manera: buscando pistas, haciendo preguntas y conectando historias.</p><div class="summary"><div><span>🔎 PISTAS</span><strong>${discoveries.length}</strong></div><div><span>⭐ ACIERTOS</span><strong>${percentage}%</strong></div><div><span>🔥 RACHA</span><strong>${best}</strong></div><div><span>🔗 CONEXIONES</span><strong>${connections}</strong></div></div><p class="source-note"><strong>Base histórica:</strong> documentación pública del Consejo Federal de Inversiones publicada en Argentina.gob.ar. El abuelo, la caja y las decisiones son recursos narrativos.</p><button class="primary" onclick="startGame()">JUGAR OTRA VEZ</button></div>`
}
document.addEventListener("DOMContentLoaded",()=>{
 const start=document.getElementById("startButton");
 if(start)start.addEventListener("click",startGame);
 document.getElementById("story").addEventListener("click",e=>{
  const evidence=e.target.closest(".evidence-card");
  if(evidence)inspectEvidence(Number(evidence.dataset.index),evidence);
  const answerButton=e.target.closest(".answer");
  if(answerButton)answer(Number(answerButton.dataset.index),answerButton);
  const next=e.target.closest("#next");
  if(next)nextChapter();
 });
 document.getElementById("result").addEventListener("click",e=>{
  const again=e.target.closest("#restartButton");
  if(again)startGame();
 });
});