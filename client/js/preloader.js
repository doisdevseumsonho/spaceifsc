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

    this.load.spritesheet("selectionmenu", "selectionMenu.png", {
      frameWidth: 800,
      frameHeight: 500,
    });

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

    this.load.spritesheet("key", "ziotekey.png", {
      frameWidth: 32,
      frameHeight: 32,
    }); 

    this.load.spritesheet("airfryer", "airfryer.png", {
      frameWidth: 32,
      frameHeight: 32,
    });

    this.load.spritesheet("board", "board.png", {
      frameWidth: 32,
      frameHeight: 32,
    });

    this.load.spritesheet("selectionTergio", "characters/selection_box.png", {
      frameWidth: 32,
      frameHeight: 32,
    });

    this.load.spritesheet("selectionAirfryer", "characters/selection_box.png", {
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
      frameWidth: 840,
      frameHeight: 600,
    });
    this.load.spritesheet("professorTergio", "characters/tergio.png", {
      frameWidth: 32,
      frameHeight: 64,
    });
    this.load.spritesheet("tergiosleep", "quiz/tergio_sleep.png", {
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
    
    //scene2
    this.load.spritesheet("hidden_field", "minesweeper/hidden_field.png",{
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.spritesheet("bomb_1", "minesweeper/bomb_1.png", {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.spritesheet("bomb_2", "minesweeper/bomb_2.png", {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.spritesheet("bomb_3", "minesweeper/bomb_3.png", {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.spritesheet("bomb_4", "minesweeper/bomb_4.png", {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.spritesheet("bomb_5", "minesweeper/bomb_5.png", {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.spritesheet("bomb_6", "minesweeper/bomb_6.png", {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.spritesheet("bomb_7", "minesweeper/bomb_7.png", {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.spritesheet("bomb_8", "minesweeper/bomb_8.png", {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.spritesheet("bomb_9", "minesweeper/bomb_9.png", {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.spritesheet("bomb_10", "minesweeper/bomb_10.png", {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.spritesheet("field_0", "minesweeper/field_0.png", {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.spritesheet("field_1", "minesweeper/field_1.png", {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.spritesheet("field_2", "minesweeper/field_2.png", {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.spritesheet("field_3", "minesweeper/field_3.png", {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.spritesheet("field_4", "minesweeper/field_4.png", {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.spritesheet("field_5", "minesweeper/field_5.png", {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.spritesheet("field_6", "minesweeper/field_6.png", {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.spritesheet("field_7", "minesweeper/field_7.png", {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.spritesheet("field_8", "minesweeper/field_8.png", {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.spritesheet("flag_field", "minesweeper/flag_field.png", {
      frameWidth: 32,
      frameHeight: 32,
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
