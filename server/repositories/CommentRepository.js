const GeneralRepository = require('./GeneralRepository')
const scheme = require('../models/commentScheme')

class CommentRepository extends GeneralRepository {
  add (comment, page) {

  }
}

module.exports = new CommentRepository(scheme.Comment)
