
const SpaceRepository = require('../repositories/SpaceRepository')
const PermissionsRepository = require('../repositories/PermissionsRepository')
const UserRepository = require('../repositories/UserRepository')
const GroupRepository = require('../repositories/GroupRepository')

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
    GroupRepository.getByTitle(req.body.groupTitle)
      .then(group => {
        if (!group) { return res.status(400).json({message: 'group not exist'}) }
        PermissionsRepository.create({ ...req.body, groupId: group._id })
          .then(permissionsObject => {
            SpaceRepository.addGroupPermissions(req.params.space_id, permissionsObject._id)
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
      })
      .catch(err => {
        console.log(err)
        res.status(400).json({message: err.message})
      })
  },

  addUserPermissions: (req, res) => {
    UserRepository.getByLogin(req.body.userLogin)
      .then(user => {
        console.log('USER!!!!!!!!!!!!!!!!')
        console.log(user)
        if (!user) { return res.status(400).json({message: 'user not exist'}) }

        const permissionsWithUserId = { ...req.body, userId: user._id }
        console.log(permissionsWithUserId)
        PermissionsRepository.create(permissionsWithUserId)
          .then(permissionsObject => {
            SpaceRepository.addUserPermissions(req.params.space_id, permissionsObject._id)
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
      })
      .catch(err => {
        console.log(err)
        res.status(400).json({message: err.message})
      })
  },

  addAnonymousPermissions: (req, res) => {
    PermissionsRepository.create(req.body)
      .then(permissionsObject => {
        SpaceRepository.addAnonymousPermissions(req.params.space_id, permissionsObject._id)
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
  },

  updateManyPermissionsInDifferentWay: (req, res) => {
    PermissionsRepository.updateManyInDifferentWay(req.premissionsArr)
      .then(() => {
        return res.status(200).end()
      })
      .catch(err => {
        console.log(err)
        res.status(400).end()
      })
  }
}
