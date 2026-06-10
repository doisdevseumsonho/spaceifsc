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

    this.load.font("news-gothic-bold", "news-gothic-bold.otf");

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
    this.load.spritesheet("characterPedroHat", "characters/characterbase_pedro_hat.png", {
          frameWidth: 32,
          frameHeight: 64,
    });
    this.load.spritesheet("characterPabloHat", "characters/characterbase_pablo_hat.png", {
          frameWidth: 32,
          frameHeight: 64,
    });

    //scene_intro
    this.load.image("space", "space.png");
    this.load.audio("imperial8bit", "sounds/imperial8bit.mp3");

    //cenas de transição (tutorials)
    this.load.spritesheet("skipbutton", "skipbutton.png", {
      frameWidth: 120,
      frameHeight: 120,
    });
//scene0
    this.load.spritesheet("professor1", "characters/tergio.png", {
      frameWidth: 32,
      frameHeight: 64,
    });

     this.load.spritesheet("professor1_salvo", "characters/tergiohat.png", {
       frameWidth: 32,
       frameHeight: 64,
     });

    this.load.spritesheet("professor2", "characters/taulo.png", {
      frameWidth: 32,
      frameHeight: 64,
    });

    this.load.spritesheet("professor2_salvo", "characters/taulohat.png", {
      frameWidth: 32,
      frameHeight: 64,
    });

    this.load.spritesheet("professor3", "characters/toi.png", {
      frameWidth: 32,
      frameHeight: 64,
    });

    this.load.spritesheet("interact_buttom", "interact_buttom.png", {
      frameWidth: 32,
      frameHeight: 32,
    });

    this.load.spritesheet("aluminum_hat", "aluminum_hat.png", {
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

    this.load.spritesheet("inator", "taulo_inator.png", {
      frameWidth: 140,
      frameHeight: 92,
    });

    this.load.spritesheet("toi", "toi.png", {
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

    this.load.spritesheet("chair", "chair.png", {
      frameWidth: 64,
      frameHeight: 64,
    });

    this.load.plugin("rexvirtualjoystickplugin", "../js/rexvirtualjoystickplugin.min.js",
      true,
    );

    this.load.audio("hubmusic", "sounds/placeholder_hubmusic.mp3");

    this.load.audio("coinSound", "sounds/Pickup_Coin2.mp3");

    this.load.audio("selectSound", "sounds/Blip_Select.mp3");

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
    
   //sons
    this.load.audio("correct_question", "sounds/correct_question.mp3");
    this.load.audio("wrong_question", "sounds/wrong_question.mp3");

    //scene2

    this.load.spritesheet("aimflag", "minesweeper/aimflag.png", {
      frameWidth: 32,
      frameHeight: 32,
    });

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

        this.load.audio("explosion", "sounds/explosion.mp3");

    //Scene4 (final)

    this.load.spritesheet("final_background", "final_background.png", {
      frameWidth: 450,
      frameHeight: 384,
    });

    this.load.spritesheet("Amongus", "amongus.png", {
      frameWidth: 64,  
      frameHeight: 64,
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
