import constants from './constants'
import GameState from './GameState'
    
import jQuery from 'jquery';
    
// import * as semantic from '../css/semantic/semantic.js';
import semantic from 'semantic-ui/dist/semantic.js';
import 'semantic-ui/dist/semantic.css';

window.$constants = constants
window.$gameState = new GameState()
window.$game = new Phaser.Game({
  height: 600,
  parent: document.body,
  renderer: Phaser.WEBGL,
  state: $gameState,
  width: 800,
})
