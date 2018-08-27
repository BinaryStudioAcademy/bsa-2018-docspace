import socketEndpointPort from './constants/socketEndpointPort'
import createClientSocket from './createClientSocket'

export default () => {
  const socket = createClientSocket(socketEndpointPort)
  return new Promise(resolve => {
    socket.on('connect', () => resolve(socket))
  })
}
