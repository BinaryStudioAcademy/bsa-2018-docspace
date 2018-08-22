const GeneralRepository = require('./GeneralRepository')
const scheme = require('../models/groupScheme')

class GroupRepository extends GeneralRepository {
  getAllForUser (id) {
    console.log(id)
    return this.model.find(
      {
        // $in: [userId, '$members']
        members: {$in: [id]}
      }
    )
  }
  getByTitle (title) {
    return this.model.find({title: title})
  }
}
module.exports = new GroupRepository(scheme.Group)
