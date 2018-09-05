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
  // create (body, userId) {
  //   console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA')
  //   // console.log(body)
  //   return super.create(body)
  //     .then(page => {
  //     //   // this.addWatcher(page._id, userId)
  //     console.log('HAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA')
  //       console.log(page)
  //     //   console.log(userId)
  //     })
  // }

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

  addWatcher (id, userId) {
    console.log('CHRISSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSs')
    console.log(id)
    console.log(userId)
    return this.model.findOneAndUpdate(id, {'$addToSet': {'watchedBy': userId}})
  }

  deleteWatcher (id, userId) {
    return super.updateOne(id, {'$pull': {'watchedBy': userId}})
  }

  // isWatchedByCurrentUser (id, userId){
  //   pa
  // }
}

module.exports = new PageRepository(PageModel)
