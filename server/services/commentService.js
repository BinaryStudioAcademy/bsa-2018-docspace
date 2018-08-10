const CommentRepository = require('../repositories/CommentRepository')
const scheme = require('../models/commentScheme')

module.exports = {
  findAll: (req, res) => {
    CommentRepository.getAll()
      .then(comments => {
        res.status(200)
        res.send(comments)
      })
      .catch(err => {
        res.status(500).send({
          message: 'Can\'t find comments'
        })
        console.log(err)
      })
  },
  findOne: (req, res) => {
    CommentRepository.getById(req.params.id)
      .then(comment => {
        if (!comment) {
          res.status(404).send({
            message: 'Comment not found with id ' + req.params.id
          })
        }
        res.status(200)
        res.send(comment)
      })
      .catch(err => {
        res.status(500).send({
          message: 'Can\'t find comment with id' + req.params.id
        })
        console.log(err)
      })
  },
  add: (req, res) => {
    console.log(req.body)
    const Comment = new scheme.Comment({
      userId: req.body.userId,
      text: req.body.text,
      isDeleted: req.body.isDeleted,
      comments: req.body.comments,
      usersLikes: req.body.usersLikes
    })
    Comment.save()
      .then(comment => {
        res.status(200)
        res.send(comment)
      })
      .catch(err => {
        res.status(500).send({
          message: 'Can\'t add page'
        })
        console.log(err)
      })
  },
  findOneAndUpdate: (req, res) => {
    CommentRepository.update(req.params.id, req.body)
      .then(comment => {
        if (!comment) {
          res.status(404).send({
            message: 'Comment not found with id ' + req.params.id
          })
        }
        res.status(200)
        res.send(comment)
      })
      .catch(err => {
        res.status(500).send({
          message: 'Can\'t update comment with id' + req.params.id
        })
        console.log(err)
      })
  },
  findOneAndDelete: (req, res) => {
    CommentRepository.delete(req.params.id)
      .then(comment => {
        if (!comment) {
          res.status(404).send({
            message: 'Comment not found with id ' + req.params.id
          })
        }
        res.status(200).send({
          message: 'Comment deleted successfully'
        })
      })
      .catch(err => {
        res.status(500).send({
          message: 'Can\'t delete comment with id' + req.params.id
        })
        console.log(err)
      })
  },
  deleteButSaveInHistory: (req, res) => {
    CommentRepository.update(req.params.id, {isDeleted: true})
      .then(comment => {
        if (!comment) {
          res.status(404).send({
            message: 'Comment not found with id ' + req.params.id
          })
        }
        res.status(200).send({
          message: 'Comment deleted successfully'
        })
      })
      .catch(err => {
        res.status(500).send({
          message: 'Can\'t delete comment with id' + req.params.id
        })
        console.log(err)
      })
  },
  getHistory: (req, res) => {
    CommentRepository.getAllByParam({isDeleted: true})
      .then(comments => {
        res.status(200)
        res.send(comments)
      })
      .catch(err => {
        res.status(500).send({
          message: 'Can\'t find comments'
        })
        console.log(err)
      })
  },
  getComments: (req, res) => {
    CommentRepository.getAllByParam({isDeleted: false})
      .then(comments => {
        res.status(200)
        res.send(comments)
      })
      .catch(err => {
        res.status(500).send({
          message: 'Can\'t find comments'
        })
        console.log(err)
      })
  }
}
