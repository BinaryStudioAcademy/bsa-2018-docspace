const GeneralRepository = require('./GeneralRepository')
const SpaceModel = require('../models/space')

class SpaceRepository extends GeneralRepository {
  get (/* key */) {
    return Promise.resolve({
      name: 'Test space',
      ownerId: '111',
      key: 'TS'
    })
    // return this.model.findOne({ key })
  }

  update (key, data) {
    return this.model.findOneAndUpdate({ key }, data, { new: true })
  }

  delete (key) {
    return this.model.deleteOne({ key })
  }
}

module.exports = new SpaceRepository(SpaceModel)
