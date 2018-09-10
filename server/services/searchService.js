const client = require('../db/connections').elasticClient
const PageRepository = require('../repositories/PageRepository')
const SpaceRepository = require('../repositories/SpaceRepository')
const GroupRepository = require('../repositories/GroupRepository')
const UserRepository = require('../repositories/UserRepository')

const defaultPageQuery = (input) => ({
  multi_match: {
    query: input,
    fields: [ 'title', 'content' ]
  }
})

class SearchService {
  constructor (client) {
    this.client = client
    this.searchHandlers = {

      'all by name': (req, res) => {
        return Promise.all(
          [
            PageRepository.searchByTitle(req.body.input),
            SpaceRepository.searchByTitle(req.body.input)
          ])
          .then(([pages, spaces]) => {
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
      },

      'spaces_by_name': (req, res) => {
        return SpaceRepository.searchNotDeletedByName(req.body.input)
          .then(spaces => res.json(spaces))
      },

      'pages_advanced': (req, res) => {
        let query = generateQueryForPages(req, { isBlog: false })

        return PageRepository.advancedSearch(query)
          .then(result => res.json({ pages: result.hits.hits }))
      },

      'blogs_advanced': (req, res) => {
        let query = generateQueryForPages(req, { isBlog: true })

        return PageRepository.advancedSearch(query)
          .then(result => res.json({ blogs: result.hits.hits }))
      },

      'spaces_advanced': (req, res) => {
        return SpaceRepository.getAllByCriteria(generateQueryForSpaces(req.body))
          .then(spaces => res.json({ spaces: spaces }))
      },

      'all_advanced': (req, res) => {
        //  return this.client.indices.delete({ index: '_all'})
        return Promise.all([
          PageRepository.advancedSearch(generateQueryForPages(req, { isBlog: false })),
          PageRepository.advancedSearch(generateQueryForPages(req, { isBlog: true })),
          SpaceRepository.getAllByCriteria(generateQueryForSpaces(req.body))
        ])
          .then(([ pagesResp, blogsResp, spaces ]) => {
            res.json({
              pages: pagesResp.hits.hits,
              blogs: blogsResp.hits.hits,
              spaces: spaces
            })
          })
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

function generateQueryForSpaces ({ input, userIdFilter, updatedAtFilter, spaceIdFilter }) {
  let query = { isDeleted: false }
  input && (query.name = { '$regex': input, '$options': 'i' })
  userIdFilter && (query.ownerId = userIdFilter)
  spaceIdFilter && (query._id = spaceIdFilter)

  if (updatedAtFilter) {
    query.updatedAt = updatedAtFilter.from !== updatedAtFilter.to
      ? {
        '$gte': new Date(updatedAtFilter.from).setHours(0, 0, 0),
        '$lt': new Date(updatedAtFilter.to).setHours(23, 59, 59)
      }
      : {
        '$gte': new Date(updatedAtFilter.from).setHours(0, 0, 0),
        '$lt': new Date(updatedAtFilter.from).setHours(23, 59, 59)
      }
  }

  return query
}

function generateQueryForPages (req, options) {
  const { input, spaceIdFilter, userIdFilter, updatedAtFilter } = req.body

  let query = {
    bool: { must: [] }
  }

  input && (query.bool.must.push(defaultPageQuery(input)))

  const blogIdExists = {
    exists: {
      field: 'blogId'
    }
  }

  if (options.isBlog) {
    query.bool.must.push(blogIdExists)
  } else {
    query.bool.must_not = [ blogIdExists ]
  }

  let filter = []

  if (spaceIdFilter) {
    filter.push({
      term: { 'spaceId': spaceIdFilter }
    })
  }

  if (userIdFilter) {
    filter.push({
      term: { 'userId': userIdFilter }
    })
  }

  // NOT SHURE!
  if (updatedAtFilter) {
    console.log(' INSIDE IF FILTER DATE')
    if (updatedAtFilter.from !== updatedAtFilter.to) {
      filter.push({
        range: {
          'updatedAt': {
            'gte': new Date(updatedAtFilter.from).setHours(0, 0, 0),
            'lt': new Date(updatedAtFilter.to).setHours(23, 59, 59)
          }
        }
      })
    } else {
      filter.push({
        range: {
          'updatedAt': {
            'gte': new Date(updatedAtFilter.from).setHours(0, 0, 0),
            'lt': new Date(updatedAtFilter.from).setHours(23, 59, 59)
          }
        }
      })
    }
  }

  query.bool.filter = filter

  console.log(query)

  return query
}
