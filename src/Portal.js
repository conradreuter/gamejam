import Entity from './Entity'
import image from './portal.png'

export default class Portal extends Entity {

  static classPreload() {
    Portal.layer = $game.add.group()
  }

  preload() {
    $game.load.image('portal', image)
  }

  create() {
    this.sprite = Portal.layer.create(this.x, this.y, 'portal')
  }
}
