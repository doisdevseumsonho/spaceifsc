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
    
    this.add.text(225, 30, " Parabéns!\nVocê ganhou:", {
      fontSize: "52px",
      fontStyle: "bold",
      fill: "#fff",
    });
    this.add.text(460, 200, this.game.tergiopoints, {
      fontSize: "80px",
      fill: "#fff",
    });
    this.add.text(430, 260, "Pontos", {
      fontSize: "40px",
      fill: "#fff",
    });

    this.time.delayedCall(5000, () => {
      this.scene.stop("endscene1");
      this.scene.start("scene0");
    });
  }

  update() {}
}
export default endscene1;
