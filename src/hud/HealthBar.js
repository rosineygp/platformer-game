import Phaser from "phaser"

class HealthBar {
    constructor(scene, x, y, health) {
        this.bar = new Phaser.GameObjects.Graphics(scene)
        this.bar.setScrollFactor(0, 0)

        this.bar.x = x
        this.bar.y = y
        this.value = health

        this.size = {
            width: 40,
            height: 8
        }

        this.pixelPerHealth = this.size.width / this.value

        scene.add.existing(this.bar)
        this.draw(10, 10)
    }

    // Bugs at placement position just fix putting it fixed
    // Probably relatated with Phaser.Scale
    draw(x, y) {
        this.bar.clear()
        const { width, height } = this.size
        const margin = 2

        //border
        this.bar.fillStyle(0x9B00FF)
        this.bar.fillRect(x, y, width + 2, height + 2)

        //inner bar
        this.bar.fillStyle(0xFFFFFF)
        this.bar.fillRect(x + margin, y + margin, width - margin, height - margin)
    }
}

export default HealthBar