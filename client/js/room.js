class room extends Phaser.Scene {
  constructor() {
    super("room");
    this.qrcodeContainer = document.getElementById("qr-code");
  }

  create() {
    this.add.image(400, 225, "room_background");
    this.game.room = (Math.random() * 10000).toString().split(".")[0];
    this.add.text(50, 50, `${this.game.room}`, {
      fontSize: "32px",
      fill: "#000000",
    });

    new QRCode(this.qrcodeContainer, {
      text: location.href + "?room=" + this.game.room,
      width: 450,
      height: 450,
      ColorDark: "#000000",
      ColorLight: "#ffffff",
    });

    console.log("Joining room:", this.game.room);
    this.game.socket.emit("join-room", this.game.room);

    this.game.socket.on("player-selected", (player) => {
      console.log(
        "Player selected in room:",
        this.game.room,
        "player:",
        player,
      );

      if (player === "pablo") this.game.localPlayer = "pedro";
      else this.game.localPlayer = "pablo";

      this.qrcodeContainer.remove();

      this.scene.stop("room");
      this.scene.start("scene0");
    });
  }
}

export default room;
