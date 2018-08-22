const crypto = require('crypto')
const userRep = require('../repositories/UserRepository')
var nodemailer = require('nodemailer')
const hostname = require('../config/host').get(process.env.NODE_ENV)

module.exports = {
  forgot: (req, res) => {
    const email = req.body.email
    crypto.randomBytes(20, async function (err, buf) {
      var token = await buf.toString('hex')
      userRep.get({ email })
        .then(user => {
          if (!user) {
            return res.send({succesful: false, message: 'No account with that email address exists.'})
          }

          user.resetPasswordToken = token
          user.resetPasswordExpires = Date.now() + 3600000 // 1 hour will valid message
          user.save()
            .then(user => {
              let transporter = nodemailer.createTransport({
                host: 'smtp.ethereal.email',
                port: 587,
                auth: {
                  user: 'tfmviw7qoixoq4kq@ethereal.email',
                  pass: 'cugj96yyYbectx2RHf'
                }
              })
              let mailOptions = {
                to: user.email,
                from: 'DocSpaceTeam@docspace.com',
                subject: 'Password Reset',
                text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
                  'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
                  'http://' + req.headers.host + '/reset/' + token + '\n\n' +
                  'If you did not request this, please ignore this email and your password will remain unchanged.\n'
              }
              transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                  return console.log(error)
                }
                console.log('Message sent: %s', info.messageId)
                console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info))
                return res.send({succesful: true, message: 'An e-mail has been sent to ' + user.email + ' with further instructions.'})
              })
              if (err) {
                res.send(err)
              }
            })
            .catch(err => res.send(err))
        })
        .catch(err => res.send(err))
    })
  },

  redirectToForgotPass: (req, res) => {
    return res.redirect(hostname.url + 'reset/' + req.params.token)
  },

  setNewPassword: (req, res) => {
    userRep.getByToken(req.body.token)
      .then(user => {
        if (!user) {
          return res.send({succesful: false, message: 'Password reset token is invalid or has expired.'})
        }
        userRep.update(user._id, {password: req.body.password, resetPasswordToken: undefined, resetPasswordExpires: undefined})
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