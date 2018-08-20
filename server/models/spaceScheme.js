const mongoose = require('mongoose')
const { Schema } = mongoose

const spaceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  key: {
    type: String,
    required: true
  },
  isDeleted: Boolean,
  ownerId: {
    type: Schema.Types.ObjectId,
    required: true
  },
  description: String,
  categories: [{type: Schema.Types.ObjectId, ref: 'Category'}],
  homePageId: Schema.Types.ObjectId,
  blogId: Schema.Types.ObjectId,
  pages: [{type: Schema.Types.ObjectId, ref: 'Page'}],
  history: [Schema.Types.ObjectId],
  rights: {
    users: [Schema.Types.ObjectId],
    groups: [Schema.Types.ObjectId],
    anonymous: Schema.Types.ObjectId
  }
},
{
  versionKey: false
})
const SpaceModel = mongoose.model('Space', spaceSchema)

module.exports = SpaceModel
