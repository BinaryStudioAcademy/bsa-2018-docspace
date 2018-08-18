const GeneralRepository = require('./GeneralRepository')
const scheme = require('../models/commentScheme')

class CommentRepository extends GeneralRepository {
  delete (id) {
    return super.delete(id)
      .then(() => super.deleteByCondition({parentId: id}))
  }
}

module.exports = new CommentRepository(scheme.Comment)
