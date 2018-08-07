const space = require('./space')
const user = require('./user')

module.exports = (app) => {
  app.use('/api/user', user)
  app.use('/api/spaces', space)
}
