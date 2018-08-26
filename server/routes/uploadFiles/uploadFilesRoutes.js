const router = require('express').Router()
var multer = require('multer')
var upload = multer()
var mammoth = require('mammoth')

router.post('/', upload.single('docfile'), (req, res) => {
  console.log(req.file)

  mammoth.convertToHtml({buffer: req.file.buffer})
    .then(function (result) {
      var html = result.value // The generated HTML
      var messages = result.messages // Any messages, such as warnings during conversion
      return res.send({html: html, succesful: true, errors: messages})
    })
    .catch(err => console.log(err))
})

module.exports = router
