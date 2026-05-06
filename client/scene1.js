class scene1 extends Phaser.Scene {
  questionNumberText = "1. ";
  question = "15 + 13:";
  questionNumber = 1;

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
    this.load.image("selectionButton1", "assets/quiz/selection_box_question.png");
    this.load.spritesheet("button1", "assets/quiz/questionbox.png", {
      frameWidth: 192,
      frameHeight: 192,
    });
    this.load.image("selectionButton2", "assets/quiz/selection_box_question.png");
    this.load.spritesheet("button2", "assets/quiz/questionbox.png", {
      frameWidth: 192,
      frameHeight: 192,
    });
    this.load.image("selectionButton3", "assets/quiz/selection_box_question.png");
    this.load.spritesheet("button3", "assets/quiz/questionbox.png", {
      frameWidth: 192,
      frameHeight: 192,
    });
    this.load.image("selectionButton4", "assets/quiz/selection_box_question.png");
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
    const selectionButtonScaleX = 6; // escala horizontal da seleção
    const selectionButtonScaleY = 3; // escala vertical da seleção
    
    this.selectionButton1 = this.physics.add
      .sprite(320, 340, "selectionButton1", 0)
      .setInteractive()
      .setScale(selectionButtonScaleX, selectionButtonScaleY)
      .on("pointerdown", () => {
        if (this.questionNumber === 1) {
          this.correctAnswer1();
        }
      });
    this.add
      .sprite(320, 340, "button1", 0)
      .setScale(1)
      .setInteractive()
      .on("pointerdown", () => {
        // Ação a ser executada quando o botão for clicado
      });
    
    this.selectionButton2 = this.physics.add
      .sprite(560, 340, "selectionButton2", 0)
      .setInteractive()
      .setScale(selectionButtonScaleX, selectionButtonScaleY)
      .on("pointerdown", () => {
        // Ação a ser executada quando o botão for clicado
      });
    this.add
      .sprite(560, 340, "button2", 0)
      .setScale(1)
      .setInteractive()
      .on("pointerdown", () => {
      });
    
    this.selectionButton3 = this.physics.add
      .sprite(320, 190, "selectionButton3", 0)
      .setInteractive()
      .setScale(selectionButtonScaleX, selectionButtonScaleY)
      .on("pointerdown", () => {
        // Ação a ser executada quando o botão for clicado
      });
    this.add
      .sprite(320, 190, "button3", 0)
      .setScale(1)
      .setInteractive()
      .on("pointerdown", () => {
      });
    
    this.selectionButton4 = this.physics.add
      .sprite(560, 190, "selectionButton4", 0)
      .setInteractive()
      .setScale(selectionButtonScaleX, selectionButtonScaleY)
      .on("pointerdown", () => {
        // Ação a ser executada quando o botão for clicado
      });
    this.add
      .sprite(560, 190, "button4", 0)
      .setScale(1)
      .setInteractive()
      .on("pointerdown", () => {
      });

    //textos
    this.questionText = this.add
      .text(180, 30, this.questionNumberText + this.question, {
        fontSize: "32px",
        fill: "#fff",
      });
  }

  correctAnswer1() {
    this.questionNumberText = "2. ";
    this.question = "6 - 7:";
    this.questionNumber = 2;
    this.questionText.setText(this.questionNumberText + this.question);
  }

  // Lógica de atualização da cena
  

  update() {
  }
}
export default scene1;
