const GeneralRepository = require('./GeneralRepository')
const scheme = require('../models/commentScheme')

class CommentRepository extends GeneralRepository {
  addLike (id, userId) {
    return super.update(id, {'$addToSet': {'userLikes': userId}})
  }

  removeLike (id, userId) {
    return super.update(id, {'$pull': {'userLikes': userId}})
  }
}

module.exports = new CommentRepository(scheme.Comment)
