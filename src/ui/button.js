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

UI.reset();