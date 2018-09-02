const PageRepository = require('../repositories/PageRepository')
const SpaceRepository = require('../repositories/SpaceRepository')

module.export = {
  searchByTitle: (req, res) => {
    Promise.all(
      [
        PageRepository.searchByTitle(req.params.filter),
        SpaceRepository.searchByTitle(req.params.filter)
      ])
      .then(([one, two]) => {
        console.log(one, two)
        res.send(one)
      })
      .catch(err => {
        console.log(err)
      })
  },
  test: (req, res) => {
    Promise.all(
      [
        PageRepository.searchByTitle(req.params.filter),
        SpaceRepository.searchByTitle(req.params.filter)
      ])
      .then(([one, two]) => {
        console.log(one, two)
        res.send(one)
      })
      .catch(err => {
        console.log(err)
      })
  }
}
