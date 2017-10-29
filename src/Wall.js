import markerSprite from '../assets/marker.png'
import sprite from '../assets/wall.png'
import Entity from './Entity'
import Tower from './Tower'

export default class Wall extends Entity {

  static preload() {
    Wall.layer = $game.add.group()
    $game.load.image('wall', sprite)
    $game.load.image('marker', markerSprite)

    $game.input.mouse.mouseOutCallback = Wall.unhoverLastHovered
    $game.input.mouse.mouseOverCallback = Wall.restoreLastHovered
  }

  static unhoverLastHovered() {
    if (!Wall.lastHovered) return
    Wall.lastHovered.unhover()
  }

  static restoreLastHovered() {
    $game.physics.arcade.getObjectsUnderPointer($game.input.activePointer, Wall.layer, (pointer, wallSprite) => {
      const wall = wallSprite.data
      wall.hover()
    })
  }

  create() {
    this.sprite = Wall.layer.create(this.x, this.y, 'wall')
    this.sprite.data = this
    this.markerSprite = Wall.layer.create(this.x, this.y, 'marker')
    $game.physics.arcade.enable(this.sprite)
    this.sprite.body.immovable = true
    this.sprite.inputEnabled = true
    this.sprite.events.onInputDown.add(this.select, this)
    this.sprite.events.onInputOut.add(this.unhover, this)
    this.sprite.events.onInputOver.add(this.hover, this)
    this.sprite.input.useHandCursor = true
  }

  hover() {
    this.hovered = true
    Wall.lastHovered = this
  }

  unhover() {
    this.hovered = false
  }

  select() {
    if (Wall.selection) Wall.selection.selected = false
    Wall.selection = this
    this.selected = true
  }

  update() {
    this.markerSprite.alpha = 0
    if (this.hovered) this.markerSprite.alpha = .5
    if (this.selected) this.markerSprite.alpha = 1
  }

  buildTower(type) {
    if (this.tower) {
      this.tower.changeType(type)
    } else {
      this.tower = new Tower(type)
      $gameState.addEntity(this.tower)
      this.tower.sprite.alignIn(this.sprite, Phaser.CENTER)
    }
  }
}
