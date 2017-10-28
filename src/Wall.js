import Entity from './Entity'
import image from './wall.png'

export default class Wall extends Entity {

  preload() {
    this._game.load.image('wall', image)
  }

  create() {
    this.sprite = this._game.add.sprite(this.x, this.y, 'wall')
  }
}
