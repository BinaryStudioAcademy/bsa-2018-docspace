const crypto = require('crypto')
const userRep = require('../repositories/UserRepository')
const mailSender = require('../mailSender')
const resetTemplate = require('../mainTemplates/resetPassword')

module.exports = {
  forgot: (req, res) => {
    const {email} = req.body
    crypto.randomBytes(20, async function (err, buf) {
      var token = await buf.toString('hex')
      userRep.get({ email })
        .then(user => {
          if (!user) {
            return res.send({succesful: false, message: 'No account with that email address exists.'})
          }
          userRep.update(user._id, {resetPasswordToken: token, resetPasswordExpires: Date.now() + 3600000}) // Date.now() + 3600000 1 hour will valid message
            .then(user => {
              const message = {
                senderName: 'DocSpaceTeam',
                subject: 'Password Reset',
                text: 'Password Reset',
                email: user.email,
                htmlText: resetTemplate.message(
                  req.headers.host,
                  token,
                  `${user.firstName} ${user.lastName}`)
              }
              mailSender.sendData(message)
              if (err) {
                console.log(err)
              }
              return res.send({succesful: true, message: 'An e-mail has been sent to ' + user.email + ' with further instructions.'})
            })
            .catch(err => res.send(err))
        })
        .catch(err => res.send(err))
    })
  },
  setNewPassword: (req, res) => {
    const {token, password} = req.body
    userRep.getByToken(token)
      .then(user => {
        if (!user) {
          return res.send({succesful: false, message: 'Password reset token is invalid or has expired.'})
        }
        userRep.update(user._id, {password: password, resetPasswordToken: undefined, resetPasswordExpires: undefined})
          .then(user => {
            if (!user) {
              return res.status(404).send({
                message: 'User not found with id ' + req.params.id
              })
            }
            return res.send({succesful: true, message: 'Success! Your password has been changed.'})
          })
          .catch(err => res.send(err))
      })
      .catch(err => err.send(err))
  }
}
