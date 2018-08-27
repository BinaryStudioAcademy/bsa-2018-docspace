const GeneralRepository = require('./GeneralRepository')
const scheme = require('../models/historyScheme')

class HistoryRepository extends GeneralRepository {
  // Possibility to delete history for current Page or Space etc
  deleteAllHistoryInCriteria (criteriaId) {
    return this.deleteMany({criteriaId})
  }

  getUserHistory (id) {
    return this.getAllByCriteria({userId: id})
  }
}

module.exports = new HistoryRepository(scheme.History)
