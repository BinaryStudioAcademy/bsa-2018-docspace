class GeneralRepository {
  constructor (model) {
    this.model = model
  }

  getAll () {
    return this.model.find()
  }

  getById (id) {
    return this.model.findById(id)
  }

  get (criteria) {
    return this.model.findOne(criteria)
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

  getByArray (arrayOfId) {
    return this.model.find({ _id: { $in: arrayOfId } })
  }
}

module.exports = GeneralRepository
