
export default class UI 
{
  constructor()
  {
    this._purchaseButtons = $('.purchase-tower');
    this.resetValues();
    this.deactivatePurchaseButton(1);
  }
  
  resetValues()
  {
    this.setLives(0);
    this.setCoins(0);
    this.setKills(0);
    this.setTowerPrice("tower_0", 0);
    this.setTowerPrice("tower_1", 0);
    this.setTowerPrice("tower_2", 0);
    this.setTowerPrice("tower_3", 0);
    this.setTowerPrice("tower_4", 0);
    this.setTowerExperience("progress_0", 0);
    this.setTowerExperience("progress_1", 0);
    this.setTowerExperience("progress_2", 0);
    this.setTowerExperience("progress_3", 0);
    this.setTowerExperience("progress_4", 0);
  }
  
  setLives(value)
  {
    $('#lives').text(value); 
  }
  
  setCoins(value)
  {
    $('#coins').text(value);
  }
  
  setKills(value)
  {
    $('#kills').text(value);
  }
  
  setTowerPrice(towertype, value)
  {
    $('#'+towertype).text(value);
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
  
  activatePurchaseButton(index)
  {
    
    this._purchaseButtons[index].attr("disabled", false);
  }
  
  deactivatePurchaseButton(index)
  {
    console.log($(this._purchaseButtons[index]));
    console.log($(this._purchaseButtons[index]).attr("disabled"));
  }
  
  
}