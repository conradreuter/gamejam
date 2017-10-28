import spritesheet from '../assets/player.png'
import Entity from './Entity'
import Path from './Path'
import Wall from './Wall'

export default class Player extends Entity {

  static preload() {
    $game.load.spritesheet('player', spritesheet, $constants.TILE_SIZE, $constants.TILE_SIZE)
  }

  constructor() {
    super()
    this.lives = $constants.PLAYER_LIVES
    this.speed = $constants.PLAYER_SPEED
    this.coins = 0
    this.bombs = 0
    this.accelerate = 0
    this.invise = 0
    this.super = 0
  }

  create() {
    this.startTime = $game.time.now
    this.sprite = $game.add.sprite(this.x, this.y, 'player')
    this.sprite.data = this
    this.sprite.animations.add('walk', null, 8, true)
    this.sprite.animations.play('walk')
    $game.physics.arcade.enable(this.sprite)
  }

  update() {
    $game.physics.arcade.collide(this.sprite, Wall.layer)
    $game.physics.arcade.overlap(this.sprite, Path.layer, this.collide)
    const cursors = $game.input.keyboard.createCursorKeys()
    //TODO: change speed to const
    if (this.accelerate > 0) {
      this.accelerate -= this.startTime - $game.time.now
      this.speed = 240
    } else {
      this.accelerate = 0
      this.speed = 120
    }

    if(this.invise > 0) this.invise -= this.startTime - $game.time.now
    else this.invise = 0

    if(this.super > 0) this.super -= this.startTime - $game.time.now
    else this.super = 0

    this.sprite.body.velocity = {
      x: this.speed * (cursors.right.isDown - cursors.left.isDown),
      y: this.speed * (cursors.down.isDown - cursors.up.isDown),
    }

    this.startTime = $game.time.now
  }

  loseLife() {
    --this.lives
  }

  gainLife() {
    ++this.lives
  }

  collectCoin() {
    ++this.coins
  }

  fireItem() {
    this.coins += 3
  }

  iceItem() {
    this.coins += 3
  }

  lightningItem() {
    this.coins += 3
  }

  frozenItem() {
    this.coins += 3
  }

  speedItem() {
    this.accelerate = 5
  }

  bombItem() {
    this.bombs++
  }

  inviseItem() {
    this.invise = 5
  }

  superItem() {
    this.super = 5
  }
}
