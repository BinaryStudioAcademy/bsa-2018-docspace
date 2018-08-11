const UserRepository = require('../repositories/UserRepository')
const scheme = require('../models/userScheme')

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
      }).catch(err => {
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
        res.send(user)
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
        user.comparePassword(req.body.password)
          .then((isMatch) => {
            if (!isMatch) {
              return res.send({ success: false, message: 'Incorrect current password.' })
            }
          })
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
        res.status(200).send(user)
      })
      .catch(err => {
        let msg = ''
        if (err.code === 11000) {
          msg = err.message.includes('login') ? 'Such login already exist try another one' : 'Such email already exist try another one'
        }
        res.status(500).send({error: msg || err.message})
      })
  }
}
