import _ from 'lodash'
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
    this.timer = $game.time.create(false)
    this.timer.loop(1000, this.spawnEnemy, this)
  }

  spawnEnemy() {
  }
}
