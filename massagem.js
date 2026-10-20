// ==========================================
// MASSAGEM GUIADA — roteiro passo a passo com cronômetro por etapa
// Carregue DEPOIS do script.js e do dates.js (usa $, show, LS e P).
// ==========================================

(function () {
  // s = segundos base de cada etapa (multiplicado pela duração escolhida)
  const ROTEIROS = {
    relaxante: [
      { t: "Preparação", s: 30, d: "Quem recebe deita de bruços, em posição confortável. Quem massageia aquece o óleo ou creme nas mãos. Combinem a pressão: quem recebe manda e pode pedir mais leve ou mais firme a qualquer momento." },
      { t: "Costas", s: 90, d: "Deslize as mãos da base das costas até os ombros, com pressão média, e volte mais leve. Repita em movimentos longos e lentos." },
      { t: "Ombros e pescoço", s: 90, d: "Amasse os ombros com os polegares e faça círculos suaves na base do pescoço. Evite pressionar direto sobre a coluna." },
      { t: "Braços e mãos", s: 60, d: "Deslize do ombro até a mão, aperte de leve a palma e massageie cada dedo." },
      { t: "Lombar", s: 60, d: "Faça círculos lentos com a palma das mãos na região lombar, sem pressionar direto sobre a coluna." },
      { t: "Pernas", s: 90, d: "Da panturrilha até a coxa, sempre em direção ao coração, sem pressionar a parte de trás do joelho." },
      { t: "Pés", s: 90, d: "Use os polegares na sola, do calcanhar até os dedos, e puxe cada dedo com suavidade." },
      { t: "Final", s: 30, d: "Passe só as pontas dos dedos pelas costas, respirem juntos e perguntem como foi." }
    ],
    sensual: [
      { t: "Clima", s: 45, d: "Baixem a luz, coloquem uma música lenta e aqueçam o óleo. Quem recebe deita de bruços, só com o que se sentir à vontade. Combinem o que pode e o que não pode, e uma palavra para parar." },
      { t: "Costas, bem devagar", s: 90, d: "Deslize as mãos pelas costas em movimentos lentos, alternando pressão média e toques leves com as pontas dos dedos. Acompanhe a respiração de quem recebe." },
      { t: "Nuca e pescoço", s: 60, d: "Toques leves, sopros e beijos na nuca e atrás das orelhas, apenas se quem recebe topar. Quem recebe diz o que quer mais." },
      { t: "Ombros e braços", s: 60, d: "Massageie os ombros e desça pelos braços até as mãos, entrelaçando os dedos no final." },
      { t: "Lombar e quadril", s: 60, d: "Faça círculos lentos com a palma das mãos na lombar e desça devagar até o quadril, até onde quem recebe permitir. A pressão é leve, e o ritmo é de provocação." },
      { t: "Pernas", s: 90, d: "Suba das panturrilhas até a parte de trás das coxas, em movimentos longos e sem pressa. Quem recebe diz se quer mais perto ou mais longe." },
      { t: "Pés e retorno", s: 60, d: "Massageie os pés com calma e volte pelas pernas com a ponta dos dedos, num toque quase imperceptível." },
      { t: "Virar", s: 30, d: "Quem recebe vira de barriga para cima. Olhem-se nos olhos, sem pressa e sem falar, por alguns segundos." },
      { t: "Frente do corpo", s: 60, d: "Passe as mãos da clavícula até a barriga com toques leves, e use sopros e beijos onde quem recebe topar. Pare ao primeiro sinal de desconforto." },
      { t: "Final", s: 45, d: "Terminem com um abraço longo e perguntem o que mais gostaram. Daqui, vocês decidem juntos o que fazer." }
    ],
    erotica: [
      { t: "Combinar", s: 45, d: "Escolham juntos o que está liberado e o que não está, e uma palavra para parar. Luz baixa, música lenta, toalha sobre a cama. Quem recebe começa de bruços, só com o que se sentir à vontade. Qualquer etapa pode ser pulada." },
      { t: "Óleo e costas", s: 90, d: "Espalhe óleo morno pelas costas inteiras, com movimentos longos e lentos. Deixe o corpo de quem recebe relaxar antes de provocar." },
      { t: "Nuca e orelhas", s: 60, d: "Beijos, sopros e mordidas leves na nuca e atrás das orelhas, se quem recebe gostar. Sussurre o que vem a seguir." },
      { t: "Lombar e quadril", s: 60, d: "Faça círculos lentos com as mãos firmes, descendo até o quadril, até onde quem recebe permitir." },
      { t: "Coxas e quadril", s: 90, d: "Massageie as coxas e a região do quadril com pressão firme, aproximando-se aos poucos das áreas mais sensíveis. Pause e pergunte: mais, menos ou parar?" },
      { t: "Virar", s: 30, d: "Quem recebe vira de barriga para cima. Olhem-se nos olhos, sem pressa, por alguns segundos." },
      { t: "Peito e barriga", s: 60, d: "Deslize as mãos oleadas pelo peito e pela barriga, alternando toques leves e firmes, sempre devagar." },
      { t: "Provocação", s: 60, d: "Provoque com beijos e toques leves nas coxas internas e perto das áreas mais íntimas, sem ir além do combinado. Faça quem recebe pedir mais antes de continuar." },
      { t: "Toque íntimo (opcional)", s: 120, d: "Só se os dois toparem: carícias íntimas, no ritmo que quem recebe pedir. Falem o tempo todo: mais, menos, parar. Se usarem lubrificante, escolham um à base de água." },
      { t: "Final", s: 45, d: "Desacelerem, abracem-se e conversem sobre o que mais gostaram. Depois, trocam de lugar ou decidem juntos como continuar." }
    ]
  };

  // ----- variações: cada etapa pode aparecer com outro texto (sorteado a cada massagem) -----
  const VARIACOES = {
    relaxante: {
      "Preparação": ["Escolham um lugar firme e aconchegante, com toalha ou lençol que possa sujar. Quem massageia tira anéis e pulseiras e aquece as mãos. Quem recebe avisa se algo incomodar durante a massagem."],
      "Costas": ["Use as palmas para deslizar das laterais da coluna para fora, como quem abre um livro, e depois as pontas dos dedos para subir e descer ao lado da coluna, sem pressionar sobre ela."],
      "Ombros e pescoço": ["Apoie as mãos nos ombros e faça movimentos de pinça com o polegar e os dedos, subindo pelo pescoço. Termine deslizando suavemente da nuca até o meio das costas."],
      "Braços e mãos": ["Segure a mão de quem recebe e faça círculos com o polegar na palma. Depois deslize o antebraço até o cotovelo com as duas mãos."],
      "Lombar": ["Use a base da mão para movimentos lentos e firmes ao lado da coluna, sem pressionar sobre ela. Pergunte se está na medida."],
      "Pernas": ["Comece pela panturrilha com as duas mãos, deslizando para cima devagar, e amasse a coxa de leve, como quem sova massa. Evite a parte de trás do joelho."],
      "Pés": ["Segure o pé com as duas mãos e deslize os polegares da sola até o calcanhar. Gire o tornozelo suavemente nos dois sentidos."],
      "Final": ["Faça alguns deslizamentos bem leves das costas até os pés, desacelerando aos poucos. Peça para quem recebe respirar fundo e se espreguiçar devagar."]
    },
    sensual: {
      "Clima": ["Escolham uma playlist tranquila e deixem o ambiente aquecido. Quem massageia aquece o óleo nas mãos e olha nos olhos de quem recebe antes de começar. Combinem uma palavra para parar."],
      "Costas, bem devagar": ["Comece com as mãos paradas nas costas por alguns segundos, só sentindo. Depois deslize bem devagar, alternando as palmas e as pontas dos dedos, acompanhando a respiração."],
      "Nuca e pescoço": ["Passe as pontas dos dedos pelos cabelos e pela nuca, e aproxime a boca do ouvido para sussurrar um elogio. Beijos leves no pescoço, só se quem recebe gostar."],
      "Ombros e braços": ["Massageie os ombros com firmeza e depois deslize as mãos pelos braços, devagar, como numa carícia. Beije a mão de quem recebe no final."],
      "Lombar e quadril": ["Desenhe círculos grandes e lentos nas costas, descendo até o quadril, e volte com a ponta dos dedos. Quem recebe diz se quer mais firme ou mais leve."],
      "Pernas": ["Deslize as mãos pelas pernas, do tornozelo até a parte de trás das coxas, bem devagar, alternando toques firmes e quase imperceptíveis."],
      "Pés e retorno": ["Massageie cada pé com atenção, aperte a sola de leve e depois suba as mãos pelas pernas em um único movimento longo e lento."],
      "Virar": ["Peça para quem recebe virar com calma, cobrindo com uma toalha, se preferir. Fiquem em silêncio por um instante e respirem no mesmo ritmo."],
      "Frente do corpo": ["Comece pelos ombros e desça pelo peito e pela barriga com toques lentos. Observe as reações e vá onde quem recebe indicar."],
      "Final": ["Desacelerem com toques leves, façam um abraço demorado e perguntem o que foi melhor. Depois, trocam de lugar ou decidem juntos como continuar."]
    },
    erotica: {
      "Combinar": ["Conversem rápido: o que é liberado, o que não é e a palavra para parar. Deixem óleo morno, toalhas e música à mão. Quem recebe começa de bruços e pode pular qualquer etapa."],
      "Óleo e costas": ["Despeje um fio de óleo morno nas costas e espalhe com as palmas, em movimentos largos e lentos. Sinta a pele esquentar antes de seguir."],
      "Nuca e orelhas": ["Aproxime a boca da nuca sem tocar, só com a respiração, e depois beije devagar até a orelha. Sussurre o que pretende fazer."],
      "Lombar e quadril": ["Deslize as mãos pela lombar e desça devagar até o quadril, com pressão firme, voltando com toques leves. Peça um sinal para continuar."],
      "Coxas e quadril": ["Massageie as coxas de baixo para cima com as duas mãos, parando perto do quadril, e volte. A cada passada, chegue um pouco mais perto das áreas sensíveis, perguntando se quer."],
      "Virar": ["Quem recebe vira de barriga para cima. Quem massageia olha nos olhos, sorri e espera um sinal antes de continuar."],
      "Peito e barriga": ["Espalhe óleo pelo peito e pela barriga com as palmas, em movimentos circulares, alternando mãos e pontas dos dedos. Beije a barriga, se quem recebe gostar."],
      "Provocação": ["Chegue perto das áreas íntimas e pare antes de tocar, várias vezes, com sopros e beijos nas coxas. Só continue quando quem recebe pedir."],
      "Toque íntimo (opcional)": ["Se os dois toparem, passem a carícias íntimas, devagar no começo. Quem recebe guia com palavras ou com a mão, e vocês verificam o conforto a cada poucos segundos."],
      "Final": ["Desacelerem aos poucos, com toques leves e um abraço longo. Conversem sobre o que gostaram e decidam juntos se trocam de lugar."]
    }
  };

  // ----- etapa surpresa: uma é sorteada e entra antes do "Final" -----
  const SURPRESAS = {
    relaxante: [
      { t: "Surpresa: couro cabeludo", s: 60, d: "Com a ponta dos dedos, faça círculos suaves no couro cabeludo, como se lavasse o cabelo, e puxe levemente os fios perto da raiz." },
      { t: "Surpresa: rosto", s: 60, d: "Massageie testa, têmporas e mandíbula em círculos pequenos, com as pontas dos dedos. Evite pressionar os olhos." },
      { t: "Surpresa: respirar juntos", s: 60, d: "Apoie uma mão nas costas de quem recebe e respirem juntos: inspirem por 4 segundos e soltem por 6." },
      { t: "Surpresa: punhos e tornozelos", s: 60, d: "Faça rotações lentas e suaves nos punhos e nos tornozelos, sem forçar nenhum movimento." },
      { t: "Surpresa: toalha morna", s: 45, d: "Se tiver, passe uma toalha morna nas costas e deixe alguns segundos sobre a pele. Teste a temperatura antes." }
    ],
    sensual: [
      { t: "Surpresa: gelo", s: 45, d: "Passe um cubo de gelo devagar pelas costas e pela nuca, e depois aqueça o local com as mãos ou com um sopro quente." },
      { t: "Surpresa: pena ou tecido", s: 60, d: "Deslize uma pena, um lenço ou um tecido leve pelo corpo, em toques quase imperceptíveis." },
      { t: "Surpresa: olhos fechados", s: 60, d: "Quem recebe fecha os olhos ou usa uma venda, e quem massageia escolhe o próximo toque sem avisar onde. Quem recebe pode abrir os olhos quando quiser." },
      { t: "Surpresa: sussurros", s: 45, d: "Sussurre ao ouvido de quem recebe três coisas que você adora nessa pessoa, com a boca bem perto, entre um toque e outro." },
      { t: "Surpresa: beijos lentos", s: 60, d: "Beijos lentos pelo ombro, pelas costas ou pelo pescoço, sem pressa, só onde quem recebe topar." }
    ],
    erotica: [
      { t: "Surpresa: óleo aquecido", s: 60, d: "Pingue um pouco de óleo morno na pele e espalhe devagar com a palma. Teste a temperatura na sua mão antes, para não queimar." },
      { t: "Surpresa: venda", s: 90, d: "Venda quem recebe e escolha o próximo toque sem avisar, entre mãos, boca e sopros. Quem recebe pode tirar a venda a qualquer momento." },
      { t: "Surpresa: pausa provocante", s: 45, d: "Pare de tocar por 20 segundos e apenas sussurre o que quer fazer, antes de continuar." },
      { t: "Surpresa: gelo e calor", s: 60, d: "Alterne gelo e toques mornos pelo corpo, pedindo a quem recebe que diga o que prefere." },
      { t: "Surpresa: quem recebe comanda", s: 60, d: "Quem recebe guia, mostrando com a mão onde e como quer ser tocado, e quem massageia segue o comando." }
    ]
  };

  const ESTILOS = [["relaxante", "Relaxante"], ["sensual", "Sensual"], ["erotica", "Erótica"]];
  const DURACOES = [["0.6", "Rápida"], ["1", "Normal"], ["1.8", "Longa"]];

  const cfg = { estilo: "relaxante", mult: "1", primeiro: 0 };

  let passos = [];
  let i = 0;
  let rodada = 0; // 0 = primeira pessoa recebe; 1 = trocam
  let restante = 0;
  let fim = 0;
  let tick = null;
  let lock = null;
  let audio = null;

  const nomes = () =>
    Array.isArray(P) && P.length === 2 ? P : ["Pessoa 1", "Pessoa 2"];
  const recebe = () => nomes()[cfg.primeiro ^ rodada];
  const massageia = () => nomes()[1 - (cfg.primeiro ^ rodada)];
  const fmt = s => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;

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
  sec.id = "s-massagem";

  const vSetup = el("div", "mview");
  const vPasso = el("div", "mview moff");
  const vTroca = el("div", "mview moff");
  const vFim = el("div", "mview moff");
  sec.append(vSetup, vPasso, vTroca, vFim);
  $("s-level").after(sec);

  const views = { setup: vSetup, passo: vPasso, troca: vTroca, fim: vFim };
  function ver(nome) {
    Object.entries(views).forEach(([k, v]) => v.classList.toggle("moff", k !== nome));
  }

  // ----- setup -----
  function chips(opcoes, valorAtual, aoEscolher) {
    const box = el("div", "chips");
    opcoes.forEach(([valor, nome]) => {
      const b = botao(nome, "chip" + (String(valor) === String(valorAtual) ? " on" : ""));
      b.onclick = () => {
        aoEscolher(valor);
        [...box.children].forEach(x => x.classList.toggle("on", x === b));
      };
      box.appendChild(b);
    });
    return box;
  }

  const nota = el("p", "sub");

  function montarSetup() {
    vSetup.textContent = "";

    const n = nomes();
    vSetup.append(
      el("h2", "", "Massagem guiada"),
      el("p", "sub", "Um roteiro por etapas, com cronômetro. Quem recebe manda na pressão e pode parar quando quiser."),
      el("p", "sub", "Estilo"),
      chips(ESTILOS, cfg.estilo, v => { cfg.estilo = v; atualizarNota(); }),
      el("p", "sub", "Duração de cada etapa"),
      chips(DURACOES, cfg.mult, v => { cfg.mult = v; }),
      el("p", "sub", "Quem recebe primeiro?"),
      chips([[0, n[0]], [1, n[1]]], cfg.primeiro, v => { cfg.primeiro = Number(v); }),
      nota
    );

    const linha = el("div", "row");
    const bIr = botao("Começar");
    const bVoltar = botao("Voltar", "ghost");
    bIr.onclick = comecar;
    bVoltar.onclick = () => show("s-start");
    linha.append(bIr, bVoltar);
    vSetup.appendChild(linha);

    atualizarNota();
  }

  const NOTAS = {
    relaxante: "Foco em aliviar a tensão, com pressão de média a firme. Evite áreas machucadas ou doloridas.",
    sensual: "Ritmo lento e toques leves, com etapas para a nuca e para a frente do corpo. Óleos podem danificar preservativos de látex. Nada além do que os dois toparem.",
    erotica: "Massagem íntima, só para adultos que combinaram antes. Óleo e preservativo de látex não combinam. Cuidem da higiene e parem ao primeiro sinal de desconforto."
  };

  function atualizarNota() {
    nota.textContent = NOTAS[cfg.estilo];
  }

  // ----- passos -----
  const sortear = lista => lista[Math.floor(Math.random() * lista.length)];

  function montarPassos() {
    const mult = parseFloat(cfg.mult);

    const lista = ROTEIROS[cfg.estilo].map(p => {
      const alternativas = [p.d, ...((VARIACOES[cfg.estilo] || {})[p.t] || [])];
      return { ...p, d: sortear(alternativas) };
    });

    // A surpresa entra antes da última etapa (o "Final").
    lista.splice(lista.length - 1, 0, sortear(SURPRESAS[cfg.estilo]));

    return lista.map(p => ({
      ...p,
      seg: Math.max(15, Math.round((p.s * mult) / 5) * 5)
    }));
  }

  function comecar() {
    pararTudo();
    passos = montarPassos();
    i = 0;
    rodada = 0;
    mostrarPasso();
  }

  // elementos da tela de passo (criados uma vez)
  const pContador = el("div", "level");
  const pTitulo = el("div", "mtitle");
  const pPapeis = el("p", "sub");
  const pTexto = el("div", "mcard");
  const pRelogio = el("div", "mclock");
  pRelogio.setAttribute("role", "timer");
  const pLinha = el("div", "row");
  const bTempo = botao("Iniciar tempo");
  const bProx = botao("Próxima etapa", "ghost");
  const bSair = botao("Encerrar", "ghost");
  pLinha.append(bTempo, bProx);
  vPasso.append(pContador, pTitulo, pPapeis, pTexto, pRelogio, pLinha, bSair);

  function mostrarPasso() {
    const p = passos[i];
    pararTudo();
    restante = p.seg;

    pContador.textContent = `Etapa ${i + 1} de ${passos.length}`;
    pTitulo.textContent = p.t;
    pPapeis.textContent = `Recebe: ${recebe()} · Massageia: ${massageia()}`;
    pTexto.textContent = p.d;
    pRelogio.textContent = fmt(restante);
    pRelogio.classList.remove("done");
    bTempo.textContent = "Iniciar tempo";
    bProx.textContent = i === passos.length - 1 ? "Concluir" : "Próxima etapa";
    ver("passo");
  }

  // ----- cronômetro da etapa -----
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

  function bipe() {
    if (!audio || LS.get("timerSom") === "0") return;

    const tocar = () => {
      [0, 0.3, 0.6].forEach(atraso => {
        const osc = audio.createOscillator();
        const ganho = audio.createGain();
        osc.frequency.value = 880;
        ganho.gain.value = 0.3;
        osc.connect(ganho);
        ganho.connect(audio.destination);
        osc.start(audio.currentTime + atraso);
        osc.stop(audio.currentTime + atraso + 0.18);
      });
    };

    if (audio.state === "running") tocar();
    else audio.resume().then(tocar).catch(() => {});
  }

  function avisar() {
    document.body.classList.add("timer-alert");
    setTimeout(() => document.body.classList.remove("timer-alert"), 1800);
    if (navigator.vibrate) navigator.vibrate([400, 200, 400, 200, 600]);
    bipe();
  }

  function pararTudo() {
    clearInterval(tick);
    tick = null;
    soltarTela();
  }

  function atualizar() {
    if (!sec.classList.contains("on")) {
      pararTudo();
      return;
    }

    restante = Math.max(0, Math.ceil((fim - Date.now()) / 1000));
    pRelogio.textContent = fmt(restante);

    if (restante === 0) {
      pararTudo();
      pRelogio.textContent = "Tempo!";
      pRelogio.classList.add("done");
      bTempo.textContent = "Repetir tempo";
      avisar();
    }
  }

  bTempo.onclick = () => {
    if (tick) {
      // pausar
      pararTudo();
      bTempo.textContent = "Continuar";
      return;
    }

    if (restante === 0) restante = passos[i].seg;

    pRelogio.classList.remove("done");
    prepararAudio();
    pedirTelaAcesa();

    fim = Date.now() + restante * 1000;
    bTempo.textContent = "Pausar";
    tick = setInterval(atualizar, 250);
    atualizar();
  };

  bProx.onclick = () => {
    if (i < passos.length - 1) {
      i++;
      mostrarPasso();
    } else if (rodada === 0) {
      pararTudo();
      montarTroca();
      ver("troca");
    } else {
      pararTudo();
      montarFim();
      ver("fim");
    }
  };

  bSair.onclick = () => {
    pararTudo();
    show("s-start");
  };

  // ----- troca de lugar -----
  function montarTroca() {
    vTroca.textContent = "";
    const b = botao("Continuar");
    b.onclick = () => {
      rodada = 1;
      i = 0;
      passos = montarPassos(); // novo sorteio de textos e de surpresa
      mostrarPasso();
    };
    vTroca.append(
      el("h2", "", "Troquem de lugar"),
      el("p", "sub", `Agora ${nomes()[cfg.primeiro ^ 1]} recebe e ${nomes()[cfg.primeiro]} massageia. Façam uma pausa, se quiserem.`),
      b
    );
  }

  // ----- fim -----
  function montarFim() {
    vFim.textContent = "";
    const linha = el("div", "row");
    const bDeNovo = botao("Fazer de novo");
    const bInicio = botao("Voltar ao início", "ghost");
    bDeNovo.onclick = abrir;
    bInicio.onclick = () => show("s-start");
    linha.append(bDeNovo, bInicio);

    vFim.append(
      el("h2", "", "Fim da massagem"),
      el("p", "sub", "Conversem: o que foi melhor? Algo que preferem mudar da próxima vez?"),
      linha
    );
  }

  // ----- entrada -----
  function abrir() {
    pararTudo();
    montarSetup();
    ver("setup");
    show("s-massagem");
  }

  // botão na tela inicial (depois do "Ideias de date", se existir)
  const bMassagem = botao("Massagem guiada", "ghost");
  bMassagem.id = "b-massagem";
  bMassagem.onclick = abrir;
  ($("b-dates") || $("b-start")).after(bMassagem);
})();