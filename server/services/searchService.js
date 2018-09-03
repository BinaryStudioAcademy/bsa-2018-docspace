const client = require('../db/connections').elasticClient
const PageRepository = require('../repositories/PageRepository')
const SpaceRepository = require('../repositories/SpaceRepository')
const GroupRepository = require('../repositories/GroupRepository')
const UserRepository = require('../repositories/UserRepository')

class SearchService {
  constructor (client) {
    this.client = client
    this.searchHandlers = {
      'page': (req, res) => {
        console.log('INSIDE PAGE SEARCH')
        // return this.client.indices.delete({ index: '_all'})
        return PageRepository.advancedSearch(req.body.input)
          .then(result => res.json(result.hits.hits))
      },

      'all by name': (req, res) => {
        return Promise.all(
          [
            PageRepository.searchByTitle(req.body.input),
            SpaceRepository.searchByTitle(req.body.input)
          ])
          .then(([pages, spaces]) => {
            console.log([ ...pages, ...spaces ])
            console.log('_______________________________________')
            res.json([ ...pages, ...spaces ])
          })
      },

      'groups by title part': (req, res) => {
        return GroupRepository.searchByTitlePart(req.body.input)
          .then(groups => res.json(groups))
      },

      'users by login part': (req, res) => {
        return UserRepository.searchByLoginPart(req.body.input)
          .then(users => res.json(users))
      }
    }

    this.handleSearch = this.handleSearch.bind(this)
  }

  handleSearch (req, res) {
    this.searchHandlers[req.body.targetToSearch](req, res)
      .catch(err => {
        console.log(err)
        return res.status(400).end()
      })
  }

  // For elasticserach
  search (indices, types, body) {
    return this.client.search({
      index: indices,
      type: types,
      body: body
    })
  }
}

module.exports = new SearchService(client)
