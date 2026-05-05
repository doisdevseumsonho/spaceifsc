class scene1 extends Phaser.Scene {

  constructor() {
    super("scene1");

  }

  preload() {
    //Fundo
    this.load.spritesheet("background1", "assets/quiz/tergio_text_box.png", {
      frameWidth: 320,
      frameHeight: 230,
    });
    this.load.image("character1", "assets/characters/character1.png");
    this.load.spritesheet("professor1", "assets/characters/Tergio.png", {
      frameWidth: 32,
      frameHeight: 64,
    });

    //Interagíveis
    this.load.spritesheet("button1", "assets/quiz/questionbox.png", {
      frameWidth: 192,
      frameHeight: 192,
    });
    this.load.spritesheet("button2", "assets/quiz/questionbox.png", {
      frameWidth: 192,
      frameHeight: 192,
    });
    this.load.spritesheet("button3", "assets/quiz/questionbox.png", {
      frameWidth: 192,
      frameHeight: 192,
    });
    this.load.spritesheet("button4", "assets/quiz/questionbox.png", {
      frameWidth: 192,
      frameHeight: 192,
    });

  }

  create() {
    //Fundo
    const backgroundScaleX = 2.55; // escala horizontal da fundo
    const backgroundScaleY = 2; // escala vertical da fundo
    this.add.image(390, 230, "background1").
      setScale(backgroundScaleX, backgroundScaleY);
    this.add.image(120, 400, "character1");
    this.add.image(770, 400, "professor1").setScale(-1, 1);

    //Interagíveis
    this.add
      .sprite(320, 340, "button1", 0)
      .setScale(1)
      .setInteractive()
      .on("pointerdown", () => {
        // Ação a ser executada quando o botão for clicado
      });
    this.add
      .sprite(560, 340, "button2", 0)
      .setScale(1)
      .setInteractive()
      .on("pointerdown", () => {
      });
    this.add
      .sprite(320, 190, "button3", 0)
      .setScale(1)
      .setInteractive()
      .on("pointerdown", () => {
      });
    this.add
      .sprite(560, 190, "button4", 0)
      .setScale(1)
      .setInteractive()
      .on("pointerdown", () => {
      });


  }

  update() {
  }
}
export default scene1;
