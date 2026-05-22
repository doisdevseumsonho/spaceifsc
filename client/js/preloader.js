class preloader extends Phaser.Scene {
  constructor() {
    super("preloader");
  }
  init() {

    this.add.rectangle(400, 300, 468, 32).setStrokeStyle(1, 0xffffff);
    const bar = this.add.rectangle(400 - 230, 300, 4, 28, 0xffffff);

    this.load.on("progress", (progress) => {
      bar.width = 4 + 460 * progress;
    });
  }

  preload() {
    this.load.setPath("assets/");

    //room
    this.load.image("room_background", "room_background.png");

    //scene_selection

    this.load.spritesheet("imagem_pedro", "big_pedro.png", {
      frameWidth: 128,
      frameHeight: 256,
    });
    this.load.spritesheet("imagem_pablo", "big_pablo.png", {
      frameWidth: 128,
      frameHeight: 256,
    });
    this.load.spritesheet("selection_box_pedro", "selection_box_pedro.png", {
        frameWidth: 32,
        frameHeight: 64,
    });
    this.load.spritesheet("selection_box_pablo", "selection_box_pablo.png", {
        frameWidth: 32,
        frameHeight: 64,
    });

    this.load.tilemapTiledJSON("map", "map/ifsc.json"); //preload do mapa e dos tilesets
    this.load.image("tileset", "map/tileset.png");

    this.load.spritesheet("characterPedro", "characters/characterbase_pedro.png", {
          frameWidth: 32,
          frameHeight: 64,
        });
    this.load.spritesheet("characterPablo", "characters/characterbase_pablo.png", {
          frameWidth: 32,
          frameHeight: 64,
        });

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
    this.load.spritesheet("backgroundtergio1", "quiz/tergio_text_box.png", {
      frameWidth: 320,
      frameHeight: 230,
    });
    this.load.spritesheet("backgroundtergio0", "quiz/tergio_background.png", {
      frameWidth: 4000,
      frameHeight: 2500,
    });
    this.load.spritesheet("professorTergio", "characters/Tergio.png", {
      frameWidth: 32,
      frameHeight: 64,
    });
    this.load.spritesheet("tergiosleep", "characters/Tergio_sleep.png", {
      frameWidth:240,
      frameHeight: 240,
    });

      //Interagíveis scene1
      this.load.image("selectionButton1", "quiz/selection_box_question.png");
      this.load.spritesheet("button1", "quiz/questionbox.png", {
      frameWidth: 192,
      frameHeight: 192,
      });
      this.load.image("selectionButton2", "quiz/selection_box_question.png");
      this.load.spritesheet("button2", "quiz/questionbox.png", {
      frameWidth: 192,
      frameHeight: 192,
      });
      this.load.image("selectionButton3", "quiz/selection_box_question.png");
      this.load.spritesheet("button3", "quiz/questionbox.png", {
      frameWidth: 192,
      frameHeight: 192,
      });
      this.load.image("selectionButton4", "quiz/selection_box_question.png");
      this.load.spritesheet("button4", "quiz/questionbox.png", {
      frameWidth: 192,
      frameHeight: 192,
      });
  }

  create() {
    this.scene.stop("preloader");

    if (this.game.room) {
      this.scene.start("scene_selection");
    } else {
      this.scene.start("room");
    }
  }

  update() {}
}
export default preloader;
