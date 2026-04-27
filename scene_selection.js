class sceneSelection extends Phaser.Scene {
  constructor() {
    super("sceneSelection");
  }

  preload() {
    this.load.image("image_pedro", "assets/characterbase_pedro.png");
    this.load.image("image_pablo", "assets/characterbase_pablo.png");
    this.load.spritesheet("selection_box_pedro", "assets/selection_box_pedro.png", {
      frameWidth: 100,
      frameHeight: 50
    });
    this.load.spritesheet("selection_box_pablo", "assets/selection_box_pablo.png", {
      frameWidth: 100,
      frameHeight: 50
    });

  }

  create() {}

  update() {}
}
export default sceneSelection;
