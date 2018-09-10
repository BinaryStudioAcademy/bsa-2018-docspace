import socketEndpointPort from './constants/socketEndpointPort'
import createClientSocket from './createClientSocket'

export default (user) => {
  const socket = createClientSocket(socketEndpointPort)
  return new Promise(resolve => {
    socket.on('connect', () => {
      socket.emit('save user connection', user._id)
      resolve(socket)
    })
  })
}
