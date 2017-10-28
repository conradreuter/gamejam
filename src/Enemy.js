import _ from 'lodash'
import spritesheet from '../assets/enemies.png'
import Entity from './Entity'
import Wall from './Wall'

export default class Enemy extends Entity {

  static preload() {
    Enemy.layer = $game.add.group()
    $game.load.spritesheet('enemy', spritesheet, $constants.TILE_SIZE, $constants.TILE_SIZE)
  }

  constructor() {
    super()
    this.type = chooseRandomType()
    this.lives = $constants.ENEMY_LIVES
    this.speed = $constants.ENEMY_SPEED
  }

  create() {
    this.sprite = Enemy.layer.create(this.x, this.y, 'enemy')
    this.sprite.data = this
    this.sprite.animations.add('walk', this.type.frames, 2, true)
    this.sprite.animations.play('walk')
    $game.physics.arcade.enable(this.sprite)
  }

  destroy() {
    this.sprite.destroy()
    $gui.increaseKillCount();
  }

  update() {
    this.sprite.alpha = .5 + .5 * (this.lives / $constants.ENEMY_LIVES)
    if ($game.physics.arcade.intersects(this.sprite, $gameState.player.sprite)) {
      $gameState.player.loseLife()
      $gameState.removeEntity(this)
      return
    }
    $game.physics.arcade.collide(this.sprite, Wall.layer)
    $game.physics.arcade.moveToObject(this.sprite, $gameState.player.sprite, this.speed)
  }

  loseLives(number) {
    this.lives -= number
    if (this.lives <= 0) $gameState.removeEntity(this)
  }
}

function chooseRandomType() {
  if (Math.random() > $constants.ENEMY_SPECIAL_RATE) {
    return Enemy.Normal
  }
  return _.sample([
    Enemy.Ice,
    Enemy.Fire,
    Enemy.Lightning,
    Enemy.Freeze,
  ])
}

Enemy.Normal = {
  frames: [0, 1, 2, 3],
}

Enemy.Ice = {
  frames: [4, 5, 6, 7],
}

Enemy.Fire = {
  frames: [8, 9, 10, 11],
}

Enemy.Lightning = {
  frames: [12, 13, 14, 15],
}

Enemy.Freeze = {
  frames: [16, 17, 18, 19],
}
