import _ from 'lodash'
import spritesheet from '../assets/items.png'
import Enemy from './Enemy'
import Entity from './Entity'

export default class Item extends Entity {

  static preload() {
    Item.layer = $game.add.group()
    $game.load.spritesheet('items', spritesheet, $constants.TILE_SIZE, $constants.TILE_SIZE)
  }

  constructor(path) {
    super()
    this.path = path
    this.type = chooseRandomType()
  }

  create() {
    this.sprite = Item.layer.create(this.x, this.y, 'items', this.type.frame)
    this.sprite.data = this
    $game.physics.arcade.enable(this.sprite)
  }

  destroy() {
    this.path.spawnItemAfterDelay()
    this.sprite.destroy()
  }

  update() {
    $game.physics.arcade.overlap(this.sprite, Enemy.layer, this.collideWithPlayerOrEnemy)
    $game.physics.arcade.overlap(this.sprite, $gameState.player.sprite, this.collideWithPlayerOrEnemy)
    if (this.isCollected) $gameState.removeEntity(this)
  }

  collideWithPlayerOrEnemy(itemSprite, playerOrEnemySprite) {
    if ($game.physics.arcade.distanceBetween(itemSprite, playerOrEnemySprite) > $constants.ITEM_MAX_DISTANCE) return
    const item = itemSprite.data
    if (item.isCollected) return
    const collector = playerOrEnemySprite.data
    item.isCollected = item.type.collect(collector) !== false
  }
}

function chooseRandomType() {
  const itemPool = [
    ..._.times(1, () => Item.Life),
    ..._.times(10, () => Item.Coin),
    ..._.times(2, () => Item.Fire),
    ..._.times(2, () => Item.Ice),
    ..._.times(2, () => Item.Lightning),
    ..._.times(2, () => Item.Frozen),
    ..._.times(2, () => Item.Speed),
    ..._.times(2, () => Item.Invise),
    ..._.times(1, () => Item.Super)
  ]
  return _.sample(itemPool)
}

Item.Life = {
  collect(collector) {
    collector.gainLife()
  },
  frame: 0,
}

Item.Coin = {
  collect(collector) {
    if (collector instanceof Enemy) return false
    collector.collectCoins(1)
  },
  frame: 1,

}

Item.Fire = {
  collect(collector) {
    if (collector instanceof Enemy) return false
    collector.collectCoins(3)
  },
  frame: 2,
}

Item.Ice = {
  collect(collector) {
    if (collector instanceof Enemy) return false
    collector.collectCoins(3)
  },
  frame: 3,
}

Item.Lightning = {
  collect(collector) {
    if (collector instanceof Enemy) return false
    collector.collectCoins(3)
  },
  frame: 4,
}

Item.Frozen = {
  collect(collector) {
    if (collector instanceof Enemy) return false
    collector.collectCoins(3)
  },
  frame: 5,
}

Item.Speed = {
  collect(collector) {
    collector.speedItem()
  },
  frame: 6,
}

Item.Invise = {
  collect(collector) {
    if (collector instanceof Enemy) return false
    collector.inviseItem()
  },
  frame: 7,
}

Item.Super = {
  collect(collector) {
    if (collector instanceof Enemy) return false
    collector.superItem()
  },
  frame: 8,
}
