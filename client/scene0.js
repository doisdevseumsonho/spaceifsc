class scene0 extends Phaser.Scene {
  walking = false;
  caninteractTergio = false;

  constructor() {
    super("scene0");

    this.remotePlayers = [];
    this.threshold = 0.1;
    this.speed = 200;
    this.direction = undefined;
    this.remotePlayers = [];
  }

  preload() {
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
    }

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

    this.load.plugin(
      "rexvirtualjoystickplugin",
      "../rexvirtualjoystickplugin.min.js",
      true,
    );

    this.load.audio("hubmusic", "sounds/placeholder_hubmusic.mp3");
  }

  create() {
    //mapa
    this.tilemap = this.make.tilemap({ key: "map" }); //cria o mapa

    this.tilesetTileset = this.tilemap.addTilesetImage("tileset"); //adiciona o tileset ao mapa, puxando ele pelo nome que tá no Tiled

    this.layerBackground = this.tilemap.createLayer("background", [
      this.tilesetTileset,
    ]); //cria as camadas de fundo
    this.layerFloor = this.tilemap.createLayer("floor", [this.tilesetTileset]); //cria as camadas de chão
    this.layerStructure1 = this.tilemap.createLayer("structure1", [
      this.tilesetTileset,
    ]); //cria as camadas de estrutura
    this.layerStructure2 = this.tilemap.createLayer("structure2", [
      this.tilesetTileset,
    ]); //cria as camadas de estrutura
    this.professor1 = this.physics.add.sprite(752, 385, "professor1", 0); //cria o professor

    const selectionTergioScaleX = 4; // escala horizontal da seleção
    const selectionTergioScaleY = 4; // escala vertical da seleção
    const debugSelectionVisible = true; // deixa visível para debug
    this.selectionTergio = this.physics.add
      .sprite(this.professor1.x, this.professor1.y, "selectionTergio", 0) //cria a caixa de seleção
      .setScale(selectionTergioScaleX, selectionTergioScaleY)
      .setVisible(debugSelectionVisible)
      .setAlpha(debugSelectionVisible ? 0.01 : 0); // meio transparente para facilitar o debug

    this.character1 = this.physics.add.sprite(1800, 1500, "character1", 20); //cria o personagem
    this.coin = this.physics.add.sprite(2000, 1712, "coin", 0); //cria a moeda
    this.layerDoors = this.tilemap.createLayer("doors", [this.tilesetTileset]); //cria as camadas de portas

    //colisões
    this.character1.setCollideWorldBounds(true); //impede o personagem de sair da tela

    this.cameras.main.setBounds(
      0,
      0,
      this.tilemap.widthInPixels,
      this.tilemap.heightInPixels,
    );
    this.cameras.main.startFollow(this.character1);

    this.layerBackground.setCollisionByProperty({ collides: true });
    this.physics.add.collider(this.character1, this.layerBackground);

    this.layerFloor.setCollisionByProperty({ collides: true });
    this.physics.add.collider(this.character1, this.layerFloor);

    this.layerStructure1.setCollisionByProperty({ collides: true });
    this.physics.add.collider(this.character1, this.layerStructure1);

    this.layerStructure2.setCollisionByProperty({ collides: true });
    this.physics.add.collider(this.character1, this.layerStructure2);

    this.professor1.setImmovable(true);
    this.physics.add.collider(this.character1, this.professor1);

    // Função Coleta de moeda - moeda desaparece quando character encostar
    this.physics.add.overlap(
      this.character1,
      this.coin,
      this.collectCoin,
      null,
      this,
    );

    //música
    this.hubmusic = this.sound
      .add("hubmusic", { loop: true, volume: 0.5 })
      .play();

    //animações
    //andada
    if (this.game.characterplayer1 === 1) {
      this.anims.create({
        key: "walk-right",
        frames: this.anims.generateFrameNumbers("character1", {
          start: 2,
          end: 5,
        }), //sprites são um a menos que no spritesheet.
        frameRate: 11,
        repeat: -1,
      });

      this.anims.create({
        key: "walk-left",
        frames: this.anims.generateFrameNumbers("character1", {
          start: 8,
          end: 11,
        }), //sprites são um a menos que no spritesheet.
        frameRate: 11,
        repeat: -1,
      });

      //parada
      this.anims.create({
        key: "stop-right",
        frames: this.anims.generateFrameNumbers("character1", {
          start: 86,
          end: 86,
        }), //sprites são um a menos que no spritesheet.
        frameRate: 10,
        repeat: -1,
      });

      this.anims.create({
        key: "stop-left",
        frames: this.anims.generateFrameNumbers("character1", {
          start: 69,
          end: 69,
        }), //sprites são um a menos que no spritesheet.
        frameRate: 10,
        repeat: -1,
      });
    } else if (this.game.characterplayer1 === 2) {
      this.anims.create({
        key: "walk-right",
        frames: this.anims.generateFrameNumbers("character1", {
          start: 2,
          end: 5,
        }), //sprites são um a menos que no spritesheet.
        frameRate: 5,
        repeat: -1,
      });

      this.anims.create({
        key: "walk-left",
        frames: this.anims.generateFrameNumbers("character1", {
          start: 8,
          end: 11,
        }), //sprites são um a menos que no spritesheet.
        frameRate: 5,
        repeat: -1,
      });

      //parada
      this.anims.create({
        key: "stop-right",
        frames: this.anims.generateFrameNumbers("character1", {
          start: 0,
          end: 1,
        }), //sprites são um a menos que no spritesheet.
        frameRate: 8,
        repeat: -1,
      });

      this.anims.create({
        key: "stop-left",
        frames: this.anims.generateFrameNumbers("character1", {
          start: 6,
          end: 7,
        }), //sprites são um a menos que no spritesheet.
        frameRate: 8,
        repeat: -1,
      });
    }

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
        this.character1.setVelocity(
          this.direction.x * this.speed,
          this.direction.y * this.speed,
        );

        const angle = this.joystick.angle;
        if (angle > -90 && angle < 90) {
          this.character1.play("walk-right");
        } else {
          this.character1.play("walk-left");
        }
      } else {
        this.character1.setVelocity(0, 0);
        this.character1.anims.stop();
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
        if (this.caninteractTergio === true) {
          this.scene.stop("scene0");
          this.scene.start("scene1");
        }
      })
      .on("pointerup", () => {
        this.button.setFrame(2);
      })
      .setScrollFactor(0); //faz o botão ficar fixo na tela, mesmo quando a câmera se move

    // Adiciona texto na tela
    this.pointsText = this.add
      .text(300, 10, "Pontuação:" + this.game.points, {
        fontSize: "32px",
        fill: "#fff",
      })
      .setScrollFactor(0);

    this.game.socket.on("scene0", (state) => {
      if (state.character) {
        try {
          if (state.character.id === this.game.socket.id) return;

          let remotePlayer = this.remotePlayers.find(
            (p) => p.id === state.character.id,
          );

          if (!remotePlayer) {
            remotePlayer = this.add.sprite(
              state.character.x,
              state.character.y,
              "character",
              0,
            );
            this.remotePlayers.push({
              id: state.character.id,
              sprite: remotePlayer,
            });
          }

          remotePlayer.sprite.setPosition(state.character.x, state.character.y);
          remotePlayer.sprite.setTexture(
            state.character.texture,
            state.character.frame,
          );
        } catch (e) {
          console.log(this.remotePlayers);
          console.error("Error updating remote player:", e);
        }
      }
    });
  }

  update() {
    //Sincronização de posição do personagem com o servidor
    try {
      this.game.socket.emit("scene0", this.game.room, {
        character: {
          id: this.game.socket.id,
          x: this.character1.x,
          y: this.character1.y,
          texture: "character1",
          animation: this.character1.anims.currentAnim
            ? this.character1.anims.currentAnim.key
            : "stop-right",
          frame: this.character1.anims.currentFrame.dex,
        },
      });
    } catch (e) {
      console.error("Error updating player:", e);
    }

    //função de interação com o professor
    const character1Bounds = this.character1.getBounds();
    const tergioBounds = this.selectionTergio.getBounds();

    if (
      Phaser.Geom.Intersects.RectangleToRectangle(
        character1Bounds,
        tergioBounds,
      )
    ) {
      this.caninteractTergio = true;
    } else {
      // o que fazer quando NÃO houver sobreopsição
      this.caninteractTergio = false;
    }
  }

  //Função para coletar a moeda
  collectCoin(character1, coin) {
    coin.destroy();
    this.game.points = this.game.points + 10;
    this.pointsText.setText("Pontuação:" + this.game.points);
  }
}

export default scene0;
