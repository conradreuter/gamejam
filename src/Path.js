import Entity from './Entity'

export default class Path extends Entity {

  static preload() {
    Path.layer = $game.add.group()
  }

  constructor() {
    super()
    this.left = null
    this.right = null
    this.up = null
    this.down = null
  }

  get isTurnPoint() {
    return !(
      (this.left && this.right && !this.up && !this.down) ||
      (!this.left && !this.right && this.up && this.down)
    )
  }

  create() {
    this.sprite = Path.layer.create(this.x, this.y, null)
    this.sprite.data = this
    this.sprite.width = $constants.TILE_SIZE
    this.sprite.height = $constants.TILE_SIZE
    $game.physics.arcade.enable(this.sprite)
  }
}
