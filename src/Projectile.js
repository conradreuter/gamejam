import spritesheet from '../assets/projectiles.png'
import Entity from './Entity'

export default class Projectile extends Entity {

  static preload() {
    $game.load.spritesheet('projectile', spritesheet, $constants.PROJECTILE_SIZE, $constants.PROJECTILE_SIZE)
  }

  constructor(enemy, type) {
    super()
    this.enemy = enemy
    this.type = type
  }

  create() {
    this.sprite = $game.add.sprite(this.x, this.y, 'projectile', this.type.frame)
    $game.physics.arcade.enable(this.sprite)
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

Projectile.Normal = {
  applyEffect(enemy) {
    enemy.loseLives(2)
  },
  frame: 0,
  speed: 300,
}

Projectile.Ice = {
  applyEffect(enemy) {
    enemy.slow()
  },
  frame: 1,
  speed: 300,
}

Projectile.Fire = {
  applyEffect(enemy) {
    enemy.burn()
  },
  frame: 2,
  speed: 300,
}

Projectile.Freeze = {
  applyEffect(enemy) {
    enemy.freeze()
  },
  frame: 3,
  speed: 300,
}

Projectile.Lightning = {
  applyEffect(enemy) {
    enemy.loseLives(4)
  },
  frame: 4,
  speed: 300,
}
