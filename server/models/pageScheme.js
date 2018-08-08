const mongoose = require('mongoose')
const { Schema } = mongoose

const pageSchema = new mongoose.Schema({
  title: String,
  content: String,
  created: {
    date: Date,
    userId: {
      type: Schema.Types.ObjectId
    }
  },
  comments: [Schema.Types.ObjectId],
  usersLikes: [Schema.Types.ObjectId],
  isDeleted: Boolean
}, {
  versionKey: false
})

const Page = mongoose.model('Page', pageSchema)

module.exports.Page = Page
