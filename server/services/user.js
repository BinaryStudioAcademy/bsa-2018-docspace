const userRepository = require('../repositories/userRepository')
const scheme = require('../schemes/userScheme')

module.exports = {
  findAll: (req, res) => {
    userRepository.getAll()
      .then(users => {
        res.send(users)
      }).catch(err => {
        res.status(500).send({
          message: err.message || 'Some error occurred while retrieving users.'
        })
      })
  },

  findOne: (req, res) => {
    userRepository.getById(req.params.id)
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
        userRepository.add(user)
        res.send(user)
      }).catch(err => {
        res.status(500).send({
          message: err.message || 'Some error occurred while creating the User.'
        })
      })
  },

  findOneAndUpdate: (req, res) => {
    const User = new scheme.User({
      avatar: req.body.avatar,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      spaces: req.body.spaces,
      email: req.body.email,
      login: req.body.login,
      password: req.body.password
    })

    userRepository.update(req.params.id, User)
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
    userRepository.deleteOne(req.params.id)
      .then(user => {
        if (!user) {
          return res.status(404).send({
            message: 'User not found with id ' + req.params.id
          })
        }
        res.send({message: 'Note deleted successfully!'})
      }).catch(err => {
        if (err.kind === 'ObjectId' || err.name === 'NotFound') {
          return res.status(404).send({
            message: 'Note not found with id ' + req.params.id
          })
        }
        return res.status(500).send({
          message: 'Could not delete note with id ' + req.params.id
        })
      })
  }
}