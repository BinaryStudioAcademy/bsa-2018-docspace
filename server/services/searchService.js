
const client = require('../db/connections').elasticClient
const PageRepository = require('../repositories/PageRepository')

class SearchService {
  constructor (client) {
    this.client = client
    this.searchHandlers = {
      'page': (req, res) => {
        console.log('INSIDE PAGE SEARCH')
        // return this.client.indices.delete({ index: '_all'})
        return PageRepository.advancedSearch(req.body.input)
          .then(result => res.json(result.hits.hits))
      }
    }

    this.handleSearch = this.handleSearch.bind(this)
  }

  search (indices, types, body) {
    return this.client.search({
      index: indices,
      type: types,
      body: body
    })
  }

  handleSearch (req, res) {
    console.log('INSIDE SEARCH SERVICE')
    console.log(req.body)
    this.searchHandlers[req.body.entityToSearch](req, res)
      .catch(err => {
        console.log(err)
        return res.status(400).end()
      })
  }
}

module.exports = new SearchService(client)
