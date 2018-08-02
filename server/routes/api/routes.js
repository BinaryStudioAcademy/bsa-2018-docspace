const user = require('./user')

module.exports = function (app) {
  app.use('/api/user', user)
}
