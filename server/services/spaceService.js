const SpaceRepository = require('../repositories/SpaceRepository')
const BlogRepository = require('../repositories/BlogRepository')
const UserRepository = require('../repositories/UserRepository')
const PageRepository = require('../repositories/PageRepository')

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

    if (id.length === 0) {
      res.status(400)

      return res.end('Invalid id')
    }

    SpaceRepository.getById(id)
      .then((data) => {
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
        const spaceWithOwnerAndEmptyBlog = { ...req.body, ownerId: req.user._id, blogId: blog._id }
        console.log(spaceWithOwnerAndEmptyBlog.ownerId)
        SpaceRepository.create(spaceWithOwnerAndEmptyBlog)
          .then(space => {
            UserRepository.addSpaceToUser({userId: spaceWithOwnerAndEmptyBlog.ownerId, spaceId: space._id})
              .then((user) => {
                console.log(user)
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
      .then(data => res.json(data))
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

    SpaceRepository.getById(id)
      .then((data) => {
        if (data.length === 0) {
          res.status(404)
          return res.end()
        }
        UserRepository.getById(data[0].owner._id)
          .then(user => {
            if (data[0].owner._id.equals(user._id)) {
              UserRepository.deleteSpace(user._id, data[0]._id)
                .then(user => console.log(user))
                .catch(err => console.log(err))
            }
            const deletedSpace = SpaceRepository.update(id, { '$set': { 'isDeleted': true } })
              .then(space => space)
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
          })
          .catch(err => console.log(err))
      })
      .catch((err) => {
        console.log(err)
        res.status(400)
        res.end()
      })
  }
}
