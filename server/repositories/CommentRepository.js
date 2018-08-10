const GeneralRepository = require('./GeneralRepository')
const scheme = require('../models/commentScheme')

class CommentRepository extends GeneralRepository {

}

module.exports = new CommentRepository(scheme.Comment)
