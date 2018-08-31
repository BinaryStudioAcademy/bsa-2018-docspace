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
      },
      { '$unwind': '$commentsArr' },
      {
        '$lookup': {
          from: 'users',
          localField: 'commentsArr.userId',
          foreignField: '_id',
          as: 'commentsArr.user'
        }
      },
      {
        $group: {
          '_id': '$_id',
          'spaceId': { '$first': '$spaceId' },
          'title': { '$first': '$title' },
          'isDeleted': { '$first': '$isDeleted' },
          'content': { '$first': '$content' },
          'createdAt': { '$first': '$createdAt' },
          'updatedAt': { '$first': '$updatedAt' },
          'commentsArr': { '$push': '$commentsArr' }
        }
      }
    ])
  }
  update (id, data) {
    return super.update(id, data)
      .then(() => this.getById(id))
  }

  advancedSearch (input) {
    return this.model.search({
      // query for match some input in field 'title' OR 'content'
      multi_match: {
        query: input,
        fields: [ 'title', 'content' ]
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
