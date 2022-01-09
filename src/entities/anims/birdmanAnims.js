export default anims => {
    anims.create({
        key: 'birdman-idle',
        frames: anims.generateFrameNames('birdman', {start: 0, end: 12}),
        frameRate: 8,
        repeat: -1
    })
}