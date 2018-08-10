const router = require('express').Router()
const commentService = require('../../services/commentService')

router.get('/', commentService.findAll)

router.get('/:id', commentService.findOne)

router.post('/', commentService.add)

router.put('/:id', commentService.findOneAndUpdate)

router.delete('/:id', commentService.findOneAndDelete)

module.exports = router
