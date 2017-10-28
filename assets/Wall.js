import sprite from '../assets/wall.png'
import Entity from './Entity'

export default class Wall extends Entity {

  static preload() {
    Wall.layer = $game.add.group()
    $game.load.image('wall', sprite)
  }

  create() {
    this.sprite = Wall.layer.create(this.x, this.y, 'wall')
    $game.physics.arcade.enable(this.sprite)
    this.sprite.body.immovable = true
  }

  update() {
  }
}
