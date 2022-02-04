import Phaser from "phaser"
import EffectManager from "../effects/EffectManager"

class Projectile extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, key) {
        super(scene, x, y, key)

        scene.add.existing(this)
        scene.physics.add.existing(this)

        this.speed = 300
        this.maxDistance = 300
        this.traveledDistance = 0

        this.damage = 10
        this.cooldown = 500

        this.effectManager = new EffectManager(this.scene)
    }

    preUpdate(time, delta) {
        super.preUpdate(time, delta)

        this.traveledDistance += this.body.deltaAbsX()

        if (this.isOutOfRange()) {
            this.body.reset(0,0)
            this.traveledDistance = 0
            this.activeProjectile(false)
        }
    }

    fire(x, y) {
        this.body.reset(x, y)
        this.activeProjectile(true)
        this.setVelocityX(this.speed)
    }

    deliversHit(target){
        this.activeProjectile(false)
        this.traveledDistance = 0
        this.body.reset(0,0)

        this.effectManager.playEffectOn('hit-effect', target)
    }

    activeProjectile(isActive) {
        this.setActive(isActive)
            .setVisible(isActive)
        
    }

    isOutOfRange() {
        return this.traveledDistance &&
            this.traveledDistance >= this.maxDistance
    }

}

export default Projectile