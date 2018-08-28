const mongoose = require('mongoose')
const elasticsearch = require('elasticsearch')
const mongoConfig = require('../config/db').get('mongodb', process.env.NODE_ENV)
const elasticConfig = require('../config/db')
  .get('elasticsearch', process.env.NODE_ENV)

mongoose.connect(mongoConfig.uri, mongoConfig.opts)
mongoose.set('debug', true)

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

const elasticClient = new elasticsearch.Client({
  host: {host: elasticConfig.host, port: elasticConfig.port}
})

module.exports.mongoose = mongoose
module.exports.elasticClient = elasticClient
