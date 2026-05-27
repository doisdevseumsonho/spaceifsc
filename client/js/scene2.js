class scene2 extends Phaser.Scene {
  flagmode = false;

  constructor() {
    super("scene2");
  }

  static get SPRITES() {
    return {
      HIDDEN: "hidden_field",
      EMPTY: "field_0",
      FLAG: "flag_field",
      NUMBER: [
        null, // 0 — usa EMPTY
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
      COLS: 8,
      ROWS: 8,
      BOMBS: 10,
      CELL: 32,
      POINTS_WIN: 100,
    };
  }

  init(data) {
    this._from = data?.from ?? "scene0";
  }

  create() {
    this.flagmode = false;

    this.button = this.add //cria o botão de interação
      .sprite(700, 350, "interact_buttom", 1)
      .setInteractive()
      .setScale(2)
      .on("pointerdown", () => {
        //diz o que ele faz
        this.button.setFrame(1);
        if (this.flagmode === false) {
          this.flagmode = true;
        } else {
          this.flagmode = false;
        }
      })
      .on("pointerup", () => {
        this.button.setFrame(2);
      })
      .setScrollFactor(0);

    this._done = false;

    const { COLS, ROWS, CELL } = scene2.CFG;

    // Centraliza o tabuleiro na tela
    this._ox = Math.floor((this.scale.width - COLS * CELL) / 2);
    this._oy = Math.floor((this.scale.height - ROWS * CELL) / 2);

    this._buildGrid();
    this._buildSprites();
    this._setupInput();
  }

  // ============================================================
  //  Geração procedural
  // ============================================================
  _buildGrid() {
    const { COLS, ROWS, BOMBS } = scene2.CFG;

    // Inicializa células
    this._grid = [];
    for (let r = 0; r < ROWS; r++) {
      this._grid[r] = [];
      for (let c = 0; c < COLS; c++) {
        this._grid[r][c] = {
          bomb: false,
          revealed: false,
          count: 0,
          bombId: 0, // qual sprite de bomba (1-10)
          img: null,
        };
      }
    }

    // Sorteia posições das bombas
    let placed = 0;
    let bombId = 1;
    while (placed < BOMBS) {
      const r = Phaser.Math.Between(0, ROWS - 1);
      const c = Phaser.Math.Between(0, COLS - 1);
      if (!this._grid[r][c].bomb) {
        this._grid[r][c].bomb = true;
        this._grid[r][c].bombId = bombId++;
        placed++;
      }
    }

    // Calcula vizinhos
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        if (!this._grid[r][c].bomb) {
          this._grid[r][c].count = this._neighborBombs(r, c);
        }
      }
    }
  }

  _neighborBombs(r, c) {
    let n = 0;
    for (const [dr, dc] of this._dirs()) {
      const nr = r + dr,
        nc = c + dc;
      if (this._ok(nr, nc) && this._grid[nr][nc].bomb) n++;
    }
    return n;
  }

  _dirs() {
    return [
      [-1, -1],
      [-1, 0],
      [-1, 1],
      [0, -1],
      [0, 1],
      [1, -1],
      [1, 0],
      [1, 1],
    ];
  }

  _ok(r, c) {
    return r >= 0 && r < scene2.CFG.ROWS && c >= 0 && c < scene2.CFG.COLS;
  }

  // ============================================================
  //  Desenha os sprites iniciais (todos hidden)
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
  //  Input — apenas pointerdown (mobile)
  // ============================================================
  _setupInput() {
    this.input.on("gameobjectdown", (_ptr, obj) => {
      if (this._done) return;

      const r = obj.getData("r");
      const c = obj.getData("c");
      if (r === undefined) return;

      this._reveal(r, c);
    });
  }

  // ============================================================
  //  Revelar célula
  // ============================================================
  _reveal(r, c) {
    const cell = this._grid[r][c];
    if (cell.revealed) return;

    cell.revealed = true;

    if (cell.bomb) {
      this._lose(r, c);
      return;
    }

    this._setSprite(r, c);

    // Cascata
    if (cell.count === 0) {
      for (const [dr, dc] of this._dirs()) {
        const nr = r + dr,
          nc = c + dc;
        if (this._ok(nr, nc) && !this._grid[nr][nc].revealed) {
          this._reveal(nr, nc);
        }
      }
    }

    this._checkWin();
  }

  // ============================================================
  //  Atualiza sprite da célula conforme estado
  // ============================================================
  _setSprite(r, c) {
    const cell = this._grid[r][c];
    const S = scene2.SPRITES;
    const CELL = scene2.CFG.CELL;
    let key;

    if (!cell.revealed) {
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
  //  Derrota
  // ============================================================
  _lose(clickedR, clickedC) {
    this._done = true;

    // Revela todas as bombas
    for (let r = 0; r < scene2.CFG.ROWS; r++) {
      for (let c = 0; c < scene2.CFG.COLS; c++) {
        if (this._grid[r][c].bomb) {
          this._grid[r][c].revealed = true;
          this._setSprite(r, c);
        }
      }
    }

    this._showResult(false);
  }

  // ============================================================
  //  Vitória
  // ============================================================
  _checkWin() {
    const { COLS, ROWS } = scene2.CFG;
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        const cell = this._grid[r][c];
        if (!cell.bomb && !cell.revealed) return;
      }
    }
    this._done = true;
    this._showResult(true);
  }

  // ============================================================
  //  Resultado — igual ao padrão da scene0
  // ============================================================
  _showResult(won) {
    const cx = this.scale.width / 2;
    const cy = this.scale.height / 2;

    if (won) {
      this.game.points += scene2.CFG.POINTS_WIN;
    }

    // Painel de resultado
    this.add
      .rectangle(cx, cy, 260, 120, 0x000000, 0.85)
      .setStrokeStyle(2, won ? 0x00ff88 : 0xff4444);

    this.add
      .text(cx, cy - 20, won ? "🌍 PLANETAS SALVOS!" : "💥 MISSÃO FALHOU!", {
        fontSize: "18px",
        fill: won ? "#00ff88" : "#ff4444",
      })
      .setOrigin(0.5);

    this.add
      .text(
        cx,
        cy + 10,
        won ? `+${scene2.CFG.POINTS_WIN} pontos` : "Tente novamente...",
        { fontSize: "14px", fill: "#ffffff" },
      )
      .setOrigin(0.5);

    this.add
      .text(cx, cy + 36, "Voltando ao mapa...", {
        fontSize: "11px",
        fill: "#aaaaaa",
      })
      .setOrigin(0.5);

    // Retorna para a cena anterior após 2.5s — mesmo padrão da scene0
    this.time.delayedCall(2500, () => {
      this.game.tauloalive = false;
      this.scene.stop("scene2");
      this.scene.start(this._from);
    });
  }

  // ============================================================
  update() {}
}

export default scene2;