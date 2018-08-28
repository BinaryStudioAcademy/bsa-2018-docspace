const BlogRepository = require('../repositories/BlogRepository')

module.exports = {
  findOne: (req, res) => {
    const id = req.params.id

    if (id.length === 0) {
      return res.status(400).end('Invalid id')
    }

    BlogRepository.getById(id)
      .then((data) => {
        if (!data[0]) {
          return res.status(404).end()
        }
        data = {
          _id: data[0]._id,
          pages: data[0].pages.filter(page => !page.isDeleted)
        }
        return res.json(data)
      })
      .catch((err) => {
        console.log(err)
        res.status(400).end()
      })
  }
}
