class scene0 extends Phaser.Scene {
  walking = false;

  constructor() {
    super("scene0");
  }

  preload() {
    this.load.spritesheet("character", "assets/placeholder_character.png", {
      frameWidth: 64,
      frameHeight: 64,
    });
  }



  create() {
    this.character = this.physics.add
      .sprite(400, 225, "character", 20) //cria o personagem
      .setInteractive() //permite clicar no personagem
      .on("pointerdown", () => {
        if (this.walking === true) {
          this.character.play("stop-front"); //toca a animação
          this.character.setVelocityX(0); //para o personagem
          this.walking = false;
        } else {
          this.character.play("walk-right"); //toca a animação
          this.character.setVelocityX(100); //move o personagem para a direita
          this.walking = true;
        }
      });

    this.anims.create({
      key: "walk-right",
      frames: this.anims.generateFrameNumbers("character", {
        start: 87,
        end: 95,
      }), //sprites são um a menos que no spritesheet.
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "stop-front",
      frames: this.anims.generateFrameNumbers("character", {
        start: 20,
        end: 20,
      }), //sprites são um a menos que no spritesheet.
      frameRate: 10,
      repeat: -1,
    });

    this.character.setCollideWorldBounds(true); //impede o personagem de sair da tela
  }
}

export default scene0;
