class scene0 extends Phaser.Scene {
  walking = false;

  constructor() {
    super("scene0");

    this.threshold = 0.1;
    this.speed = 200;
    this.direction = undefined;
  }

  preload() {
    this.load.spritesheet("character", "assets/placeholder_character.png", {
      frameWidth: 64,
      frameHeight: 64,
    });

    this.load.spritesheet("interact_buttom", "assets/interact_buttom.png", {
      frameWidth: 32,
      frameHeight: 32,
    });

    this.load.plugin(
      "rexvirtualjoystickplugin",
      "rexvirtualjoystickplugin.min.js",
      true
    );
  }



  create() {
    this.character = this.physics.add
      .sprite(400, 225, "character", 20); //cria o personagem

    //animações de andada
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

    //animações de parada
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


    this.joystick = this.plugins.get("rexvirtualjoystickplugin").add(this, { //puxa o plugin do joystik
      x: 100,
      y: 350,
      radius: 50,
      base: this.add.circle(0, 0, 50, 0x888888),
      thumb: this.add.circle(0, 0, 25, 0xcccccc),
    });

    this.joystick.on("update", () => { //faz o joystick funcionar sempre que ele é "atualizado"
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

        switch (true) { //checa a direção do joystick para tocar a animação correta
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
      this.button = this.add
        .sprite(700, 350, "interact_buttom", 10)
        .setInteractive()
        .setScale(2)
        .on("pointerdown", () => {
          this.button.setFrame(1);
        })
        .on("pointerup", () => {
          this.button.setFrame(2);
        });
  }
}

export default scene0;
