export default class Entity {

  get x() {
    return this._x
  }

  get y() {
    return this._y
  }

  setGame(game) {
    this._game = game
  }

  setPosition(x, y) {
    this._x = x
    this._y = y
  }
}
