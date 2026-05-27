class scene1 extends Phaser.Scene {
  questionNumberText = "1: ";
  question = "15 + 13?";
  question2 = "  ";
  questionNumber = 1;

  constructor() {
    super("scene1");
  }

  create() {
    //Fundo
    this.add.image(400, 300, "backgroundtergio0");

    const backgroundScaleX = 2.55; // escala horizontal da fundo
    const backgroundScaleY = 2; // escala vertical da fundo
    this.add
      .image(390, 230, "backgroundtergio1")
      .setScale(backgroundScaleX, backgroundScaleY);
    if (this.game.characterplayer1 === 1) {
      this.add.image(120, 400, "characterPedro");
    } else if (this.game.characterplayer1 === 2) {
      this.add.image(120, 400, "characterPablo");
    }
    this.add.image(770, 400, "professor1").setScale(-1, 1);

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
          this.wrongAnswer9();
        } else if (this.questionNumber === 10) {
          this.wrongAnswer10();
        } else if (this.questionNumber === 11) {
          this.correctAnswer11();
        } else if (this.questionNumber === 12) {
          this.wrongAnswer12();
        } else if (this.questionNumber === 13) {
          this.correctAnswer13();
        } else if (this.questionNumber === 14) {
          this.wrongAnswer14();
        } else if (this.questionNumber === 15) {
          this.wrongAnswer15();
        } else if (this.questionNumber === 16) {
          this.wrongAnswer16();
        } else if (this.questionNumber === 17) {
          this.wrongAnswer17();
        } else if (this.questionNumber === 18) {
          this.wrongAnswer18();
        } else if (this.questionNumber === 19) {
          this.wrongAnswer19();
        } else if (this.questionNumber === 20) {
          this.correctAnswer20();
        }
      });

    //botão 3
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
          this.correctAnswer4();
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
          this.correctAnswer15();
        } else if (this.questionNumber === 16) {
          this.correctAnswer16();
        } else if (this.questionNumber === 17) {
          this.wrongAnswer17();
        } else if (this.questionNumber === 18) {
          this.wrongAnswer18();
        } else if (this.questionNumber === 19) {
          this.wrongAnswer19();
        } else if (this.questionNumber === 20) {
          this.wrongAnswer20();
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
          this.wrongAnswer4();
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
        } else if (this.questionNumber === 16) {
          this.correctAnswer16();
        } else if (this.questionNumber === 17) {
          this.wrongAnswer17();
        } else if (this.questionNumber === 18) {
          this.correctAnswer18();
        } else if (this.questionNumber === 19) {
          this.correctAnswer19();
        } else if (this.questionNumber === 20) {
          this.wrongAnswer20();
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
          this.correctAnswer14();
        } else if (this.questionNumber === 15) {
          this.wrongAnswer15();
        } else if (this.questionNumber === 16) {
          this.wrongAnswer16();
        } else if (this.questionNumber === 17) {
          this.correctAnswer17();
        } else if (this.questionNumber === 18) {
          this.wrongAnswer18();
        } else if (this.questionNumber === 19) {
          this.wrongAnswer19();
        } else if (this.questionNumber === 20) {
          this.wrongAnswer20();
        }
      });

    //textos
    this.questionText = this.add.text(180, 60, this.questionNumberText + this.question, {
        fontSize: "32px",
        fill: "#fff",
      },
    );
    this.questionParagraph2 = this.add.text(180, 90, this.question2, {
        fontSize: "32px",
       fill: "#fff",
      },
    );    

    this.pointsText = this.add
      .text(300, 30, "Pontuação:" + this.game.points, {
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
    this.questionText1.setText("51");
    this.questionText2.setText("14");
    this.questionText3.setText("49");
    this.questionText4.setText("53");
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
    this.question = "Quais os três primeiros";
    this.questionParagraph2.setText("números primos?");
    this.questionNumber = 6;
    this.questionText.setText(this.questionNumberText + this.question);

    this.game.points = this.game.points + 10;
    this.pointsText.setText("Pontuação:" + this.game.points);
    this.questionText1.setText("1,2,3");
    this.questionText2.setText("2,4,6");
    this.questionText3.setText("2,3,5");
    this.questionText4.setText("3,5,7");
  }
  wrongAnswer5() {
    this.questionNumberText = "6: ";
    this.question = "Quais os três primeiros";
    this.questionParagraph2.setText("números primos?");
    this.questionNumber = 6;
    this.questionText.setText(this.questionNumberText + this.question);
    this.pointsText.setText("Pontuação:" + this.game.points);
    this.questionText1.setText("1,2,3");
    this.questionText2.setText("2,4,6");
    this.questionText3.setText("2,3,5");
    this.questionText4.setText("3,5,7");
  }

  correctAnswer6() {
    this.questionNumberText = "7: ";
    this.question = "Qual o seno de 90 graus?";
    this.questionParagraph2.setText("  ");
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
    this.questionParagraph2.setText("  ");
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
      "Se um inocente matar um";
    this.questionParagraph2.setText(
      "assassino, quantos temos?",
    );
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
      "Se um inocente matar um";
    this.questionParagraph2.setText(
      "assassino, quantos temos?",
    );
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
    this.questionParagraph2.setText("  ");
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
    this.questionParagraph2.setText("  ");
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
    this.question = "Qual o nome do professor que";
    this.questionParagraph2.setText("você está lutando");
    this.questionNumber = 12;
    this.questionText.setText(this.questionNumberText + this.question);
    this.game.points = this.game.points + 10;
    this.pointsText.setText("Pontuação:" + this.game.points);
    this.questionText1.setText("Pedro");
    this.questionText2.setText("Pablo");
    this.questionText3.setText("Térgio");
    this.questionText4.setText("Sérgio");
  }
  wrongAnswer11() {
    this.questionNumberText = "12: ";
    this.question = "Qual o nome do professor que";
    this.questionParagraph2.setText("você está lutando");
    this.questionNumber = 12;
    this.questionText.setText(this.questionNumberText + this.question);
    this.pointsText.setText("Pontuação:" + this.game.points);
    this.questionText1.setText("Pedro");
    this.questionText2.setText("Pablo");
    this.questionText3.setText("Térgio");
    this.questionText4.setText("Sérgio");
  }

  correctAnswer12() {
    this.questionNumberText = "13: ";
    this.question = "0 % 0?";
    this.questionParagraph2.setText("  ");
    this.questionNumber = 13;
    this.questionText.setText(this.questionNumberText + this.question);
    this.game.points = this.game.points + 10;
    this.pointsText.setText("Pontuação:" + this.game.points);
    this.questionText1.setText("Erro");
    this.questionText2.setText("1");
    this.questionText3.setText("0");
    this.questionText4.setText("Infinito");
  }
  wrongAnswer12() {
    this.questionNumberText = "13: ";
    this.question = "0 % 0?";
    this.questionParagraph2.setText("  ");
    this.questionNumber = 13;
    this.questionText.setText(this.questionNumberText + this.question);
    this.pointsText.setText("Pontuação:" + this.game.points);
    this.questionText1.setText("Erro");
    this.questionText2.setText("1");
    this.questionText3.setText("0");
    this.questionText4.setText("Infinito");
  }

  correctAnswer13() {
    this.questionNumberText = "14: ";
    this.question = "6! ?";
    this.questionNumber = 14;
    this.questionText.setText(this.questionNumberText + this.question);
    this.game.points = this.game.points + 10;
    this.pointsText.setText("Pontuação:" + this.game.points);
    this.questionText1.setText("120");
    this.questionText2.setText("6");
    this.questionText3.setText("36");
    this.questionText4.setText("720");
  }
  wrongAnswer13() {
    this.questionNumberText = "14: ";
    this.question = "6! ?";
    this.questionNumber = 14;
    this.questionText.setText(this.questionNumberText + this.question);
    this.pointsText.setText("Pontuação:" + this.game.points);
    this.questionText1.setText("120");
    this.questionText2.setText("6");
    this.questionText3.setText("36");
    this.questionText4.setText("720");
  }

  correctAnswer14() {
    this.questionNumberText = "15: ";
    this.question = "10000000000 ?";
    this.questionNumber = 15;
    this.questionText.setText(this.questionNumberText + this.question);
    this.game.points = this.game.points + 10;
    this.pointsText.setText("Pontuação:" + this.game.points);
    this.questionText1.setText("1^10");
    this.questionText2.setText("1 x 10^9");
    this.questionText3.setText("1 x 10^10");
    this.questionText4.setText("1 x 10^8");
  }
  wrongAnswer14() {
    this.questionNumberText = "15: ";
    this.question = "10000000000 ?";
    this.questionNumber = 15;
    this.questionText.setText(this.questionNumberText + this.question);
    this.pointsText.setText("Pontuação:" + this.game.points);
    this.questionText1.setText("1^10");
    this.questionText2.setText("1 x 10^9");
    this.questionText3.setText("1 x 10^10");
    this.questionText4.setText("1 x 10^8");
  }

  correctAnswer15() {
    this.questionNumberText = "16: ";
    this.question = "Qual o NOSSO nome?";
    this.questionNumber = 16;
    this.questionText.setText(this.questionNumberText + this.question);
    this.game.points = this.game.points + 10;
    this.pointsText.setText("Pontuação:" + this.game.points);
    this.questionText1.setText("Aliens");
    this.questionText2.setText("Gincanaliens");
    this.questionText3.setText("Invasores");
    this.questionText4.setText("Amongus");
  }
  wrongAnswer15() {
    this.questionNumberText = "16: ";
    this.question = "Qual o NOSSO nome?";
    this.questionNumber = 16;
    this.questionText.setText(this.questionNumberText + this.question);
    this.pointsText.setText("Pontuação:" + this.game.points);
    this.questionText1.setText("Aliens");
    this.questionText2.setText("Gincanaliens");
    this.questionText3.setText("Invasores");
    this.questionText4.setText("Amongus");
  }

  correctAnswer16() {
    this.questionNumberText = "17: ";
    this.question = "Como se inicia um conto?";
    this.questionNumber = 17;
    this.questionText.setText(this.questionNumberText + this.question);
    this.game.points = this.game.points + 10;
    this.pointsText.setText("Pontuação:" + this.game.points);
    this.questionText1.setText("bom dia...");
    this.questionText2.setText("e do nada...");
    this.questionText3.setText("naquele dia...");
    this.questionText4.setText("Era uma vez...");
  }
  wrongAnswer16() {
    this.questionNumberText = "17: ";
    this.question = "Como se inicia um conto?";
    this.questionNumber = 17;
    this.questionText.setText(this.questionNumberText + this.question);
    this.pointsText.setText("Pontuação:" + this.game.points);
    this.questionText1.setText("bom dia...");
    this.questionText2.setText("e do nada...");
    this.questionText3.setText("naquele dia...");
    this.questionText4.setText("Era uma vez...");
  }

  correctAnswer17() {
    this.questionNumberText = "18: ";
    this.question = "Quantas formigas estima-se que existiam na terra de 2022?";
    this.questionNumber = 18;
    this.questionText.setText(this.questionNumberText + this.question);
    this.game.points = this.game.points + 10;
    this.pointsText.setText("Pontuação:" + this.game.points);
    this.questionText1.setText("20 bilhões");
    this.questionText2.setText("20 quatrilhões");
    this.questionText3.setText("20 trilhões");
    this.questionText4.setText("20 quintilhões");
  }
  wrongAnswer17() {
    this.questionNumberText = "18: ";
    this.question = "Quantas formigas estima-se que existiam na terra de 2022?";
    this.questionNumber = 18;
    this.questionText.setText(this.questionNumberText + this.question);
    this.pointsText.setText("Pontuação:" + this.game.points);
    this.questionText1.setText("20 bilhões");
    this.questionText2.setText("20 quatrilhões");
    this.questionText3.setText("20 trilhões");
    this.questionText4.setText("20 quintilhões");
  }

  correctAnswer18() {
    this.questionNumberText = "19: ";
    this.question = "Qual a marca da air fryer na sala do Zio Té?";
    this.questionNumber = 19;
    this.questionText.setText(this.questionNumberText + this.question);
    this.game.points = this.game.points + 10;
    this.pointsText.setText("Pontuação:" + this.game.points);
    this.questionText1.setText("Oniversal");
    this.questionText2.setText("Equipe Rocket");
    this.questionText3.setText("Sailo");
    this.questionText4.setText("Indústrias Estarque");
  }
  wrongAnswer18() {
    this.questionNumberText = "19: ";
    this.question = "Qual a marca da air fryer na sala do Zio Té?";
    this.questionNumber = 19;
    this.questionText.setText(this.questionNumberText + this.question);
    this.pointsText.setText("Pontuação:" + this.game.points);
    this.questionText1.setText("Oniversal");
    this.questionText2.setText("Equipe Rocket");
    this.questionText3.setText("Sailo");
    this.questionText4.setText("Indústrias Estarque");
  }

  correctAnswer19() {
    this.questionNumberText = "20: ";
    this.question = "Em qual pergunta eu disse meu nome";
    this.questionNumber = 20;
    this.questionText.setText(this.questionNumberText + this.question);
    this.game.points = this.game.points + 10;
    this.pointsText.setText("Pontuação:" + this.game.points);
    this.questionText1.setText("12");
    this.questionText2.setText("19");
    this.questionText3.setText("9");
    this.questionText4.setText("15");
  }
  wrongAnswer19() {
    this.questionNumberText = "20: ";
    this.question = "Em qual pergunta eu disse meu nome";
    this.questionNumber = 20;
    this.questionText.setText(this.questionNumberText + this.question);
    this.pointsText.setText("Pontuação:" + this.game.points);
    this.questionText1.setText("12");
    this.questionText2.setText("19");
    this.questionText3.setText("9");
    this.questionText4.setText("15");
  }

  correctAnswer20() {
    this.game.points = this.game.points + 10;
    this.pointsText.setText("Pontuação:" + this.game.points);
    this.game.tergioalive = false;
    this.scene.stop("scene1");
    this.scene.start("endscene1");
  }
  wrongAnswer20() {
    this.pointsText.setText("Pontuação:" + this.game.points);
    this.game.tergioalive = false;
    this.scene.stop("scene1");
    this.scene.start("endscene1");
  }

  update() {}
}
export default scene1;
