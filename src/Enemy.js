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
    this.lives = $constants.ENEMY_LIVES
    this.speed = $constants.ENEMY_SPEED
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
    this.sprite.alpha = this.lives / $constants.ENEMY_LIVES
    if ($game.physics.arcade.intersects(this.sprite, $gameState.player.sprite)) {
      $gameState.player.loseLife()
      $gameState.removeEntity(this)
      return
    }
    $game.physics.arcade.collide(this.sprite, Wall.layer)
    $game.physics.arcade.moveToObject(this.sprite, $gameState.player.sprite, this.speed)
  }

  loseLives(number) {
    this.lives -= number
    if (this.lives < 0) $gameState.removeEntity(this.enemy)
  }
}
