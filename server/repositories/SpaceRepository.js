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

  deletePageFromSpace (spaceId, pageId) {
    return this.model.update(
      { _id: spaceId },
      { $pull: { 'pages': pageId } }
    )
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

  getPermissions (spaceId) {
    return this.model.aggregate([
      { $match: { _id: ObjectId(spaceId) } },
      {
        $lookup: {
          from: 'permissions',
          localField: 'permissions.user',
          foreignField: '_id',
          as: 'usersPermissions'
        }
      },
      {
        $lookup: {
          from: '$usersPermissions.userId',
          localField: '$usersPermissions.userId',
          foreignField: '_id',
          as: '$usersPermissions.user'
        }
      },
      {
        $lookup: {
          from: 'permissions',
          localField: 'permissions.groups',
          foreignField: '_id',
          as: 'groupsPermissions'
        }
      },
      {
        $lookup: {
          from: 'permissions',
          localField: 'permissions.anonymous',
          foreignField: '_id',
          as: 'anonymousPermissions'
        }
      }
    ])
  }

  addGroupPermissions (spaceId, permissionsId) {
    return this.model.update(
      { _id: spaceId },
      { $push: { 'permissions.groups': permissionsId } }
    )
  }

  addUserPermissions (spaceId, permissionsId) {
    return this.model.update(
      { _id: spaceId },
      { $push: { 'permissions.users': permissionsId } }
    )
  }

  addAnonymousPermissions (spaceId, permissionsId) {
    return this.model.update(
      { _id: spaceId },
      { $set: { 'permissions.anonymous': permissionsId } }
    )
  }
}

module.exports = new SpaceRepository(SpaceModel)
