const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId

const GeneralRepository = require('./GeneralRepository')
const SpaceModel = require('../models/spaceScheme')

class SpaceRepository extends GeneralRepository {
  addPageToSpace (page) {
    return super.update(page.spaceId, {'$addToSet': {'pages': page._id}})
  }

  deletePageFromSpace (spaceId, pageId) {
    return this.model.update(
      { _id: spaceId },
      { $pull: { 'pages': pageId } }
    )
  }
  getNotDeletedSpaces () {
    return this.model.find({isDeleted: false}).distinct('_id')
  }
  getAll () {
    return this.model.aggregate([
      {
        $match: { isDeleted: false }
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
        $project: {
          _id: 1,
          name: 1,
          description: 1,
          ownerId: 1,
          blogId: 1,
          categories: {
            _id: 1,
            name: 1
          },
          spaceSettings: 1
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
          as: 'ownerId'
        }
      },
      {
        $unwind: {
          path: '$ownerId',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $project: {
          _id: 1,
          name: 1,
          key: 1,
          isDeleted: 1,
          ownerId: {
            _id: 1,
            firstName: 1,
            lastName: 1,
            login: 1
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
          rights: 1,
          spaceSettings: 1
        }
      }
    ])
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

  updateHistory (id, historyId) {
    return super.update(id, {'$push': {'history': historyId}})
  }

  deleteOneHistory (id, historyId) {
    return super.update(id, {'$pull': {'history': historyId}})
  }

  deleteAllHistory (id) {
    return super.update(id, {'$set': {'history': []}})
  }

  searchByTitle (filter) {
    return this.model.aggregate([
      {
        $match: {name: { $regex: filter, $options: 'i' }}
      },
      {
        $project: {
          _id: 1,
          name: 1,
          key: 1
        }
      }
    ])
  }
}

module.exports = new SpaceRepository(SpaceModel)
