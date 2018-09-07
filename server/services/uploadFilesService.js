const mammoth = require('mammoth')
const PageRepository = require('../repositories/PageRepository')
const BlogRepository = require('../repositories/BlogRepository')
const SpaceRepository = require('../repositories/SpaceRepository')

module.exports = {
  importFile: (req, res) => {
    mammoth.convertToHtml({buffer: req.file.buffer})
      .then(function (result) {
        var html = result.value // The generated HTML
        const parserDocFileDesc = JSON.parse(req.body.docfileDescription)
        PageRepository.create({...parserDocFileDesc, content: html})
          .then(page => {
            if (page.blogId) {
              BlogRepository.addPageToBlog(page)
                .then((space) => {
                  return res.json(page)
                })
                .catch(err => {
                  console.log(err)
                  res.status(500).send(err.message)
                })
            } else {
              SpaceRepository.addPageToSpace(page)
                .then((space) => {
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
      })
      .catch(err => console.log(err))
  }
}
