import Wall from '../Wall'
import Tower from '../Tower'

export default class UI 
{
  constructor()
  {
    this._purchaseButtons = Array.from($('.purchase-tower'));
    this.resetValues();
    //this.deactivatePurchaseButton(1);

    this._purchaseButtons.forEach(function(button)
    {
      let id = button.id;
      button.onclick = function()
      {
        if(Wall.selection)
        {
          switch(id)
          {
            case "normal": {Wall.selection.buildTower(Tower.Normal); break}
            case "ice": {Wall.selection.buildTower(Tower.Ice); break}
            case "fire": {Wall.selection.buildTower(Tower.Fire); break}
            case "lightning": {Wall.selection.buildTower(Tower.Lightning); break}
            case "freeze": {Wall.selection.buildTower(Tower.Freeze); break}
          }
          
        }
      };
    });
    
  }
  
  resetValues()
  {
    this.setLives(0);
    this.setCoins(0);
    this.setKillCount(0);
    this.setTowerPrice(0, 0);
    this.setTowerPrice(1, 0);
    this.setTowerPrice(2, 0);
    this.setTowerPrice(3, 0);
    this.setTowerPrice(4, 0);
    /*this.setTowerExperience("progress_0", 0);
    this.setTowerExperience("progress_1", 0);
    this.setTowerExperience("progress_2", 0);
    this.setTowerExperience("progress_3", 0);
    this.setTowerExperience("progress_4", 0);*/
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
    return parseInt(value);
  }
  
  setTowerExperience(towertype, value)
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
    return Math.max;
  }
  
  updatePurchaseButtons()
  {
    var coins = this.getCoins();
    for(let index = 0; this._purchaseButtons.length; ++index)
    {
      let button = this._purchaseButtons[index];
      let price = this.getTowerPrice(index);
      if(coins < price)
      {
        $(button).isEnabled = false;
      }
      else
      {
        $(button).isEnabled = true;
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