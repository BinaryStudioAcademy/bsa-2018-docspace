const router = require('express').Router()
const spaceService = require('../../services/spaceService')

router.get('/', (req, res) => {
  spaceService.getAll()
    .then(data => res.json(data))
    .catch((err) => {
      console.log(err)
      res.status(400)
      res.end()
    })
})

router.get('/:id', (req, res) => {
  const id = req.params.id

  if (id.length === 0) {
    res.status(400)
    return res.end('Invalid id')
  }

  spaceService.get(id)
    .then(data => res.json(data))
    .catch((err) => {
      console.log(err)
      res.status(400)
      res.end()
    })
})

router.post('/', (req, res) => {
  console.log('________________________________')
  console.log('req:')
  console.log(req)
  console.log('________________________________')
  console.log('req.user:')
  console.log(req.user)

  if (typeof req.body !== 'object') {
    res.status(400)

    return res.end('Invalid data')
  }

  if (!req.body.name || !req.body.ownerId || !req.body.key) {
    res.status(400)

    return res.end('Missing required param')
  }

  spaceService.create(req.body)
    .then(data => res.json(data))
    .catch((err) => {
      console.log(err)
      res.status(400)
      res.end()
    })
})

router.put('/:id', (req, res) => {
  const id = req.params.id

  if (id.length === 0) {
    res.status(400)

    return res.end('Invalid id')
  }

  spaceService.update(id, req.body)
    .then(data => res.json(data))
    .catch((err) => {
      console.log(err)
      res.status(400)
      res.end()
    })
})

router.delete('/:id', (req, res) => {
  const id = req.params.id

  if (id.length === 0) {
    res.status(400)

    return res.end('Invalid id')
  }

  spaceService.delete(id)
    .then(data => res.json(data))
    .catch((err) => {
      console.log(err)
      res.status(400)
      res.end()
    })
})

module.exports = router
