const GeneralRepository = require('./GeneralRepository')
const PageModel = require('../models/pageScheme')

class PageRepository extends GeneralRepository {
  getAll () {
    return this.model.aggregate([
      {
        '$match': { isDeleted: false }
      }
    ])
  }

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

  addWatcher (id, userId) {
    return super.updateOne(id, {'$addToSet': {'watchedBy': userId}})
  }

  deleteWatcher (id, userId) {
    return super.updateOne(id, {'$pull': {'watchedBy': userId}})
  }

  addWatcherForPagesBySpaceId (spaceId, userId) {
    return super.updateMany({'spaceId': spaceId}, {'$push': {'watchedBy': userId}})
  }

  deleteWatcherForPagesBySpaceId (spaceId, userId) {
    return super.updateMany({'spaceId': spaceId}, {'$pull': {'watchedBy': userId}})
  }
}

module.exports = new PageRepository(PageModel)
