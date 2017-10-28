import Entity from './Entity'
import image from './portal.png'

export default class Path extends Entity {

  constructor() {
    super()
    this.left = null
    this.right = null
    this.top = null
    this.bottom = null
  }

  get isTurnPoint() {
    return !(
      (this.left && this.right && !this.top && !this.bottom) ||
      (!this.left && !this.right && this.top && this.bottom)
    )
  }

  preload() {
    $game.load.image('portal', image)
  }

  create() {
    if (!this.isTurnPoint) return
    this.sprite = $game.add.sprite(this.x, this.y, 'portal')
  }
}
