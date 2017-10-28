import Entity from './Entity'
import Wall from './Wall'
import image from './player.png'

export default class Player extends Entity {

  static classPreload() {
  }

  preload() {
    $game.load.image('player', image)
  }

  create() {
    this.sprite = $game.add.sprite(this.x, this.y, 'player')
    $game.physics.arcade.enable(this.sprite)
    this.sprite.body.collideWorldBounds = true
  }

  update() {
    const cursors = $game.input.keyboard.createCursorKeys()
    this.sprite.body.velocity = {
      x: 250 * (cursors.right.isDown - cursors.left.isDown),
      y: 250 * (cursors.down.isDown - cursors.up.isDown),
    }

    $game.physics.arcade.collide(this.sprite, Wall.layer)
  }
}
