const GeneralRepository = require('./GeneralRepository')
const scheme = require('../models/historyScheme')

class HistoryRepository extends GeneralRepository {
  // Possibility to delete history for current Page or Space etc
  deleteAllHistoryInCriteria (criteriaId) {
    return this.deleteMany({criteriaId})
  }

  getCurrentUserHistory (id) {
    return this.getAllByCriteria({userId: id})
  }

  getCurrentPageHistory (id, version) {
    return this.getAllByCriteria({ pageId: id, modifiedVersion: version })
  }

  getUserHistory (id) {
    return this.model.find({userId: id, action: { $in: [/PAGE/, /BLOG/] }}).limit(8)
  }
  getUserWorks (id) {
    return this.model.find({userId: id, action: { $in: [/UPDATE_PAGE/, /UPDATE_BLOG/] }})
  }
}

module.exports = new HistoryRepository(scheme.History)
