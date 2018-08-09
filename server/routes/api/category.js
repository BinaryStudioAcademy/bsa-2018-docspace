const router = require('express').Router()
const categoryService = require('../../services/categoryService')

router.get('/', categoryService.findAll)

router.get('/:id', categoryService.findOne)

router.post('/', categoryService.add)

router.delete('/:id', categoryService.findOneAndDelete)

module.exports = router
