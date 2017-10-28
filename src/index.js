import constants from './constants'
import GameState from './GameState'

window.$constants = constants
window.$gameState = new GameState()
window.$game = new Phaser.Game({
  height: 600,
  parent: document.body,
  renderer: Phaser.WEBGL,
  state: $gameState,
  width: 800,
})
