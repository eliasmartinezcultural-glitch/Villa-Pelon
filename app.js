const chapters = [
  {
    era: "ANTES DEL PUEBLO",
    title: "El territorio no habla solo",
    text: "La caja guarda tres rastros. No alcanza con mirar: hay que relacionarlos. Tu abuelo dejó una regla escrita: «Primero encontrá qué cambió. Después preguntá por qué».",
    evidence: [
      ["🌊","EL AGUA","El río Neuquén y las obras de regulación hicieron posible transformar el territorio."],
      ["🌾","LA TIERRA","Las tierras fueron parceladas y destinadas progresivamente a chacras productivas."],
      ["🧭","EL RASTRO","Una fotografía puede mostrar un momento, pero no explica por sí sola cómo se llegó hasta allí."]
    ],
    question: "Si querés explicar el cambio del territorio, ¿qué dos pistas deberías unir?",
    answers: [
      "Agua + tierra: el cambio se entiende por la relación entre ambas.",
      "Fotografía + llave: todo comenzó con un objeto escondido.",
      "Pueblo + fotografía: la imagen explica toda la transformación."
    ],
    correct: 0,
    fact: "Entre 1966 y 1968 se sucedieron adquisiciones de tierras y, en 1968, comenzaron obras de sistematización de riego y la parcelación en chacras. Fuente: CFI / Argentina.gob.ar."
  },
  {
    era: "1968 → 1973",
    title: "Seguir la huella",
    text: "Ahora aparece una fecha. 1968. El territorio empieza a cambiar con obras de riego, plantaciones y nuevas chacras. Pero una comunidad necesita algo más que producción.",
    evidence: [
      ["💧","SISTEMA DE RIEGO","En 1968 se concretó una concesión para regar 8.200 hectáreas."],
      ["🍑","PLANTACIONES","En 1971 ya se habían plantado unas 500 hectáreas, según el documento consultado."],
      ["🏘️","NÚCLEO URBANO","El desarrollo productivo generó la necesidad de un núcleo urbano para los trabajadores agrícolas."]
    ],
    question: "¿Qué cadena histórica encaja mejor con las pistas?",
    answers: [
      "Riego → producción → trabajadores → necesidad de un núcleo urbano.",
      "Pueblo → río → desaparición de las chacras.",
      "Plantaciones → abandono → ciudad."
    ],
    correct: 0,
    fact: "El documento señala que en 1973 se creó la Comisión de Fomento de San Patricio del Chañar, en el contexto del desarrollo productivo y la necesidad de un núcleo urbano."
  },
  {
    era: "1973",
    title: "Nace una comunidad",
    text: "Ya no estás siguiendo solamente una chacra. Estás siguiendo una transformación territorial. Hay agua, producción, trabajadores y una comunidad que necesita organizarse.",
    evidence: [
      ["📅","1973","Se crea la Comisión de Fomento de San Patricio del Chañar."],
      ["👥","PERSONAS","El crecimiento productivo necesitó trabajadores y un lugar donde radicarse."],
      ["🗺️","TERRITORIO","El paisaje rural y el núcleo urbano forman parte de una misma historia territorial."]
    ],
    question: "Tu abuelo te pregunta: «¿Qué hace que esto sea historia y no solamente una colección de fechas?»",
    answers: [
      "Que podemos conectar cambios, lugares, personas y documentos.",
      "Que una fecha siempre explica todo por sí sola.",
      "Que una fotografía antigua vale más que cualquier documento."
    ],
    correct: 0,
    fact: "La historia territorial se reconstruye conectando evidencias. En este juego, las relaciones son una mecánica: no se trata solo de memorizar fechas."
  },
  {
    era: "INVESTIGACIÓN",
    title: "El último rastro",
    text: "Volvés a abrir la caja. Ahora entendés la frase del reverso: «Acá empezó todo». No señalaba un único lugar. Señalaba una cadena de transformaciones.",
    evidence: [
      ["🌊","AGUA","Una condición material para transformar el territorio."],
      ["🌾","PRODUCCIÓN","Las chacras y plantaciones modificaron el paisaje y la economía local."],
      ["👣","COMUNIDAD","Las personas dieron forma a una nueva etapa del territorio."]
    ],
    question: "¿Cuál es tu reconstrucción final?",
    answers: [
      "Agua + producción + personas: una transformación territorial.",
      "Una llave perdida explica por sí sola el origen del pueblo.",
      "La fotografía demuestra exactamente todo lo ocurrido."
    ],
    correct: 0,
    fact: "La reconstrucción del juego se apoya en documentación pública sobre la transformación territorial de San Patricio del Chañar."
  }
];

let chapter = 0;
let opened = [];
let answered = false;
let score = 0;
let discoveries = [];

function startGame() {
  chapter = 0;
  score = 0;
  discoveries = [];
  renderChapter();
}

function renderChapter() {
  const c = chapters[chapter];
  opened = [];
  answered = false;

  document.getElementById("home").classList.remove("active");
  document.getElementById("result").classList.remove("active");

  const story = document.getElementById("story");
  story.className = "screen active";
  story.innerHTML = `
    <div class="card">
      <div class="top"><span>VILLA PELÓN</span><span>INVESTIGACIÓN ${chapter + 1}/${chapters.length}</span></div>
      <div class="timeline">${chapters.map((_, i) => `<i class="dot ${i <= chapter ? "on" : ""}"></i>`).join("")}</div>

      <div class="era">${c.era}</div>
      <h2 class="title">${c.title}</h2>
      <p class="narrative">${c.text}</p>

      <div class="mission"><span>OBJETIVO</span><strong>Inspeccioná al menos 2 rastros y encontrá la relación.</strong></div>

      <div class="evidence-grid">
        ${c.evidence.map((e, i) => `
          <button class="evidence-card" onclick="inspectEvidence(${i},this)">
            <span class="icon">${e[0]}</span>
            <span class="evidence-name">${e[1]}</span>
            <span class="evidence-text">${e[2]}</span>
            <span class="inspect">INSPECCIONAR</span>
          </button>`).join("")}
      </div>

      <div id="questionBox" class="question-box" style="display:none">
        <div class="question-label">DECISIÓN DE INVESTIGACIÓN</div>
        <div class="question">${c.question}</div>
        <div class="answers">
          ${c.answers.map((a, i) => `<button class="answer" onclick="answer(${i},this)">${a}</button>`).join("")}
        </div>
        <div id="feedback" class="feedback"></div>
        <button id="next" class="primary next" style="display:none" onclick="nextChapter()">CONTINUAR →</button>
      </div>

      <div class="journal">
        <span>CUADERNO</span>
        <strong id="journalCount">0 descubrimientos</strong>
      </div>
    </div>`;
}

function inspectEvidence(i, button) {
  if (!opened.includes(i)) {
    opened.push(i);
    discoveries.push(chapters[chapter].evidence[i][1]);
    button.classList.add("inspected");
    button.querySelector(".inspect").textContent = "✓ RASTRO GUARDADO";
    document.getElementById("journalCount").textContent =
      discoveries.length + (discoveries.length === 1 ? " descubrimiento" : " descubrimientos");
  }

  if (opened.length >= 2) {
    const q = document.getElementById("questionBox");
    q.style.display = "block";
    setTimeout(() => q.scrollIntoView({ behavior: "smooth", block: "start" }), 80);
  }
}

function answer(index, button) {
  if (answered) return;
  answered = true;

  const c = chapters[chapter];
  const correct = index === c.correct;

  if (correct) {
    score++;
    button.classList.add("correct");
  } else {
    button.classList.add("wrong");
    document.querySelectorAll(".answer")[c.correct].classList.add("correct");
  }

  document.getElementById("feedback").innerHTML = `
    <strong>${correct ? "RECONSTRUCCIÓN CORRECTA" : "PISTA CORREGIDA"}</strong>
    <p>${c.fact}</p>`;
  document.getElementById("next").style.display = "block";
}

function nextChapter() {
  if (chapter < chapters.length - 1) {
    chapter++;
    renderChapter();
  } else {
    finishGame();
  }
}

function finishGame() {
  document.getElementById("story").classList.remove("active");
  const result = document.getElementById("result");
  result.className = "screen active";

  const percentage = Math.round((score / chapters.length) * 100);
  result.innerHTML = `
    <div class="card result-card">
      <div class="chapter">INVESTIGACIÓN COMPLETADA</div>
      <div class="score">${score}/${chapters.length}</div>
      <h2 class="title">El territorio dejó de ser paisaje.</h2>
      <p class="narrative">Ahora podés leerlo como una historia: agua, tierra, producción, trabajo y comunidad conectados en el tiempo.</p>

      <div class="summary">
        <div><span>RASTROS ENCONTRADOS</span><strong>${discoveries.length}</strong></div>
        <div><span>PRECISIÓN</span><strong>${percentage}%</strong></div>
      </div>

      <p class="source-note"><strong>Base histórica:</strong> documentación pública sobre la transformación territorial de San Patricio del Chañar. El juego separa la reconstrucción documentada de los elementos narrativos ficticios.</p>

      <button class="primary" onclick="startGame()">VOLVER A INVESTIGAR</button>
    </div>`;
}
