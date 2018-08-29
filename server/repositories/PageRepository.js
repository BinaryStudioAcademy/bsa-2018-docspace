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
    console.log('aaaa')
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
          as: 'likes'
        }
      },
      {
        '$unwind': {
          path: '$commentsArr',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        '$lookup': {
          from: 'users',
          localField: 'commentsArr.userLikes',
          foreignField: '_id',
          as: 'commentsArr.likes'
        }
      },
      {
        '$group': {
          '_id': '$_id',
          // 'commentsArr': { '$push': '$commentsLikes' },
          // 'commentsArr.commentsLikes': { '$addToSet': '$commentsLikes' },
          'commentsArr': {'$addToSet': '$commentsArr'},
          // 'commentsArr': {'$addToSet': '$commentsLikes'},
          'title': {'$first': '$title'},
          'spaceId': {'$first': '$spaceId'},
          'createdAt': {'$first': '$createdAt'},
          'updatedAt': {'$first': '$updatedAt'},
          'isDeleted': {'$first': '$isDeleted'},
          'comments': {'$first': '$comments'},
          'usersLikes': {'$first': '$usersLikes'},
          'likes': {'$first': '$likes'}
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
