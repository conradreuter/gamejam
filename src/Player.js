import soundCollectLife from '../assets/audio/collect_life.wav'
import soundCollectCoin from '../assets/audio/collect_coin.wav'
import soundCollectSpeed from '../assets/audio/collect_speed.wav'
//import soundCollectBomb from ''
import soundCollectInvisibility from '../assets/audio/collect_invisibility.wav'
import soundCollectSuperItem from '../assets/audio/collect_super_item.mp3'
//import soundDie from ''
import soundGetHurt from '../assets/audio/player_hurt.mp3'
import spritesheet from '../assets/player.png'
import Entity from './Entity'
import Path from './Path'
import Wall from './Wall'

export default class Player extends Entity {

  static preload() {
    $game.load.audio('collectLife', soundCollectLife)
    $game.load.audio('collectCoin', soundCollectCoin)
    $game.load.audio('collectSpeed', soundCollectSpeed)
    //$game.load.audio('collectBomb', soundCollectBomb)
    $game.load.audio('collectInvisibility', soundCollectInvisibility)
    $game.load.audio('collectSuperItem', soundCollectSuperItem)
    //$game.load.audio('die', soundDie)//TODO not in use
    $game.load.audio('getHurt', soundGetHurt)
    $game.load.spritesheet('player', spritesheet, $constants.TILE_SIZE, $constants.TILE_SIZE)
  }

  constructor() {
    super()
    this.lives = $constants.PLAYER_LIVES
    this.speed = $constants.PLAYER_SPEED
    this.coins = 10
    this.bombs = 0
    this.accelerate = 0
    this.invise = 0
    this.super = 0
    $gui.setLives(this.lives)
    $gui.setCoins(this.coins)
  }

  create() {
    this.startTime = $game.time.now
    this.soundCollectLife = $game.add.audio('collectLife');
    this.soundCollectCoin = $game.add.audio('collectCoin');
    this.soundCollectSpeed = $game.add.audio('collectSpeed');
    //this.soundCollectBomb = $game.add.audio('collectBomb');
    this.soundCollectInvisibility = $game.add.audio('collectInvisibility');
    this.soundCollectSuperItem = $game.add.audio('collectSuperItem');
    //this.soundDie = $game.add.audio('die');
    this.soundGetHurt = $game.add.audio('getHurt');
    this.sprite = $game.add.sprite(this.x, this.y, 'player')
    this.sprite.data = this
    this.sprite.animations.add('walk', null, 8, true)
    this.sprite.animations.play('walk')
    $game.physics.arcade.enable(this.sprite)
  }

  update() {
    $game.physics.arcade.collide(this.sprite, Wall.layer)
    $game.physics.arcade.overlap(this.sprite, Path.layer, this.collide)
    const cursors = $game.input.keyboard.createCursorKeys()
    if (this.accelerate > 0) {
      this.accelerate -= ($game.time.now - this.startTime)%2
      this.speed = $constants.PLAYER_SPEED*1.5
    } else {
      this.accelerate = 0
      this.speed = $constants.PLAYER_SPEED
    }

    if(this.invise > 0) this.invise -= ($game.time.now - this.startTime)%2
    if(this.super > 0) this.super -= ($game.time.now - this.startTime)%2

    this.sprite.alpha = (this.invise > 0) ? .5 : 1
    this.sprite.body.velocity = {
      x: this.speed * (cursors.right.isDown - cursors.left.isDown),
      y: this.speed * (cursors.down.isDown - cursors.up.isDown),
    }

    this.startTime = $game.time.now
  }

  loseLife() {
    --this.lives
    $gui.setLives(this.lives)
    this.soundGetHurt.play();
  }

  gainLife() {
    ++this.lives
    $gui.setLives(this.lives)
    this.soundCollectLife.play();
  }

  collectCoins(number) {
    this.coins += number
    $gui.setCoins(this.coins)
    this.soundCollectCoin.play();
  }

  spendCoins(number) {
    this.coins -= number
    $gui.setCoins(this.coins)
  }

  speedItem() {
    this.accelerate = $constants.BOOST_DURATION*2
    this.soundCollectSpeed.play();
  }

  bombItem() {
    this.bombs++
    //this.soundCollectBomb.play();
  }

  inviseItem() {
    this.invise = $constants.BOOST_DURATION*2
    this.soundCollectInvisibility.play();
  }

  superItem() {
    this.super = $constants.BOOST_DURATION
    this.soundCollectSuperItem.play();
  }
}
