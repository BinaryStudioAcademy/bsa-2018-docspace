module.exports = (io) => {
  io.on('connection', socket => {
    console.log('CONNECTED TO SOCKET')
    socket.on('share redux action', action => {
      socket.broadcast.emit('external redux action from another client', action)
    })
  })
}
