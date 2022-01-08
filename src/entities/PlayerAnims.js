export default anims => {
    anims.create({
        key: 'idle',
        frames: anims.generateFrameNames('player', {start: 0, end: 8}),
        frameRate: 8,
        repeat: -1
    })
    anims.create({
        key: 'run',
        frames: anims.generateFrameNames('player', {start: 11, end: 16}),
        frameRate: 8,
        repeat: -1
    })
}