const mongoose = require('mongoose')
const { Schema } = mongoose

const historySchema = new mongoose.Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  spaceId: {
    type: Schema.Types.ObjectId,
    ref: 'Space',
    required: true,
    unique: false
  },
  pageId: {
    type: Schema.Types.ObjectId,
    ref: 'Page'
  },
  commentId: {
    type: Schema.Types.ObjectId,
    ref: 'Comment'
  },
  blogId: {
    type: Schema.Types.ObjectId,
    ref: 'Blog'
  },
  modified_versions_Id: {
    type: Schema.Types.ObjectId
  },
  action: {
    type: String,
    required: true
  },
  date: {
    type: Date
  }
},
{
  versionKey: false
})

const History = mongoose.model('History', historySchema)

module.exports.History = History
