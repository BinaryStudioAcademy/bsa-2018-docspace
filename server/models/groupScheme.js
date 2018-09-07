const mongoose = require('mongoose')
const { Schema } = mongoose
const groupSchema = new mongoose.Schema({
  members: [Schema.Types.ObjectId],
  title: {
    type: String,
    unique: true,
    required: true
  },
  description: String,
  isDeleted: {type: Boolean, default: false}
},
{
  versionKey: false
})
const Group = mongoose.model('Group', groupSchema)
module.exports.Group = Group
