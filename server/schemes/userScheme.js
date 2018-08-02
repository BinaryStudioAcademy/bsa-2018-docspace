const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = mongoose.Schema({
  avatar: String,
  firstName: String,
  lastName: String,
  spaces: [Schema.Types.ObjectId],
  email: String,
  login: String,
  password: String
}, {
  versionKey: false
})

const User = mongoose.model('User', userSchema)

module.exports.User = User
