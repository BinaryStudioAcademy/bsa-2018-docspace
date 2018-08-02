const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  name: String,
  email: String
}, {
  versionKey: false
})

const User = mongoose.model('User', userSchema)

module.exports.User = User
