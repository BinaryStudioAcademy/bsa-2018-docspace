const GeneralRepository = require('./GeneralRepository')
const scheme = require('../models/userScheme')

class UserRepository extends GeneralRepository {
  getByToken (token) {
    return this.model.findOne({ resetPasswordToken: token, resetPasswordExpires: { $gt: Date.now() } })
  }

  addSpaceToUser (UserAndSpaceIds) {
    return super.update(UserAndSpaceIds.userId, {$push: { spaces: UserAndSpaceIds.spaceId }})
  }

  getByName (nameContains) {
    return this.model.aggregate(
      [
        { $project: {
          name: { $concat: [ '$firstName', ' ', '$lastName' ] },
          email: 1,
          _id: 1
        }},
        {$match: {name: { $regex: nameContains, $options: 'i' }}}
      ]
    )
  }

  getByLogin (login) {
    return this.model.find({'login': login})
  }

  getByLogins (logins) {
    return this.model.find({'login': {$in: logins}})
  }

  deleteSpace (id, spaceId) {
    return super.update(id, {'$pull': {'spaces': spaceId}})
  }

  searchByLoginPart (loginPart) {
    return this.model.aggregate([
      {$match: {login: { $regex: loginPart, $options: 'i' }}}
    ])
  }
}

module.exports = new UserRepository(scheme.User)
