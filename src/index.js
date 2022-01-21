import Phaser from "phaser";
import PreloadScene from "./scenes/Preload"
import PlayScene from "./scenes/Play"

const MAP_WIDTH = 1600
const WIDTH = 1200
const HEIGHT = 600

const SHARED_CONFIG = {
  width: WIDTH,
  height: HEIGHT,
  mapOffset: MAP_WIDTH > WIDTH ? MAP_WIDTH - WIDTH : 0,
  zoomFactor: 1.5,
  debug: true
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
      debug: SHARED_CONFIG.debug

    }
  },
  input: {
    gamepad: true
  },
  scene: initScenes()
};

new Phaser.Game(config);