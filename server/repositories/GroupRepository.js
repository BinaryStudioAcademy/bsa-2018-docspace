const GeneralRepository = require('./GeneralRepository')
const scheme = require('../models/groupScheme')
const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId

class GroupRepository extends GeneralRepository {
  getById (id) {
    return this.model.aggregate([
      {
        '$match': { _id: ObjectId(id) }
      },
      {
        '$lookup': {
          from: 'users',
          localField: 'members',
          foreignField: '_id',
          as: 'membersInfo'
        }
      }
    ])
  }

  getAllForUser (id) {
    return this.model.find(
      {
        members: {$in: [id]}
      }
    )
  }

  getByTitle (title) {
    return this.model.findOne({'title': title})
  }

  searchByTitlePart (titlePart) {
    return this.model.aggregate([
      {$match: {title: { $regex: titlePart, $options: 'i' }}}
    ])
  }

  update (id, data) {
    return super.update(id, data)
      .then(() => this.getById(id))
  }
}
module.exports = new GroupRepository(scheme.Group)
