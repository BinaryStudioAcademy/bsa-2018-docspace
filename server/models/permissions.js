const mongoose = require('mongoose')
const { Schema } = mongoose

const PermissionsSchema = new mongoose.Schema({
  spaceId: Schema.Types.ObjectId,
  userId: Schema.Types.ObjectId,
  groupId: Schema.Types.ObjectId,

  all: {
    view: { type: Boolean, default: false }
  },

  blog: {
    add: { type: Boolean, default: false },
    delete: { type: Boolean, default: false }
  },

  pages: {
    add: { type: Boolean, default: false },
    delete: { type: Boolean, default: false }
  },

  comments: {
    add: { type: Boolean, default: false },
    delete: { type: Boolean, default: false }
  },

  space: {
    export: { type: Boolean, default: false },
    administrate: { type: Boolean, default: false }
  }
}, { versionKey: false }
)

const PermissionsModel = mongoose.model('Permissions', PermissionsSchema)

module.exports = PermissionsModel
