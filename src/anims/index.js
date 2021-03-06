export default (anims) => {
  anims.create({
    key: 'hit-effect',
    frames: anims.generateFrameNames('hit-sheet', { start: 0, end: 4 }),
    frameRate: 10,
    repeat: 0,
  })

  anims.create({
    key: 'sword-default-swing',
    frames: anims.generateFrameNames('sword-default', { start: 0, end: 2 }),
    frameRate: 20,
    repeat: 0,
  })

  anims.create({
    key: 'fireball',
    frames: [
      { key: 'fireball-1' },
      { key: 'fireball-2' },
      { key: 'fireball-3' },
    ],
    frameRate: 5,
    repeat: -1,
  })
}
