var config = {
  type: Phaser.AUTO,
  width: 800, //Largura da tela
  height: 450, //Altura da tela
  fps: {
    target: 60,
    forceSetTimeOut: true,
  },
  input : {
    activePointers: true, //Habilita o suporte a gamepad
  },
  parent: "game-container",
  pixelArt: true,
  physics: { //O Phase tem física já implementada
    default: "arcade",
    arcade: {
      gravity: { x: 0, y: 0 }, //1000 é o valor básico da Terra, menor faz ele pular mais, maior faz ele pular menos
      debug: false,
    },
  },
  scale: {
    mode: Phaser.Scale.FIT, //Isso faz o jogo se adaptar a tela, sem distorcer
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
};

export default config;