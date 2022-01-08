import Preload from "./Preload"

class Play extends Phaser.Scene {
    constructor() {
        super('PlayScene')
    }

    create() {
        const map = this.createMap()
        const layers = this.createLayers(map)

        this.playerSpeed = 200
        this.player = this.createPlayer()

        this.physics.add.collider(this.player, layers.platformColliders)

        this.cursors = this.input.keyboard.createCursorKeys()

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
        const player = this.physics.add.sprite(100, 250, 'player')
        player.body.setGravityY(500)
        player.setCollideWorldBounds(true)
        return player
    }

    update() {
        const { left, right, space} = this.cursors

        if (left.isDown) {
            this.player.setVelocityX(-this.playerSpeed)
        } else if (right.isDown) {
            this.player.setVelocityX(this.playerSpeed)
        } else {
            this.player.setVelocityX(0)
        }

        if (space.isDown) {
            this.player.setVelocityY(-this.playerSpeed)
        }
    }

}


export default Play