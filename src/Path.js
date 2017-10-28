import Entity from './Entity'
import Item from './Item'

export default class Path extends Entity {

  static preload() {
    Path.layer = $game.add.group()
  }

  constructor(spawnsItems) {
    super()
    this.spawnsItems = spawnsItems
    this.left = null
    this.right = null
    this.up = null
    this.down = null
  }

  create() {
    this.sprite = Path.layer.create(this.x, this.y, null)
    this.sprite.data = this
    this.sprite.width = $constants.TILE_SIZE
    this.sprite.height = $constants.TILE_SIZE
    $game.physics.arcade.enable(this.sprite)

    if (this.spawnsItems) {
      this.timer = $game.time.create(false)
      this.spawnItem()
    }
  }

  spawnItem() {
    console.log('blubb')
    if (Math.random() > $constants.ITEM_SPAWN_RATE) return
    const item = new Item
    $gameState.addEntity(item)
    item.sprite.alignIn(this.sprite, Phaser.CENTER)
  }
}
