
const UserRepository = require('../repositories/UserRepository')
const NotificationRepository = require('../repositories/NotificationRepository')

let connections = {

}

module.exports = (io) => {
  io.on('connection', socket => {
    console.log('CONNECTED TO SOCKET')
    socket.on('share redux action', action => {
      socket.broadcast.emit('external redux action from another client', action)
    })

    socket.on('save user connection', (userId) => {
      console.log(' SAVE USER CONNECTION :' + socket.id + ' user:' + userId)
      connections[userId] = connections[userId] ? [ ...connections[userId], socket.id ] : [ socket.id ]
      socket.userId = userId
    })

    socket.on('notify users', (notificationParams, usersIdsArr) => {
      NotificationRepository.create({ ...notificationParams, receivers: usersIdsArr })
        .then(notification => {
          UserRepository.notifyUsers(notification._id, usersIdsArr)
            .then(() => {
              usersIdsArr.forEach((userId) => {
                if (connections[userId]) {
                  connections[userId].forEach(socketId => {
                    io.to(socketId).emit('new notification', notification)
                  })
                }
              })
            })
            .catch(err => {
              console.log(err)
            })
        })
        .catch(err => {
          console.log(err)
        })
    })

    socket.on('disconnect', () => {
      if (socket.userId && connections[socket.userId]) {
        connections[socket.userId] = connections[socket.userId].filter(socketId => socketId !== socket.id)
        if (!connections[socket.userId].length) {
          delete connections[socket.userId]
        }
      }
    })
  })
}
