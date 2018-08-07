const router = require('express').Router()
const spaceService = require('../../services/spaceService')

router.get('/', (req, res) => {
  spaceService.getAll()
    .then(data => res.json(data))
    .catch(() => {
      res.status(400)
      res.end()
    })
})

router.get('/:key', (req, res) => {
  const key = req.params.key

  if (key.length === 0) {
    res.status(400)
    return res.end('Invalid key')
  }

  spaceService.get(key)
    .then(data => res.json(data))
    .catch(() => {
      res.status(400)
      res.end()
    })
})

router.post('/', (req, res) => {
  if (typeof req.body !== 'object') {
    res.status(400)

    return res.end('Invalid data')
  }

  if (!req.body.name || !req.body.ownerId) {
    res.status(400)

    return res.end('Missing required param')
  }

  spaceService.create(req.body)
    .then(data => res.json(data))
    .catch(() => {
      res.status(400)
      res.end()
    })
})

router.put('/:key', (req, res) => {
  const key = req.params.key

  if (key.length === 0) {
    res.status(400)

    return res.end('Invalid key')
  }

  spaceService.update(key, req.body)
    .then(data => res.json(data))
    .catch(() => {
      res.status(400)
      res.end()
    })
})

router.delete('/:key', (req, res) => {
  const key = req.params.key

  if (key.length === 0) {
    res.status(400)

    return res.end('Invalid key')
  }

  spaceService.delete(key)
    .then(data => res.json(data))
    .catch(() => {
      res.status(400)
      res.end()
    })
})

module.exports = router
