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

    this.load.spritesheet("character", "characters/placeholder_character.png", {
      frameWidth: 32,
      frameHeight: 64,
    });

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

    this.load.spritesheet("selection", "characters/selection_box.png", {
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
    this.professor1 = this.physics.add.sprite(1850, 1700, "professor1", 0); //cria o professor
    
    const selectionScaleX = 4; // escala horizontal da seleção
    const selectionScaleY = 4; // escala vertical da seleção
    this.selection = this.add
      .sprite(1850, 1700, "selection", 0) //cria a caixa de seleção
      .setScale(selectionScaleX, selectionScaleY)
      .setVisible(false); // torna a caixa de seleção invisível

    this.character = this.physics.add.sprite(1800, 1500, "character", 20); //cria o personagem
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

    this.professor1.setImmovable(true);
    this.physics.add.collider(this.character, this.professor1);

    // Função Coleta de moeda - moeda desaparece quando character encostar
    this.physics.add.overlap(
      this.character,
      this.coin,
      this.collectCoin,
      null,
      this,
    );

    // Função Área de Interação
    this.physics.add.overlap(
      this.character,
      this.selection,
      this.interact,
      null,
      this
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

    this.anims.create({
      key: "professor1-idle",
      frames: this.anims.generateFrameNumbers("professor1", {
        start: 0,
        end: 2,
      }), //sprites são um a menos que no spritesheet.
      frameRate: 1,
      repeat: -1,
    });

    this.professor1.play("professor1-idle");

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
      .sprite(700, 350, "interact_buttom", 1)
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
    this.pointsText = this.add
      .text(300, 10, "Pontuação:" + this.points, {
        fontSize: "32px",
        fill: "#fff",
      })
      .setScrollFactor(0);
  }

  //Função para coletar a moeda
  collectCoin(character, coin) {
    coin.destroy();
    this.points = this.points + 10;
    this.pointsText.setText("Pontuação:" + this.points);
  }

  //Função para interagir com o professor

  //texto e pontuação
}

export default scene0;