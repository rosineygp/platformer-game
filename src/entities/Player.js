import Phaser from "phaser"
import initAnimations from "./anims/PlayerAnims"
import collidable from "../mixins/collidable"

class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'player')

        scene.add.existing(this)
        scene.physics.add.existing(this)

        // Mixins
        Object.assign(this, collidable)

        this.init()
        this.initEvents()
    }

    init() {
        this.gravity = 500
        this.speed = 140

        this.cursors = this.scene.input.keyboard.createCursorKeys()

        this.jumpCount = 0
        this.consecutiveJumps = 1
        this.hasBeenHit = false
        this.bounceVelocity = 250

        this.body.setGravityY(500)
        this.setCollideWorldBounds(true)
        this.setOrigin(0.5, 1)

        this.body.setSize(20, 36)

        initAnimations(this.scene.anims)
    }

    initEvents() {
        this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this)
    }

    update() {
        if (this.hasBeenHit) {
            return
        }

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
            this.setVelocityY(-this.speed * 2)
            this.jumpCount++
            this.play('jump', false)
        }

        if (onFloor) {
            this.jumpCount = 0
        }

        onFloor ?
            this.body.velocity.x !== 0 ?
                this.play('run', true) : this.play('idle', true) :
            this.play('jump', true)
    }

    bounceOff() {
        this.body.touching.right ? 
            this.setVelocityX(-this.bounceVelocity) :
            this.setVelocityX(this.bounceVelocity)

        setTimeout(() => this.setVelocityY(-this.bounceVelocity), 0)
    }

    takesHit(initiator){
        if (this.hasBeenHit) {
            return
        }
        
        this.hasBeenHit = true
        this.bounceOff()
    }


}

export default Player