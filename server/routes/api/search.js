const router = require('express').Router()
const searchTitleService = require('../../services/searchTitleService')

router.get('/:filter', searchTitleService.searchTitleService)

router.get('/search', searchTitleService.test)

module.exports = router

// const router = require('express').Router()
// const pageService = require('../../services/pageService')

// router.get('/', pageService.findAll)

// router.get('/:id', pageService.findOne)

// router.post('/', pageService.add)

// router.post('/search', pageService.search)

// router.put('/:id', pageService.findOneAndUpdate)

// router.delete('/:id', pageService.findOneAndDelete)

// module.exports = router
