class endscene1 extends Phaser.Scene {

  constructor() {
    super("endscene1");
  }

  create() {
    //Fundo
    this.add
      .image(390, 230, "backgroundtergio0");
    this.add.image(400, 230, "tergiosleep")
      .setScale(1.8);
    
    this.add.text(200, 60, "Parabéns! Você ganhou:", {
      fontSize: "30px",
      fill: "#fff",
    });
    this.add.text(460, 200, this.game.points, {
      fontSize: "80px",
      fill: "#fff",
    });
    this.add.text(430, 260, "Pontos", {
      fontSize: "40px",
      fill: "#fff",
    });
  }

  update() {}
}
export default endscene1;
