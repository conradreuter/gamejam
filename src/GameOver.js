export default {

  preload() {
    const text = $game.add.text(0, 0, 'GAME\nOVER', {
      boundsAlignH: 'center',
      boundsAlignV: 'middle',
      fill: '#ff0000',
      font: 'bold 72px',
    })
    text.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2)
    text.setTextBounds(0, 0, $game.width, $game.height)
  }
}
