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
  },

  initMapping (client, indexName, documentType, bodySchema) {
    return client.indices.putMapping({
      index: indexName,
      type: documentType,
      body: bodySchema
    })
  },

  addDocument (client, indexName, documentType, document) {
    return client.index({
      index: indexName,
      type: documentType,
      body: document
    })
  },

  updateDocument (client, indexName, documentType, documentId, newFieldsOrUpdateScript) {
    return client.update({
      index: indexName,
      type: documentType,
      id: documentId,
      body: newFieldsOrUpdateScript
    })
  },

  search (client, index, body) {
    return client.search({index: index, body: body})
  }
}
