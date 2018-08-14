const GeneralRepository = require('./GeneralRepository')
const PageModel = require('../models/pageScheme')

class PageRepository extends GeneralRepository {

}

module.exports = new PageRepository(PageModel)
