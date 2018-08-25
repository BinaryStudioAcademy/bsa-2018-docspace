module.exports = {
  checkConnection (client) {
    client.cluster.health({}, function (error) {
      if (error) {
        console.trace('elasticsearch cluster is down!')
      } else {
        console.log('All is well')
      }
    })
  },

  createIndex (client, name) {
    client.indices.create({
      index: name
    }, (err, resp, status) => {
      if (err) {
        console.log(err)
      } else {
        console.log(`created index ${name}`, resp)
      }
    })
  }
}
