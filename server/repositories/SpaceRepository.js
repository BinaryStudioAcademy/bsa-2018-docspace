const GeneralRepository = require('./GeneralRepository')
const SpaceModel = require('../models/spaceScheme')

class SpaceRepository extends GeneralRepository {
  addPageToSpace (page) {
    return this.model.update(
      { _id: page.spaceId },
      { $push: { 'pages': page._id } }
    )
  }
}

module.exports = new SpaceRepository(SpaceModel)
