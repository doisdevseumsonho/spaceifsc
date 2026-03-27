class scene0 extends Phaser.Scene {
  walking = false;
  points = 0;

  constructor() {
    super("scene0");

    this.threshold = 0.1;
    this.speed = 200;
    this.direction = undefined;
  }

  preload() {
    this.load.setPath("assets/");

    this.load.tilemapTiledJSON("map", "map/ifsc.json"); //preload do mapa e dos tilesets
    this.load.image("tileset", "map/tileset.png");

    this.load.spritesheet("character", "placeholder_character.png", {
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

    this.load.plugin(
      "rexvirtualjoystickplugin",
      "../rexvirtualjoystickplugin.min.js",
      true,
    );
  }

  create() {
    //mapa
    this.tilemap = this.make.tilemap({ key: "map" }); //cria o mapa

    this.tilesetTileset = this.tilemap.addTilesetImage("tileset"); //adiciona o tileset ao mapa, puxando ele pelo nome que tá no Tiled

    this.layerBarriers = this.tilemap.createLayer("barriers", [
      this.tilesetTileset,
    ]); //cria as camadas de barreira invisível
    this.layerFloor = this.tilemap.createLayer("floor", [this.tilesetTileset]); //cria as camadas de chão
    this.layerStructure = this.tilemap.createLayer("structure", [
      this.tilesetTileset,
    ]); //cria as camadas de estrutura
    this.character = this.physics.add.sprite(1800, 1500, "character", 20); //cria o personagem
    //this.layerCharacter = this.tilemap.createLayer("character", [this.tilesetTileset]);
    this.coin = this.physics.add.sprite(2000, 1712, "coin", 0); //cria a moeda
    this.layerDoors = this.tilemap.createLayer("doors", [this.tilesetTileset]); //cria as camadas de portas

    //colisões
    this.character.setCollideWorldBounds(true); //impede o personagem de sair da tela

    this.cameras.main.setBounds(
      0,
      0,
      this.tilemap.widthInPixels,
      this.tilemap.heightInPixels,
    );
    this.cameras.main.startFollow(this.character);

    this.layerBarriers.setCollisionByProperty({ collides: true });
    this.physics.add.collider(this.character, this.layerBarriers);

    this.layerFloor.setCollisionByProperty({ collides: true });
    this.physics.add.collider(this.character, this.layerFloor);

    this.layerStructure.setCollisionByProperty({ collides: true });
    this.physics.add.collider(this.character, this.layerStructure);

    this.layerDoors.setCollisionByProperty({ collides: true });
    this.physics.add.collider(this.character, this.layerDoors);

    // Coleta de moeda - moeda desaparece quando character encostar
    this.physics.add.overlap(
      this.character,
      this.coin,
      this.collectCoin,
      null,
      this,
    );

    //animações
    //andada
    this.anims.create({
      key: "walk-right",
      frames: this.anims.generateFrameNumbers("character", {
        start: 88,
        end: 95,
      }), //sprites são um a menos que no spritesheet.
      frameRate: 20,
      repeat: -1,
    });

    this.anims.create({
      key: "walk-back",
      frames: this.anims.generateFrameNumbers("character", {
        start: 62,
        end: 68,
      }), //sprites são um a menos que no spritesheet.
      frameRate: 20,
      repeat: -1,
    });

    this.anims.create({
      key: "walk-left",
      frames: this.anims.generateFrameNumbers("character", {
        start: 71,
        end: 77,
      }), //sprites são um a menos que no spritesheet.
      frameRate: 20,
      repeat: -1,
    });

    this.anims.create({
      key: "walk-front",
      frames: this.anims.generateFrameNumbers("character", {
        start: 80,
        end: 86,
      }), //sprites são um a menos que no spritesheet.
      frameRate: 20,
      repeat: -1,
    });

    //parada
    this.anims.create({
      key: "stop-right",
      frames: this.anims.generateFrameNumbers("character", {
        start: 86,
        end: 86,
      }), //sprites são um a menos que no spritesheet.
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "stop-back",
      frames: this.anims.generateFrameNumbers("character", {
        start: 60,
        end: 60,
      }), //sprites são um a menos que no spritesheet.
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "stop-left",
      frames: this.anims.generateFrameNumbers("character", {
        start: 69,
        end: 69,
      }), //sprites são um a menos que no spritesheet.
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "stop-front",
      frames: this.anims.generateFrameNumbers("character", {
        start: 78,
        end: 78,
      }), //sprites são um a menos que no spritesheet.
      frameRate: 10,
      repeat: -1,
    });

    this.physics.world.setBounds(
      0,
      0,
      this.tilemap.widthInPixels,
      this.tilemap.heightInPixels,
    );

    //Joystick
    this.joystick = this.plugins.get("rexvirtualjoystickplugin").add(this, {
      //puxa o plugin do joystick e cria ele
      x: 100,
      y: 350,
      radius: 50,
      base: this.add.circle(0, 0, 50, 0x888888),
      thumb: this.add.circle(0, 0, 25, 0xcccccc),
    });

    this.joystick.on("update", () => {
      //faz o joystick funcionar sempre que ele é atualizado/mexido
      const angle = Phaser.Math.DegToRad(this.joystick.angle);
      const force = this.joystick.force;

      if (force > this.threshold) {
        this.direction = new Phaser.Math.Vector2(
          Math.cos(angle),
          Math.sin(angle),
        ).normalize();
      }

      if (this.joystick.force > 0) {
        this.character.setVelocity(
          this.direction.x * this.speed,
          this.direction.y * this.speed,
        );

        switch (
          true //checa a direção do joystick para tocar a animação correta
        ) {
          case this.joystick.angle >= -45 && this.joystick.angle < 45:
            this.character.play("walk-right");
            break;
          case this.joystick.angle >= 45 && this.joystick.angle < 135:
            this.character.play("walk-front");
            break;
          case this.joystick.angle < -135:
            this.character.play("walk-left");
            break;
          case this.joystick.angle >= -135 && this.joystick.angle < -45:
            this.character.play("walk-back");
            break;
        }
      } else {
        this.character.setVelocity(0, 0);
        this.character.anims.stop();
      }
    });

    //botão de interação
    this.button = this.add //cria o botão de interação
      .sprite(700, 350, "interact_buttom", 10)
      .setInteractive()
      .setScale(2)
      .on("pointerdown", () => {
        //diz o que ele faz
        this.button.setFrame(1);
      })
      .on("pointerup", () => {
        this.button.setFrame(2);
      })
      .setScrollFactor(0); //faz o botão ficar fixo na tela, mesmo quando a câmera se move

    // Adiciona texto na tela
    this.add
      .text(10, 10, "Pontuação:" + this.points, {
        fontSize: "32px",
        fill: "#fff",
      })
      .setScrollFactor(0);
  }

  //Função para coletar a moeda
  collectCoin(character, coin) {
    coin.destroy();
    this.points + 10;
  }

  //texto e pontuação
}

// update() {
//   this.pointsText.setText("Pontuação: " += this.points)
// }; //atualiza o texto da pontuação

export default scene0;