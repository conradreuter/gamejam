import ghostImage from './ghost.png'

let ghost

const game = new Phaser.Game({
  height: 600,
  parent: document.body,
  renderer: Phaser.WEBGL,
  state: { create, preload, update },
  width: 800,
})

function preload() {
  game.load.image('ghost', ghostImage)
}

function create() {
  game.physics.startSystem(Phaser.Physics.ARCADE)
  
  ghost = game.add.sprite(0, 0, 'ghost')
  game.physics.arcade.enable(ghost)
  ghost.body.collideWorldBounds = true
  ghost.inputEnabled = true
  ghost.events.onInputDown.add(handleGhostClick, this)
}

function handleGhostClick() {
  ghost.alpha = 1.5 - ghost.alpha 
}

function update() {
  const cursors = game.input.keyboard.createCursorKeys()
  ghost.body.velocity = {
    x: 250 * (cursors.right.isDown - cursors.left.isDown),
    y: 250 * (cursors.down.isDown - cursors.up.isDown),
  }
}
