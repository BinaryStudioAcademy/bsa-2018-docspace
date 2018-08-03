const user = require('./user')
const space = require('./space');

module.exports = function (app) {
  app.use('/api/user', user)
  app.use('/api/spaces', space);
}
