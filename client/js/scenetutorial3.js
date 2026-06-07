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
      .text(400, 200, "Clique em um espaço para atirar.\nEvite atirar nos planetas e revele\ntodos os espaços para vencer o jogo.\nO número em um espaço indica quantos\nplanetas estão adjacentes a ele,\nincluindo diagonais.\n clique no botão de mira para mudar\n para a função de bandeira.",
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

    // botão de pular tutorial
this.skipButton = this.add
  .sprite(
    this.cameras.main.width - 80,
    this.cameras.main.height - 105,
    "skipbutton"
  )
  .setInteractive()
  .setScrollFactor(0)
  .setScale(1);

this.skipButton.on("pointerdown", () => {
  this.scene.stop();
  this.scene.start("scene2");
});

// texto do botão
this.skipText = this.add
  .text(
    this.cameras.main.width - 80,
    this.cameras.main.height - 105,
    "Pular\nTutorial",
    {
      fontSize: "14px",
      fill: "#ffffff",
      stroke: "#000000",
      strokeThickness: 4,
    }
  )
  .setOrigin(0.5)
  .setScrollFactor(0);
  }

  update() {}
}
export default scenetutorial3;
