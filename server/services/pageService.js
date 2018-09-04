const PageRepository = require('../repositories/PageRepository')
const SpaceRepository = require('../repositories/SpaceRepository')
const BlogRepository = require('../repositories/BlogRepository')
const HistoryRepository = require('../repositories/HistoryRepository')

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
    let page = await PageRepository.getById(req.params.id)
      .then(page => {
        if (!page[0]) {
          return res.status(404).send({
            message: 'page not found with id ' + req.params.id
          })
        }
        return page[0]
      })
      .catch(err => {
        console.log(err)
        if (err.kind === 'ObjectId') {
          return res.status(404).send({
            message: 'page not found with id ' + req.params.id
          })
        }
        return res.status(500).send({
          message: 'Error retrieving page with id ' + req.params.id
        })
      })
    if (req.body.version) {
      const pageCurrentHistory = await HistoryRepository.getCurrentPageHistory(page._id, Number(req.body.version))
        .populate({
          path: 'userId',
          select: 'firstName lastName avatar login'
        })
        .then(pageCurrentHistory => pageCurrentHistory)
        .catch(err => err)
      const oldPage = page.modifiedVersions.filter(old => old.version === Number(req.body.version))[0]
      page = {
        _id: page._id,
        comments: page.comments,
        usersLikes: page.userLikes,
        isDeleted: page.isDeleted,
        title: `${oldPage.title}`,
        spaceId: page.spaceId,
        createdAt: page.createdAt,
        updatedAt: pageCurrentHistory[0].date,
        content: oldPage.content,
        commentsArr: page.commentsArr,
        userModified: pageCurrentHistory[0].userId
      }
    }
    res.send(page)
  },

  add: (req, res) => {
    PageRepository.create(req.body)
      .then(page => {
        if (page.blogId) {
          BlogRepository.addPageToBlog(page)
            .then(() => {
              return res.json(page)
            })
            .catch(err => {
              console.log(err)
              res.status(500).send(err.message)
            })
        } else {
          SpaceRepository.addPageToSpace(page)
            .then(() => {
              return res.json(page)
            })
            .catch(err => {
              console.log(err)
              res.status(500).send(err.message)
            })
        }
      }).catch(err => {
        console.log(err)
        res.status(500).send({
          message: err.message || 'Some error occurred while creating the page.'
        })
      })
  },

  findOneAndUpdate: (req, res) => {
    PageRepository.update(req.params.id, req.body)
      .then(page => {
        console.log(page)
        if (!page) {
          return res.status(404).send({
            message: 'page not found with id ' + req.params.id
          })
        }
        res.send(page[0])
      }).catch(err => {
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
                  console.log(space)
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
    console.log('даніл')
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
    console.log('normal')
    Promise.all(
      [
        PageRepository.searchByTitle(req.params.filter),
        SpaceRepository.searchByTitle(req.params.filter)
      ])
      .then(([one, two]) => {
        console.log(one)
        console.log(two)
        res.send(one.concat(two))
      })
      .catch(err => {
        console.log(err)
      })
  },

  moveToSpace: async (req, res) => {
    await SpaceRepository.addPageById(req.body.toSpaceId, req.params.id)
      .catch(err => err)
    await SpaceRepository.deletePageFromSpace(req.body.fromSpaceId, req.params.id)
      .catch(err => err)
    await PageRepository.changeSpace(req.params.id, req.body.toSpaceId)
      .then(() => res.send({pageReplaced: true}))
      .catch(err => res.status(500).send(err))
  }
}
