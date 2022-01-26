import Phaser from "phaser"

class HealthBar {
    constructor(scene, x, y, scale = 1, health) {
        this.bar = new Phaser.GameObjects.Graphics(scene)
        
        x = 100
        y = 100
        this.bar.x = x / scale
        this.bar.y = y / scale
        this.value = health
        this.scale = scale

        this.size = {
            width: 40,
            height: 8
        }

        this.pixelPerHealth = this.size.width / this.value

        scene.add.existing(this.bar)
        this.draw(80, 30, this.scale)
    }

    decrease(amount) {
        this.value = amount > 0 ? amount : 0
        this.draw(80, 30, 2)
    }

    // Bugs at placement position just fix putting it fixed
    // Probably relatated with Phaser.Scale
    draw(x, y, scale = 1) {
        this.bar.clear()
        const { width, height } = this.size
        const margin = 2

        //border
        this.bar.fillStyle(0x9B00FF)
        this.bar.fillRect(x, y, width + 2, height + 2)

        //inner bar
        this.bar.fillStyle(0xFFFFFF)
        this.bar.fillRect(x + margin, y + margin, width - margin, height - margin)

        const healthWidth = Math.floor(this.value * this.pixelPerHealth)

        //inner green bar
        if (healthWidth <= this.size.width / 3) {
            this.bar.fillStyle(0xFF0000)
        } else {
            this.bar.fillStyle(0x00FF00)
        }

        if (healthWidth > 0)
            this.bar.fillRect(x + margin, y + margin, healthWidth - margin, height - margin)

        this.bar.setScrollFactor(0, 0).setScale(scale)

    }
}

export default HealthBar