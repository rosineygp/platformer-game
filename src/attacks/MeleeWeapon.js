import Phaser from 'phaser'

class MeleeWeapon extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, weaponName) {
    super(scene, x, y, weaponName)

    scene.add.existing(this)
    scene.physics.add.existing(this)

    this.damage = 15
    this.attackSpeed = 1000
    this.weaponName = weaponName
    this.weaponAnim = `${weaponName}-swing`
    console.log(this.weaponAnim)
    this.wielder = null

    this.activateWeapon(false)
  }

  swing(wielder) {
    this.wielder = wielder
    this.activateWeapon(true)
    this.body.reset(wielder.x, wielder.y)
    this.anims.play(this.weaponAnim)
  }

  activateWeapon(isActive) {
    this.setActive(isActive).setVisible(isActive)
  }
}

export default MeleeWeapon
