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
  
  resetValues()
  {
    this.setLives(0);
    
    this.setKillCount(0);
    this.setTowerPrice(0, 1);
    this.setTowerPrice(1, 5);
    this.setTowerPrice(2, 10);
    this.setTowerPrice(3, 15);
    this.setTowerPrice(4, 20);
    this.setCoins(10);
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
    this.updatePurchaseButtons();
  }
  
  getCoins()
  {
    let value = $('#coins').text();
    return parseInt(value);
  }
  
  setCoins(value)
  {
    $('#coins').text(value);
    this.updatePurchaseButtons();
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
  
  updatePurchaseButtons()
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