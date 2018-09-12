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

const returnSpaceWithAuthUserPermissions = (req, res, space) => {
  const {users, groups} = space.permissions

  console.log('INSIDE HELPER ________________ ')
  console.log(space)
  if (String(space.ownerId._id) === String(req.user._id)) {
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

module.exports = returnSpaceWithAuthUserPermissions
