class scene1 extends Phaser.Scene {

  constructor() {
    super("scene1");

  }

  preload() {
    this.load.spritesheet("background1", "assets/characters/tergio_text_box.png", {
      frameWidth: 320,
      frameHeight: 230,
    });
    this.load.image("character1", "assets/characters/character1.png");
    this.load.spritesheet("professor1", "assets/characters/Tergio.png", {
      frameWidth: 32,
      frameHeight: 64,
    });
  }

  create() {
    const backgroundScaleX = 2.55; // escala horizontal da fundo
    const backgroundScaleY = 2; // escala vertical da fundo
    this.add.image(390, 230, "background1").
      setScale(backgroundScaleX, backgroundScaleY);
    this.add.image(120, 400, "character1");
    this.add.image(770, 400, "professor1").setScale(-1, 1);

  }

  update() {
  }
}
export default scene1;
