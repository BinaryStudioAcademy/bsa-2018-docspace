const CommentRepository = require('../repositories/CommentRepository')
const PageRepository = require('../repositories/PageRepository')
// const scheme = require('../models/commentScheme')

module.exports = {
  findAllCommentsForPage: (req, res) => {
    CommentRepository.getByArray(req.body.commentsId)
      .then(comments => {
        comments = comments.filter(comment => !comment.isDeleted)
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

  add: async (req, res) => {
    let savedComment = await CommentRepository.create(req.body.comment)
      .then(comment => comment)
      .catch(err => err)
    await PageRepository.addNewComment(req.body.pageId, savedComment._id)
      .then(page => page)
      .catch(err => res.status(500).send(err))
    res.send(savedComment)
  },

  findOneAndUpdate: (req, res) => {
    CommentRepository.update(req.params.id, req.body.comment)
      .then(comment => res.send(comment))
      .catch(err => res.status(500).send(err))
  },

  addRemoveLike: (req, res) => {
    if (req.body.toAdd) {
      CommentRepository.addLike(req.params.id, req.body.userId)
        .populate({
          path: 'userLikes',
          select: 'firstName lastName'
        })
        .then(comment => res.send(comment))
        .catch(err => res.status(500).send(err))
    } else {
      CommentRepository.removeLike(req.params.id, req.body.userId)
        .populate({
          path: 'userLikes',
          select: 'firstName lastName'
        })
        .then(comment => res.send(comment))
        .catch(err => res.status(500).send(err))
    }
  },

  findOneAndDelete: (req, res) => {
    CommentRepository.update(req.params.id, {'isDeleted': true})
      .then(comment => {
        if (!comment) {
          res.status(404).send({
            message: 'Comment not found with id ' + req.params.id
          })
        }
        PageRepository.deleteComment(req.body.pageId, comment._id)
          .then(() => res.status(200).send(comment))
          .catch(err => res.status(500).send(err))
      })
      .catch(err => {
        res.status(500).send({
          message: 'Can\'t delete comment with id' + req.params.id
        })
        console.log(err)
      })
  }
}
