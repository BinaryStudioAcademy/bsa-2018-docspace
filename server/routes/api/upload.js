const router = require('express').Router()
const uploadService = require('../../services/uploadService')
const multer = require('multer')
const upload = multer()

router.post('/avatar', upload.single('avatar'), uploadService.uploadAvatarFile)

module.exports = router
