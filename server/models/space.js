const mongoose = require('mongoose')
const { Schema } = mongoose

const spaceSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  isDeleted: Boolean,
  ownerId: {
    type: Schema.Types.ObjectId,
    required: true
  },
  description: String,
  categories: [Schema.Types.ObjectId],
  homePageId: {
    type: Schema.Types.ObjectId
  },
  blogId: Schema.Types.ObjectId,
  pages: [Schema.Types.ObjectId],
  history: [Schema.Types.ObjectId],
  rights: {
    users: [Schema.Types.ObjectId],
    groups: [Schema.Types.ObjectId],
    anonymous: Schema.Types.ObjectId
  }
})
const SpaceModel = mongoose.model('Space', spaceSchema)

module.exports = SpaceModel
