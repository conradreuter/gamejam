import constants from './constants'
import GameOver from './GameOver'
import GameState from './GameState'

import jQuery from 'jquery';
import $ from 'jquery';

import semantic from 'semantic-ui/dist/semantic.js';
import 'semantic-ui/dist/semantic.css';

import GUI from './ui/GUI'
window.$gui = new GUI

window.$constants = constants
window.$game = new Phaser.Game({
  height: 12 * 64,
  parent: document.body,
  renderer: Phaser.WEBGL,
  width: 12 * 64,
})

$game.state.add('game', window.$gameState = new GameState())
$game.state.add('gameover', GameOver)
$game.state.start('game')
