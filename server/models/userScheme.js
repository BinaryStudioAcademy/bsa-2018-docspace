const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')

const validateEmail = (email) => {
  var re = /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/
  return re.test(email)
}

const userSchema = new mongoose.Schema({
  avatar: String,
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  spaces: [{type: Schema.Types.ObjectId}],
  email: {
    type: String,
    trim: true,
    unique: true,
    required: 'Email address is required',
    validate: [validateEmail, 'Please fill a valid email address']
  },
  login: { type: String, required: true, match: [/^[a-zA-Z0-9]+$/, 'is invalid'], index: { unique: true } },
  password: String,
  resetPasswordToken: String,
  resetPasswordExpires: Date,
  notifications: [ {type: Schema.Types.ObjectId, ref: 'Notification'} ]
}, {
  versionKey: false
})

userSchema.pre('save', async function () {
  let user = this
  const saltRounds = 10
  user.password = await bcrypt.hash(user.password, saltRounds)
    .then(hashPassword => hashPassword)
    .catch(err => err)
})

userSchema.pre('findOneAndUpdate', async function () {
  if (!this.getUpdate().login) {
    let query = this
    const saltRounds = 10
    await query.findOne()
      .then((user) => {
        this.getUpdate().password = bcrypt.hashSync(this.getUpdate().password, saltRounds)
      })
      .catch(err => err)
  }
})

userSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password)
    .then(isMatch => isMatch)
    .catch(err => err)
}

const User = mongoose.model('User', userSchema)

module.exports.User = User
