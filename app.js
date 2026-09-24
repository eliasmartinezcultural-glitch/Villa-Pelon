const VERSION="1.0-CURADA";
let soundOn=true;
let audioCtx=null, musicTimer=null, musicStep=0;

function startMusic(){
 if(!soundOn || musicTimer)return;
 try{
  audioCtx=audioCtx||new (window.AudioContext||window.webkitAudioContext)();
  if(audioCtx.state==="suspended") audioCtx.resume();
  const notes=[196,246.94,293.66,246.94,220,277.18,329.63,277.18];
  const play=()=>{
   if(!audioCtx||!soundOn)return;
   const now=audioCtx.currentTime;
   const o=audioCtx.createOscillator(),g=audioCtx.createGain();
   o.type="sine"; o.frequency.value=notes[musicStep%notes.length];
   g.gain.setValueAtTime(0.0001,now); g.gain.exponentialRampToValueAtTime(0.018,now+0.08); g.gain.exponentialRampToValueAtTime(0.0001,now+1.8);
   o.connect(g).connect(audioCtx.destination); o.start(now); o.stop(now+1.9); musicStep++;
  };
  play(); musicTimer=setInterval(play,1900);
 }catch(e){}
}
function stopMusic(){if(musicTimer){clearInterval(musicTimer);musicTimer=null;} }
function toggleSound(){soundOn=!soundOn; if(soundOn)startMusic(); else stopMusic(); updateSoundButtons();}
function updateSoundButtons(){document.querySelectorAll(".sound-toggle").forEach(b=>b.textContent=soundOn?"♫ SONIDO ON":"🔇 SONIDO OFF");}
function goHome(){stopMusic();document.getElementById("story").classList.remove("active");document.getElementById("result").classList.remove("active");document.getElementById("home").classList.add("active");window.scrollTo({top:0,behavior:"smooth"});}

const scenes=[
{chapter:"CAPÍTULO I · LA PISTA",title:"La caja",text:"Tu abuelo dejó una caja de madera. No dice cuándo fue guardada. Adentro hay una fotografía, una hoja doblada y una pequeña llave. En el reverso de la foto alguien escribió: «Acá empezó todo».",clues:[["📷","LA FOTOGRAFÍA","Una chacra junto a una acequia. Al fondo, árboles jóvenes."],["📜","LA HOJA","Habla del agua, de la tierra y de gente que llegó para quedarse."],["🔑","LA LLAVE","No tiene fecha. Parece pertenecer a una antigua construcción."]],question:"¿Qué pista te conviene seguir primero para entender el comienzo?",answers:["La fotografía: muestra el territorio.","La hoja: explica qué estaba ocurriendo.","La llave: seguramente abre algo importante."],correct:1,fact:"La hoja reúne las pistas sobre agua, tierra y personas.",mission:"Abrí dos pistas y decidí por dónde empezar la investigación."},
{chapter:"CAPÍTULO I · LA PISTA",title:"Una foto no cuenta todo",text:"El abuelo señala la fotografía. «Una imagen muestra algo, pero también esconde muchas cosas», dice. Mirás el cielo, el suelo, los árboles y el agua.",clues:[["☁️","EL CIELO","El clima también forma parte del contexto de un paisaje."],["🌳","LOS ÁRBOLES","Su presencia cambia la lectura de una zona que antes parecía solamente árida."],["💦","LA ACEQUIA","Una línea de agua junto a la producción puede revelar una intervención humana."]],question:"¿Qué conviene hacer antes de sacar una conclusión?",answers:["Observar varios elementos y compararlos.","Quedarse solamente con el objeto más llamativo.","Inventar lo que falta en la fotografía."],correct:0,fact:"Investigar empieza por observar, comparar y separar lo que vemos de lo que suponemos.",mission:"Aprendé a mirar una fotografía como una evidencia."},
{chapter:"CAPÍTULO II · EL TERRITORIO",title:"Agua",text:"La hoja cuenta que el territorio no se transformó de un día para otro. El agua permitió modificar el paisaje y desarrollar nuevas formas de producción. Pero todavía falta una pieza.",clues:[["🌊","EL RÍO","El Río Neuquén forma parte del territorio regional y del sistema de agua que hace posible la vida en el valle."],["🌱","LA TIERRA","La producción requiere conocer el suelo, el agua y las condiciones del ambiente."],["🏘️","EL PUEBLO","Las personas y sus actividades fueron dando forma a la comunidad."]],question:"Encontrás tres elementos. ¿Cuál relación ayuda a explicar el cambio del territorio?",answers:["Río → agua → transformación del territorio.","Pueblo → edificios → río.","Tierra → ciudad → desaparición del agua."],correct:0,fact:"El agua es una pieza fundamental para comprender la transformación del territorio.",mission:"Relacioná agua, tierra y comunidad antes de seguir."},
{chapter:"CAPÍTULO II · EL TERRITORIO",title:"Del paisaje a la producción",text:"Ahora tenés que imaginar el territorio en dos momentos: antes y después de una transformación. No alcanza con decir «había una chacra». Tenés que preguntar qué hizo posible que apareciera.",clues:[["🏜️","EL AMBIENTE","Un ambiente árido plantea condiciones que las comunidades deben conocer y resolver."],["🚰","EL RIEGO","Llevar agua hasta una zona productiva modifica las posibilidades del territorio."],["🍇","LA PRODUCCIÓN","Cultivar requiere combinar agua, tierra, trabajo, tiempo y conocimiento."]],question:"¿Cuál explicación reúne más elementos sin reducir la historia a una sola causa?",answers:["Ambiente + agua + trabajo + conocimiento.","Solo el clima explica todo.","Solo la tierra explica todo."],correct:0,fact:"Las transformaciones territoriales suelen ser procesos: intervienen ambiente, infraestructura, trabajo y decisiones humanas.",mission:"Descubrí que un paisaje productivo es el resultado de un proceso."},
{chapter:"CAPÍTULO III · LAS HUELLAS",title:"¿Quién estuvo acá?",text:"Entre los papeles aparece una referencia a quienes ya conocían este territorio. La historia no comienza cuando aparecen las primeras chacras: antes hubo personas, recorridos y conocimientos.",clues:[["👣","LAS HUELLAS","Un rastro indica que alguien conocía el lugar antes de que cambiara el paisaje."],["🪶","LA MEMORIA","Los conocimientos sobre el territorio también forman parte de su historia."],["🏜️","EL PAISAJE","El desierto que vemos hoy guarda otras formas de vida y recorrido."]],question:"¿Qué deberías hacer con estas pistas?",answers:["Reconocer que el territorio tiene una historia anterior a la producción.","Ignorar lo anterior y mirar solamente las chacras.","Suponer que el paisaje siempre fue igual."],correct:0,fact:"Investigar un territorio exige mirar las historias que existían antes de su transformación productiva.",mission:"Reconstruí qué había antes de que cambiara el paisaje."},
{chapter:"CAPÍTULO III · LAS HUELLAS",title:"La pregunta correcta",text:"El abuelo cambia la consigna: «No busques solamente una respuesta. Aprendé a hacer preguntas». La investigación se vuelve más difícil y más interesante.",clues:[["❓","PREGUNTAR","Una buena pregunta puede abrir una investigación."],["🧭","UBICAR","Saber dónde ocurre algo ayuda a entender su contexto."],["🗓️","ORDENAR","Separar antes, durante y después permite reconstruir procesos."]],question:"¿Cuál pregunta ayuda más a investigar una transformación territorial?",answers:["¿Qué cambió, por qué y quiénes participaron?","¿Quién ganó y quién perdió sin mirar evidencias?","¿Cómo puedo adivinar lo que pasó?"],correct:0,fact:"Una investigación sólida combina qué ocurrió, contexto, causas, actores y evidencias.",mission:"Elegí la pregunta que abre una investigación real."},
{chapter:"CAPÍTULO IV · LA TRANSFORMACIÓN",title:"Abrir el paso del agua",text:"La investigación avanza. Ahora aparece una decisión: el agua no solo está en el paisaje; también requiere trabajo, organización y conocimiento para llegar a donde hace falta.",clues:[["💧","EL CANAL","El agua puede ser conducida y organizada para transformar una zona."],["🛠️","EL TRABAJO","La transformación del territorio necesita personas que hagan posible cada paso."],["🌳","LA CHACRA","Donde antes había otro paisaje aparecen nuevas formas de producción."]],question:"Si tuvieras que explicar la transformación con una cadena, ¿cuál elegirías?",answers:["Agua + trabajo + conocimiento → producción.","Producción → desaparición del agua → territorio vacío.","Pueblo → árboles → río sin intervención humana."],correct:0,fact:"La transformación territorial combina recursos naturales, trabajo humano y conocimiento.",mission:"Armá la cadena que explica cómo el territorio empieza a cambiar."},
{chapter:"CAPÍTULO IV · LA TRANSFORMACIÓN",title:"Una decisión de trabajo",text:"Encontrás una nota incompleta. Habla de esfuerzo, organización y tiempo. El abuelo te pregunta qué elemento no debería faltar cuando contás cómo se construye un lugar productivo.",clues:[["👷","LAS PERSONAS","Las obras y tareas requieren personas con conocimientos y oficios."],["⏳","EL TIEMPO","Los territorios cambian mediante procesos, no de un instante al otro."],["📐","EL CONOCIMIENTO","Observar, planificar y aprender también transforma un espacio."]],question:"¿Qué combinación representa mejor una transformación humana del territorio?",answers:["Personas + conocimiento + trabajo + tiempo.","Una sola herramienta explica todo.","El paisaje cambia solo, sin intervención."],correct:0,fact:"El territorio productivo también es resultado de decisiones, conocimientos y trabajo acumulado.",mission:"Reconocé el trabajo invisible detrás de un paisaje transformado."},
{chapter:"CAPÍTULO V · LAS PERSONAS",title:"Un pueblo toma forma",text:"Ya no estás mirando solamente agua y tierra. Hay familias, trabajadores, productores, instituciones y vecinos. El territorio también cambia porque una comunidad se organiza.",clues:[["👨‍🌾","QUIENES PRODUCEN","La producción genera actividades, vínculos y nuevas necesidades."],["🏫","LA COMUNIDAD","Escuelas, familias e instituciones ayudan a construir vida colectiva."],["🤝","LOS VÍNCULOS","Un pueblo también se forma a partir de las relaciones entre sus habitantes."]],question:"¿Qué hace que una transformación territorial también sea una historia de comunidad?",answers:["Las personas crean vínculos y formas de vida alrededor del territorio.","Solo la cantidad de edificios construidos.","Que desaparezca toda actividad anterior."],correct:0,fact:"La historia de un pueblo no se explica solo por su paisaje: también por las personas y sus vínculos.",mission:"Descubrí cómo el territorio se convierte también en comunidad."},
{chapter:"CAPÍTULO V · LAS PERSONAS",title:"Las voces del lugar",text:"En otra hoja aparecen frases sueltas: «trabajo», «familia», «escuela», «producción», «encuentro». No son fechas, pero cuentan algo importante sobre la vida cotidiana.",clues:[["🗣️","LOS RELATOS","Las experiencias de las personas ayudan a conservar memoria."],["📚","LA ESCUELA","Los espacios educativos también forman parte de la vida comunitaria."],["🏡","LA VIDA COTIDIANA","Los pueblos se construyen también con actividades pequeñas y repetidas."]],question:"¿Qué tipo de información aportan estas voces?",answers:["Permiten conocer cómo se vivía y se construía comunidad.","Solo sirven si tienen una fecha exacta.","No aportan nada a una historia territorial."],correct:0,fact:"La memoria social complementa documentos, fotografías y objetos porque muestra experiencias y formas de vida.",mission:"Descubrí por qué las personas también son documentos vivos de un territorio."},
{chapter:"CAPÍTULO VI · LA MEMORIA",title:"La llave",text:"Volvés a mirar la pequeña llave. No sabés qué abre, pero ahora entendés que una pista no siempre tiene que resolverse inmediatamente. Algunas sirven para formular nuevas preguntas.",clues:[["🔑","EL OBJETO","Un objeto puede conservar una historia aunque no sepamos todavía su función."],["🧠","LA HIPÓTESIS","Una hipótesis es una explicación posible que debe contrastarse con evidencias."],["🔎","LA PRUEBA","Una buena investigación distingue entre imaginar y comprobar."]],question:"¿Qué debería hacer una investigadora con una hipótesis?",answers:["Buscar evidencias que permitan comprobarla o descartarla.","Tomarla como verdad apenas aparece.","Cambiar los datos para que encaje."],correct:0,fact:"Investigar también significa sostener dudas y comprobar hipótesis con evidencias.",mission:"Aprendé a diferenciar una pista de una conclusión."},
{chapter:"CAPÍTULO VI · EL RASTRO",title:"¿Qué quedó?",text:"Volvés a mirar la fotografía. Ahora reconocés mucho más: paisaje, agua, producción, memoria y personas. El abuelo sonríe. «¿Ves?», dice. «Un pueblo también se puede investigar leyendo sus huellas».",clues:[["📸","LA IMAGEN","Una fotografía puede conservar una escena que ya cambió."],["🧩","LAS PIEZAS","Cada pista aislada cuenta poco; juntas permiten reconstruir una historia."],["🗺️","EL TERRITORIO","Los lugares también guardan memoria y pueden volver a ser interrogados."]],question:"¿Qué acabás de hacer?",answers:["Reconstruir una historia del territorio usando evidencias.","Ganar una competencia contra otro pueblo.","Descubrir un tesoro escondido."],correct:0,fact:"Acabás de conectar pistas, decisiones y contexto para reconstruir una historia.",mission:"Uní todas las piezas y cerrá la investigación."}
]

let scene=0,opened=[],answered=false;

function startGame(){
 scene=0;
 startMusic();
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
  <div class="top"><button class="mini-menu" type="button" onclick="goHome()">⌂ MENÚ</button><span>VILLA PELÓN · ${scene+1} / ${scenes.length}</span><button class="mini-menu sound-toggle" type="button" onclick="toggleSound()">♫ SONIDO ON</button></div>
  <div class="timeline">${scenes.map((_,i)=>`<i class="dot ${i<=scene?"on":""}"></i>`).join("")}</div>
  <div class="scene-art" aria-hidden="true">
   <div class="sun-orb"></div><div class="mountain mountain-a"></div><div class="mountain mountain-b"></div>
   <div class="river-line"></div><div class="tree tree-a"></div><div class="tree tree-b"></div>
   <div class="character abuelo"><span class="head"></span><span class="body"></span><span class="hat"></span></div>
   <div class="character nieta"><span class="head"></span><span class="body"></span><span class="hat"></span></div>
   <span class="art-label">VILLA PELÓN · CUADERNO DE CAMPO</span>
  </div>
  <div class="era">🌟 ${s.chapter}</div>
  <h2 class="title">${s.title}</h2>
  <p class="narrative">${s.text}</p>
  <div class="mission">
   <span>🎯 MISIÓN</span>
   <strong>${s.mission}</strong>
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
  <div class="memory"><span>🧠 INVESTIGACIÓN</span><strong id="memoryText">Todavía no hay una conclusión registrada.</strong></div>
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
 document.getElementById("memoryText").textContent=s.fact;
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
  <div class="score">12/12</div>
  <h2 class="title">Ahora mirás el Chañar de otra manera.</h2>
  <p class="narrative">Villa Pelón es una puerta para investigar cómo un territorio guarda huellas de agua, tierra, producción y personas.</p>
  <div class="summary"><div><span>🔎 CAPÍTULOS</span><strong>6</strong></div><div><span>🧩 PISTAS</span><strong>12 mín.</strong></div></div>
  <div class="share-box"><strong>📲 COMPARTIR</strong><p>Mandá Villa Pelón a otra persona directamente por WhatsApp.</p><button class="primary share-btn" type="button" onclick="shareGame()">COMPARTIR POR WHATSAPP</button></div>
  <div class="credit"><small>JUEGO REALIZADO POR</small><strong>Ocarina Producciones</strong></div>
  <button class="primary" type="button" onclick="startGame()">JUGAR DE NUEVO</button><button class="menu-back" type="button" onclick="goHome()">⌂ VOLVER AL MENÚ</button>
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
window.toggleSound=toggleSound;
window.goHome=goHome;
