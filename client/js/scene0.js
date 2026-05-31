class scene0 extends Phaser.Scene {
  walking = false;
  caninteractTergio = false;
  caninteractAirfryer = false;
  caninteractTaulo = false;
  caninteractToi = false;

  constructor() {
    super("scene0");

    this.remotePlayers = [];
    this.threshold = 0.1;
    this.speed = 200;
    this.direction = undefined;
    this.remotePlayers = [];
    this.tergioalive = true;
    this.tauloalive = true;
    this.toialive = true;
    this.coincollected = false;
    this.keycollected = false;
  }

  create() {
    //mapa

    console.log("TAULO:", this.game.tauloalive);
    console.log("TERGIO:", this.game.tergioalive);
    this.dialogCooldown = false;

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
    if (this.game.tergioalive === true) {
      this.professor1 = this.physics.add.sprite(1300, 449, "professor1", 0);
    } //cria o professor térgio
    else {
      this.professor1 = this.physics.add.sprite(
        1300,
        449,
        "professor1_salvo",
        0,
      );
    } //cria o professor térgio salvo, caso ele já tenha sido derrotado

    if (this.game.tauloalive === true) {
      this.professor2 = this.physics.add.sprite(1704, 449, "professor2", 0);
    } //cria o professor taulo
    else {
      this.professor2 = this.physics.add.sprite(
        1704,
        449,
        "professor2_salvo",
        0,
      );
    } //cria o professor taulo salvo, caso ele já tenha sido derrotado

    this.professor3 = this.physics.add.sprite(1740, 1040, "professor3", 0);//cria o professor toi
    this.professor3.setFlipX(true);

    this.inator = this.physics.add.sprite(1854, 449, "inator", 0); //cria o taulo-inator

    const selectionTergioScaleX = 4; // escala horizontal da seleção
    const selectionTergioScaleY = 4; // escala vertical da seleção
    const debugSelectionVisible = true; // deixa visível para debug
    this.selectionTergio = this.physics.add
      .sprite(this.professor1.x, this.professor1.y, "selectionTergio", 0) //cria a caixa de seleção
      .setScale(selectionTergioScaleX, selectionTergioScaleY)
      .setAlpha(debugSelectionVisible ? 0.01 : 0); // meio transparente para facilitar o debug

    const selectionTauloScaleX = 4; // escala horizontal da seleção
    const selectionTauloScaleY = 4; // escala vertical da seleção
    this.selectionTaulo = this.physics.add
      .sprite(this.professor2.x, this.professor2.y, "selectionTaulo", 0) //cria a caixa de seleção
      .setScale(selectionTauloScaleX, selectionTauloScaleY)
      .setAlpha(debugSelectionVisible ? 0.01 : 0); // meio transparente para facilitar o debug
    
    const selectionToiScaleX = 4; // escala horizontal da seleção
    const selectionToiScaleY = 4; // escala vertical da seleção
    this.selectionToi = this.physics.add
      .sprite(this.professor3.x, this.professor3.y, "selectionToi", 0) //cria a caixa de seleção
      .setScale(selectionToiScaleX, selectionToiScaleY)
      .setAlpha(debugSelectionVisible ? 0.01 : 0); // meio transparente para facilitar o debug
    
    if (this.game.localPlayer === "pedro") {
      this.character1 = this.physics.add.sprite(
        1800,
        1500,
        "characterPedro",
        20,
      ); //cria o personagem
    } else if (this.game.localPlayer === "pablo") {
      this.character1 = this.physics.add.sprite(
        1800,
        1500,
        "characterPablo",
        20,
      ); //cria o personagem
    }
    if (!this.game.coinCollected) {
      this.coin = this.physics.add.sprite(1648, 1040, "coin", 0);

      this.physics.add.overlap(
        this.character1,
        this.coin,
        this.collectCoin,
        null,
        this,
      );
    }
    if (!this.game.keyCollected) {
      this.key = this.physics.add.sprite(1648, 1135, "key", 0);

      this.physics.add.overlap(
        this.character1,
        this.key,
        this.collectKey,
        null,
        this,
      );
    }
    this.airfryer = this.physics.add.sprite(1360, 1200, "airfryer", 0); //cria a airfryer
   if (!this.game.keyCollected) {
     this.board1 = this.physics.add.sprite(1584, 657, "board", 0);
     this.board2 = this.physics.add.sprite(1616, 657, "board", 0);

     this.board1.setImmovable(true);
     this.board2.setImmovable(true);

     this.physics.add.collider(this.character1, this.board1);
     this.physics.add.collider(this.character1, this.board2);
   } //cria as placas de segurança se a chave não tiver sido coletada

    this.selectionAirfryer = this.physics.add
      .sprite(this.airfryer.x, this.airfryer.y, "selectionAirfryer", 0) //cria a caixa de seleção
      .setScale(3)
      .setAlpha(debugSelectionVisible ? 0.01 : 0); // meio transparente para facilitar o debug

    //this.layerDoors = this.tilemap.createLayer("doors", [this.tilesetTileset]); //cria as camadas de portas

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

    this.professor2.setImmovable(true);
    this.physics.add.collider(this.character1, this.professor2);

    this.inator.setImmovable(true);
    this.physics.add.collider(this.character1, this.inator);

    this.airfryer.setImmovable(true);
    this.physics.add.collider(this.character1, this.airfryer);

    this.professor3.setImmovable(true);
    this.physics.add.collider(this.character1, this.professor3);

    // Função Coleta de moeda - moeda desaparece quando character encostar
    this.physics.add.overlap(
      this.character1,
      this.coin,
      this.collectCoin,
      null,
      this,
    );

    // Função Coleta de chave - chave desaparece quando character encostar
    this.physics.add.overlap(
      this.character1,
      this.key,
      this.collectKey,
      null,
      this,
    );

    // música
    if (!this.sound.get("hubmusic")) {
      this.hubmusic = this.sound.add("hubmusic", {
        loop: true,
        volume: 0.5,
      });

      this.hubmusic.play();
    }

    //animações
    //andada
    this.anims.create({
      key: "characterPedro-walk-right",
      frames: this.anims.generateFrameNumbers("characterPedro", {
        start: 2,
        end: 5,
      }), //sprites são um a menos que no spritesheet.
      frameRate: 11,
      repeat: -1,
    });

    this.anims.create({
      key: "characterPedro-walk-left",
      frames: this.anims.generateFrameNumbers("characterPedro", {
        start: 8,
        end: 11,
      }), //sprites são um a menos que no spritesheet.
      frameRate: 11,
      repeat: -1,
    });

    //parada
    this.anims.create({
      key: "characterPedro-stop-right",
      frames: this.anims.generateFrameNumbers("characterPedro", {
        start: 86,
        end: 86,
      }), //sprites são um a menos que no spritesheet.
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "characterPedro-stop-left",
      frames: this.anims.generateFrameNumbers("characterPedro", {
        start: 69,
        end: 69,
      }), //sprites são um a menos que no spritesheet.
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "characterPablo-walk-right",
      frames: this.anims.generateFrameNumbers("characterPablo", {
        start: 2,
        end: 5,
      }), //sprites são um a menos que no spritesheet.
      frameRate: 5,
      repeat: -1,
    });

    this.anims.create({
      key: "characterPablo-walk-left",
      frames: this.anims.generateFrameNumbers("characterPablo", {
        start: 8,
        end: 11,
      }), //sprites são um a menos que no spritesheet.
      frameRate: 5,
      repeat: -1,
    });

    //parada
    this.anims.create({
      key: "characterPablo-stop-right",
      frames: this.anims.generateFrameNumbers("characterPablo", {
        start: 0,
        end: 1,
      }), //sprites são um a menos que no spritesheet.
      frameRate: 8,
      repeat: -1,
    });

    this.anims.create({
      key: "characterPablo-stop-left",
      frames: this.anims.generateFrameNumbers("characterPablo", {
        start: 6,
        end: 7,
      }), //sprites são um a menos que no spritesheet.
      frameRate: 8,
      repeat: -1,
    });

    // TÉRGIO NORMAL
    this.anims.create({
      key: "professor1-idle",
      frames: this.anims.generateFrameNumbers("professor1", {
        start: 0,
        end: 2,
      }),
      frameRate: 1,
      repeat: -1,
    });

    // TÉRGIO SALVO
    this.anims.create({
      key: "professor1-salvo-idle",
      frames: this.anims.generateFrameNumbers("professor1_salvo", {
        start: 0,
        end: 2,
      }),
      frameRate: 1,
      repeat: -1,
    });

    // TAULO NORMAL
    this.anims.create({
      key: "professor2-idle",
      frames: this.anims.generateFrameNumbers("professor2", {
        start: 0,
        end: 2,
      }),
      frameRate: 1,
      repeat: -1,
    });

    // TAULO SALVO
    this.anims.create({
      key: "professor2-salvo-idle",
      frames: this.anims.generateFrameNumbers("professor2_salvo", {
        start: 0,
        end: 2,
      }),
      frameRate: 1,
      repeat: -1,
    });

    // TOI NORMAL
    this.anims.create({
      key: "professor3-idle",
      frames: this.anims.generateFrameNumbers("professor3", {
        start: 0,
        end: 2,
      }),
      frameRate: 1,
      repeat: -1,
    }); 
      
    if (this.game.tergioalive === true) {
      this.professor1.play("professor1-idle");
    } else {
      this.professor1.play("professor1-salvo-idle");
    }

    // toca animação do Taulo
    if (this.game.tauloalive === true) {
      this.professor2.play("professor2-idle");
    } else {
      this.professor2.play("professor2-salvo-idle");
    }

    // toca animação do Toi
 this.professor3.play("professor3-idle");

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
          this.character1.play(
            this.game.localPlayer === "pedro"
              ? "characterPedro-walk-right"
              : "characterPablo-walk-right",
          );
        } else {
          this.character1.play(
            this.game.localPlayer === "pedro"
              ? "characterPedro-walk-left"
              : "characterPablo-walk-left",
          );
        }
      } else {
        this.character1.setVelocity(0, 0);
        this.character1.anims.stop();
      }
    });

    //botão de interação
    this.button = this.add
      .sprite(700, 350, "interact_buttom", 1)
      .setInteractive()
      .setScale(2)
      .on("pointerdown", () => {
        this.button.setFrame(1);

        // TÉRGIO VIVO
        if (this.caninteractTergio === true && this.game.tergioalive === true) {
          this.scene.stop("scene0");
          this.scene.start("scene1");
        }

        // TÉRGIO DERROTADO
        else if (
          this.caninteractTergio === true &&
          this.game.tergioalive === false
        ) {
          if (this.dialogCooldown) return;
          this.dialogCooldown = true;

          const dialog = this.add.text(
            this.professor1.x + 60,
            this.professor1.y - 67,
            "Térgio:\n'Obrigado por me ajudar.\nE lembrem...\no poder é de vocês.'",
            {
              fontSize: "16px",
              fill: "#ffffff",
              backgroundColor: "#000000",
              padding: {
                x: 10,
                y: 10,
              },
              wordWrap: { width: 220 },
            },
          );

          this.time.delayedCall(5000, () => {
            dialog.destroy();
            this.dialogCooldown = false;
          });
        }

        // TAULO VIVO
        else if (
          this.caninteractTaulo === true &&
          this.game.tauloalive === true
        ) {
          this.scene.stop("scene0");
          this.scene.start("scene2");
        }

          // TAULO DERROTADO
          else if (
  this.caninteractTaulo === true &&
  this.game.tauloalive === false
) {
  if (this.dialogCooldown) return;
  this.dialogCooldown = true;

  const dialog = this.add.text(
    this.professor2.x - 167,
    this.professor2.y - 120,
    "Taulo:\n'Tentarei não explodir\nmais nada por aqui.\nObrigado pela ajuda.'",
    {
      fontSize: "16px",
      fill: "#ffffff",
      backgroundColor: "#000000",
      padding: {
        x: 10,
        y: 10,
      },
      wordWrap: { width: 220 },
    },
  );

  this.time.delayedCall(5000, () => {
    dialog.destroy();
    this.dialogCooldown = false;
  });
}

       // TOI
else if (this.caninteractToi === true) {
  if (this.dialogCooldown) return;
          this.dialogCooldown = true;


          console.log(this.game.tergioalive, this.game.tauloalive);

  let dialogs = [];

  // Nenhum professor derrotado
  if (
    this.game.tergioalive === true &&
    this.game.tauloalive === true
  ) {
    dialogs = [
      "Toi:\nOlá alunos!",
      "Nosso campus foi invadido por alienígenas controladores de mentes.",
      "Descobri que chapéus de alumínio quebram o controle mental.",
      "Derrotem os professores nos desafios deles.",
      "Quando estiverem fracos, coloquem os chapéus neles.",
      "Boa sorte!"
    ];
  }

  // Apenas Térgio derrotado
  else if (
    this.game.tergioalive === false &&
    this.game.tauloalive === true
  ) {
    dialogs = [
      "Toi:\nVocês derrotaram o Térgio?",
      "Aluno:\nSim, mas no meio do quiz ele começou a fazer perguntas estranhas.",
      "Perguntas que nem eram de matemática.",
      "Toi:\n...Estranho.",
      "Esse realmente deveria ser apenas um quiz para gênios.",
      "Agora vão derrotar o Taulo!"
    ];
  }

  // Apenas Taulo derrotado
  else if (
    this.game.tergioalive === true &&
    this.game.tauloalive === false
  ) {
    dialogs = [
      "Toi:\nDerrotaram o Taulo?",
      "Aluno:\nSim, ele estava completamente maluco tentando explodir planetas.",
      "Toi:\nNossa.",
      "Espero que vocês não tenham explodido a Terra.",
      "Agora vão derrotar o Térgio!"
    ];
  }

  // Ambos derrotados
  else if (
    this.game.tergioalive === false &&
    this.game.tauloalive === false
  ) {
    dialogs = [
      "Toi:\nVocês conseguiram!",
      "Os dois professores estão livres do controle mental.",
      "Parece que os chapéus de alumínio realmente funcionaram.",
      "Obrigado por salvarem eles!",
      "E lembrem...\no poder é de vocês."
    ];
  }

  let index = 0;

  const dialog = this.add.text(
    this.professor3.x - 170,
    this.professor3.y - 120,
    dialogs[index],
    {
      fontSize: "16px",
      fill: "#ffffff",
      backgroundColor: "#000000",
      padding: {
        x: 10,
        y: 10,
      },
      wordWrap: { width: 260 },
    },
  );

  const nextDialog = () => {
    index++;

    if (index >= dialogs.length) {
      dialog.destroy();
      this.dialogCooldown = false;
      return;
    }

    dialog.setText(dialogs[index]);

    this.time.delayedCall(5000, nextDialog);
  };

  this.time.delayedCall(5000, nextDialog);
        }
        // AIRFRYER
        else if (this.caninteractAirfryer === true) {
          if (this.dialogCooldown) return;
          this.dialogCooldown = true;

          const dialog = this.add.text(
            this.character1.x + 6.7,
            this.character1.y - 67,
            "Uma airfryer\nda Equipe Rocket!",
            {
              fontSize: "16px",
              fill: "#ffffff",
              backgroundColor: "#000000",
              padding: {
                x: 10,
                y: 10,
              },
              align: "center",
            },
          );

          this.time.delayedCall(3000, () => {
            dialog.destroy();
            this.dialogCooldown = false;
          });
        }
      })

      .on("pointerup", () => {
        this.button.setFrame(2);
      })

      .setScrollFactor(0); // faz o botão ficar fixo na tela, não seguindo a câmera

    // Adiciona texto na tela
    this.pointsText = this.add
      .text(
        300,
        10,
        "Pontuação:" + (this.game.points + this.game.tergiopoints),
        {
          fontSize: "32px",
          fill: "#fff",
        },
      )
      .setScrollFactor(0);

    this.game.socket.on("scene0", (state) => {
      if (state.player) {
        try {
          if (state.player.id === this.game.socket.id) return;

          const animationKey = state.player.animation;

          let remotePlayer = this.remotePlayers.find(
            (p) => p.id === state.player.id,
          );

          if (!remotePlayer) {
            const sprite = this.add.sprite(
              state.player.x,
              state.player.y,
              state.player.texture,
              state.player.frame,
            );

            remotePlayer = {
              id: state.player.id,
              sprite,
            };
            this.remotePlayers.push(remotePlayer);
          }

          remotePlayer.sprite.setPosition(state.player.x, state.player.y);

          if (state.player.animation)
            remotePlayer.sprite.play(state.player.animation, true);
          else remotePlayer.sprite.anims.stop();
        } catch (e) {
          console.log(this.remotePlayers);
          console.error("Error updating remote player:", e);
        }
      }
    });

    //    this.cameras.main.setZoom(2); //aumenta o zoom da câmera para 2x, deixando o mapa maior e mais visível
  }

  update() {
    //Sincronização de posição do personagem com o servidor
    try {
      this.game.socket.emit("scene0", this.game.room, {
        player: {
          id: this.game.socket.id,
          x: this.character1.x,
          y: this.character1.y,
          texture: this.character1.texture.key,
          animation: this.character1.anims.isPlaying
            ? this.character1.anims.currentAnim.key
            : null,
        },
      });
    } catch (e) {
      console.error("Error updating player:", e);
    }

    //função de interação com o professor
    const character1Bounds = this.character1.getBounds();
    const tergioBounds = this.selectionTergio.getBounds();
    const tauloBounds = this.selectionTaulo.getBounds();
    const toiBounds = this.selectionToi.getBounds();
    const airfryerBounds = this.selectionAirfryer.getBounds();

    if (
      Phaser.Geom.Intersects.RectangleToRectangle(
        character1Bounds,
        tergioBounds,
      )
    ) {
      this.caninteractTergio = true;
    } else {
      this.caninteractTergio = false;
    }

    if (
      Phaser.Geom.Intersects.RectangleToRectangle(character1Bounds, tauloBounds)
    ) {
      this.caninteractTaulo = true;
    } else {
      this.caninteractTaulo = false;
    }

    if (
      Phaser.Geom.Intersects.RectangleToRectangle(character1Bounds, toiBounds)
    ) {
      this.caninteractToi = true;
    } else {
      this.caninteractToi = false;
    }
    
    if (
      Phaser.Geom.Intersects.RectangleToRectangle(
        character1Bounds,
        airfryerBounds,
      )
    ) {
      this.caninteractAirfryer = true;
    } else {
      this.caninteractAirfryer = false;
    }
  }

  //Função para coletar a moeda
  collectCoin(character1, coin) {
    this.game.coinCollected = true;

    coin.destroy();

    this.game.points += 10;

    this.pointsText.setText(
      "Pontuação:" + (this.game.points + this.game.tergiopoints),
    );
  }

  //Função para coletar a chave
  collectKey(character1, key) {
    this.game.keyCollected = true;

    key.destroy();

     this.board1.destroy();
     this.board2.destroy();

    if (!this.game.keyCollected) {
      this.key = this.physics.add.sprite(1648, 1135, "key", 0);

      this.board1 = this.physics.add.sprite(1584, 657, "board", 0);
      this.board2 = this.physics.add.sprite(1616, 657, "board", 0);

      this.board1.setImmovable(true);
      this.board2.setImmovable(true);

      this.physics.add.collider(this.character1, this.board1);
      this.physics.add.collider(this.character1, this.board2);

      this.physics.add.overlap(
        this.character1,
        this.key,
        this.collectKey,
        null,
        this,
      );
    }
  }
}

export default scene0;
