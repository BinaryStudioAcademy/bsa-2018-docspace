const CategoryRepository = require('../repositories/CategoryRepository')
const scheme = require('../models/categoryScheme')

module.exports = {
  findAll: (req, res) => {
    CategoryRepository.getAll()
      .then(categories => {
        res.send(categories)
      }).catch(err => {
        res.status(500).send({
          message: err.message || 'Some error occurred while retrieving category.'
        })
      })
  },

  findOne: (req, res) => {
    console.log(req)
    CategoryRepository.getById(req.params.id)
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
    CategoryRepository.get({name: req.body.name})
      .then(category => {
        if (!category) {
          category = new scheme.Category({
            name: req.body.name
          })
        } else {
          return res.status(200).send({message: 'This category already exist'})
        }
        category.save()
          .then(category => {
            res.send(category)
          })
          .catch(err => {
            res.status(500).send({
              message: err.message || 'Some error occurred while creating the category.'
            })
          })
      })
      .catch(err => console.log(err))
  },

  findOneAndDelete: (req, res) => {
    CategoryRepository.delete(req.params.id)
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
