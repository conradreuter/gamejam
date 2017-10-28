import Entity from './Entity'
import image from './portal.png'

export default class Portal extends Entity {

  preload() {
    this._game.load.image('portal', image)
  }

  create() {
    this._sprite = this._game.add.sprite(this.x, this.y, 'portal')
  }
}
