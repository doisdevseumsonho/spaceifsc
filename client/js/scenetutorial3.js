class scenetutorial3 extends Phaser.Scene {
  constructor() {
    super("scenetutorial3");
  }

  create() {
    this.add.image(400, 300, "backgroundtergio0");
    this.add.image(410, 230, "backgroundtergio1").setScale(2.15, 2);
    this.add
      .text(400, 100, "Campo Minado:", {
        fontSize: "32px",
        fill: "#000000",
      })
      .setOrigin(0.5);

    this.add
      .text(400, 200, "Clique em um espaço para atirar ali.\nEvite atirar nos planetas e revele\ntodos os espaços para vencer o jogo.\nO número em um espaço indica quantos\nplanetas estão adjacentes a ele,\nincluindo diagonais.",
        {
          fontSize: "24px",
          fill: "#000000",
          align: "center",
          wordWrap: { width: 700 },
        },
      )
      .setOrigin(0.5);

      this.add.image(400, 350, "professor2").setScale(2);

    this.time.delayedCall(12000, () => {
      this.scene.start("scene2");
    });
  }

  update() {}
}
export default scenetutorial3;
