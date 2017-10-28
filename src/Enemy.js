import Entity from './Entity'
import Wall from './Wall'
import image from './enemy.png'

export default class Enemy extends Entity {

  static classPreload() {
  }

  preload() {
    $game.load.image('enemy', image)
  }

  create() {
    this.sprite = $game.add.sprite(this.x, this.y, 'enemy')
    $game.physics.arcade.enable(this.sprite)
    this.sprite.body.collideWorldBounds = true
  }

  update() {
    this.sprite.body.velocity = {
      x: 70,
      y: 70,
    }

    $game.physics.arcade.collide(this.sprite, Wall.layer)
  }
}
