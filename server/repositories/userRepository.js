const GeneralRepository = require('./GeneralRepository')
const scheme = require('../schemes/userScheme')

class UserRepository extends GeneralRepository {

}

module.exports = new UserRepository(scheme.User)
