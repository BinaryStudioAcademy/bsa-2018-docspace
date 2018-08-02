const Repository = require('./generalRepository')
const scheme = require('../schemes/userScheme')

function UserRepository () {
  Repository.prototype.constructor.call(this)
  this.model = scheme.User
}

UserRepository.prototype = new Repository()

module.exports = new UserRepository()
