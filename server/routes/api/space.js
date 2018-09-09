const router = require('express').Router()
const spaceService = require('../../services/spaceService')
const permissionsService = require('../../services/permissionsService')

router.get('/', spaceService.findAll)

router.get('/:id', spaceService.findOne)

router.get('/:id/permissions', permissionsService.getSpacePermissions)

router.post('/:space_id/groups_permissions', permissionsService.addGroupPermissions)

router.post('/:space_id/users_permissions', permissionsService.addUserPermissions)

router.post('/', spaceService.add)

router.put('/:id', spaceService.findOneAndUpdate)

router.put('/watcher/:id', spaceService.addRemoveWatcher)

router.delete('/:id', spaceService.findOneAndDelete)

module.exports = router
