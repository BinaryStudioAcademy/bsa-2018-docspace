const router = require('express').Router()
const crypto = require('crypto')
const async = require('async')
const userRep = require('../../../repositories/UserRepository')
var nodemailer = require('nodemailer')

const forgot = (req, res, next) => {
  const email = req.body.email
  console.log(email)
  async.waterfall([
    (done) => {
      crypto.randomBytes(20, function (err, buf) {
        var token = buf.toString('hex')
        done(err, token, email)
      })
    },
    (token, email, done) => {
      console.log(`second`, email)
      userRep.get({ email })
        .then(user => {
          if (!user) {
            req.flash('error', 'No account with that email address exists.')
            res.send({message: 'No account with that email address exists.'})
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
      var smtpTransport = nodemailer.createTransport('SMTP', {
        service: 'SendGrid',
        auth: {
          user: '!!! YOUR SENDGRID USERNAME !!!',
          pass: '!!! YOUR SENDGRID PASSWORD !!!'
        }
      })
      const mailOptions = {
        to: user.email,
        from: 'DocSpaceTeam@docspace.com',
        subject: 'Node.js Password Reset',
        text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
            'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
            'http://' + req.headers.host + '/reset/' + token + '\n\n' +
            'If you did not request this, please ignore this email and your password will remain unchanged.\n'
      }
      smtpTransport.sendMail(mailOptions, function (err) {
        req.flash('info', 'An e-mail has been sent to ' + user.email + ' with further instructions.')
        done(err, 'done')
      })
    }
  ], function (err) {
    if (err) return next(err)
    res.send({message: 'Error'})
  })
}

router.post('/', forgot)
module.exports = router
