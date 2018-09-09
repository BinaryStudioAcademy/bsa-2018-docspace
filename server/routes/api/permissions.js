const router = require('express').Router()
const permissionsService = require('../../services/permissionsService')

router.post('/update_many', permissionsService.updateManyPermissionsInDifferentWay)

module.exports = router
