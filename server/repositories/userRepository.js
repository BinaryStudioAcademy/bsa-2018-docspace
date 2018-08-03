const Repository = require('./generalRepository')
const scheme = require('../schemes/userScheme')

class UserRepository extends Repository {
  constructor () {
    super()
    this.model = scheme.User
  }
}

module.exports = new UserRepository()
