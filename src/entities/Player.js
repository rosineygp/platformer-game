import Phaser from "phaser"

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

        this.body.setGravityY(500)
        this.setCollideWorldBounds(true)

        this.scene.anims.create({
            key: 'run',
            frames: this.scene.anims.generateFrameNames('player', {start: 11, end: 16}),
            frameRate: 8,
            repeat: -1
        })
    }

    initEvents() {
        this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this)
    }

    update() {
        const { left, right, space } = this.cursors

        if (left.isDown) {
            this.setVelocityX(-this.speed)
        } else if (right.isDown) {
            this.setVelocityX(this.speed)
        } else {
            this.setVelocityX(0)
        }

        if (space.isDown) {
            this.setVelocityY(-this.speed)
        }

        this.play('run', true)
    }
}

export default Player