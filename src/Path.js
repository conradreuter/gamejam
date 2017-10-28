import Entity from './Entity'

export default class Path extends Entity {

  static preload() {
  }

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

  create() {
  }
}
