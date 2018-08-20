const router = require('express').Router()
const crypto = require('crypto')
const async = require('async')
const userRep = require('../../../repositories/UserRepository')
var nodemailer = require('nodemailer')

const forgot = (req, res, next) => {
  const email = req.body.email
  async.waterfall([
    (done) => {
      crypto.randomBytes(20, function (err, buf) {
        var token = buf.toString('hex')
        done(err, token, email)
      })
    },
    (token, email, done) => {
      userRep.get({ email })
        .then(user => {
          if (!user) {
            res.send({succesful: false, message: 'No account with that email address exists.'})
          }

          user.resetPasswordToken = token
          user.resetPasswordExpires = Date.now() + 3600000 // 1 hour will valid message

          user.save(function (err) {
            done(err, token, user)
          })
        })
        .catch(err => res.send(err))
    },
    (token, user, done) => {
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
        res.send({succesful: true, message: 'An e-mail has been sent to ' + user.email + ' with further instructions.'})
      })
    }
  ], function (err) {
    if (err) return next(err)
    res.send({message: 'Error'})
  })
}

router.post('/', forgot)
module.exports = router
