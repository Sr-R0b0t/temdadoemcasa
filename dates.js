// ==========================================
// DATES — ideias de encontros e passeios
// Carregue DEPOIS do script.js (usa $ e show).
// c = clima, o = orçamento (0 grátis, 1 barato, 2 especial)
// ==========================================

(function () {
  const CLIMAS = [
    ["todos", "Todos"], ["casa", "Em casa"], ["romantico", "Romântico"],
    ["divertido", "Divertido"], ["aventura", "Aventura"], ["viagem", "Viagem"],
    ["cultural", "Cultural"], ["distancia", "À distância"]
  ];
  const ORCS = [["todos", "Qualquer"], ["0", "Grátis"], ["1", "Barato"], ["2", "Especial"]];
  const NOME_CLIMA = Object.fromEntries(CLIMAS);
  const NOME_ORC = Object.fromEntries(ORCS);

  const DATES = [
    // EM CASA
    { c: "casa", o: 0, t: "Noite de cinema em casa", d: "Escolham um tema, façam pipoca e apaguem as luzes." },
    { c: "casa", o: 1, t: "Cozinhar juntos", d: "Sorteiem uma receita que nunca fizeram e cozinhem sem pressa." },
    { c: "casa", o: 1, t: "Jantar à luz de velas", d: "Arrumem a mesa como num restaurante, com música ao fundo." },
    { c: "casa", o: 0, t: "Noite de jogos de tabuleiro", d: "Quem perder paga uma prenda combinada antes de começar." },
    { c: "casa", o: 1, t: "Spa em casa", d: "Massagem, máscara facial e uma playlist tranquila." },
    { c: "casa", o: 2, t: "Noite de vinho e queijos", d: "Provem combinações diferentes e deem notas, como juízes." },
    { c: "casa", o: 0, t: "Banho de banheira a dois", d: "Com velas, música e nenhum celular por perto." },
    { c: "casa", o: 1, t: "Quebra-cabeça a dois", d: "Montem juntos, com uma trilha sonora escolhida pelo casal." },
    // ROMÂNTICO
    { c: "romantico", o: 1, t: "Piquenique ao pôr do sol", d: "Levem lanche, algo para sentar e cheguem antes do horário." },
    { c: "romantico", o: 0, t: "Cartas um para o outro", d: "Escrevam separados e leiam em voz alta, olhando nos olhos." },
    { c: "romantico", o: 2, t: "Noite em hotel ou motel temático", d: "Um programa para fugir da rotina por uma noite." },
    { c: "romantico", o: 2, t: "Jantar especial fora", d: "Comemorem algo pequeno, como o primeiro mês de uma nova fase." },
    { c: "romantico", o: 0, t: "Caminhada sem destino", d: "De mãos dadas, virando em qualquer esquina que parecer interessante." },
    { c: "romantico", o: 0, t: "Observar as estrelas", d: "Procurem um lugar escuro, levem uma manta e deitem para olhar o céu." },
    { c: "romantico", o: 1, t: "Recriar o primeiro encontro", d: "Mesmo lugar ou mesmo clima, relembrando como tudo começou." },
    // DIVERTIDO
    { c: "divertido", o: 1, t: "Boliche", d: "Quem perder escolhe o próximo programa do casal." },
    { c: "divertido", o: 1, t: "Karaokê", d: "Cada um escolhe uma música constrangedora para o outro cantar." },
    { c: "divertido", o: 1, t: "Fliperama", d: "Disputem em vários jogos e criem um placar do casal." },
    { c: "divertido", o: 2, t: "Aula de dança", d: "Experimentem um ritmo novo, sem se preocupar em acertar." },
    { c: "divertido", o: 1, t: "Duelo de culinária", d: "Cada um prepara um prato e o outro avalia com notas honestas." },
    { c: "divertido", o: 1, t: "Feira de rua ou mercado", d: "Provem coisas que nunca experimentaram e escolham a favorita." },
    { c: "divertido", o: 2, t: "Parque de diversões", d: "Brinquedos, algodão-doce e fotos bobas na cabine." },
    // AVENTURA
    { c: "aventura", o: 0, t: "Trilha leve", d: "Escolham um caminho tranquilo e levem água e um lanche." },
    { c: "aventura", o: 1, t: "Passeio de bicicleta", d: "Pedalem sem pressa e parem onde quiserem para descansar." },
    { c: "aventura", o: 2, t: "Escape room", d: "Trabalhem em equipe para resolver os enigmas antes do tempo acabar." },
    { c: "aventura", o: 2, t: "Viagem de um dia", d: "Escolham uma cidade próxima e voltem só à noite." },
    { c: "aventura", o: 1, t: "Cachoeira ou praia", d: "Levem protetor solar, algo para comer e deixem o relógio de lado." },
    { c: "aventura", o: 1, t: "Pedalinho ou caiaque", d: "Passeio na água, com direito a competir de remo." },
    // CULTURAL
    { c: "cultural", o: 1, t: "Museu", d: "Vejam se existe um dia com entrada gratuita e escolham a obra favorita de cada um." },
    { c: "cultural", o: 1, t: "Cinema", d: "Escolham um filme diferente do que costumam ver." },
    { c: "cultural", o: 1, t: "Sebo ou livraria", d: "Cada um escolhe um livro para dar de presente ao outro." },
    { c: "cultural", o: 1, t: "Música ao vivo", d: "Procurem um show pequeno ou um bar com banda tocando." },
    { c: "cultural", o: 2, t: "Teatro", d: "Escolham uma peça e conversem sobre ela depois, em um café." },
    { c: "cultural", o: 0, t: "Arte de rua", d: "Passeiem por uma região com grafites e fotografem os preferidos." },
    // À DISTÂNCIA
    { c: "distancia", o: 0, t: "Filme em chamada", d: "Apertem o play ao mesmo tempo e comentem durante a sessão." },
    { c: "distancia", o: 1, t: "Jantar por vídeo", d: "Cada um prepara o mesmo prato e comem juntos pela chamada." },
    { c: "distancia", o: 0, t: "Playlist a dois", d: "Cada um adiciona 5 músicas que lembram o outro e explica por quê." },
    { c: "distancia", o: 0, t: "Jogo online juntos", d: "Escolham um jogo simples e criem um placar da semana." },
    { c: "distancia", o: 1, t: "Livro em dupla", d: "Leiam o mesmo livro e marquem chamadas para conversar sobre os capítulos." },
    { c: "distancia", o: 0, t: "Passeio virtual", d: "Visitem um museu online ou explorem uma cidade pelo mapa." },
    { c: "distancia", o: 2, t: "Presente-surpresa pelo correio", d: "Mandem algo pequeno e abram juntos em chamada." },
    { c: "distancia", o: 0, t: "20 perguntas", d: "Façam perguntas que nunca fizeram um ao outro, uma de cada vez." },
    { c: "casa", o: 0, t: "Acampar na sala", d: "Armem uma barraca ou cabana de lençóis, com lanterna, lanches e histórias." },
    { c: "casa", o: 1, t: "Café da manhã na cama", d: "Um prepara, o outro só aproveita. Na vez seguinte, trocam." },
    { c: "casa", o: 0, t: "Dia sem celular", d: "Guardem os aparelhos por algumas horas e façam algo só os dois." },
    { c: "casa", o: 0, t: "Noite de álbum de fotos", d: "Revejam fotos antigas e contem o que lembram de cada momento." },
    { c: "romantico", o: 0, t: "Ver o nascer do sol", d: "Acordem cedo, levem uma garrafa de café e um lugar com boa vista." },
    { c: "romantico", o: 0, t: "Sessão de fotos do casal", d: "Escolham um lugar bonito e tirem fotos juntos, sem pressa e sem pose." },
    { c: "divertido", o: 1, t: "Dia de esportes a dois", d: "Tênis, vôlei de praia, queimada ou qualquer jogo, com direito a revanche." },
    { c: "divertido", o: 1, t: "Pintura a dois", d: "Comprem telas e tintas e pintem o mesmo tema, depois comparem." },
    { c: "divertido", o: 0, t: "Feira de antiguidades", d: "Procurem objetos curiosos e escolham um item favorito de cada um." },
    { c: "aventura", o: 2, t: "Tirolesa ou rapel", d: "Um passeio com adrenalina, para fazer juntos e contar depois." },
    { c: "aventura", o: 1, t: "Stand-up paddle", d: "Remem lado a lado em um lago ou na praia, e vejam quem cai primeiro." },
    { c: "aventura", o: 2, t: "Voo de balão ou parapente", d: "Para quem quer um programa diferente e inesquecível." },
    { c: "cultural", o: 1, t: "Festival ou feira cultural", d: "Procurem eventos gratuitos ou baratos na região e explorem as barracas." },
    { c: "cultural", o: 2, t: "Aula de cerâmica", d: "Modelem uma peça cada um e guardem de lembrança." },
    { c: "distancia", o: 0, t: "Mapa dos sonhos", d: "Marquem num mapa os lugares que querem conhecer juntos." },
    { c: "distancia", o: 0, t: "Contagem regressiva", d: "Até o próximo encontro, troquem um mini desafio por dia." },
    { c: "distancia", o: 0, t: "Caminhada em chamada", d: "Cada um caminha na sua cidade enquanto conversam, como se fosse junto." },
    // VIAGEM
    { c: "viagem", o: 2, t: "Final de semana em cidade serrana", d: "Montanha, clima fresco, lareira e cafés. Reservem com antecedência." },
    { c: "viagem", o: 2, t: "Pousada com café da manhã", d: "Escolham uma pousada charmosa a poucas horas de casa e fiquem sem pressa." },
    { c: "viagem", o: 1, t: "Viagem de carro sem roteiro", d: "Escolham só o destino final e parem em três lugares que aparecerem pelo caminho." },
    { c: "viagem", o: 1, t: "Camping a dois", d: "Barraca, fogueira onde for permitido e uma noite de céu aberto." },
    { c: "viagem", o: 2, t: "Praia fora de temporada", d: "Menos gente e mais tranquilidade para caminhar na areia e comer bem." },
    { c: "viagem", o: 2, t: "Chalé ou cabana isolada", d: "Um fim de semana longe de tudo, com banheira, lareira ou rede." },
    { c: "viagem", o: 1, t: "Cidade histórica", d: "Caminhem por ruas de pedra, igrejas, museus e cafés, sem horário." },
    { c: "viagem", o: 2, t: "Hotel-fazenda", d: "Passeio a cavalo, comida caseira e um dia inteiro ao ar livre." },
    { c: "viagem", o: 2, t: "Viagem surpresa", d: "Um planeja tudo em segredo e só revela o destino na hora de sair." },
    { c: "viagem", o: 1, t: "Rota gastronômica", d: "Escolham uma região e provem um prato típico em cada parada." },
    { c: "viagem", o: 1, t: "Até o fim da linha", d: "Peguem um ônibus ou trem e desçam no último ponto para explorar." },
    { c: "viagem", o: 2, t: "Vinícola ou cervejaria artesanal", d: "Visitem uma cidade próxima, façam a degustação e voltem sem dirigir, se possível." },
    { c: "viagem", o: 2, t: "Noite de hotel na própria cidade", d: "Viajem sem sair de casa: um hotel perto, mas com clima de férias." },
    { c: "viagem", o: 1, t: "Roteiro de cachoeiras", d: "Escolham uma região com várias quedas d'água e visitem o máximo que der." },
    { c: "viagem", o: 2, t: "Casa na árvore", d: "Uma hospedagem diferente, para dormir cercados de natureza." },
    { c: "viagem", o: 1, t: "Sortear o destino", d: "Apontem em um mapa de olhos fechados e vão para o lugar mais próximo que valer a pena." },
    { c: "viagem", o: 0, t: "Planejar a viagem dos sonhos", d: "Pesquisem destinos, montem um roteiro e calculem quanto precisam juntar." },
    { c: "viagem", o: 2, t: "Aniversário de namoro fora", d: "Voltem ao lugar onde se conheceram ou escolham um destino novo para comemorar." }
  ];

  const filtro = { c: "todos", o: "todos" };
  let usados = [];

  // ----- tela -----
  const sec = document.createElement("section");
  sec.id = "s-dates";
  sec.className = "screen";

  const titulo = document.createElement("h2");
  titulo.textContent = "Ideias de date";

  const rotulo = txt => {
    const p = document.createElement("p");
    p.className = "sub";
    p.textContent = txt;
    return p;
  };

  const boxClima = document.createElement("div");
  boxClima.className = "chips";
  const boxOrc = document.createElement("div");
  boxOrc.className = "chips";

  const dado = document.createElement("div");
  dado.className = "die";
  dado.setAttribute("aria-hidden", "true");
  dado.textContent = "⚀";

  const card = document.createElement("div");
  card.className = "datecard";
  card.textContent = "Escolha os filtros e sorteie um date.";

  const linha = document.createElement("div");
  linha.className = "row";
  const bSortear = document.createElement("button");
  bSortear.type = "button";
  bSortear.textContent = "Sortear date";
  const bVoltar = document.createElement("button");
  bVoltar.type = "button";
  bVoltar.className = "ghost";
  bVoltar.textContent = "Voltar";
  linha.append(bSortear, bVoltar);

  sec.append(titulo, rotulo("Clima"), boxClima, rotulo("Orçamento"), boxOrc, dado, card, linha);
  // Insere junto das outras telas (antes do rodapé), e não no fim do <body>.
  $("s-level").after(sec);

  function criarChips(opcoes, chave, box) {
    opcoes.forEach(([valor, nome]) => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "chip" + (filtro[chave] === valor ? " on" : "");
      b.textContent = nome;
      b.setAttribute("aria-pressed", String(filtro[chave] === valor));
      b.onclick = () => {
        filtro[chave] = valor;
        usados = [];
        [...box.children].forEach(x => {
          x.classList.toggle("on", x === b);
          x.setAttribute("aria-pressed", String(x === b));
        });
      };
      box.appendChild(b);
    });
  }

  criarChips(CLIMAS, "c", boxClima);
  criarChips(ORCS, "o", boxOrc);

  // ----- sorteio sem repetir até esgotar os resultados do filtro -----
  function mostrar() {
    const pool = DATES.map((_, i) => i).filter(i =>
      (filtro.c === "todos" || DATES[i].c === filtro.c) &&
      (filtro.o === "todos" || String(DATES[i].o) === filtro.o)
    );

    if (!pool.length) {
      card.textContent = "Nenhum date com esses filtros. Tente mudar o clima ou o orçamento.";
      return;
    }

    let livres = pool.filter(i => !usados.includes(i));
    if (!livres.length) {
      usados = usados.filter(i => !pool.includes(i));
      livres = pool;
    }

    const i = livres[Math.floor(Math.random() * livres.length)];
    usados.push(i);
    const d = DATES[i];

    const tags = document.createElement("div");
    tags.className = "datetags";
    tags.textContent = `${NOME_CLIMA[d.c]} · ${NOME_ORC[String(d.o)]}`;
    const t = document.createElement("div");
    t.className = "datetitle";
    t.textContent = d.t;
    const desc = document.createElement("div");
    desc.className = "datedesc";
    desc.textContent = d.d;

    card.textContent = "";
    card.append(tags, t, desc);
    bSortear.textContent = "Sortear outro";
  }

  // ----- animação do dado (a mesma das telas do jogo) -----
  const FACES = ["⚀", "⚁", "⚂", "⚃", "⚄", "⚅"];
  let timerFaces = null;
  let timerResultado = null;

  function pararAnimacao() {
    clearInterval(timerFaces);
    clearTimeout(timerResultado);
    timerFaces = null;
    timerResultado = null;
    dado.classList.remove("roll");
    bSortear.disabled = false;
  }

  function sortear() {
    if (bSortear.disabled) return;

    bSortear.disabled = true;

    dado.classList.remove("roll");
    void dado.offsetWidth;
    dado.classList.add("roll");

    let n = 0;
    timerFaces = setInterval(() => {
      dado.textContent = FACES[Math.floor(Math.random() * FACES.length)];
      if (++n > 8) {
        clearInterval(timerFaces);
        timerFaces = null;
      }
    }, 80);

    timerResultado = setTimeout(() => {
      timerResultado = null;
      mostrar();
      bSortear.disabled = false;
    }, 750);
  }

  bSortear.onclick = sortear;
  bVoltar.onclick = () => {
    pararAnimacao();
    show("s-start");
  };

  // ----- botão na tela inicial -----
  const iniciar = $("b-start");
  const bDates = document.createElement("button");
  bDates.id = "b-dates";
  bDates.type = "button";
  bDates.className = "ghost";
  bDates.textContent = "Ideias de date";
  bDates.onclick = () => show("s-dates");
  iniciar.after(bDates);
})();