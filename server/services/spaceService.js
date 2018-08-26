const SpaceRepository = require('../repositories/SpaceRepository')
const BlogRepository = require('../repositories/BlogRepository')
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
        console.log(blog)
        const spaceWithOwnerAndEmptyBlog = { ...req.body, ownerId: req.user._id, blogId: blog._id }
        SpaceRepository.create(spaceWithOwnerAndEmptyBlog)
          .then(space => res.json(space))
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

  findOneAndDelete: (req, res) => {
    const id = req.params.id

    if (id.length === 0) {
      res.status(400)

      return res.end('Invalid id')
    }

    SpaceRepository.delete(id)
      .then(data => res.json(data))
      .catch((err) => {
        console.log(err)
        res.status(400)
        res.end()
      })
  }
}
