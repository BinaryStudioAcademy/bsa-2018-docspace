const router = require('express').Router()
const pageService = require('../../services/pageService')

router.get('/', pageService.findAll)

router.get('/:id', pageService.findOne)

router.post('/', pageService.add)

router.post('/search', pageService.search)

router.put('/:id', pageService.findOneAndUpdate)

router.delete('/:id', pageService.findOneAndDelete)

module.exports = router
