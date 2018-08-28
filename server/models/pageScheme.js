const mongoose = require('mongoose')
const { Schema } = mongoose

const pageSchema = new mongoose.Schema({
  title: String,
  content: String,
  spaceId: { type: Schema.Types.ObjectId, ref: 'Space' },
  blogId: Schema.Types.ObjectId,
  created: {
    date: {
      type: Date
    },
    userId: Schema.Types.ObjectId
  },
  comments: [Schema.Types.ObjectId],
  usersLikes: [Schema.Types.ObjectId],
  isDeleted: {type: Boolean, default: false}
},
{ versionKey: false, timestamps: true }
)

const PageModel = mongoose.model('Page', pageSchema)

module.exports = PageModel
