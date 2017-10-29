import soundConstruction from '../assets/audio/construct_tower.ogg'
import soundShoot from '../assets/audio/shoot.wav'
import soundUpgrade from '../assets/audio/construct_tower.ogg'
import spritesheet from '../assets/tower.png'
import Enemy from './Enemy'
import Entity from './Entity'
import Projectile from './Projectile'

export default class Tower extends Entity {

  static preload() {
    Tower.layer = $game.add.group()
    $game.load.audio('construction', soundConstruction)
    $game.load.audio('shoot', soundShoot)
    $game.load.audio('upgrade', soundUpgrade)
    $game.load.spritesheet('tower', spritesheet, $constants.TILE_SIZE, $constants.TILE_SIZE)
  }

  constructor(type) {
    super()
    this.timer = $game.time.create()
    this.changeType(type)
    this.soundConstruction.play()
  }

  create() {
    this.sprite = $game.add.sprite(this.x, this.y, 'tower', this.type.frame)
  }

  changeType(type) {
    this.type = type
    this.timer.stop()
    this.timer.loop(this.type.cooldown, this.shoot, this)
    this.timer.start()

    this.soundConstruction = $game.add.audio('construction')
    this.soundShoot = $game.add.audio('shoot')
    this.soundUpgrade = $game.add.audio('upgrade')

    this.soundUpgrade.play()
  }

  update() {
    this.sprite.frame = this.type.frame
  }

  shoot() {
    const enemy = this.chooseTarget()
    if (!enemy) return
    const projectile = new Projectile(enemy, this.type.projectileType)
    $gameState.addEntity(projectile)
    projectile.sprite.alignIn(this.sprite, Phaser.CENTER)

    this.soundShoot.play('', 0, .2)
  }

  chooseTarget() {
    let closestEnemy
    let closestDistance = +Infinity
    for (let entity of $gameState.entities) {
      if (entity instanceof Enemy) {
        const distance =  $game.physics.arcade.distanceBetween(this.sprite, entity.sprite)
        if (distance < closestDistance) {
          closestDistance = distance
          closestEnemy = entity
        }
      }
    }
    if (closestDistance > this.type.radius) return null
    return closestEnemy
  }
}

Tower.Normal = {
  cooldown: 500,
  costs: 3,
  frame: 0,
  projectileType: Projectile.Normal,
  radius: 300,
}

Tower.Ice = {
  cooldown: 500,
  costs: 10,
  frame: 1,
  projectileType: Projectile.Ice,
  radius: 300,
}

Tower.Fire = {
  cooldown: 500,
  costs: 10,
  frame: 2,
  projectileType: Projectile.Fire,
  radius: 300,
}

Tower.Lightning = {
  cooldown: 500,
  costs: 15,
  frame: 4,
  projectileType: Projectile.Lightning,
  radius: 300,
}

Tower.Freeze = {
  cooldown: 500,
  costs: 10,
  frame: 3,
  projectileType: Projectile.Freeze,
  radius: 300,
}
