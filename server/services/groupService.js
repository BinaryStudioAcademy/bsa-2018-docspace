const GroupRepository = require('../repositories/GroupRepository')
const scheme = require('../models/groupScheme')

module.exports = {
  findAll: (req, res) => {
    GroupRepository.getAllForUser(req.params.id)
      .then(group => {
        if (!group) {
          res.status(404).send({
            message: 'Cannot find groups for user'
          })
        }
        res.status(200)
        res.send(group)
      })
      .catch(err => {
        res.status(500)
        console.log(err)
      })
  },
  findByTitle: (req, res) => {
    GroupRepository.getByTitle(req.params.title)
      .then(group => {
        if (!group) {
          res.status(404).send({
            message: 'Cannot find group with this title ' + req.params.title
          })
        }
        res.status(200)
        res.send(group)
      })
      .catch(err => {
        res.status(500)
        console.log(err)
      })
  },
  add: (req, res) => {
    const Group = new scheme.Group({
      members: [req.body.members],
      title: req.body.title,
      description: req.body.description
    })
    Group.save()
      .then(group => {
        if (!group) {
          res.status(404).send({
            message: 'Cannot create group'
          })
        }
        res.status(200)
        res.send(group)
      })
      .catch(err => {
        res.status(500).send({
          message: 'Can\'t create group'
        })
        console.log(err)
      })
  },
  update: (req, res) => {
    GroupRepository.update(req.params.id, req.body)
      .then(group => {
        if (!group) {
          res.status(404).send({
            message: 'Cannot found group with id ' + req.params.id
          })
        }
        res.status(200)
        res.send(group)
      })
      .catch(err => {
        res.status(500)
        console.log(err)
      })
  },
  delete: (req, res) => {
    GroupRepository.delete(req.params.id)
      .then(group => {
        if (!group) {
          res.status(404).send({
            message: 'Cannot found group with id ' + req.params.id
          })
        }
        res.status(200).send(group)
      })
      .catch(err => {
        res.status(500)
        console.log(err)
      })
  }
}
