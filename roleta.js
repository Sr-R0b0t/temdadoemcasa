// ==========================================
// ROLETA DO SHOT — modo extra do "Tem Dado Em Casa?"
// Carregue DEPOIS do script.js, dates.js e massagem.js (usa $, show, LS e P).
// ==========================================

(function () {
  const MIN = 2;
  const MAX = 12;
  const A_CADA = 5; // a cada quantas rodadas sugerir uma pausa
  const VOLTA = Math.PI * 2;

  let nomes = [];
  let rot = 0; // rotação atual da roleta (radianos)
  let girando = false;
  let rodadas = 0;
  let doses = 0;    // total de shots servidos na partida
  let verde = -1;   // fatia verde da vez (vale 2 shots); -1 = sem verde nesta rodada

  // Meta: o "2 shots" sair em cerca de 20% dos giros, qualquer que seja o número de jogadores.
  // Com 5 ou mais, o verde sempre aparece (cada fatia já vale 20% ou menos).
  // Com 2, 3 ou 4, o verde só aparece em algumas rodadas (2 jogadores: 40%; 3: 60%; 4: 80%).
  const ALVO_DOBRO = 0.2;

  function sortearVerde(n) {
    const chance = Math.min(1, ALVO_DOBRO * n);
    return Math.random() < chance ? Math.floor(Math.random() * n) : -1;
  }

  // ==== SOM ====
  // Tudo sintetizado pelo navegador (WebAudio): nenhum arquivo de áudio.
  let audio = null;
  let som = LS.get("roletaSom") !== "0";

  function prepararAudio() {
    try {
      const Ctx = window.AudioContext || window.webkitAudioContext;
      if (!Ctx) return;
      if (!audio) audio = new Ctx();
      if (audio.state === "suspended") audio.resume();
    } catch (e) {
      audio = null;
    }
  }

  // "Tec" curtinho, a cada vez que uma fatia passa pelo ponteiro.
  function tique() {
    if (!som || !audio) return;

    const t = audio.currentTime;
    const osc = audio.createOscillator();
    const ganho = audio.createGain();

    osc.type = "triangle";
    osc.frequency.setValueAtTime(1500 * (0.95 + Math.random() * 0.1), t);
    osc.frequency.exponentialRampToValueAtTime(600, t + 0.03);
    ganho.gain.setValueAtTime(0.18, t);
    ganho.gain.exponentialRampToValueAtTime(0.001, t + 0.045);

    osc.connect(ganho);
    ganho.connect(audio.destination);
    osc.start(t);
    osc.stop(t + 0.05);
  }

  // Sininho quando a roleta para.
  function ding() {
    if (!som || !audio) return;

    [880, 1320].forEach((freq, i) => {
      const t = audio.currentTime + i * 0.04;
      const osc = audio.createOscillator();
      const ganho = audio.createGain();

      osc.type = "sine";
      osc.frequency.value = freq;
      ganho.gain.setValueAtTime(0.0001, t);
      ganho.gain.exponentialRampToValueAtTime(0.2 / (i + 1), t + 0.01);
      ganho.gain.exponentialRampToValueAtTime(0.0001, t + 0.9);

      osc.connect(ganho);
      ganho.connect(audio.destination);
      osc.start(t);
      osc.stop(t + 0.95);
    });
  }
  // ==== FIM SOM ====

  // ==== DESENHO ====

  function corDaFatia(i, n, fatiaVerde) {
    if (i === fatiaVerde) return "#1b7a3a";

    // Sem verde: alternam vermelho e preto (se o número for ímpar, a última fica vinho).
    if (fatiaVerde < 0) {
      if (n % 2 === 1 && i === n - 1) return "#8f0f1b";
      return i % 2 === 0 ? "#c1121f" : "#121214";
    }

    // Com verde: as demais alternam vermelho e preto a partir da fatia depois do verde,
    // então nunca há duas fatias vizinhas da mesma cor.
    const k = (i - fatiaVerde - 1 + n) % n;
    return k % 2 === 0 ? "#c1121f" : "#121214";
  }

  function ajustarTexto(ctx, texto, larguraMax, tamInicial) {
    let tam = tamInicial;
    ctx.font = `600 ${tam}px system-ui, sans-serif`;
    while (ctx.measureText(texto).width > larguraMax && tam > 11) {
      tam -= 1;
      ctx.font = `600 ${tam}px system-ui, sans-serif`;
    }
    let t = texto;
    while (ctx.measureText(t).width > larguraMax && t.length > 1) t = t.slice(0, -1);
    return t === texto ? t : t.trimEnd() + "…";
  }

  function desenharRoleta(ctx, tam, lista, giro, fatiaVerde) {
    const c = tam / 2;
    const R = c - 6;
    const rInt = R - 12;
    const n = lista.length;
    const fatia = VOLTA / n;

    ctx.clearRect(0, 0, tam, tam);

    // aro dourado
    const aro = ctx.createLinearGradient(0, 0, tam, tam);
    aro.addColorStop(0, "#f6dc8a");
    aro.addColorStop(0.5, "#a97c0a");
    aro.addColorStop(1, "#f6dc8a");
    ctx.beginPath();
    ctx.arc(c, c, R, 0, VOLTA);
    ctx.fillStyle = aro;
    ctx.fill();

    // fatias e nomes (giram juntos)
    ctx.save();
    ctx.translate(c, c);
    ctx.rotate(giro);

    for (let i = 0; i < n; i++) {
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.arc(0, 0, rInt, i * fatia, (i + 1) * fatia);
      ctx.closePath();
      ctx.fillStyle = corDaFatia(i, n, fatiaVerde);
      ctx.fill();
      ctx.strokeStyle = "#d4af37";
      ctx.lineWidth = 1.5;
      ctx.stroke();
    }

    const tamBase = Math.max(12, Math.min(20, 130 / n + 8));
    for (let i = 0; i < n; i++) {
      ctx.save();
      ctx.rotate((i + 0.5) * fatia);
      ctx.textAlign = "right";
      ctx.textBaseline = "middle";
      ctx.fillStyle = "#fff";
      const texto = ajustarTexto(ctx, lista[i], rInt * 0.62, tamBase);
      ctx.fillText(texto, rInt - 14, 0);
      ctx.restore();
    }
    ctx.restore();

    // miolo dourado
    const hub = ctx.createRadialGradient(c - 8, c - 8, 2, c, c, rInt * 0.22);
    hub.addColorStop(0, "#fff0b8");
    hub.addColorStop(0.6, "#c99a1e");
    hub.addColorStop(1, "#7a5a08");
    ctx.beginPath();
    ctx.arc(c, c, rInt * 0.2, 0, VOLTA);
    ctx.fillStyle = hub;
    ctx.fill();
    ctx.strokeStyle = "#5c4306";
    ctx.lineWidth = 2;
    ctx.stroke();

    // ponteiro fixo no topo
    ctx.beginPath();
    ctx.moveTo(c - 13, 0);
    ctx.lineTo(c + 13, 0);
    ctx.lineTo(c, 30);
    ctx.closePath();
    ctx.fillStyle = "#f6dc8a";
    ctx.fill();
    ctx.strokeStyle = "#5c4306";
    ctx.lineWidth = 2;
    ctx.stroke();
  }

  // Rotação final em que o centro da fatia "indice" (com um pequeno desvio) fica sob o ponteiro.
  function calcularAlvo(rotAtual, indice, n, voltas, desvio) {
    const fatia = VOLTA / n;
    const centro = (indice + 0.5 + desvio) * fatia;
    const alvo = -Math.PI / 2 - centro;
    const delta = (((alvo - rotAtual) % VOLTA) + VOLTA) % VOLTA;
    return rotAtual + delta + voltas * VOLTA;
  }

  // Qual fatia está sob o ponteiro numa dada rotação.
  function fatiaNoTopo(giro, n) {
    const ang = (((-Math.PI / 2 - giro) % VOLTA) + VOLTA) % VOLTA;
    return Math.floor(ang / (VOLTA / n)) % n;
  }
  // ==== FIM DESENHO ====

  // ----- helpers de DOM -----
  const el = (tag, cls, txt) => {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    if (txt !== undefined) e.textContent = txt;
    return e;
  };
  const botao = (txt, cls) => {
    const b = el("button", cls || "", txt);
    b.type = "button";
    return b;
  };

  // ----- tela -----
  const sec = el("section", "screen");
  sec.id = "s-roleta";

  const vSetup = el("div", "rview");
  const vRoda = el("div", "rview roff");
  sec.append(vSetup, vRoda);
  $("s-level").after(sec);

    // Liga o tema verde só enquanto a tela da roleta está aberta
  new MutationObserver(() => {
    document.body.classList.toggle("tema-roleta", sec.classList.contains("on"));
  }).observe(sec, { attributes: true, attributeFilter: ["class"] });

  function ver(nome) {
    vSetup.classList.toggle("roff", nome !== "setup");
    vRoda.classList.toggle("roff", nome !== "roda");
  }

  // ----- setup: nomes -----
  const campo = document.createElement("input");
  campo.placeholder = "Nome do jogador";
  campo.maxLength = 14;
  campo.autocomplete = "off";

  const bAdd = botao("Adicionar");
  const linhaAdd = el("div", "radd");
  linhaAdd.append(campo, bAdd);

  const listaEl = el("div", "rnomes");
  const contagem = el("p", "sub");

  const chk = document.createElement("input");
  chk.type = "checkbox";
  chk.checked = LS.get("roletaSemAlcool") === "1";
  chk.onchange = () => LS.set("roletaSemAlcool", chk.checked ? "1" : "0");
  const rotuloChk = el("label", "rswitch");
  rotuloChk.append(chk, el("span", "", "Modo sem álcool (água ou suco)"));

  const bGirar = botao("Girar a roleta");
  const bVoltar = botao("Voltar", "ghost");
  const linhaSetup = el("div", "row");
  linhaSetup.append(bGirar, bVoltar);

  vSetup.append(
    el("h2", "", "Roleta do Shot"),
    el("p", "sub", "Adicione quem vai jogar (de 2 a 12 pessoas). Quem a roleta escolher toma um shot, e 2 shots se cair no verde (com poucos jogadores, o verde nem sempre aparece)."),
    linhaAdd,
    listaEl,
    contagem,
    rotuloChk,
    el("p", "raviso", "Beba com responsabilidade. Quem for dirigir não bebe. Ninguém é obrigado a beber: pode passar a vez ou tomar água."),
    linhaSetup
  );

  function salvarNomes() {
    LS.set("roletaNomes", JSON.stringify(nomes));
  }

  function carregarNomes() {
    try {
      const salvo = JSON.parse(LS.get("roletaNomes") || "[]");
      nomes = Array.isArray(salvo) ? salvo.filter(n => typeof n === "string").slice(0, MAX) : [];
    } catch (e) {
      nomes = [];
    }

    // Primeira vez: já traz os dois jogadores do jogo do dado, se existirem.
    if (nomes.length === 0 && Array.isArray(P) && P.length === 2) nomes = [...P];
  }

  function renderNomes() {
    listaEl.textContent = "";

    nomes.forEach((nome, i) => {
      const chip = el("div", "rnome");
      const x = botao("×");
      x.setAttribute("aria-label", `Remover ${nome}`);
      x.onclick = () => {
        nomes.splice(i, 1);
        salvarNomes();
        renderNomes();
      };
      chip.append(el("span", "", nome), x);
      listaEl.appendChild(chip);
    });

    contagem.textContent =
      nomes.length === 0
        ? "Nenhum jogador ainda."
        : `${nomes.length} jogador${nomes.length > 1 ? "es" : ""}${nomes.length < MIN ? " (mínimo 2)" : ""}`;

    bGirar.disabled = nomes.length < MIN;
    bAdd.disabled = nomes.length >= MAX;
  }

  function adicionar() {
    const nome = campo.value.trim();

    if (!nome) {
      campo.focus();
      return;
    }
    if (nomes.length >= MAX) return;

    if (nomes.some(n => n.toLocaleLowerCase() === nome.toLocaleLowerCase())) {
      alert("Esse nome já está na lista. Use outro (ou um apelido).");
      campo.focus();
      return;
    }

    nomes.push(nome);
    salvarNomes();
    campo.value = "";
    campo.focus();
    renderNomes();
  }

  bAdd.onclick = adicionar;
  campo.addEventListener("keydown", e => {
    if (e.key === "Enter") {
      e.preventDefault();
      adicionar();
    }
  });

  // ----- tela da roleta -----
  const rotuloRodada = el("div", "level", "Rodada 1");
  const canvas = document.createElement("canvas");
  canvas.setAttribute("aria-label", "Roleta com os nomes dos jogadores");
  const caixaCanvas = el("div", "rroleta");
  caixaCanvas.appendChild(canvas);
  const legenda = el("p", "rpausa");

  function atualizarLegenda() {
    legenda.textContent = verde >= 0 ? "🟢 Verde = 2 shots" : "Sem Verde nesta rodada";
  }
  const resultado = el("div", "rresultado", "Gire a roleta");
  const pausa = el("p", "rpausa");

  const bSpin = botao("Girar");
  const bJog = botao("Jogadores", "ghost");
  const linhaRoda = el("div", "row");
  linhaRoda.append(bSpin, bJog);
  const bSom = botao(som ? "🔔 Som" : "🔕 Mudo", "ghost");
  const bSair = botao("Encerrar", "ghost");
  const linhaFim = el("div", "row");
  linhaFim.append(bSom, bSair);

  bSom.onclick = () => {
    som = !som;
    LS.set("roletaSom", som ? "1" : "0");
    bSom.textContent = som ? "🔔 Som" : "🔕 Mudo";
    if (som) prepararAudio();
  };

  vRoda.append(rotuloRodada, caixaCanvas, legenda, resultado, pausa, linhaRoda, linhaFim);

  const ctx = canvas.getContext("2d");
  let tamanho = 340;

  function desenhar() {
    if (nomes.length >= MIN) desenharRoleta(ctx, tamanho, nomes, rot, verde);
  }

  function ajustarCanvas() {
    tamanho = Math.min(340, Math.floor(window.innerWidth * 0.86));
    const dpr = window.devicePixelRatio || 1;
    canvas.width = tamanho * dpr;
    canvas.height = tamanho * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    desenhar();
  }

  window.addEventListener("resize", () => {
    if (sec.classList.contains("on") && !vRoda.classList.contains("roff")) ajustarCanvas();
  });

  // ----- girar -----
  function girar() {
    if (girando || nomes.length < MIN) return;

    prepararAudio();

    girando = true;
    bSpin.disabled = true;
    bJog.disabled = true;
    bSair.disabled = true;
    resultado.classList.remove("destaque");
    resultado.textContent = "Girando…";
    pausa.textContent = "";

    const n = nomes.length;

    // O verde é sorteado antes do giro (e pode nem aparecer, se houver poucos jogadores).
    verde = sortearVerde(n);
    atualizarLegenda();
    resultado.style.borderColor = "";
    desenhar();

    const vencedor = Math.floor(Math.random() * n);
    const desvio = (Math.random() - 0.5) * 0.7;
    const voltas = 5 + Math.floor(Math.random() * 3);
    const inicio = rot;
    const alvo = calcularAlvo(rot, vencedor, n, voltas, desvio);

    const reduzir = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const duracao = reduzir ? 600 : 5000;
    const t0 = performance.now();

    let fatiaAnterior = fatiaNoTopo(inicio, n);
    let tempoUltimoTique = 0;

    function passo(agora) {
      const p = Math.min(1, (agora - t0) / duracao);
      const suave = 1 - Math.pow(1 - p, 4);
      rot = inicio + (alvo - inicio) * suave;

      // Um "tec" cada vez que o ponteiro muda de fatia (no máx. 1 a cada 35 ms).
      const atual = fatiaNoTopo(rot, n);
      if (atual !== fatiaAnterior) {
        fatiaAnterior = atual;
        if (agora - tempoUltimoTique > 35) {
          tique();
          tempoUltimoTique = agora;
        }
      }

      desenhar();

      if (p < 1) {
        requestAnimationFrame(passo);
      } else {
        rot = alvo % VOLTA;
        desenhar();
        terminar(fatiaNoTopo(rot, n));
      }
    }

    requestAnimationFrame(passo);
  }

  function terminar(indice) {
    girando = false;
    rodadas++;

    const semAlcool = chk.checked;
    const dobro = indice === verde;
    const servidos = dobro ? 2 : 1;
    const antes = doses;
    doses += servidos;

    const bebida = semAlcool ? " de água ou suco" : "";
    const texto = dobro
      ? ` caiu no verde e toma 2 shots${bebida}!`
      : ` toma um shot${bebida}!`;

    // Tudo dentro de um único <span>, para os espaços não sumirem no flexbox.
    const frase = el("span");
    frase.append(el("b", "", nomes[indice]), document.createTextNode(texto));
    resultado.textContent = "";
    resultado.appendChild(frase);
    resultado.classList.add("destaque");
    resultado.style.borderColor = dobro ? "#1b7a3a" : "";
    ding();
    if (dobro) setTimeout(ding, 350);

    rotuloRodada.textContent = `Rodada ${rodadas + 1}`;
    bSpin.textContent = "Girar de novo";
    bSpin.disabled = false;
    bJog.disabled = false;
    bSair.disabled = false;

    // Pausa sugerida a cada 5 shots servidos (os 2 shots do verde contam em dobro).
    if (!semAlcool && Math.floor(doses / A_CADA) > Math.floor(antes / A_CADA)) {
      pausa.textContent = "Pausa! Bebam água e comam algo antes da próxima.";
    }

    if (navigator.vibrate) navigator.vibrate(dobro ? [200, 100, 200, 100, 400] : [200, 100, 300]);
  }

  bSpin.onclick = girar;
  bJog.onclick = () => {
    if (!girando) ver("setup");
  };
  bSair.onclick = () => {
    if (!girando) show("s-start");
  };

  bGirar.onclick = () => {
    rodadas = 0;
    doses = 0;
    verde = sortearVerde(nomes.length);
    atualizarLegenda();
    rot = 0;
    rotuloRodada.textContent = "Rodada 1";
    bSpin.textContent = "Girar";
    resultado.classList.remove("destaque");
    resultado.textContent = "Gire a roleta";
    pausa.textContent = "";
    ver("roda");
    ajustarCanvas();
  };

  bVoltar.onclick = () => show("s-start");

  // ----- entrada -----
  function abrir() {
    carregarNomes();
    renderNomes();
    ver("setup");
    show("s-roleta");
  }

  // botão na tela inicial (depois dos outros modos, se existirem)
  const bRoleta = botao("Roleta do shot", "ghost");
  bRoleta.id = "b-roleta";
  bRoleta.onclick = abrir;
  ($("b-massagem") || $("b-dates") || $("b-start")).after(bRoleta);
})();