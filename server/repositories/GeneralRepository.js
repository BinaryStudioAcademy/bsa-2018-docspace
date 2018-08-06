class GeneralRepository {
  constructor (model) {
    this.model = model
  }

  getAll () {
    return this.model.find()
  }

  getById (id, callback) {
    return this.model.findById(id, (err, user) => callback(err, user))
  }

  get (criteria, callback) {
    return this.model.findOne(criteria, (err, user) => callback(err, user))
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
