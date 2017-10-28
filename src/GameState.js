import _ from 'lodash'
import Enemy from './Enemy'
import Path from './Path'
import Player from './Player'
import Portal from './Portal'
import Wall from './Wall'
import worldTxt from './world.txt'

export default class State {

  constructor() {
    _.bindAll(this, 'init', 'preload', 'create', 'update')
    this.entities = []
  }

  addEntity(entity) {
    this.entities.push(entity)
  }

  init() {
    initEntities(this)
  }

  preload() {
    Path.preload()
    Wall.preload()
    Portal.preload()
    Enemy.preload()
    Player.preload()
  }

  create() {
    $game.physics.startSystem(Phaser.Physics.ARCADE)
    for (let entity of this.entities) {
      if (entity.create) {
        entity.create()
      }
    }
  }

  update() {
    for (let entity of this.entities) {
      if (entity.update) {
        entity.update()
      }
    }
  }
}

function initEntities(gameState) {
  const lines = worldTxt.split(/\r?\n/)
  let row = 0
  let topPaths = []
  for (let line of lines) {
    let column = 0
    let leftPath = null
    for (let char of line) {
      const entity = createEntity(char)
      if (entity) {
        entity.setTile(column, row)
        gameState.addEntity(entity)
      }
      if (entity instanceof Player) {
        if (gameState.player) throw new Error('Multiple start points defined')
        gameState.player = entity
      }
      if (!(entity instanceof Wall)) {
        const path = new Path
        path.setTile(column, row)
        path.left = leftPath
        if (leftPath) leftPath.right = path
        leftPath = path
        path.top = topPaths[column]
        if (topPaths[column]) topPaths[column].bottom = path
        topPaths[column] = path
        gameState.addEntity(path)
      } else {
        leftPath = null
        topPaths[column] = null
      }
      ++column
    }
    ++row
  }
  if (!gameState.player) throw new Error('No start points defined')
}

function createEntity(char) {
  switch (char) {
    case '#': return new Wall
    case 'S': return new Player
    case 'P': return new Portal
    case ' ': return null
    default: throw new Error(`Unknown entity in definition ('${char}')`)
  }
}
