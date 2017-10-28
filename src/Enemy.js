import spritesheet from '../assets/enemies/icy.png'
import Entity from './Entity'
import Wall from './Wall'

export default class Enemy extends Entity {

  static preload() {
    Enemy.layer = $game.add.group()
    $game.load.spritesheet('enemy', spritesheet, $constants.TILE_SIZE, $constants.TILE_SIZE)
  }

  constructor() {
    super()
    this.speed = 10
  }

  create() {
    this.sprite = Enemy.layer.create(this.x, this.y, 'enemy')
    this.sprite.data = this
    this.sprite.animations.add('walk', null, 2, true)
    this.sprite.animations.play('walk')
    $game.physics.arcade.enable(this.sprite)
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
