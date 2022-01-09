import Preload from "./Preload"
import Player from "../entities/Player"

class Play extends Phaser.Scene {
    constructor(config) {
        super('PlayScene')
        this.config = config
    }

    create() {
        const map = this.createMap()
        const layers = this.createLayers(map)

        const player = this.createPlayer()

        this.createPlayerColliders(player, {
            colliders: {
                platformsColliders: layers.platformsColliders
            }
        })

        this.setupFollowUpCameraOn(player)

    }

    createMap() {
        const map = this.make.tilemap({ key: 'map' })
        map.addTilesetImage('main_lev_build_1', 'tile-1')
        return map
    }

    createLayers(map) {
        const tileset = map.getTileset('main_lev_build_1')

        const platformsColliders = map.createStaticLayer('platforms_colliders', tileset)
        platformsColliders.setCollisionByProperty({ collides: true }, true)

        const platforms = map.createStaticLayer('platforms', tileset)
        const environment = map.createStaticLayer('environment', tileset)

        return { platforms, environment, platformsColliders }
    }

    createPlayer() {
        return new Player(this, 100, 250)
    }

    createPlayerColliders(player, { colliders }) {
        player.addCollider(colliders.platformsColliders)
    }

    setupFollowUpCameraOn(player) {
        const { width, height, mapOffset, zoomFactor } = this.config
        this.physics.world.setBounds(0, -200, width + mapOffset, height + 200)
        this.cameras.main.setBounds(0, 0, width + mapOffset, height).setZoom(zoomFactor)
        this.cameras.main.startFollow(player)
    }

}


export default Play