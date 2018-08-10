const router = require('express').Router()
const commentService = require('../../services/commentService')

router.get('/', commentService.findAll)

router.get('/history', commentService.getHistory)

router.get('/comments', commentService.getComments)

router.get('/:id', commentService.findOne)

router.post('/', commentService.add)

router.put('/:id', commentService.findOneAndUpdate)

router.delete('/:id', commentService.findOneAndDelete)

router.put('/:id/delete', commentService.deleteButSaveInHistory)

module.exports = router
