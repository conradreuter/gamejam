import constants from './constants'
import GameState from './GameState'
    
import jQuery from 'jquery';
import $ from 'jquery';

import semantic from 'semantic-ui/dist/semantic.js';
import 'semantic-ui/dist/semantic.css';

import UI from './ui/button'
window.ui = new UI;

window.$constants = constants
window.$gameState = new GameState()
window.$game = new Phaser.Game({
  height: 12 * 64,
  parent: document.body,
  renderer: Phaser.WEBGL,
  state: $gameState,
  width: 12 * 64,
  width: 800,
})
