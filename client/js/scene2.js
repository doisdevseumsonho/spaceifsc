class scene2 extends Phaser.Scene {

  // ── Estado do modo de interação ──────────────────────────
  flagmode = false;

  constructor() {
    super("scene2");
  }

  // ============================================================
  //  Constantes estáticas
  // ============================================================
  static get SPRITES() {
    return {
      HIDDEN: "hidden_field",
      EMPTY:  "field_0",
      FLAG:   "flag_field",
      NUMBER: [
        null,       // 0 — usa EMPTY
        "field_1",
        "field_2",
        "field_3",
        "field_4",
        "field_5",
        "field_6",
        "field_7",
        "field_8",
      ],
      // bomb_1 até bomb_10 — índice = número da bomba (1-based)
      BOMB: [
        null,
        "bomb_1",
        "bomb_2",
        "bomb_3",
        "bomb_4",
        "bomb_5",
        "bomb_6",
        "bomb_7",
        "bomb_8",
        "bomb_9",
        "bomb_10",
      ],
    };
  }

  static get CFG() {
    return {
      COLS:         8,
      ROWS:         8,
      MAX_BOMBS:    10,   // total máximo de planetas
      CELL:         48,
      POINTS_PER_PLANET: 25,  // 25 pts por planeta salvo
    };
  }

  // ── Nomes dos planetas (índice 1-based, igual ao bombId) ──
  static get PLANET_NAMES() {
    return [
      null,         // índice 0 não usado
      "a Terra",
      "Marte",
      "Júpiter",
      "Saturno",
      "uma lua de Saturno",
      "A lua (da terra)",
      "A lua...?",
      "Urano",
      "O Planeta Vulcânico",
      "Vênus",
    ];
  }

  // ── Chaves de estado global para cada planeta (1-based) ──
  static get PLANET_FLAGS() {
    return [
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
  }

  // ============================================================
  //  Ciclo de vida — init / create / update
  // ============================================================
  init(data) {
    this._from = data?.from ?? "scene0";
  }

  create() {
    // ── Reseta estado da cena ────────────────────────────────
    this.flagmode   = false;
    this._done      = false;
    this._firstClick = true;   // controle do primeiro clique seguro

    // ── Garante que o objeto de estado global existe ─────────
    if (!this.game.planetasDestruidos) {
      this.game.planetasDestruidos = {};
    }

    // ── Fundo ───────────────────────────────────────────────
    this.add.image(400, 300, "backgroundtergio0");

    // ── Sprites decorativos ─────────────────────────────────
    this.inator    = this.add.sprite(100, 250, "inator").setScale(1.25);
    this.professor2 = this.add.sprite(130, 300, "professor2");

    // ── Botão de alternar modo (mira ↔ flag) ────────────────
    this.button = this.add
      .sprite(700, 350, "aimflag", 0)
      .setInteractive()
      .setScale(2)
      .on("pointerdown", () => {
        this.flagmode = !this.flagmode;

        if (this.flagmode) {
          this.button.setFrame(1);
        } else {
          this.button.setFrame(0);
        }
      });

    // ── Label de modo atual ─────────────────────────────────
    this._modeLabel = this.add
      .text(700, 390, "MIRA", {
        fontSize:   "13px",
        fill:       "#e41b1b",
        fontStyle:  "bold",
        stroke:     "#000000",
        strokeThickness: 3,
      })
      .setOrigin(0.5)
      .setScrollFactor(0);

    // ── Contador de flags disponíveis ───────────────────────
    this._flagCountLabel = this.add
      .text(700, 410, "", {
        fontSize:   "12px",
        fill:       "#ffdd00",
        stroke:     "#000000",
        strokeThickness: 3,
      })
      .setOrigin(0.5)
      .setScrollFactor(0);

    // ── Monta grade e sprites ────────────────────────────────
    const { COLS, ROWS, CELL } = scene2.CFG;
    this._ox = Math.floor((this.scale.width  - COLS * CELL) / 2);
    this._oy = Math.floor((this.scale.height - ROWS * CELL) / 2);

    this._buildGrid();
    this._buildSprites();
    this._setupInput();
    this._updateUI();
  }

  update() {
    // Atualiza label de modo a cada frame (evita dessincronias)
    if (this._modeLabel) {
      this._modeLabel.setText(this.flagmode ? "FLAG" : "MIRA");
      this._modeLabel.setStyle({ fill: this.flagmode ? "#ffdd00" : "#00ffcc" });
    }
  }

  // ============================================================
  //  Geração do grid
  // ============================================================
  _buildGrid() {
    const { COLS, ROWS, MAX_BOMBS } = scene2.CFG;
    const destruidos = this.game.planetasDestruidos;

    // Quais bombIds ainda existem (não foram destruídos)
    this._activeBombIds = [];
    for (let id = 1; id <= MAX_BOMBS; id++) {
      const flag = scene2.PLANET_FLAGS[id];
      if (!destruidos[flag]) {
        this._activeBombIds.push(id);
      }
    }

    const totalBombs = this._activeBombIds.length;
    this._totalBombs  = totalBombs;
    this._flagsLeft   = totalBombs;   // flags disponíveis = nº de bombas

    // Inicializa células
    this._grid = [];
    for (let r = 0; r < ROWS; r++) {
      this._grid[r] = [];
      for (let c = 0; c < COLS; c++) {
        this._grid[r][c] = {
          bomb:     false,
          revealed: false,
          flagged:  false,
          count:    0,
          bombId:   0,
          img:      null,
        };
      }
    }

    // Posiciona bombas aleatoriamente
    this._placeBombs(totalBombs, null);

    // Calcula contagem de vizinhos
    this._recalcCounts();
  }

  /**
   * Distribui `qty` bombas pelo tabuleiro, evitando `skipCell` {r,c}.
   * Usa os IDs de `this._activeBombIds` embaralhados.
   */
  _placeBombs(qty, skipCell) {
    const { COLS, ROWS } = scene2.CFG;

    // Limpa bombas existentes
    for (let r = 0; r < ROWS; r++)
      for (let c = 0; c < COLS; c++) {
        this._grid[r][c].bomb   = false;
        this._grid[r][c].bombId = 0;
      }

    // Embaralha IDs dos planetas ativos
    const ids = Phaser.Utils.Array.Shuffle([...this._activeBombIds]);

    let placed  = 0;
    let idIndex = 0;
    while (placed < qty && idIndex < ids.length) {
      const r = Phaser.Math.Between(0, ROWS - 1);
      const c = Phaser.Math.Between(0, COLS - 1);
      const isSkip = skipCell && skipCell.r === r && skipCell.c === c;
      if (!this._grid[r][c].bomb && !isSkip) {
        this._grid[r][c].bomb   = true;
        this._grid[r][c].bombId = ids[idIndex++];
        placed++;
      }
    }
  }

  /** Recalcula count (vizinhos com bomba) para todas as células. */
  _recalcCounts() {
    const { COLS, ROWS } = scene2.CFG;
    for (let r = 0; r < ROWS; r++)
      for (let c = 0; c < COLS; c++)
        if (!this._grid[r][c].bomb)
          this._grid[r][c].count = this._neighborBombs(r, c);
  }

  _neighborBombs(r, c) {
    let n = 0;
    for (const [dr, dc] of this._dirs()) {
      const nr = r + dr, nc = c + dc;
      if (this._ok(nr, nc) && this._grid[nr][nc].bomb) n++;
    }
    return n;
  }

  _dirs() {
    return [[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]];
  }

  _ok(r, c) {
    return r >= 0 && r < scene2.CFG.ROWS && c >= 0 && c < scene2.CFG.COLS;
  }

  // ============================================================
  //  Sprites iniciais (todos hidden)
  // ============================================================
  _buildSprites() {
    const { COLS, ROWS, CELL } = scene2.CFG;
    const S = scene2.SPRITES;

    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        const x = this._ox + c * CELL + CELL / 2;
        const y = this._oy + r * CELL + CELL / 2;

        const img = this.add
          .image(x, y, S.HIDDEN)
          .setDisplaySize(CELL, CELL)
          .setInteractive();

        img.setData("r", r);
        img.setData("c", c);

        this._grid[r][c].img = img;
      }
    }
  }

  // ============================================================
  //  Input
  // ============================================================
  _setupInput() {
    this.input.on("gameobjectdown", (_ptr, obj) => {
      if (this._done) return;

      const r = obj.getData("r");
      const c = obj.getData("c");
      if (r === undefined) return;

      if (this.flagmode) {
        this._toggleFlag(r, c);
      } else {
        this._reveal(r, c);
      }
    });
  }

  // ============================================================
  //  Modo Flag — coloca / remove bandeira
  // ============================================================
  _toggleFlag(r, c) {
    const cell = this._grid[r][c];
    if (cell.revealed) return;  // não flageia célula já revelada

    if (cell.flagged) {
      // Remove flag
      cell.flagged = false;
      this._flagsLeft++;
      this._setSprite(r, c);
    } else {
      // Coloca flag (se houver disponíveis)
      if (this._flagsLeft <= 0) return;
      cell.flagged = true;
      this._flagsLeft--;
      cell.img.setTexture(scene2.SPRITES.FLAG).setDisplaySize(scene2.CFG.CELL, scene2.CFG.CELL);
    }

    this._updateUI();
    this._checkWin();
  }

  // ============================================================
  //  Revelar célula (modo mira)
  // ============================================================
  _reveal(r, c) {
    const cell = this._grid[r][c];
    if (cell.revealed || cell.flagged) return;

    // ── Primeiro clique sempre seguro (field_0) ──────────────
    if (this._firstClick) {
      this._firstClick = false;
      this._ensureSafeFirstClick(r, c);
      // Após garantir segurança, continua normalmente
    }

    cell.revealed = true;

    if (cell.bomb) {
      this._lose(r, c);
      this.sound.play("explosion");
      return;
    }

    this._setSprite(r, c);

    // Cascata automática em células vazias
    if (cell.count === 0) {
      for (const [dr, dc] of this._dirs()) {
        const nr = r + dr, nc = c + dc;
        if (this._ok(nr, nc) && !this._grid[nr][nc].revealed) {
          this._reveal(nr, nc);
        }
      }
    }

    this._checkWin();
  }

  /**
   * Garante que a célula (r,c) seja field_0 no primeiro clique.
   * Move bombas e recalcula se necessário.
   */
  _ensureSafeFirstClick(r, c) {
    const cell = this._grid[r][c];
    if (!cell.bomb && cell.count === 0) return; // já é segura, nada a fazer

    // Redistribui as bombas excluindo a célula clicada e suas vizinhas
    // para garantir abertura de área vazia
    const safeZone = new Set();
    safeZone.add(`${r},${c}`);
    for (const [dr, dc] of this._dirs()) {
      safeZone.add(`${r+dr},${c+dc}`);
    }

    const { COLS, ROWS } = scene2.CFG;

    // Limpa bombas
    for (let rr = 0; rr < ROWS; rr++)
      for (let cc = 0; cc < COLS; cc++) {
        this._grid[rr][cc].bomb   = false;
        this._grid[rr][cc].bombId = 0;
      }

    // Reposiciona bombas fora da zona segura
    const ids = Phaser.Utils.Array.Shuffle([...this._activeBombIds]);
    let placed  = 0;
    let idIndex = 0;
    const total = this._totalBombs;

    while (placed < total) {
      const rr = Phaser.Math.Between(0, ROWS - 1);
      const cc = Phaser.Math.Between(0, COLS - 1);
      if (!this._grid[rr][cc].bomb && !safeZone.has(`${rr},${cc}`)) {
        this._grid[rr][cc].bomb   = true;
        this._grid[rr][cc].bombId = ids[idIndex++];
        placed++;
      }
    }

    this._recalcCounts();
  }

  // ============================================================
  //  Atualiza sprite visual de uma célula
  // ============================================================
  _setSprite(r, c) {
    const cell = this._grid[r][c];
    const S    = scene2.SPRITES;
    const CELL = scene2.CFG.CELL;
    let key;

    if (cell.flagged && !cell.revealed) {
      key = S.FLAG;
    } else if (!cell.revealed) {
      key = S.HIDDEN;
    } else if (cell.bomb) {
      key = S.BOMB[cell.bombId];
    } else if (cell.count === 0) {
      key = S.EMPTY;
    } else {
      key = S.NUMBER[cell.count];
    }

    cell.img.setTexture(key).setDisplaySize(CELL, CELL);
  }

  // ============================================================
  //  Atualiza UI (contador de flags, label de modo)
  // ============================================================
  _updateUI() {
    if (this._flagCountLabel) {
      this._flagCountLabel.setText(`🚩 ${this._flagsLeft}`);
    }
  }

  // ============================================================
  //  Derrota — bomba clicada
  // ============================================================
  _lose(clickedR, clickedC) {
    this._done = true;

    // Marca o planeta como destruído permanentemente
    const cell     = this._grid[clickedR][clickedC];
    const bombId   = cell.bombId;
    const flagKey  = scene2.PLANET_FLAGS[bombId];
    const planet   = scene2.PLANET_NAMES[bombId];

    if (flagKey) {
      this.game.planetasDestruidos[flagKey] = true;
    }

    // Revela todas as bombas
    for (let r = 0; r < scene2.CFG.ROWS; r++) {
      for (let c = 0; c < scene2.CFG.COLS; c++) {
        if (this._grid[r][c].bomb) {
          this._grid[r][c].revealed = true;
          this._setSprite(r, c);
        }
      }
    }

    // Verifica se todos os planetas foram destruídos
    const todosDestruidos = this._checkAllDestroyed();

    this._showResult(false, planet, todosDestruidos);
  }

  // ============================================================
  //  Vitória — condição completa:
  //  todas as bombas com flag E todas as células seguras reveladas
  // ============================================================
  _checkWin() {
    const { COLS, ROWS } = scene2.CFG;

    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        const cell = this._grid[r][c];
        if (cell.bomb && !cell.flagged)  return; // bomba sem flag
        if (!cell.bomb && !cell.revealed) return; // célula segura não revelada
      }
    }

    this._done = true;

    // Calcula planetas salvos (bombas com flag = planetas salvos)
    const salvos = this._totalBombs;
    const pontos = salvos * scene2.CFG.POINTS_PER_PLANET;

    this.game.points      = (this.game.points ?? 0) + pontos;
    this.game.tauloalive  = false;

    this._showResult(true, null, false, salvos, pontos);
  }

  /**
   * Verifica se todos os planetas (MAX_BOMBS) foram destruídos ao longo
   * das tentativas — dispara o final alternativo.
   */
  _checkAllDestroyed() {
    const destruidos = this.game.planetasDestruidos;
    for (let id = 1; id <= scene2.CFG.MAX_BOMBS; id++) {
      const flag = scene2.PLANET_FLAGS[id];
      if (!destruidos[flag]) return false;
    }
    return true;
  }

  // ============================================================
  //  Tela de resultado — vitória / derrota / final alternativo
  // ============================================================
  _showResult(won, planetName = null, allDestroyed = false, salvos = 0, pontos = 0) {
    const cx = this.scale.width  / 2;
    const cy = this.scale.height / 2;

    // ── Painel de fundo ──────────────────────────────────────
    const panelW = 320;
    const panelH = allDestroyed ? 200 : (won ? 200 : 220);
    const borderColor = allDestroyed ? 0xaaaaaa : (won ? 0x00ff88 : 0xff4444);

    this.add
      .rectangle(cx, cy, panelW, panelH, 0x000000, 0.9)
      .setStrokeStyle(3, borderColor)
      .setDepth(10);

    // ── Textos ───────────────────────────────────────────────
    const titleStyle = {
      fontSize:        "22px",
      fill:            allDestroyed ? "#aaaaaa" : (won ? "#00ff88" : "#ff4444"),
      fontStyle:       "bold",
      stroke:          "#000000",
      strokeThickness: 4,
      align:           "center",
      wordWrap:        { width: panelW - 20 },
    };

    const bodyStyle = {
      fontSize:        "16px",
      fill:            "#ffffff",
      stroke:          "#000000",
      strokeThickness: 3,
      align:           "center",
      wordWrap:        { width: panelW - 20 },
    };

    const subStyle = {
      fontSize:        "17px",
      fill:            "#ffffff",
      stroke:          "#000000",
      strokeThickness: 2,
      align:           "center",
      wordWrap:        { width: panelW - 20 },
    };

    let titleText, bodyText, subText;

    if (allDestroyed) {
      // ── Final alternativo: todos os planetas destruídos ────
      titleText = "🌑 UNIVERSO DESTRUÍDO";
      bodyText  = "Todos os planetas foram destruídos.\nO fim está próximo.\nVolte aqui para completar a luta.";
      subText   = "+0 pontos\nVoltando ao IFSC...";
    } else if (won) {
      // ── Vitória normal ────────────────────────────────────
      titleText = "🌍 PLANETAS SALVOS!";
      bodyText  = `${salvos} planeta${salvos !== 1 ? "s" : ""} salvo${salvos !== 1 ? "s" : ""}!`;
      subText   = `+${pontos} pontos\nVoltando ao IFSC...`;
    } else {
      // ── Derrota ───────────────────────────────────────────
      titleText = `💥 Você explodiu ${planetName ?? "um planeta"}!`;
      bodyText  = "Volte para a luta para tentar\nsalvar os planetas restantes.";
      subText   = "Voltando ao IFSC...";
    }

    const offsetY = allDestroyed ? -60 : -70;

    this.add
      .text(cx, cy + offsetY, titleText, titleStyle)
      .setOrigin(0.5)
      .setDepth(11);

    this.add
      .text(cx, cy, bodyText, bodyStyle)
      .setOrigin(0.5)
      .setDepth(11);

    this.add
      .text(cx, cy + 60, subText, subStyle)
      .setOrigin(0.5)
      .setDepth(11);

    // ── Retorna ao mapa após 7s ───────────────────────────────
    this.time.delayedCall(7000, () => {
      this.scene.stop("scene2");
      this.scene.start("scene0");
    });
  }
}

export default scene2;
