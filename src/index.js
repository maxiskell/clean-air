import Phaser from "phaser"

import PlayScene from "./PlayScene"

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 350,
  pixelArt: true,
  backgroundColor: "#81cbcc",
  physics: {
    default: "arcade",
    arcade: {
      debug: false,
    },
  },
  scene: [PlayScene],
}

new Phaser.Game(config)
