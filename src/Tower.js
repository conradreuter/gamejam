import spritesheet from '../assets/tower.png'
import Enemy from './Enemy'
import Entity from './Entity'
import Projectile from './Projectile'

export default class Tower extends Entity {

  static preload() {
    Tower.layer = $game.add.group()
    $game.load.spritesheet('tower', spritesheet, $constants.TILE_SIZE, $constants.TILE_SIZE)
  }

  constructor() {
    super()
    this.timer = $game.time.create()
    this.changeType(Tower.Normal)
  }

  create() {
    this.sprite = $game.add.sprite(this.x, this.y, 'tower', this.type.frame)
  }

  changeType(type) {
    this.type = type
    this.timer.stop()
    this.timer.loop(this.type.cooldown, this.shoot, this)
    this.timer.start()
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
  frame: 0,
  projectileType: Projectile.Normal,
  radius: 300,
}

Tower.Ice = {
  cooldown: 500,
  frame: 1,
  projectileType: Projectile.Ice,
  radius: 300,
}

Tower.Fire = {
  cooldown: 500,
  frame: 2,
  projectileType: Projectile.Fire,
  radius: 300,
}

Tower.Lightning = {
  cooldown: 500,
  frame: 4,
  projectileType: Projectile.Lightning,
  radius: 300,
}

Tower.Freeze = {
  cooldown: 500,
  frame: 3,
  projectileType: Projectile.Freeze,
  radius: 300,
}
