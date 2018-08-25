const PageRepository = require('../repositories/PageRepository')
// var mammoth = require('mammoth')
const SpaceRepository = require('../repositories/SpaceRepository')
const BlogRepository = require('../repositories/BlogRepository')

module.exports = {
  findAll: (req, res) => {
    PageRepository.getAll()
      .then(pages => {
        res.send(pages)
      }).catch(err => {
        console.log(err)
        res.status(500).send({
          message: err.message || 'Some error occurred while retrieving pages.'
        })
      })
  },

  findOne: (req, res) => {
    PageRepository.getById(req.params.id)
      .then(page => {
        if (!page[0]) {
          return res.status(404).send({
            message: 'page not found with id ' + req.params.id
          })
        }
        res.send(page[0])
      }).catch(err => {
        console.log(err)
        if (err.kind === 'ObjectId') {
          return res.status(404).send({
            message: 'page not found with id ' + req.params.id
          })
        }

        return res.status(500).send({
          message: 'Error retrieving page with id ' + req.params.id
        })
      })
  },

  add: (req, res) => {
    PageRepository.create(req.body)
      .then(page => {
        if (page.blogId) {
          BlogRepository.addPageToBlog(page)
            .then(() => {
              return res.json(page)
            })
            .catch(err => {
              console.log(err)
              res.status(500).send(err.message)
            })
        } else {
          SpaceRepository.addPageToSpace(page)
            .then(() => {
              return res.json(page)
            })
            .catch(err => {
              console.log(err)
              res.status(500).send(err.message)
            })
        }
      }).catch(err => {
        console.log(err)
        res.status(500).send({
          message: err.message || 'Some error occurred while creating the page.'
        })
      })
  },

  findOneAndUpdate: (req, res) => {
    PageRepository.update(req.params.id, req.body)
      .then(page => {
        if (!page) {
          return res.status(404).send({
            message: 'page not found with id ' + req.params.id
          })
        }
        res.send(page[0])
      }).catch(err => {
        console.log(err)
        if (err.kind === 'ObjectId') {
          return res.status(404).send({
            message: 'page not found with id ' + req.params.id
          })
        }
        return res.status(500).send({
          message: 'Error updating page with id ' + req.params.id
        })
      })
  },
  findOneAndDelete: (req, res) => {
    PageRepository.update(req.params.id, {'isDeleted': true})
      .then(page => {
        console.log('DELETED PAGE', page)
        if (page[0].blogId) {
          BlogRepository.deletePageFromBlog(page[0].blogId, page[0]._id)
            .then(() => {
              return res.json(page)
            })
            .catch(err => {
              console.log(err)
              res.status(500).send(err.message)
            })
        } else {
          SpaceRepository.deletePageFromSpace(page[0].spaceId, page[0]._id)
            .then((space) => {
              console.log(space)
              return res.json(page)
            })
            .catch(err => {
              console.log(err)
              res.status(500).send(err.message)
            })
        }
      }).catch(err => {
        console.log(err)
        if (err.kind === 'ObjectId' || err.name === 'NotFound') {
          return res.status(404).send({
            message: 'page not found with id ' + req.params.id
          })
        }
        return res.status(500).send({
          message: 'Could not delete page with id ' + req.params.id
        })
      })
  }
}
