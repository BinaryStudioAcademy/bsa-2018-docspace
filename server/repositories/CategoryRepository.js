const GeneralRepository = require('./GeneralRepository')
const scheme = require('../models/categoryScheme')

class CategoryRepository extends GeneralRepository {

}

module.exports = new CategoryRepository(scheme.Category)
