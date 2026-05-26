class scene_selection extends Phaser.Scene {
  constructor() {
    super("scene_selection");
  }

  create() {
 //   this.imagemPedro = this.physics.add
  //    .sprite(600, 250, "imagem_pedro", 5)
 //     .setScale(-1,1);
//    this.imagemPablo = this.physics.add
 //     .sprite(200, 250, "imagem_pablo", 0)
 //     .setScale(1);
    this.selectionMenu = this.add.sprite(400, 240, "selectionmenu", 0);
    
    const selectionboxpedroScaleX = 4; // escala horizontal da seleção
    const selectionboxpedroScaleY = 8; // escala vertical da seleção
    const debugselectionboxpedroVisible = true;
    this.selection_box_pedro = this.add //cria o botão de interação
      .sprite(600, 250, "selection_box_pedro", 1)
      .setInteractive()
      .setScale(selectionboxpedroScaleX, selectionboxpedroScaleY)
      .setVisible(debugselectionboxpedroVisible)
      .setAlpha(debugselectionboxpedroVisible ? 0.01 : 0) // meio transparente para facilitar o debug
      .on("pointerdown", () => {
        this.game.localPlayer = "pedro";
        this.game.socket.emit(
          "select-player",
        this.game.room,
        this.game.localPlayer
        );
        this.game.characterplayer1 = 1;
        this.scene.stop("sceneSelection");
        this.scene.start("scene0");
      })
      .on("pointerup", () => {
      })
    
    const selectionboxpabloScaleX = 4; // escala horizontal da seleção
    const selectionboxpabloScaleY = 8; // escala vertical da seleção
    const debugselectionboxpabloVisible = true;
    this.selection_box_pablo = this.add //cria o botão de interação
      .sprite(200, 250, "selection_box_pablo", 1)
      .setInteractive()
      .setScale(selectionboxpabloScaleX, selectionboxpabloScaleY)
      .setVisible(debugselectionboxpabloVisible)
      .setAlpha(debugselectionboxpabloVisible ? 0.01 : 0) // meio transparente para facilitar o debug
      .on("pointerdown", () => {
        this.game.localPlayer = "pablo";
        this.game.socket.emit(
          "select-player",
        this.game.room,
        this.game.localPlayer
        );
        this.game.characterplayer1 = 2;
        this.scene.stop("sceneSelection");
        this.scene.start("scene0");
      })
      .on("pointerup", () => {});
  }

  update() {
    
  }
}
export default scene_selection;
