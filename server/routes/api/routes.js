const space = require('./space')
const user = require('./user')
const signup = require('./auth/signup')
const login = require('./auth/login')
const category = require('./category')

module.exports = (app) => {
  app.use('/api/signup', signup)
  app.use('/api/login', login)
  app.use('/api/user', user)
  app.use('/api/spaces', space)
  app.use('/api/category', category)
}
