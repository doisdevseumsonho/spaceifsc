class scene1 extends Phaser.Scene {
  constructor() {
    super("scene1");
  }

  // ============================================================
  //  Banco de perguntas
  //  correct: índice (0-based) da resposta correta dentro de `answers`
  //  answers: sempre 4 opções, na ordem [q1, q2, q3, q4]
  // ============================================================
  static get QUESTIONS() {
    return [
      {
        text: "1: 15 + 13?",
        answers: ["25", "28", "30", "26"],
        correct: 1,
      },
      {
        text: "2: 6 - 7?",
        answers: ["13", "-1", "0", "1"],
        correct: 1,
      },
      {
        text: "3: 10 × 11?",
        answers: ["110", "111", "101", "11"],
        correct: 0,
      },
      {
        text: "4: 7 × 7?",
        answers: ["51", "14", "49", "53"],
        correct: 2,
      },
      {
        text: "5: 24 ÷ 3?",
        answers: ["8", "9", "21", "7"],
        correct: 0,
      },
      {
        text: "6: Quais os três primeiros números primos?",
        answers: ["1, 2, 3", "2, 4, 6", "2, 3, 5", "3, 5, 7"],
        correct: 2,
      },
      {
        text: "7: Qual o seno de 90°?",
        answers: ["1", "0", "-1", "-0"],
        correct: 0,
      },
      {
        text: "8: 3 - 2 × 4?",
        answers: ["5", "4", "-4", "-5"],
        correct: 3,
      },
      {
        text: "9: Um cubo tem quantas faces?",
        answers: ["Depende", "4", "5", "6"],
        correct: 3,
      },
      {
        text: "10: Se um inocente mata um assassino, quantos assassinos temos?",
        answers: ["X + 2", "X + 1", "X - 1", "X + 0"],
        correct: 3,
      },
      {
        text: "11: 2⁻³ × 2⁹ = ?",
        answers: ["2⁶", "2⁸", "2⁵", "4⁶"],
        correct: 0,
      },
      {
        text: "12: Qual o nome do professor\ncom quem você está lutando?",
        answers: ["Pedro", "Pablo", "Térgio", "Sérgio"],
        correct: 2,
      },
      {
        text: "13: 0 % 0 = ?",
        answers: ["Erro", "1", "0", "Infinito"],
        correct: 0,
      },
      {
        text: "14: 6! = ?",
        answers: ["120", "6", "36", "720"],
        correct: 3,
      },
      {
        text: "15: Como se escreve 10000000000\nem notação científica?",
        answers: ["1^10", "1 × 10⁹", "1 × 10¹⁰", "1 × 10⁸"],
        correct: 2,
      },
      {
        text: "16: Como se chama nossa espécie?",
        answers: ["Aliens", "Gincana-\nliens", "Invasores", "Amongus"],
        correct: 1,
      },
      {
        text: "17: Como se inicia um conto?",
        answers: [
          "bom dia.",
          "e do\nnada.",
          "naquele\ndia...",
          "Era uma\nvez...",
        ],
        correct: 3,
      },
      {
        text: "18: Quantas formigas existiam\nna Terra em 2022?",
        answers: [
          "20\nbilhões",
          "20\nQuatri-\nlhões",
          "20\ntrilhões",
          "20\nquinti-\nlhões",
        ],
        correct: 1,
      },
      {
        text: "19: Qual a marca da air fryer\nna sala do Toi?",
        answers: ["Oniversal", "Equipe\nRocket", "Sailo", "Indústrias\nEstarque"],
        correct: 1,
      },
      {
        text: "20: Em qual pergunta o professor\ndisse seu próprio nome?",
        answers: ["12", "19", "9", "15"],
        correct: 0,
      },
    ];
  }

  // ============================================================
  //  Posições fixas dos quatro botões de resposta
  // ============================================================
  static get BUTTON_POSITIONS() {
    return [
      { x: 320, y: 190 }, // botão 1 (índice 0)
      { x: 320, y: 340 }, // botão 2 (índice 1)
      { x: 560, y: 190 }, // botão 3 (índice 2)
      { x: 560, y: 340 }, // botão 4 (índice 3)
    ];
  }

  // ============================================================
  //  create
  // ============================================================
  create() {
    this._currentIndex = 0; // índice da pergunta atual

    // ── Fundo ─────────────────────────────────────────────────
    this.add.image(400, 300, "backgroundtergio0");
    this.add.image(410, 230, "backgroundtergio1").setScale(2.15, 2);

    // ── Personagem do jogador ─────────────────────────────────
    if (this.game.localPlayer === "pedro") {
      this.add.image(120, 400, "characterPedro");
    } else if (this.game.localPlayer === "pablo") {
      this.add.image(120, 400, "characterPablo");
    }

    this.add.image(770, 400, "professor1").setScale(-1, 1);

    // ── Botões de resposta ────────────────────────────────────
    const SCALE_X = 6;
    const SCALE_Y = 3;
    const DEBUG_ALPHA = 0.01;
    const positions = scene1.BUTTON_POSITIONS;
    const btnKeys = ["button1", "button2", "button3", "button4"];
    const selKeys = [
      "selectionButton1",
      "selectionButton2",
      "selectionButton3",
      "selectionButton4",
    ];

    this._answerTexts = []; // textos das alternativas
    this._answerButtons = []; // sprites de seleção (interativos)

    for (let i = 0; i < 4; i++) {
      const { x, y } = positions[i];

      // Sprite decorativo do botão
      this.add.sprite(x, y, btnKeys[i], 0).setScale(1.9);

      // Texto da alternativa — centralizado na posição fixa
      const txt = this.add
        .text(x, y, "", {
          fontSize: "32px",
          fontStyle: "bold",
          fill: "#fff",
        })
        .setOrigin(0.5);
      this._answerTexts.push(txt);

      // Área de toque (sprite invisível)
      const btn = this.physics.add
        .sprite(x, y, selKeys[i], 0)
        .setInteractive()
        .setScale(SCALE_X, SCALE_Y)
        .setAlpha(DEBUG_ALPHA);

      const answerIndex = i;
      btn.on("pointerdown", () => this._selectAnswer(answerIndex));

      this._answerButtons.push(btn);
    }

    // ── Texto da pergunta ─────────────────────────────────────
    this._questionText = this.add.text(110, 60, "", {
      fontSize: "34px",
      fontStyle: "bold",
      fill: "#fff",
      stroke: "#000",
      strokeThickness: 6,
      wordWrap: { width: 680 },
    });

    // ── Pontuação ─────────────────────────────────────────────
    this._pointsText = this.add
      .text(300, 30, "Pontuação: " + (this.game.tergiopoints ?? 0), {
        fontSize: "32px",
        fontStyle: "bold",
        fill: "#fff",
        stroke: "#000",
        strokeThickness: 4,
      })
      .setScrollFactor(0);

    // ── Carrega a primeira pergunta ───────────────────────────
    this._loadQuestion(0);
  }

  // ============================================================
  //  Carrega e exibe a pergunta do índice fornecido
  // ============================================================
  _loadQuestion(index) {
    const q = scene1.QUESTIONS[index];
    const positions = scene1.BUTTON_POSITIONS;

    // Atualiza texto da pergunta
    this._questionText.setText(q.text);

    // Atualiza cada alternativa e restaura posição fixa
    for (let i = 0; i < 4; i++) {
      const { x, y } = positions[i];
      this._answerTexts[i]
        .setText(q.answers[i])
        .setPosition(x, y) // restaura posição padrão a cada pergunta
        .setOrigin(0.5);
    }

    this._currentIndex = index;
  }

  // ============================================================
  //  Processa a seleção de uma resposta
  //  answerIndex: 0-3 (qual botão foi pressionado)
  // ============================================================
  _selectAnswer(answerIndex) {
    const q = scene1.QUESTIONS[this._currentIndex];
    const correct = answerIndex === q.correct;

    // Soma pontos se acertou
    if (correct) {
      this.game.tergiopoints = (this.game.tergiopoints ?? 0) + 5;
      this._pointsText.setText("Pontuação: " + this.game.tergiopoints);
      this.sound.play("correct_question");
    } else {
      this.sound.play("wrong_question");
    }

    const nextIndex = this._currentIndex + 1;

    // Última pergunta respondida — encerra a fase
    if (nextIndex >= scene1.QUESTIONS.length) {
      this._endScene();
      return;
    }

    // Avança para a próxima pergunta
    this._loadQuestion(nextIndex);
  }

  // ============================================================
  //  Encerra a fase e vai para endscene1
  // ============================================================
  _endScene() {
    this.game.tergioalive = false;
    this.scene.stop("scene1");
    this.scene.start("endscene1");
  }

  // ============================================================
  update() {}
}

export default scene1;
