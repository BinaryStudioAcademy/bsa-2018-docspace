import io from 'socket.io-client'

export default (socketEndpointPort) => {
  const currentLocation = new URL(window.location.href)

  return process.env.NODE_ENV === 'production'
    ? io()
    : io(`${currentLocation.protocol}${currentLocation.hostname}:3001`)
}
