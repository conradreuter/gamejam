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
      var id = button.id;
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
  
  setCoins(value)
  {
    $('#coins').text(value);
  }
  
  increaseKillCount()
  {
    let value = this.getKillCount();
    value++;
    this.setKillCount(value);
  }
  
  getKillCount()
  {
    var value = $('#kills').text();
    console.log("a", value);
    return parseInt(value);
  }
  
  setKillCount(value)
  {
    $('#kills').text(value);
  }
  
  setTowerPrice(index, value)
  {
    var button = this._purchaseButtons[index];
    var label = $(button).find('a');
    label.text(value);
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