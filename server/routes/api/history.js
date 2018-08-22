const router = require('express').Router()
const historyService = require('../../services/historyService')

router.get('/', historyService.findAll)

router.get('/:id', historyService.findOne)

router.post('/', historyService.add)

router.delete('/:id', historyService.findOneAndDelete)

module.exports = router