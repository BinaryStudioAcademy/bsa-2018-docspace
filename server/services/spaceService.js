const SpaceRepository = require('../repositories/SpaceRepository')
const BlogRepository = require('../repositories/BlogRepository')
const UserRepository = require('../repositories/UserRepository')
const PageRepository = require('../repositories/PageRepository')
const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId
const PermissionsRepository = require('../repositories/PermissionsRepository')

module.exports = {
  findAll: (req, res) => {
    SpaceRepository.getAll()
      .then(data => res.json(data))
      .catch((err) => {
        console.log(err)
        res.status(400)
        res.end()
      })
  },

  findOne: async (req, res) => {
    const id = req.params.id

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(404)
      return res.end('Invalid id')
    }
    const space = await SpaceRepository.getById(id)
      .then(space => space)
      .catch((err) => {
        console.log(err)
        res.status(400)
        res.end()
      })
    console.log(space)
    const isWatched = space[0].watchedBy.indexOf(ObjectId(req.user._id)) !== -1
    console.log(isWatched)
    const newSpace = {
      blogId: space[0].blogId,
      categories: space[0].categories,
      createdAt: space[0].createdAt,
      history: space[0].history,
      isDeleted: space[0].isDeleted,
      key: space[0].key,
      name: space[0].name,
      ownerId: space[0].ownerId,
      pages: space[0].pages,
      permissions: space[0].permissions,
      rights: space[0].rights,
      spaceSettings: space[0].spaceSettings,
      updatedAt: space[0].updatedAt,
      _id: space[0]._id,
      isWatched: isWatched
    }
    console.log(newSpace)
    return res.send(newSpace)
  },

  add: (req, res) => {
    if (typeof req.body !== 'object') {
      res.status(400)

      return res.end('Invalid data')
    }

    let spaceBlog, anonymousPermissions
    Promise.all([
      BlogRepository.create({}).then(blog => { spaceBlog = blog }),
      PermissionsRepository.create({}).then(permissions => { anonymousPermissions = permissions })
    ])
      .then(() => {
        const spaceWithOwnerAndEmptyBlog = {
          ...req.body,
          ownerId: req.user._id,
          blogId: spaceBlog._id,
          permissions: {
            anonymous: anonymousPermissions._id
          }
        }
        SpaceRepository.create(spaceWithOwnerAndEmptyBlog)
          .then(space => {
            UserRepository.addSpaceToUser({userId: spaceWithOwnerAndEmptyBlog.ownerId, spaceId: space._id})
              .then(() => {
                SpaceRepository.addWatcher(space._id, req.user._id)
                  .then(() =>
                    res.json(space)
                  )
                  // SpaceRepository.getById(space._id)
                  // .then(getSpace => res.json(getSpace[0]))
                  // .catch(err => console.log(err))
              })
              .catch(err => console.log(err))
          })
      })
      .catch(err => {
        console.log(err)
        res.status(400).end()
      })
  },

  findOneAndUpdate: (req, res) => {
    const id = req.params.id

    if (id.length === 0) {
      res.status(400)

      return res.end('Invalid id')
    }

    SpaceRepository.update(id, req.body)
      .populate('categories', 'name')
      .populate('pages', 'title')
      .populate('ownerId', 'firstName lastName login')
      .then(data => {
        return res.json(data)
      })
      .catch((err) => {
        console.log(err)
        res.status(400)
        res.end()
      })
  },

  findOneAndDelete: async (req, res) => {
    const id = req.params.id

    if (id.length === 0) {
      res.status(400)

      return res.end('Invalid id')
    }

    const deletedSpace = await SpaceRepository.update(id, { '$set': { 'isDeleted': true } })
      .then(space => {
        UserRepository.getById(space.ownerId)
          .then(user => {
            UserRepository.deleteSpace(user._id, id)
              .then(user => user)
              .catch(err => console.log(err))
          })
          .catch(err => console.log(err))
        return space
      })
      .catch((err) => {
        console.log(err)
        res.status(400)
        res.end()
      })
    PageRepository.updateMany({spaceId: deletedSpace._id}, { '$set': { 'isDeleted': true } })
      .then(() => res.json(deletedSpace))
      .catch((err) => {
        console.log(err)
        res.status(400)
        res.end()
      })
  },

  addRemoveWatcher: (req, res) => {
    if (req.body.toAdd) {
      SpaceRepository.addWatcher(req.params.id, req.body.userId)
        .then(page => res.send({watched: true}))
        .catch(err => res.status(500).send(err))
    } else {
      SpaceRepository.deleteWatcher(req.params.id, req.body.userId)
        .populate({
          path: 'userLikes',
          select: 'firstName lastName'
        })
        .then(page => res.send({unwatched: true}))
        .catch(err => res.status(500).send(err))
    }
  }
}
