import Preload from "./Preload"

class Play extends Phaser.Scene {
    constructor() {
        super('PlayScene')
    }

    create() {
        const map = this.createMap()
        const layers = this.createLayers(map)

        const player = this.createPlayer()

        this.physics.add.collider(player, layers.platforms)
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

        platforms.setCollisionByExclusion(-1, true)

        return { platforms, environment }
    }

    createPlayer() {
        const player = this.physics.add.sprite(100, 250, 'player')
        player.body.setGravityY(500)
        player.setCollideWorldBounds(true)
        return player
    }

}


export default Play