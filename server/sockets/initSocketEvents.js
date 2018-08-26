module.exports = (io) => {
  io.on('connection', socket => {
    socket.on('share redux action', action => {
      socket.broadcast.emit('external redux action from another client', action)
    })
  })
}
