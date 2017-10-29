import _ from 'lodash'
import spritesheet from '../assets/enemies.png'
import Entity from './Entity'
import Wall from './Wall'

export default class Enemy extends Entity {

  static preload() {
    Enemy.layer = $game.add.group()
    $game.load.spritesheet('enemy', spritesheet, $constants.TILE_SIZE, $constants.TILE_SIZE)
  }

  constructor(portal) {
    super()
    this.portal = portal
    this.type = chooseRandomType()
    this.bombs = 0
    this.lives = $constants.ENEMY_LIVES
    this.speed = $constants.ENEMY_SPEED
    this.accelerate = 0
    this.invise = 0
    this.super = 0
    this.freezed = 0
    this.burning = 0
  }

  create() {
    this.startTime = $game.time.now
    this.sprite = Enemy.layer.create(this.x, this.y, 'enemy')
    this.sprite.data = this
    this.sprite.animations.add('walk', this.type.frames, 2, true)
    this.sprite.animations.play('walk')
    $game.physics.arcade.enable(this.sprite)

    this.slowDuration = 1
    this.freezeDuration = 0.5
    this.burnDuration = 0.2
  }

  destroy() {
    this.portal.enemyCount++
    this.portal.currentEnemies--
    this.sprite.destroy()
    $gui.increaseKillCount();
  }

  update() {
    this.sprite.alpha = .5 + .5 * (this.lives / $constants.ENEMY_LIVES)

    if (this.accelerate > 0) {
      this.accelerate -= ($game.time.now - this.startTime)%2 
      this.speed = $constants.ENEMY_SPEED*2
    } else if (this.accelerate < 0) {
      this.accelerate += ($game.time.now - this.startTime)%2
      this.speed = $constants.ENEMY_SPEED/2
    } else if (this.freezed > 0) {
      this.freezed -= ($game.time.now - this.startTime)%2
      this.speed = 0
    } else {
      this.accelerate = 0
      this.speed = $constants.ENEMY_SPEED
    }

    if(this.invise > 0) this.invise -= ($game.time.now - this.startTime)%2
    else this.invise = 0

    if(this.super > 0) this.super -= ($game.time.now - this.startTime)%2
    else this.super = 0

    if(this.burning > 0) {
      this.lives -= 0.2
      this.burning -= ($game.time.now - this.startTime)%2
    }
    else this.burning = 0

    if ($game.physics.arcade.intersects(this.sprite, $gameState.player.sprite)) {
      if ($gameState.player.super <= 0) $gameState.player.loseLife()
      $gameState.removeEntity(this)
      return
    }
    $game.physics.arcade.collide(this.sprite, Wall.layer)
    if ($gameState.player.invise <= 0) $game.physics.arcade.moveToObject(this.sprite, $gameState.player.sprite, this.speed)
  }

  loseLives(number) {
    this.lives -= number
    if (this.lives <= 0) $gameState.removeEntity(this)
  }

  gainLife() {
    ++this.lives
  }

  fireItem() {
    this.burnDuration -= 0.01
  }

  iceItem() {
    this.slowDuration -= 0.1
  }

  lightningItem() {
    this.lives += 2
  }

  frozenItem() {
    this.freezeDuration -= 0.01
  }

  speedItem() {
    this.accelerate = $constants.BOOST_DURATION
  }

  bombItem() {
    this.bombs++
  }

  inviseItem() {
    this.invise = $constants.BOOST_DURATION
  }

  superItem() {
    this.super = $constants.BOOST_DURATION
  }

  slow() {
    this.accelerate = -$constants.BOOST_DURATION*this.slowDuration
  }

  burn() {
    this.burning = $constants.BOOST_DURATION*this.burnDuration
  }

  freeze() {
    this.freezed = $constants.BOOST_DURATION*this.freezeDuration
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
  slowDuration: 0,
  freezeDuration: 0.25,
}

Enemy.Fire = {
  frames: [8, 9, 10, 11],
  slowDuration: 2,
}

Enemy.Lightning = {
  frames: [12, 13, 14, 15],
  freezeDuration: 0.7,
  lives: 20,
}

Enemy.Freeze = {
  frames: [16, 17, 18, 19],
  slowDuration: 0.5,
  freezeDuration: 0,
}

