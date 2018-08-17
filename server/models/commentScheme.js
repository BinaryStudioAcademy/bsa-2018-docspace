const mongoose = require('mongoose')
const { Schema } = mongoose
const commentSchema = new mongoose.Schema({
  userId: Schema.Types.ObjectId,
  firstName: String,
  lastName: String,
  userLikes: [Schema.Types.ObjectId],
  text: String,
  isDeleted: Boolean,
  parentId: {type: Schema.Types.ObjectId, default: null},
  createdAt: Date
},
{
  versionKey: false
})
const Comment = mongoose.model('Comment', commentSchema)
module.exports.Comment = Comment
