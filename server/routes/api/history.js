const router = require('express').Router()
const historyService = require('../../services/historyService')

router.get('/', historyService.findAll)

router.get('/:id', historyService.findOne)

router.get('/user/:login', historyService.findUserHistory)

router.get('/current-user/:id', historyService.findCurrentUserHistory)

router.get('/current-user/:id', historyService.findCurrentUserHistory)

router.post('/', historyService.add)

router.delete('/:id', historyService.findOneAndDelete)

module.exports = router
