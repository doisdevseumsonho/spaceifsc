class scene1 extends Phaser.Scene {

  constructor() {
    super("scene1");

  }

  preload() {
    this.load.spritesheet("background1", "assets/tergio_text_box.png", {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.image("character1", "assets/character1.png");
    this.load.image("professor1", "assets/Tergio.png");
  }

  create() {
    this.add.image(400, 300, "background1");
    this.add.image(200, 300, "character1");
    this.add.image(600, 300, "professor1");
  }

  update() {
  }
}
export default scene1;
