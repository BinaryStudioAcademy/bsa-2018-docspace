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

        return res.json(data[0])
      })
      .catch((err) => {
        console.log(err)
        res.status(400).end()
      })
  }
}
