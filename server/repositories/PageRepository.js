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
        '$group': {
          '_id': '$_id',
          'commentsArr': {'$addToSet': '$commentsArr'},
          'title': {'$first': '$title'},
          'spaceId': {'$first': '$spaceId'},
          'content': {'$first': '$content'},
          'createdAt': {'$first': '$createdAt'},
          'updatedAt': {'$first': '$updatedAt'},
          'isDeleted': {'$first': '$isDeleted'},
          'comments': {'$first': '$comments'},
          'usersLikes': {'$first': '$usersLikes'},
          'likes': {'$first': '$likes'},
          'modifiedVersions': {'$first': '$modifiedVersions'},
          'version': {'$first': '$version'}
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

//   searchByTitle (filter) {
//   //   return this.model.find({title: { $regex: filter, $options: 'i' }})
//   //     .populate({ path: 'spaceId', select: '_id' })
//   //     .populate({ path: 'spaceId', select: 'name' })
//   // }
//     return this.model.aggregate([
//       {
//         $match: {title: { $regex: filter, $options: 'i' }}
//       },
//       {
//         $lookup: {
//           from: 'spaces',
//           localField: 'spaceId',
//           foreignField: '_id',
//           as: 'space'
//         }
//       },
//       {
//         $group: {
//           '_id': '$space._id',
//             'pageId': {'$addToSet': '$_id'},
//             'title': {'$addToSet': '$title'}
//           }
//         }
//     ])
//   }
}

//   '$lookup': {
//     from: 'comments',
//     localField: 'comments',
//     foreignField: '_id',
//     as: 'commentsArr'
//   }
// },
module.exports = new PageRepository(PageModel)
