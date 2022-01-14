import Phaser from "phaser"
import collidable from "../mixins/collidable"

class Enemy extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, key) {
        super(scene, x, y, key)

        scene.add.existing(this)
        scene.physics.add.existing(this)

        Object.assign(this, collidable)

        this.init()
        this.initEvents()
    }

    init() {
        this.gravity = 500
        this.speed = 50
        this.timeFromLastTurn = 0
        this.platformsCollidersLayer = null
        this.rayGraphics = this.scene.add.graphics({
            lineStyle: {
                width: 2,
                color: 0xaa00aa
            }
        })

        this.body.setGravityY(500)
        this.setCollideWorldBounds(true)
        this.setOrigin(0.5, 1)

        this.setImmovable(true)
        this.setSize(20, 45)
        this.setOffset(7, 20)

        this.setVelocityX(this.speed)
    }

    initEvents() {
        this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this)
    }

    update(time, delta) {
        // this.setVelocityX(30)
        const { ray, hasHit } = this.raycast(this.body, this.platformsCollidersLayer, 30, 1)

        if (!hasHit && this.timeFromLastTurn + 100 < time) {
            this.setFlipX(!this.flipX)
            this.setVelocityX(this.speed = -this.speed)
            this.timeFromLastTurn = time
        }

        this.rayGraphics.clear()
        this.rayGraphics.strokeLineShape(ray)
    }

    setPlatformsColliders(platformsCollidersLayer) {
        this.platformsCollidersLayer = platformsCollidersLayer
    }


}

export default Enemy