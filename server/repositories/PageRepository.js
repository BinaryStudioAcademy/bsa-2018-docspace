const GeneralRepository = require('./GeneralRepository')
const scheme = require('../models/pageScheme')

class PageRepository extends GeneralRepository {

}

module.exports = new PageRepository(scheme.Page)
