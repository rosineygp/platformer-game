export default anims => {
    anims.create({
        key: 'birdman-idle',
        frames: anims.generateFrameNames('birdman', {start: 0, end: 12}),
        frameRate: 8,
        repeat: -1
    })

    anims.create({
        key: 'birdman-hurt',
        frames: anims.generateFrameNames('birdman', {start: 25, end: 26}),
        frameRate: 10,
        repeat: 0
    })
}