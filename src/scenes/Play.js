import Preload from "./Preload"
import Player from "../entities/Player"

class Play extends Phaser.Scene {
    constructor() {
        super('PlayScene')
    }

    create() {
        const map = this.createMap()
        const layers = this.createLayers(map)

        const player = this.createPlayer()

        this.physics.add.collider(player, layers.platformColliders)   

    }

    createMap() {
        const map = this.make.tilemap({ key: 'map' })
        map.addTilesetImage('main_lev_build_1', 'tile-1')
        return map
    }

    createLayers(map) {
        const tileset = map.getTileset('main_lev_build_1')

        const platformColliders = map.createStaticLayer('platforms_colliders', tileset)
        platformColliders.setCollisionByProperty({collides: true}, true)
        
        const platforms = map.createStaticLayer('platforms', tileset)
        const environment = map.createStaticLayer('environment', tileset)
        
        return { platforms, environment, platformColliders }
    }

    createPlayer() {
        return new Player(this, 100, 250)
    }

    update(){
        
    }

}


export default Play