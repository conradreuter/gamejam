import _ from 'lodash'
import spritesheet from '../assets/items.png'
import Enemy from './Enemy'
import Entity from './Entity'
import Player from './Player'

export default class Item extends Entity {

  static preload() {
    Item.layer = $game.add.group()
    $game.load.spritesheet('items', spritesheet, $constants.TILE_SIZE, $constants.TILE_SIZE)
  }

  constructor() {
    super()
    this.type = chooseRandomType()
  }

  create() {
    this.sprite = Item.layer.create(this.x, this.y, 'items', this.type.frame)
    this.sprite.data = this
    $game.physics.arcade.enable(this.sprite)
  }

  destroy() {
    this.sprite.destroy()
  }

  update() {
    $game.physics.arcade.overlap(this.sprite, Enemy.layer, this.collideWithPlayerOrEnemy)
    $game.physics.arcade.overlap(this.sprite, $gameState.player, this.collideWithPlayerOrEnemy)
  }

  collideWithPlayerOrEnemy(itemSprite, playerOrEnemySprite) {
    if (itemSprite.data.type.applyEffect(playerOrEnemySprite.data)) {
      $gameState.removeEntity(itemSprite.data)
    }
  }

}

function chooseRandomType() {
  const itemPool = [
    ..._.times(3, ()=> new Item.Life),
    ..._.times(5, ()=> new Item.Coin),
    ..._.times(2, ()=> new Item.Fire),
    ..._.times(2, ()=> new Item.Ice),
    ..._.times(2, ()=> new Item.Lightning),
    ..._.times(2, ()=> new Item.Frozen),
    ..._.times(1, ()=> new Item.Speed),
    ..._.times(1, ()=> new Item.Bomb),
    ..._.times(1, ()=> new Item.Invise),
    ..._.times(1, ()=> new Item.Super)
  ]
  return _.sample(itemPool)
}

Item.Life = class LifeItem {
  get doesAffectsEnemy() {
    return true
  }

  get doesAffectsPlayer() {
    return true
  }

  applyEffect(playerOrEnemy) {
    playerOrEnemy.gainLife()
    return true
  }

  get frame() {
    return 0
  }
}

Item.Coin = class CoinItem {
  get doesAffectsEnemy() {
    return false
  }

  get doesAffectsPlayer() {
    return true
  }

  applyEffect(playerOrEnemy) {
    if (playerOrEnemy instanceof Player) {
      playerOrEnemy.collectCoin()
      return true
    }
    return false
  }

  get frame() {
    return 1
  }

}

Item.Fire = class FireItem {
  get doesAffectsEnemy() {
    return true
  }

  get doesAffectsPlayer() {
    return true
  }

  applyEffect(playerOrEnemy) {
    playerOrEnemy.fireItem()
    return true
  }

  get frame() {
    return 2
  }
}

Item.Ice = class IceItem {
  get doesAffectsEnemy() {
    return true
  }

  get doesAffectsPlayer() {
    return true
  }

  applyEffect(playerOrEnemy) {
    playerOrEnemy.iceItem()
    return true
  }

  get frame() {
    return 3
  }
}

Item.Lightning = class LightningItem {
  get doesAffectsEnemy() {
    return true
  }

  get doesAffectsPlayer() {
    return true
  }

  applyEffect(playerOrEnemy) {
    playerOrEnemy.lightningItem()
    return true
  }

  get frame() {
    return 4
  }
}

Item.Frozen = class FrozenItem {
  get doesAffectsEnemy() {
    return true
  }

  get doesAffectsPlayer() {
    return true
  }

  applyEffect(playerOrEnemy) {
    playerOrEnemy.frozenItem()
    return true
  }

  get frame() {
    return 5
  }
}

Item.Speed = class SpeedItem {
  get doesAffectsEnemy() {
    return true
  }

  get doesAffectsPlayer() {
    return true
  }

  applyEffect(playerOrEnemy) {
    playerOrEnemy.speedItem()
    return true
  }

  get frame() {
    return 6
  }
}

Item.Bomb = class BombItem {
  get doesAffectsEnemy() {
    return true
  }

  get doesAffectsPlayer() {
    return true
  }

  applyEffect(playerOrEnemy) {
    playerOrEnemy.bombItem()
    return true
  }

  get frame() {
    return 7
  }
}

Item.Invise = class InviseItem {
  get doesAffectsEnemy() {
    return false
  }

  get doesAffectsPlayer() {
    return true
  }

  applyEffect(playerOrEnemy) {
    if (playerOrEnemy instanceof Player) {
      playerOrEnemy.inviseItem()
      return true
    }
    return false
  }

  get frame() {
    return 8
  }
}

Item.Super = class SuperItem {
  get doesAffectsEnemy() {
    return false
  }

  get doesAffectsPlayer() {
    return true
  }

  applyEffect(playerOrEnemy) {
    if (playerOrEnemy instanceof Player) {
      playerOrEnemy.superItem()
      return true
    }
    return false
  }

  get frame() {
    return 9
  }
}
