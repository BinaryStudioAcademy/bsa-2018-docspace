const CategoryRepository = require('../repositories/CategoryRepository')
const SpaceRepository = require('../repositories/SpaceRepository')
const returnSpaceWithAuthUserPermissions = require('./spaceCreateHelper/returnSpaceWithAuthUserPermissions')

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

  add: async (req, res) => {
    let category = await CategoryRepository.get({name: req.body.categoryName})
      .then(category => category)
      .catch(err => err)
    if (!category) {
      category = await CategoryRepository.create({name: req.body.categoryName})
        .then(category => category)
        .catch(err => err)
    }
    SpaceRepository.updateCategory(req.body.spaceId, category._id)
      .populate('categories')
      .populate('pages')
      .then(populatedSpace => { returnSpaceWithAuthUserPermissions(req, res, populatedSpace) })
      .catch(err => err)
  },

  findOneAndDelete: async (req, res) => {
    let numberCategoryInSpaces = await SpaceRepository.getCountCategory(req.params.id)
    if (numberCategoryInSpaces <= 1) {
      CategoryRepository.delete(req.params.id)
    }
    SpaceRepository.deleteCategory(req.body.spaceId, req.params.id)
      .populate('categories')
      .populate('pages')
      .then(populatedSpace => { returnSpaceWithAuthUserPermissions(req, res, populatedSpace) })
      .catch(err => err)
  }
}
