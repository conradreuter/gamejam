import _ from 'lodash'
import Enemy from './Enemy'
import Entity from './Entity'
import image from './portal.png'

export default class Portal extends Entity {

  static preload() {
    Portal.layer = $game.add.group()
    $game.load.image('portal', image)
  }

  constructor() {
    super()
    _.bindAll(this, 'spawnEnemy')
  }

  create() {
    this.sprite = Portal.layer.create(this.x, this.y, 'portal')
    this.timer = $game.time.create()
    this.timer.loop(1000, this.spawnEnemy, this)
    this.timer.start()
  }

  spawnEnemy() {
    const enemy = new Enemy
    $gameState.addEntity(enemy)
    enemy.sprite.x = this.sprite.x
    enemy.sprite.y = this.sprite.y
  }
}
