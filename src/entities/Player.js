import Phaser from "phaser"
import initAnimations from "./PlayerAnims"

class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'player')

        scene.add.existing(this)
        scene.physics.add.existing(this)

        this.init()
        this.initEvents()
    }

    init() {
        this.gravity = 500
        this.speed = 200

        this.cursors = this.scene.input.keyboard.createCursorKeys()

        this.jumpCount = 0
        this.consecutiveJumps = 1

        this.body.setGravityY(500)
        this.setCollideWorldBounds(true)

        initAnimations(this.scene.anims)
    }

    initEvents() {
        this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this)
    }

    update() {
        const { left, right, space } = this.cursors
        const isSpaceJustDown = Phaser.Input.Keyboard.JustDown(space)

        const onFloor = this.body.onFloor()

        if (left.isDown) {
            this.setVelocityX(-this.speed)
            this.setFlipX(true)
        } else if (right.isDown) {
            this.setVelocityX(this.speed)
            this.setFlipX(false)
        } else {
            this.setVelocityX(0)
        }

        if (isSpaceJustDown && (onFloor || this.jumpCount < this.consecutiveJumps)) {
            this.setVelocityY(-this.speed * 1.5)
            this.jumpCount++
        }

        if (onFloor) {
            this.jumpCount = 0
        }

        this.body.velocity.x !== 0 ? this.play('run', true) : this.play('idle', true)
    }
}

export default Player