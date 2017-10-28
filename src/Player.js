import Entity from './Entity'
import Wall from './Wall'
import image from './player.png'

export default class Player extends Entity {

  static preload() {
    $game.load.image('player', image)
  }

  constructor() {
    super()
    this.lives = 3
    this.speed = 120
    this.coins = 0
    this.bombs = 0
    this.startTime = $game.time.now
    this.accelerate = 0
    this.invise = 0
    this.super = 0
  }

  create() {
    this.sprite = $game.add.sprite(this.x, this.y, 'player')
    this.sprite.data = this
    $game.physics.arcade.enable(this.sprite)
    this.sprite.body.setCircle(this.sprite.width / 2)
  }

  update() {
    $game.physics.arcade.collide(this.sprite, Wall.layer)
    const cursors = $game.input.keyboard.createCursorKeys()
    //TODO: change speed to const
    if (this.accelerate > 0) {
      this.accelerate -= startTime - $game.time.now
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
    console.log(`${this.lives} lives left`)
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
