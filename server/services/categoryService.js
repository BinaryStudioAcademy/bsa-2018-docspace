const categoryRepository = require('../repositories/CategoryRepository')
const scheme = require('../models/categoryScheme')

module.exports = {
  findAll: (req, res) => {
    categoryRepository.getAll()
      .then(categories => {
        res.send(categories)
      }).catch(err => {
        res.status(500).send({
          message: err.message || 'Some error occurred while retrieving category.'
        })
      })
  },

  findOne: (req, res) => {
    categoryRepository.get(req.params.id)
      .then(category => {
        if (!category) {
          return res.status(404).send({
            message: 'category not found with id ' + req.params.id
          })
        }
        res.send(category)
      }).catch(err => {
        if (err.kind === 'ObjectId') {
          return res.status(404).send({
            message: 'category not found with id ' + req.params.id
          })
        }
        return res.status(500).send({
          message: 'Error retrieving category with id ' + req.params.id
        })
      })
  },

  add: (req, res) => {
    const category = new scheme.Category({
      name: req.body.name
    })
    category.spaces.push(req.body.spaceId)

    // Save category in the database
    category.save()
      .then(category => {
        res.send(category)
      }).catch(err => {
        res.status(500).send({
          message: err.message || 'Some error occurred while creating the category.'
        })
      })
  },

  findOneAndUpdate: (req, res) => {
    categoryRepository.update(req.params.id, req.body)
      .then(category => {
        if (!category) {
          return res.status(404).send({
            message: 'category not found with id ' + req.params.id
          })
        }
        res.send(category)
      }).catch(err => {
        if (err.kind === 'ObjectId') {
          return res.status(404).send({
            message: 'category not found with id ' + req.params.id
          })
        }
        return res.status(500).send({
          message: 'Error updating category with id ' + req.params.id
        })
      })
  },

  findOneAndDelete: (req, res) => {
    categoryRepository.delete(req.params.id)
      .then(category => {
        if (!category) {
          return res.status(404).send({
            message: 'category not found with id ' + req.params.id
          })
        }
        res.send({message: 'category deleted successfully!'})
      }).catch(err => {
        if (err.kind === 'ObjectId' || err.name === 'NotFound') {
          return res.status(404).send({
            message: 'category not found with id ' + req.params.id
          })
        }
        return res.status(500).send({
          message: 'Could not delete category with id ' + req.params.id
        })
      })
  }
}
