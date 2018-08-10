const PageRepository = require('../repositories/PageRepository')
const scheme = require('../models/pageScheme')

module.exports = {
  findAll: (req, res) => {
    PageRepository.getAll()
      .then(pages => {
        res.send(pages)
      }).catch(err => {
        res.status(500).send({
          message: err.message || 'Some error occurred while retrieving pages.'
        })
      })
  },

  findOne: (req, res) => {
    PageRepository.getById(req.params.id)
      .then(page => {
        if (!page) {
          return res.status(404).send({
            message: 'page not found with id ' + req.params.id
          })
        }
        res.send(page)
      }).catch(err => {
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
    const Page = new scheme.Page({
      title: req.body.title,
      content: req.body.content,
      created: {
        date: req.body.created.date,
        userId: req.body.created.userId
      },
      comments: req.body.comments,
      usersLikes: req.body.usersLikes,
      isDeleted: req.body.isDeleted
    })

    Page.save()
      .then(page => {
        res.send(page)
      }).catch(err => {
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
        res.send(page)
      }).catch(err => {
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
    PageRepository.delete(req.params.id)
      .then(page => {
        if (!page) {
          return res.status(404).send({
            message: 'page not found with id ' + req.params.id
          })
        }
        res.send({message: 'page deleted successfully!'})
      }).catch(err => {
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
