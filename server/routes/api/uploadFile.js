const router = require('express').Router()
const uploadFilesService = require('../../services/uploadFilesService')
var multer = require('multer')
var upload = multer()

router.post('/convertWordToHTML', upload.single('docfile'), uploadFilesService.importFile)

module.exports = router
