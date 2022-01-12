import Player from "../entities/Player"
import Enemies from "../groups/Enemies"

class Play extends Phaser.Scene {
    constructor(config) {
        super('PlayScene')
        this.config = config
    }

    create() {
        const map = this.createMap()
        const layers = this.createLayers(map)
        const playerZones = this.getPlayerZones(layers.playerZones)
        const player = this.createPlayer(playerZones.start)
        const enemy = this.createEnemy(layers.enemySpawns, layers.platformsColliders)

        this.createPlayerColliders(player, {
            colliders: {
                platformsColliders: layers.platformsColliders,
            }
        })

        this.createEnemyColliders(enemy, {
            colliders: {
                platformsColliders: layers.platformsColliders,
                player
            }
        })

        this.createEnfOfLevel(playerZones.end, player)
        this.setupFollowUpCameraOn(player)

    }

    finishDrawing(pointer, layer) {
        this.plotting = false
        this.line.x2 = pointer.worldX
        this.line.y2 = pointer.worldY

        this.graphics.clear()

        this.tileHits = layer.getTilesWithinShape(this.line)

        if (this.tileHits.length > 0) {
            this.tileHits.forEach(tile => {
                if (tile.index !== -1) {
                    tile.setCollision(true)
                }
            })
        }

        this.drawDebug(layer)

        this.graphics.strokeLineShape(this.line)
    }

    createMap() {
        const map = this.make.tilemap({ key: 'map' })
        map.addTilesetImage('main_lev_build_1', 'tile-1')
        return map
    }

    createLayers(map) {
        const tileset = map.getTileset('main_lev_build_1')

        const platformsColliders = map.createStaticLayer('platforms_colliders', tileset)
        const platforms = map.createStaticLayer('platforms', tileset)
        const environment = map.createStaticLayer('environment', tileset)
        const playerZones = map.getObjectLayer('player_zones')
        const enemySpawns = map.getObjectLayer('enemy_spawns')


        platformsColliders.setCollisionByProperty({ collides: true }, true)

        return { platforms, environment, platformsColliders, playerZones, enemySpawns }
    }

    createPlayer(start) {
        return new Player(this, start.x, start.y)
    }

    createPlayerColliders(player, { colliders }) {
        player.addCollider(colliders.platformsColliders)
    }

    createEnemy(spawnLayer, platformsColliders) {

        const enemies = new Enemies(this)
        const enemyTypes = enemies.getTypes()

        spawnLayer.objects.map(spawnPoint => {
            const enemy = new enemyTypes[spawnPoint.type](this, spawnPoint.x, spawnPoint.y)
            enemy.setPlatformsColliders(platformsColliders)
            enemies.add(enemy)
        })

        return enemies
    }

    createEnemyColliders(enemies, { colliders }) {
        enemies
            .addCollider(colliders.platformsColliders)
            .addCollider(colliders.player)
        
    }

    setupFollowUpCameraOn(player) {
        const { width, height, mapOffset, zoomFactor } = this.config
        this.physics.world.setBounds(0, 0, width + mapOffset, height + 200)
        this.cameras.main.setBounds(0, 0, width + mapOffset, height).setZoom(zoomFactor)
        this.cameras.main.startFollow(player)
    }

    getPlayerZones(playerZonesLayer) {
        const playerZones = playerZonesLayer.objects

        return {
            start: playerZones.find(zone => zone.name === 'startZone'),
            end: playerZones.find(zone => zone.name === 'endZone')
        }
    }

    createEnfOfLevel(end, player) {
        const endOfLevel = this.physics.add.sprite(end.x, end.y, 'end')
            .setAlpha(0)
            .setSize(5, this.config.height)
            .setOrigin(0)

        const eolOverlap = this.physics.add.overlap(player, endOfLevel, () => {
            eolOverlap.active = false
            console.log('won!')
        })
    }

}


export default Play