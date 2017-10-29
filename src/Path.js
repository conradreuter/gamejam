import Entity from './Entity'
import Item from './Item'

export default class Path extends Entity {

  static preload() {
    Path.layer = $game.add.group()
  }

  static forSprite(sprite) {
    const x = sprite.x + sprite.width / 2
    const y = sprite.y + sprite.height / 2
    let path = null
    $game.physics.arcade.getObjectsAtLocation(x, y, Path.layer, (arg, pathSprite) => path = pathSprite.data)
    return path
  }

  static resetPlayerDistances() {
    for (let pathSprite of Path.layer.children) {
      pathSprite.data.playerDistance = +Infinity
    }
  }

  constructor(spawnsItems) {
    super()
    this.playerDistance = +Infinity
    this.spawnsItems = spawnsItems
    this.left = null
    this.right = null
    this.up = null
    this.down = null
  }

  get neighbours() {
    if (!this.__neighboursCache) {
      this.__neighboursCache = []
      if (this.left) this.__neighboursCache.push(this.left)
      if (this.right) this.__neighboursCache.push(this.right)
      if (this.up) this.__neighboursCache.push(this.up)
      if (this.down) this.__neighboursCache.push(this.down)
    }
    return this.__neighboursCache
  }

  create() {
    this.spawnDelay = Math.random() * 3000 + 3000
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

  setPlayerDistance(distance) {
    if (this.playerDistance <= distance) return
    this.playerDistance = distance
    for (let neighbour of this.neighbours) {
      neighbour.setPlayerDistance(distance + 1)
    }
  }

  findNextPathTowardsPlayer() {
    if (this.playerDistance < 1) return null
    let minPath = null
    let minDistance = this.playerDistance
    for (let neighbour of this.neighbours) {
      if (neighbour.playerDistance < minDistance) {
        minPath = neighbour
        minDistance = neighbour.playerDistance
      }
    }
    return minPath
  }
}
