import _ from 'lodash'

export default class State {

  constructor() {
    _.bindAll(this, 'preload', 'create', 'update')
    this._entities = []
  }

  addEntity(entity) {
    this._entities.push(entity)
  }

  preload(game) {
    this._game = game
    for (let entity of this._entities) {
      entity._game = game
      if (entity.preload) {
        entity.preload()
      }
    }
  }

  create() {
    this._game.physics.startSystem(Phaser.Physics.ARCADE)
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
