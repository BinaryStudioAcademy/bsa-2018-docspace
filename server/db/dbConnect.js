function DbConnectionHandler () {
  const mongoose = require('mongoose')
  const config = require('../config/db')
  console.log(config.uri, config.opts)
  mongoose.connect(config.uri, config.opts)

  mongoose.set('debug', true)

  this.connection = mongoose.connection

  mongoose.connection.on('connected', () => {
    console.log('DB connect')
    this.state = 'connected'
  })

  mongoose.connection.on('error', (err) => {
    console.log('DB disconnected(error) - ', err)
    this.state = 'disconnected'
  })

  mongoose.connection.on('disconnected', () => {
    console.log('DB disconnected')
    this.state = 'disconnected'
  })

  process.on('SIGINT', function () {
    mongoose.connection.close(() => {
      this.state = 'disconnected'
      process.exit(0)
    })
  })
}

module.exports = new DbConnectionHandler()
