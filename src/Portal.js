import _ from 'lodash'
import spritesheet from '../assets/portal.png'
import Enemy from './Enemy'
import Entity from './Entity'

export default class Portal extends Entity {

  static preload() {
    Portal.layer = $game.add.group()
    $game.load.spritesheet('portal', spritesheet, $constants.TILE_SIZE, $constants.TILE_SIZE)
  }

  constructor() {
    super()
    _.bindAll(this, 'spawnEnemy')
  }

  create() {
    this.sprite = Portal.layer.create(this.x, this.y, 'portal')
    this.sprite.animations.add('spawn', null, 8, true)
    this.sprite.animations.play('spawn')
    this.timer = $game.time.create()
    this.timer.loop(2000, this.spawnEnemy, this)
    this.timer.start()
  }

  spawnEnemy() {
    const enemy = new Enemy
    $gameState.addEntity(enemy)
    enemy.sprite.x = this.sprite.x
    enemy.sprite.y = this.sprite.y
  }
}
