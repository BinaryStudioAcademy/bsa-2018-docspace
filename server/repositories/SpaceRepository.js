const GeneralRepository = require('./GeneralRepository')
const SpaceModel = require('../models/spaceScheme')

class SpaceRepository extends GeneralRepository {

}

module.exports = new SpaceRepository(SpaceModel)
