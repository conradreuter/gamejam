import Entity from './Entity'
import image from './projectile.png'

export default class Projectile extends Entity {

  static preload() {
    $game.load.spritesheet('projectile', image, 8, 8)
  }

  constructor(enemy, type) {
    super()
    this.enemy = enemy
    this.timer = $game.time.create()
    this.changeType(type)
  }

  create() {
    this.sprite = $game.add.sprite(this.x, this.y, 'projectile', this.type.frame)
    $game.physics.arcade.enable(this.sprite)
  }

  changeType(type) {
    this.type = type
  }

  update() {
    this.sprite.frame = this.type.frame
    if (this.enemy) {
      $game.physics.arcade.moveToObject(this.sprite, this.enemy.sprite, this.type.speed)
      if ($game.physics.arcade.intersects(this.sprite, this.enemy.sprite)) {
        this.type.applyEffect(this.enemy)
        $gameState.removeEntity(this)
        return
      }
    } else {
      $gameState.removeEntity(this)
    }

  }

  destroy() {
    this.sprite.destroy()
  }
}

Projectile.Normal = class NormalProjectile {

  get frame() {
    return 0
  }

  get speed() {
    return $constants.NORMAL_PROJECTILE_SPEED
  }

  applyEffect(enemy) {
    enemy.loseLives(2)
  }
}

Projectile.Ice = class IceProjectile {

  get frame() {
    return 1
  }

  get speed() {
    return $constants.ICE_PROJECTILE_SPEED
  }

  applyEffect(enemy) {
  }
}

Projectile.Fire = class FireProjectile {

  get frame() {
    return 2
  }

  get speed() {
    return $constants.FIRE_PROJECTILE_SPEED
  }

  applyEffect(enemy) {
  }
}

Projectile.Freeze = class FreezeProjectile {

  get frame() {
    return 3
  }

  get speed() {
    return $constants.FREEZE_PROJECTILE_SPEED
  }

  applyEffect(enemy) {
  }
}

Projectile.Lightning = class LightningProjectile {

  get frame() {
    return 4
  }

  get speed() {
    return $constants.LIGHTNING_PROJECTILE_SPEED
  }

  applyEffect(enemy) {
  }
}
