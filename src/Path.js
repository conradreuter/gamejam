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
    this.spawnDelay = Math.random()*3000 + 3000

    this.sprite = Path.layer.create(this.x, this.y, null)
    this.sprite.data = this
    this.sprite.width = $constants.TILE_SIZE
    this.sprite.height = $constants.TILE_SIZE
    $game.physics.arcade.enable(this.sprite)

    if (this.spawnsItems) {
      this.timer = $game.time.create(true)
      this.timer.start()
      this.spawnItem()
    }
  }

  spawnItemAfterDelay() {
    this.timer.add(this.spawnDelay, this.spawnItem, this)
  }

  spawnItem() {
    if (Math.random() > $constants.ITEM_SPAWN_RATE) {
      this.spawnItemAfterDelay()
      return
    }
    const item = new Item(this)
    $gameState.addEntity(item)
    item.sprite.alignIn(this.sprite, Phaser.CENTER)
  }
}
