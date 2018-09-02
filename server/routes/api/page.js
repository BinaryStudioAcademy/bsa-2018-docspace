const router = require('express').Router()
const pageService = require('../../services/pageService')
// const searchTitleService = require('../../services/searchTitleService')
// router.get('/search/:filter', searchTitleService.searchTitleService)

router.get('/search/:filter', pageService.searchByTitle)

router.get('/', pageService.findAll)

router.post('/:id', pageService.findOne)

router.post('/', pageService.add)

router.post('/search', pageService.search)

router.put('/:id', pageService.findOneAndUpdate)

router.delete('/:id', pageService.findOneAndDelete)

module.exports = router
