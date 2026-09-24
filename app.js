const VERSION="1.0-BASE";
const scenes=[
{chapter:"CAPÍTULO I · LA PISTA",title:"La caja",text:"Tu abuelo dejó una caja de madera. No dice cuándo fue guardada. Adentro hay una fotografía, una hoja doblada y una pequeña llave. En el reverso de la foto alguien escribió: «Acá empezó todo».",clues:[
["📷","LA FOTOGRAFÍA","Una chacra junto a una acequia. Al fondo, árboles jóvenes."],
["📜","LA HOJA","Habla del agua, de la tierra y de gente que llegó para quedarse."],
["🔑","LA LLAVE","No tiene fecha. Parece pertenecer a una antigua construcción."]
],question:"¿Qué pista te conviene seguir primero para entender el comienzo?",answers:["La fotografía: muestra el territorio.","La hoja: explica qué estaba ocurriendo.","La llave: seguramente abre algo importante."],correct:1,fact:"La hoja reúne las pistas sobre agua, tierra y personas."},
{chapter:"CAPÍTULO II · EL TERRITORIO",title:"Agua",text:"La hoja cuenta que el territorio no se transformó de un día para otro. El agua permitió modificar el paisaje y desarrollar nuevas formas de producción. Pero todavía falta una pieza.",clues:[
["🌊","EL RÍO","Una presencia constante detrás de la transformación del territorio."],
["🌱","LA TIERRA","Antes de ser paisaje productivo, era un territorio que había que conocer."],
["🏘️","EL PUEBLO","Las personas y sus actividades fueron dando forma a la comunidad."]
],question:"¿Qué relación aparece con más claridad?",answers:["Río → agua → transformación del territorio.","Pueblo → edificios → río.","Tierra → ciudad → desaparición del agua."],correct:0,fact:"El agua aparece como una pieza fundamental de la transformación del territorio."},
{chapter:"CAPÍTULO III · EL RASTRO",title:"¿Qué quedó?",text:"Volvés a mirar la fotografía. Ya no ves solamente una chacra. Ves una relación entre paisaje, agua, producción y personas. La historia de un pueblo también puede leerse en sus huellas.",clues:[
["📸","LA IMAGEN","Una fotografía puede conservar una escena que ya cambió."],
["👣","LAS HUELLAS","Lo que queda permite reconstruir lo que ocurrió."],
["🗺️","EL TERRITORIO","Los lugares también guardan memoria."]
],question:"¿Qué acabás de hacer?",answers:["Resolver una investigación histórica breve.","Ganar una competencia contra otro pueblo.","Descubrir un tesoro escondido."],correct:0,fact:"Acabás de reconstruir una pequeña historia usando pistas y evidencias."}
];

let scene=0,opened=[],answered=false;

function startGame(){
 scene=0;
 document.getElementById("home").classList.remove("active");
 document.getElementById("result").classList.remove("active");
 renderScene();
 window.scrollTo({top:0,behavior:"smooth"});
}

function renderScene(){
 const s=scenes[scene];
 opened=[];
 answered=false;
 document.getElementById("home").classList.remove("active");
 document.getElementById("result").classList.remove("active");
 const el=document.getElementById("story");
 el.className="screen active";
 el.innerHTML=`
 <div class="card">
  <div class="top">VILLA PELÓN · ${scene+1} / ${scenes.length}</div>
  <div class="timeline">${scenes.map((_,i)=>`<i class="dot ${i<=scene?"on":""}"></i>`).join("")}</div>
  <div class="era">🌟 ${s.chapter}</div>
  <h2 class="title">${s.title}</h2>
  <p class="narrative">${s.text}</p>
  <div class="mission">
   <span>🎯 MISIÓN</span>
   <strong>Encontrá 2 pistas para poder continuar.</strong>
   <div class="case-status"><i id="caseFill"></i><span id="caseText">0/2 pistas</span></div>
  </div>
  <div class="evidence-grid">
   ${s.clues.map((c,i)=>`
    <button class="evidence-card" type="button" onclick="openClue(${i},this)">
     <span class="icon">${c[0]}</span>
     <span class="evidence-name">${c[1]}</span>
     <span class="evidence-text">${c[2]}</span>
     <span class="inspect">👀 MIRAR</span>
    </button>`).join("")}
  </div>
  <div id="questionBox" class="question-box" style="display:none">
   <div class="question-label">🕵️ TU ELECCIÓN</div>
   <div class="question">${s.question}</div>
   <div class="answers">${s.answers.map((a,i)=>`<button class="answer" type="button" onclick="answer(${i},this)">${a}</button>`).join("")}</div>
   <div id="feedback" class="feedback"></div>
   <button id="next" class="primary next" type="button" style="display:none" onclick="nextScene()">${scene<scenes.length-1?"SEGUIR LA HUELLA →":"TERMINAR LA INVESTIGACIÓN →"}</button>
  </div>
  <div class="journal"><span>📖 CUADERNO</span><strong id="journalCount">0 pistas</strong></div>
 </div>`;
}

function openClue(i,b){
 if(!opened.includes(i)){
  opened.push(i);
  b.classList.add("inspected");
  b.querySelector(".inspect").textContent="✓ ¡ENCONTRADA!";
  document.getElementById("caseFill").style.width=Math.min(opened.length,2)/2*100+"%";
  document.getElementById("caseText").textContent=Math.min(opened.length,2)+"/2 pistas";
  document.getElementById("journalCount").textContent=opened.length+" pistas";
 }
 if(opened.length>=2){
  document.getElementById("questionBox").style.display="block";
  setTimeout(()=>document.getElementById("questionBox").scrollIntoView({behavior:"smooth",block:"start"}),60);
 }
}

function answer(i,b){
 if(answered)return;
 answered=true;
 const s=scenes[scene];
 const ok=i===s.correct;
 b.classList.add(ok?"correct":"wrong");
 if(!ok)document.querySelectorAll(".answer")[s.correct].classList.add("correct");
 document.getElementById("feedback").innerHTML=ok
  ? "<strong>🎉 ¡LA PISTA ENCAJA!</strong><p>"+s.fact+"</p>"
  : "<strong>💡 CASI...</strong><p>"+s.fact+"</p><p>La evidencia correcta queda marcada para que puedas seguir.</p>";
 document.getElementById("next").style.display="block";
}

function nextScene(){
 if(scene<scenes.length-1){
  scene++;
  renderScene();
  window.scrollTo({top:0,behavior:"smooth"});
 }else finish();
}

function finish(){
 document.getElementById("story").classList.remove("active");
 const r=document.getElementById("result");
 r.className="screen active";
 r.innerHTML=`
 <div class="card result-card">
  <div class="chapter">🏁 INVESTIGACIÓN COMPLETADA</div>
  <div class="score">3/3</div>
  <h2 class="title">Ahora mirás el Chañar de otra manera.</h2>
  <p class="narrative">Villa Pelón es una puerta para investigar cómo un territorio guarda huellas de agua, tierra, producción y personas.</p>
  <div class="summary"><div><span>🔎 CAPÍTULOS</span><strong>3</strong></div><div><span>🧩 PISTAS</span><strong>6 mín.</strong></div></div>
  <div class="share-box"><strong>📲 COMPARTIR</strong><p>Mandá Villa Pelón a otra persona directamente por WhatsApp.</p><button class="primary share-btn" type="button" onclick="shareGame()">COMPARTIR POR WHATSAPP</button></div>
  <div class="credit"><small>JUEGO REALIZADO POR</small><strong>Ocarina Producciones</strong></div>
  <button class="primary" type="button" onclick="startGame()">JUGAR DE NUEVO</button>
 </div>`;
}

window.startGame=startGame;
window.openClue=openClue;
window.answer=answer;
window.nextScene=nextScene;
function shareGame(){
 const url=window.location.href.split("?")[0];
 const text="🌿 Villa Pelón · Una aventura del Chañar\n\nSeguí las huellas, descubrí las pistas y reconstruí una historia del territorio.\n\n🎮 Jugalo acá: "+url+"\n\nJuego realizado por Ocarina Producciones";
 window.open("https://wa.me/?text="+encodeURIComponent(text),"_blank","noopener");
}
window.shareGame=shareGame;
