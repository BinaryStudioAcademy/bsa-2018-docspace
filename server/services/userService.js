const UserRepository = require('../repositories/UserRepository')
const scheme = require('../models/userScheme')
const jwt = require('jsonwebtoken')
const jwtConfig = require('../config/jwt')

function validateEmail (email) {
  const re = /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return {
    success: re.test(String(email).toLowerCase()),
    message: `Incorrect email`
  }
}
function validateLogin (login) {
  const re = /^(?=.*[A-Za-z0-9]$)[A-Za-z][A-Za-z\d.-]{0,19}$/
  return {
    success: re.test(String(login).toLowerCase()),
    message: `Incorrect login`
  }
}

module.exports = {
  findAll: (req, res) => {
    UserRepository.getAll()
      .then(users => {
        res.send(users)
      }).catch(err => {
        res.status(500).send({
          message: err.message || 'Some error occurred while retrieving users.'
        })
      })
  },

  findOne: (req, res) => {
    UserRepository.getById(req.params.id)
      .then(user => {
        if (!user) {
          return res.status(404).send({
            message: 'user not found with id ' + req.params.id
          })
        }
        res.send(user)
      }).catch(err => {
        if (err.kind === 'ObjectId') {
          return res.status(404).send({
            message: 'user not found with id ' + req.params.id
          })
        }

        return res.status(500).send({
          message: 'Error retrieving user with id ' + req.params.id
        })
      })
  },

  add: (req, res) => {
    const User = new scheme.User({
      avatar: req.body.avatar,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      spaces: req.body.spaces,
      email: req.body.email,
      login: req.body.login,
      password: req.body.password
    })

    // Save User in the database
    User.save()
      .then(user => {
        res.send(user)
      })
      .catch(err => {
        res.status(500).send({
          message: err.message || 'Some error occurred while creating the User.'
        })
      })
  },
  findOneAndUpdate: (req, res) => {
    UserRepository.update(req.params.id, req.body)
      .then(user => {
        if (!user) {
          return res.status(404).send({
            message: 'User not found with id ' + req.params.id
          })
        }
        return res.send(user)
      }).catch(err => {
        if (err.kind === 'ObjectId') {
          return res.status(404).send({
            message: 'User not found with id ' + req.params.id
          })
        }
        return res.status(500).send({
          message: 'Error updating User with id ' + req.params.id
        })
      })
  },

  updateSettingData: (req, res) => {
    UserRepository.getById(req.params.id)
      .then(user => {
        const resultEmailValidation = validateEmail(req.body.email)
        const resultLoginValidation = validateLogin(req.body.login)
        if (!resultEmailValidation.success) {
          return res.send({...resultEmailValidation, user: user})
        }
        if (!resultLoginValidation.success) {
          return res.send({...resultLoginValidation, user: user})
        }
        if (!req.body.firstName || !req.body.lastName) {
          return res.send({
            success: false,
            message: 'User\'s name cannot be empty',
            user: user })
        }
        UserRepository.update(req.params.id, req.body)
          .then(user => {
            if (!user) {
              return res.status(404).send({
                message: 'User not found with id ' + req.params.id
              })
            }
            return res.send({
              success: true,
              message: 'User data is changed',
              user: user })
          }).catch(err => {
            if (err.kind === 'ObjectId') {
              return res.status(404).send({
                message: 'User not found with id ' + req.params.id
              })
            }
            return res.status(500).send({
              message: 'Error updating User with id ' + req.params.id
            })
          })
      })
      .catch(err => res.send(err))
  },
  compareUsers: (req, res) => {
    UserRepository.getByLogin(req.body.currentUserLogin)
      .then(curUser => {
        UserRepository.getByLogin(req.body.RequestedUserLogin)
          .then(reqUser => {
            if (!reqUser.length) {
              return res.send({isNotFound: true})
            }
            if (reqUser[0].login === curUser[0].login) {
              return res.send({...reqUser[0], resultOfComparing: true})
            } else {
              return res.send({...reqUser[0], resultOfComparing: false})
            }
          })
          .catch(() => res.status(404))
      })
      .catch(err => console.log(err))
  },
  findOneAndDelete: (req, res) => {
    UserRepository.delete(req.params.id)
      .then(user => {
        if (!user) {
          return res.status(404).send({
            message: 'User not found with id ' + req.params.id
          })
        }
        res.send({message: 'User deleted successfully!'})
      }).catch(err => {
        if (err.kind === 'ObjectId' || err.name === 'NotFound') {
          return res.status(404).send({
            message: 'User not found with id ' + req.params.id
          })
        }
        return res.status(500).send({
          message: 'Could not delete user with id ' + req.params.id
        })
      })
  },

  changePassword: (req, res) => {
    UserRepository.get({email: req.body.email})
      .then(user => {
        if (!user) {
          return res.send({ message: 'Incorrect email.' })
        }
        if (req.body.newPassword.length === 0 || req.body.newPassword === req.body.password) {
          return res.send({ success: false, message: 'New password is incorrect.' })
        }
        if (req.body.newPassword.length < 7) {
          return res.send({ success: false, message: 'Short password, need 7 symbols or more.' })
        }
        user.comparePassword(req.body.password)
          .then((isMatch) => {
            if (!isMatch) {
              return res.send({ success: false, message: 'Incorrect current password.' })
            }
          })
          .catch(err => res.send(err))
        UserRepository.update(req.body.id, {password: req.body.newPassword})
          .then(user => {
            if (!user) {
              return res.status(404).send({
                message: 'User not found with id ' + req.params.id
              })
            }
            return res.send({success: true, message: 'Password changed', user: user})
          }).catch(err => {
            if (err.kind === 'ObjectId') {
              return res.status(404).send({
                message: 'User not found with id ' + req.params.id
              })
            }
            return res.status(500).send({
              message: 'Error updating User with id ' + req.params.id
            })
          })
          .catch(err => res.send(err))
      })
      .catch(err => res.send(err))
  },

  signUp: (req, res) => {
    const [firstName, lastName] = req.body.fullName.split(' ')
    const User = new scheme.User({
      firstName: firstName,
      lastName: lastName,
      email: req.body.email,
      password: req.body.password,
      login: req.body.login
    })
    User.save()
      .then(user => {
        const token = jwt.sign({_id: user._id}, jwtConfig.secret)
        res.status(200).json({ user, token })
      })
      .catch(err => {
        let msg = ''
        if (err.code === 11000) {
          msg = err.message.includes('login') ? 'Such login already exist try another one' : 'Such email already exist try another one'
        }
        res.status(500).send({error: msg || err.message})
      })
  },

  getByName: (req, res) => {
    UserRepository.getByName(req.params.name)
      .then(users => {
        if (!users) {
          return res.status(404).send({
            message: 'user not found with id ' + req.params.id
          })
        }
        res.send(users)
      }).catch(err => {
        if (err.kind === 'ObjectId') {
          return res.status(404).send({
            message: 'user not found with id ' + req.params.id
          })
        }

        return res.status(500).send({
          message: 'Error retrieving user with id ' + req.params.id
        })
      })
  }
}
