// ==========================================
// DADO. — JOGO PARA DOIS
// {A} = quem age
// {B} = quem recebe
// ==========================================

const LEVELS = [
  {
    name: "Aquecendo",
    acts: [
      "{A} dá um beijo na bochecha de {B}",
      "{A} faz um elogio sincero para {B}",
      "{A} segura a mão de {B} por 30 segundos olhando nos olhos",
      "{A} dá um abraço apertado em {B}",
      "{A} dá um beijo na testa de {B}",
      "{A} sussurra algo carinhoso no ouvido de {B}",
      "{A} faz um carinho no rosto de {B}"
    ]
  },
  {
    name: "Esquentando",
    acts: [
      "{A} dá um beijo demorado na boca de {B}",
      "{A} dá um beijo no pescoço de {B}",
      "{A} faz uma massagem nos ombros de {B}",
      "{A} beija a mão de {B} e sobe até o braço",
      "{A} sussurra o que mais gosta em {B}",
      "{A} dá um beijo atrás da orelha de {B}",
      "{A} passa os dedos devagar pelas costas de {B}"
    ]
  },
  {
    name: "Picante",
    acts: [
      "{A} beija {B} com vontade por 1 minuto",
      "{A} morde de leve o lábio de {B}",
      "{A} beija o pescoço de {B} e sussurra um desejo",
      "{A} tira uma peça de roupa de {B}",
      "{A} faz uma massagem sensual em {B}",
      "{A} conta uma fantasia para {B} ao pé do ouvido",
      "{A} beija {B} do pescoço até o ombro",
      "{A} tira a roupa de {B} devagar, peça por peça",
      "{A} passa um cubo de gelo pelo pescoço e pelo colo de {B}",
      "{A} faz uma dança sensual para {B}",
      "{A} beija a barriga de {B} descendo devagar",
      "{A} escolhe uma parte do corpo de {B} e beija por 1 minuto",
      "{A} sussurra o que quer fazer com {B} hoje à noite",
      "{A} morde de leve o pescoço de {B}",
      "{A} beija as costas de {B} de cima a baixo",
      "{A} senta no colo de {B} e beija devagar, sem pressa"
    ]
  },
  {
    name: "Intenso",
    acts: [
      "{A} escolhe onde {B} vai beijar, por 1 minuto",
      "{A} venda {B} e beija onde quiser, com respeito aos limites",
      "{A} diz a {B} exatamente o que quer agora",
      "{A} e {B} trocam beijos sem pressa, sem usar as mãos",
      "{A} dá o comando: {B} segue por 1 minuto",
      "{A} beija {B} onde {B} permitir",
      "{A} faz massagem com óleo em {B}, sem pressa e sem pular nenhuma parte",
      "{A} e {B} tomam banho juntos, com muita provocação",
      "{A} provoca {B} só com beijos e sopros, sem usar as mãos",
      "{A} faz {B} pedir por mais antes de continuar",
      "{A} diz em voz baixa as palavras que mais excitam {B}",
      "{A} venda {B} e escolhe cada próximo toque",
      "{A} provoca {B} até {B} implorar, sem deixar terminar",
      "{A} escolhe uma roupa íntima para {B} vestir e depois tirar",
      "{A} e {B} fazem um strip-tease, um de cada vez",
      "{A} sussurra uma fantasia e {B} diz se topa realizar"
    ]
  },
  {
    name: "Sem limites",
    acts: [
      "{A} e {B} experimentam a posição colherzinha (de lado, bem juntinhos)",
      "{A} e {B} escolhem entre papai e mamãe: olhos nos olhos, sem pressa",
      "{B} por cima: {B} dita o ritmo e {A} acompanha",
      "{A} e {B} sentados frente a frente, abraçados, movimento lento",
      "{A} por trás de {B}, em pé, encostados na parede",
      "{A} e {B} testam a posição de quatro, com {B} escolhendo o ritmo",
      "{A} e {B} em posição 69, no ritmo que ambos gostarem",
      "{A} escolhe uma posição e {B} aprova ou escolhe outra",
      "{A} beija o corpo de {B} inteiro, descendo devagar, até onde {B} permitir",
      "{B} escolhe a posição e {A} segue o comando",
      "{A} e {B} na posição lótus: sentados, abraçados, pernas entrelaçadas",
      "{A} deita e {B} fica por cima, de costas, em posição invertida",
      "{A} e {B} na beira da cama: {B} deita e {A} fica em pé",
      "{A} senta numa cadeira ou no sofá e {B} senta no colo, de frente",
      "{A} e {B} frente a frente em pé, com {B} se apoiando em {A}",
      "{A} e {B} de lado, frente a frente, pernas entrelaçadas (posição tesoura)",
      "{B} de joelhos na cama, com apoio, e {A} por trás, devagar",
      "Papai e mamãe com as pernas de {B} elevadas nos ombros de {A}",
      "{A} e {B} no chuveiro ou perto de uma parede, com muito cuidado e carinho",
      "{A} e {B} trocam de posição a cada minuto, e {B} escolhe a próxima",
      "{A} e {B} deitados de conchinha, e {A} leva o ritmo bem lento",
      "{B} senta na borda de uma superfície firme e {A} fica de frente, em pé",
      "{A} e {B} sorteiam: cada um sugere uma posição e a escolha vai no par ou ímpar",
      "Posição livre: {A} e {B} escolhem juntos a favorita da noite",
      "{A} faz carícias íntimas em {B}, no ritmo que {B} pedir",
      "{A} faz oral em {B} por 2 minutos, depois trocam",
      "{A} e {B} se despem por completo e escolhem o que fazer, sem pressa",
      "{A} e {B} fazem um jogo de papéis: {A} escolhe os personagens",
      "{A} dá ordens por 2 minutos e {B} obedece, dentro dos limites combinados",
      "{A} e {B} sorteiam uma posição que nunca fizeram",
      "{B} escolhe um cômodo da casa e os dois vão para lá",
      "{A} e {B} escolhem uma palavra de segurança e jogam uma rodada de dominação leve",
      "{A} e {B} decidem juntos como termina a noite"
    ]
  }
];

// Quantidade de jogadas por fase.
const PER = [4, 4, 6, 6, 6];

const $ = id => document.getElementById(id);

const show = id => {
  document.querySelectorAll(".screen").forEach(screen => {
    screen.classList.remove("on");
  });

  $(id).classList.add("on");
};

let P = [];
let turn = 0;
let count = 0;
let lvl = 0;
let used = [];
let rollTimeout = null;
let faceInterval = null;
let bannerTimeout = null;

const faces = ["⚀", "⚁", "⚂", "⚃", "⚄", "⚅"];

const HEAT = [
  "●○○○○",
  "●●○○○",
  "●●●○○",
  "●●●●○",
  "●●●●●"
];

// ==========================================
// NAVEGAÇÃO
// ==========================================

$("b-start").onclick = () => show("s-names");
$("b-names-back").onclick = () => show("s-start");

// Troca a ordem dos nomes (quem começa).
$("b-swap").onclick = () => {
  const temp = $("n1").value;
  $("n1").value = $("n2").value;
  $("n2").value = temp;
};

$("b-go").onclick = () => {
  const a = $("n1").value.trim();
  const b = $("n2").value.trim();

  if (!a || !b) {
    (!a ? $("n1") : $("n2")).focus();
    return;
  }

  if (a.toLocaleLowerCase() === b.toLocaleLowerCase()) {
    alert("Digite nomes diferentes para os jogadores.");
    $("n2").focus();
    return;
  }

  P = [a, b];
  show("s-level");
};

// ==========================================
// CRIAÇÃO DA LISTA DE FASES
// ==========================================

LEVELS.forEach((level, index) => {
  const button = document.createElement("button");

  const name = document.createElement("span");
  name.textContent = `${index + 1}. ${level.name}`;

  const heat = document.createElement("span");
  heat.textContent = HEAT[index];

  button.append(name, heat);

  button.onclick = () => {
    clearGameTimers();

    turn = 0;
    count = 0;
    lvl = index;
    used = [];

    $("b-roll").textContent = "Girar dado";
    $("b-roll").onclick = roll;

    show("s-game");
    render();
  };

  $("lvlist").appendChild(button);
});

$("b-end").onclick = () => {
  clearGameTimers();
  show("s-start");
};

// ==========================================
// RENDERIZAÇÃO
// ==========================================

function render() {
  $("lvl").textContent =
    `Fase ${lvl + 1} · ${LEVELS[lvl].name}`;

  [...$("bar").children].forEach((element, index) => {
    element.classList.toggle("a", index <= lvl);
  });

  $("turn").textContent = "";

  const label = document.createElement("span");
  label.textContent = "Vez de ";

  const name = document.createElement("b");
  name.textContent = P[turn];

  $("turn").append(label, name);

  $("die").textContent = "⚀";
  $("act").textContent = "Gire o dado";

  $("b-skip").disabled = true;
  $("b-roll").disabled = false;
  $("b-roll").textContent = "Girar dado";
  $("b-roll").onclick = roll;
}

// ==========================================
// ESCAPE DE TEXTO
// ==========================================

function esc(text) {
  return String(text).replace(/[&<>"']/g, character => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[character]);
}

// ==========================================
// SORTEIO SEM REPETIR ATÉ ESGOTAR A FASE
// ==========================================

function pick() {
  const list = LEVELS[lvl].acts;

  let pool = list
    .map((_, index) => index)
    .filter(index => !used.includes(`${lvl}-${index}`));

  if (pool.length === 0) {
    used = used.filter(item => !item.startsWith(`${lvl}-`));
    pool = list.map((_, index) => index);
  }

  const index = pool[Math.floor(Math.random() * pool.length)];

  used.push(`${lvl}-${index}`);

  return list[index];
}

// ==========================================
// GIRAR O DADO
// ==========================================

function roll() {
  if ($("b-roll").disabled) return;

  $("b-roll").disabled = true;
  $("b-skip").disabled = true;

  const die = $("die");

  die.classList.remove("roll");
  void die.offsetWidth;
  die.classList.add("roll");

  let n = 0;

  faceInterval = setInterval(() => {
    die.textContent = faces[Math.floor(Math.random() * faces.length)];

    if (++n > 8) {
      clearInterval(faceInterval);
      faceInterval = null;
    }
  }, 80);

  rollTimeout = setTimeout(() => {
    rollTimeout = null;

    const action = pick()
      .replace(/\{A\}/g, `<b>${esc(P[turn])}</b>`)
      .replace(/\{B\}/g, `<b>${esc(P[1 - turn])}</b>`);

    $("act").innerHTML = `<span>${action}</span>`;

    $("b-roll").textContent = "Próxima vez";
    $("b-roll").disabled = false;
    $("b-skip").disabled = false;

    $("b-roll").onclick = next;
  }, 750);
}

// ==========================================
// PRÓXIMA JOGADA
// ==========================================

function next() {
  turn = 1 - turn;
  count++;

  $("b-roll").textContent = "Girar dado";
  $("b-roll").onclick = roll;

  if (count >= PER[lvl] && lvl < LEVELS.length - 1) {
    count = 0;
    lvl++;

    $("bt").textContent = LEVELS[lvl].name;
    $("banner").classList.add("on");

    bannerTimeout = setTimeout(() => {
      bannerTimeout = null;
      $("banner").classList.remove("on");
      render();
    }, 2200);

    $("b-roll").disabled = true;
    $("b-skip").disabled = true;

    return;
  }

  render();
}

// Pular sorteia outra ação para o mesmo jogador.
$("b-roll").onclick = roll;

$("b-skip").onclick = () => {
  $("b-roll").textContent = "Girar dado";
  $("b-roll").onclick = roll;

  // Permite sortear outra ação sem trocar o jogador.
  $("b-roll").disabled = false;
  roll();
};

// ==========================================
// CANCELAMENTO DE TEMPORIZADORES
// ==========================================

function clearGameTimers() {
  if (rollTimeout !== null) {
    clearTimeout(rollTimeout);
    rollTimeout = null;
  }

  if (faceInterval !== null) {
    clearInterval(faceInterval);
    faceInterval = null;
  }

  if (bannerTimeout !== null) {
    clearTimeout(bannerTimeout);
    bannerTimeout = null;
  }

  $("banner").classList.remove("on");
}

// ==========================================
// IDADE, PRIVACIDADE E ARMAZENAMENTO LOCAL
// ==========================================

const LS = {
  get(key) {
    try {
      return localStorage.getItem(key);
    } catch (error) {
      return null;
    }
  },

  set(key, value) {
    try {
      localStorage.setItem(key, value);
    } catch (error) {
      // O jogo continua funcionando mesmo se o armazenamento
      // local estiver indisponível.
    }
  }
};

function updatePriv() {
  const shouldShow =
    LS.get("ageOk") === "1" &&
    LS.get("consent") === null;

  $("priv").classList.toggle("on", shouldShow);
}

$("b-yes").onclick = () => {
  LS.set("ageOk", "1");

  show("s-start");
  updatePriv();
  prepararPublicidade();
};

$("b-no").onclick = () => {
  $("age-msg").textContent =
    "Este jogo é apenas para maiores de 18 anos.";

  $("b-yes").style.display = "none";
  $("b-no").style.display = "none";
};

$("priv-ok").onclick = () => {
  LS.set("consent", "1");

  updatePriv();
  prepararPublicidade();
};

$("priv-x").onclick = () => {
  LS.set("consent", "0"); // 0 = recusado
  updatePriv();
};

$("priv-more").onclick = event => {
  event.preventDefault();
  $("privmodal").classList.add("on");
};

$("priv-close").onclick = () => {
  $("privmodal").classList.remove("on");
};

// ==========================================
// PUBLICIDADE — ESPAÇO RESERVADO
// ==========================================

// Esta função NÃO carrega anúncios.
// O código oficial da rede precisa ser validado e integrado
// separadamente antes de ativar a publicidade.

function prepararPublicidade() {
  const container = $("ad-container");

  if (!container) return;

  // Mantém a publicidade desativada até a integração validada.
  container.hidden = true;
}

// ==========================================
// INICIALIZAÇÃO
// ==========================================

if (LS.get("ageOk") === "1") {
  show("s-start");
}

updatePriv();
prepararPublicidade();