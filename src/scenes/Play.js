import Preload from "./Preload"

class Play extends Phaser.Scene {
    constructor() {
        super('PlayScene')
    }

    create() {
        const map = this.createMap()
        const layers = this.createLayers(map)
    }

    createMap() {
        const map = this.make.tilemap({ key: 'map' })
        map.addTilesetImage('main_lev_build_1', 'tile-1')
        return map
    }

    createLayers(map) {
        const tileset = map.getTileset('main_lev_build_1')
        const platforms = map.createStaticLayer('platforms', tileset)
        const environment = map.createStaticLayer('environment', tileset)
        return { platforms, environment }
    }

}


export default Play