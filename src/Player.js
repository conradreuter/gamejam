import spritesheet from '../assets/player.png'
import Entity from './Entity'
import Wall from './Wall'

export default class Player extends Entity {

  static preload() {
    $game.load.spritesheet('player', spritesheet, $constants.TILE_SIZE, $constants.TILE_SIZE)
  }

  constructor() {
    super()
    this.lives = 3
    this.speed = $constants.PLAYER_SPEED
  }

  create() {
    this.sprite = $game.add.sprite(this.x, this.y, 'player')
    this.sprite.animations.add('walk', null, 2, true)
    this.sprite.animations.play('walk')
    $game.physics.arcade.enable(this.sprite)
  }

  update() {
    $game.physics.arcade.collide(this.sprite, Wall.layer)
    const cursors = $game.input.keyboard.createCursorKeys()
    this.sprite.body.velocity = {
      x: this.speed * (cursors.right.isDown - cursors.left.isDown),
      y: this.speed * (cursors.down.isDown - cursors.up.isDown),
    }
  }

  loseLife() {
    --this.lives
    console.log(`${this.lives} lives left`)
  }
}
