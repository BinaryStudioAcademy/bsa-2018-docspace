const GeneralRepository = require('./GeneralRepository')
const PageModel = require('../models/pageScheme')
const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId

class PageRepository extends GeneralRepository {
  getAll () {
    return this.model.aggregate([
      {
        '$match': { isDeleted: false }
      }
    ])
  }

  getById (id) {
    return this.model.aggregate([
      {
        '$match': { _id: ObjectId(id) }
      },
      {
        '$lookup': {
          from: 'comments',
          localField: 'comments',
          foreignField: '_id',
          as: 'commentsArr'
        }
      }
    ])
  }

  update (id, data) {
    return this.model.findById(id)
      .then(page => {
        Object.keys(data).forEach(key => { page[key] = data[key] })
        page.save()
        return page
      })
      .then((page) => this.getById(id))
  }

  advancedSearch (input) {
    return this.model.esSearch({
      // query for match some input in field 'title' OR 'content'
      query: {
        multi_match: {
          query: input,
          fields: [ 'title', 'content' ]
        }
      },

      highlight: {
        pre_tags: [ '<b>' ],
        post_tags: [ '</b>' ],
        fields: {
          '*': { }
        }
        // encoder: 'html',
        // boundary_scanner: 'chars',
        // boundary_chars: '<.,!? \t\n'

        // fields: {
        //   _all: {
        //       "fragment_size": 400,
        //       "number_of_fragments": 1,
        //       "no_match_size": 20
        //   }
        // }
      }
    })
  }

  deleteFromElasticAndReturnById (id) {
    return new Promise((resolve, reject) => {
      this.model.findOne({_id: id})
        .then(page => {
          page.unIndex(err => {
            if (err) throw err
            resolve(page)
          })
        })
        .catch(err => {
          reject(err)
        })
    })
  }
}

module.exports = new PageRepository(PageModel)
