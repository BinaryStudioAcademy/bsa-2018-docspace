const router = require('express').Router()
const groupService = require('../../services/groupService')

router.get('/user/:id', groupService.findAll)

router.get('/:id', groupService.findById)

router.post('/', groupService.add)

router.put('/:id', groupService.update)

router.delete('/:id', groupService.delete)

module.exports = router
