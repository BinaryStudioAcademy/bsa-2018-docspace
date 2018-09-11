const router = require('express').Router()
const BlogService = require('../../services/blogService')

router.get('/:id', BlogService.findOne)

module.exports = router
