const GeneralRepository = require('./GeneralRepository')
const scheme = require('../models/userScheme')

class UserRepository extends GeneralRepository {
  getByToken (token) {
    return this.model.findOne({ resetPasswordToken: token, resetPasswordExpires: { $gt: Date.now() } })
  }
  addSpaceToUser (UserAndSpaceIds) {
    return this.model.update(
      { _id: UserAndSpaceIds.userId },
      { $push: { spaces: UserAndSpaceIds.spaceId } }
    )
  }
  getByName (nameContains) {
    return this.model.aggregate(
      [
        { $project: {
          name: { $concat: [ '$firstName', ' ', '$lastName' ] },
          _id: 1
        }},
        {$match: {name: { $regex: nameContains }}}
      ]
    )
  }
}

module.exports = new UserRepository(scheme.User)
