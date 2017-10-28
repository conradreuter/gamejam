import Entity from './Entity'
import image from './tower.png'
import Projectile from './Projectile'

export default class Tower extends Entity {

  static classPreload() {
    Tower.layer = $game.add.group()
  }

  constructor() {
    super()
    this.timer = $game.time.create()
    this.changeType(new Tower.Normal)
  }

  preload() {
    $game.load.spritesheet('tower', image, 16, 16, 5);
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
    const projectile = new Projectile(this.type.createProjectile())
    console.log($gameState)
    $gameState.addEntity(projectile)

  }

}

Tower.Normal = class NormalTower {
  
  get frame() {
    return 0
  }
  
  createProjectile() {
    return new Projectile.Normal
  }

  get shootingRadius() {
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

  get shootingRadius() {
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

  get shootingRadius() {
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

  get shootingRadius() {
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

  get shootingRadius() {
    return $constants.LIGHTNINGTOWER_SHOOTING_RADIUS
  }

  get cooldown() {
    return $constants.LIGHTNINGTOWER_COOLDOWN
  }
}