class start extends Phaser.Scene {
  constructor() {
    super("start");
  }

  init() {
    let room = new URLSearchParams(location.search).get("room");
    if (room) this.game = room;
  }

  preload() {
    this.load.image("backgroundmenu", "assets/title.png");
    
    this.load.spritesheet("playbutton", "assets/selection_box_title.png", {
      frameWidth: 100,
      frameHeight: 50
    });
  }

  create() {
    this.add.image(400, 300, "backgroundmenu");
    
    const playbuttonScaleX = 8; // escala horizontal da seleção
    const playbuttonScaleY = 3; // escala vertical da seleção
    const debugplaybuttonVisible = true;
    this.playbutton = this.add //cria o botão de interação
      .sprite(415, 370, "playbutton", 1)
      .setInteractive()
      .setScale(playbuttonScaleX, playbuttonScaleY)
      .setVisible(debugplaybuttonVisible)
      .setAlpha(debugplaybuttonVisible ? 0.01 : 0) // meio transparente para facilitar o debug
      .on("pointerdown", () => {
        this.scene.stop("start");
        this.scene.start("preloader");
      })
      .on("pointerup", () => {
      })
  }

  update() {}
}
export default start;
