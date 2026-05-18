class scene1 extends Phaser.Scene {
  questionNumberText = "1: ";
  question = "15 + 13?";
  questionNumber = 1;

  constructor() {
    super("scene1");
  }

  create() {
    //Fundo
    const backgroundScaleX = 2.55; // escala horizontal da fundo
    const backgroundScaleY = 2; // escala vertical da fundo
    this.add
      .image(390, 230, "background1")
      .setScale(backgroundScaleX, backgroundScaleY);
    this.add.image(120, 400, "character");
    this.add.image(770, 400, "professorTergio").setScale(-1, 1);

    //Interagíveis
    const selectionButtonScaleX = 6; // escala horizontal da seleção
    const selectionButtonScaleY = 3; // escala vertical da seleção
    const debugplaybuttonVisible = true;

    //botão 1
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
        } else if (this.questionNumber === 2) {
          this.wrongAnswer2();
        } else if (this.questionNumber === 3) {
          this.correctAnswer3();
        } else if (this.questionNumber === 4) {
          this.wrongAnswer4();
        } else if (this.questionNumber === 5) {
          this.correctAnswer5();
        } else if (this.questionNumber === 6) {
          this.wrongAnswer6();
        } else if (this.questionNumber === 7) {
          this.correctAnswer7();
        } else if (this.questionNumber === 8) {
          this.wrongAnswer8();
        } else if (this.questionNumber === 9) {
          this.correctAnswer9();
        } else if (this.questionNumber === 10) {
          this.wrongAnswer10();
        } else if (this.questionNumber === 11) {
          this.correctAnswer11();
        } else if (this.questionNumber === 12) {
          this.wrongAnswer12();
        } else if (this.questionNumber === 13) {
          this.correctAnswer13();
        } else if (this.questionNumber === 14) {
          this.correctAnswer14();
        } else if (this.questionNumber === 15) {
          this.wrongAnswer15();
        }
      });

    //botão 2
    this.add.sprite(560, 190, "button3", 0).setScale(1).setInteractive();
    this.questionText3 = this.add.text(560, 190, "30", {
      fontSize: "32px",
      fill: "#fff",
    });
    this.selectionButton3 = this.physics.add
      .sprite(560, 190, "selectionButton3", 0)
      .setInteractive()
      .setScale(selectionButtonScaleX, selectionButtonScaleY)
      .setAlpha(debugplaybuttonVisible ? 0.01 : 0) // meio transparente para facilitar o debug
      .on("pointerdown", () => {
        if (this.questionNumber === 1) {
          this.wrongAnswer1();
        } else if (this.questionNumber === 2) {
          this.wrongAnswer2();
        } else if (this.questionNumber === 3) {
          this.wrongAnswer3();
        } else if (this.questionNumber === 4) {
          this.wrongAnswer4();
        } else if (this.questionNumber === 5) {
          this.wrongAnswer5();
        } else if (this.questionNumber === 6) {
          this.correctAnswer6();
        } else if (this.questionNumber === 7) {
          this.wrongAnswer7();
        } else if (this.questionNumber === 8) {
          this.wrongAnswer8();
        } else if (this.questionNumber === 9) {
          this.wrongAnswer9();
        } else if (this.questionNumber === 10) {
          this.wrongAnswer10();
        } else if (this.questionNumber === 11) {
          this.wrongAnswer11();
        } else if (this.questionNumber === 12) {
          this.correctAnswer12();
        } else if (this.questionNumber === 13) {
          this.wrongAnswer13();
        } else if (this.questionNumber === 14) {
          this.wrongAnswer14();
        } else if (this.questionNumber === 15) {
          this.wrongAnswer15();
        }
      });

    //botão 2
    this.add.sprite(320, 340, "button2", 0).setScale(1);
    this.questionText2 = this.add.text(320, 340, "28", {
      fontSize: "32px",
      fill: "#fff",
    });
    this.selectionButton2 = this.physics.add
      .sprite(320, 340, "selectionButton2", 0)
      .setInteractive()
      .setScale(selectionButtonScaleX, selectionButtonScaleY)
      .setAlpha(debugplaybuttonVisible ? 0.01 : 0) // meio transparente para facilitar o debug
      .on("pointerdown", () => {
        if (this.questionNumber === 1) {
          this.correctAnswer1();
        } else if (this.questionNumber === 2) {
          this.correctAnswer2();
        } else if (this.questionNumber === 3) {
          this.wrongAnswer3();
        } else if (this.questionNumber === 4) {
          this.correctAnswer4();
        } else if (this.questionNumber === 5) {
          this.wrongAnswer5();
        } else if (this.questionNumber === 6) {
          this.wrongAnswer6();
        } else if (this.questionNumber === 7) {
          this.wrongAnswer7();
        } else if (this.questionNumber === 8) {
          this.wrongAnswer8();
        } else if (this.questionNumber === 9) {
          this.wrongAnswer9();
        } else if (this.questionNumber === 10) {
          this.wrongAnswer10();
        } else if (this.questionNumber === 11) {
          this.wrongAnswer11();
        } else if (this.questionNumber === 12) {
          this.wrongAnswer12();
        } else if (this.questionNumber === 13) {
          this.wrongAnswer13();
        } else if (this.questionNumber === 14) {
          this.wrongAnswer14();
        } else if (this.questionNumber === 15) {
          this.wrongAnswer15();
        }
      });

    //botão 4
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
        } else if (this.questionNumber === 2) {
          this.wrongAnswer2();
        } else if (this.questionNumber === 3) {
          this.wrongAnswer3();
        } else if (this.questionNumber === 4) {
          this.wrongAnswer4();
        } else if (this.questionNumber === 5) {
          this.wrongAnswer5();
        } else if (this.questionNumber === 6) {
          this.wrongAnswer6();
        } else if (this.questionNumber === 7) {
          this.wrongAnswer7();
        } else if (this.questionNumber === 8) {
          this.correctAnswer8();
        } else if (this.questionNumber === 9) {
          this.correctAnswer9();
        } else if (this.questionNumber === 10) {
          this.correctAnswer10();
        } else if (this.questionNumber === 11) {
          this.wrongAnswer11();
        } else if (this.questionNumber === 12) {
          this.wrongAnswer12();
        } else if (this.questionNumber === 13) {
          this.wrongAnswer13();
        } else if (this.questionNumber === 14) {
          this.wrongAnswer14();
        } else if (this.questionNumber === 15) {
          this.wrongAnswer15();
        }
      });

    //textos
    this.questionText = this.add.text(
      180,
      30,
      this.questionNumberText + this.question,
      {
        fontSize: "32px",
        fill: "#fff",
      },
    );

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
    this.questionText1.setText("110");
    this.questionText2.setText("111");
    this.questionText3.setText("101");
    this.questionText4.setText("11");
  }
  wrongAnswer2() {
    this.questionNumberText = "3: ";
    this.question = "10 x 11?";
    this.questionNumber = 3;
    this.questionText.setText(this.questionNumberText + this.question);
    this.pointsText.setText("Pontuação:" + this.game.points);
    this.questionText1.setText("110");
    this.questionText2.setText("111");
    this.questionText3.setText("101");
    this.questionText4.setText("11");
  }

  correctAnswer3() {
    this.questionNumberText = "4: ";
    this.question = "7 x 7?";
    this.questionNumber = 4;
    this.questionText.setText(this.questionNumberText + this.question);
    this.game.points = this.game.points + 10;
    this.pointsText.setText("Pontuação:" + this.game.points);
    this.questionText1.setText("51");
    this.questionText2.setText("14");
    this.questionText3.setText("49");
    this.questionText4.setText("53");
  }
  wrongAnswer3() {
    this.questionNumberText = "4: ";
    this.question = "7 x 7?";
    this.questionNumber = 4;
    this.questionText.setText(this.questionNumberText + this.question);
    this.pointsText.setText("Pontuação:" + this.game.points);
    this.questionText1.setText("13");
    this.questionText2.setText("-1");
    this.questionText3.setText("0");
    this.questionText4.setText("1");
  }

  correctAnswer4() {
    this.questionNumberText = "5: ";
    this.question = "24 % 3?";
    this.questionNumber = 5;
    this.questionText.setText(this.questionNumberText + this.question);
    this.game.points = this.game.points + 10;
    this.pointsText.setText("Pontuação:" + this.game.points);
    this.questionText1.setText("8");
    this.questionText2.setText("9");
    this.questionText3.setText("21");
    this.questionText4.setText("7");
  }
  wrongAnswer4() {
    this.questionNumberText = "5: ";
    this.question = "24 % 3?";
    this.questionNumber = 5;
    this.questionText.setText(this.questionNumberText + this.question);
    this.pointsText.setText("Pontuação:" + this.game.points);
    this.questionText1.setText("8");
    this.questionText2.setText("9");
    this.questionText3.setText("21");
    this.questionText4.setText("7");
  }

  correctAnswer5() {
    this.questionNumberText = "6: ";
    this.question = "Quais os três primeiros números primos?";
    this.questionNumber = 6;
    this.questionText.setText(this.questionNumberText + this.question);
    this.game.points = this.game.points + 10;
    this.pointsText.setText("Pontuação:" + this.game.points);
    this.questionText1.setText("1,2,3");
    this.questionText2.setText("2,3,5");
    this.questionText3.setText("2,4,6");
    this.questionText4.setText("3,5,7");
  }
  wrongAnswer5() {
    this.questionNumberText = "6: ";
    this.question = "Quais os três primeiros números primos?";
    this.questionNumber = 6;
    this.questionText.setText(this.questionNumberText + this.question);
    this.pointsText.setText("Pontuação:" + this.game.points);
    this.questionText1.setText("1,2,3");
    this.questionText2.setText("2,3,5");
    this.questionText3.setText("2,4,6");
    this.questionText4.setText("3,5,7");
  }

  correctAnswer6() {
    this.questionNumberText = "7: ";
    this.question = "Qual o seno de 90 graus?";
    this.questionNumber = 7;
    this.questionText.setText(this.questionNumberText + this.question);
    this.game.points = this.game.points + 10;
    this.pointsText.setText("Pontuação:" + this.game.points);
    this.questionText1.setText("1");
    this.questionText2.setText("0");
    this.questionText3.setText("-1");
    this.questionText4.setText("-0");
  }
  wrongAnswer6() {
    this.questionNumberText = "7: ";
    this.question = "Qual o seno de 90 graus?";
    this.questionNumber = 7;
    this.questionText.setText(this.questionNumberText + this.question);
    this.pointsText.setText("Pontuação:" + this.game.points);
    this.questionText1.setText("1");
    this.questionText2.setText("0");
    this.questionText3.setText("-1");
    this.questionText4.setText("-0");
  }

  correctAnswer7() {
    this.questionNumberText = "8: ";
    this.question = "3 - 2 x 4?";
    this.questionNumber = 8;
    this.questionText.setText(this.questionNumberText + this.question);
    this.game.points = this.game.points + 10;
    this.pointsText.setText("Pontuação:" + this.game.points);
    this.questionText1.setText("5");
    this.questionText2.setText("4");
    this.questionText3.setText("-4");
    this.questionText4.setText("-5");
  }
  wrongAnswer7() {
    this.questionNumberText = "8: ";
    this.question = "3 - 2 x 4?";
    this.questionNumber = 8;
    this.questionText.setText(this.questionNumberText + this.question);
    this.pointsText.setText("Pontuação:" + this.game.points);
    this.questionText1.setText("5");
    this.questionText2.setText("4");
    this.questionText3.setText("-4");
    this.questionText4.setText("-5");
  }

  correctAnswer8() {
    this.questionNumberText = "9: ";
    this.question = "Um cubo tem quantos lados?";
    this.questionNumber = 9;
    this.questionText.setText(this.questionNumberText + this.question);
    this.game.points = this.game.points + 10;
    this.pointsText.setText("Pontuação:" + this.game.points);
    this.questionText1.setText("Depende");
    this.questionText2.setText("4");
    this.questionText3.setText("5");
    this.questionText4.setText("6");
  }
  wrongAnswer8() {
    this.questionNumberText = "9: ";
    this.question = "Um cubo tem quantos lados?";
    this.questionNumber = 9;
    this.questionText.setText(this.questionNumberText + this.question);
    this.pointsText.setText("Pontuação:" + this.game.points);
    this.questionText1.setText("Depende");
    this.questionText2.setText("4");
    this.questionText3.setText("5");
    this.questionText4.setText("6");
  }

  correctAnswer9() {
    this.questionNumberText = "10: ";
    this.question =
      "Se um inocente matar um assassino, o número de assassinos no mundo fica quanto?";
    this.questionNumber = 10;
    this.questionText.setText(this.questionNumberText + this.question);
    this.game.points = this.game.points + 10;
    this.pointsText.setText("Pontuação:" + this.game.points);
    this.questionText1.setText("N + 2");
    this.questionText2.setText("N + 1");
    this.questionText3.setText("N - 1");
    this.questionText4.setText("N + 0");
  }
  wrongAnswer9() {
    this.questionNumberText = "10: ";
    this.question =
      "Se um inocente matar um assassino, o número de assassinos no mundo fica quanto?";
    this.questionNumber = 10;
    this.questionText.setText(this.questionNumberText + this.question);
    this.pointsText.setText("Pontuação:" + this.game.points);
    this.questionText1.setText("N + 2");
    this.questionText2.setText("N + 1");
    this.questionText3.setText("N - 1");
    this.questionText4.setText("N + 0");
  }

  correctAnswer10() {
    this.questionNumberText = "11: ";
    this.question = "2^-3 x 2^9";
    this.questionNumber = 11;
    this.questionText.setText(this.questionNumberText + this.question);
    this.game.points = this.game.points + 10;
    this.pointsText.setText("Pontuação:" + this.game.points);
    this.questionText1.setText("2^6");
    this.questionText2.setText("2^8");
    this.questionText3.setText("2^5");
    this.questionText4.setText("4^6");
  }
  wrongAnswer10() {
    this.questionNumberText = "11: ";
    this.question = "2^-3 x 2^9";
    this.questionNumber = 11;
    this.questionText.setText(this.questionNumberText + this.question);
    this.pointsText.setText("Pontuação:" + this.game.points);
    this.questionText1.setText("2^6");
    this.questionText2.setText("2^8");
    this.questionText3.setText("2^5");
    this.questionText4.setText("4^6");
  }

  correctAnswer11() {
    this.questionNumberText = "12: ";
    this.question = "Qual o nome do professor que você está lutando";
    this.questionNumber = 12;
    this.questionText.setText(this.questionNumberText + this.question);
    this.game.points = this.game.points + 10;
    this.pointsText.setText("Pontuação:" + this.game.points);
    this.questionText1.setText("Pedro");
    this.questionText2.setText("Térgio");
    this.questionText3.setText("Pablo");
    this.questionText4.setText("Sérgio");
    }
  wrongAnswer11() {
    this.questionNumberText = "12: ";
    this.question = "Qual o nome do professor que você está lutando";
    this.questionNumber = 12;
    this.questionText.setText(this.questionNumberText + this.question);
    this.pointsText.setText("Pontuação:" + this.game.points);
    this.questionText1.setText("Pedro");
    this.questionText2.setText("Térgio");
    this.questionText3.setText("Pablo");
    this.questionText4.setText("Sérgio");
    }

  update() {}
}
export default scene1;
