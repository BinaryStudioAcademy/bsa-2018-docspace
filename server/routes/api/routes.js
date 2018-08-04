const space = require('./space')
const user = require('./user')
const signup = require('./auth/signup')

module.exports = (app) => {
  app.use('/api/signup', signup)
  app.use('/api/user', user)
  app.use('/api/spaces', space)
}
