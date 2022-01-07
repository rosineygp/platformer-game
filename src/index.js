import Phaser, { Scale } from "phaser";
import PreloadScene from "./scenes/Preload"
import PlayScene from "./scenes/Play"

const WIDTH = 1280
const HEIGHT = 600
const BIRD_POSITION = {
  x: HEIGHT * 0.1,
  y: HEIGHT / 2
}
const SHARED_CONFIG = {
  width: WIDTH,
  height: HEIGHT,
  startPosition: BIRD_POSITION
}

const Scenes = [
  PreloadScene,
  PlayScene
]

const initScenes = () => Scenes.map((Scene) => new Scene(SHARED_CONFIG))

const config = {
  type: Phaser.AUTO,
  ...SHARED_CONFIG,
  pixelArt: true,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
  physics: {
    default: 'arcade',
    arcade: {
      // gravity: { y: 200 },
      debug: true

    }
  },
  scene: initScenes()
};

new Phaser.Game(config);