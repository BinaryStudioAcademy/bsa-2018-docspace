class GeneralRepository {
  constructor (model) {
    this.model = model
  }

  getAll () {
    return this.model.find()
  }

  get (id) {
    return this.model.findOne({ _id: id })
  }

  create (data) {
    return this.model.create(data)
  }

  update (id, data) {
    return this.model.findOneAndUpdate({ _id: id }, data, {new: true})
  }

  delete (id) {
    return this.model.deleteOne({ _id: id })
  }
}

module.exports = GeneralRepository
