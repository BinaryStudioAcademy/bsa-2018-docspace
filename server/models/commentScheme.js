const mongoose = require('mongoose')
const { Schema } = mongoose
const commentSchema = new mongoose.Schema({
  userId: Schema.Types.ObjectId,
  userLikes: [Schema.Types.ObjectId],
  text: String,
  isDeleted: Boolean,
  parentId: Schema.Types.ObjectId
},
{
  versionKey: false
})
const Comment = mongoose.model('Comment', commentSchema)
module.exports.Comment = Comment
