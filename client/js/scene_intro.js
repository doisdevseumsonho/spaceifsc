class scene_intro extends Phaser.Scene {
  constructor() {
    super("scene_intro");
  }

  create() {
    // Fundo estrelado
    this.background = this.add.image(400, 300, "space").setAlpha(0);

    // Fade in do fundo
    this.tweens.add({
      targets: this.background,
      alpha: 1,
      duration: 3000,
    });

    // Música
    this.introMusic = this.sound.add("imperial8bit", {
      volume: 0.5,
      loop: false,
    });

    this.introMusic.play();

    const texto = `Em um campus muito, muito distante...

O primeiro Instituto Federal ESPACIAL
foi lançado, no ano de 2XXX.

Em sua primeira expedição
a um planeta desconhecido,
algo inesperado aconteceu.

A tripulação encontrou
uma raça inteligente desconhecida:
os Gincanáliens.

Seres que possuíam
uma paixão incontrolável
por gincanas e competições.

Os professores aceitaram participar,
sem conhecer o verdadeiro poder
de seus adversários.

Todos aqueles que perdem
um desafio contra um Gincanálien
têm sua mente dominada.

Os professores Térgio e Taulo
foram as primeiras vítimas.

E os demais professores
fugiram em suas naves.

Mas, na pressa...

esqueceram dois pendentes
que ainda não haviam terminado suas aulas.

Agora cabe a eles
salvar seus professores

antes que algo pior aconteça.`;

    // Texto
    this.introText = this.add
      .text(
        400,
        700, // começa abaixo da tela
        texto,
        {
          fontFamily: "news-gothic-bold",
          fontSize: "32px",
          color: "#FFD700", // amarelo 
          align: "center",
          stroke: "#000000",
          strokeThickness: 4,
        },
      )
      .setOrigin(0.5, 0);

    // Movimento do texto
    this.tweens.add({
      targets: this.introText,
      y: -2200,
      duration: 50000,
      ease: "Linear",
    });

    // Após 40 segundos vai para a Scene0
   this.time.delayedCall(40000, () => {
     // Fade out da música durante 3 segundos
     this.tweens.add({
       targets: this.introMusic,
       volume: 0,
       duration: 3000,
       ease: "Linear",
     });

     // Fade out da tela
     this.cameras.main.fadeOut(3000, 0, 0, 0);

     this.time.delayedCall(3000, () => {
       if (this.introMusic) {
         this.introMusic.stop();
       }

       this.scene.start("scenetutorial1");
     });
   });
    
    // botão de pular introdução
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
  this.scene.start("scenetutorial1");
      this.introMusic.stop();
});

// texto do botão
this.skipText = this.add
  .text(
    this.cameras.main.width - 75,
    this.cameras.main.height - 105,
    "Pular\nIntrodução",
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

export default scene_intro;
