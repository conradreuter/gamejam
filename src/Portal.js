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
    this.spawnDelay = 3000
  }

  create() {
    this.sprite = Portal.layer.create(this.x, this.y, 'portal')
    this.sprite.animations.add('spawn', null, 8, true)
    this.sprite.animations.play('spawn')
    this.spawnDelayTimer = $game.time.create(false)
    this.spawnDelayTimer.loop(10000, this.decreaseSpawnDelay, this)
    this.spawnDelayTimer.start()
    this.spawnTimer = $game.time.create(false)
    this.spawnTimer.add(this.spawnDelay, this.spawnEnemy, this)
    this.spawnTimer.start()
  }

  decreaseSpawnDelay() {
    this.spawnDelay *= .9
  }

  spawnEnemy() {
    const enemy = new Enemy
    $gameState.addEntity(enemy)
    enemy.sprite.x = this.sprite.x
    enemy.sprite.y = this.sprite.y
    this.spawnTimer.add(this.spawnDelay, this.spawnEnemy, this)
  }
}
