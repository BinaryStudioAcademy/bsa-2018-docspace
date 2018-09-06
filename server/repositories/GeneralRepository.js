class GeneralRepository {
  constructor (model) {
    this.model = model
  }

  getAll () {
    return this.getAllByCriteria({})
  }

  getAllByCriteria (criteria) {
    return this.model.find(criteria)
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

  updateMany (filter, data) {
    return this.model.updateMany(filter, data)
  }

  updateOne (id, data) {
    return this.model.updateOne({ _id: id }, data)
  }

  delete (id) {
    return this.model.deleteOne({ _id: id })
  }

  searchByTitle (filter) {
    return this.model.find({title: { $regex: filter, $options: 'i' }, isDeleted: false})
      .populate({ path: 'spaceId', select: '_id' })
      .populate({ path: 'spaceId', select: 'name' })
  }
}

module.exports = GeneralRepository
