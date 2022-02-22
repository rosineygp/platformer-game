import Phaser from 'phaser'
import collidable from '../mixins/collidable'
import anims from '../mixins/anims'

class Enemy extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, key) {
    super(scene, x, y, key)

    scene.add.existing(this)
    scene.physics.add.existing(this)
    this.config = scene.config

    Object.assign(this, collidable)
    Object.assign(this, anims)

    this.init()
    this.initEvents()
  }

  init() {
    this.gravity = 500
    this.speed = 75
    this.timeFromLastTurn = 0
    this.platformsCollidersLayer = null
    this.maxPatrolDistance = 250
    this.currentPatrolDistance = 0

    this.health = 40
    this.damage = 20

    this.rayGraphics = this.scene.add.graphics({
      lineStyle: {
        width: 2,
        color: 0xaa00aa,
      },
    })

    this.body.setGravityY(500)
    this.setCollideWorldBounds(true)
    this.setOrigin(0.5, 1)

    this.setImmovable(true)

    this.setVelocityX(this.speed)
  }

  initEvents() {
    this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this)
  }

  update(time, delta) {
    if (this.getBounds().bottom > 600) {
      this.scene.events.removeListener(
        Phaser.Scenes.Events.UPDATE,
        this.update,
        this,
      )
      this.rayGraphics.clear()
      this.setActive(false)
      this.destroy()
      return
    }

    this.patrol(time)
  }

  patrol(time) {
    if (!this.body || !this.body.onFloor()) {
      return
    }

    this.currentPatrolDistance += Math.abs(this.body.deltaX())

    const { ray, hasHit } = this.raycast(
      this.body,
      this.platformsCollidersLayer,
      {
        raylength: 30,
        precision: 1,
        steepness: 0.2,
      },
    )

    if (
      (!hasHit || this.currentPatrolDistance > this.maxPatrolDistance) &&
      this.timeFromLastTurn + 100 < time
    ) {
      this.setFlipX(!this.flipX)
      this.setVelocityX((this.speed = -this.speed))
      this.timeFromLastTurn = time
      this.currentPatrolDistance = 0
    }

    if (this.config.debug && ray) {
      this.rayGraphics.clear()
      this.rayGraphics.strokeLineShape(ray)
    }
  }

  setPlatformsColliders(platformsCollidersLayer) {
    this.platformsCollidersLayer = platformsCollidersLayer
  }

  takesHit(source) {
    this.health -= source.damage

    source.deliversHit(this)

    if (this.health <= 0) {
      this.setTint(0xff0000).setVelocity(0, -200).setCollideWorldBounds(false)
      this.body.checkCollision.none = true
    }
  }
}

export default Enemy
