
const SpaceRepository = require('../repositories/SpaceRepository')
const PermissionsRepository = require('../repositories/PermissionsRepository')

module.exports = {
  getSpacePermissions: (req, res) => {
    const spaceId = req.params.id
    SpaceRepository.getPermissions(spaceId)
      .then(permissions => res.json(permissions))
      .catch(err => {
        console.log(err)
        res.status(400).end()
      })
  },

  addGroupPermissions: (req, res) => {
    PermissionsRepository.create(req.body)
      .then(permissionsObject => {
        SpaceRepository.addGroupPermissions(req.params.spaceId, permissionsObject._id)
          .then((spaceWithPerissionsIds) => res.json(permissionsObject))
          .catch(err => {
            console.log(err)
            res.status(400).end()
          })
      })
      .catch(err => {
        console.log(err)
        res.status(400).end()
      })
  },

  addUserPermissions: (req, res) => {
    PermissionsRepository.create(req.body)
      .then(permissionsObject => {
        SpaceRepository.addUserPermissions(req.params.spaceId, permissionsObject._id)
          .then((spaceWithPerissionsIds) => res.json(permissionsObject))
          .catch(err => {
            console.log(err)
            res.status(400).end()
          })
      })
      .catch(err => {
        console.log(err)
        res.status(400).end()
      })
  },

  addAnonymousPermissions: (req, res) => {
    PermissionsRepository.create(req.body)
      .then(permissionsObject => {
        SpaceRepository.addAnonymousPermissions(req.params.spaceId, permissionsObject._id)
          .then((spaceWithPerissionsIds) => res.json(permissionsObject))
          .catch(err => {
            console.log(err)
            res.status(400).end()
          })
      })
      .catch(err => {
        console.log(err)
        res.status(400).end()
      })
  },

  findOneAndUpdate: (req, res) => {
    PermissionsRepository.update(req.params.id, req.body)
      .then(updatedPermissions => {
        res.json(updatedPermissions)
      }).catch(err => {
        console.log(err)
        res.status(400).end()
      })
  }
}
