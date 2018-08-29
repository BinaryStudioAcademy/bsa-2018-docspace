const HistoryRepository = require('../repositories/HistoryRepository')
const SpaceRepository = require('../repositories/SpaceRepository')
const UserRepository = require('../repositories/UserRepository')

module.exports = {
  findAll: (req, res) => {
    HistoryRepository.getAll()
      .limit(50)
      .sort('-date')
      .populate({
        path: 'userId',
        select: 'firstName lastName avatar login'
      })
      .populate({
        path: 'spaceId',
        select: 'name isDeleted'
      })
      .populate({
        path: 'pageId',
        select: 'title isDeleted'})
      .populate({
        path: 'commentId',
        select: 'text isDeleted'})
      .then(data => res.json(data))
      .catch((err) => {
        console.log(err)
        res.status(400)
        res.end()
      })
  },

  findCurrentUserHistory: (req, res) => {
    const userId = req.params.id
    if (userId.length === 0) {
      res.status(400)

      return res.end('Invalid id')
    }
    HistoryRepository.getCurrentUserHistory(userId)
      .limit(50)
      .sort('-date')
      .populate({
        path: 'userId',
        select: 'firstName lastName avatar'
      })
      .populate({
        path: 'spaceId',
        select: 'name isDeleted'
      })
      .populate({
        path: 'pageId',
        select: 'title isDeleted'})
      .populate({
        path: 'commentId',
        select: 'text isDeleted'})
      .then((data) => {
        if (data.length === 0) {
          res.status(404)

          return res.end()
        }

        res.json(data)
      })
      .catch((err) => {
        console.log(err)
        res.status(400)
        res.end()
      })
  },

  findOne: (req, res) => {
    const id = req.params.id

    if (id.length === 0) {
      res.status(400)

      return res.end('Invalid id')
    }

    HistoryRepository.getById(id)
      .then((data) => {
        if (data.length === 0) {
          res.status(404)

          return res.end()
        }

        res.json(data)
      })
      .catch((err) => {
        console.log(err)
        res.status(400)
        res.end()
      })
  },

  findUserHistory: (req, res) => {
    const userLogin = req.params.login
    if (userLogin.length === 0) {
      res.status(400)

      return res.end('Invalid Login')
    }
    UserRepository.getByLogin(userLogin)
      .then(user => {
        HistoryRepository.getUserHistory(user[0]._id)
          .sort('-date')
          .populate({
            path: 'pageId',
            select: 'title isDeleted'
          })
          .populate({
            path: 'spaceId',
            select: 'name isDeleted'
          })
          .then((data) => {
            if (data.length === 0) {
              return res.json([])
            }
            return res.json(data)
          })
          .catch((err) => {
            console.log(err)
            res.status(400)
            res.end()
          })
      })
      .catch(err => console.log(err))
  },

  findAllInSpace: (req, res) => {
    const id = req.params.id

    if (id.length === 0) {
      res.status(400)

      return res.end('Invalid id')
    }
    HistoryRepository.getAllByCriteria({spaceId: req.body.spaceId})
      .populate('space')
      .then((data) => {
        if (data.length === 0) {
          res.status(404)

          return res.end()
        }

        res.json(data)
      })
      .catch((err) => {
        console.log(err)
        res.status(400)
        res.end()
      })
  },

  add: async (req, res) => {
    let history = await HistoryRepository.create({userId: req.user._id, date: Date.now(), ...req.body})
      .then(history => history)
      .catch((err) => {
        console.log(err)
        res.status(400)
        res.end()
      })
    SpaceRepository.updateHistory(req.body.spaceId, history._id)
      .populate('history')
      .then(populatedSpace => res.json(populatedSpace))
      .catch((err) => {
        console.log(err)
        res.status(400)
        res.end()
      })
  },

  findOneAndDelete: (req, res) => {
    const id = req.params.id

    if (id.length === 0) {
      res.status(400)

      return res.end('Invalid id')
    }

    HistoryRepository.delete(id)
      .then(data => res.json(data))
      .catch((err) => {
        console.log(err)
        res.status(400)
        res.end()
      })
  }
}
