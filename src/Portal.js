import _ from 'lodash'
import Entity from './Entity'
import image from './portal.png'

export default class Portal extends Entity {

  static classPreload() {
    Portal.layer = $game.add.group()
  }

  constructor() {
    super()
    _.bindAll(this, 'spawnEnemy')
  }

  preload() {
    $game.load.image('portal', image)
    this.timer = $game.time.create(false)
    this.timer.loop(1000, this.spawnEnemy, this)
  }

  spawnEnemy() {
  }

  create() {
    this.sprite = Portal.layer.create(this.x, this.y, 'portal')
  }
}
