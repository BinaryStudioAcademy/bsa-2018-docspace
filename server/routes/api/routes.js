const space = require('./space')

module.exports = (app) => {
  app.use('/api/spaces', space)
}
