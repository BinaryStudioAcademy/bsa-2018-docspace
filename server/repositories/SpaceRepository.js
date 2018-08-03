const GeneralRepository = require('./GeneralRepository');
const SpaceModel = require('../models/space');

class SpaceRepository extends GeneralRepository {

}

module.exports = new SpaceRepository(SpaceModel);
