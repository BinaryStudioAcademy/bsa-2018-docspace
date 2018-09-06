
const SpaceRepository = require('../repositories/SpaceRepository')
const PermissionsRepository = require('../repositories/PermissionsRepository')

module.exports = {
  getSpacePermissions: (req, res) => {
    const spaceId = req.params.id
    SpaceRepository.getPermissions(spaceId)
      .then(permissions => res.json(permissions[0]))
      .catch(err => {
        console.log(err)
        res.status(400).end()
      })
  },

  addGroupPermissions: (req, res) => {
    PermissionsRepository.create(req.body)
      .then(permissionsObject => {
        SpaceRepository.addGroupPermissions(req.params.space_id, permissionsObject._id)
          .then((spaceWithPerissionsIds) => res.json(permissionsObject))
      })
      .catch(err => {
        console.log(err)
        res.status(400).json({message: err.message})
      })
  },

  addUserPermissions: (req, res) => {
    PermissionsRepository.create(req.body)
      .then(permissionsObject => {
        SpaceRepository.addUserPermissions(req.params.space_id, permissionsObject._id)
          .then((spaceWithPerissionsIds) => res.json(permissionsObject))
      })
      .catch(err => {
        console.log(err)
        res.status(400).json({message: err.message})
      })
  },

  updateManyPermissionsInDifferentWay: (req, res) => {
    Promise.all(req.body.map(permissions => {
      return PermissionsRepository.update(permissions._id, permissions)
    }))
      .then(updatedPermissionsArray => {
        res.status(200).json(updatedPermissionsArray)
      })
      .catch(err => {
        console.log(err)
        res.status(400).end()
      })
  }
}
