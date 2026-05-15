class preloader extends Phaser.Scene {
  constructor() {
    super("preloader");
  }
  init() {
    this.add.image(400, 225, "start-background");

    this.add.rectangle(400, 300, 468, 32).setStrokeStyle(1, 0xffffff);
    const bar = this.add.rectangle(400 - 230, 300, 4, 28, 0xffffff);

    this.load.on("progress", (progress) => {
      bar.width = 4 + 460 * progress;
    });
  }

  preload() {
    this.load.setPath("assets/");

//scene_selection
    this.load.spritesheet("imagem_pedro", "assets/big_pedro.png", {
      frameWidth: 128,
      frameHeight: 256,
    });
    this.load.spritesheet("imagem_pablo", "assets/big_pablo.png", {
      frameWidth: 128,
      frameHeight: 256,
    });
    this.load.spritesheet("selection_box_pedro", "assets/selection_box_pedro.png", {
        frameWidth: 32,
        frameHeight: 64,
    });
    this.load.spritesheet("selection_box_pablo", "assets/selection_box_pablo.png", {
        frameWidth: 32,
        frameHeight: 64,
    });

    this.load.setPath("assets/");

    this.load.tilemapTiledJSON("map", "map/ifsc.json"); //preload do mapa e dos tilesets
    this.load.image("tileset", "map/tileset.png");

    if (this.game.characterplayer1 === 1) {
      this.load.spritesheet(
        "character1",
        "characters/characterbase_pedro.png",
        {
          frameWidth: 32,
          frameHeight: 64,
        },
      );
    } else if (this.game.characterplayer1 === 2) {
      this.load.spritesheet(
        "character1",
        "characters/characterbase_pablo.png",
        {
          frameWidth: 32,
          frameHeight: 64,
        },
      );
    };

//scene0
    this.load.spritesheet("professor1", "characters/tergio.png", {
      frameWidth: 32,
      frameHeight: 64,
    });

    this.load.spritesheet("interact_buttom", "interact_buttom.png", {
      frameWidth: 32,
      frameHeight: 32,
    });

    this.load.spritesheet("coin", "coin.png", {
      frameWidth: 32,
      frameHeight: 32,
    });

    this.load.spritesheet("selectionTergio", "characters/selection_box.png", {
      frameWidth: 32,
      frameHeight: 32,
    });

    this.load.plugin("rexvirtualjoystickplugin", "../js/rexvirtualjoystickplugin.min.js",
      true,
    );

    this.load.audio("hubmusic", "sounds/placeholder_hubmusic.mp3");

//scene1
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
    this.scene.stop("preloader");
    this.scene.start("room");
  }

  update() {}
}
export default preloader;
