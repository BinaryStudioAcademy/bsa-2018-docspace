const mongoose = require('mongoose')
const { Schema } = mongoose
const commentSchema = new mongoose.Schema({
  userId: Schema.Types.ObjectId,
  firstName: String,
  lastName: String,
  userLikes: [{type: Schema.Types.ObjectId, ref: 'User'}],
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
