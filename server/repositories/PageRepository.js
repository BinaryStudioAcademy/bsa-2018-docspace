const GeneralRepository = require('./GeneralRepository')
const PageModel = require('../models/pageScheme')
const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId

class PageRepository extends GeneralRepository {
  getById (id) {
    return this.model.aggregate([
      {
        '$match': { _id: ObjectId(id) }
      },
      {
        '$lookup': {
          from: 'comments',
          localField: 'comments',
          foreignField: '_id',
          as: 'commentsArr'
        }
      }
    ])
  }
  update (id, data) {
    return super.update(id, data)
      .then(() => this.getById(id))
  }
}

module.exports = new PageRepository(PageModel)
