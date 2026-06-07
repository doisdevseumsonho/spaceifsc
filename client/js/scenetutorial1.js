class scenetutorial1 extends Phaser.Scene {
  constructor() {
    super("scenetutorial1");
  }

  create() {
    this.add.image(400, 300, "backgroundtergio0");
    this.add.image(410, 230, "backgroundtergio1")
      .setScale(2.15, 2);
    this.add.text(400, 100, "Interação:", {
      fontSize: "32px",
      fill: "#000000",
    })
      .setOrigin(0.5);

    this.add.text(400, 200, "Para interagir com personagens e\nalguns objetos, basta se aproximar\ne apertar o botão de interação.", {
      fontSize: "24px",
      fill: "#000000",
      align: "center",
      wordWrap: { width: 700 },
    }).setOrigin(0.5);

    this.add.text(400, 250, "'   '", {
      fontSize: "24px",
      fill: "#000000",
      align: "center",
      wordWrap: { width: 700 },
    }).setOrigin(0.5);

    this.add.image(400, 250, "interact_buttom").setScale(1);
    this.time.delayedCall(10000, () => {
      this.scene.start("scene0");
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
  this.scene.start("scene0");
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
export default scenetutorial1;
