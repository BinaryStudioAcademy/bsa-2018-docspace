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

const ObjectId = require('mongoose').Types.ObjectId

// function returnSpaceWithAuthUserPermissions (req, res, space) {
//   const {users, groups} = space.permissions
//   console.log(' LOOOOK !!!!! ________________________')
//   console.log(space.watchedBy)
//   const isWatched = space.watchedBy.indexOf(ObjectId(req.user._id)) !== -1
//   console.log(isWatched)
//   let expandedSpace = { ...space._doc, isWatched }

//   if (String(space.ownerId._id) === String(req.user._id)) {
//     // If user is space owner - he can get it
//     return res.json({ ...expandedSpace, authUserPermissions: adminPermissions })
//   }

//   for (let i = 0; i < users.length; i++) {
//     if (String(users[i].userId) === String(req.user._id)) {
//       return res.json({ ...expandedSpace, authUserPermissions: users[i] })
//     }
//   }

//   for (let i = 0; i < groups.length; i++) {
//     if (groups[i].groupId.members.some(id => String(id) === String(req.user._id))) {
//       return res.json({ ...expandedSpace, authUserPermissions: groups[i] })
//     }
//   }
// }

const returnSpaceWithAuthUserPermissions = (req, res, space) => {
  const {users, groups} = space.permissions
  console.log('USER ID')
  console.log(req.user._id)
  console.log(space.watchedBy)
  const isWatched = space.watchedBy.indexOf(ObjectId(req.user._id)) !== -1
  console.log(isWatched)
  let expandedSpace = { ...space._doc, isWatched }

  console.log('INSIDE HELPER ________________ ')
  console.log(expandedSpace)
  if (String(space.ownerId._id) === String(req.user._id)) {
    return res.json({ ...expandedSpace, authUserPermissions: adminPermissions })
  }

  for (let i = 0; i < users.length; i++) {
    if ((String(users[i].userId) === String(req.user._id)) && users[i].all.view) {
      return res.json({ ...expandedSpace, authUserPermissions: users[i] })
    }
  }

  for (let i = 0; i < groups.length; i++) {
    if (groups[i].groupId.members.some(id => (String(id) === String(req.user._id)) && groups[i].all.view)) {
      return res.json({ ...expandedSpace, authUserPermissions: groups[i] })
    }
  }
  // user dont have permissions to this space, so we return 404
  return res.status(404).end()
}

module.exports = returnSpaceWithAuthUserPermissions
