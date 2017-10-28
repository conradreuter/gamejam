import _ from 'lodash'
import Player from './Player'
import Portal from './Portal'
import Wall from './Wall'
import worldTxt from './world.txt'

export default class State {

  constructor() {
    _.bindAll(this, 'init', 'preload', 'create', 'update')
    this._entities = []
  }

  get player() {
    return this._player
  }

  init() {
    this._initEntities()
  }

  _initEntities() {
    const lines = worldTxt.split(/\r?\n/)
    let y = 0
    for (let line of lines) {
      let x = 0
      for (let char of line) {
        const entity = this._createEntity(char)
        if (entity) {
          entity.setPosition(x, y)
          this._entities.push(entity)
        }
        x += $constants.TILE_SIZE
      }
      y += $constants.TILE_SIZE
    }
  }

  _createEntity(char) {
    switch (char) {
      case '#': return new Wall
      case 'S': return this._player = new Player
      case 'P': return new Portal
    }
  }

  preload() {
    Wall.classPreload()
    Portal.classPreload()
    for (let entity of this._entities) {
      if (entity.preload) {
        entity.preload()
      }
    }
  }

  create() {
    $game.physics.startSystem(Phaser.Physics.ARCADE)
    for (let entity of this._entities) {
      if (entity.create) {
        entity.create()
      }
    }
  }

  update() {
    for (let entity of this._entities) {
      if (entity.update) {
        entity.update()
      }
    }
  }
}
