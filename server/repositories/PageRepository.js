const GeneralRepository = require('./GeneralRepository')
const PageModel = require('../models/pageScheme')
// const mongoose = require('mongoose')
// const ObjectId = mongoose.Types.ObjectId

class PageRepository extends GeneralRepository {
  getAll () {
    return this.model.aggregate([
      {
        '$match': { isDeleted: false }
      }
    ])
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

  addNewComment (id, commentId) {
    return super.updateOne(id, {'$addToSet': {'comments': commentId}})
  }

  deleteComment (id, commentId) {
    return super.updateOne(id, {'$pull': {'comments': commentId}})
  }

  addLike (id, userId) {
    return super.updateOne(id, {'$addToSet': {'usersLikes': userId}})
  }

  removeLike (id, userId) {
    return super.updateOne(id, {'$pull': {'usersLikes': userId}})
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
