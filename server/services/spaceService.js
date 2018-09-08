const SpaceRepository = require('../repositories/SpaceRepository')
const BlogRepository = require('../repositories/BlogRepository')
const UserRepository = require('../repositories/UserRepository')
const PageRepository = require('../repositories/PageRepository')
var mongoose = require('mongoose')
const PermissionsRepository = require('../repositories/PermissionsRepository')

const adminPermissions = {
  all: {
    view: true
  },

  blog: {
    add: true,
    delete: true
  },

  pages: {
    add: true,
    delete: true
  },

  comments: {
    add: true,
    delete: true
  },

  space: {
    export: true,
    administrate: true
  }
}

module.exports = {
  findAll: (req, res) => {
    SpaceRepository.getAll()
      .populate({
        path: 'permissions.groups',
        populate: {path: 'groupId', select: 'members'}
      })
      .populate({
        path: 'permissions.users'
      })
      .populate('categories')
      .then(spaces => {
        let authPermissions = []

        let filtered = spaces.filter((space) => {
          if (String(space.ownerId) === String(req.user._id)) {
            authPermissions.push(adminPermissions)
            return true
          }

          return space.permissions.users.some(perm => {
            if (String(perm.userId) === String(req.user._id)) {
              authPermissions.push(perm)
              return true
            }
          }) ||
          space.permissions.groups.some(perm => {
            if (perm.groupId.members.some(id => String(id) === String(req.user._id))) {
              authPermissions.push(perm)
              return true
            }
          })
        })

        res.json(filtered.map((space, index) => ({ ...space._doc, authUserPermissions: authPermissions[index] })))
      })
      .catch((err) => {
        console.log(err)
        res.status(400)
        res.end()
      })
  },

  findOne: (req, res) => {
    const id = req.params.id

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(404)
      return res.end('Invalid id')
    }

    SpaceRepository.getById(id)

      .then(space => {
        if (!space) {
          return res.status(404).end()
        }

        returnSpaceWithAuthUserPermissions(req, res, space)

        // return not authorized to see the space
      })

      .catch((err) => {
        console.log(err)
        res.status(400)
        res.end()
      })
  },

  add: (req, res) => {
    if (typeof req.body !== 'object') {
      res.status(400)

      return res.end('Invalid data')
    }

    console.log('IN SPACE CREATING _________________')
    console.log(req.body)

    let spaceBlog, anonymousPermissions
    Promise.all([
      BlogRepository.create({}).then(blog => { spaceBlog = blog }),
      PermissionsRepository.create({}).then(permissions => { anonymousPermissions = permissions })
    ])
      .then(() => {
        const spaceWithOwnerAndEmptyBlog = {
          ...req.body,
          ownerId: req.user._id,
          blogId: spaceBlog._id,
          permissions: {
            anonymous: anonymousPermissions._id
          }
        }
        SpaceRepository.create(spaceWithOwnerAndEmptyBlog)
          .then(space => {
            UserRepository.addSpaceToUser({userId: spaceWithOwnerAndEmptyBlog.ownerId, spaceId: space._id})
              .then(() => {
                SpaceRepository.getById(space._id)
                  .then(space => res.json({ ...space._doc, authUserPermissions: adminPermissions }))
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
          .catch(err => console.log(err))
      })
      .catch(err => {
        console.log(err)
        res.status(400).end()
      })
  },

  findOneAndUpdate: (req, res) => {
    const id = req.params.id

    if (id.length === 0) {
      res.status(400)

      return res.end('Invalid id')
    }

    SpaceRepository.update(id, req.body)
      .populate('categories', 'name')
      .populate('pages', 'title')
      .populate('ownerId', 'firstName lastName login')
      .populate('homePage')
      .then(space => {
        returnSpaceWithAuthUserPermissions(req, res, space)
      })
      .catch((err) => {
        console.log(err)
        res.status(400)
        res.end()
      })
  },

  findOneAndDelete: async (req, res) => {
    const id = req.params.id

    if (id.length === 0) {
      res.status(400)

      return res.end('Invalid id')
    }

    const deletedSpace = await SpaceRepository.update(id, { '$set': { 'isDeleted': true } })
      .then(space => {
        UserRepository.getById(space.ownerId)
          .then(user => {
            UserRepository.deleteSpace(user._id, id)
              .then(user => user)
              .catch(err => console.log(err))
          })
          .catch(err => console.log(err))
        return space
      })
      .catch((err) => {
        console.log(err)
        res.status(400)
        res.end()
      })
    PageRepository.updateMany({spaceId: deletedSpace._id}, { '$set': { 'isDeleted': true } })
      .then(() => res.json(deletedSpace))
      .catch((err) => {
        console.log(err)
        res.status(400)
        res.end()
      })
  }
}

function returnSpaceWithAuthUserPermissions (req, res, space) {
  const {users, groups} = space.permissions

  if (String(space.ownerId._id) === String(req.user._id)) {
    // If user is space owner - he can get it
    return res.json({ ...space._doc, authUserPermissions: adminPermissions })
  }

  for (let i = 0; i < users.length; i++) {
    if (String(users[i].userId) === String(req.user._id)) {
      return res.json({ ...space._doc, authUserPermissions: users[i] })
    }
  }

  for (let i = 0; i < groups.length; i++) {
    if (groups[i].groupId.members.some(id => String(id) === String(req.user._id))) {
      return res.json({ ...space._doc, authUserPermissions: groups[i] })
    }
  }
}
