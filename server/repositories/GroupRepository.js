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
    console.log(id)
    return this.model.find(
      {
        members: {$in: [id]}
      }
    )
  }
  update (id, data) {
    return super.update(id, data)
      .then(() => this.getById(id))
  }
}
module.exports = new GroupRepository(scheme.Group)
