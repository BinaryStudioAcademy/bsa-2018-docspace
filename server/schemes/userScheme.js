const mongoose = require('mongoose')
const Schema = mongoose.Schema

const validateEmail = (email) => {
  var re = /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/
  return re.test(email)
}

const userSchema = new mongoose.Schema({
  avatar: String,
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  spaces: [Schema.Types.ObjectId],
  email: {
    type: String,
    trim: true,
    unique: true,
    required: 'Email address is required',
    validate: [validateEmail, 'Please fill a valid email address']
  },
  login: { type: String, required: true, match: [/^[a-zA-Z0-9]+$/, 'is invalid'], index: { unique: true } },
  password: String
}, {
  versionKey: false
})

const User = mongoose.model('User', userSchema)

module.exports.User = User
