export default (anims) => {
  anims.create({
    key: 'idle',
    frames: anims.generateFrameNames('player', { start: 0, end: 8 }),
    frameRate: 8,
    repeat: -1,
  })

  anims.create({
    key: 'run',
    frames: anims.generateFrameNames('player', { start: 11, end: 16 }),
    frameRate: 8,
    repeat: -1,
  })

  anims.create({
    key: 'jump',
    frames: anims.generateFrameNames('player', { start: 17, end: 23 }),
    frameRate: 2,
    repeat: 1,
  })

  anims.create({
    key: 'throw',
    frames: anims.generateFrameNames('player-throw', { start: 0, end: 7 }),
    frameRate: 14,
    repeat: 0,
  })
}
