import { TILE_SIZE } from './constants'
import Player from './Player'
import Portal from './Portal'
import State from './State'
import Wall from './Wall'
import definition from './world.txt'

export default function initState() {
  const state = new State()
  const lines = definition.split(/\r?\n/)
  let y = 0
  for (let line of lines) {
    let x = 0
    for (let character of line) {
      const entity = createEntity(character)
      if (entity) {
        entity.setPosition(x, y)
        state.addEntity(entity)
      }
      x += TILE_SIZE
    }
    y += TILE_SIZE
  }
  return state
}

function createEntity(character) {
  switch (character) {
    case '#': return new Wall
    case 'S': return new Player
    case 'P': return new Portal
    case ' ': return null
    default: throw new Error(`Unknown world character '${character}'`)
  }
}
