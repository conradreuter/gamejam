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
  }

  create() {
    this.sprite = $game.add.sprite(this.x, this.y, 'player')
    $game.physics.arcade.enable(this.sprite)
    this.sprite.body.setCircle(this.sprite.width / 2)
  }

  update() {
    $game.physics.arcade.collide(this.sprite, Wall.layer)
    const cursors = $game.input.keyboard.createCursorKeys()
    this.sprite.body.velocity = {
      x: this.speed * (cursors.right.isDown - cursors.left.isDown),
      y: this.speed * (cursors.down.isDown - cursors.up.isDown),
    }
  }

  loseLife() {
    --this.lives
    console.log(`${this.lives} lives left`)
  }
}
