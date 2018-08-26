import socketEndpointPort from './constants/socketEndpointPort'
import createClientSocket from './createClientSocket'
import { store } from 'src/commonLogic/store'

const socket = createClientSocket(socketEndpointPort)
socket.on('external redux action from another client', action => {
  store.dispatch({ ...action })
}
)

export default socket
