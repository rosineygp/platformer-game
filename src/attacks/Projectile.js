import Phaser from "phaser"

class Projectile extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, key) {
        super(scene, x, y, key)

        scene.add.existing(this)
        scene.physics.add.existing(this)

        this.speed = 300
        this.maxDistance = 300
        this.traveledDistance = 0
    }

    preUpdate(time, delta) {
        super.preUpdate(time, delta)

        this.traveledDistance += this.body.deltaAbsX()

        if (this.traveledDistance >= this.maxDistance) {
            this.traveledDistance = 0
            this.setActive(false)
                .setVisible(false)
        }

    }

    fire(x, y) {
        this.body.reset(x, y)
        this.setActive(true)
            .setVisible(true)
            .setVelocityX(this.speed)
    }

}

export default Projectile