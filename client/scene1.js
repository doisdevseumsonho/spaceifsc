class scene1 extends Phaser.Scene {
  questionNumberText = "1: ";
  question = "15 + 13?";
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
    this.load.image(
      "selectionButton1",
      "assets/quiz/selection_box_question.png",
    );
    this.load.spritesheet("button1", "assets/quiz/questionbox.png", {
      frameWidth: 192,
      frameHeight: 192,
    });
    this.load.image(
      "selectionButton2",
      "assets/quiz/selection_box_question.png",
    );
    this.load.spritesheet("button2", "assets/quiz/questionbox.png", {
      frameWidth: 192,
      frameHeight: 192,
    });
    this.load.image(
      "selectionButton3",
      "assets/quiz/selection_box_question.png",
    );
    this.load.spritesheet("button3", "assets/quiz/questionbox.png", {
      frameWidth: 192,
      frameHeight: 192,
    });
    this.load.image(
      "selectionButton4",
      "assets/quiz/selection_box_question.png",
    );
    this.load.spritesheet("button4", "assets/quiz/questionbox.png", {
      frameWidth: 192,
      frameHeight: 192,
    });
  }

  create() {
    //Fundo
    const backgroundScaleX = 2.55; // escala horizontal da fundo
    const backgroundScaleY = 2; // escala vertical da fundo
    this.add
      .image(390, 230, "background1")
      .setScale(backgroundScaleX, backgroundScaleY);
    this.add.image(120, 400, "character1");
    this.add.image(770, 400, "professor1").setScale(-1, 1);

    //Interagíveis
    const selectionButtonScaleX = 6; // escala horizontal da seleção
    const selectionButtonScaleY = 3; // escala vertical da seleção
    const debugplaybuttonVisible = true;

    this.add.sprite(320, 190, "button1", 0).setScale(1);
    this.questionText1 = this.add.text(320, 190, "25", {
      fontSize: "32px",
      fill: "#fff",
    });
    this.selectionButton1 = this.physics.add
      .sprite(320, 190, "selectionButton1", 0)
      .setInteractive()
      .setScale(selectionButtonScaleX, selectionButtonScaleY)
      .setAlpha(debugplaybuttonVisible ? 0.01 : 0) // meio transparente para facilitar o debug
      .on("pointerdown", () => {
        if (this.questionNumber === 1) {
          this.wrongAnswer1();
        } // Ação a ser executada quando o botão for clicado
      });

    this.add.sprite(560, 190, "button2", 0).setScale(1).setInteractive();
    this.questionText2 = this.add.text(560, 190, "30", {
      fontSize: "32px",
      fill: "#fff",
    });
    this.selectionButton2 = this.physics.add
      .sprite(560, 190, "selectionButton2", 0)
      .setInteractive()
      .setScale(selectionButtonScaleX, selectionButtonScaleY)
      .setAlpha(debugplaybuttonVisible ? 0.01 : 0) // meio transparente para facilitar o debug
      .on("pointerdown", () => {
        if (this.questionNumber === 1) {
          this.wrongAnswer1();
        } // Ação a ser executada quando o botão for clicado
      });

    this.add.sprite(320, 340, "button3", 0).setScale(1);
    this.questionText3 = this.add.text(320, 340, "28", {
      fontSize: "32px",
      fill: "#fff",
    });
    this.selectionButton3 = this.physics.add
      .sprite(320, 340, "selectionButton3", 0)
      .setInteractive()
      .setScale(selectionButtonScaleX, selectionButtonScaleY)
      .setAlpha(debugplaybuttonVisible ? 0.01 : 0) // meio transparente para facilitar o debug
      .on("pointerdown", () => {
        if (this.questionNumber === 1) {
          this.correctAnswer1();
        }
      });

    this.add.sprite(560, 340, "button4", 0).setScale(1);
    this.questionText4 = this.add.text(560, 340, "26", {
      fontSize: "32px",
      fill: "#fff",
    });
    this.selectionButton4 = this.physics.add
      .sprite(560, 340, "selectionButton4", 0)
      .setInteractive()
      .setScale(selectionButtonScaleX, selectionButtonScaleY)
      .setAlpha(debugplaybuttonVisible ? 0.01 : 0) // meio transparente para facilitar o debug
      .on("pointerdown", () => {
        if (this.questionNumber === 1) {
          this.wrongAnswer1();
        } // Ação a ser executada quando o botão for clicado
      });

    //textos
    this.questionText = this.add.text(180, 30, this.questionNumberText + this.question, {
        fontSize: "32px",
        fill: "#fff",
      });

    this.pointsText = this.add
      .text(560, 30, "Pontuação:" + this.game.points, {
        fontSize: "32px",
        fill: "#fff",
      })
      .setScrollFactor(0);
  }

  // Lógica de atualização da cena
  correctAnswer1() {
    this.questionNumberText = "2: ";
    this.question = "6 - 7?";
    this.questionNumber = 2;
    this.questionText.setText(this.questionNumberText + this.question);
    this.game.points = this.game.points + 10;
    this.pointsText.setText("Pontuação:" + this.game.points);
    this.questionText1.setText("13");
    this.questionText2.setText("-1");
    this.questionText3.setText("0");
    this.questionText4.setText("1");
  }
  wrongAnswer1() {
    this.questionNumberText = "2: ";
    this.question = "6 - 7?";
    this.questionNumber = 2;
    this.questionText.setText(this.questionNumberText + this.question);
    this.pointsText.setText("Pontuação:" + this.game.points);
    this.questionText1.setText("13");
    this.questionText2.setText("-1");
    this.questionText3.setText("0");
    this.questionText4.setText("1");
  }

  correctAnswer2() {
    this.questionNumberText = "3: ";
    this.question = "10 x 11?";
    this.questionNumber = 3;
    this.questionText.setText(this.questionNumberText + this.question);
    this.game.points = this.game.points + 10;
    this.pointsText.setText("Pontuação:" + this.game.points);
  }
  wrongAnswer2() {
    this.questionNumberText = "3: ";
    this.question = "10 x 11?";
    this.questionNumber = 3;
    this.questionText.setText(this.questionNumberText + this.question);
    this.pointsText.setText("Pontuação:" + this.game.points);
  }



  update() {}
}
export default scene1;
