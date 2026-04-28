class sceneSelection extends Phaser.Scene {
  constructor() {
    super("sceneSelection");
  }

  preload() {
    this.load.spritesheet("imagem_pedro", "assets/characters/characterbase_pedro.png", {
      frameWidth: 32,
      frameHeight: 64,
    });
    this.load.spritesheet("imagem_pablo", "assets/characters/characterbase_pablo.png", {
      frameWidth: 32,
      frameHeight: 64
    });
    this.load.spritesheet("selection_box_pedro", "assets/selection_box_pedro.png", {
      frameWidth: 32,
      frameHeight: 64
    });
    this.load.spritesheet("selection_box_pablo", "assets/selection_box_pablo.png", {
      frameWidth: 32,
      frameHeight: 64
    });

  }

  create() {
    this.imagemPedro = this.physics.add
      .sprite(600, 250, "imagem_pedro", 5)
      .setScale(4);
    this.imagemPablo = this.physics.add
      .sprite(200, 250, "imagem_pablo", 0)
      .setScale(4);

    const playbuttonpabloScaleX = 4; // escala horizontal da seleção
    const playbuttonpedroScaleY = 8; // escala vertical da seleção
    const debugplaybuttonVisible = true;
    this.playbutton = this.add //cria o botão de interação
      .sprite(600, 250, "playbutton", 1)
      .setInteractive()
      .setScale(playbuttonpabloScaleX, playbuttonpabloScaleY)
      .setVisible(debugplaybuttonVisible)
      .setAlpha(debugplaybuttonVisible ? 0.01 : 0) // meio transparente para facilitar o debug
      .on("pointerdown", () => {
        this.scene.stop("sceneTitle");
        this.scene.start("sceneSelection");
      })
      .on("pointerup", () => {
      })
  }

  update() {}
}
export default sceneSelection;
