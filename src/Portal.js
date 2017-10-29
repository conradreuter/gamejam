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
    this.enemyCount = 3
    this.currentEnemies = 0
  }

  create() {
    this.sprite = Portal.layer.create(this.x, this.y, 'portal')
    this.sprite.animations.add('spawn', null, 8, true)
    this.sprite.animations.play('spawn')
    this.enemyCountTimer = $game.time.create(false)
    this.enemyCountTimer.loop(10000, this.increaseEnemyCount, this)
    this.enemyCountTimer.start()
    this.spawnTimer = $game.time.create(false)
    this.spawnTimer.add(3000, this.spawnEnemy, this)
    this.spawnTimer.start()
  }

  increaseEnemyCount() {
    ++this.enemyCount
  }

  spawnEnemy() {
    if (this.currentEnemies < this.enemyCount) {
      const enemy = new Enemy(this)
      $gameState.addEntity(enemy)
      enemy.sprite.x = this.sprite.x
      enemy.sprite.y = this.sprite.y
      enemy.lives += this.enemyCount
      this.currentEnemies++
    }
    this.spawnTimer.add(3000, this.spawnEnemy, this)
  }
}
