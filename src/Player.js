import Entity from './Entity'
import image from './player.png'

export default class Wall extends Entity {

  preload() {
    this._game.load.image('player', image)
  }

  create() {
    this.sprite = this._game.add.sprite(this.x, this.y, 'player')
  }
}
