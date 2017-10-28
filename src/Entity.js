export default class Entity {

  setTile(column, row) {
    this.x = column * $constants.TILE_SIZE
    this.y = row * $constants.TILE_SIZE
  }
}
