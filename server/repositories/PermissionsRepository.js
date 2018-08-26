const GeneralRepository = require('./GeneralRepository')
const PermissionsModel = require('../models/permissions')

class PermissionsRepository extends GeneralRepository {
}

module.exports = new PermissionsRepository(PermissionsModel)
