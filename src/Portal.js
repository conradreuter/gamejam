import Entity from './Entity'
import image from './portal.png'

let layer

export default class Portal extends Entity {

  static classPreload() {
    layer = $game.add.group()
  }

  preload() {
    $game.load.image('portal', image)
  }

  create() {
    this.sprite = layer.create(this.x, this.y, 'portal')
  }
}
