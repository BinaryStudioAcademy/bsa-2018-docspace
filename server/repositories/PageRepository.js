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
      {
        '$lookup': {
          from: 'users',
          localField: 'usersLikes',
          foreignField: '_id',
          as: 'usersLikesRef'
        }
      }
    ])
  }
  update (id, data) {
    return super.update(id, data)
      .then(() => this.getById(id))
  }
}

module.exports = new PageRepository(PageModel)
