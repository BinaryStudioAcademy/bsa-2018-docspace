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

  // getById (id) {
  //   console.log('aaaa')
  //   return this.model.aggregate([
  //     {
  //       '$match': { _id: ObjectId(id) }
  //     },
  //     {
  //       '$lookup': {
  //         from: 'comments',
  //         localField: 'comments',
  //         foreignField: '_id',
  //         as: 'commentsArr'
  //       }
  //     },
  //     {
  //       '$lookup': {
  //         from: 'users',
  //         localField: 'usersLikes',
  //         foreignField: '_id',
  //         as: 'likes'
  //       }
  //     },
  //     {
  //       '$unwind': {
  //         path: '$commentsArr',
  //         preserveNullAndEmptyArrays: true
  //       }
  //     },
  //     {
  //       '$lookup': {
  //         from: 'users',
  //         localField: 'commentsArr.userLikes',
  //         foreignField: '_id',
  //         as: 'commentsArr.likes'
  //       }
  //     },
  //     {
  //       '$group': {
  //         '_id': '$_id',
  //         'commentsArr': {'$addToSet': '$commentsArr'},
  //         'title': {'$first': '$title'},
  //         'spaceId': {'$first': '$spaceId'},
  //         'createdAt': {'$first': '$createdAt'},
  //         'updatedAt': {'$first': '$updatedAt'},
  //         'isDeleted': {'$first': '$isDeleted'},
  //         'comments': {'$first': '$comments'},
  //         'usersLikes': {'$first': '$usersLikes'},
  //         'likes': {'$first': '$likes'},
  //         'modifiedVersions': {'$first': '$modifiedVersions'},
  //         'version': {'$first': '$version'},
  //         'content': {'$first': '$content'}
  //       }
  //     }
  //   ])
  // }

  // update (id, data) {
  //   return this.model.findById(id)
  //     .then(page => {
  //       Object.keys(data).forEach(key => { page[key] = data[key] })
  //       page.save()
  //     })
  //     .then((page) => this.getById(id))
  // }

  // update (id, data) {
  //   return super.update(id, data)
  //     .then(() => this.getById(id))
  // }

  advancedSearch (query) {
    return this.model.esSearch({
      // query for match some input in field 'title' OR 'content'
      query,
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
