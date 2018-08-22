const GeneralRepository = require('./GeneralRepository')
const scheme = require('../models/userScheme')

class UserRepository extends GeneralRepository {
  getByToken (token) {
    return this.model.findOne({ resetPasswordToken: token, resetPasswordExpires: { $gt: Date.now() } })
  }
}

module.exports = new UserRepository(scheme.User)
