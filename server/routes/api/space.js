const router = require('express').Router()
const spaceService = require('../../services/spaceService')

router.get('/', spaceService.findAll)

router.get('/:id', spaceService.findOne)

router.post('/', spaceService.add)

router.put('/:id', spaceService.findOneAndUpdate)

router.delete('/:id', spaceService.findOneAndDelete)

module.exports = router
