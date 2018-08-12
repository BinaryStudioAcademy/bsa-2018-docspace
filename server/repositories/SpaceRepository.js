const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId

const GeneralRepository = require('./GeneralRepository')
const SpaceModel = require('../models/spaceScheme')

class SpaceRepository extends GeneralRepository {
  getById (id) {
    return this.model.aggregate([
      {
        $match: { _id: ObjectId(id) }
      },
      {
        $lookup: {
          from: 'pages',
          localField: 'pages',
          foreignField: '_id',
          as: 'pages'
        }
      },
      {
        $project: {
          _id: 1,
          name: 1,
          key: 1,
          isDeleted: 1,
          ownerId: 1,
          description: 1,
          categories: 1,
          homePageId: 1,
          blogId: 1,
          pages: {
            _id: 1,
            title: 1
          },
          history: 1,
          rights: 1
        }
      }
    ])
  }
}

module.exports = new SpaceRepository(SpaceModel)
