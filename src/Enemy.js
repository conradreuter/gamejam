import Entity from './Entity'
import Wall from './Wall'
import image from './enemy.png'

export default class Enemy extends Entity {

  static preload() {
    Enemy.layer = $game.add.group()
    $game.load.image('enemy', image)
  }

  create() {
    this.sprite = Enemy.layer.create(this.x, this.y, 'enemy')
    $game.physics.arcade.enable(this.sprite)
  }

  destroy() {
    this.sprite.destroy()
  }

  update() {
    $game.physics.arcade.collide(this.sprite, Wall.layer)
    $game.physics.arcade.overlap(this.sprite, $gameState.player.sprite, this.damagePlayer, null, this)
  }

  damagePlayer() {
    $gameState.removeEntity(this)
    $gameState.player.loseLife()
  }
}
