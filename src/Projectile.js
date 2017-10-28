import Entity from './Entity'
import image from './projectile.png'

export default class Projectile extends Entity {

  static preload() {
    $game.load.spritesheet('projectile', image, 8, 8, 5);
  }

  constructor(type) {
    super()
    this.timer = $game.time.create()
    this.changeType(type)
  }

  create() {
    this.sprite = $game.add.sprite(this.x, this.y, 'projectile', this.type.frame)
  }

  changeType(type) {
    this.type = type
  }

  update() {
    this.sprite.frame = this.type.frame

    // $game.physics.arcade.moveToObject(this.sprite, $gameState.player.sprite, this.speed)
  }
}

Projectile.Normal = class NormalProjectile {

  get frame() {
    return 0
  }

  get lifetime() {
    return $constants.NORMAL_PROJECTILE_LIFETIME
  }
}

Projectile.Ice = class IceProjectile {

  get frame() {
    return 1
  }

  get lifetime() {
    return $constants.ICE_PROJECTILE_LIFETIME
  }
}

Projectile.Fire = class FireProjectile {

  get frame() {
    return 2
  }

  get lifetime() {
    return $constants.FIRE_PROJECTILE_LIFETIME
  }
}

Projectile.Freeze = class FreezeProjectile {

  get frame() {
    return 3
  }

  get lifetime() {
    return $constants.FREEZE_PROJECTILE_LIFETIME
  }
}

Projectile.Lightning = class LightningProjectile {

  get frame() {
    return 4
  }

  get lifetime() {
    return $constants.LIGHTNING_PROJECTILE_LIFETIME
  }
}
