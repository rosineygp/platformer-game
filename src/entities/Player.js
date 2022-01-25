import Phaser from "phaser"
import HealthBar from "../hud/HealthBar"
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

        this.pad = null
        this.buttonDown = false

        this.scene.input.gamepad.once('connected', (pad) => {
            this.pad = pad
        })

        this.health = 100

        // this.hp = new HealthBar(
        //     this.scene, 
        //     this.scene.config.leftTopCorner.x, 
        //     this.scene.config.leftTopCorner.y, 
        //     this.health
        // )



        // this.scene.input.gamepad.on('down', pad => {
        //     this.buttonDown = true
        //     console.log('down')
        // })

        // this.scene.input.gamepad.on('up', pad => {
        //     this.buttonDown = false
        //     console.log('up')
        // })

        this.jumpCount = 0
        this.consecutiveJumps = 1
        this.hasBeenHit = false
        this.bounceVelocity = 250

        this.body.setGravityY(500)
        this.setCollideWorldBounds(true)
        this.setOrigin(0.5, 1)

        this.body.setSize(20, 36)

        initAnimations(this.scene.anims)

        this.hp = null

        this.hp =  new HealthBar(
            this.scene, 
            this.scene.config.leftTopCorner.x, 
            this.scene.config.leftTopCorner.y, 
            this.health
        )
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
        let pad = this.pad

        if (!pad) {
            pad = {
                left: false,
                right: false,
                A: false
            }
        }

        const onFloor = this.body.onFloor()

        if (left.isDown || pad.left) {
            this.setVelocityX(-this.speed)
            this.setFlipX(true)
        } else if (right.isDown || pad.right) {
            this.setVelocityX(this.speed)
            this.setFlipX(false)
        } else {
            this.setVelocityX(0)
        }

        // console.log(this.buttonDown)

        if ((isSpaceJustDown || pad.A) && (onFloor || this.jumpCount < this.consecutiveJumps)) {

            // debugger
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

    playDamageTween() {
        return this.scene.tweens.add({
            targets: this,
            duration: 100,
            repeat: -1,
            tint: 0xffffff
        })
    }

    bounceOff() {
        this.body.touching.right ?
            this.setVelocityX(-this.bounceVelocity) :
            this.setVelocityX(this.bounceVelocity)

        setTimeout(() => this.setVelocityY(-this.bounceVelocity), 0)
    }

    takesHit(initiator) {
        if (this.hasBeenHit) {
            return
        }

        this.hasBeenHit = true
        this.bounceOff()

        const hitAnim = this.playDamageTween()

        this.scene.time.delayedCall(1000, () => {
            this.hasBeenHit = false
            hitAnim.stop()
            this.clearTint()
        })

        this.padHitVibration(this.pad, 0, 300, 0.4, 0.1)

    }

    padHitVibration(pad, delay = 0, duration = 1000, weakMagnitude = 0.5, strongMagnitude = 0.5) {
        if (!pad) {
            return
        }

        pad.vibration.playEffect('dual-rumble', {
            startDelay: delay,
            duration: duration,
            weakMagnitude: weakMagnitude,
            strongMagnitude: strongMagnitude,
        });

        console.log(pad)
    }


}

export default Player