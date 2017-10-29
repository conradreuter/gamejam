import Wall from '../Wall'
import Tower from '../Tower'

export default class UI 
{
  constructor()
  {
    this._purchaseButtons = Array.from($('.purchase-tower'));
    this.resetValues();
    
    let self = this;
    this._purchaseButtons.forEach(function(button)
    {
      let id = button.id;
      let costs = 0;
      
      button.onclick = function()
      {
        if(Wall.selection)
        {
          switch(id)
          {
            case "normal": {
              Wall.selection.buildTower(Tower.Normal);
              costs = Tower.Normal.costs;
              break
            }
            case "ice": {
              Wall.selection.buildTower(Tower.Ice);
              costs = Tower.Ice.costs;
              break
            }
            case "fire": {
              Wall.selection.buildTower(Tower.Fire);
              costs = Tower.Fire.costs;
              break
            }
            case "lightning": {
              Wall.selection.buildTower(Tower.Lightning);
              costs = Tower.Lightning.costs;
              break
            }
            case "freeze": {
              Wall.selection.buildTower(Tower.Freeze);
              costs = Tower.Freeze.costs;
              break
            }
            default: {
              return;
            }
          }

          $gameState.player.spendCoins(costs);
        }
      };
    });
    
  }
  
  /**
   * Note: Should be called after Tower, Player, etc. was initilized.
   */
  initFields()
  {
    this.setTowerPrice(0, Tower.Normal.costs);
    this.setTowerPrice(1, Tower.Ice.costs);
    this.setTowerPrice(2, Tower.Fire.costs);
    this.setTowerPrice(3, Tower.Lightning.costs);
    this.setTowerPrice(4, Tower.Freeze.costs);
    this.updateButtonStates();
  }
  
  resetValues()
  {
    this.setKillCount(0);
    this.setEnemyCount(0);
  }
  
  setLives(value)
  {
    $('#lives').text(value); 
  }
  
  increaseCoins()
  {
    let value = this.getCoins();
    value++;
    this.setCoins(value);
    this.updateButtonStates();
  }
  
  getCoins()
  {
    let value = $('#coins').text();
    return parseInt(value);
  }
  
  setCoins(value)
  {
    $('#coins').text(value);
    this.updateButtonStates();
  }
  
  increaseKillCount()
  {
    let value = this.getKillCount();
    value++;
    this.setKillCount(value);
  }
  
  getKillCount()
  {
    let value = $('#kills').text();
    return parseInt(value);
  }
  
  setKillCount(value)
  {
    $('#kills').text(value);
  }
  
  increaseEnemyCount()
  {
    let value = this.getEnemyCount();
    value++;
    this.setEnemyCount(value);
  }
  
  decreaseEnemyCount()
  {
    let value = this.getEnemyCount();
    value--;
    this.setEnemyCount(value);
  }
  
  getEnemyCount()
  {
    let value = $('#enemies').text();
    return parseInt(value);
  }
  
  setEnemyCount(value)
  {
    $('#enemies').text(value);
  }
  
  setTowerPrice(index, value)
  {
    let button = this._purchaseButtons[index];
    let label = $(button).find('a');
    label.text(value);
  }
  
  getTowerPrice(index)
  {
    let button = this._purchaseButtons[index];
    let label = $(button).find('a');
    let value = label.text();
    return parseInt(value) || Math.max;
  }
  
  updateButtonStates()
  {
    let coins = this.getCoins();
    for(let index = 0; index < this._purchaseButtons.length; ++index)
    {
      let button = this._purchaseButtons[index];
      let price = this.getTowerPrice(index);
      
      if(coins < price)
      {
        $(button).addClass("disabled");
      }
      else
      {
        $(button).removeClass("disabled");
      }
    }
  }
}