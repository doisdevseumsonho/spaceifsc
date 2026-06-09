// ============================================================
//  TEXTOS EDITÁVEIS — altere aqui sem mexer no resto do código
// ============================================================
const TEXTOS = {
  comentariosTergio: {
    "0-20": "Bom... pelo menos você tentou.",
    "30-40": "Sobreviveu ao quiz.",
    "50-60": "Aluno nota 6.",
    "70-80": "Claramente tem uma Airfryer em casa.",
    "90-100": "Térgio não vai dormir bem esta noite.",
  },
  comentariosTaulo: {
    "0-40": "Você ajudou mais os Gincanáliens do que nós.",
    "50-80": "Alguns planetas ainda existem. Bom sinal.",
    "90-120": "Resultado aceitável para um humano.",
    "130-160": "Tomara que você não tenha família em algum planeta que explodiu.",
    "170-200": "O universo agradece seus serviços.",
  },
};

// ============================================================
//  CORES DOS RANKS
// ============================================================
const RANK_CORES = {
  F: 0x888888,
  D: 0x8b5e3c,
  C: 0x44cc44,
  B: 0x4488ff,
  A: 0xffd700,
  "A+": 0xff8800,
  S: 0xff2222,
  "S+": 0xcc44ff,
};

// ============================================================
//  TABELAS DE RANK
// ============================================================
const RANKS_TERGIO = [
  { min: 0, max: 20, rank: "F" },
  { min: 30, max: 40, rank: "D" },
  { min: 50, max: 60, rank: "C" },
  { min: 70, max: 80, rank: "B" },
  { min: 90, max: 100, rank: "A" },
];

const RANKS_TAULO = [
  { min: 0, max: 40, rank: "F" },
  { min: 50, max: 80, rank: "D" },
  { min: 90, max: 120, rank: "C" },
  { min: 130, max: 160, rank: "B" },
  { min: 170, max: 200, rank: "A" },
];

const RANKS_FINAL = [
  { min: 0, max: 40, rank: "F" },
  { min: 50, max: 80, rank: "D" },
  { min: 90, max: 120, rank: "C" },
  { min: 130, max: 160, rank: "B" },
  { min: 170, max: 200, rank: "A" },
  { min: 230, max: 260, rank: "A+" },
  { min: 270, max: 290, rank: "S" },
  { min: 300, max: 300, rank: "S+" },
];

// ============================================================
//  LAYOUT — tela 800x450 dividida em quadrantes
//
//  QP1: x 0–400,   y 0–225   (superior esquerdo)
//  QP2: x 400–800, y 0–225   (superior direito)
//  QP3: x 0–400,   y 225–450 (inferior esquerdo)
//  QP4: x 400–800, y 225–450 (inferior direito)
//
//  Cada QP dividido em 4 QS (mesma lógica, metade do QP):
//  QS1=sup-esq  QS2=sup-dir  QS3=inf-esq  QS4=inf-dir
// ============================================================
const POS = {
  // ── Tela ──────────────────────────────────────────────────
  W: 800,
  H: 450,
  CX: 400, // centro horizontal

  // ── Pontuação principal (topo, cobre QP1+QP2) ─────────────
  TOTAL_Y: 28,

  // ── Coluna Térgio (QP1: x=0..400) ────────────────────────
  // cabeçalho "ESTATÍSTICAS - TÉRGIO"
  TERGIO_HEADER_X: 160, // centro da coluna esquerda
  TERGIO_HEADER_Y: 58,

  // sprite professor1_salvo (QP1-QS2: x=200..400, y=0..112)
  TERGIO_SPRITE_X: 270,
  TERGIO_SPRITE_Y: 140,

  // pontuação (QP1-QS1: x=0..200, y=0..112)
  TERGIO_PONTOS_X: 120,
  TERGIO_PONTOS_Y: 80,

  // comentário (QP1-QS3: x=0..200, y=112..225)
  TERGIO_COMENT_X: 120,
  TERGIO_COMENT_Y: 145,

  // rank (QP1-QS4: x=200..400, y=112..225)
  TERGIO_RANK_X: 260,
  TERGIO_RANK_Y: 210,

  // ── Coluna Taulo (QP2: x=400..800) ───────────────────────
  // cabeçalho "ESTATÍSTICAS - TAULO"
  TAULO_HEADER_X: 580,
  TAULO_HEADER_Y: 58,

  // sprite professor2_salvo (QP2-QS1: x=400..600, y=0..112)
  TAULO_SPRITE_X: 490,
  TAULO_SPRITE_Y: 140,

  // pontuação (QP2-QS2: x=600..800, y=0..112)
  TAULO_PONTOS_X: 670,
  TAULO_PONTOS_Y: 80,

  // comentário (QP2-QS3: x=400..600, y=112..225)
  TAULO_COMENT_X: 490,
  TAULO_COMENT_Y: 220,

  // planetas destruídos (QP2-QS4: x=600..800, y=112..225)
  PLANETAS_X: 670, // centro da linha de planetas
  PLANETAS_Y: 170, // Y do label "Planetas destruídos:"
  PLANETAS_SPRITES_Y: 180, // Y dos sprites de planetas

  // rank Taulo (logo abaixo do comentário, pode entrar no QP4-QS1)
  TAULO_RANK_X: 667,
  TAULO_RANK_Y: 120,

  // ── Inferior (QP3 e QP4) ──────────────────────────────────
  // "PONTUAÇÃO FINAL" + total (QP3, lado esquerdo)
  FINAL_HEADER_X: 400,
  FINAL_HEADER_Y: 260,
  FINAL_PONTOS_X: 400,
  FINAL_PONTOS_Y: 280,

  // rank final (centro, entre QP3-QS2 e QP4-QS1)
  RANK_FINAL_X: 400,
  RANK_FINAL_Y: 360,

  // Among Us (QP3-QS3: x=0..200, y=337..450)
  AMONG_X: 56,
  AMONG_Y: 400,

  // tijolinhos (QP3-QS3+QS4 e QP4-QS3+QS4, linha inferior)
  TIJOL_X: 400,
  TIJOL_Y: 425,

  // ── Misc ──────────────────────────────────────────────────
  PLANETA_TAM: 32, // tamanho de cada sprite de planeta
  PLANETA_GAP: 32, // espaçamento entre centros
  AMONG_SIZE: 64, // tamanho do sprite Among Us
  SPRITE_SCALE: 1.8, // escala dos sprites de professor
};

// Chaves dos planetas — deve bater com scene2.PLANET_FLAGS
const PLANET_FLAG_KEYS = [
  null,
  "terraExplodida",
  "marteExplodido",
  "venusExplodido",
  "jupiterExplodido",
  "saturnoExplodido",
  "uranoExplodido",
  "netunoExplodido",
  "mercurioExplodido",
  "luaExplodida",
  "plutaoExplodido",
];

// ============================================================
//  TIMINGS DE REVELAÇÃO
// ============================================================
const TIMING = {
  ENTRE: 550, // ms entre textos normais
  RANK: 900, // ms de suspense extra antes de rank intermediário
  RANK_FINAL: 1400, // ms de suspense extra antes do rank final
  POS_RANK: 500, // ms após rank antes do próximo elemento
  POS_RANK_F: 1100, // ms após rank final antes do próximo elemento
};

// ============================================================
//  CENA PRINCIPAL
// ============================================================
export default class finalStats extends Phaser.Scene {
  constructor() {
    super("finalStats");
  }

  create() {
    const pontosTaulo = this.game.points ?? 0;
    const pontosTergio = this.game.tergiopoints ?? 0;
    const pontosTotal = pontosTaulo + pontosTergio;

    // Acumulador de delay para a sequência de revelação
    this._delay = 0;

    this._criarFundo();
    this._criarAmongus();
    this._iniciarSequencia(pontosTergio, pontosTaulo, pontosTotal);
  }

  // ============================================================
  //  SETUP VISUAL
  // ============================================================

  _criarFundo() {
    // Cobre a tela mantendo proporção da imagem 450x384
    const escala = Math.max(POS.W / 450, POS.H / 384);
    this.add.image(POS.CX, POS.H / 2, "final_background").setScale(escala);
  }

  _criarAmongus() {
    if (!this.anims.exists("finalstats-among")) {
      this.anims.create({
        key: "finalstats-among",
        frames: this.anims.generateFrameNumbers("Amongus", {
          start: 0,
          end: 7,
        }),
        frameRate: 8,
        repeat: -1,
      });
    }
    this.add
      .sprite(POS.AMONG_X, POS.AMONG_Y, "Amongus")
      .setDisplaySize(POS.AMONG_SIZE, POS.AMONG_SIZE)
      .play("finalstats-among");
  }

  // ============================================================
  //  SEQUÊNCIA DE REVELAÇÃO
  // ============================================================

  _iniciarSequencia(pontosTergio, pontosTaulo, pontosTotal) {
    const rankTergio = calcularRank(pontosTergio, RANKS_TERGIO);
    const rankTaulo = calcularRank(pontosTaulo, RANKS_TAULO);
    const rankFinal = calcularRank(pontosTergio + pontosTaulo, RANKS_FINAL);
    const comentTergio = calcularComentario(
      pontosTergio,
      TEXTOS.comentariosTergio,
    );
    const comentTaulo = calcularComentario(
      pontosTaulo,
      TEXTOS.comentariosTaulo,
    );

    // ── 1. Pontuação total (topo, largura toda) ───────────────
    this._revelar(() => {
      this._texto(
        POS.CX,
        POS.TOTAL_Y,
        `PARABÉNS! VOCÊ CONSEGUIU ${pontosTergio + pontosTaulo} PONTOS!`,
        {
          fontSize: "23px",
          fill: "#ffffff",
          fontStyle: "bold",
          stroke: "#000000",
          strokeThickness: 5,
        },
        "pop",
      );
    });

    // ── 2. Cabeçalho Térgio ───────────────────────────────────
    this._revelar(() => {
      this._texto(
        POS.TERGIO_HEADER_X,
        POS.TERGIO_HEADER_Y,
        "── ESTATÍSTICAS - TÉRGIO ──",
        {
          fontSize: "16px",
          fill: "#ffdd88",
          fontStyle: "bold",
          stroke: "#000000",
          strokeThickness: 4,
        },
        "fade",
      );
    });

    // ── 3. Sprite Térgio (QP1-QS2) + Pontuação (QP1-QS1) ─────
    this._revelar(() => {
      // sprite professor1_salvo
      this.add
        .sprite(POS.TERGIO_SPRITE_X, POS.TERGIO_SPRITE_Y, "professor1_salvo", 0)
        .setScale(POS.SPRITE_SCALE)
        .setAlpha(0);
      this.tweens.add({
        targets: this.children.list[this.children.list.length - 1],
        alpha: 1,
        duration: 400,
      });

      // pontuação
      this._texto(
        POS.TERGIO_PONTOS_X,
        POS.TERGIO_PONTOS_Y,
        `Pontuação: ${pontosTergio}`,
        {
          fontSize: "18px",
          fill: "#ffffff",
          stroke: "#000000",
          strokeThickness: 3,
        },
        "slide",
      );
    });

    // ── 4. Comentário Térgio (QP1-QS3) ───────────────────────
    this._revelar(() => {
      this._texto(
        POS.TERGIO_COMENT_X,
        POS.TERGIO_COMENT_Y,
        comentTergio,
        {
          fontSize: "13px",
          fill: "#dddddd",
          fontStyle: "italic",
          stroke: "#000000",
          strokeThickness: 3,
          wordWrap: { width: 190 },
        },
        "fade",
      );
    });

    // ── 5. Rank Térgio (QP1-QS4) — com suspense ──────────────
    this._revelarRank(rankTergio, POS.TERGIO_RANK_X, POS.TERGIO_RANK_Y, false);

    // ── 6. Cabeçalho Taulo ────────────────────────────────────
    this._revelar(() => {
      this._texto(
        POS.TAULO_HEADER_X,
        POS.TAULO_HEADER_Y,
        "── ESTATÍSTICAS - TAULO ──",
        {
          fontSize: "16px",
          fill: "#88ddff",
          fontStyle: "bold",
          stroke: "#000000",
          strokeThickness: 4,
        },
        "fade",
      );
    });

    // ── 7. Sprite Taulo (QP2-QS1) + Pontuação (QP2-QS2) ──────
    this._revelar(() => {
      // sprite professor2_salvo
      this.add
        .sprite(POS.TAULO_SPRITE_X, POS.TAULO_SPRITE_Y, "professor2_salvo", 0)
        .setScale(POS.SPRITE_SCALE)
        .setAlpha(0);
      this.tweens.add({
        targets: this.children.list[this.children.list.length - 1],
        alpha: 1,
        duration: 400,
      });

      // pontuação
      this._texto(
        POS.TAULO_PONTOS_X,
        POS.TAULO_PONTOS_Y,
        `Pontuação: ${pontosTaulo}`,
        {
          fontSize: "18px",
          fill: "#ffffff",
          stroke: "#000000",
          strokeThickness: 3,
        },
        "slide",
      );
    });

    // ── 8. Comentário Taulo (QP2-QS3) ────────────────────────
    this._revelar(() => {
      this._texto(
        POS.TAULO_COMENT_X,
        POS.TAULO_COMENT_Y,
        comentTaulo,
        {
          fontSize: "13px",
          fill: "#dddddd",
          fontStyle: "italic",
          stroke: "#000000",
          strokeThickness: 3,
          wordWrap: { width: 175 },
        },
        "fade",
      );
    });

    // ── 9. Planetas destruídos (QP2-QS4) ─────────────────────
    this._revelar(() => this._mostrarPlanetas());

    // ── 10. Rank Taulo (abaixo do comentário, pode entrar em QP4-QS1) ──
    this._revelarRank(rankTaulo, POS.TAULO_RANK_X, POS.TAULO_RANK_Y, false);

    // ── 11. "PONTUAÇÃO FINAL" + total (QP3 esquerdo) ─────────
    this._revelar(() => {
      this._texto(
        POS.FINAL_HEADER_X,
        POS.FINAL_HEADER_Y,
        "══ PONTUAÇÃO FINAL ══",
        {
          fontSize: "18px",
          fill: "#ffffff",
          fontStyle: "bold",
          stroke: "#000000",
          strokeThickness: 5,
        },
        "pop",
      );
      this._texto(
        POS.FINAL_PONTOS_X,
        POS.FINAL_PONTOS_Y,
        `${pontosTergio + pontosTaulo} pontos`,
        {
          fontSize: "16px",
          fill: "#ffffff",
          stroke: "#000000",
          strokeThickness: 3,
        },
        "slide",
      );
    });

    // ── 12. Rank final (centro, maior destaque) ───────────────
    this._revelarRank(rankFinal, POS.RANK_FINAL_X, POS.RANK_FINAL_Y, true);

    // ── 13. Tijolinhos (linha inferior, sem suspense extra) ───
    this._delay += TIMING.ENTRE;
    this.time.delayedCall(this._delay, () => {
      this._texto(
        POS.TIJOL_X,
        POS.TIJOL_Y,
        "Pontuação sendo adicionada\nna sua conta em tijolinhos!",
        {
          fontSize: "13px",
          fill: "#aaffaa",
          fontStyle: "italic",
          stroke: "#000000",
          strokeThickness: 3,
          align: "center",
          wordWrap: { width: 300 },
        },
        "fade",
      );
    });
  }

  // ============================================================
  //  PRIMITIVAS DE REVELAÇÃO
  // ============================================================

  /**
   * Agenda uma função no próximo slot de delay e avança o acumulador.
   * @param {Function} fn - função a executar no momento agendado
   */
  _revelar(fn) {
    this._delay += TIMING.ENTRE;
    this.time.delayedCall(this._delay, fn, [], this);
  }

  /**
   * Cria um texto já com alpha=0 e aplica o efeito de entrada.
   * Retorna o objeto de texto criado.
   */
  _texto(x, y, conteudo, estilo, efeito = "fade") {
    const txt = this.add
      .text(x, y, conteudo, {
        align: "center",
        ...estilo,
      })
      .setOrigin(0.5)
      .setAlpha(0);

    aplicarEfeito(this, txt, efeito);
    return txt;
  }

  /**
   * Agenda a revelação de um rank com suspense e animação própria.
   * @param {string}  rank   - letra do rank
   * @param {number}  x      - posição X do rank na tela
   * @param {number}  y      - posição Y do rank na tela
   * @param {boolean} eFinal - se true, usa animação especial do rank final
   */
  _revelarRank(rank, x, y, eFinal) {
    // Pausa extra para criar suspense
    this._delay += eFinal ? TIMING.RANK_FINAL : TIMING.RANK;

    const cor = RANK_CORES[rank] ?? 0xffffff;
    const corHex = "#" + cor.toString(16).padStart(6, "0");

    this.time.delayedCall(
      this._delay,
      () => {
        if (eFinal) {
          this._animRankFinal(rank, cor, corHex, x, y);
        } else {
          this._animRankNormal(rank, corHex, x, y);
        }
      },
      [],
      this,
    );

    this._delay += eFinal ? TIMING.POS_RANK_F : TIMING.POS_RANK;
  }

  /** Pop + escala com overshoot — ranks intermediários */
  _animRankNormal(rank, corHex, x, y) {
    const txt = this.add
      .text(x, y, `RANK: ${rank}`, {
        fontSize: "30px",
        fill: corHex,
        fontStyle: "bold",
        stroke: "#000000",
        strokeThickness: 6,
        align: "center",
      })
      .setOrigin(0.5)
      .setAlpha(0)
      .setScale(0.2);

    this.tweens.add({
      targets: txt,
      alpha: 1,
      scaleX: 1,
      scaleY: 1,
      ease: "Back.Out",
      duration: 460,
    });
  }

  /**
   * Rank final: zoom dramático + pulso infinito + faíscas.
   * Inclui fundo escuro para destacar do resto da tela.
   */
  _animRankFinal(rank, cor, corHex, x, y) {
    // Fundo escuro
    const bg = this.add.rectangle(x, y, 460, 80, 0x000000, 0).setDepth(5);

    const txt = this.add
      .text(x, y, `✦ RANK FINAL: ${rank} ✦`, {
        fontSize: "44px",
        fill: corHex,
        fontStyle: "bold",
        stroke: "#000000",
        strokeThickness: 8,
        align: "center",
        shadow: { offsetX: 0, offsetY: 0, color: corHex, blur: 20, fill: true },
      })
      .setOrigin(0.5)
      .setAlpha(0)
      .setScale(0.05)
      .setDepth(10);

    this.tweens.add({ targets: bg, fillAlpha: 0.75, duration: 400 });

    this.tweens.add({
      targets: txt,
      alpha: 1,
      scaleX: 1,
      scaleY: 1,
      ease: "Back.Out",
      duration: 860,
      onComplete: () => {
        // Pulso suave infinito
        this.tweens.add({
          targets: txt,
          scaleX: 1.06,
          scaleY: 1.06,
          alpha: 0.88,
          ease: "Sine.InOut",
          duration: 560,
          yoyo: true,
          repeat: -1,
        });
        this._emitirFaiscos(x, y, corHex);
      },
    });
  }

  /** Símbolos explodindo ao redor — simulação de partículas */
  _emitirFaiscos(cx, cy, corHex) {
    const simbolos = ["★", "✦", "•", "◆", "✶"];
    const QTD = 12;
    for (let i = 0; i < QTD; i++) {
      const ang = (i / QTD) * Math.PI * 2;
      const dist = Phaser.Math.Between(50, 120);
      const f = this.add
        .text(cx, cy, Phaser.Utils.Array.GetRandom(simbolos), {
          fontSize: `${Phaser.Math.Between(12, 22)}px`,
          fill: corHex,
          stroke: "#000000",
          strokeThickness: 2,
        })
        .setOrigin(0.5)
        .setDepth(9);

      this.tweens.add({
        targets: f,
        x: cx + Math.cos(ang) * dist,
        y: cy + Math.sin(ang) * dist,
        alpha: 0,
        scaleX: 0.1,
        scaleY: 0.1,
        ease: "Power2",
        duration: Phaser.Math.Between(600, 1100),
        delay: Phaser.Math.Between(0, 160),
        onComplete: () => f.destroy(),
      });
    }
  }

  /** Mostra os sprites dos planetas destruídos ou mensagem de nenhum */
  _mostrarPlanetas() {
    const destruidos = this.game.planetasDestruidos ?? {};

    const ids = [];
    for (let id = 1; id <= 10; id++) {
      if (destruidos[PLANET_FLAG_KEYS[id]]) ids.push(id);
    }

    if (ids.length === 0) {
      // Nenhum planeta destruído
      this._texto(
        POS.PLANETAS_X,
        POS.PLANETAS_Y + 10,
        "Nenhum planeta\nfoi destruído.",
        {
          fontSize: "13px",
          fill: "#aaffaa",
          stroke: "#000000",
          strokeThickness: 3,
          align: "center",
        },
        "fade",
      );
      return;
    }

    // Label
    const label = this.add
      .text(POS.PLANETAS_X, POS.PLANETAS_Y, "Planetas destruídos:", {
        fontSize: "13px",
        fill: "#ff8888",
        stroke: "#000000",
        strokeThickness: 3,
        align: "center",
      })
      .setOrigin(0.5)
      .setAlpha(0);
    this.tweens.add({ targets: label, alpha: 1, duration: 400 });

    // Sprites em linha, centrados em PLANETAS_X
    const tam = POS.PLANETA_TAM;
    const gap = POS.PLANETA_GAP;
    const largTotal = (ids.length - 1) * gap;
    const xStart = POS.PLANETAS_X - largTotal / 2;

    ids.forEach((id, idx) => {
      const sprite = this.add
        .image(xStart + idx * gap, POS.PLANETAS_SPRITES_Y, `bomb_${id}`)
        .setDisplaySize(tam, tam)
        .setAlpha(0);

      this.tweens.add({
        targets: sprite,
        alpha: 1,
        duration: 260,
        delay: idx * 70,
      });
    });
  }
}

// ============================================================
//  FUNÇÕES UTILITÁRIAS
// ============================================================

/** Retorna o rank da pontuação na tabela, com fallback para o mais baixo */
function calcularRank(pontos, tabela) {
  for (const faixa of tabela) {
    if (pontos >= faixa.min && pontos <= faixa.max) return faixa.rank;
  }
  return tabela[0]?.rank ?? "F";
}

/** Retorna o comentário da pontuação. Chaves no formato "min-max" */
function calcularComentario(pontos, mapa) {
  for (const faixa of Object.keys(mapa)) {
    const [min, max] = faixa.split("-").map(Number);
    if (pontos >= min && pontos <= max) return mapa[faixa];
  }
  return Object.values(mapa)[0] ?? "";
}

/**
 * Aplica efeito de entrada num objeto Phaser.
 * fade  = aparece gradualmente
 * pop   = cresce do zero com overshoot
 * slide = desliza da esquerda com fade
 */
function aplicarEfeito(scene, obj, efeito) {
  switch (efeito) {
    case "pop":
      obj.setScale(0.2);
      scene.tweens.add({
        targets: obj,
        alpha: 1,
        scaleX: 1,
        scaleY: 1,
        ease: "Back.Out",
        duration: 360,
      });
      break;
    case "slide":
      obj.setX(obj.x - 50);
      scene.tweens.add({
        targets: obj,
        x: obj.x + 50,
        alpha: 1,
        ease: "Power2",
        duration: 340,
      });
      break;
    case "fade":
    default:
      scene.tweens.add({
        targets: obj,
        alpha: 1,
        ease: "Linear",
        duration: 400,
      });
      break;
  }
}
