import config from "./config.js";
import scene0 from "./scene0.js";
import scene1 from "./scene1.js";
import sceneTitle from "./scene_title.js";
import sceneSelection from "./scene_selection.js";

class Game extends Phaser.Game {
  constructor() {
    super(config);
    this.scene.add("scene0", scene0);
    this.scene.add("scene1", scene1);
    this.scene.add("sceneSelection", sceneSelection);
    this.scene.add("sceneTitle", sceneTitle);
    this.scene.start("sceneTitle");

    this.points = 0;
    this.characterplayer1 = 1;
    this.characterplayer2 = 1;

  }
}

window.onload = () => {
  window.game = new Game();
};
