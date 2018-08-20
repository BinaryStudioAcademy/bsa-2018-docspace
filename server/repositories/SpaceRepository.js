const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId

const GeneralRepository = require('./GeneralRepository')
const SpaceModel = require('../models/spaceScheme')

class SpaceRepository extends GeneralRepository {
  addPageToSpace (page) {
    return this.model.update(
      { _id: page.spaceId },
      { $push: { 'pages': page._id } }
    )
  }

  getAll () {
    return this.model.aggregate([
      {
        $lookup: {
          from: 'categories',
          localField: 'categories',
          foreignField: '_id',
          as: 'categories'
        }
      },
      {
        $project: {
          _id: 1,
          name: 1,
          description: 1,
          ownerId: 1,
          categories: {
            _id: 1,
            name: 1
          }
        }
      }
    ])
  }

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
        $lookup: {
          from: 'pages',
          localField: 'homePageId',
          foreignField: '_id',
          as: 'homePage'
        }
      },
      { // return single object homePage instead of array with this one object
        $unwind: {
          path: '$homePage',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $lookup: {
          from: 'categories',
          localField: 'categories',
          foreignField: '_id',
          as: 'categories'
        }
      },
      {
        $lookup: {
          from: 'users',
          localField: 'ownerId',
          foreignField: '_id',
          as: 'owner'
        }
      },
      {
        $unwind: {
          path: '$owner',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $project: {
          _id: 1,
          name: 1,
          key: 1,
          isDeleted: 1,
          owner: {
            _id: 1,
            firstName: 1,
            lastName: 1
          },
          description: 1,
          categories: {
            _id: 1,
            name: 1
          },
          blogId: 1,
          homePage: 1,
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

  update (id, data) {
    return super.update(id, data)
      .then(() => this.getById(id))
  }

  create (data) {
    return super.create(data)
      .then(space => this.getById(space._id))
  }

  updateCategory (id, categoryId) {
    return super.update(id, {'$addToSet': {'categories': categoryId}})
  }

  deleteCategory (id, categoryId) {
    return super.update(id, {'$pull': {'categories': categoryId}})
  }

  getCountCategory (id) {
    return this.model.find({'categories': {'$in': [id]}}).count()
  }
}

module.exports = new SpaceRepository(SpaceModel)
