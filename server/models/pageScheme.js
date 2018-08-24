const mongoose = require('mongoose')
const { Schema } = mongoose

const pageSchema = new mongoose.Schema({
  title: String,
  content: String,
  spaceId: Schema.Types.ObjectId,
  blogId: Schema.Types.ObjectId,
  created: {
    date: {
      type: Date
    },
    userId: Schema.Types.ObjectId
  },
  comments: [Schema.Types.ObjectId],
  usersLikes: [Schema.Types.ObjectId],
  isDeleted: Boolean
},
{ versionKey: false, timestamps: true }
)

const PageModel = mongoose.model('Page', pageSchema)

module.exports = PageModel
