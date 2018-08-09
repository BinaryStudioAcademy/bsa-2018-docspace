const router = require('express').Router()
const spaceService = require('../../services/spaceService')

router.get('/', spaceService.getAll)

router.get('/:id', spaceService.get)

router.post('/', spaceService.create)

router.put('/:id', spaceService.update)

router.delete('/:id', spaceService.delete)

module.exports = router
