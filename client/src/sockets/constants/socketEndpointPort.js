
// TODO: find a way to pass server port from server... ? Like from .env file...
// Think about it

const serverPort = (process.env.NODE_ENV === 'production')
  ? 8080
  : 3001
export default serverPort
