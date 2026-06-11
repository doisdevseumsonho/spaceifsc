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
    
    this.add.text(225, 25, " Parabéns!\nVocê ganhou:", {
      fontSize: "52px",
      fontStyle: "bold",
      fill: "#fff",
      stroke: "#000",
      strokeThickness: 6,
    });
    this.add.text(420, 200, this.game.tergiopoints, {
      fontSize: "80px",
      fill: "#fff",
      stroke: "#000",
      strokeThickness: 6,
    });
    this.add.text(410, 260, "Pontos", {
      fontSize: "40px",
      fill: "#fff",
      stroke: "#000",
      strokeThickness: 6,
    });

    this.time.delayedCall(5000, () => {
      this.scene.stop("endscene1");
      this.scene.start("scene0");
    });
  }

  update() {}
}
export default endscene1;
