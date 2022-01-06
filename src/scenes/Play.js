import Preload from "./Preload"

class Play extends Phaser.Scene {
    constructor () {
        super('PlayScene')
    }

    create() {
        const map = this.make.tilemap({key: 'map'})
        const tileset1 = map.addTilesetImage('main_lev_build_1', 'tile-1')
        // const tileset2 = map.addTilesetImage('main_lev_build_2', 'tile-2')

        
        map.createStaticLayer('platforms', tileset1)
        map.createStaticLayer('environment', tileset1)
    }

}


export default Play