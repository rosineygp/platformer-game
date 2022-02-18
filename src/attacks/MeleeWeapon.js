import Phaser from 'phaser'
import EffectManager from '../effects/EffectManager'

class MeleeWeapon extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, weaponName) {
    super(scene, x, y, weaponName)

    scene.add.existing(this)
    scene.physics.add.existing(this)

    this.damage = 15
    this.attackSpeed = 500
    this.weaponName = weaponName
    this.weaponAnim = `${weaponName}-swing`
    console.log(this.weaponAnim)
    this.wielder = null
    this.effectManager = new EffectManager(this.scene)

    this.setOrigin(0.5, 1)
    this.setDepth(10)

    this.activateWeapon(false)

    this.on('animationcomplete', (animation) => {
      if (animation.key === this.weaponAnim) {
        this.activateWeapon(false)
        this.body.checkCollision.none = false
        this.body.reset(0, 0)
      }
    })
  }

  preUpdate(time, delta) {
    super.preUpdate(time, delta)

    if (!this.active) return

    if (this.wielder.lastDirection === Phaser.Physics.Arcade.FACING_RIGHT) {
      this.setFlipX(false)
      this.body.reset(this.wielder.x + 15, this.wielder.y)
    } else {
      this.setFlipX(true)
      this.body.reset(this.wielder.x - 15, this.wielder.y)
    }
  }

  swing(wielder) {
    this.wielder = wielder
    this.activateWeapon(true)
    this.anims.play(this.weaponAnim)
  }

  deliversHit(target) {
    const impactPosition = {
      x: this.x,
      y: this.getRightCenter().y,
    }

    this.effectManager.playEffectOn('hit-effect', target, impactPosition)
    this.body.checkCollision.none = true
  }

  activateWeapon(isActive) {
    this.setActive(isActive).setVisible(isActive)
  }
}

export default MeleeWeapon
