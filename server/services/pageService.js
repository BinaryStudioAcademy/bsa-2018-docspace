const PageRepository = require('../repositories/PageRepository')
const SpaceRepository = require('../repositories/SpaceRepository')
const BlogRepository = require('../repositories/BlogRepository')
const HistoryRepository = require('../repositories/HistoryRepository')
const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId

module.exports = {
  findAll: (req, res) => {
    PageRepository.getAll()
      .then(pages => {
        res.send(pages)
      }).catch(err => {
        console.log(err)
        res.status(500).send({
          message: err.message || 'Some error occurred while retrieving pages.'
        })
      })
  },

  findOne: async (req, res) => {
    const page = await PageRepository.getById(req.params.id)
      .populate({
        path: 'comments',
        populate: {path: 'userLikes', select: 'firstName lastName'}
      })
      .populate({
        path: 'usersLikes',
        select: 'firstName lastName'
      })
      .then(page => page)
      .catch(err => {
        console.log(err)
        return err
      })
    const isWatched = page.watchedBy.indexOf(ObjectId(req.user._id)) !== -1
    const resPage = {
      _id: page._id,
      comments: page.comments,
      usersLikes: page.usersLikes,
      isDeleted: page.isDeleted,
      title: page.title,
      spaceId: page.spaceId,
      createdAt: page.createdAt,
      updatedAt: page.updatedAt,
      content: page.content,
      userModified: page.userId,
      isWatched: isWatched
    }
    console.log(resPage)
    if (req.body.version) {
      const pageCurrentHistory = await HistoryRepository.getCurrentPageHistory(page._id, Number(req.body.version))
        .populate({
          path: 'userId',
          select: 'firstName lastName avatar login'
        })
        .then(pageCurrentHistory => pageCurrentHistory)
        .catch(err => err)
      const oldPage = page.modifiedVersions.find(old => old.version === Number(req.body.version))
      resPage.title = oldPage.title
      resPage.content = oldPage.content
      resPage.updatedAt = pageCurrentHistory[0].date
      resPage.userModified = pageCurrentHistory[0].userId
    }

    res.send(resPage)
  },

  add: async (req, res) => {
    const page = await PageRepository.create(req.body, req.user._id)
      .then(page => page)
      .catch(err => res.status(500).send(err.message))
    if (page.blogId) {
      await BlogRepository.addPageToBlog(page)
        .catch(err => {
          console.log(err)
          res.status(500).send(err.message)
        })
    } else {
      await SpaceRepository.addPageToSpace(page)
        .catch(err => {
          console.log(err)
          res.status(500).send(err.message)
        })
    }
    await PageRepository.addWatcher(page._id, req.user._id)
      .catch(err => {
        console.log(err)
        res.status(500).send(err.message)
      })

    const resPage = {
      _id: page._id,
      comments: page.comments,
      usersLikes: page.usersLikes,
      isDeleted: page.isDeleted,
      title: page.title,
      spaceId: page.spaceId,
      createdAt: page.createdAt,
      updatedAt: page.updatedAt,
      content: page.content,
      userModified: page.userId,
      isWatched: true
    }
    return res.send(resPage)
  },

  findOneAndUpdate: async (req, res) => {
    const oldPage = await PageRepository.getById(req.body._id)
    const newId = new mongoose.Types.ObjectId()
    const modifiedVersions = { _id: newId, version: oldPage.version + 1, title: oldPage.title, content: oldPage.content }
    const data = {
      ...req.body,
      $inc: { version: 1 },
      $addToSet: { 'modifiedVersions': modifiedVersions }
    }

    PageRepository.update(req.params.id, data)
      .populate({
        path: 'comments',
        populate: {path: 'userLikes', select: 'firstName lastName avatar'}
      })
      .then(async (
        {
          _id, comments, usersLikes, title, spaceId, createdAt, isDeleted,
          date: updatedAt, content, userId: userModified
        }
      ) => {
        await PageRepository.addWatcher(_id, req.user._id)
          .catch(err => {
            console.log(err)
            res.status(500).send(err.message)
          })

        const resPage = {
          _id,
          comments,
          usersLikes,
          title,
          spaceId,
          createdAt,
          updatedAt,
          content,
          userModified,
          isDeleted,
          isWatched: true
        }

        return res.send(resPage)
      })
      .catch(err => {
        console.log(err)
        if (err.kind === 'ObjectId') {
          return res.status(404).send({
            message: 'page not found with id ' + req.params.id
          })
        }
        return res.status(500).send({
          message: 'Error updating page with id ' + req.params.id
        })
      })
  },

  addRemoveLike: (req, res) => {
    if (req.body.toAdd) {
      PageRepository.addLike(req.params.id, req.body.userId)
        .then(page => PageRepository.addWatcher(req.params.id, req.body.userId)
          .then(() => res.send({liked: true})))
        .catch(err => res.status(500).send(err))
    } else {
      PageRepository.removeLike(req.params.id, req.body.userId)
        .populate({
          path: 'userLikes',
          select: 'firstName lastName'
        })
        .then(page => res.send({unliked: true}))
        .catch(err => res.status(500).send(err))
    }
  },

  addRemoveWatcher: (req, res) => {
    if (req.body.toAdd) {
      PageRepository.addWatcher(req.params.id, req.body.userId)
        .then(page => res.send({watched: true}))
        .catch(err => res.status(500).send(err))
    } else {
      PageRepository.deleteWatcher(req.params.id, req.body.userId)
        .populate({
          path: 'userLikes',
          select: 'firstName lastName'
        })
        .then(page => res.send({unwatched: true}))
        .catch(err => res.status(500).send(err))
    }
  },

  findOneAndDelete: (req, res) => {
    PageRepository.update(req.params.id, {'isDeleted': true})
      .then(page => {
        PageRepository.deleteFromElasticAndReturnById(req.params.id)
          .then(page => {
            if (page.blogId) {
              BlogRepository.deletePageFromBlog(page.blogId, page._id)
                .then(() => {
                  return res.json(page)
                })
                .catch(err => {
                  console.log(err)
                  res.status(500).send(err.message)
                })
            } else {
              SpaceRepository.deletePageFromSpace(page.spaceId, page._id)
                .then((space) => {
                  return res.json(page)
                })
                .catch(err => {
                  console.log(err)
                  res.status(500).send(err.message)
                })
            }
          })
          .catch(err => {
            console.log('Can not remove page from elasticsearch db')
            console.log(err)
            return res.status(400).end()
          })
      }).catch(err => {
        console.log(err)
        if (err.kind === 'ObjectId' || err.name === 'NotFound') {
          return res.status(404).send({
            message: 'page not found with id ' + req.params.id
          })
        }
        return res.status(500).send({
          message: 'Could not delete page with id ' + req.params.id
        })
      })
  },

  search (req, res) {
    if (req.body.advancedSearch) {
      PageRepository.advancedSearch(req.body.input)
        .then(result => {
          return res.json(result.hits.hits)
        })
        .catch(err => {
          console.log(err)
          return res.status(400).end()
        })
    } else {
      // do other search, maybe PageRepository.searchByTitle(req.body.input)
    }
  },

  searchByTitle: (req, res) => {
    Promise.all(
      [
        PageRepository.searchByTitle(req.params.filter),
        SpaceRepository.searchByTitle(req.params.filter)
      ])
      .then(([one, two]) => {
        res.send(one.concat(two))
      })
      .catch(err => {
        console.log(err)
      })
  }
}
