const router = require('express').Router()
const permissionsService = require('../../services/permissionsService')

router.put('/:id', permissionsService.findOneAndUpdate)

module.exports = router
