import Phaser, { Scale } from "phaser";
import PreloadScene from "./scenes/Preload"
import PlayScene from "./scenes/Play"

const MAP_WIDTH = 1600
const WIDTH = document.body.offsetWidth
const HEIGHT = 600

const SHARED_CONFIG = {
  width: WIDTH,
  height: HEIGHT,
  mapOffset: MAP_WIDTH > WIDTH ? MAP_WIDTH - WIDTH : 0
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