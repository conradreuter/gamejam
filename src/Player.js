import Entity from './Entity'
import Wall from './Wall'
import image from './player.png'

export default class Player extends Entity {

  static preload() {
    $game.load.image('player', image)
  }

  constructor() {
    super()
    this.speed = 180
  }

  create() {
    this.sprite = $game.add.sprite(this.x, this.y, 'player')
    $game.physics.arcade.enable(this.sprite)
    const size = this.sprite.width * .75
    const offset = (this.sprite.width - size) / 2
    this.sprite.body.setSize(size, size, offset, offset)
  }

  update() {
    const cursors = $game.input.keyboard.createCursorKeys()
    this.sprite.body.velocity = {
      x: this.speed * (cursors.right.isDown - cursors.left.isDown),
      y: this.speed * (cursors.down.isDown - cursors.up.isDown),
    }

    $game.physics.arcade.collide(this.sprite, Wall.layer)
  }
}
