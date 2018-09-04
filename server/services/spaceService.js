const SpaceRepository = require('../repositories/SpaceRepository')
const BlogRepository = require('../repositories/BlogRepository')
const UserRepository = require('../repositories/UserRepository')
const PageRepository = require('../repositories/PageRepository')
var mongoose = require('mongoose')

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

  findOne: (req, res) => {
    const id = req.params.id

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(404)
      return res.end('Invalid id')
    }
    SpaceRepository.getById(id)
      .then((data) => {
        console.log(data)
        if (data.length === 0) {
          res.status(404)
          return res.end()
        }
        res.json(data[0])
      })
      .catch((err) => {
        console.log(err)
        res.status(400)
        res.end()
      })
  },

  add: (req, res) => {
    if (typeof req.body !== 'object') {
      res.status(400)

      return res.end('Invalid data')
    }
    BlogRepository.create({})
      .then(blog => {
        const spaceWithOwnerAndEmptyBlog = { ...req.body,
          ownerId: req.user._id,
          blogId: blog._id
        }
        SpaceRepository.create(spaceWithOwnerAndEmptyBlog)
          .then(space => {
            UserRepository.addSpaceToUser({
              userId: spaceWithOwnerAndEmptyBlog.ownerId,
              spaceId: space._id
            })
              .then(() => {
                return res.json(space)
              })
              .catch(err => console.log(err))
          })
          .catch((err) => {
            console.log(err)
            res.status(400).end()
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
      .then(data => {
        console.log(`anws`, data)
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
  }
}
