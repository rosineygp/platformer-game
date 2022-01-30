import Phaser from "phaser"
import HealthBar from "../hud/HealthBar"
import initAnimations from "./anims/PlayerAnims"
import collidable from "../mixins/collidable"
import Projectiles from "../attacks/Projectiles"
import Projectile from "../attacks/Projectile"

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

        this.projectiles = new Projectiles(this.scene)

        this.pad = null
        this.buttonDown = false

        this.scene.input.gamepad.once('connected', (pad) => {
            this.pad = pad
            pad.on('up', (x, button, value) => {
                console.log(x)
                console.log(button)
                console.log(value)
            })
        })

        this.health = 100

        this.jumpCount = 0
        this.consecutiveJumps = 1
        this.hasBeenHit = false
        this.bounceVelocity = 250

        this.body.setGravityY(500)
        this.setCollideWorldBounds(true)
        this.setOrigin(0.5, 1)

        this.body.setSize(20, 36)

        this.hp = new HealthBar(
            this.scene,
            200,
            200,
            2,
            this.health
        )

        initAnimations(this.scene.anims)

        this.scene.input.keyboard.on('keydown-Q', () => {
            this.projectiles.fireProjectile()
        })
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

        if (isSpaceJustDown && (onFloor || this.jumpCount < this.consecutiveJumps)) {

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

        this.health -= initiator.damage
        this.hp.decrease(this.health)

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