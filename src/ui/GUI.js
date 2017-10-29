import Wall from '../Wall'
import Tower from '../Tower'

export default class UI 
{
  constructor()
  {
    this._purchaseButtons = Array.from($('.purchase-tower'));
    this.resetValues();

    var self = this;
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
              costs = self.getTowerCosts(0);
              break
            }
            case "ice": {
              Wall.selection.buildTower(Tower.Ice);
              costs = self.getTowerCosts(1);
              break
            }
            case "fire": {
              Wall.selection.buildTower(Tower.Fire);
              costs = self.getTowerCosts(2);
              break
            }
            case "lightning": {
              Wall.selection.buildTower(Tower.Lightning);
              costs = self.getTowerCosts(3);
              break
            }
            case "freeze": {
              Wall.selection.buildTower(Tower.Freeze);
              costs = self.getTowerCosts(4);
              break
            }
            default: {
              return;
            }
          }
          
          $gui.onPurchaseTower(costs);
          
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
  
  /*setTowerExperience(towertype, value)
  {
    $('#'+towertype)
      .progress({
        value    : value,
        total    : 100,
        text     : {
        active: '{value} of {total} done'
      }
    });
  }*/
  
  getTowerCosts(type)
  {
    if(type === Tower.Normal)
    {
      return this.getTowerPrice(0);
    }
    else if(type === Tower.Ice)
    {
      return this.getTowerPrice(1);
    }
    else if(type === Tower.Fire)
    {
      return this.getTowerPrice(2);
    }
    else if(type === Tower.Lightning)
    {
      return this.getTowerPrice(3);
    }
    else if(type === Tower.Freeze)
    {
      return this.getTowerPrice(4);
    }
    return this.getTowerPrice(-1);
  }
  
  updatePurchaseButtons()
  {
    var coins = this.getCoins();
    for(let index = 0; index < this._purchaseButtons.length; ++index)
    {
      let button = this._purchaseButtons[index];
      let price = this.getTowerPrice(index);
      console.log(index, $(button).isEnabled);
      
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
  
  /*activatePurchaseButton(index)
  {
    this._purchaseButtons[index].attr("disabled", false);
  }
  
  deactivatePurchaseButton(index)
  {
    console.log($(this._purchaseButtons[index]));
    console.log($(this._purchaseButtons[index]).attr("disabled"));
  }*/
}