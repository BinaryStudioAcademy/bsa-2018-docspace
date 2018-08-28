const GeneralRepository = require('./GeneralRepository')
const scheme = require('../models/historyScheme')

class HistoryRepository extends GeneralRepository {
  // Possibility to delete history for current Page or Space etc
  deleteAllHistoryInCriteria (criteriaId) {
    return this.deleteMany({criteriaId})
  }
  getUserHistory (id) {
    console.log(`rep`, id)
    return this.model.find({userId: id, action: { $in: [/PAGE/, /BLOG/] }}).limit(8)
  }
}

module.exports = new HistoryRepository(scheme.History)
