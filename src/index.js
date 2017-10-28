import constants from './constants'
import GameState from './GameState'
    
import jQuery from 'jquery';
import $ from 'jquery';
import uiButton from './ui/button'

import semantic from 'semantic-ui/dist/semantic.js';
import 'semantic-ui/dist/semantic.css';

window.ui = {}

var UI = window.ui;
UI.setLives = function(value)
{
  $('#lives').text(value);
}
UI.setCoins = function(value)
{
  $('#coins').text(value);
}
UI.setKills = function(value)
{
  $('#kills').text(value);
}
UI.setTowerPrice = function(towertype, value)
{
  $('#'+towertype).text(value);
}
UI.setTowerExperience = function(towertype, value)
{
  $('#'+towertype)
    .progress({
      value    : value,
      total    : 100,
      text     : {
      active: '{value} of {total} done'
    }
  });
}

UI.reset = function()
{
  UI.setLives(0);
  UI.setCoins(0);
  UI.setKills(0);
  UI.setTowerPrice("tower_0", 0);
  UI.setTowerPrice("tower_1", 0);
  UI.setTowerPrice("tower_2", 0);
  UI.setTowerPrice("tower_3", 0);
  UI.setTowerPrice("tower_4", 0);
  UI.setTowerExperience("progress_0", 0);
  UI.setTowerExperience("progress_1", 0);
  UI.setTowerExperience("progress_2", 0);
  UI.setTowerExperience("progress_3", 0);
  UI.setTowerExperience("progress_4", 0);
}

$('#progress_0').progress().onclick = function(){console.log("hello world");};

UI.reset();


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
