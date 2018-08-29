const router = require('express').Router()
const pageService = require('../../services/pageService')

router.get('/filter/:criteria', pageService.findByCriteria)

router.get('/', pageService.findAll)

router.get('/:id', pageService.findOne)

router.post('/', pageService.add)

router.put('/:id', pageService.findOneAndUpdate)

router.delete('/:id', pageService.findOneAndDelete)

module.exports = router
