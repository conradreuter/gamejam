import initState from './initState'

new Phaser.Game({
  height: 600,
  parent: document.body,
  renderer: Phaser.WEBGL,
  state: initState(),
  width: 800,
})
