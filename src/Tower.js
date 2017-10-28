import Enemy from './Enemy'
import Entity from './Entity'
import Projectile from './Projectile'
import image from './tower.png'

export default class Tower extends Entity {

  static preload() {
    Tower.layer = $game.add.group()
    $game.load.spritesheet('tower', image, 16, 16, 5)
  }

  constructor() {
    super()
    this.timer = $game.time.create()
    this.changeType(new Tower.Normal)
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
    const projectile = new Projectile(enemy, this.type.createProjectile())
    $gameState.addEntity(projectile)
    projectile.sprite.x = this.sprite.x
    projectile.sprite.y = this.sprite.y
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

Tower.Normal = class NormalTower {

  get frame() {
    return 0
  }

  createProjectile() {
    return new Projectile.Normal
  }

  get radius() {
    return $constants.NORMALTOWER_SHOOTING_RADIUS
  }

  get cooldown() {
    return $constants.NORMALTOWER_COOLDOWN
  }
}

Tower.Ice = class IceTower {

  get frame() {
    return 1
  }

  createProjectile() {
    return new Projectile.Ice
  }

  get radius() {
    return $constants.ICETOWER_SHOOTING_RADIUS
  }

  get cooldown() {
    return $constants.ICETOWER_COOLDOWN
  }
}

Tower.Fire = class FireTower {

  get frame() {
    return 2
  }

  createProjectile() {
    return new Projectile.Fire
  }

  get radius() {
    return $constants.FIRETOWER_SHOOTING_RADIUS
  }

  get cooldown() {
    return $constants.FIRETOWER_COOLDOWN
  }
}

Tower.Freeze = class FreezeTower {

  get frame() {
    return 3
  }

  createProjectile() {
    return new Projectile.Freeze
  }

  get radius() {
    return $constants.FREEZETOWER_SHOOTING_RADIUS
  }

  get cooldown() {
    return $constants.FREEZETOWER_COOLDOWN
  }
}

Tower.Lightning = class LightningTower {

  get frame() {
    return 4
  }

  createProjectile() {
    return new Projectile.Lightning
  }

  get radius() {
    return $constants.LIGHTNINGTOWER_SHOOTING_RADIUS
  }

  get cooldown() {
    return $constants.LIGHTNINGTOWER_COOLDOWN
  }
}
