import Entity from './Entity'
import Wall from './Wall'
import image from './enemy.png'

export default class Enemy extends Entity {

  static preload() {
    Enemy.layer = $game.add.group()
    $game.load.image('enemy', image)
  }

  constructor() {
    super()
    this.speed = 10
  }

  create() {
    this.sprite = Enemy.layer.create(this.x, this.y, 'enemy')
    this.sprite.data = this
    $game.physics.arcade.enable(this.sprite)
    this.sprite.body.setCircle(this.sprite.width / 2)
  }

  destroy() {
    this.sprite.destroy()
  }

  update() {
    if ($game.physics.arcade.intersects(this.sprite, $gameState.player.sprite)) {
      $gameState.player.loseLife()
      $gameState.removeEntity(this)
      return
    }
    $game.physics.arcade.collide(this.sprite, Wall.layer)
    $game.physics.arcade.moveToObject(this.sprite, $gameState.player.sprite, this.speed)
  }
}
