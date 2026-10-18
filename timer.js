// ==========================================
// CRONÔMETRO DAS AÇÕES COM TEMPO
// Carregue DEPOIS do script.js (usa $).
// Detecta "por 1 minuto", "por 30 segundos" e "a cada minuto"
// no texto sorteado e mostra um botão "Iniciar tempo".
// ==========================================

(function () {
  const act = $("act");
  const tela = $("s-game");

  // ----- elementos -----
  const box = document.createElement("div");
  box.className = "timer";

  const clock = document.createElement("span");
  clock.className = "timer-clock";
  clock.setAttribute("role", "timer");

  const btn = document.createElement("button");
  btn.type = "button";
  btn.className = "timer-btn";

  box.append(clock, btn);
  act.after(box);

  // ----- estado -----
  let total = 0;
  let fim = 0;
  let tick = null;
  let lock = null;
  let audio = null;

  const fmt = s => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;

  function detectar(texto) {
    if (/a cada minuto/i.test(texto)) return 60;

    const m = texto.match(/(\d+)\s*(segundos?|minutos?)/i);
    if (!m) return 0;

    const n = parseInt(m[1], 10);
    return /^min/i.test(m[2]) ? n * 60 : n;
  }

  // ----- manter a tela acesa durante a contagem (quando suportado) -----
  async function pedirTelaAcesa() {
    try {
      if ("wakeLock" in navigator) lock = await navigator.wakeLock.request("screen");
    } catch (e) {
      lock = null;
    }
  }

  function soltarTela() {
    if (lock) {
      lock.release().catch(() => {});
      lock = null;
    }
  }

  // ----- aviso final: vibra; se o aparelho não vibra (ex.: iPhone), toca um bipe -----
  function prepararAudio() {
    try {
      if (!audio && (window.AudioContext || window.webkitAudioContext)) {
        audio = new (window.AudioContext || window.webkitAudioContext)();
      }
      if (audio && audio.state === "suspended") audio.resume();
    } catch (e) {
      audio = null;
    }
  }

  function bipe() {
    if (!audio) return;

    [0, 0.3, 0.6].forEach(atraso => {
      const osc = audio.createOscillator();
      const ganho = audio.createGain();
      osc.frequency.value = 880;
      ganho.gain.value = 0.08;
      osc.connect(ganho);
      ganho.connect(audio.destination);
      osc.start(audio.currentTime + atraso);
      osc.stop(audio.currentTime + atraso + 0.15);
    });
  }

  function avisar() {
    if (navigator.vibrate) {
      navigator.vibrate([300, 150, 300, 150, 500]);
    } else {
      bipe();
    }
  }

  // ----- controle -----
  function parar() {
    clearInterval(tick);
    tick = null;
    soltarTela();
    box.classList.remove("running", "done");
  }

  function preparar(seg) {
    total = seg;
    clock.textContent = fmt(seg);
    btn.textContent = "Iniciar tempo";
    box.classList.add("on");
  }

  function terminar() {
    clearInterval(tick);
    tick = null;
    soltarTela();
    box.classList.remove("running");
    box.classList.add("done");
    clock.textContent = "Tempo!";
    btn.textContent = "Reiniciar";
    avisar();
  }

  function atualizar() {
    // Se a pessoa saiu da tela do jogo, cancela.
    if (!tela.classList.contains("on")) {
      parar();
      box.classList.remove("on");
      return;
    }

    const restante = Math.max(0, Math.ceil((fim - Date.now()) / 1000));
    clock.textContent = fmt(restante);

    if (restante === 0) terminar();
  }

  function iniciar() {
    parar();
    prepararAudio();
    pedirTelaAcesa();

    fim = Date.now() + total * 1000;
    box.classList.add("running");
    btn.textContent = "Parar";

    tick = setInterval(atualizar, 250);
    atualizar();
  }

  btn.onclick = () => {
    if (box.classList.contains("running")) {
      parar();
      preparar(total);
    } else {
      iniciar();
    }
  };

  // ----- observa a ação sorteada -----
  new MutationObserver(() => {
    parar();

    const seg = detectar(act.textContent || "");

    if (seg > 0) {
      preparar(seg);
    } else {
      box.classList.remove("on");
    }
  }).observe(act, { childList: true, subtree: true, characterData: true });
})();