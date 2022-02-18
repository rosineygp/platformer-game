export default (anims) => {
  anims.create({
    key: 'snaky-walk',
    frames: anims.generateFrameNames('snaky', { start: 0, end: 8 }),
    frameRate: 10,
    repeat: -1,
  })

  anims.create({
    key: 'snaky-hurt',
    frames: anims.generateFrameNames('snaky', { start: 21, end: 22 }),
    frameRate: 10,
    repeat: 0,
  })
}
