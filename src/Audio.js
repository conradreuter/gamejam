export default class Audio {

  static preload() {
    $game.load.audio('background', 'assets/audio/doberman-pincher_daniel-simion.mp3');
    $game.load.audio('playerCollectsItem', 'assets/audio/ice-skating-daniel_simon.mp3');
    /*$game.load.audio('playerHurt', 'assets/audio/player-hurt.mp3');
    $game.load.audio('playerDie', 'assets/audio/player-die.mp3');
    $game.load.audio('enemyCollectsItem', 'assets/audio/enemy-collects-item.mp3');
    $game.load.audio('enemyHurt', 'assets/audio/enemy-hurt.mp3');
    $game.load.audio('enemyDie', 'assets/audio/enemy-die.mp3');
    $game.load.audio('buildTower', 'assets/audio/build-tower.mp3');
    $game.load.audio('destroyTower', 'assets/audio/destroy-tower.mp3');
    $game.load.audio('shootProjectile', 'assets/audio/shoot-projectile.mp3');*/
  }

  constructor() {
    this.background = $game.add.audio('background');
    this.playerCollectsItem = $game.add.audio('playerCollectsItem');
    /*this.playerHurt = $game.add.audio('playerHurt');
    this.playerDie = $game.add.audio('playerDie');
    this.enemyCollectsItem = $game.add.audio('enemyCollectsItem');
    this.enemyHurt = $game.add.audio('enemyHurt');
    this.enemyDie = $game.add.audio('enemyDie');
    this.buildTower = $game.add.audio('buildTower');
    this.destroyTower = $game.add.audio('destroyTower');
    this.shootProjectile = $game.add.audio('shootProjectile');*/

    this.sounds = [ 
      this.background, 
      this.playerCollectsItem
      /*, percussion, synth1, synth2, top1, top2*/
    ];

    //  Being mp3 files these take time to decode, so we can't play them instantly
    //  Using setDecodedCallback we can be notified when they're ALL ready for use.
    //  The audio files could decode in ANY order, we can never be sure which it'll be.

    $game.sound.setDecodedCallback(this.sounds, this.start, this);
    
  }
  
  start()
  {
    console.log("ready");
    this.sounds.shift();
    this.background.loopFull(0.6);
    this.playerCollectsItem.loopFull(0.6);
  }
  
  create() {
    
  }
  
  destroy() {

  }

  update() {
  
  }
}