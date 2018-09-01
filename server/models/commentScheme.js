const mongoose = require('mongoose')
const { Schema } = mongoose
const commentSchema = new mongoose.Schema({
  userId: Schema.Types.ObjectId,
  userLikes: [Schema.Types.ObjectId],
  text: String,
  isDeleted: {type: Boolean, default: false},
  parentId: {type: Schema.Types.ObjectId, default: null},
  createdAt: Date
},
{
  versionKey: false
})
const Comment = mongoose.model('Comment', commentSchema)
module.exports.Comment = Comment
