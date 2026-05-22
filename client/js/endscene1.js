class endscene1 extends Phaser.Scene {

  constructor() {
    super("endscene1");
  }

  create() {
    //Fundo
    const backgroundScaleX = 1; // escala horizontal da fundo
    const backgroundScaleY = 1; // escala vertical da fundo
    this.add
      .image(390, 230, "backgroundtergio2")
      .setScale(backgroundScaleX, backgroundScaleY);
  }

  update() {}
}
export default endscene1;
